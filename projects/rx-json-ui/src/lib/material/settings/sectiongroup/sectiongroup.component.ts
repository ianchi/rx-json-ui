/**
 * Copyright (c) 2018 Adrian Panella <ianchi74@outlook.com>
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';

import { BaseWidget, MainSlotContentDef, TitleOption } from '../../../core/index';

@Component({
  selector: 'set-sectiongroup',
  templateUrl: './sectiongroup.component.html',
  styleUrls: ['./sectiongroup.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SetSectionGroupWidgetComponent extends BaseWidget<TitleOption, MainSlotContentDef> {
  @ViewChild('contentRef') contentRef: ElementRef | undefined;
  expanded = false;
  toggle(): void {
    this.expanded = !this.expanded;

    if (this.expanded)
      setTimeout(
        () =>
          this.contentRef?.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' }),
        250
      );
  }
}
