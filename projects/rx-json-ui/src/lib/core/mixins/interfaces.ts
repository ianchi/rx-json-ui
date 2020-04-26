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

export interface TextOption extends CommonOptionsDef {
  text?: string;
}
export interface TitleDescOption extends TitleOption, CommonOptionsDef {
  description?: string;
}

export interface TitleDescValueOption extends TitleDescOption, CommonOptionsDef {
  value?: string;
}
export type InputWidgetOptions = NumberInputOptions | StringInputOptions;

interface NumberInputOptions extends SchemaOptions<SchemaNumber>, CommonOptionsDef {
  inputType?: 'number';
  autocomplete?: string;
}

interface StringInputOptions extends SchemaOptions<SchemaString>, CommonOptionsDef {
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
// tslint:disable-next-line: interface-over-type-literal
export type PopupSlotsDef = {
  main: SimpleContentDef;
  actions: SimpleContentDef;
};
