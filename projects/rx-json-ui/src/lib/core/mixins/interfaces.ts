/**
 * Copyright (c) 2019 Adrian Panella <ianchi74@outlook.com>
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { SchemaBase } from '../../schema';
import {
  AbstractEventsDef,
  multilineExpr,
  SimpleContentDef,
  SlotedContentDef,
} from '../base/public.interface';

export interface ButtonWidgetEvents extends AbstractEventsDef {
  /** Event emmited when the button is clicked */
  onClick: multilineExpr;
}

export interface TitleOption {
  title: string;
}

export interface InputWidgetOptions extends SchemaBase<any> {
  type: string;
  inputType: string;
  required: boolean;
}

export interface SliderWidgetOptions {
  title: string;
  description: string;

  minimum: number;
  maximum: number;
  step: number;
}

export interface PopupSlotsDef extends SlotedContentDef {
  main: SimpleContentDef;
  actions: SimpleContentDef;
}
