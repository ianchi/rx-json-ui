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
  enum: string[];
  data: any[];
  dataValue: string;
  dataLabel: string;
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
    this.map('enum', val => (this._filter(this.formControl!.value), val));
    this.map('data', val => (this._filter(this.formControl!.value), val));
  }
  dynOnSetup(def: IFieldWidgetDef): IWidgetDef {
    const result = super.dynOnSetup(def);

    this.filteredOptions = this.formControl!.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );

    return result;
  }

  private _filter(value: string): string[] {
    const filterValue = value && value.toLowerCase();

    if (this.options.data)
      return <string[]>(
        this.options.data.filter(option =>
          option[this.options.dataLabel].toLowerCase().includes(filterValue)
        )
      );

    return this.options.enum
      ? this.options.enum.filter(option => option.toLowerCase().includes(filterValue))
      : [];
  }

  displayFn(data: any): string {
    console.log(data);
    return this.options.data ? data[this.options.dataLabel] : data;
  }
}
