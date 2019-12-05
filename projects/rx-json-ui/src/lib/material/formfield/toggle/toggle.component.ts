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

import { AbstractFormFieldWidget, Expressions, TitleOption } from '../../../core/index';

@Component({
  selector: 'wdg-toggle',
  templateUrl: './toggle.component.html',
  styleUrls: ['./toggle.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToggleWidgetComponent extends AbstractFormFieldWidget<TitleOption> {
  constructor(cdr: ChangeDetectorRef, expr: Expressions) {
    super(cdr, expr);
  }
}
