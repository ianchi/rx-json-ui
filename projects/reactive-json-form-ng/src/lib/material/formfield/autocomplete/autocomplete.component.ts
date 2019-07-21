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
import { merge, Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { Expressions, IFieldWidgetDef, IWidgetDef } from '../../../core/index';
import { SelectWidgetComponent } from '../select/select.component';

@Component({
  selector: 'wdg-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AutocompleteWidgetComponent extends SelectWidgetComponent {
  filteredOptions: Observable<string[]> | undefined;
  enumSubject = new Subject<any>();

  constructor(cdr: ChangeDetectorRef, expr: Expressions) {
    super(cdr, expr);
  }

  dynOnAfterBind(): void {
    super.dynOnAfterBind();
    this.map('enum', val => (this.enumSubject.next(undefined), val));
  }

  dynOnSetup(def: IFieldWidgetDef): IWidgetDef {
    const result = super.dynOnSetup(def);

    this.filteredOptions = merge(this.enumSubject, this.formControl!.valueChanges).pipe(
      map(value => this._filter(value))
    );

    return result;
  }

  dynSetFormValue(val: any): void {
    super.dynSetFormValue(val);
    this._filter(this.formControl!.value);
  }

  private _filter(value: string): string[] {
    if (typeof value === 'undefined') return this.options.enum || [];
    value = this.getLabel(value);
    const filterValue = (typeof value === 'string' && value.toLowerCase()) || value;

    return this.options.enum
      ? this.options.enum.filter(option =>
          this.getLabel(option)
            .toLowerCase()
            .includes(filterValue)
        )
      : [];
  }
}
