/**
 * Copyright (c) 2018 Adrian Panella <ianchi74@outlook.com>
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

import { BaseWidget } from './base/abstractwidget';
import { CommonOptionsDef } from './base/public.interface';

@Component({
  selector: 'wdg-default',
  template: '<div>Unknown widget "{{ widgetDef?.widget }}"</div>',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DefaultWidgetComponent extends BaseWidget<CommonOptionsDef> {}
