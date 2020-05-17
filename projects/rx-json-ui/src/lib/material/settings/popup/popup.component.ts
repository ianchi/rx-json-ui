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
import { MatDialog } from '@angular/material/dialog';
import { tap } from 'rxjs/operators';

import {
  BaseSetOption,
  BaseWidget,
  CommonEventsDef,
  Expressions,
  PopupSlotsDef,
} from '../../../core/index';
import { PopupComponent } from '../../common/popup/popup.component';

export interface PopupWidgetOptions extends BaseSetOption {
  popupTitle: string;

  disabled: boolean;
}

export interface PopupWidgetEventsDef extends CommonEventsDef {
  onOpen?: string;

  /**
   * Fired after the popup has been closed.
   * Receives `$result` in the context with the exit result passed to `$dlg.close(result)`
   */
  onClose?: string;
}

@Component({
  selector: 'set-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'set-row' },
})
export class SetPopupWidgetComponent extends BaseWidget<
  PopupWidgetOptions,
  PopupSlotsDef,
  PopupWidgetEventsDef
> {
  constructor(
    cdr: ChangeDetectorRef,
    expr: Expressions,
    iterableDiffers: IterableDiffers,
    keyValueDiffers: KeyValueDiffers,
    ngElement: ElementRef,
    renderer: Renderer2,
    public dialog: MatDialog
  ) {
    super(cdr, expr, iterableDiffers, keyValueDiffers, ngElement, renderer);
  }

  openPopup(): void {
    this.emit('onOpen');
    const dialogRef = this.dialog.open(PopupComponent, {
      data: {
        content: this.content,
        title: this.options.popupTitle,
        context: this.context,
      },

      maxHeight: '100vh',
      maxWidth: '100vw',
      panelClass: 'wdg-popup-panel',
    });
    dialogRef.afterClosed().pipe(
      tap(($result: any) => {
        this.emit('onClose', { $result });
      })
    );
  }
}
