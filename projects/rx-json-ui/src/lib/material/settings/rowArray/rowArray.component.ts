/**
 * Copyright (c) 2018 Adrian Panella <ianchi74@outlook.com>
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

import {
  AbstractArrayWidgetComponent,
  ArrayEventsDef,
  MainSlotContentDef,
} from '../../../core/index';
import { SchemaArray } from '../../../schema';

export interface ActionDef {
  /** SVG icon name to show */
  icon?: string;
  /** Label for the action */
  label?: string;
  /** Optional data to pass to the `onAction` event when this action is clicked */
  data?: any;
}

export interface RowArrayWidgetOptions extends SchemaArray {
  actions?: ActionDef[];
}

export interface RowWidgetEvents extends ArrayEventsDef {
  /**
   * Expression to evaluate when an action is clicked.
   * It receives the following parameters in the context:
   *
   * `$row` the row's data
   * `$action.index` the index of the current action in the actions array
   * `$action.data` the additional data defined in the action
   */
  onAction: string;
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
  RowArrayWidgetOptions,
  MainSlotContentDef,
  RowWidgetEvents
> {
  actionClick(rowData: any, index: number): void {
    this.emmit('onAction', {
      $row: rowData,
      $action: { data: this!.options!.actions![index].data, index },
    });
  }
}
