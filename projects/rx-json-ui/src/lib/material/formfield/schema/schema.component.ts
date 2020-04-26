/*!
 * Copyright (c) 2018 Adrian Panella <ianchi74@outlook.com>
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

import { BaseWidget, CommonOptionsDef, MainSlotContentDef } from '../../../core/index';
import { buildUI, Schema } from '../../../schema';

export interface SchemaWidgetOptions extends CommonOptionsDef {
  schema: Schema;
  bind: string;
}

@Component({
  selector: 'wdg-schema-form',
  templateUrl: './schema.component.html',
  styleUrls: ['./schema.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SchemaWidgetComponent extends BaseWidget<SchemaWidgetOptions, undefined> {
  resolvedContent: MainSlotContentDef = { main: [] };

  dynOnChange(): void {
    this.resolvedContent = { main: [buildUI(this.options.schema, this.options.bind)] };
  }
}
