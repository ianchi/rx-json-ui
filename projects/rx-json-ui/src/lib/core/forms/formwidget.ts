/*!
 * Copyright (c) 2018 Adrian Panella <ianchi74@outlook.com>
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Directive } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { isReactive, RxObject } from 'espression-rx';

import {
  CommonEventsDef,
  CommonOptionsDef,
  ConstrainEvents,
  ConstrainSlots,
  MainSlotContentDef,
  OptBindWidgetDef,
  WidgetDef,
} from '../base/public.interface';
import { Context } from '../expressions/index';

import { AbstractBaseFormControlWidget } from './baseformcontrol';

@Directive()
// tslint:disable-next-line: directive-class-suffix
export class AbstractFormWidgetComponent<
  O extends CommonOptionsDef = CommonOptionsDef,
  S extends ConstrainSlots<S> = MainSlotContentDef,
  E extends ConstrainEvents<E> = CommonEventsDef,
  B extends OptBindWidgetDef = OptBindWidgetDef
> extends AbstractBaseFormControlWidget<O, S, E, B> {
  boundData: object | undefined;

  dynOnSetup(def: WidgetDef<O, S, E, B>): WidgetDef<O, S, E, B> {
    this.formControl = new FormGroup({});

    this.formSetParent();
    this.formSetContext();

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
    } else this.boundData = RxObject({}, true);

    Context.defineReadonly(this.context, { $: this.boundData });

    return def;
  }
}
