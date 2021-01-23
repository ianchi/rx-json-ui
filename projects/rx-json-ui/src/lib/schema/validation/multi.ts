/*!
 * Copyright (c) 2018 Adrian Panella <ianchi74@outlook.com>, contributors.
 * Licensed under the MIT license.
 */

import {
  Schema,
  SchemaArray,
  SchemaBoolean,
  SchemaNumber,
  SchemaObject,
  SchemaString,
  ValidatorFn,
} from '../interface';

import { ERROR_MSG, ERR_TYPE } from './base';
import { booleanValidator } from './boolean';
import { numberValidator } from './number';
import { stringValidator } from './string';

export { ERROR_MSG } from './base';

export const EARR_MIN = 30;
export const EARR_MAX = 31;
export const EARR_UNQ = 32;
export const EARR_ITM = 33;
export const EARR_ADD = 34;

export const EOBJ_MIN = 40;
export const EOBJ_MAX = 41;
export const EOBJ_NAME = 42;
export const EOBJ_ADD = 43;
export const EOBJ_PROP = 44;

ERROR_MSG[EARR_MIN] = "`Must have at least '${$err.minItems}' items`";
ERROR_MSG[EARR_MAX] = "`Must at most '${$err.maxItems}' items`";
ERROR_MSG[EARR_UNQ] = '`Items must be unique`';
ERROR_MSG[EARR_ITM] = '`Invalid item(s)`';
ERROR_MSG[EARR_ADD] = '`Invalid item(s)`';

ERROR_MSG[EOBJ_MIN] = "`Must have at least '${$err.minProperties}' properties`";
ERROR_MSG[EOBJ_MAX] = "`Must at most '${$err.maxProperties}' properties`";
ERROR_MSG[EOBJ_NAME] = '`Invalid property names`';
ERROR_MSG[EOBJ_ADD] = '`Invalid extra properties`';
ERROR_MSG[EOBJ_PROP] = '`Invalid properties`';

interface ValidatorMap {
  [type: string]: ValidatorFn;
}
export function schemaValidator(schema: Schema): ValidatorFn {
  if (typeof schema.type === 'string')
    switch (schema.type) {
      case 'number':
      case 'integer':
        return numberValidator(schema);

      case 'string':
        return stringValidator(schema);
      case 'boolean':
        return booleanValidator(schema);
      case 'array':
        return arrayValidator(schema);
      case 'object':
        return objectValidator(schema);
      default:
        // invalid type in input json schema
        return (_val) => ({ code: ERR_TYPE, type: (schema as any).type });
    }

  // case or multiple types or any type
  const validators: ValidatorMap = {
    number: numberValidator(schema as SchemaNumber), // eslint-disable-line id-blacklist
    string: stringValidator(schema as SchemaString), // eslint-disable-line id-blacklist
    boolean: booleanValidator(schema as SchemaBoolean), // eslint-disable-line id-blacklist
    array: arrayValidator(schema as SchemaArray),
    object: objectValidator(schema as SchemaObject),
  };
  const types = Array.isArray((schema as any).type) ? (schema as any).type : null;

  return (val) => {
    const type = Array.isArray(val) ? 'array' : typeof val;
    if (types && types.indexOf(type) < 0) return { code: ERR_TYPE, type };
    if (type in validators) return validators[type](val);

    return null;
  };
}

