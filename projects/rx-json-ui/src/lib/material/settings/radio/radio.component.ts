/**
 * Copyright (c) 2018 Adrian Panella <ianchi74@outlook.com>
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

import { SelectWidgetMixin, SelectWidgetOptions } from '../../../core/index';

@Component({
  selector: 'set-radio',
  templateUrl: './radio.component.html',
  styleUrls: ['./radio.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'set-row' },
})
export class SetRadioWidgetComponent extends SelectWidgetMixin<SelectWidgetOptions> {}
