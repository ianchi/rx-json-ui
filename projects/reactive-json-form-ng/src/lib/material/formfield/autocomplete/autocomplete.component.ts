/**
 * Copyright (c) 2018 Adrian Panella <ianchi74@outlook.com>
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Component, ViewEncapsulation, ChangeDetectionStrategy, ChangeDetectorRef, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Expressions, AbstractFormFieldWidget } from '../../../core/index';

@Component({
  selector: 'wdg-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AutocompleteWidgetComponent extends AbstractFormFieldWidget implements OnInit {

  title: string;
  description: string;
  placeholder: string;

  enum: string[] = [];
  enumLabel: string[];
  filteredOptions: Observable<string[]>;
  constructor(cdr: ChangeDetectorRef, expr: Expressions) {
    super(cdr, expr);
  }



  dynOnBeforeBind() {
    this.map('enum', val => {
      return Array.isArray(val) ? val : [];
    });
  }

  dynOnAfterBind() {
    this.map('enum', val => (this._filter(this.formControl.value), val));
  }
  ngOnInit() {
    super.ngOnInit();

    this.filteredOptions = this.formControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
  }

  private _filter(value: string): string[] {

    const filterValue = value && value.toLowerCase();

    return this.enum.filter(option => option.toLowerCase().includes(filterValue));
  }

}
