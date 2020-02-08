/*!
 * Copyright (c) 2020 Adrian Panella <ianchi74@outlook.com>
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Directive } from '@angular/core';
import { AbstractControl } from '@angular/forms';

import { SchemaOptions, SchemaPrimitiveValidations } from '../../schema';
import { ConstrainEvents, ConstrainSlots, FieldEventDef } from '../base/public.interface';
import { AbstractFormFieldWidget } from '../forms/index';

import { TitleDescOption } from './interfaces';

export interface SelectWidgetOptions
  extends SchemaOptions<SchemaPrimitiveValidations<any>>,
    TitleDescOption {
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

@Directive()
// tslint:disable-next-line: directive-class-suffix
export class SelectWidgetMixin<
  O extends SelectWidgetOptions = SelectWidgetOptions,
  S extends ConstrainSlots<S> | undefined = undefined,
  E extends ConstrainEvents<E> = FieldEventDef
> extends AbstractFormFieldWidget<O, S, E> {
  dynOnBeforeBind(): void {
    // make sure that enum is an array
    this.map('enum', val => (Array.isArray(val) ? val : []));
  }

  dynOnAfterBind(): void {
    this.map('enum', val => {
      this.lvalue && this.fldSetFormValue(this.lvalue.o[this.lvalue.m]);
      return val;
    });
  }

  fldSetFormValue(val: any): void {
    let key: any;
    key = typeof val === 'undefined' ? this.options.default : val;
    let opt = this.getOption(key);
    if (typeof opt === 'undefined') opt = val;
    if (this.formControl!.value !== opt) this.formControl!.setValue(opt);
  }

  fldSetBoundValue(opt: any): void {
    const value = this.getKey(opt);
    if (!this.lvalue || value === this.lvalue.o[this.lvalue.m]) return;
    this.lvalue.o[this.lvalue.m] = value;
  }

  fldGetValue(ctrl: AbstractControl): any {
    return this.getKey(ctrl.value);
  }

  // Hooks for *Select* behavior
  // ----------------------------

  /**
   * Finds first option with the given key, or return undefined
   */
  getOption(key: any): any {
    return this.options.enum && this.options.enum.find(opt => key === this.getKey(opt));
  }

  /**
   * Returns the `key` property of the given option, when the option is an object
   */
  getKey(option: any): any {
    return this.options.propKey && typeof option === 'object'
      ? option[this.options.propKey]
      : option;
  }

  /**
   * Returns the display `label` for the given option, when the option is an object
   */
  getLabel(option: any): string {
    const key = this.options.propLabel || this.options.propKey;
    return key && typeof option === 'object' ? option[key] : option;
  }

  /** Helper function for templates */
  displayFn(): (data: any) => string {
    return (data: any) => this.getLabel(data);
  }
}
