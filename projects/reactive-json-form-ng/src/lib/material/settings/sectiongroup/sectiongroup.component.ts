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

export interface ISetSectionGroupWidgetOptions {
  title: string;
}
@Component({
  selector: 'set-sectiongroup',
  templateUrl: './sectiongroup.component.html',
  styleUrls: ['./sectiongroup.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SetSectionGroupWidgetComponent extends AbstractWidget<
  ISetSectionGroupWidgetOptions
> {
  expanded = false;
  constructor(cdr: ChangeDetectorRef, expr: Expressions) {
    super(cdr, expr);
  }

  toggle(): void {
    this.expanded = !this.expanded;
  }
}
