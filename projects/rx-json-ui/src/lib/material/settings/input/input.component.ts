/**
 * Copyright (c) 2018 Adrian Panella <ianchi74@outlook.com>
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

import { AbstractFormFieldWidget, InputWidgetOptions } from '../../../core/index';

@Component({
  selector: 'set-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'set-row set-row-flex' },
})
export class SetInputWidgetComponent extends AbstractFormFieldWidget<InputWidgetOptions> {
  currentValue: any;
  fldSetBoundValue(value: any): void {
    if (!this.lvalue || value === this.lvalue.o[this.lvalue.m]) return;
    if (this.options.type === 'number' || this.options.type === 'integer') {
      const num = parseFloat(value);
      if (isNaN(num)) {
        if (value && value.trim() === '-') value = -0;
        if (!value) value = undefined;
        else if (isNaN(this.lvalue.o[this.lvalue.m])) return;
      } else value = num;
    }
    this.lvalue.o[this.lvalue.m] = this.currentValue = value === null ? undefined : value;
  }

  fldSetFormValue(value: any): void {
    if (value === this.currentValue || (isNaN(value) && isNaN(this.currentValue))) return;
    super.fldSetFormValue(value);
  }
}
