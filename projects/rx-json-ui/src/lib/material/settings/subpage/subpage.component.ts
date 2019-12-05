/**
 * Copyright (c) 2018 Adrian Panella <ianchi74@outlook.com>
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Location } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ViewEncapsulation,
} from '@angular/core';

import { AbstractWidget, Expressions, TitleOption } from '../../../core/index';

@Component({
  selector: 'set-subpage',
  templateUrl: './subpage.component.html',
  styleUrls: ['./subpage.component.scss'],

  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SetSubpageWidgetComponent extends AbstractWidget<TitleOption> {
  constructor(cdr: ChangeDetectorRef, expr: Expressions, private location: Location) {
    super(cdr, expr);
  }

  goBack(): void {
    this.location.back();
  }
}
