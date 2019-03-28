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

import { Context } from '../../core/context';
import { IWidgetDef } from '../../core/widget.interface';

@Component({
  selector: 'wdg-popup',
  template: `
    <h2 mat-dialog-title *ngIf="title">{{ title }}</h2>
    <mat-dialog-content>
      <ng-container
        *ngFor="let element of content"
        [wdgWidget]="element"
        [parentContext]="parentContext"
      >
      </ng-container>
    </mat-dialog-content>
    <mat-dialog-actions>
      <button mat-button mat-dialog-close>No</button>
      <!-- The mat-dialog-close directive optionally accepts a value as a result for the dialog. -->
      <button mat-button [mat-dialog-close]="true">Yes</button>
    </mat-dialog-actions>
  `,

  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PopupWidgetComponent implements OnInit {
  content: [IWidgetDef] | undefined;
  parentContext: Context | undefined;
  title: string | undefined;
  constructor(
    @Inject(MAT_DIALOG_DATA) public _data: any,
    public _dialogRef: MatDialogRef<PopupWidgetComponent>
  ) {}
  ngOnInit(): void {
    this.content = this._data.content || { widget: 'empty' };
    this.parentContext = this._data.context;
    this.title = this._data.title;
  }
}
