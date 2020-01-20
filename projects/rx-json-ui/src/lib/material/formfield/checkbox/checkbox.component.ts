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
  selector: 'wdg-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckboxWidgetComponent extends AbstractFormFieldWidget<
  SchemaOptions<SchemaBoolean>
> {}
