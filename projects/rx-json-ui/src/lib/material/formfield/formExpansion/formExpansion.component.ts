/**
 * Copyright (c) 2018 Adrian Panella <ianchi74@outlook.com>
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

import { AbstractFormWidgetComponent } from '../../../core/forms/index';
import { TitleDescOption } from '../../../core/index';

@Component({
  selector: 'wdg-form-expansion',
  templateUrl: './formExpansion.component.html',
  styleUrls: ['./formExpansion.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormExpansionWidgetComponent extends AbstractFormWidgetComponent<TitleDescOption> {}
