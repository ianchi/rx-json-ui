/*!
 * Copyright (c) 2018 Adrian Panella <ianchi74@outlook.com>
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { AbstractFieldWidgetDef, AbstractWidgetDef } from '../core/index';

import { Schema, SchemaArray, SchemaObject, SchemaPartialObject, SchemaUI } from './interface';

export const BUILDER_WIDGETS = {
  default: 'default',
  number: 'set-input',
  integer: 'set-input',
  string: 'set-input',
  enum: 'set-select',
  boolean: 'set-toggle',
  array: 'set-rowarray',
  list: 'set-list',
  object: 'set-expansion',
  set: 'set-container',
};

export function buildUI(schema: Schema, bind: string, ui?: SchemaUI): AbstractWidgetDef;
export function buildUI(
  schema: Schema,
  bind: string,
  uiOrInclude?: SchemaUI | string | string[],
  include?: string | string[]
): AbstractWidgetDef | AbstractWidgetDef[];
export function buildUI(
  schema: Schema,
  bind: string,
  uiOrInclude?: SchemaUI | string | string[],
  include?: string | string[]
): AbstractWidgetDef | AbstractWidgetDef[] {
  let widget: AbstractWidgetDef = {
    widget: BUILDER_WIDGETS.default,
    bind,
    options: { class: '' },
    events: {},
  };

  if (!schema) return widget;

  if (typeof uiOrInclude === 'string' || Array.isArray(uiOrInclude)) {
    include = uiOrInclude;
    uiOrInclude = {};
  }

  const ui = { ...schema.ui, ...uiOrInclude };
  let objectUI: AbstractWidgetDef | AbstractWidgetDef[];

  switch (schema.type) {
    case 'integer':
      widget.options!.multipleOf = 1;

    // tslint:disable-next-line:no-switch-case-fall-through
    case 'number':
      widget.options!.inputType = 'number';

    // tslint:disable-next-line:no-switch-case-fall-through
    case 'string':
      widget.widget = hasProp('enum', schema) ? BUILDER_WIDGETS.enum : BUILDER_WIDGETS.string;
      break;

    case 'boolean':
      widget.widget = BUILDER_WIDGETS.boolean;
      break;

    case 'array':
      widget = buildArray(schema, bind);
      // TODO: add newRow
      break;

    case 'object':
      objectUI = buildObject(schema, bind, include);

      if (Array.isArray(objectUI)) return objectUI;
      else widget = objectUI;
      break;

    default:
      widget.widget = BUILDER_WIDGETS.default;
  }

  if (ui.widget) widget.widget = ui.widget;

  if (ui.events) {
    for (const e in ui.events) widget.events![e] = ui.events[e];
  }
  if (schema['depends=']) widget.if = schema['depends='];

  widget.options = { class: '', ...schema, ...widget.options, ...ui.options };
  delete widget.options!.ui;
  delete widget.options!.properties;
  delete widget.options!['depends='];
  return widget;
}

interface FilterMatch {
  full: string;
  exclude: boolean;
  key: string;
  group: boolean;
  wildcard: string;
}
function buildArray(schema: SchemaArray, bind: string): AbstractWidgetDef {
  const widget: AbstractWidgetDef = {
    widget: BUILDER_WIDGETS.list,
    bind,
  };
  let additionalItems: Schema | undefined;

  if (Array.isArray(schema.items)) {
    // TODO: express tuple case

    widget.content = schema.items.map((sch) => buildUI(sch, `$row.array[$row.index]`));
    if (typeof schema.additionalItems === 'object') {
      additionalItems = schema.additionalItems;
      widget.content.push(buildUI(schema.additionalItems, `$row.array[$row.index]`));
    }
  } else if (typeof schema.items === 'object') {
    additionalItems = schema.items;
    widget.content = [buildUI(schema.items, `$row.array[$row.index]`)];
    widget.events = { onDeleteRow: 'true' };

    switch (additionalItems.type) {
      case 'object':
        widget.events.onNewRow = '{}';
        widget.widget = BUILDER_WIDGETS.array;
        break;
      case 'array':
        widget.events.onNewRow = '[]';
        widget.widget = BUILDER_WIDGETS.array;
        break;
      case 'string':
        widget.events.onNewRow = '""';
        break;
      case 'number':
      case 'integer':
        widget.events.onNewRow = '0';
        break;
      case 'boolean':
        widget.events.onNewRow = 'false';
        break;
      default:
        break;
    }
  }

  return widget;
}

/**
 * Generate widget definition from SchemaObject
 *
 * @return When a property/group is included, the return is an array without the wrapper widget.
 * @param filter Property/Group (s) to include or exclude from the schema.
 * It can be any individual or array of:
 * - `property` to include a single property
 * - `#/group` to include all the group (with a wrapping widget)
 * - `*` to include root properties and groups
 * - `**` to include root properties and nested properties extracted from the groups
 * - `#/group/*` to include group's main properties and subgroups
 * - `#/group/**` to include group's main properties and nested properties extracted from the subgroups
 *
 * If you include a property multiple times it will be translated into multiple widgets for the same.
 *
 * Any of this options can also be negated prepending a `!` to excluded from the resulting set.
 */

