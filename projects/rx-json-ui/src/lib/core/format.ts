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
  let re = /^\s*(\w+)\s*(:\s*(["'])([^"']*)\3)?\s*(:\s*(["'])([^"']*)\6)?$/;

  let match: RegExpExecArray | null = re.exec(format);
  const num = parseFloat(value);

  if (!match) return value;

  switch (match[1].toUpperCase()) {
    case 'NUMBER':
      return isNaN(num) ? value : formatNumber(num, 'en-US', match[4]);
    case 'DATE':
      return formatDate(value, match[4], 'en-US', match[7]);
    case 'DURATION':
      return formatDuration(value, match[4]);
    case 'HUMAN':
      re = /^\s*(\w+)\s*(:\s*(["'])\s*([^"']*)\s*\3\s*(:\s*(["'])\s*([0-9]*)\s*\6(?::(\s*\[\s*(["'])(?:[^"']*)\9\s*(?:,\s*\9(?:[^"']*)\9\s*)*\]))?)?)?$/;
      match = re.exec(format);
      if (!match) return value;
      return isNaN(num)
        ? value
        : formatHuman(
            num,
            match[4],
            match[7] ? parseFloat(match[7]) : undefined,
            // tslint:disable-next-line: no-eval
            match[8] ? eval(match[8]) : undefined
          );
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

export function toHumanReadable(
  value: number,
  base: number = 1024,
  units: string[] = ['B', 'Kb', 'Mb', 'Gb', 'Tb']
): { value: number; factor: number; unit: string } {
  if (!base || !Array.isArray(units)) return { value, unit: '', factor: 1 };

  const power = Math.min(units.length - 1, Math.floor(Math.log(value) / Math.log(base)));
  const factor = base ** power;
  return { value: value / factor, unit: units[power], factor };
}

export function formatHuman(
  value: number,
  digits?: string,
  base: number = 1024,
  units: string[] = ['B', 'Kb', 'Mb', 'Gb', 'Tb']
): string {
  const hr = toHumanReadable(value, base, units);
  return `${formatNumber(hr.value, 'en-us', digits)} ${hr.unit}`;
}
