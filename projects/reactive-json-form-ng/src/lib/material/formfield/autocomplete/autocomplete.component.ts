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
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

import { AbstractFormFieldWidget, Expressions } from '../../../core/index';

export interface IAutocompleteWidgetOptions {
  title: string;
  description: string;
  placeholder: string;

  enum: string[];
  enumLabel: string[];
}
@Component({
  selector: 'wdg-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AutocompleteWidgetComponent extends AbstractFormFieldWidget<IAutocompleteWidgetOptions>
  implements OnInit {
  filteredOptions: Observable<string[]> | undefined;
  constructor(cdr: ChangeDetectorRef, expr: Expressions) {
    super(cdr, expr);
  }

  dynOnBeforeBind(): void {
    this.map('enum', val => {
      return Array.isArray(val) ? val : [];
    });
  }

  dynOnAfterBind(): void {
    this.map('enum', val => (this._filter(this.formControl!.value), val));
  }
  ngOnInit(): void {
    super.ngOnInit();

    this.filteredOptions = this.formControl!.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value && value.toLowerCase();

    return this.options.enum.filter(option => option.toLowerCase().includes(filterValue));
  }
}
