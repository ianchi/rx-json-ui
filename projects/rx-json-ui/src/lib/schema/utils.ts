/*!
 * Copyright (c) 2018 Adrian Panella <ianchi74@outlook.com>
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Schema } from './interface';

export function setSchemaDefaults(obj: any, schema?: Schema | boolean): void {
  if (typeof obj !== 'object' || typeof schema !== 'object') return;

  if (Array.isArray(obj)) {
    if (schema.type !== 'array' || !schema.items) return;

    for (
      let i = 0;
      i < obj.length &&
      (!Array.isArray(schema.items) || i < schema.items.length || schema.additionalItems);
      i++
    ) {
      const itemSchema = Array.isArray(schema.items)
        ? i < schema.items.length
          ? schema.items[i]
          : schema.additionalItems
        : schema.items;
      setSchemaDefaults(obj[i], itemSchema);
    }
  } else {
    if (schema.type !== 'object' || !schema.properties) return;

    // tslint:disable-next-line: forin
    for (const key in schema.properties) {
      const propSchema = schema.properties[key];
      if (typeof obj[key] === 'undefined') {
        if ('default' in propSchema) obj[key] = propSchema.default;
      } else setSchemaDefaults(obj[key], schema.properties[key]);
    }
  }
}
