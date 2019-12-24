/**
 * Copyright (c) 2018 Adrian Panella <ianchi74@outlook.com>
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ViewEncapsulation,
} from '@angular/core';

import { AbstractWidget, Expressions } from '../../../core/index';

export interface GridContainerWidgetOptions {
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
export class GridContainerWidgetComponent extends AbstractWidget<GridContainerWidgetOptions> {
  constructor(cdr: ChangeDetectorRef, expr: Expressions) {
    super(cdr, expr);
  }

  dynOnBeforeBind(): void {
    this.map('direction', dir => dir || 'row');
  }
}
