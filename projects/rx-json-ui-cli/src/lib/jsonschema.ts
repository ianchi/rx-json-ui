/*!
 * Copyright (c) 2018 Adrian Panella <ianchi74@outlook.com>
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { JsonPath } from 'espression-jsonpath';
import * as fs from 'fs';
import * as path from 'path';
import * as TJS from 'typescript-json-schema';

import { WidgetRef } from './metadata';

const JP = new JsonPath();
const EXPR_SCHEMA = {
  anyOf: [{ type: 'array', items: { type: 'string' } }, { type: 'string' }],
  parser: 'ES6',
};

export function generateSchemas(
  program: TJS.Program,
  widgets: WidgetRef[],
  outPath: string,
  outSchemaFile: string,
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

  fs.rmdirSync(path.resolve(outPath), { recursive: true });
  fs.mkdirSync(path.resolve(outPath), { recursive: true });

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

  // for strictNullChecks == false
  generator.setSchemaOverride(
    'WidgetDef<AbstractOptionsDef,AbstractSlotContentDef,AbstractEventsDef,boolean>',
    { $ref: `${outSchemaFile}#` }
  );
  // for strictNullChecks == true
  generator.setSchemaOverride(
    'WidgetDef<AbstractOptionsDef,AbstractSlotContentDef,AbstractEventsDef,boolean|undefined>',
    { $ref: `${outSchemaFile}#` }
  );

  widgets.forEach(({ type: tag, component: { name: symbolName } }, i) => {
    process.stdout.clearLine(0);
    process.stdout.cursorTo(0);
    process.stdout.write(`Generating schemas ${i + 1}/${widgets.length}`);

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

    // Reference consolidated schema
    const definitions: { [prop: string]: TJS.Definition } = {};

    // Generate schema for def

    symbolDef.properties.widget = {
      type: 'string',
      const: tag,
      description: component.description,
    };

    // copy relevant definitions
    const walkRefs = (schema: TJS.Definition) => {
      findRefs(schema).forEach(ref => {
        if (definitions[ref]) return;

        if (typeof componentDefinitions[ref] !== 'boolean')
          definitions[ref] = componentDefinitions[ref] as TJS.Definition;
        walkRefs(definitions[ref]);
      });
    };
    walkRefs(symbolDef);

    // complete general properties

    const schemaFile = `${tag}.schema.json`;
    symbolDef.$schema = 'http://json-schema.org/draft-07/schema#';
    symbolDef.$id = `${base}/${schemaFile}`;
    symbolDef.definitions = definitions;
    symbolDef.description = component.description;

    // generate expression options
    if (typeof symbolDef.properties.options === 'object') exprOptions(symbolDef);

    // ensure 'parser' on events, in case there was no jsDoc
    if (typeof symbolDef.properties.events === 'object' && symbolDef.properties.events.properties) {
      for (const event in symbolDef.properties.events.properties) {
        if (
          typeof symbolDef.properties.events.properties[event] === 'object' &&
          !(symbolDef.properties.events.properties[event] as any).parser
        )
          (symbolDef.properties.events.properties[event] as any).parser = 'ES6';
      }
    }

    // remove undefined `bind`
    if (
      typeof symbolDef.properties.bind === 'object' &&
      symbolDef.properties.bind.type === 'undefined'
    )
      delete symbolDef.properties.bind;

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
  const contentFile = `${path.basename(outSchemaFile, 'json')}content.json`;
  contentSchema.$id = `${base}/${contentFile}`;
  if (!contentSchema.definitions) contentSchema.definitions = {};
  findRefs(contentSchema).forEach(
    ref => (contentSchema.definitions![ref] = generator.ReffedDefinitions[ref])
  );

  fs.writeFileSync(path.resolve(outPath, contentFile), JSON.stringify(contentSchema, undefined, 2));

  process.stdout.clearLine(0);
  process.stdout.cursorTo(0);

  process.stdout.write('Schema files generated\n');
}
/** Adds expression version on options */
function exprOptions(schema: TJS.Definition): void {
  let optionsSchema: TJS.DefinitionOrBoolean[];

  if (!schema.properties) return;

  if (schema.definitions) schema.definitions.multilineExpr = EXPR_SCHEMA;
  else schema.definitions = { multilineExpr: EXPR_SCHEMA };

  if (typeof schema.properties.options !== 'object') return;

  optionsSchema = schema.properties.options.anyOf ||
    schema.properties.options.oneOf || [schema.properties.options];

  let hasOptions = false;
  optionsSchema.map(options => (hasOptions = hasOptions || exprAddOptions(options, schema)));
  // if (!hasOptions) delete schema.properties.options;
}
function exprAddOptions(optionsSchema: TJS.DefinitionOrBoolean, schema: TJS.Definition): boolean {
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
    .filter(key => !key.endsWith('='))
    .forEach(key => {
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
    .values.filter(ref => typeof ref === 'string' && ref.startsWith('#/definitions/'))
    .map((ref: string) => ref.substring(14));
}
