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

@Component({
  selector: 'wdg-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss'],

  // tslint:disable-next-line:use-host-property-decorator
  host: {
    '[class.wdg-flex]': 'true',
    '[style.flex-direction]': 'direction',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContainerWidgetComponent extends AbstractWidget {
  direction: string;

  constructor(cdr: ChangeDetectorRef, expr: Expressions) {
    super(cdr, expr);
  }

  dynOnBeforeBind(): void {
    this.map('direction', dir => dir || 'row');
  }
}
