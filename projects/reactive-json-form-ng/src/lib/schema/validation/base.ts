/*!
 * Copyright (c) 2018 Adrian Panella <ianchi74@outlook.com>
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { ISchemaBase, ValidatorFn } from '../interface';

export const ERROR_MSG: string[] = [];

export const ERR_TYPE = 1,
  ERR_ENUM = 2,
  ERR_CNST = 3,
  ERR_REQ = 4;

ERROR_MSG[ERR_TYPE] = "`Invalid data type '${$err.type}'`";
ERROR_MSG[ERR_ENUM] = '`Not a valid option`';
ERROR_MSG[ERR_CNST] = '`Not a valid option`';
ERROR_MSG[ERR_REQ] = "`Value is required'`";

export function baseValidator<T>(schema: ISchemaBase<T>): ValidatorFn {
  const enumVal = Array.isArray(schema.enum) ? schema.enum.concat() : null,
    constVal = typeof schema.const !== 'undefined' ? schema.const : null,
    complex = !!enumVal && enumVal.some(e => typeof e === 'object'),
    required = schema.required === true;

  return (value: any) => {
    // allow 'undefined' or '' as it should be checked by required validation

    if (value === '' || typeof value === 'undefined')
      return required ? { code: ERR_REQ } : null;

    if (constVal && value !== constVal) return { code: ERR_CNST, const: constVal };
    // TODO: case of complex enum values
    if (enumVal && !complex && enumVal.indexOf(value) < 0)
      return { code: ERR_ENUM, enum: enumVal };
    return null;
  };
}
