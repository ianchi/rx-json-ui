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

import { AbstractFormWidgetComponent } from '../../../core/forms/index';
import { Expressions } from '../../../core/index';

export interface SetExpansionWidgetOptions {
  title: string;
  description: string;
  expanded: boolean;
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
  constructor(cdr: ChangeDetectorRef, expr: Expressions) {
    super(cdr, expr);
  }

  dynOnAfterBind(): void {
    this.map('expanded', e => (this.expanded = !!e));
  }
  toggle(): void {
    this.expanded = !this.expanded;
  }
}
