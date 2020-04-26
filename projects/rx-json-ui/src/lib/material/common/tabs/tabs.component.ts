/*
 * Copyright (c) 2018 Adrian Panella <ianchi74@outlook.com>
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

import { BaseWidget, CommonOptionsDef, MainSlotContentDef } from '../../../core/index';

export interface TabsWidgetOptions extends CommonOptionsDef {
  /** Text to show as tabs labels */
  tabLabels: string[];
}

@Component({
  selector: 'wdg-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabsWidgetComponent extends BaseWidget<TabsWidgetOptions, MainSlotContentDef> {}
