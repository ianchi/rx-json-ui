/*!
 * Copyright (c) 2018 Adrian Panella <ianchi74@outlook.com>
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import {
  ChangeDetectorRef,
  Directive,
  IterableChangeRecord,
  IterableDiffer,
  IterableDiffers,
  TrackByFunction,
} from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';
import { AS_OBSERVABLE, isReactive, RxObject } from 'espression-rx';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, map, take } from 'rxjs/operators';

import { SchemaArray } from '../../schema';
import { ERR_CUSTOM } from '../../schema/validation/base';
import { BaseWidget } from '../base/abstractwidget';
import {
  BindWidgetDef,
  ConstrainEvents,
  ConstrainSlots,
  FieldEventDef,
  multilineExpr,
  WidgetDef,
} from '../base/public.interface';
import { Context, Expressions } from '../expressions/index';

import { FieldControl } from './fieldcontrol';
import { FORM_CONTROL } from './formfieldwidget';

export interface ArrayEventsDef extends FieldEventDef {
  /**
   * Expression that must return a function or a property to use to track changes
   * and recreate the widget if necessary
   *  + (index, item) => id
   *  + <string|number>
   *
   */
  onTrackFn?: multilineExpr;
  /**
   * Expression that must return the new object to add to the array.
   * If it is empty or returns undefined, no row is added
   * When the handler is present the button is added
   */
  onNewRow?: multilineExpr;
  /**
   * Emitted when a row is about to be deleted
   * It receives `$idx` in with the index of the element about to be removed.
   * If the expression returns false, the operation is canceled.
   * The handler must be present for the delete action to be available
   */
  onDeleteRow?: multilineExpr;
  /**
   * Emitted when a row is about to be moved
   * It receives `$idx` and `$dir` in with the index of the element about to be moved,
   * and the offset of the move.
   * If the expression returns false, the operation is canceled.
   * The handler must be present for the move action to be available
   */
  onMoveRow?: multilineExpr;
}

/**
 * Widget for editing arrays
 * Each element is in a sub-context that exposes:
 *
 * `$row: {data, index, array}`
 *
 * `data` a reference to the current's row data object
 * `array` a reference to the containing array
 * `index` the index of the current element in the array
 */
@Directive()
// tslint:disable-next-line: directive-class-suffix
export class AbstractArrayWidgetComponent<
  T extends SchemaArray,
  S extends ConstrainSlots<S> | undefined = undefined,
  E extends ConstrainEvents<E> & ArrayEventsDef = ArrayEventsDef
