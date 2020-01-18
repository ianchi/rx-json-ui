/**
 * Copyright (c) 2018 Adrian Panella <ianchi74@outlook.com>
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

import {
  AbstractArrayWidgetComponent,
  MainSlotContentDef,
  TitleDescOption,
} from '../../../core/index';

@Component({
  selector: 'wdg-form-accordion',
  templateUrl: './formAccordion.component.html',
  styleUrls: ['./formAccordion.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormAccordionWidgetComponent extends AbstractArrayWidgetComponent<
  TitleDescOption,
  MainSlotContentDef
> {}
