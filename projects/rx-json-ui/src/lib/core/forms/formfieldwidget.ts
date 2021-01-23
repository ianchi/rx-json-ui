/*!
 * Copyright (c) 2020 Adrian Panella <ianchi74@outlook.com>
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Directive } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormControl } from '@angular/forms';
import { ILvalue } from 'espression';
import { combineMixed, GET_OBSERVABLE, isReactive } from 'espression-rx';
import { isObservable, of } from 'rxjs';
import { catchError, map, shareReplay, switchMap, take, tap } from 'rxjs/operators';

import { ERROR_MSG, SchemaPrimitiveValidations, schemaValidator, ValidatorFn } from '../../schema';
import { ERR_CUSTOM } from '../../schema/validation/base';
import {
  BindWidgetDef,
  CommonOptionsDef,
  ConstrainEvents,
  ConstrainSlots,
  FieldEventDef,
  WidgetDef,
} from '../base/public.interface';
import { Context } from '../expressions/index';

import { AbstractBaseFormControlWidget } from './baseformcontrol';

export interface FormFieldOptionsDef extends SchemaPrimitiveValidations<any>, CommonOptionsDef {}
@Directive()
// eslint-disable-next-line @angular-eslint/directive-class-suffix
export class AbstractFormFieldWidget<
  O extends FormFieldOptionsDef,
  S extends ConstrainSlots<S> | undefined = undefined,
  E extends ConstrainEvents<E> & FieldEventDef = FieldEventDef
> extends AbstractBaseFormControlWidget<O, S, E, BindWidgetDef> {
  validateFn: AsyncValidatorFn | undefined;

  schemaValidator: ValidatorFn | undefined;

  default: any;

  dynOnSetup(def: WidgetDef<O, S, E, BindWidgetDef>): WidgetDef<O, S, E, BindWidgetDef> {
    // get bound model
    if (!def.bind) throw new Error('Form field widgets must have a "bind" property defined');

    this.lvalue$ = this.expr.lvalue(def.bind, this.context);

    if (!this.lvalue$)
      throw new Error(
        `Form field "bind" property must be an identifier or member expression (${def.bind})`
      );

    Context.defineReadonly(this.context, {
      $: isObservable<ILvalue>(this.lvalue$)
        ? this.lvalue$.pipe(
            map((l) => l.o),
            shareReplay({ bufferSize: 1, refCount: true })
          )
        : this.lvalue$.o,
    });

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
            map((res) => {
              return !res
                ? null
                : { code: ERR_CUSTOM, message: typeof res === 'string' ? res : '' };
            }),
            catchError((_e) =>
              of({ code: ERR_CUSTOM, message: 'Error evaluating validation expression' })
            )
          );
      };
    }
    // Setup control
    this.formControl = new FormControl(
      undefined,
      (ctrl: AbstractControl) =>
        this.schemaValidator ? this.schemaValidator(this.fldGetValue(ctrl)) : null,
      this.validateFn
    );

    this.formSetParent(def.bind);

    // TODO: this won't work for a dynamic default
    if (def.options) this.default = def.options.default;

    // listen to bound context value and update on changes
    this.addSubscription = combineMixed([this.lvalue$], true)
      .pipe(
        tap(([l]) => {
          if (!isReactive(l.o)) {
            this.lvalue = undefined;
            throw new Error(
              `Bound Key (${def.bind}) must be of Reactive Type or Observable emiting reactive object`
            );
          }
          if (l.m === null || typeof l.m === 'undefined') {
            this.lvalue = undefined;
            throw new Error(`Bound member can't be undefined (${def.bind})`);
          }
          this.lvalue = l;
        }),

        // switch to stream of values
        switchMap(([l]) => l.o[GET_OBSERVABLE](l.m)),
        // if value of bound variable is observable, switch to it's resolved values
        switchMap((val) => (isObservable(val) ? val : of(val)))
      )
      .subscribe((val: any) => {
        this.fldSetFormValue(val);
      });

    // listen to control changes to update bound context value
    this.addSubscription = this.formControl.valueChanges.subscribe((value: any) => {
      this.fldSetBoundValue(value);
      this.emit('onValueChange', { $value: value });
    });

    return def;
  }

  dynOnAfterBind(): void {
    this.map('readonly', (state: boolean) =>
      state ? this.formControl?.disable() : this.formControl?.enable()
    );
  }

  dynOnChange(): void {
    // once bound options are resolved, update schema Validator
    this.schemaValidator = schemaValidator(this.options as any);
    this.formControl!.updateValueAndValidity();
  }

  // Hooks for Field Widgets
  // -----------------------

  /**
   * Called to get the bound value from a control.
   * Can be overridden to return a different value than the standard `formControl.value`
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
    if (!this.formControl) return;
    if (typeof value === 'undefined') value = this.default;
    if (value === this.formControl.value) return;
    this.formControl.setValue(value);
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
    if (!this.formControl?.errors || !this.formControl?.errors.code) return '';

    return (
      this.expr.eval(
        ERROR_MSG[this.formControl.errors.code],
        { $err: this.formControl.errors },
        false
      ) || ''
    );
  }
}
