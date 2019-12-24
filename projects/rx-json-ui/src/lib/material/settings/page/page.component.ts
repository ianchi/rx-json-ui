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

import { BaseWidget, Expressions, MainSlotContentDef } from '../../../core/index';

@Component({
  selector: 'set-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss'],

  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SetPageWidgetComponent extends BaseWidget<{}, MainSlotContentDef> {
  constructor(cdr: ChangeDetectorRef, expr: Expressions) {
    super(cdr, expr);
  }
}
