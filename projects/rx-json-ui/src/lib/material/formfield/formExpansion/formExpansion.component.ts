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

import { AbstractFormWidgetComponent } from '../../../core/forms/index';
import { Expressions } from '../../../core/index';

export interface FormExpansionWidgetOptions {
  title: string;
  description: string;
}

@Component({
  selector: 'wdg-form-expansion',
  templateUrl: './formExpansion.component.html',
  styleUrls: ['./formExpansion.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormExpansionWidgetComponent extends AbstractFormWidgetComponent<
  FormExpansionWidgetOptions
> {
  constructor(cdr: ChangeDetectorRef, expr: Expressions) {
    super(cdr, expr);
  }
}