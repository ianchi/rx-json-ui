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
  BindWidgetDef,
  WidgetDef,
} from '../../../core/index';
import { SchemaArray } from '../../../schema';

@Component({
  selector: 'set-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'set-row' },
})
export class SetListWidgetComponent extends AbstractArrayWidgetComponent<SchemaArray> {
  itemOptions = { widget: 'input', bind: '$row.array[$row.index]', options: {} };

  dynOnSetup(
    def: WidgetDef<SchemaArray, undefined, ArrayEventsDef, BindWidgetDef>
  ): WidgetDef<SchemaArray, undefined, ArrayEventsDef, BindWidgetDef> {
    this.bindTrackBy = i => i;
    return super.dynOnSetup(def);
  }

  dynOnAfterBind(): void {
    this.map('items', i => (this.itemOptions.options = i));
  }
  trackItems(i: number, val: any): number {
    console.log(i, val);
    return i;
  }
}
