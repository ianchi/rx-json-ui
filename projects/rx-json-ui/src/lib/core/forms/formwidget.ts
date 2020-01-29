/*!
 * Copyright (c) 2018 Adrian Panella <ianchi74@outlook.com>
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { FormArray, FormGroup } from '@angular/forms';
import { isReactive, RxObject } from 'espression-rx';

import { BaseWidget } from '../base/abstractwidget';
import {
  CommonEventsDef,
  ConstrainEvents,
  ConstrainSlots,
  EmptyOptionsDef,
  MainSlotContentDef,
  OptBindWidgetDef,
  WidgetDef,
} from '../base/public.interface';
import { Context } from '../expressions/index';

import { FieldControl } from './fieldcontrol';
import { FORM_CONTROL } from './formfieldwidget';

export class AbstractFormWidgetComponent<
  O extends EmptyOptionsDef = {},
  S extends ConstrainSlots<S> = MainSlotContentDef,
  E extends ConstrainEvents<E> = CommonEventsDef,
  B extends OptBindWidgetDef = OptBindWidgetDef
> extends BaseWidget<O, S, E, B> {
  formGroup: FormGroup | undefined;
  boundData: object | undefined;

  dynOnSetup(def: WidgetDef<O, S, E, B>): WidgetDef<O, S, E, B> {
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
    if (typeof def.bind === 'string') {
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

    Context.defineReadonly(this.context, { [def.exportAs || '_']: this.boundData });

    return def;
  }
}
