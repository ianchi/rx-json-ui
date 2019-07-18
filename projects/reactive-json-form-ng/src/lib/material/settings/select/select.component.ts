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
import { ILvalue } from 'espression';

import { AbstractFormFieldWidget, Expressions } from '../../../core/index';
import { AbstractControl } from '@angular/forms';

export interface ISetSelectWidgetOptions {
  title: string;
  description: string;
  required: boolean;
  default: any;
  enum: any[];
  emptyLabel: string;

  // if enum is array of objects
  propKey: string; // if no unique, binds to first occurrence, if empty bounds the whole object? how to initialize? by ref??
  propLabel: string;

  /**
   * Extra Bindings
   * Bind aditional properties of selected option to other lvalues
   * the binding is unidirectional (from option to lvalue), only the key binding is bidirectional.
   * on first binding of key value, the extra bindings are overwritten.
   * format: { optionProperty: "lvalue to bind" }  special property "#" bounds to whole object
   */
  extraBind: { [optionProperty: string]: string };
}
@Component({
  selector: 'set-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'set-row set-row-flex' },
})
export class SetSelectWidgetComponent extends AbstractFormFieldWidget<
  ISetSelectWidgetOptions
> {
  constructor(cdr: ChangeDetectorRef, expr: Expressions) {
    super(cdr, expr);
  }

  extraBind: { [prop: string]: ILvalue } = {};

  dynOnBeforeBind(): void {
    this.map('enum', val => (Array.isArray(val) ? val : []));
  }

  dynOnAfterBind(): void {
    this.map(
      'enum',
      val => (this.lvalue && this.dynSetFormValue(this.lvalue.o[this.lvalue.m]), val)
    );
    this.map('extraBind', val => this.extraDoBind(val));
  }

  dynSetFormValue(val: any): void {
    let key: any;
    key =
      typeof val === 'undefined'
        ? this.options.default
        : this.options.propKey && typeof val === 'object'
        ? val[this.options.propKey]
        : val;
    const opt = this.getOption(key);
    if (this.formControl!.value !== opt) this.formControl!.setValue(opt);
    this.extraBindUpdate(opt);
  }

  dynSetBoundValue(opt: any): void {
    const value = opt && this.options.propKey ? opt[this.options.propKey] : opt;
    if (!this.lvalue || value === this.lvalue.o[this.lvalue.m]) return;
    this.lvalue.o[this.lvalue.m] = value;
    this.extraBindUpdate(opt);
  }

  getOption(key: any): any {
    return this.options.enum.find(
      opt => key === (this.options.propKey ? opt[this.options.propKey] : opt)
    );
  }

  extraBindUpdate(value: any): void {
    if (typeof value !== 'object' || !this.options.extraBind) return;
    for (const prop in this.extraBind) {
      const lvalue = this.extraBind[prop];
      lvalue.o[lvalue.m] = value && value[prop];
    }
  }

  extraDoBind(extra: any): any {
    this.extraBind = {};
    if (typeof extra !== 'object') return;

    for (const prop in extra) {
      const lvalue = this._expr.lvalue(extra[prop], this.context);
      if (lvalue) this.extraBind[prop] = lvalue;
    }
    return extra;
  }

  displayFn(): (data: any) => string {
    return (data: any) => this.getLabel(data);
  }

  getLabel(data: any): string {
    const key = this.options.propLabel || this.options.propKey;
    return key && typeof data === 'object' ? data[key] : data;
  }

  getValue(ctrl: AbstractControl): any {
    return this.options.propKey && typeof ctrl.value === 'object'
      ? ctrl.value[this.options.propKey]
      : ctrl.value;
  }
}
