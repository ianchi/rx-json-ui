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
import { isReactive, RxObject } from 'espression-rx';

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
  boundData: object | undefined;
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
    if (!def.bind) this.boundData = RxObject({}, true);
    else {
      const lvalue = this._expr.lvalue(def.bind, this.context);

      if (!lvalue)
        throw new Error('Form field "bind" property must be an identifier or member expression');

      if (!isReactive(lvalue.o[lvalue.m])) {
        if (isReactive(lvalue.o) && !(lvalue.m in lvalue.o))
          lvalue.o[lvalue.m] = this.boundData = RxObject({}, true);
        else throw new Error(`Bound Key '${def.bind}' must of Reactive Type`);
      }

      this.boundData = lvalue.o[lvalue.m];
    }
    this.context[def.exportAs || '$model'] = this.boundData;
    return def;
  }
}