> extends BaseWidget<T, S, E, BindWidgetDef> {
  formControl: FormArray | undefined;
  boundData: any[] | undefined;

  rowContext: Context[] = [];
  schemaValidator: ValidatorFn | undefined;

  private bindDiffer: IterableDiffer<any[]> | undefined;
  bindTrackBy: TrackByFunction<any> | undefined;

  constructor(cdr: ChangeDetectorRef, expr: Expressions, private differs: IterableDiffers) {
    super(cdr, expr);
  }
  dynOnSetup(def: WidgetDef<T, S, E, BindWidgetDef>): WidgetDef<T, S, E, BindWidgetDef> {
    // get bound model
    if (!def.bind) throw new Error('Form field widgets must have a "bind" property defined');

    // create a Store for the variables
    // binding is always on the parent context directly, so it can't get shadowed in the child
    // and if the variable is created, it can still be accessed after child's destruction
    const lvalue = this.expr.lvalue(def.bind, this.context.$parentContext);

    if (!lvalue)
      throw new Error('Form field "bind" property must be an identifier or member expression');

    if (!isReactive(lvalue.o[lvalue.m]) || !Array.isArray(lvalue.o[lvalue.m])) {
      if (!(lvalue.m in lvalue.o)) lvalue.o[lvalue.m] = RxObject([], true);
      else throw new Error(`Bound Key '${def.bind}' must be Array of Reactive Type`);
    }
    this.boundData = lvalue.o[lvalue.m];
    Context.defineReadonly(this.context, { $: lvalue.o });

    this.formControl = new FormArray(
      [],
      (ctrl: AbstractControl) =>
        this.schemaValidator ? this.schemaValidator(this.fldGetValue(ctrl)) : null,
      def?.events?.['onValidate'] ? this.validateFn : null
    );

    // register with parent form, if any
    const parentForm: FormGroup | FormArray =
      this.context[FORM_CONTROL] && this.context[FORM_CONTROL]._control;
    if (parentForm) {
      if (parentForm instanceof FormGroup) parentForm.addControl('control', this.formControl);
      else if (parentForm instanceof FormArray) parentForm.push(this.formControl);
    }

    // save this FormArray as parent form for the children
    Context.defineHidden(this.context, {
      [FORM_CONTROL]: new FieldControl(this.formControl),
    });

    return def;
  }

  dynOnAfterSetup(): void {
    // prepare the differ

    this.emmit('onTrackFn', (fn: any) => {
      if (typeof fn === 'function') this.bindTrackBy = fn;
      else if (typeof fn === 'string' || typeof fn === 'number')
        this.bindTrackBy = (_i, elem) => elem[fn];
    });

    try {
      this.bindDiffer = this.differs.find([]).create(this.bindTrackBy);
    } catch {
      throw new Error(`Cannot find a differ supporting array`);
    }

    // sync the row contexts if the data changed
    this.addSubscription = (<any>this.boundData)[AS_OBSERVABLE]().subscribe((arr: any[]) => {
      this.applyChanges(arr);
    });
  }

  validateFn(ctrl: AbstractControl): Observable<ValidationErrors | null> {
    return this.expr
      .evaluate(this.events.onValidate, Context.create(this.context, { $value: ctrl.value }), true)
      .pipe(
        take(1),
        map(res => {
          return !res ? null : { code: ERR_CUSTOM, message: typeof res === 'string' ? res : '' };
        }),
        catchError(_e =>
          of({ code: ERR_CUSTOM, message: 'Error evaluating validation expression' })
        )
      );
  }

  fldGetValue(_formControl: AbstractControl): any {
    return this.boundData;
  }

  addRow(): void {
    this.emmit('onNewRow', undefined, newRow => {
      if (typeof newRow === 'object' && !isReactive(newRow)) newRow = RxObject(newRow);
      if (typeof newRow !== 'undefined') this.boundData!.push(newRow);
    });
  }

  deleteRow(idx: number): void {
    this.emmit('onDeleteRow', { $idx: idx }, result => result && this.boundData!.splice(idx, 1));
  }

  moveRow(idx: number, dir: number): void {
    if (!dir) return;
    dir = dir < 0 ? -1 : 1;
    this.emmit(
      'onMoveRow',
      { $idx: idx, $dir: dir },
      result => result && this.boundData!.splice(idx + dir, 0, this.boundData!.splice(idx, 1)[0])
    );
  }

  private applyChanges(value: any[]): void {
    if (!this.bindDiffer) return;
    const changes = this.bindDiffer.diff(value);
    if (!changes) return;

    changes.forEachOperation(
      (
        record: IterableChangeRecord<any>,
        adjustedPreviousIndex: number | null,
        currentIndex: number | null
      ) => {
        if (record.previousIndex == null && currentIndex !== null) {
          // added elements
          const context = Context.create(this.context, undefined, {
            $row: {
              data: new BehaviorSubject(record.item),
              index: new BehaviorSubject(currentIndex),
              array: this.boundData,
            },
          });

          this.rowContext.splice(currentIndex, 0, context);
        } else if (currentIndex == null && adjustedPreviousIndex !== null) {
          // removed elements
          this.rowContext.splice(adjustedPreviousIndex, 1);
        } else if (adjustedPreviousIndex !== null && currentIndex !== null) {
          // moved elements

          const context = this.rowContext[adjustedPreviousIndex];
          this.rowContext.splice(adjustedPreviousIndex, 1);
          this.rowContext.splice(currentIndex, 0, context);

          // emit updated index
          this.rowContext[currentIndex].instance.context.$row.index.next(currentIndex);
        }
      }
    );

    // the identity of the item changed (even if the trackBy returned the same ID, the objects have different references )
    // emit updated data
    changes.forEachIdentityChange((record: IterableChangeRecord<any>) => {
      if (record.currentIndex !== null && record.previousIndex !== null)
        this.rowContext[record.currentIndex].$row.data.next(record.item);
    });

    this._cdr.markForCheck();
  }
}
