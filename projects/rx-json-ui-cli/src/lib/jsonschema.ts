/*!
 * Copyright (c) 2018 Adrian Panella <ianchi74@outlook.com>
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import * as fs from 'fs';
import * as path from 'path';

import { JsonPath } from 'espression-jsonpath';
import * as TJS from 'typescript-json-schema';

import { WidgetRef } from './metadata';

const JP = new JsonPath();
const EXPR_SCHEMA = {
  anyOf: [{ type: 'array', items: { type: 'string' } }, { type: 'string' }],
  parser: 'ES6',
};

const outSchemaFile = 'widgets.json';
export function generateSchemas(
  program: TJS.Program,
  widgets: WidgetRef[],
  outPath: string,

  base: string
): void {
  const settings: TJS.PartialArgs = {
    aliasRef: false,
    ref: true,
    topRef: false,
    noExtraProps: true,
    excludePrivate: true,
    required: true,
    validationKeywords: ['parser'],
  };

  if (!fs.existsSync(outPath)) fs.mkdirSync(path.resolve(outPath), { recursive: true });

  const widgetSchema = {
    $schema: 'http://json-schema.org/draft-07/schema#',
    $id: `${base}/${outSchemaFile}`,
    type: 'object',
    properties: {
      widget: {
        description: 'Type of the Widget to instantiate',
        type: 'string',
        enum: [] as string[],
      },
    },
    required: ['widget'],
  };

  let parent: any = widgetSchema;
  const tags: string[] = [];
  const generator = TJS.buildGenerator(program, settings);

  if (!generator) {
    console.error('Error generating schema');
    return process.exit(1);
  }

  generator.setSchemaOverride(
    'BaseWidgetDef<AbstractOptionsDef,AbstractSlotContentDef,AbstractEventsDef>',
    { $ref: `${outSchemaFile}#` }
  );
  generator.setSchemaOverride(
    'OptBindDef<AbstractOptionsDef,AbstractSlotContentDef,AbstractEventsDef>',
    { $ref: `${outSchemaFile}#` }
  );
  generator.setSchemaOverride(
    'BindDef<AbstractOptionsDef,AbstractSlotContentDef,AbstractEventsDef>',
    { $ref: `${outSchemaFile}#` }
  );

  widgets.forEach(({ type: tag, component: { name: symbolName } }, i) => {
    message(`Generating schemas ${i + 1}/${widgets.length}`);

    const component = generator.getSchemaForSymbol(symbolName, true);

    // check component and get symbol
    if (!component.definitions) return;
    const componentDefinitions = component.definitions;
    if (typeof component.properties !== 'object') return;

    let symbolDef = component.properties.jsonWidgetDef;

    if (typeof symbolDef !== 'object') return;
    if (symbolDef.$ref) {
      symbolDef = componentDefinitions[symbolDef.$ref.substring(14)];
      if (typeof symbolDef !== 'object') return;
    }
    if (typeof symbolDef.properties !== 'object') return;

    // Generate schema for def

    symbolDef.properties.widget = {
      type: 'string',
      const: tag,
      description: component.description,
    };

    walkRefs(symbolDef, generator.ReffedDefinitions);

    // complete general properties

    const schemaFile = `${tag}.schema.json`;
    symbolDef.$schema = 'http://json-schema.org/draft-07/schema#';
    symbolDef.$id = `${base}/${schemaFile}`;
    symbolDef.description = component.description;

    // generate expression options
    if (typeof symbolDef.properties.options === 'object')
      exprOptions(symbolDef.properties.options, symbolDef, []);

    // ensure 'parser' on events, in case there was no jsDoc
    let events = symbolDef.properties.events;
    if (typeof events === 'object') {
      if (events.$ref) events = generator.ReffedDefinitions[events.$ref.substring(14)];

      if (events.properties) {
        for (const event in events.properties) {
          if (
            typeof events.properties[event] === 'object' &&
            !(events.properties[event] as any).parser
          )
            (events.properties[event] as any).parser = 'ES6';
        }
      }
    }

    // save schema
    parent.if = {
      properties: { widget: { const: tag } },
    };
    parent.then = { $ref: `${schemaFile}#` };
    parent.else = {};
    parent = parent.else;

    fs.writeFileSync(path.resolve(outPath, schemaFile), JSON.stringify(symbolDef, undefined, 2));
    tags.push(tag);
  });

  widgetSchema.properties.widget.enum = tags;

  fs.writeFileSync(
    path.resolve(outPath, outSchemaFile),
    JSON.stringify(widgetSchema, undefined, 2)
  );

  // generate Content file
  const contentSchema = generator.getSchemaForSymbol('JsonContentDef', false);
  walkRefs(contentSchema, generator!.ReffedDefinitions);
  saveSchema(contentSchema, `${path.basename(outSchemaFile, 'json')}content.json`);

  // generate meta schema for schemas
  // eslint-disable-next-line guard-for-in
  for (const key in generator!.ReffedDefinitions) delete generator!.ReffedDefinitions[key];
  const metaSchema = generator.getSchemaForSymbol('Schema', false);
  walkRefs(metaSchema, generator!.ReffedDefinitions);
  exprOptions(metaSchema, metaSchema, ['ui', 'type']);
  const schemaUI = generator.ReffedDefinitions.SchemaUI;
  if (
    typeof schemaUI === 'object' &&
    schemaUI.properties &&
    typeof schemaUI.properties.widget === 'object'
  )
    schemaUI.properties.widget.enum = tags;
  saveSchema(metaSchema, 'schema.json');

  message('Schema files generated\n');

  function saveSchema(schema: TJS.Definition, filename: string): void {
    schema.$id = `${base}/${filename}`;
    if (!schema.definitions) schema.definitions = {};

    fs.writeFileSync(path.resolve(outPath, filename), JSON.stringify(schema, undefined, 2));
  }
}
export function message(text: string): void {
  if (process.stdout.clearLine) {
    process.stdout.clearLine(0);
    process.stdout.cursorTo(0);
  } else process.stdout.write('\n');
  process.stdout.write(text);
}

/** Adds expression version on options */
function exprOptions(
  options: TJS.DefinitionOrBoolean,
  schema: TJS.Definition,
  exclude: string[]
): void {
  if (schema.definitions) schema.definitions.multilineExpr = EXPR_SCHEMA;
  else schema.definitions = { multilineExpr: EXPR_SCHEMA };

  if (typeof options !== 'object') return;

  const optionsSchema: TJS.DefinitionOrBoolean[] = options.anyOf || options.oneOf || [options];

  optionsSchema.forEach((opt) => exprAddOptions(opt, schema, exclude));
}
function exprAddOptions(
  optionsSchema: TJS.DefinitionOrBoolean,
  schema: TJS.Definition,
  exclude: string[]
): boolean {
  if (typeof optionsSchema === 'object' && optionsSchema.$ref && schema.definitions) {
    optionsSchema = schema.definitions[optionsSchema.$ref.substring(14)];
  }
  if (typeof optionsSchema !== 'object') return false;

  const extendedProp: { [key: string]: TJS.DefinitionOrBoolean } = { ...optionsSchema.properties };

  if (typeof optionsSchema !== 'object' || typeof optionsSchema.properties !== 'object')
    return false;
  delete optionsSchema.patternProperties;
  optionsSchema.additionalProperties = false;
  if (!optionsSchema.allOf) optionsSchema.allOf = [];

  Object.keys(optionsSchema.properties)
    .filter((key) => !key.endsWith('=') && !exclude.includes(key))
    .forEach((key) => {
      const expKey = `${key}=`;
      if (typeof optionsSchema !== 'object') return;
      extendedProp[expKey] = { $ref: '#/definitions/multilineExpr' };
      const origSchema = optionsSchema.properties![key];
      if (typeof origSchema === 'object' && origSchema.description)
        (extendedProp[expKey] as TJS.Definition).description = origSchema.description;

      optionsSchema.allOf!.push({
        if: { required: [key] },
        then: { not: { required: [expKey] } },
      });

      delete optionsSchema.required;
    });

  optionsSchema.properties = extendedProp;
  return true;
}

function findRefs(schema: TJS.Definition): string[] {
  return JP.query(schema, `$..$ref`)
    .values.filter((ref) => typeof ref === 'string' && ref.startsWith('#/definitions/'))
    .map((ref: string) => ref.substring(14));
}

// copy relevant definitions
function walkRefs(
  schema: TJS.DefinitionOrBoolean,
  reffedDefinitions: { [key: string]: TJS.DefinitionOrBoolean },
  definitions?: { [key: string]: TJS.DefinitionOrBoolean }
): void {
  if (typeof schema !== 'object') return;
  const append = !definitions;
  if (!definitions) definitions = {};

  findRefs(schema).forEach((ref) => {
    if (definitions![ref]) return;

    if (typeof reffedDefinitions[ref] !== 'boolean')
      definitions![ref] = reffedDefinitions[ref] as TJS.Definition;
    walkRefs(definitions![ref], reffedDefinitions, definitions);
  });

  if (append) schema.definitions = { ...schema.definitions, ...definitions };
}
