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
import { MatDialog } from '@angular/material/dialog';

import { BaseWidget, Expressions, PopupSlotsDef } from '../../../core/index';
import { PopupComponent } from '../../common/popup.component';

export interface PopupWidgetOptions {
  title: string;
  description: string;
  popupTitle: string;

  click: string;
  disabled: boolean;
}

@Component({
  selector: 'set-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'set-row set-row-flex', '(click)': 'clickEvent()' },
})
export class SetPopupWidgetComponent extends BaseWidget<PopupWidgetOptions, PopupSlotsDef> {
  constructor(cdr: ChangeDetectorRef, expr: Expressions, public dialog: MatDialog) {
    super(cdr, expr);
  }

  clickEvent(): void {
    this.dialog.open(PopupComponent, {
      data: {
        content: this.content,
        title: this.options.popupTitle,
        context: this.context,
      },
    });
  }
}
