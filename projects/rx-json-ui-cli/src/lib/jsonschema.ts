import * as path from 'path';
import * as fs from 'fs';
import * as ts from 'typescript';
import * as TJS from 'typescript-json-schema';
import { JsonPath } from 'espression-jsonpath';
import { visitModule, loadMetadata } from './metadata';
import { Ajv } from 'ajv';

const WIDGETREF = 'WidgetDef<AbstractOptionsDef,AbstractSlotContentDef,AbstractEventsDef,boolean>';

const JP = new JsonPath();

export function generateSchemas(ajv: Ajv) {
  const basePath = 'projects/rx-json-ui';
  const outPath = 'dist/jsonschema';
  const outSchemaFile = 'AppWidgetDef.schema.json';
  const baseID = 'http://ianchi.github.io/rx-json-ui';

  const file = path.resolve(basePath, 'src/public_api.ts');
  const settings: TJS.PartialArgs = {
    aliasRef: false,
    ref: true,
    topRef: false,
    noExtraProps: true,
    excludePrivate: true,
    required: true,
    validationKeywords: ['parser'],
  };
  const program = TJS.getProgramFromFiles([file], undefined, basePath);

  const generator = TJS.buildGenerator(program, settings);

  let symbols = generator.getUserSymbols();
  const widgets = {} as { [tag: string]: string };
  visitModule(
    loadMetadata(path.resolve('out-tsc/app/src/app/app.module.metadata.json')),
    'AppModule',
    widgets
  );

  fs.rmdirSync(path.resolve(outPath), { recursive: true });
  fs.mkdirSync(path.resolve(outPath), { recursive: true });

  const widgetSchema = {
    $schema: 'http://json-schema.org/draft-07/schema#',
    $id: `${baseID}/${outSchemaFile}`,
    type: 'object',
    properties: {
      widget: {
        description: 'Type of the Widget to instantiate',
        type: 'string',
        enum: [],
      },
    },
    required: ['widget'],
  };

  let parent: any = widgetSchema;
  const tags: string[] = [];

  Object.entries(widgets).forEach(([tag, symbolName]) => {
    if (!symbols.includes(symbolName)) return;
    const component = TJS.generateSchema(program, symbolName, settings);

    // check component and get symbol
    if (!component.definitions) return;
    if (typeof component.properties !== 'object') return;

    let symbolDef = component.properties.jsonWidgetDef;

    if (typeof symbolDef !== 'object') return;
    if (symbolDef.$ref) {
      symbolDef = component.definitions[symbolDef.$ref.substring(14)];
      if (typeof symbolDef !== 'object') return;
    }
    if (typeof symbolDef.properties !== 'object') return;

    // Reference consolidated schema
    const definitions = {};
    definitions[WIDGETREF] = { $ref: `${outSchemaFile}#` };

    // Generate schema for def

    symbolDef.properties.widget = {
      type: 'string',
      const: tag,
      description: component.description,
    };

    // copy relevant definitions
    const walkRefs = schema => {
      findRefs(schema).forEach(ref => {
        if (definitions[ref]) return;

        definitions[ref] = component.definitions[ref];
        walkRefs(definitions[ref]);
      });
    };
    walkRefs(symbolDef);

    // complete general properties

    const schemaFile = tag + '.schema.json';
    symbolDef.$schema = 'http://json-schema.org/draft-07/schema#';
    symbolDef.$id = `${baseID}/${schemaFile}`;
    symbolDef.definitions = definitions;

    // generate expression options
    if (typeof symbolDef.properties.options === 'object') ExprOptions(symbolDef);

    // save schema
    parent.if = {
      properties: { widget: { const: tag } },
    };
    parent.then = { $ref: `${schemaFile}#` };
    parent.else = {};
    parent = parent.else;

    if (ajv) ajv.addSchema(symbolDef);
    fs.writeFileSync(path.resolve(outPath, schemaFile), JSON.stringify(symbolDef, undefined, 2));
    tags.push(tag);
  });

  widgetSchema.properties.widget.enum = tags;

  fs.writeFileSync(
    path.resolve(outPath, outSchemaFile),
    JSON.stringify(widgetSchema, undefined, 2)
  );

  return ajv.compile(widgetSchema);
}
/** Adds expression version on options */
function ExprOptions(schema: TJS.Definition): void {
  let optionsSchema = schema.properties.options;
  if (typeof optionsSchema === 'object' && optionsSchema.$ref && schema.definitions) {
    optionsSchema = schema.definitions[optionsSchema.$ref.substring(14)];
  }

  if (typeof optionsSchema !== 'object' || typeof optionsSchema.properties !== 'object') return;

  delete optionsSchema.patternProperties;
  optionsSchema.additionalProperties = false;

  const extendedProp = { ...optionsSchema.properties };
  const exprSchema = {
    anyOf: [{ type: 'array', items: { type: 'string' } }, { type: 'string' }],
    parser: 'multi-ES6',
  };
  if (schema.definitions) schema.definitions.multilineExpr = exprSchema;
  else schema.definitions = { multilineExpr: exprSchema };

  if (!optionsSchema.allOf) optionsSchema.allOf = [];

  Object.keys(optionsSchema.properties)
    .filter(key => !key.endsWith('='))
    .forEach(key => {
      if (typeof optionsSchema !== 'object') return;
      extendedProp[key + '='] = { $ref: '#/definitions/multilineExpr' };
      const origSchema = optionsSchema.properties[key];
      if (typeof origSchema === 'object' && origSchema.description)
        (extendedProp[key + '='] as TJS.Definition).description = origSchema.description;

      optionsSchema.allOf.push({
        if: { required: [key] },
        then: { not: { required: [key + '='] } },
      });

      delete optionsSchema.required;
    });

  optionsSchema.properties = extendedProp;
  if (!optionsSchema.allOf.length) delete schema.properties.options;
}

function findRefs(schema) {
  return JP.query(schema, `$..$ref`)
    .values.filter(ref => typeof ref == 'string' && ref.startsWith('#/definitions/'))
    .map((ref: string) => ref.substring(14));
}
