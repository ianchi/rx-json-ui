/*!
 * Copyright (c) 2018 Adrian Panella <ianchi74@outlook.com>
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { SchemaString, ValidatorFn } from '../interface';

import { baseValidator, ERR_TYPE, ERROR_MSG } from './base';
import { formatValidator } from './format';

export const ESTR_MIN = 20,
  ESTR_MAX = 21,
  ESTR_PAT = 22;

ERROR_MSG[ESTR_MIN] = "`Must be longer than '${$err.minLength}' characters`";
ERROR_MSG[ESTR_MAX] = "`Must be shorter than '${$err.maxLength}' characters`";
ERROR_MSG[ESTR_PAT] = "`Must comply with pattern '${$err.pattern}'`";

export function stringValidator(schema: SchemaString): ValidatorFn {
  const minLength =
      typeof schema.minLength === 'number' && schema.minLength >= 0
        ? schema.minLength
        : null,
    maxLength =
      typeof schema.maxLength === 'number' && schema.maxLength >= 0
        ? schema.maxLength
        : null,
    pattern = schema.pattern ? new RegExp(schema.pattern) : null,
    formatFn = schema.format ? formatValidator(schema.format) : null,
    base = baseValidator(schema);

  return (value: any) => {
    if (typeof value === 'undefined') return base(value);
    if (typeof value !== 'string') return { code: ERR_TYPE, type: 'string' };
    if (minLength && value.length < minLength) return { code: ESTR_MIN, minLength };
    if (maxLength !== null && value.length > maxLength)
      return { code: ESTR_MAX, maxLength };
    if (pattern && !pattern.test(value))
      return { code: ESTR_PAT, pattern: schema.pattern };

    return (formatFn && formatFn(value)) || base(value);
  };
}
