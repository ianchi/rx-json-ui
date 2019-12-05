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
import { Expressions, TitleOption } from '../../../core/index';

@Component({
  selector: 'set-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.scss'],

  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SetSectionWidgetComponent extends AbstractFormWidgetComponent<TitleOption> {
  constructor(cdr: ChangeDetectorRef, expr: Expressions) {
    super(cdr, expr);
  }
}
