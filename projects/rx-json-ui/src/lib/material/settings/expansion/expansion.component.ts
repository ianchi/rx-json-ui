/**
 * Copyright (c) 2018 Adrian Panella <ianchi74@outlook.com>
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

import { AbstractFormWidgetComponent } from '../../../core/forms/index';
import { CommonOptionsDef } from '../../../core/index';

export interface SetExpansionWidgetOptions extends CommonOptionsDef {
  title: string;
  description: string;
  value: string;
  expanded: boolean;
  noExpand: boolean;
  icon: string;
}

@Component({
  selector: 'set-expansion',
  templateUrl: './expansion.component.html',
  styleUrls: ['./expansion.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'set-row' },
})
export class SetExpansionWidgetComponent extends AbstractFormWidgetComponent<
  SetExpansionWidgetOptions
> {
  expanded = false;

  dynOnAfterBind(): void {
    super.dynOnAfterBind();
    this.map('expanded', e => (this.expanded = !!e));
  }
  toggle(): void {
    this.expanded = !this.expanded;
  }
}
