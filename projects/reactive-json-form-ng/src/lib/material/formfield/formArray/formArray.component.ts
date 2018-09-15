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
import { AS_OBSERVABLE, isReactive, RxObject } from 'espression-rx';

import { FieldControl } from '../../../core/fieldcontrol';
import {
  AbstractWidget,
  Context,
  Expressions,
  FORM_CONTROL,
  IFieldGroupWidgetDef,
  IWidgetDef,
} from '../../../core/index';

export interface IFormArrayWidgetOptions {
  newRow: string;
  allowDel: boolean;
}
@Component({
  selector: 'wdg-form-array',
  templateUrl: './formArray.component.html',
  styleUrls: ['./formArray.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormArrayWidgetComponent extends AbstractWidget<IFormArrayWidgetOptions> {
  formArray: FormArray | undefined;
  boundData: any[] | undefined;

  rowContext: Context[] = [];
  constructor(cdr: ChangeDetectorRef, expr: Expressions) {
    super(cdr, expr);
  }

  dynOnSetup(def: IFieldGroupWidgetDef): IWidgetDef {
    // get bound model
    if (!def.bind) throw new Error('Form field widgets must have a "bind" property defined');

    this.formArray = new FormArray([]);

    // register with parent form, if any
    const parentForm: FormGroup | FormArray =
      this.context[FORM_CONTROL] && this.context[FORM_CONTROL]._control;
    if (parentForm) {
      if (parentForm instanceof FormGroup) parentForm.addControl('control', this.formArray);
      else if (parentForm instanceof FormArray) parentForm.push(this.formArray);
    }

    // save this FormArray as parent form for the children
    Context.defineHidden(this.context, { [FORM_CONTROL]: new FieldControl(this.formArray) });

    // create a Store for the variables
    // binding is always on the parent context directly, so it can't get shadowed in the child
    // and if the variable is created, it can still be accesed after child's destruction
    const lvalue = this._expr.lvalue(def.bind, this.context.$parentContext);

    if (!lvalue)
      throw new Error('Form field "bind" property must be an identifier or member expression');

    if (!isReactive(lvalue.o[lvalue.m]) || !Array.isArray(lvalue.o[lvalue.m])) {
      if (!(lvalue.m in lvalue.o)) lvalue.o[lvalue.m] = RxObject([], true);
      else throw new Error(`Bound Key '${def.bind}' must be Array of Reactive Type`);
    }

    this.context[def.exportAs || '$model'] = this.boundData = lvalue.o[lvalue.m];

    // sync the row contexts if the data changed
    this.addSubscription = (<any>this.boundData)[AS_OBSERVABLE]().subscribe((arr: any[]) => {
      this.rowContext = arr.map(
        (data: any, idx: number) =>
          // keep old Context if no change, so no DOM change is triggered
          !this.rowContext[idx] ||
          this.rowContext[idx].$data !== data ||
          this.rowContext[idx].$index !== idx
            ? Context.create(this.context, undefined, { $data: data, $index: idx })
            : this.rowContext[idx]
      );
      this._cdr.markForCheck();
    });
    return def;
  }

  addRow(): void {
    if (!this.options.newRow) return;
    let newRow = this._expr.eval(this.options.newRow, this.context);
    if (typeof newRow === 'object' && !isReactive(newRow)) newRow = RxObject(newRow);
    if (newRow) this.boundData!.push(newRow);
  }

  deleteRow(idx: number): void {
    this.boundData!.splice(idx, 1);
  }
}
