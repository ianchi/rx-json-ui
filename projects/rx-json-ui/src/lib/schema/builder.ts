/*!
 * Copyright (c) 2018 Adrian Panella <ianchi74@outlook.com>
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { AbstractWidgetDef } from '../core/index';

import { ISchema, SchemaArray, SchemaObject, SchemaUI } from './interface';

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
  set: '',
};

export function buildUI(
  schema: Schema,
  bind: string,
  ui?: SchemaUI,
  propInclude?: string[],
  propExclude?: string[]
): AbstractWidgetDef {
  let widget: AbstractWidgetDef = {
    widget: BUILDER_WIDGETS.default,
    bind,
    options: {},
    events: {},
  };

  if (!schema) return widget;
  if (!ui) ui = schema.ui || {};

  switch (schema.type) {
    case 'integer':
      widget.options!.step = 1;

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
      widget = buildObject(schema, bind, propInclude, propExclude);
      break;

    default:
      widget.widget = BUILDER_WIDGETS.default;
  }

  if (ui.widget) widget.widget = ui.widget;

  if (ui.events) {
    for (const e in ui.events) widget.events![e] = ui.events[e];
  }
  if (schema['depends=']) widget.if = schema['depends='];

  widget.options = { ...schema, ...widget.options, ...ui.options };
  delete widget.options!.ui;
  delete widget.options!.properties;
  delete widget.options!['depends='];
  return widget;
}

function buildArray(schema: SchemaArray, bind: string): AbstractWidgetDef {
  const ui = schema.ui || {},
    widget: AbstractWidgetDef = {
      widget: BUILDER_WIDGETS.list,
      bind,
      exportAs: ui.exportAs || '$model',
      elementAs: ui.elementAs,
      indexAs: ui.indexAs,
    };

  if (Array.isArray(schema.items)) {
    // TODO: express tuple case

    widget.content = schema.items.map(sch => buildUI(sch, `${widget.exportAs}[$index]`));
    if (typeof schema.additionalItems === 'object') {
      widget.options = { additionalItems: true };
      widget.content.push(buildUI(schema.additionalItems, `${widget.exportAs}[$index]`));
    } else widget.options = { additionalItems: false };
  } else if (typeof schema.items === 'object') {
    widget.options = { additionalItems: true };
    widget.content = [buildUI(schema.items, `${widget.exportAs}[$index]`)];
    switch (schema.items.type) {
      case 'object':
        widget.options.newRow = '{}';
        widget.widget = BUILDER_WIDGETS.array;
        break;
      case 'array':
        widget.options.newRow = '[]';
        widget.widget = BUILDER_WIDGETS.array;
        break;
      case 'string':
        widget.options.newRow = '""';
        break;
      case 'number':
      case 'integer':
        widget.options.newRow = '0';
        break;
      case 'boolean':
        widget.options.newRow = 'false';
        break;
      default:
        widget.options.newRow = '';
        break;
    }
  }

  return widget;
}
function buildObject(
  schema: SchemaObject,
  bind: string,
  _propInclude?: string[],
  propExclude?: string[]
): AbstractWidgetDef {
  const ui: SchemaUI = schema.ui || {},
    widget: AbstractWidgetDef = {
      widget: BUILDER_WIDGETS.object,
      exportAs: ui.exportAs || '$model',
      bind,
    };
  if (schema.properties) {
    let keys = Object.keys(schema.properties),
      ordered: string[];
    if (Array.isArray(ui.order)) {
      ordered = ui.order.filter(prop => prop in schema.properties!);
      ordered = ordered.concat(keys.filter(prop => !ordered.includes(prop)));
    } else ordered = keys;

    keys = ordered;
    widget.content = { main: [] };

    if (ui.fieldsets) {
      const sets = ui.fieldsets.sets,
        defaultSet =
          typeof ui.fieldsets.default === 'number'
            ? ui.fieldsets.default
            : ui.fieldsets.sets.length;

      if (!sets[defaultSet].fields) sets[defaultSet].fields = [];

      ordered.forEach(prop => {
        const propSchema = schema.properties![prop];
        if (propSchema.ui && typeof propSchema.ui.fieldset !== 'undefined') {
          if (!sets[propSchema.ui.fieldset].fields.includes(prop))
            sets[propSchema.ui.fieldset].fields.push(prop);
        } else {
          for (const fset of sets) {
            if (fset.fields && fset.fields.includes(prop)) return;
          }

          sets[defaultSet].fields.push(prop);
        }
      });

      for (const fset of sets) {
        // ignore fields not present in properties
        const fields = fset.fields.filter(prop => prop in schema.properties!);

        // hide empty field sets
        if (fields.length)
          widget.content.main.push({
            widget: BUILDER_WIDGETS.set,
            bind: widget.exportAs,
            exportAs: widget.exportAs,
            content: fields.map(prop =>
              buildUI(schema.properties![prop], `${widget.exportAs}['${prop}']`)
            ),
          });
      }
      widget.content.main = [
        {
          widget: 'tabs',
          options: { tabLabels: sets.map(fset => fset.title) },
          content: widget.content,
        },
      ];
    } else
      widget.content!.main = ordered
        .filter(prop => !(propExclude && propExclude.includes(prop)))
        .map(prop => buildUI(schema.properties![prop], `${widget.exportAs}['${prop}']`));
  }
  return widget;
}

function hasProp<T>(prop: keyof T, obj: T): boolean {
  // tslint:disable-next-line:prefer-template
  return prop in obj || prop + '=' in obj;
}
