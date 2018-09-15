/**
 * Copyright (c) 2018 Adrian Panella <ianchi74@outlook.com>
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { ChangeDetectorRef } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup } from '@angular/forms';
import { INode } from 'espression';
import { GET_OBSERVABLE, isReactive } from 'espression-rx';
import { map, take } from 'rxjs/operators';

import { ISchema, schemaValidator, ValidatorFn } from '../schema';

import { AbstractWidget } from './abstractwidget';
import { Context } from './context';
import { Expressions } from './expressions';
import { IFieldWidgetDef, IWidgetDef } from './widget.interface';

export const FORM_CONTROL = '$form';
export class AbstractFormFieldWidget<T> extends AbstractWidget<T> {
  formControl: FormControl | undefined;

  validate: INode | undefined;
  validateContext: Context | undefined;

  schemaValidator: ValidatorFn | undefined;
  constructor(cdr: ChangeDetectorRef, expr: Expressions) {
    super(cdr, expr);
  }
  dynOnSetup(def: IFieldWidgetDef): IWidgetDef {
    // get bound model
    if (!def.bind) throw new Error('Form field widgets must have a "bind" property defined');

    const lvalue = this._expr.lvalue(def.bind, this.context);

    if (!lvalue)
      throw new Error('Form field "bind" property must be an identifier or member expression');

    if (!isReactive(lvalue.o)) throw new Error('Bound Key must be of Reactive Type');

    // setup validation

    if (def.options && def.options['validate=']) {
      this.validate = this._expr.parse(def.options['validate=']);
      delete def.options['validate='];
    }
    if (this.validate) {
      this.validateContext = Context.create(this.context);

      this.formControl = new FormControl(lvalue.o[lvalue.m], null, (ctrl: AbstractControl) => {
        this.validateContext!['$value'] = ctrl.value;
        return this._expr.evaluate(this.validate, this.validateContext!, true).pipe(
          take(1),
          map(res => {
            return res ? null : { validate: 'validation error' };
          })
        );
      });
    } else this.formControl = new FormControl(lvalue.o[lvalue.m]);

    const parentForm: FormGroup | FormArray =
      this.context[FORM_CONTROL] && this.context[FORM_CONTROL]._control;
    if (parentForm) {
      if (parentForm instanceof FormGroup) parentForm.addControl(lvalue.m, this.formControl);
      else if (parentForm instanceof FormArray) parentForm.push(this.formControl);
    }

    // listen to bound context value and update on changes
    this.addSubscription = (<any>lvalue.o)
      [GET_OBSERVABLE](lvalue.m)
      .subscribe((val: any) => val !== this.formControl!.value && this.formControl!.setValue(val));

    // listen to control changes to update bound context value
    this.addSubscription = this.formControl.valueChanges.subscribe((val: any) => {
      if (val !== lvalue.o[lvalue.m]) lvalue.o[lvalue.m] = val;
    });

    return def;
  }

  dynOnChange(): void {
    // once bound options are resolved, update schema Validator
    if (this.widgetDef!.options) {
      this.schemaValidator = schemaValidator(<ISchema>this.widgetDef!.options);

      this.formControl!.setValidators((ctrl: AbstractControl) => this.schemaValidator!(ctrl.value));
    }
  }
}
