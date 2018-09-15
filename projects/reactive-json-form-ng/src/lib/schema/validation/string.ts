/*!
 * Copyright (c) 2018 Adrian Panella <ianchi74@outlook.com>
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { ISchemaString, ValidatorFn } from '../interface';

import { baseValidator, ERR_TYPE } from './base';
import { formatValidator } from './format';

export const ESTR_MIN = 20,
  ESTR_MAX = 21,
  ESTR_PAT = 22;

export function stringValidator(schema: ISchemaString): ValidatorFn {
  const minLength =
      typeof schema.minLength === 'number' && schema.minLength >= 0 ? schema.minLength : null,
    maxLength =
      typeof schema.maxLength === 'number' && schema.maxLength >= 0 ? schema.maxLength : null,
    pattern = schema.pattern ? new RegExp(schema.pattern) : null,
    formatFn = schema.format ? formatValidator(schema.format) : null,
    base = baseValidator(schema);

  return (value: any) => {
    if (typeof value !== 'string') return { code: ERR_TYPE, type: 'string' };
    if (minLength && value.length < minLength) return { code: ESTR_MIN, minLength };
    if (maxLength !== null && value.length > maxLength) return { code: ESTR_MAX, maxLength };
    if (pattern && !pattern.test(value)) return { code: ESTR_PAT, pattern };

    return (formatFn && formatFn(value)) || base(value);
  };
}
