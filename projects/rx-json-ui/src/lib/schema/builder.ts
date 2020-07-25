/*!
 * Copyright (c) 2018 Adrian Panella <ianchi74@outlook.com>
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { AbstractFieldWidgetDef, AbstractWidgetDef } from '../core/index';

import {
  Schema,
  SchemaArray,
  SchemaObject,
  SchemaPartialObject,
  SchemaUI,
  WidgetMap,
} from './interface';

export const BUILDER_WIDGETS: WidgetMap = {
  default: 'default',
  number: 'set-input',
  integer: 'set-input',
  range: 'set-slider',
  string: 'set-input',
  select: 'set-select',
  autocomplete: 'set-autocomplete',
  boolean: 'set-toggle',
  array: 'set-rowarray',
  list: 'set-list',
  object: 'set-expansion',
  unheaderedObject: 'set-container',
  objectLevel: ['set-page', 'set-section', 'set-expansion'],
};

export function buildUI(schema: Schema, bind: string, uiOrInclude?: SchemaUI): AbstractWidgetDef;
export function buildUI(
  schema: Schema,
  bind: string,
  uiOrInclude?: SchemaUI | string | string[],
  ui?: SchemaUI
): AbstractWidgetDef | AbstractWidgetDef[];
export function buildUI(
  schema: Schema,
  bind: string,
  uiOrInclude?: SchemaUI | string | string[],
  ui?: SchemaUI
): AbstractWidgetDef | AbstractWidgetDef[] {
  let include: string | string[] | undefined;
  if (typeof uiOrInclude === 'string' || Array.isArray(uiOrInclude)) include = uiOrInclude;
  else if (typeof uiOrInclude === 'object') ui = uiOrInclude;
  ui = ui ?? {};

  const widgetMap: WidgetMap = { ...BUILDER_WIDGETS, ...ui.widgets };

  ui = { ...schema.ui, ...ui, ...{ widgets: widgetMap } };

  let widget: AbstractWidgetDef = {
    widget: widgetMap.default,
    bind,
    options: { class: '' },
    events: {},
  };

  if (!schema) return widget;

  let objectUI: AbstractWidgetDef | AbstractWidgetDef[];

  switch (schema.type) {
    case 'integer':
      widget.options!.multipleOf = 1;

    // tslint:disable-next-line:no-switch-case-fall-through
    case 'number':
      widget.options!.inputType = 'number';
      widget.widget = hasProp('enum', schema) ? widgetMap.select : widgetMap[schema.type];
      break;
    // tslint:disable-next-line:no-switch-case-fall-through
    case 'string':
      widget.widget = hasProp('enum', schema) ? widgetMap.select : widgetMap.string;
      break;

    case 'boolean':
      widget.widget = widgetMap.boolean;
      break;

    case 'array':
      widget = buildArray(schema, bind, ui);
      // TODO: add newRow
      break;

    case 'object':
      objectUI = buildObject(schema, bind, include, ui);

      if (Array.isArray(objectUI)) return objectUI;
      else widget = objectUI;
      break;

    default:
      widget.widget = widgetMap.default;
  }

  if (ui.widget) widget.widget = ui.widget;
  else if (ui.role && typeof widgetMap[ui.role as keyof WidgetMap] === 'string')
    widget.widget = widgetMap[ui.role as keyof WidgetMap] as string;

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
function buildArray(schema: SchemaArray, bind: string, ui: SchemaUI): AbstractWidgetDef {
  const widgetMap = (ui.widgets as WidgetMap) ?? BUILDER_WIDGETS;
  const widget: AbstractWidgetDef = {
    widget: widgetMap.list,
    bind,
  };
  let additionalItems: Schema | undefined;

  if (Array.isArray(schema.items)) {
    // TODO: express tuple case

    widget.content = schema.items.map((sch) => buildUI(sch, `$row.array[$row.index]`, ui));
    if (typeof schema.additionalItems === 'object') {
      additionalItems = schema.additionalItems;
      widget.content.push(buildUI(schema.additionalItems, `$row.array[$row.index]`, ui));
    }
  } else if (typeof schema.items === 'object') {
    additionalItems = schema.items;
    widget.content = [buildUI(schema.items, `$row.array[$row.index]`, ui)];
    widget.events = { onDeleteRow: 'true' };

    switch (additionalItems.type) {
      case 'object':
        widget.events.onNewRow = '{}';
        widget.widget = widgetMap.array;
        break;
      case 'array':
        widget.events.onNewRow = '[]';
        widget.widget = widgetMap.array;
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

function buildObject(
  schema: SchemaObject,
  bind: string,
  filter: string | string[] | undefined,
  ui: SchemaUI
): AbstractWidgetDef | AbstractWidgetDef[] {
  const widgetMap = (ui.widgets as WidgetMap) ?? BUILDER_WIDGETS;
  const hasHeader = !!(hasProp('title', schema) || hasProp('description', schema));
  const widget: AbstractFieldWidgetDef = {
    widget: !hasHeader
      ? widgetMap.unheaderedObject
      : typeof ui.level !== 'number'
      ? widgetMap.object
      : ui.level >= widgetMap.objectLevel.length
      ? widgetMap.objectLevel[widgetMap.objectLevel.length - 1]
      : widgetMap.objectLevel[ui.level],
    bind,
  };
  const content = [] as AbstractWidgetDef[];
  const include: FilterMatch[] = [];
  const exclude: FilterMatch[] = [];
  const excludeFilter: string[] = [];
  const nextUI = {
    ...ui,
    level: typeof ui.level !== 'number' ? undefined : ui.level + (hasHeader ? 1 : 0),
  };
  delete nextUI.widget;
  delete nextUI.role;

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
                buildUI(
                  group as SchemaPartialObject,
                  `${bind}`,
                  excludeFilter,
                  ui
                ) as AbstractWidgetDef
              )
            );
          else
            matchedGroups.forEach((group) => {
              if ('$include' in group) return;
              const propLevel = item.wildcard === '**' ? Infinity : 0;
              getPropertiesFromSchema(group, propLevel)
                .filter((prop) => !exclude.some((ex) => !ex.wildcard && ex.key === prop.property))
                .forEach((prop) =>
                  content.push(buildUI(prop.schema, `${bind}['${prop.property}']`, ui))
                );
            });
        }
      } else {
        // It is a plain property
        const propLevel = item.key === '*' ? 0 : item.key === '**' ? Infinity : null;

        if (propLevel === null) {
          if (!exclude.some((ex) => ex.key === item.key || ex.key === '*' || ex.key === '**'))
            getPropertySchemas(schema, item.key).forEach((propSchema) =>
              content.push(buildUI(propSchema, `${bind}['${item.key}']`, ui))
            );
        } else
          getPropertiesFromSchema(schema, propLevel)
            .filter(
              (prop) =>
                !exclude.some((ex) => ex.key === prop.property || ex.key === '*' || ex.key === '**')
            )
            .forEach((prop) =>
              content.push(buildUI(prop.schema, `${bind}['${prop.property}']`, ui))
            );
      }
    });

    return content;
  } else {
    // first add main properties outside any grouping
    if (schema.properties) {
      const properties = schema.properties;

      Object.keys(properties).forEach((key) =>
        content.push(buildUI(properties[key], `${bind}['${key}']`, nextUI))
      );
    }

    // then add groups of properties from `allOf`
    if (schema.allOf)
      schema.allOf.forEach((group) => {
        // `$include` should already be resolved and removed by this time (in `loadSchema`)
        // Ignore it just in case un unresolved schema is passed as input.
        if (!('$include' in group)) content.push(buildUI(group, bind, nextUI));
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