export function arrayValidator(schema: SchemaArray): ValidatorFn {
  // schema definitions for items of an array

  const minItems =
    typeof schema.minItems === 'number' && schema.minItems >= 0 ? schema.minItems : null;
  const maxItems =
    typeof schema.maxItems === 'number' && schema.maxItems >= 0 ? schema.maxItems : null;
  const uniqueItems = !!schema.uniqueItems;
  const itemsValidator =
    Array.isArray(schema.items) || !schema.items ? null : schemaValidator(schema.items);
  const tupleValidator = Array.isArray(schema.items)
    ? schema.items.map((e) => schemaValidator(e))
    : null;
  const additionalItems =
    typeof schema.additionalItems === 'boolean' ? schema.additionalItems : null;
  const additionalValidator =
    typeof schema.additionalItems === 'object' ? schemaValidator(schema.additionalItems) : null;

  return (value: any) => {
    if (typeof value === 'undefined' && !schema.required) return null;
    if (!Array.isArray(value)) return { code: ERR_TYPE, type: 'array' };

    if (minItems !== null && value.length < minItems) return { code: EARR_MIN, minItems };
    if (maxItems !== null && value.length > maxItems) return { code: EARR_MAX, maxItems };

    if (uniqueItems && value.length > 1) {
      // TODO: objects are compared as references and not deep equal
      const unique = new Set(value);
      if (unique.size !== value.length) return { code: EARR_UNQ, unique: true };
    }
    if (itemsValidator) {
      if (value.some((e) => !!itemsValidator(e))) return { code: EARR_ITM, items: true };
    } else if (tupleValidator) {
      if (value.some((e, i) => i < tupleValidator.length && !!tupleValidator[i](e)))
        return { code: EARR_ITM, items: true };

      if (additionalItems === false && value.length > tupleValidator.length)
        return { code: EARR_ADD, additionalItems: true };

      if (additionalValidator && value.length > tupleValidator.length) {
        if (value.slice(tupleValidator.length).some((e) => !!additionalValidator(e)))
          return { code: EARR_ADD, additionalItems: true };
      }
    }

    return null;
  };
}

export function objectValidator(schema: SchemaObject): ValidatorFn {
  // schema definitions for items of an array

  const minProperties =
    typeof schema.minProperties === 'number' && schema.minProperties >= 0
      ? schema.minProperties
      : null;
  const maxProperties =
    typeof schema.maxProperties === 'number' && schema.maxProperties >= 0
      ? schema.maxProperties
      : null;
  const propertyNames = schema.propertyNames ? schemaValidator(schema.propertyNames) : null;
  const additional =
    typeof schema.additionalProperties === 'boolean' ? schema.additionalProperties : null;
  const additionalFn =
    typeof schema.additionalProperties === 'object'
      ? schemaValidator(schema.additionalProperties)
      : null;
  const properties = Object.entries(schema.properties || {}).reduce(
    (res, [k, s]) => ((res[k] = schemaValidator(s)), res),
    {} as ValidatorMap
  );
  const patternProperties = schema.patternProperties
    ? Object.entries(schema.patternProperties).map<[RegExp, ValidatorFn]>(([pattern, s]) => [
        new RegExp(pattern),
        schemaValidator(s),
      ])
    : null;
  return (value: any) => {
    if ((typeof value === 'undefined' || value === null) && !schema.required) return null;
    if (typeof value !== 'object' || Array.isArray(value) || value === null)
      return { code: ERR_TYPE, type: 'object' };

    const keys = Object.keys(value);
    let extraKeys: string[] = [];

    if (minProperties !== null && keys.length < minProperties)
      return { code: EOBJ_MIN, minProperties };
    if (maxProperties !== null && keys.length > maxProperties)
      return { code: EOBJ_MAX, maxProperties };

    if (propertyNames && keys.some((k) => !!propertyNames(k)))
      return { code: EOBJ_PROP, propertyNames: true };

    if (patternProperties)
      keys.forEach((k) => {
        if (k in properties) return;
        const matched = patternProperties.filter(([re, _fn]) => re.test(k));
        if (!matched.length) extraKeys.push(k);
      });
    else extraKeys = keys.filter((k) => !(k in properties));

    if (additional === false && extraKeys.length)
      return { code: EOBJ_ADD, additionalProperties: true };

    if (additionalFn && extraKeys.some((k) => !!additionalFn(value[k])))
      return { code: EOBJ_ADD, additionalProperties: true };

    if (keys.some((k) => k in properties && !!properties[k](value[k])))
      return { code: EOBJ_PROP, properties: true };
    return null;
  };
}
