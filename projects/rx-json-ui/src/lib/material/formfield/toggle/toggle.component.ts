/**
 * Copyright (c) 2018 Adrian Panella <ianchi74@outlook.com>
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

import { AbstractFormFieldWidget } from '../../../core/index';
import { SchemaBoolean, SchemaOptions } from '../../../schema';

@Component({
  selector: 'wdg-toggle',
  templateUrl: './toggle.component.html',
  styleUrls: ['./toggle.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToggleWidgetComponent extends AbstractFormFieldWidget<SchemaOptions<SchemaBoolean>> {}
