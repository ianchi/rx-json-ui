/**
 * Copyright (c) 2018 Adrian Panella <ianchi74@outlook.com>
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { RxObject } from 'espression-rx';

import {
  AbstractArrayWidgetComponent,
  AbstractWidgetDef,
  ArrayEventsDef,
  ArrayOptionsDef,
  BindWidgetDef,
  Context,
  MainSlotContentDef,
  WidgetDef,
  WidgetDirective,
} from '../../../core/index';

@Component({
  selector: 'set-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'set-row' },
})
export class SetListWidgetComponent
  extends AbstractArrayWidgetComponent<ArrayOptionsDef, MainSlotContentDef>
  implements AfterViewInit {
  itemOptions: AbstractWidgetDef = { widget: 'input', bind: '$row.array[$row.index]', options: {} };
  newItemOptions: AbstractWidgetDef = { widget: 'input', bind: '$newItem.value', options: {} };

  newItemContext: Context | undefined;
  newItemControl: FormControl | undefined;
  @ViewChild('newItem', { read: WidgetDirective }) newItem!: WidgetDirective;

  ngAfterViewInit(): void {
    const widgets = this.newItem.getWidgets();
    if (widgets.length && 'formControl' in widgets[0])
      this.newItemControl = (widgets[0] as any).formControl;
  }
  dynOnSetup(
    def: WidgetDef<ArrayOptionsDef, MainSlotContentDef, ArrayEventsDef, BindWidgetDef>
  ): WidgetDef<ArrayOptionsDef, MainSlotContentDef, ArrayEventsDef, BindWidgetDef> {
    this.bindTrackBy = (i) => i;

    const ret = super.dynOnSetup(def);
    this.newItemContext = Context.create(this.context, { $newItem: RxObject({}) });
    return ret;
  }

  dynOnContentChange(): void {
    super.dynOnContentChange();

    if (this.content?.main.length) {
      this.itemOptions = this.content.main[0] as AbstractWidgetDef;
      this.newItemOptions = { ...this.itemOptions };
      this.newItemOptions.bind = '$newItem.value';
    }
  }

  dynOnAfterBind(): void {
    super.dynOnAfterBind();
    this.map('items', (i) => (this.itemOptions.options = i));
  }

  addNewItem(): void {
    if (
      !this.newItemControl ||
      this.newItemControl!.invalid ||
      !this.newItemContext ||
      this.newItemContext.$newItem.value === undefined ||
      !this.boundData
    )
      return;
    const newRow = this.newItemContext.$newItem.value;
    if (typeof newRow !== 'undefined') this.boundData.push(newRow);
    if (this.newItemControl) this.newItemControl.reset();
  }
}
