/**
 * Copyright (c) 2018 Adrian Panella <ianchi74@outlook.com>
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { formatDate, formatNumber } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

/** Angular Pipe to format text */
@Pipe({
  name: 'format',
  pure: true,
})
export class FormatPipe implements PipeTransform {
  transform(value: any, format: any): any {
    return format ? formatValue(value, format) : value;
  }
}

export function formatValue(value: any, format: string): any {
  if (value == null) return '';
  if (typeof format !== 'string') return value;
  const re = /^\s*(\w+)\s*(:(["'])([^"']*)\3)?\s*(:(["'])([^"']*)\6)?$/;

  const match: RegExpExecArray | null = re.exec(format);

  if (!match) return value;

  switch (match[1].toUpperCase()) {
    case 'NUMBER':
      let num;
      num = parseFloat(value);
      return isNaN(num) ? value : formatNumber(num, 'en-US', match[4]);
    case 'DATE':
      return formatDate(value, match[4], 'en-US', match[7]);
    case 'DURATION':
      return formatDuration(value, match[4]);
    default:
      return value;
  }
}

export function formatDuration(value: string | number, format: string): string {
  if (typeof format !== 'string') return '';

  const re = /^\s*(DD?|d)?\s*(HH?|hh?)?\s*(:?)\s*(MM?|mm?)?\s*\3\s*(SS?|ss?)?\s*$/.exec(format);
  if (!re) return '';

  const colon = !!re[2];

  const groups = re.slice(1);
  groups.splice(2, 1);
  let result = '',
    part: number;

  if (typeof value !== 'number') {
    value = parseFloat(value);
    if (typeof value !== 'number') return '';
  }

  let total = false;
  let lastDay = true;

  for (const group of groups) {
    let day = false;
    let subtotal = false;
    switch (group) {
      case 'D':
      case 'DD':
      case 'd':
        part = Math.floor(value / 86400000);
        subtotal = true;
        day = true;
        break;

      case 'H':
      case 'HH':
        part = Math.floor(value / 3600000);
        subtotal = true;
        break;

      case 'M':
      case 'MM':
        part = Math.floor(value / 60000);
        subtotal = true;
        break;

      case 'S':
      case 'SS':
        part = Math.floor(value / 1000);
        subtotal = true;
        break;

      case 'h':
      case 'hh':
        part = Math.floor((value % 86400000) / 3600000);
        break;

      case 'm':
      case 'mm':
        part = Math.floor((value % 3600000) / 60000);
        break;

      case 's':
      case 'ss':
        part = Math.floor((value % 60000) / 1000);
        break;

      default:
        return '';
    }

    if (total && subtotal) return '';

    total = total || subtotal;

    if (group !== 'd' || part > 0)
      result += `${result ? (colon && !lastDay ? ':' : ' ') : ''}${
        group.length === 2 && part < 10 ? '0' : ''
      }${part}`;

    lastDay = day;
  }

  return result;
}
