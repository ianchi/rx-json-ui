/**
 * Copyright (c) 2018 Adrian Panella <ianchi74@outlook.com>
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

import { AbstractFormWidgetComponent } from '../../../core/forms/index';
import { BaseSetOption } from '../../../core/index';

export interface SetExpansionWidgetOptions extends BaseSetOption {
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
> {}
