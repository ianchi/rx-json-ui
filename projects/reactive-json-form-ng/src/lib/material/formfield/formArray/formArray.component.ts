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

import { AbstractWidget, Context, Expressions, FORM_CONTROL, IWidgetDef } from '../../../core/index';

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

  dynOnSetup(def: IWidgetDef): IWidgetDef {
    this.formArray = new FormArray([]);

    // register with parent form, if any
    const parentForm: FormGroup | FormArray = (<any>this.context)[FORM_CONTROL];
    if (parentForm) {
      if (parentForm instanceof FormGroup) parentForm.addControl('control', this.formArray);
      else if (parentForm instanceof FormArray) parentForm.push(this.formArray);
    }

    // save this FormArray as parent form for the children
    Context.defineHidden(this.context, { [FORM_CONTROL]: this.formArray });

    // create a Store for the variables

    if (!def.bind) this.boundData = RxObject([], true);
    else {
      const lvalue = this._expr.lvalue(def.bind, this.context);

      if (!lvalue)
        throw new Error('Form field "bind" property must be an identifier or member expression');

      if (!isReactive(lvalue.o[lvalue.m]) || !Array.isArray(lvalue.o[lvalue.m])) {
        if (isReactive(lvalue.o) && !(lvalue.m in lvalue.o))
          lvalue.o[lvalue.m] = this.boundData = RxObject([], true);
        else throw new Error(`Bound Key '${def.bind}' must be Array of Reactive Type`);
      }

      this.boundData = lvalue.o[lvalue.m];
    }
    this.context[def.exportAs || '$model'] = this.boundData;

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
