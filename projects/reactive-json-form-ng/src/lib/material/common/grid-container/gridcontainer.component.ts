/**
 * Copyright (c) 2018 Adrian Panella <ianchi74@outlook.com>
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Component, ViewEncapsulation, ChangeDetectionStrategy, ChangeDetectorRef} from '@angular/core';
import { AbstractWidget, Expressions } from '../../../core/index';

@Component({
  selector: 'wdg-grid-container',
  templateUrl: './gridcontainer.component.html',
  styleUrls: ['./gridcontainer.component.scss'],

  // tslint:disable-next-line:use-host-property-decorator
  host: {
    '[class.wdg-grid]': 'true',
    '[style.flex-direction]': 'direction'
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GridContainerWidgetComponent extends AbstractWidget {

  direction: string;

  constructor(cdr: ChangeDetectorRef, expr: Expressions) {
    super(cdr, expr);
  }

  dynOnBeforeBind() {

    this.map('direction', dir => dir || 'row');
  }

}
