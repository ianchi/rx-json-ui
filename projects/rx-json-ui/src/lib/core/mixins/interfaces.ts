/**
 * Copyright (c) 2019 Adrian Panella <ianchi74@outlook.com>
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { SchemaNumber, SchemaOptions, SchemaString } from '../../schema';
import { CommonEventsDef, multilineExpr, SimpleContentDef } from '../base/public.interface';

export interface ButtonWidgetEvents extends CommonEventsDef {
  /** Event emitted when the button is clicked */
  onClick?: multilineExpr;
}

export interface TitleOption {
  title?: string;
}

export interface TitleDescOption {
  title?: string;
  description?: string;
}

export type InputWidgetOptions = NumberInputOptions | StringInputOptions;

interface NumberInputOptions extends SchemaOptions<SchemaNumber> {
  inputType?: string;
}

interface StringInputOptions extends SchemaOptions<SchemaString> {
  inputType?: string;
}
// tslint:disable-next-line: interface-over-type-literal
export type PopupSlotsDef = {
  main: SimpleContentDef;
  actions: SimpleContentDef;
};
