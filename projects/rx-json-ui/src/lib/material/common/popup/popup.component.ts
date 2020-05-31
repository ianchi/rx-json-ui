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
import { FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RxObject } from 'espression-rx';

import { Context } from '../../../core/expressions/index';
import { FORM_CONTROL } from '../../../core/forms/baseformcontrol';
import { FieldControl, PopupSlotsDef } from '../../../core/index';

@Component({
  selector: 'wdg-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss'],

  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
// tslint:disable-next-line: component-class-suffix
export class PopupComponent implements OnInit {
  content = { main: [], actions: [] } as PopupSlotsDef;
  parentContext: Context | undefined;
  title: string | undefined;
  constructor(
    @Inject(MAT_DIALOG_DATA) public _data: any,
    public _dialogRef: MatDialogRef<PopupComponent>
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
      $parent: this._data.context,
      // create a base form to be able to bind
      $: RxObject({}, true),
      [FORM_CONTROL]: new FieldControl(new FormGroup({})),
    });
    this.title = this._data.title;
  }
}
