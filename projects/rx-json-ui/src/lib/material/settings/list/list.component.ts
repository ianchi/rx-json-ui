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
  ArrayOptionsDef,
  BindWidgetDef,
  WidgetDef,
} from '../../../core/index';

@Component({
  selector: 'set-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'set-row' },
})
export class SetListWidgetComponent extends AbstractArrayWidgetComponent<ArrayOptionsDef> {
  itemOptions = { widget: 'input', bind: '$row.array[$row.index]', options: {} };

  dynOnSetup(
    def: WidgetDef<ArrayOptionsDef, undefined, ArrayEventsDef, BindWidgetDef>
  ): WidgetDef<ArrayOptionsDef, undefined, ArrayEventsDef, BindWidgetDef> {
    this.bindTrackBy = i => i;
    return super.dynOnSetup(def);
  }

  dynOnAfterBind(): void {
    super.dynOnAfterBind();
    this.map('items', i => (this.itemOptions.options = i));
  }
  trackItems(i: number, val: any): number {
    console.log(i, val);
    return i;
  }
}
