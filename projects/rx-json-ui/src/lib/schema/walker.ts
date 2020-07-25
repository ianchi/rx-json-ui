/*!
 * Copyright (c) 2020 Adrian Panella <ianchi74@outlook.com>
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { forkJoin, Observable, of } from 'rxjs';
import { map, switchMap, take, tap } from 'rxjs/operators';

import { Context, Expressions } from '../core';

import { Schema, SchemaInclude, SchemaPartialObject } from './interface';
export type SchemaWalkFn = (schema: Schema | SchemaInclude, lastId?: string) => void;
export type SchemaIncludeFn = (path: string, id?: string) => Observable<Schema | Schema[]>;

/**
 * Walks all nested schemas of the schema calling the `walkFn` from inner to outer.
 */
export function walkSchema(
  schema: Schema | SchemaInclude,
  walkFn: SchemaWalkFn,
  lastId?: string
): void {
  if (!schema) return;

  if ('type' in schema)
    switch (schema.type) {
      case 'object':
        if (schema.properties) {
          const properties = schema.properties;
          Object.keys(properties).forEach((key) =>
            walkSchema(properties[key], walkFn, schema.$id ?? lastId)
          );
        }

        if (schema.patternProperties) {
          const properties = schema.patternProperties;
          Object.keys(properties).forEach((key) =>
            walkSchema(properties[key], walkFn, schema.$id ?? lastId)
          );
        }

        if (Array.isArray(schema.allOf))
          schema.allOf.forEach((partial) => walkSchema(partial, walkFn, schema.$id ?? lastId));
        break;

      case 'array':
        if (Array.isArray(schema.items))
          schema.items.forEach((item) => walkSchema(item, walkFn, lastId));
        else if (schema.items) walkSchema(schema.items, walkFn);

        if (typeof schema.additionalItems === 'object')
          walkSchema(schema.additionalItems, walkFn, lastId);
        break;

      default:
    }

  walkFn(schema, lastId);
}

export function loadSchema(
  path: string,
  includeFn: SchemaIncludeFn,
  id?: string,
  expr?: Expressions,
  context: Context = {}
): Observable<Schema[]> {
  if (!path) throw new Error('Must provide Schema path');

  return includeFn(path, id).pipe(
    switchMap((schemaOrArray) => {
      const included: Array<Observable<Schema | Schema[]>> = [];
      // flatten array to allow import of SchemaPartialObject | SchemaPartialObject[]
      const schemas = Array.isArray(schemaOrArray) ? schemaOrArray.flat() : [schemaOrArray];

      schemas.forEach((schema) => {
        // execute $onLoad handler
        if (schema.$onLoad && expr)
          included.push(expr.eval(schema.$onLoad, context, true).pipe(take(1)));

        // load $include
        walkSchema(schema, (subSchema, lastId) => {
          if ('$include' in subSchema) {
            included.push(
              loadSchema(subSchema.$include, includeFn, lastId, expr, context).pipe(
                tap((includedSchemas) => ((subSchema as any).__resolved = includedSchemas))
              )
            );
          }
        });
      });

      return !included.length
        ? of(schemas)
        : forkJoin(included).pipe(
            map(() => {
              schemas.forEach((schema) =>
                walkSchema(schema, (subSchema) => {
                  // remove `resolved` and insert directly into `allOf` array
                  if ('allOf' in subSchema && Array.isArray(subSchema.allOf)) {
                    const allOf: SchemaPartialObject[] = [];
                    subSchema.allOf.forEach((element) => {
                      const resolved = (element as any).__resolved as
                        | SchemaPartialObject
                        | SchemaPartialObject[];
                      if (Array.isArray(resolved))
                        resolved.forEach((s) => s.type === 'object' && allOf.push(s));
                      else if (resolved && resolved.type === 'object') allOf.push(resolved);
                      else if (!('$include' in element)) allOf.push(element);
                    });
                    subSchema.allOf = allOf;
                  }
                })
              );
              return schemas;
            })
          );
    })
  );
}
