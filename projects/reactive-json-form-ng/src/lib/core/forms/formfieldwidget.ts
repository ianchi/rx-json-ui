/**
 * Copyright (c) 2018 Adrian Panella <ianchi74@outlook.com>
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { ChangeDetectorRef } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormArray, FormControl, FormGroup } from '@angular/forms';
import { ILvalue, INode } from 'espression';
import { GET_OBSERVABLE, isReactive } from 'espression-rx';
import { isObservable, of } from 'rxjs';
import { catchError, map, switchMap, take } from 'rxjs/operators';

import { ERROR_MSG, schemaValidator, ValidatorFn } from '../../schema';
import { AbstractWidget } from '../abstractwidget';
import { Context } from '../context';
import { Expressions } from '../expressions';
import { IFieldWidgetDef, IWidgetDef } from '../widget.interface';

export const FORM_CONTROL = '$form';
export class AbstractFormFieldWidget<T> extends AbstractWidget<T> {
  formControl: FormControl | undefined;

  validateAST: INode | undefined;
  validateFn: AsyncValidatorFn | undefined;

  schemaValidator: ValidatorFn | undefined;

  lvalue: ILvalue | undefined;
  onValueChange: INode | undefined;

  default: any;

  constructor(cdr: ChangeDetectorRef, expr: Expressions) {
    super(cdr, expr);
  }
  dynOnSetup(def: IFieldWidgetDef): IWidgetDef {
    // get bound model
    if (!def.bind)
      throw new Error('Form field widgets must have a "bind" property defined');

    this.lvalue = this._expr.lvalue(def.bind, this.context);

    if (def.onValueChange) this.onValueChange = this._expr.parse(def.onValueChange);

    if (!this.lvalue)
      throw new Error(
        `Form field "bind" property must be an identifier or member expression (${def.bind})`
      );

    if (!isReactive(this.lvalue.o))
      throw new Error(`Bound Key must be of Reactive Type (${def.bind})`);

    // setup validation

    if (def.options && def.options['validate=']) {
      this.validateAST = this._expr.parse(def.options['validate=']);
      delete def.options['validate='];
    }
    if (this.validateAST) {
      this.validateFn = (ctrl: AbstractControl) => {
          const validateContext = Context.create(this.context);
          validateContext['$value'] = ctrl.value;
          return this._expr.evaluate(this.validateAST, validateContext!, true).pipe(
            take(1),
            map(res => {
              return res ? null : { validate: 'validation error' };
            }),
            catchError((_e) =>
              of({ validate: 'error evaluating expression' })
              )
          );
        };
    }
    this.formControl = new FormControl(this.lvalue.o[this.lvalue.m],
      (ctrl: AbstractControl) =>
        this.schemaValidator ? this.schemaValidator(this.getValue(ctrl)) : null,
      this.validateFn);

    const parentForm: FormGroup | FormArray =
      this.context[FORM_CONTROL] && this.context[FORM_CONTROL]._control;
    if (parentForm) {
      if (parentForm instanceof FormGroup)
        parentForm.addControl(this.lvalue.m, this.formControl);
      else if (parentForm instanceof FormArray) parentForm.push(this.formControl);
    }

    if (def.options) this.default = def.options.default;

    // listen to bound context value and update on changes
    this.addSubscription = (<any>this.lvalue.o)
      [GET_OBSERVABLE](this.lvalue.m)
      .pipe(switchMap(val => (isObservable(val) ? val : of(val))))
      .subscribe((val: any) => {
        this.dynSetFormValue(val);
      });

    // listen to control changes to update bound context value
    this.addSubscription = this.formControl.valueChanges.subscribe((val: any) => {
      this.dynSetBoundValue(val);
      this.dynOnValueChange(val);
    });

    return def;
  }

  getValue(ctrl: AbstractControl): any {
    return ctrl.value;
  }
  dynOnChange(): void {
    // once bound options are resolved, update schema Validator
    this.schemaValidator = schemaValidator(<any>this.options);
    this.formControl!.updateValueAndValidity();
  }

  /** Updates the control value when the bound property changes */
  dynSetFormValue(value: any): void {
    if (typeof value === 'undefined') value = this.default;
    if (value === this.formControl!.value) return;
    this.formControl!.setValue(value);
  }
  /** Updates the bound value when the control changes */
  dynSetBoundValue(value: any): void {
    if (!this.lvalue || value === this.lvalue.o[this.lvalue.m]) return;
    this.lvalue.o[this.lvalue.m] = value;
  }

  dynOnValueChange(value: any): void {
    const context = Context.create(this.context, { $value: value });
    if (this.onValueChange)
      this._expr
        .evaluate(this.onValueChange, context, true)
        .pipe(take(1))
        .subscribe();
  }

  getError(): string {
    if (!this.formControl!.errors || !this.formControl!.errors.code) return '';

    return this._expr.eval(
      ERROR_MSG[this.formControl!.errors.code],
      { $err: this.formControl!.errors },
      false
    );
  }
}
