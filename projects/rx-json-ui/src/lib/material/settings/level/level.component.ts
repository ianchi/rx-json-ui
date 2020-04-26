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

import { BaseWidget, CommonOptionsDef, Expressions, MainSlotContentDef } from '../../../core';

export interface LevelWidgetOptions extends CommonOptionsDef {
  value: number;
  total: number;
  icon: string;
  unit: string;
  title: string;
  noGraph: boolean;
  format: string;

  expanded: boolean;
  noExpand: boolean;
  link: string;
}

@Component({
  selector: 'set-level',
  templateUrl: './level.component.html',
  styleUrls: ['./level.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'set-row' },
})
export class SetLevelWidgetComponent extends BaseWidget<LevelWidgetOptions, MainSlotContentDef> {
  expanded = false;

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
  dynOnAfterBind(): void {
    this.map('expanded', e => (this.expanded = !!e));
  }
  toggle(): void {
    if (!this.options.link) this.expanded = !this.expanded;
    else
      this.router.navigate([this.options.link], {
        state: { widgetDef: this.content && this.content.main && this.content.main[0] },
      });
  }
}
