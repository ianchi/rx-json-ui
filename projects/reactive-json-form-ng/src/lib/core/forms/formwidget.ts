/*!
 * Copyright (c) 2018 Adrian Panella <ianchi74@outlook.com>
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { ChangeDetectorRef } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { isReactive, RxObject } from 'espression-rx';

import { AbstractWidget } from '../base/abstractwidget';
import {
  AbstractEventsDef,
  AbstractOptionsDef,
  MainSlotContentDef,
  SlotedContentDef,
  WidgetDef,
} from '../base/public.interface';
import { Context, Expressions } from '../expressions/index';

import { FieldControl } from './fieldcontrol';
import { FORM_CONTROL } from './formfieldwidget';

export class AbstractFormWidgetComponent<
  O extends AbstractOptionsDef = {},
  S extends SlotedContentDef = MainSlotContentDef,
  E extends AbstractEventsDef = AbstractEventsDef
> extends AbstractWidget<O, S, E> {
  formGroup: FormGroup | undefined;
  boundData: object | undefined;
  constructor(cdr: ChangeDetectorRef, expr: Expressions) {
    super(cdr, expr);
  }

  dynOnSetup(def: WidgetDef<O, S, E>): WidgetDef<O, S, E> {
    this.formGroup = new FormGroup({});

    // register with parent form, if any
    const parentForm: FormGroup | FormArray =
      this.context[FORM_CONTROL] && this.context[FORM_CONTROL]._control;
    if (parentForm) {
      if (parentForm instanceof FormGroup) parentForm.addControl('control', this.formGroup);
      else if (parentForm instanceof FormArray) parentForm.push(this.formGroup);
    }

    // save this FormGroup as parent form for the children
    Context.defineReadonly(this.context, {
      [FORM_CONTROL]: new FieldControl(this.formGroup),
    });

    // get bound model if it has one or create aux unbound model
    if (def.bind) {
      // binding is always on the parent context directly, so it can't get shadowed in the child
      const lvalue = this.expr.lvalue(def.bind, this.context.$parentContext);

      if (!lvalue)
        throw new Error('Form field "bind" property must be an identifier or member expression');

      if (!isReactive(lvalue.o[lvalue.m])) {
        if (!(lvalue.m in lvalue.o)) lvalue.o[lvalue.m] = RxObject({}, true);
        else throw new Error(`Bound Key '${def.bind}' must be of Reactive Type`);
      }

      this.boundData = lvalue.o[lvalue.m];
    } else this.boundData = RxObject({});

    this.context[def.exportAs || '$model'] = this.boundData;
    return def;
  }
}
