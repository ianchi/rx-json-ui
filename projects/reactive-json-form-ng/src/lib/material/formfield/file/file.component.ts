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
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { ILvalue } from 'espression';
import { isReactive } from 'espression-rx';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';

import {
  AbstractWidget,
  Expressions,
  IFieldWidgetDef,
  IWidgetDef,
} from '../../../core/index';

export interface IFileWidgetOptions {
  title: string;
  onAdded: string;
  multiple: boolean;
  disabled: boolean;
}
@Component({
  selector: 'wdg-file',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FileWidgetComponent extends AbstractWidget<IFileWidgetOptions> {
  private _lvalue: ILvalue | undefined;
  private _onAddedSubs: Subscription | undefined;

  @ViewChild('fileInput', { static: true }) fileInput: any;
  files: File[] = [];

  constructor(cdr: ChangeDetectorRef, expr: Expressions) {
    super(cdr, expr);
  }

  dynOnSetup(def: IFieldWidgetDef): IWidgetDef {
    if (def.bind) {
      const lvalue = this._expr.lvalue(def.bind, this.context);

      if (!lvalue)
        throw new Error(
          'Form field "bind" property must be an identifier or member expression'
        );

      if (!isReactive(lvalue.o)) throw new Error('Bound Key must be of Reactive Type');

      this._lvalue = lvalue;
    }

    return def;
  }

  selectFiles(): void {
    this.fileInput.nativeElement.click();
  }

  onFilesAdded(): void {
    const files: FileList = this.fileInput.nativeElement.files;

    this.files = [];
    for (let i = 0; i < files.length; i++) {
      this.files.push(files[i]);
    }

    // emmit selection
    if (this._lvalue) this._lvalue!.o[this._lvalue!.m] = this.files;

    if (this._onAddedSubs) {
      this._onAddedSubs.unsubscribe();
      this._onAddedSubs = undefined;
    }

    if (this.options.onAdded) {
      this._onAddedSubs = this._expr
        .eval(this.options.onAdded, this.context, true)
        .pipe(take(1))
        .subscribe();
    }
  }
}
