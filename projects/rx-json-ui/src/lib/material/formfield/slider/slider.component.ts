/**
 * Copyright (c) 2018 Adrian Panella <ianchi74@outlook.com>
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

import { AbstractFormFieldWidget } from '../../../core/index';
import { SchemaNumber, SchemaOptions } from '../../../schema';

@Component({
  selector: 'wdg-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SliderWidgetComponent extends AbstractFormFieldWidget<SchemaOptions<SchemaNumber>> {}
