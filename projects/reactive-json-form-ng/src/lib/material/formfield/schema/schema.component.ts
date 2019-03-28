/*!
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
import { buildUI, ISchema } from '../../../schema';

export interface ISchemaWidgetDef {
  schema: ISchema;
  bind: string;
}

@Component({
  selector: 'wdg-schema-form',
  templateUrl: './schema.component.html',
  styleUrls: ['./schema.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SchemaWidgetComponent extends AbstractWidget<ISchemaWidgetDef> {
  constructor(cdr: ChangeDetectorRef, expr: Expressions) {
    super(cdr, expr);
  }
  dynOnChange(): void {
    this.content = [buildUI(this.options.schema, this.options.bind)];
  }
}
