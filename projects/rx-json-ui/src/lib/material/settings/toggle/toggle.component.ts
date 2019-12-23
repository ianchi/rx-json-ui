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

import { AbstractFormFieldWidget, Expressions, MainSlotContentDef } from '../../../core/index';

export interface SetToggleWidgetOptions {
  title: string;
  description: string;
}
@Component({
  selector: 'set-toggle',
  templateUrl: './toggle.component.html',
  styleUrls: ['./toggle.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'set-row' },
})
export class SetToggleWidgetComponent extends AbstractFormFieldWidget<
  SetToggleWidgetOptions,
  MainSlotContentDef
> {
  constructor(cdr: ChangeDetectorRef, expr: Expressions) {
    super(cdr, expr);
  }
}