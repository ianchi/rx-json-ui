/*!
 * Copyright (c) 2017 Adrian Panella <ianchi74@outlook.com>, contributors.
 * Licensed under the MIT license.
 */

import { ValidatorFn } from '../interface';

import { ERROR_MSG } from './base';

export const ESTR_FMT = 23;
export type CheckFormatFn = (val: any) => boolean;
export type FormatRule = string | RegExp | CheckFormatFn;

ERROR_MSG[ESTR_FMT] = "`Is not a valid '${$err.format}'`";

/**
 * Helper Class to validate named formats
 *
 *
 * A format can be defined directly by its `regex` or as an array of string of other primitive formats,
 * which means that it can be any of those formats
 */
/** List of named formats */
const FORMATS_RULES: { [rule: string]: FormatRule | FormatRule[] } = {
  ipaddr: ['ipv4', 'ipv6'],
  ipv4: /^(?:(?:[0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}(?:[0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/,
  ipv6: /^((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))$/,
  netmask4: /^(((255\.){3}(255|254|252|248|240|224|192|128|0+))|((255\.){2}(255|254|252|248|240|224|192|128|0+)\.0)|((255\.)(255|254|252|248|240|224|192|128|0+)(\.0+){2})|((255|254|252|248|240|224|192|128|0+)(\.0+){3}))$/,
  netmask6: /^([fF]{4}:){7}([fF]{3}[fFeEcC80]|[fF]{2}[fFeEcC80]0|[fF][fFeEcC80]00|[fFeEcC8]000|:)|([fF]{4}:){1-6}([fF]{3}[fFeEcC80]:|[fF]{2}[fFeEcC80]0:|[fF][fFeEcC80]00:|[fFeEcC8]000:)?:$/,
  cidr4: /^(?:(?:[0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}(?:[0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])(?:\/([0-9]|[1-2][0-9]|3[0-2]))$/,
  cidr6: /^((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(\/([0-9]|[1-9][0-9]|1[0-1][0-9]|12[0-8]))?$/,
  ipmask4: [/^([^\/]*)\/(.*)$/, 'ipv4', 'netmask4'],
  ipmask6: [/^([^\/]*)\/(.*)$/, 'ipv6', 'netmask6'],
  macaddr: /^(?:[a-fA-F0-9]{2}:){5}[a-fA-F0-9]{2}$/,
  host: ['hostname', 'ipv4', 'ipv6'],
  hostname: /^(?:(?:[a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9\-]*[a-zA-Z0-9])\.)*(?:[A-Za-z0-9]|[A-Za-z0-9][A-Za-z0-9\-]*[A-Za-z0-9])$/,
  wpakey: /^[a-zA-Z0-9]{8,63}|[a-fA-F0-9]{64}$/,
  wepkey: /^[a-zA-Z0-9]{5}|[a-zA-Z0-9]{13}|[a-fA-F0-9]{10}|[a-fA-F0-9]{26}$/,
  uci_value: /^[\t\n\r\x20-\x7E]*$/,
  uci_name: /^[\w_]*$/,
  uci_type: /^[\x20-\x7E]*$/,
};

export function registerFormat(format: string, rule: FormatRule | FormatRule[]): void {
  FORMATS_RULES[format] = rule;
}
export function formatValidator(format: string): ValidatorFn {
  const validator = toCheckFn(FORMATS_RULES[format]);
  return val => (validator(val) ? null : { code: ESTR_FMT, format });
}

function toCheckFn(rule: FormatRule | FormatRule[]): CheckFormatFn {
  if (typeof rule === 'string') return toCheckFn(FORMATS_RULES[rule]);
  if (typeof rule === 'function') return rule;
  if (rule instanceof RegExp) return val => rule.test(val);
  if (Array.isArray(rule)) {
    const rules = rule.map(r => toCheckFn(r));
    return val => rules.some(fn => fn(val));
  }

  return (_val: any) => true;
}
