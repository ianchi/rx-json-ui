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

export interface RowArrayWidgetOptions {
  newRow: string;
  allowDel: boolean;
}
@Component({
  selector: 'set-row-array',
  templateUrl: './rowArray.component.html',
  styleUrls: ['./rowArray.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'set-row' },
})
export class SetRowArrayWidgetComponent extends AbstractArrayWidgetComponent<
  RowArrayWidgetOptions
> {
  constructor(cdr: ChangeDetectorRef, expr: Expressions) {
    super(cdr, expr);
  }
}
