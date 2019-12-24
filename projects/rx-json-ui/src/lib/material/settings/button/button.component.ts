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

import { BaseWidget, ButtonWidgetEvents, Expressions } from '../../../core/index';

export interface SetButtonWidgetOptions {
  title: string;
  description: string;
  buttonTitle: string;

  spinner: boolean;
  disabled: boolean;
}

@Component({
  selector: 'set-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'set-row set-row-flex' },
})
export class SetButtonWidgetComponent extends BaseWidget<
  SetButtonWidgetOptions,
  undefined,
  ButtonWidgetEvents
> {
  running = false;
  constructor(cdr: ChangeDetectorRef, expr: Expressions) {
    super(cdr, expr);
  }

  clickEvent(): void {
    this.running = true;
    this.emmit('onClick', {}, () => (this.running = false));
  }
}
