/**
 * Copyright (c) 2018 Adrian Panella <ianchi74@outlook.com>
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

import { BaseWidget, MainSlotContentDef } from '../../../core';

export interface LevelWidgetOptions {
  value: number;
  total: number;
  icon: string;
  unit: string;
  title: string;
  noGraph: boolean;
  format: string;

  expanded: boolean;
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
  expanded = false;

  dynOnAfterBind(): void {
    this.map('expanded', e => (this.expanded = !!e));
  }
  toggle(): void {
    this.expanded = !this.expanded;
  }
}
