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
  ElementRef,
  IterableDiffers,
  KeyValueDiffers,
  Renderer2,
  ViewEncapsulation,
} from '@angular/core';
import { Router } from '@angular/router';

import {
  BaseWidget,
  ButtonWidgetEvents,
  CommonOptionsDef,
  Expressions,
  MainSlotContentDef,
} from '../../../core/index';

export interface SetLinkWidgetOptions extends CommonOptionsDef {
  title: string;
  description: string;
  link: string;
}

@Component({
  selector: 'set-link',
  templateUrl: './link.component.html',
  styleUrls: ['./link.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'set-row set-row-flex', '(click)': 'clickEvent()' },
})
export class SetLinkWidgetComponent extends BaseWidget<
  SetLinkWidgetOptions,
  MainSlotContentDef,
  ButtonWidgetEvents
> {
  constructor(
    cdr: ChangeDetectorRef,
    expr: Expressions,
    iterableDiffers: IterableDiffers,
    keyValueDiffers: KeyValueDiffers,
    ngElement: ElementRef,
    renderer: Renderer2,
    public router: Router
  ) {
    super(cdr, expr, iterableDiffers, keyValueDiffers, ngElement, renderer);
  }
  clickEvent(): void {
    this.emmit('onClick');
    this.router.navigate([this.options.link], {
      state: { widgetDef: this.content && this.content.main && this.content.main[0] },
    });
  }
}
