/**
 * Copyright (c) 2018 Adrian Panella <ianchi74@outlook.com>
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

import { BaseWidget, MainSlotContentDef } from '../../../core/index';

export interface ContainerWidgetOptions {
  direction: string;
}

@Component({
  selector: 'wdg-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss'],

  // tslint:disable-next-line:use-host-property-decorator
  host: {
    '[class.wdg-flex]': 'true',
    '[style.flex-direction]': 'options.direction',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContainerWidgetComponent extends BaseWidget<
  ContainerWidgetOptions,
  MainSlotContentDef
> {
  dynOnBeforeBind(): void {
    this.map('direction', dir => dir || 'row');
  }
}
