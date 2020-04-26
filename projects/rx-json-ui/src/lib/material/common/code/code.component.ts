/**
 * Copyright (c) 2018 Adrian Panella <ianchi74@outlook.com>
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

import { BaseWidget, CommonOptionsDef } from '../../../core/index';

export interface CodeWidgetOptions extends CommonOptionsDef {
  text: string;
}

@Component({
  selector: 'wdg-code',
  templateUrl: './code.component.html',
  styleUrls: ['./code.component.scss'],

  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CodeWidgetComponent extends BaseWidget<CodeWidgetOptions> {}
