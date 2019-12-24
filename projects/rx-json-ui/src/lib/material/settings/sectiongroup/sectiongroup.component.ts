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

import { BaseWidget, Expressions, MainSlotContentDef, TitleOption } from '../../../core/index';

@Component({
  selector: 'set-sectiongroup',
  templateUrl: './sectiongroup.component.html',
  styleUrls: ['./sectiongroup.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SetSectionGroupWidgetComponent extends BaseWidget<TitleOption, MainSlotContentDef> {
  expanded = false;
  constructor(cdr: ChangeDetectorRef, expr: Expressions) {
    super(cdr, expr);
  }

  toggle(): void {
    this.expanded = !this.expanded;
  }
}
