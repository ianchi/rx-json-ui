/**
 * Copyright (c) 2018 Adrian Panella <ianchi74@outlook.com>
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Location } from '@angular/common';
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

import { AbstractFormWidgetComponent, Expressions, TitleOption } from '../../../core/index';

@Component({
  selector: 'set-subpage',
  templateUrl: './subpage.component.html',
  styleUrls: ['./subpage.component.scss'],

  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SetSubpageWidgetComponent extends AbstractFormWidgetComponent<TitleOption> {
  constructor(
    cdr: ChangeDetectorRef,
    expr: Expressions,
    iterableDiffers: IterableDiffers,
    keyValueDiffers: KeyValueDiffers,
    ngElement: ElementRef,
    renderer: Renderer2,
    private location: Location
  ) {
    super(cdr, expr, iterableDiffers, keyValueDiffers, ngElement, renderer);
  }

  goBack(): void {
    this.location.back();
  }
}
