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
import { AbstractControl } from '@angular/forms';

import { AbstractFormFieldWidget, Expressions } from '../../../core/index';
import { ISchemaBase } from '../../../schema';

export interface ISelectWidgetOptions extends ISchemaBase<any> {
  title: string;
  description: string;
  required: boolean;
  default: any;

  enum: any[];

  /** Label to show for `undefined` value */
  emptyLabel: string;

  /**
   * If enum is array of objects, indicates that a specific property must be bound to the widgets value.
   * The object itself is bound to the formControl
   * If not unique, binds to first occurrence.
   */
  propKey: string;
  /** If enum is array of objects, indicates that a specific property must be used as display label. */
  propLabel: string;
}

@Component({
  selector: 'wdg-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectWidgetComponent extends AbstractFormFieldWidget<ISelectWidgetOptions> {
  constructor(cdr: ChangeDetectorRef, expr: Expressions) {
    super(cdr, expr);
  }

  dynOnBeforeBind(): void {
    // make sure that enum is an array
    this.map('enum', val => (Array.isArray(val) ? val : []));
  }

  dynOnAfterBind(): void {
    this.map('enum', val => {
      this.lvalue && this.dynSetFormValue(this.lvalue.o[this.lvalue.m]);
      return val;
    });
  }

  dynSetFormValue(val: any): void {
    let key: any;
    key = typeof val === 'undefined' ? this.options.default : val;
    let opt = this.getOption(key);
    if (typeof opt === 'undefined') opt = val;
    if (this.formControl!.value !== opt) this.formControl!.setValue(opt);
  }

  dynSetBoundValue(opt: any): void {
    const value = this.getKey(opt);
    if (!this.lvalue || value === this.lvalue.o[this.lvalue.m]) return;
    this.lvalue.o[this.lvalue.m] = value;
  }

  getOption(key: any): any {
    return this.options.enum && this.options.enum.find(opt => key === this.getKey(opt));
  }

  getKey(value: any): any {
    return this.options.propKey && typeof value === 'object'
      ? value[this.options.propKey]
      : value;
  }

  getValue(ctrl: AbstractControl): any {
    return this.getKey(ctrl.value);
  }

  getLabel(data: any): string {
    const key = this.options.propLabel || this.options.propKey;
    return key && typeof data === 'object' ? data[key] : data;
  }

  displayFn(): (data: any) => string {
    return (data: any) => this.getLabel(data);
  }
}
