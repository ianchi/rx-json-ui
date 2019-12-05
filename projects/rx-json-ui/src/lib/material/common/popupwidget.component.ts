/**
 * Copyright (c) 2018 Adrian Panella <ianchi74@outlook.com>
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { Context } from '../../core/expressions/index';
import { PopupSlotsDef } from '../../core/index';

@Component({
  selector: 'wdg-popup',
  template: `
    <h2 mat-dialog-title *ngIf="title">{{ title }}</h2>
    <mat-dialog-content>
      <ng-container
        *ngFor="let element of content.main"
        [wdgWidget]="element"
        [parentContext]="parentContext"
      >
      </ng-container>
    </mat-dialog-content>
    <mat-dialog-actions *ngIf="content.actions">
      <ng-container
        *ngFor="let element of content.actions"
        [wdgWidget]="element"
        [parentContext]="parentContext"
      >
      </ng-container>
    </mat-dialog-actions>
  `,

  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PopupWidgetComponent implements OnInit {
  content = { main: [], actions: [] } as PopupSlotsDef;
  parentContext: Context | undefined;
  title: string | undefined;
  constructor(
    @Inject(MAT_DIALOG_DATA) public _data: any,
    public _dialogRef: MatDialogRef<PopupWidgetComponent>
  ) {}
  ngOnInit(): void {
    this.content = this._data.content || { main: { widget: 'empty' } };
    this.parentContext = Context.create(this._data.context, undefined, {
      $dlg: {
        close: (res: any) => {
          this._dialogRef.close(res);
          return true;
        },
      },
    });
    this.title = this._data.title;
  }
}
