/**
 * Copyright (c) 2018 Adrian Panella <ianchi74@outlook.com>
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ViewEncapsulation,
} from '@angular/core';

import {
  AbstractWidget,
  Expressions,
  SimpleContentDef,
  SlotedContentDef,
} from '../../../core/index';

export interface CardWidgetOptions {
  title: string;
  description: string;
}

export interface CardWidgetSlots extends SlotedContentDef {
  actions: SimpleContentDef;
}
@Component({
  selector: 'wdg-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardWidgetComponent extends AbstractWidget<CardWidgetOptions, CardWidgetSlots> {
  constructor(cdr: ChangeDetectorRef, expr: Expressions) {
    super(cdr, expr);
  }
}
