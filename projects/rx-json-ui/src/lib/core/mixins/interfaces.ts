/**
 * Copyright (c) 2019 Adrian Panella <ianchi74@outlook.com>
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { SchemaNumber, SchemaOptions, SchemaString } from '../../schema';
import {
  CommonEventsDef,
  CommonOptionsDef,
  multilineExpr,
  SimpleContentDef,
} from '../base/public.interface';

export interface ButtonWidgetEvents extends CommonEventsDef {
  /** Event emitted when the button is clicked */
  onClick?: multilineExpr;
}

export interface TitleOption extends CommonOptionsDef {
  title?: string;
}

export interface SubtitleOption extends CommonOptionsDef {
  subtitle?: string;
}
export interface TextOption extends CommonOptionsDef {
  text?: string;
}

export interface IconOption extends CommonOptionsDef {
  icon?: string;
}
export interface TitleDescOption extends TitleOption, CommonOptionsDef {
  subtitle?: string;
  description?: string;
}

export interface BaseSetOption extends TitleDescOption, IconOption {
  value?: string;
}
export type InputWidgetOptions = NumberInputOptions | StringInputOptions;

interface NumberInputOptions extends SchemaOptions<SchemaNumber>, SubtitleOption {
  inputType?: 'number';
  autocomplete?: string;
}

interface StringInputOptions extends SchemaOptions<SchemaString>, SubtitleOption {
  inputType?:
    | 'email'
    | 'search'
    | 'text'
    | 'url'
    | 'password'
    | 'date'
    | 'datetime-local'
    | 'color'
    | 'month'
    | 'tel'
    | 'time'
    | 'week'
    | 'number';
  autocomplete?: string;
}
// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type PopupSlotsDef = {
  main: SimpleContentDef;
  actions: SimpleContentDef;
};
