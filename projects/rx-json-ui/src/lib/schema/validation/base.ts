/*!
 * Copyright (c) 2018 Adrian Panella <ianchi74@outlook.com>
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { SchemaPrimitiveValidations, ValidatorFn } from '../interface';

export const ERROR_MSG: string[] = [];

export const ERR_CUSTOM = 1000;
export const ERR_TYPE = 1;
export const ERR_ENUM = 2;
export const ERR_CNST = 3;
export const ERR_REQ = 4;

ERROR_MSG[ERR_TYPE] = "`Invalid data type, expected '${$err.type}'`";
ERROR_MSG[ERR_ENUM] = '`Not a valid option`';
ERROR_MSG[ERR_CNST] = '`Not a valid option`';
ERROR_MSG[ERR_REQ] = '`Value is required`';
ERROR_MSG[ERR_CUSTOM] = '`${$err.message || "Invalid entry"}`';

export function baseValidator<T>(schema: SchemaPrimitiveValidations<T>): ValidatorFn {
  const enumVal = Array.isArray(schema.enum) ? schema.enum.concat() : null;
  const entryProp =
    schema.enumProperties?.[0] ??
    (Array.isArray(schema.enumEntries) &&
      schema.enumEntries.length &&
      !Array.isArray(schema.enumEntries[0]))
      ? 'value'
      : '0';
  const enumEntries = Array.isArray(schema.enumEntries)
    ? schema.enumEntries.map((e) => (e as any)[entryProp])
    : null;
  const constVal = typeof schema.const !== 'undefined' ? schema.const : null;
  const required = schema.required === true;

  return (value: any) => {
    // allow 'undefined' or '' as it should be checked by required validation

    if (value === '' || typeof value === 'undefined') return required ? { code: ERR_REQ } : null;

    if (constVal && value !== constVal) return { code: ERR_CNST, const: constVal };
    if (enumVal) {
      if (enumVal.indexOf(value) < 0) return { code: ERR_ENUM, enum: enumVal };
    } else if (enumEntries && enumEntries.indexOf(value) < 0)
      return { code: ERR_ENUM, enum: enumEntries };

    return null;
  };
}
