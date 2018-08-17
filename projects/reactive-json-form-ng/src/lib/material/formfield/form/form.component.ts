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
import { FormArray, FormGroup } from '@angular/forms';
import { RxObject } from 'espression-rx';

import {
  AbstractWidget,
  Context,
  Expressions,
  FORM_CONTROL,
  IWidgetDef,
} from '../../../core/index';

@Component({
  selector: 'wdg-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormWidgetComponent extends AbstractWidget<{}> {
  formGroup: FormGroup | undefined;
  constructor(cdr: ChangeDetectorRef, expr: Expressions) {
    super(cdr, expr);
  }

  dynOnSetup(def: IWidgetDef): IWidgetDef {
    this.formGroup = new FormGroup({});

    // register with parent form, if any
    const parentForm: FormGroup | FormArray = (<any>this.context)[FORM_CONTROL];
    if (parentForm) {
      if (parentForm instanceof FormGroup) parentForm.addControl('control', this.formGroup);
      else if (parentForm instanceof FormArray) parentForm.push(this.formGroup);
    }

    // save this FormGroup as parent form for the children
    Context.defineHidden(this.context, { [FORM_CONTROL]: this.formGroup });

    // create a Store for the variables

    this.context['$model'] = RxObject({});
    return def;
  }
}
