/**
 * Copyright (c) 2018 Adrian Panella <ianchi74@outlook.com>
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

import {
  BaseWidget,
  MainSlotContentDef,
  SimpleContentDef,
  TitleDescOption,
} from '../../../core/index';

interface CardWidgetSlots extends MainSlotContentDef {
  /** Content for the *actions* section of the card */
  actions: SimpleContentDef;
}

@Component({
  selector: 'wdg-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardWidgetComponent extends BaseWidget<TitleDescOption, CardWidgetSlots> {}
