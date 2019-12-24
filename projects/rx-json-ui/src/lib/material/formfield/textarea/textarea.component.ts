/**
 * Copyright (c) 2018 Adrian Panella <ianchi74@outlook.com>
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ViewEncapsulation,
} from '@angular/core';

import { AbstractFormFieldWidget, Expressions } from '../../../core/index';
import { SchemaBase } from '../../../schema/interface';

export interface TextAreaWidgetOptions extends SchemaBase<any> {
  type: string;
  required?: boolean;
}

@Component({
  selector: 'wdg-textarea',
  templateUrl: './textarea.component.html',
  styleUrls: ['./textarea.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextAreaWidgetComponent extends AbstractFormFieldWidget<TextAreaWidgetOptions> {
  constructor(cdr: ChangeDetectorRef, expr: Expressions) {
    super(cdr, expr);
  }
}
