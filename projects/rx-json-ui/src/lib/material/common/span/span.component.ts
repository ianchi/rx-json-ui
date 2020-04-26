/**
 * Copyright (c) 2018 Adrian Panella <ianchi74@outlook.com>
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

import { BaseWidget, TextOption } from '../../../core/index';

@Component({
  selector: 'wdg-span',
  templateUrl: './span.component.html',
  styleUrls: ['./span.component.scss'],

  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpanWidgetComponent extends BaseWidget<TextOption> {}
