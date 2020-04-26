/**
 * Copyright (c) 2018 Adrian Panella <ianchi74@outlook.com>
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

import { BaseWidget, CommonOptionsDef, MainSlotContentDef } from '../../../core/index';

export interface GridContainerWidgetOptions extends CommonOptionsDef {
  direction: string;
}

@Component({
  selector: 'wdg-grid-container',
  templateUrl: './gridcontainer.component.html',
  styleUrls: ['./gridcontainer.component.scss'],

  // tslint:disable-next-line:use-host-property-decorator
  host: {
    '[class.wdg-grid]': 'true',
    '[style.flex-direction]': 'options.direction',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GridContainerWidgetComponent extends BaseWidget<
  GridContainerWidgetOptions,
  MainSlotContentDef
> {
  dynOnBeforeBind(): void {
    this.map('direction', dir => dir || 'row');
  }
}
