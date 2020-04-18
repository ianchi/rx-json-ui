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
  selector: 'set-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'set-row set-row-flex' },
})
export class SetSliderWidgetComponent extends AbstractFormFieldWidget<SchemaOptions<SchemaNumber>> {
  toStep(val: number | undefined): number | undefined {
    return this.options.multipleOf && val
      ? Math.floor(val / this.options.multipleOf) * this.options.multipleOf
      : val;
  }
}
