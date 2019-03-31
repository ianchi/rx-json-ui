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

import { AbstractWidget, Expressions } from '../../../core/index';
import { PopupWidgetComponent } from '../../common/popupwidget.component';

export interface ISetPopupWidgetOptions {
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
export class SetPopupWidgetComponent extends AbstractWidget<ISetPopupWidgetOptions> {
  constructor(cdr: ChangeDetectorRef, expr: Expressions, public dialog: MatDialog) {
    super(cdr, expr);
  }

  clickEvent(): void {
    this.dialog.open(PopupWidgetComponent, {
      data: { content: this.content, title: this.options.popupTitle, context: this.context },
    });
  }
}
