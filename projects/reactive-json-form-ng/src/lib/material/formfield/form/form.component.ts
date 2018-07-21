/**
 * Copyright (c) 2018 Adrian Panella <ianchi74@outlook.com>
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Component, ViewEncapsulation, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormArray } from '@angular/forms';
import { RxObject } from 'espression';
import { AbstractWidget, IWidgetDef, Context, Expressions, FORM_CONTROL } from '../../../core';

@Component({
  selector: 'wdg-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormWidgetComponent extends AbstractWidget {

  formGroup: FormGroup;
  constructor(cdr: ChangeDetectorRef, expr: Expressions) {
    super(cdr, expr);
  }

  dynOnSetup(def: IWidgetDef) {

    this.formGroup = new FormGroup({});

    // register with parent form, if any
    const parentForm: FormGroup | FormArray = this.context[FORM_CONTROL];
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
