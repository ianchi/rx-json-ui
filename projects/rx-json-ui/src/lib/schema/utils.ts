/*!
 * Copyright (c) 2018 Adrian Panella <ianchi74@outlook.com>
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { ISchema } from "./interface";

export function setSchemaDefaults(obj: any, schema?: ISchema | boolean): void {

  if (typeof obj !== 'object' || typeof schema!=='object') return;

  if (Array.isArray(obj)) {

    if (schema.type !== 'array' || !schema.items) return;

      for(let i=0; i < obj.length && (!Array.isArray(schema.items) || i < schema.items.length || schema.additionalItems); i++) {
        const itemSchema = Array.isArray(schema.items) ? (i < schema.items.length ? schema.items[i] :  schema.additionalItems ): schema.items;
        setSchemaDefaults(obj[i], itemSchema)
      }
  } else {
    if (schema.type !== 'object' || !schema.properties) return;

    for (const key in schema.properties) {
      if (typeof obj[key] === 'undefined') {
        if ('default' in schema.properties[key]) obj[key] = schema.properties[key].default;
      } else setSchemaDefaults(obj[key], schema.properties[key]);
    }
  }
}
