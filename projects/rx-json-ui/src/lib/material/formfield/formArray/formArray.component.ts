/**
 * Copyright (c) 2018 Adrian Panella <ianchi74@outlook.com>
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

import { AbstractArrayWidgetComponent, MainSlotContentDef } from '../../../core/index';
import { SchemaArray } from '../../../schema';

@Component({
  selector: 'wdg-form-array',
  templateUrl: './formArray.component.html',
  styleUrls: ['./formArray.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormArrayWidgetComponent extends AbstractArrayWidgetComponent<
  SchemaArray,
  MainSlotContentDef
> {}
