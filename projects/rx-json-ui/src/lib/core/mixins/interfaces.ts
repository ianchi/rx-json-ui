/**
 * Copyright (c) 2019 Adrian Panella <ianchi74@outlook.com>
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { SchemaBase } from '../../schema';
import { CommonEventsDef, multilineExpr, SimpleContentDef } from '../base/public.interface';

export type ButtonWidgetEvents = CommonEventsDef & {
  /** Event emitted when the button is clicked */
  onClick: multilineExpr;
};

export interface TitleOption {
  title?: string;
}

export interface InputWidgetOptions extends SchemaBase<any> {
  type: string;
  inputType?: string;
  required?: boolean;
}

export interface SliderWidgetOptions {
  title?: string;
  description?: string;

  minimum: number;
  maximum: number;
  step: number;
}

// tslint:disable-next-line: interface-over-type-literal
export type PopupSlotsDef = {
  main: SimpleContentDef;
  actions: SimpleContentDef;
};
