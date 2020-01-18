/**
 * Copyright (c) 2018 Adrian Panella <ianchi74@outlook.com>
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

import {
  AbstractArrayWidgetComponent,
  EmptyOptionsDef,
  MainSlotContentDef,
} from '../../../core/index';

@Component({
  selector: 'set-row-array',
  templateUrl: './rowArray.component.html',
  styleUrls: ['./rowArray.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'set-row' },
})
export class SetRowArrayWidgetComponent extends AbstractArrayWidgetComponent<
  EmptyOptionsDef,
  MainSlotContentDef
> {}
