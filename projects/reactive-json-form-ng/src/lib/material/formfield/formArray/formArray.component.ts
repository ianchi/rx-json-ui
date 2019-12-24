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

import { AbstractArrayWidgetComponent, Expressions } from '../../../core/index';

export interface FormArrayWidgetOptions {
  newRow: string;
  allowDel: boolean;
}
@Component({
  selector: 'wdg-form-array',
  templateUrl: './formArray.component.html',
  styleUrls: ['./formArray.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormArrayWidgetComponent extends AbstractArrayWidgetComponent<FormArrayWidgetOptions> {
  constructor(cdr: ChangeDetectorRef, expr: Expressions) {
    super(cdr, expr);
  }
}
