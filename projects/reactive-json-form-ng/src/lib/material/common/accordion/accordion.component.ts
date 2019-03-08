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

import { AbstractWidget, Expressions } from '../../../core/index';

export interface IAccordionWidgetOptions {
  title: string;
  description: string;
}
@Component({
  selector: 'wdg-accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccordionWidgetComponent extends AbstractWidget<IAccordionWidgetOptions> {
  constructor(cdr: ChangeDetectorRef, expr: Expressions) {
    super(cdr, expr);
  }
}
