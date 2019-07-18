/*!
 * Copyright (c) 2018 Adrian Panella <ianchi74@outlook.com>, contributors.
 * Licensed under the MIT license.
 */

import { ISchemaNumber, ValidatorFn } from '../interface';

import { baseValidator, ERR_TYPE, ERROR_MSG } from './base';

export const ENUM_MIN = 10,
  ENUM_MAX = 11,
  ENUM_EMIN = 12,
  ENUM_EMAX = 13,
  ENUM_MULT = 14;

ERROR_MSG[ENUM_MIN] = "`Must be greater or equal to '${$err.minimum}'`";
ERROR_MSG[ENUM_MAX] = "`Must be lower or equal to '${$err.maximum}'`";
ERROR_MSG[ENUM_EMIN] = "`Must be greater than '${$err.exclusiveMinimum}'`";
ERROR_MSG[ENUM_EMAX] = "`Must be lower than '${$err.exclusiveMaximum}'`";
ERROR_MSG[ENUM_MULT] = "`Must be multiple of '${$err.multipleOf}'`";

export function numberValidator(schema: ISchemaNumber): ValidatorFn {
  const isInteger = schema.type === 'integer',
    multipleOf = typeof schema.multipleOf === 'number' ? schema.multipleOf : null,
    minimum = typeof schema.minimum === 'number' ? schema.minimum : null,
    maximum = typeof schema.maximum === 'number' ? schema.maximum : null,
    exclusiveMinimum =
      typeof schema.exclusiveMinimum === 'number' ? schema.exclusiveMinimum : null,
    exclusiveMaximum =
      typeof schema.exclusiveMaximum === 'number' ? schema.exclusiveMaximum : null,
    base = baseValidator(schema);

  return (value: any) => {
    if (value === '' || typeof value === 'undefined') return base(value);

    if (typeof value === 'string') value = parseFloat(value);
    if (typeof value !== 'number')
      return { code: ERR_TYPE, type: isInteger ? 'integer' : 'number' };
    if (isInteger && !Number.isInteger(value)) return { code: ERR_TYPE, type: 'integer' };

    if (maximum !== null && value > maximum) return { code: ENUM_MAX, maximum };
    if (minimum !== null && value < minimum) return { code: ENUM_MIN, minimum };
    if (exclusiveMaximum !== null && value >= exclusiveMaximum)
      return { code: ENUM_EMAX, exclusiveMaximum };
    if (exclusiveMinimum !== null && value <= exclusiveMinimum)
      return { code: ENUM_EMIN, exclusiveMinimum };

    if (multipleOf && value % multipleOf !== 0) return { code: ENUM_MULT, multipleOf };

    return base(value);
  };
}