function buildObject(schema: SchemaObject, bind: string): AbstractWidgetDef;
function buildObject(
  schema: SchemaObject,
  bind: string,
  filter?: string | string[]
): AbstractWidgetDef | AbstractWidgetDef[];
function buildObject(
  schema: SchemaObject,
  bind: string,
  filter?: string | string[]
): AbstractWidgetDef | AbstractWidgetDef[] {
  const widget: AbstractFieldWidgetDef = {
    widget: BUILDER_WIDGETS.object,
    bind,
  };
  const content = [] as AbstractWidgetDef[];
  const include: FilterMatch[] = [];
  const exclude: FilterMatch[] = [];
  const excludeFilter: string[] = [];

  // parse filter
  if (filter) {
    if (!Array.isArray(filter)) filter = [filter];

    const re = /^(!)?((#\/)?.+?)(?:\/(\*{1,2}))?$/;
    filter.forEach((propName) => {
      const [full, negate, key, group, wildcard] = re.exec(propName) ?? [];

      if (full) {
        const match: FilterMatch = { full, exclude: !!negate, key, wildcard, group: !!group };
        if (negate) {
          exclude.push(match);
          excludeFilter.push(full);
        } else include.push(match);
      }
    });
  }

  // if there is some include, return only the elements as array

  if (include.length) {
    include.forEach((item) => {
      if (item.group) {
        // it is group

        if (schema.allOf) {
          const matchedGroups = schema.allOf.filter(
            (group) =>
              !('$include' in group) &&
              (group.$id === item.key || item.key === '#/*/') &&
              !exclude.some((ex) => !ex.wildcard && (ex.key === '#/*/' || ex.key === item.key))
          );
          if (!item.wildcard)
            matchedGroups.forEach((group) =>
              content.push(
                buildUI(group as SchemaPartialObject, `${bind}`, excludeFilter) as AbstractWidgetDef
              )
            );
          else
            matchedGroups.forEach((group) => {
              if ('$include' in group) return;
              const level = item.wildcard === '**' ? Infinity : 0;
              getPropertiesFromSchema(group, level)
                .filter((prop) => !exclude.some((ex) => !ex.wildcard && ex.key === prop.property))
                .forEach((prop) =>
                  content.push(buildUI(prop.schema, `${bind}['${prop.property}']`))
                );
            });
        }
      } else {
        // It is a plain property
        const level = item.key === '*' ? 0 : item.key === '**' ? Infinity : null;

        if (level === null) {
          if (!exclude.some((ex) => ex.key === item.key || ex.key === '*' || ex.key === '**'))
            getPropertySchemas(schema, item.key).forEach((propSchema) =>
              content.push(buildUI(propSchema, `${bind}['${item}']`))
            );
        } else
          getPropertiesFromSchema(schema, level)
            .filter(
              (prop) =>
                !exclude.some((ex) => ex.key === prop.property || ex.key === '*' || ex.key === '**')
            )
            .forEach((prop) => content.push(buildUI(prop.schema, `${bind}['${prop.property}']`)));
      }
    });

    return content;
  } else {
    // first add main properties outside any grouping
    if (schema.properties) {
      const properties = schema.properties;

      Object.keys(properties).forEach((key) =>
        content.push(buildUI(properties[key], `${bind}['${key}']`))
      );
    }

    // then add groups of properties from `allOf`
    if (schema.allOf)
      schema.allOf.forEach((group) => {
        // `$include` should already be resolved and removed by this time (in `loadSchema`)
        // Ignore it just in case un unresolved schema is passed as input.
        if (!('$include' in group)) content.push(buildUI(group, bind));
      });

    if (content.length) widget.content = content;
    return widget;
  }
}

function hasProp<T>(prop: keyof T, obj: T): boolean {
  // tslint:disable-next-line:prefer-template
  return prop in obj || prop + '=' in obj;
}

/**
 * Get the schema of an individual property from an object's schema.
 * Returns an array as the property can potentially be defined in multiple `allOf` groups
 */
export function getPropertySchemas(schema: SchemaPartialObject, propName: string): Schema[] {
  const results: Schema[] = [];
  // main properties
  if (schema.properties && propName in schema.properties) results.push(schema.properties[propName]);

  // groups

  if (schema.allOf)
    schema.allOf.forEach(
      // TODO: prepend groups `depends=` with property's one
      (group) => !('$include' in group) && results.push(...getPropertySchemas(group, propName))
    );

  return results;
}

/**
 * Returns all property's names from the schema, getting from main outer properties
 * and nested groups (optionally limiting the depth)
 */
export function getPropertiesFromSchema(
  schema: SchemaPartialObject,
  includeLevel?: number
): Array<{ property: string; schema: Schema }> {
  let properties: Array<{ property: string; schema: Schema }> = schema.properties
    ? Object.keys(schema.properties).map((property) => ({
        property,
        schema: schema.properties![property],
      }))
    : [];

  if (includeLevel && schema.allOf)
    schema.allOf.forEach(
      (group) =>
        !('$include' in group) &&
        (properties = properties.concat(getPropertiesFromSchema(group, includeLevel - 1)))
    );

  return properties;
}
