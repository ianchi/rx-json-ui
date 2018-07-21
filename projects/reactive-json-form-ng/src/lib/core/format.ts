/**
 * Copyright (c) 2018 Adrian Panella <ianchi74@outlook.com>
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { formatNumber, formatDate } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

/** Angular Pipe to format text */
@Pipe({
  name: 'format',
  pure: true
})
export class FormatPipe implements PipeTransform {
  transform(value: any, format: any) {
    return format ? formatValue(value, format) : value;
  }
}

export function formatValue(value: any, format: string) {
  if (typeof format !== 'string' || value == null) return value;
  const re = /^\s*(\w+)\s*(:(["'])([^"']*)\3)?$/;

  const match: RegExpExecArray = re.exec(format);

  if (!match[0]) return value;

  switch (match[1].toUpperCase()) {
    case 'NUMBER':
      let num;
      num = parseFloat(value);
      return isNaN(num) ? value : formatNumber(num, 'en-US', match[4]);
    case 'DATE':
      return formatDate(value, match[4], 'en-US');
  }

  return value;
}
