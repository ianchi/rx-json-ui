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
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

import {
  AbstractFormFieldWidget,
  Expressions,
  IFieldWidgetDef,
  IWidgetDef,
} from '../../../core/index';

export interface ISetAutocompleteWidgetOptions {
  title: string;
  description: string;
  required: boolean;
  default: any;
  enum: any[];

  // if enum is array of objects
  propKey: string; // if no unique, binds to first occurrence, if empty bounds the whole object? how to initialize? by ref??
  propLabel: string;

  /**
   * Extra Bindings
   * Bind aditional properties of selected option to other lvalues
   * the binding is unidirectional (from option to lvalue), only the key binding is bidirectional.
   * on first binding of key value, the extra bindings are overwritten.
   * format: { optionProperty: "lvalue to bind" }  special property "#" bounds to whole object
   */
  extraBind: { [optionProperty: string]: string };
}
@Component({
  selector: 'set-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'set-row set-row-flex' },
})
export class SetAutocompleteWidgetComponent extends AbstractFormFieldWidget<
  ISetAutocompleteWidgetOptions
> {
  filteredOptions: Observable<string[]> | undefined;
  constructor(cdr: ChangeDetectorRef, expr: Expressions) {
    super(cdr, expr);
  }

  dynOnBeforeBind(): void {
    this.map('enum', val => (Array.isArray(val) ? val : []));
  }

  dynOnAfterBind(): void {
    this.map(
      'enum',
      val => (
        this.lvalue && this.dynSetFormValue(this.lvalue.o[this.lvalue.m]),
        this._filter(this.formControl!.value),
        val
      )
    );
  }

  dynSetFormValue(val: any): void {
    let key: any;
    key =
      typeof val === 'undefined'
        ? this.options.default
        : this.options.propKey && typeof val === 'object'
        ? val[this.options.propKey]
        : val;
    let opt = this.getOption(key);
    if (typeof opt === 'undefined') opt = val;
    if (this.formControl!.value !== opt) this.formControl!.setValue(opt);
    this._filter(this.formControl!.value);
  }

  dynSetBoundValue(opt: any): void {
    const value =
      this.options.propKey && typeof opt === 'object' ? opt[this.options.propKey] : opt;
    if (!this.lvalue || value === this.lvalue.o[this.lvalue.m]) return;
    this.lvalue.o[this.lvalue.m] = value;
  }

  dynOnSetup(def: IFieldWidgetDef): IWidgetDef {
    const result = super.dynOnSetup(def);

    this.filteredOptions = this.formControl!.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );

    return result;
  }

  getOption(key: any): any {
    return (
      this.options.enum &&
      this.options.enum.find(
        opt => key === (this.options.propKey ? opt[this.options.propKey] : opt)
      )
    );
  }

  private _filter(value: string): string[] {
    value = this.getLabel(value);
    const filterValue = value && value.toLowerCase();

    return this.options.enum
      ? this.options.enum.filter(option =>
          this.getLabel(option)
            .toLowerCase()
            .includes(filterValue)
        )
      : [];
  }

  displayFn(): (data: any) => string {
    return (data: any) => this.getLabel(data);
  }

  getLabel(data: any): string {
    const key = this.options.propLabel || this.options.propKey;
    return key && typeof data === 'object' ? data[key] : data;
  }
}
