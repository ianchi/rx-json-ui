/**
 * Copyright (c) 2018 Adrian Panella <ianchi74@outlook.com>
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

import { BaseWidget, EmptyOptionsDef, MainSlotContentDef } from '../../../core/index';

@Component({
  selector: 'set-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss'],

  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SetPageWidgetComponent extends BaseWidget<EmptyOptionsDef, MainSlotContentDef> {}
