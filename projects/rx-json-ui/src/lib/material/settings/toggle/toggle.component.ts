/**
 * Copyright (c) 2018 Adrian Panella <ianchi74@outlook.com>
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

import { AbstractFormFieldWidget, MainSlotContentDef } from '../../../core/index';
import { SchemaBoolean } from '../../../schema';

@Component({
  selector: 'set-toggle',
  templateUrl: './toggle.component.html',
  styleUrls: ['./toggle.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'set-row' },
})
export class SetToggleWidgetComponent extends AbstractFormFieldWidget<
  Partial<SchemaBoolean>,
  MainSlotContentDef
> {}
