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

import { FieldControl } from '../../../core/fieldcontrol';
import {
  AbstractWidget,
  Context,
  Expressions,
  FORM_CONTROL,
  IFieldGroupWidgetDef,
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

  dynOnSetup(def: IFieldGroupWidgetDef): IWidgetDef {
    // get bound model
    if (!def.bind) throw new Error('Form field widgets must have a "bind" property defined');

    this.formGroup = new FormGroup({});

    // register with parent form, if any
    const parentForm: FormGroup | FormArray =
      this.context[FORM_CONTROL] && this.context[FORM_CONTROL]._control;
    if (parentForm) {
      if (parentForm instanceof FormGroup) parentForm.addControl('control', this.formGroup);
      else if (parentForm instanceof FormArray) parentForm.push(this.formGroup);
    }

    // save this FormGroup as parent form for the children
    Context.defineReadonly(this.context, { [FORM_CONTROL]: new FieldControl(this.formGroup) });

    // binding is always on the parent context directly, so it can't get shadowed in the child
    const lvalue = this._expr.lvalue(def.bind, this.context.$parentContext);

    if (!lvalue)
      throw new Error('Form field "bind" property must be an identifier or member expression');

    if (!isReactive(lvalue.o[lvalue.m])) {
      if (!(lvalue.m in lvalue.o)) lvalue.o[lvalue.m] = RxObject({}, true);
      else throw new Error(`Bound Key '${def.bind}' must be of Reactive Type`);
    }

    this.context[def.exportAs || '$model'] = this.boundData = lvalue.o[lvalue.m];
    return def;
  }
}
