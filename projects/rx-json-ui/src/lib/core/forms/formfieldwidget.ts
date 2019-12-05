/**
 * Copyright (c) 2018 Adrian Panella <ianchi74@outlook.com>
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { ChangeDetectorRef } from '@angular/core';
import {
  AbstractControl,
  AsyncValidatorFn,
  FormArray,
  FormControl,
  FormGroup,
} from '@angular/forms';
import { ILvalue } from 'espression';
import { GET_OBSERVABLE, isReactive } from 'espression-rx';
import { isObservable, of } from 'rxjs';
import { catchError, map, switchMap, take } from 'rxjs/operators';

import { AbstractOptionsDef, MainSlotContentDef, SlotedContentDef } from '..';
import { ERROR_MSG, schemaValidator, ValidatorFn } from '../../schema';
import { AbstractWidget } from '../base/abstractwidget';
import { FieldEventDef, WidgetDef } from '../base/public.interface';
import { Context, Expressions } from '../expressions/index';

export const FORM_CONTROL = '$form';
export class AbstractFormFieldWidget<
  O extends AbstractOptionsDef = {},
  S extends SlotedContentDef = MainSlotContentDef,
  E extends FieldEventDef = FieldEventDef
> extends AbstractWidget<O, S, E> {
  formControl: FormControl | undefined;

  validateFn: AsyncValidatorFn | undefined;

  schemaValidator: ValidatorFn | undefined;

  lvalue: ILvalue | undefined;

  default: any;

  constructor(cdr: ChangeDetectorRef, expr: Expressions) {
    super(cdr, expr);
  }
  dynOnSetup(def: WidgetDef<O, S, E>): WidgetDef<O, S, E> {
    // get bound model
    if (!def.bind) throw new Error('Form field widgets must have a "bind" property defined');

    this.lvalue = this.expr.lvalue(def.bind, this.context);

    if (!this.lvalue)
      throw new Error(
        `Form field "bind" property must be an identifier or member expression (${def.bind})`
      );

    if (!isReactive(this.lvalue.o))
      throw new Error(`Bound Key must be of Reactive Type (${def.bind})`);

    // setup validation

    if (def.events && def.events['onValidate']) {
      this.validateFn = (ctrl: AbstractControl) => {
        return this.expr
          .evaluate(
            this.events.onValidate,
            Context.create(this.context, { $value: ctrl.value }),
            true
          )
          .pipe(
            take(1),
            map(res => {
              return res ? null : { validate: 'validation error' };
            }),
            catchError(_e => of({ validate: 'error evaluating expression' }))
          );
      };
    }
    this.formControl = new FormControl(
      this.lvalue.o[this.lvalue.m],
      (ctrl: AbstractControl) =>
        this.schemaValidator ? this.schemaValidator(this.fldGetValue(ctrl)) : null,
      this.validateFn
    );

    const parentForm: FormGroup | FormArray =
      this.context[FORM_CONTROL] && this.context[FORM_CONTROL]._control;
    if (parentForm) {
      if (parentForm instanceof FormGroup) parentForm.addControl(this.lvalue.m, this.formControl);
      else if (parentForm instanceof FormArray) parentForm.push(this.formControl);
    }

    if (def.options) this.default = def.options.default;

    // listen to bound context value and update on changes
    this.addSubscription = (<any>this.lvalue.o)
      [GET_OBSERVABLE](this.lvalue.m)
      .pipe(switchMap(val => (isObservable(val) ? val : of(val))))
      .subscribe((val: any) => {
        this.fldSetFormValue(val);
      });

    // listen to control changes to update bound context value
    this.addSubscription = this.formControl.valueChanges.subscribe((value: any) => {
      this.fldSetBoundValue(value);
      this.emmit('onValueChange', { $value: value });
    });

    return def;
  }

  dynOnChange(): void {
    // once bound options are resolved, update schema Validator
    this.schemaValidator = schemaValidator(<any>this.options);
    this.formControl!.updateValueAndValidity();
  }

  // Hooks for Field Widgets
  // -----------------------

  /**
   * Called to get the bound value from a control.
   * Can be overriden to return a different value than the standard `formControl.value`
   */
  fldGetValue(formControl: AbstractControl): any {
    return formControl.value;
  }

  /**
   * Called to update the control value when the bound property changes.
   * By default sets the `formControl.value` to the new value,
   * or when the value is `undefined` to the `default` value if it is present as an input option.
   */
  fldSetFormValue(value: any): void {
    if (typeof value === 'undefined') value = this.default;
    if (value === this.formControl!.value) return;
    this.formControl!.setValue(value);
  }
  /**
   * Called to update the bound value when the control changes.
   * By default only updates bound property if the value changed.
   */
  fldSetBoundValue(value: any): void {
    if (!this.lvalue || value === this.lvalue.o[this.lvalue.m]) return;
    this.lvalue.o[this.lvalue.m] = value;
  }

  //
  getError(): string {
    if (!this.formControl!.errors || !this.formControl!.errors.code) return '';

    return (
      this.expr.eval(
        ERROR_MSG[this.formControl!.errors!.code],
        { $err: this.formControl!.errors },
        false
      ) || ''
    );
  }
}
