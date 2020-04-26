/*!
 * Copyright (c) 2020 Adrian Panella <ianchi74@outlook.com>
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Directive, OnDestroy } from '@angular/core';
import { AbstractControl, FormArray, FormGroup } from '@angular/forms';
import { ILvalue } from 'espression';
import { isObservable } from 'rxjs';

import { BaseWidget } from '../base/abstractwidget';
import { CommonOptionsDef, ConstrainEvents, ConstrainSlots } from '../base/public.interface';
import { Context } from '../expressions/index';

import { FieldControl } from './fieldcontrol';

export const FORM_CONTROL = '$form';

@Directive()
// tslint:disable-next-line: directive-class-suffix
export abstract class AbstractBaseFormControlWidget<
  O extends CommonOptionsDef,
  S extends ConstrainSlots<S>,
  E extends ConstrainEvents<E>,
  B extends boolean
> extends BaseWidget<O, S, E, B> implements OnDestroy {
  formControl: AbstractControl | undefined;

  parentForm: FormGroup | FormArray | undefined;
  ctrlID: string | number | undefined;

  /** Resolved lvalue */
  lvalue: ILvalue | undefined;

  /** Possibly observable lvalue */
  lvalue$: ILvalue | undefined;

  /** setup parent */
  formSetParent(): void {
    if (!this.formControl) return;

    this.parentForm = this.context[FORM_CONTROL]?._control;

    if (this.parentForm) {
      let lastID = (this.parentForm as any).LAST_ID ?? 0;
      (this.parentForm as any).LAST_ID = ++lastID;
      this.ctrlID = `CTRL_${lastID}_${
        !this.lvalue$ || isObservable(this.lvalue$.m) ? '' : this.lvalue$.m
      }`;

      if (this.parentForm instanceof FormGroup)
        this.parentForm.addControl(this.ctrlID, this.formControl);
      else if (this.parentForm instanceof FormArray) this.parentForm.push(this.formControl);
    }
  }

  /** save this FormControl as parent form in the context */
  formSetContext(): void {
    if (this.formControl instanceof FormGroup || this.formControl instanceof FormArray)
      Context.defineHidden(this.context, {
        [FORM_CONTROL]: new FieldControl(this.formControl),
      });
  }
  ngOnDestroy(): void {
    if (this.parentForm instanceof FormGroup && this.ctrlID)
      this.parentForm.removeControl(this.ctrlID as string);
    else if (this.parentForm instanceof FormArray && this.formControl) {
      const idx = this.parentForm.controls.indexOf(this.formControl);
      if (idx >= 0) this.parentForm.removeAt(idx);
    }

    super.ngOnDestroy();
  }
}
