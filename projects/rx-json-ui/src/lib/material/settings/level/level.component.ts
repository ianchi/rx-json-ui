/**
 * Copyright (c) 2018 Adrian Panella <ianchi74@outlook.com>
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

import {
  BaseWidget,
  formatValue,
  IconOption,
  MainSlotContentDef,
  TitleOption,
} from '../../../core';

export interface LevelWidgetOptions extends IconOption, TitleOption {
  value: number;
  total: number;
  unit: string;
  format: string;

  expanded: boolean;
  noExpand: boolean;
}

@Component({
  selector: 'set-level',
  templateUrl: './level.component.html',
  styleUrls: ['./level.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'set-row' },
})
export class SetLevelWidgetComponent extends BaseWidget<LevelWidgetOptions, MainSlotContentDef> {
  getTitle(): string {
    return `${formatValue(this.options.value, this.options.format)}${
      this.options.total ? `/${formatValue(this.options.total, this.options.format)}` : ''
    }`;
  }
}
