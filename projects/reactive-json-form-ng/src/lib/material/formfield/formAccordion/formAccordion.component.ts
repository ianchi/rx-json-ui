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

import { AbstractArrayWidgetComponent, Expressions } from '../../../core/index';

export interface IFormAccordionWidgetOptions {
  title: string;
  description: string;
  newRow: string;
  allowDel: boolean;
}
@Component({
  selector: 'wdg-form-accordion',
  templateUrl: './formAccordion.component.html',
  styleUrls: ['./formAccordion.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormAccordionWidgetComponent extends AbstractArrayWidgetComponent<
  IFormAccordionWidgetOptions
> {
  constructor(cdr: ChangeDetectorRef, expr: Expressions) {
    super(cdr, expr);
  }
}
