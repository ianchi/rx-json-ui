/*!
 * Copyright (c) 2018 Adrian Panella <ianchi74@outlook.com>
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { SchemaBoolean, ValidatorFn } from '../interface';

import { baseValidator, ERR_TYPE } from './base';

export function booleanValidator(schema: SchemaBoolean): ValidatorFn {
  const base = baseValidator(schema);

  return (value: any) => {
    if (typeof value !== 'boolean' && typeof value !== 'undefined')
      return { code: ERR_TYPE, type: 'boolean' };
    return base(value);
  };
}
