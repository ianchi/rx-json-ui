/**
 * Copyright (c) 2019 Adrian Panella <ianchi74@outlook.com>
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { ChangeDetectorRef } from '@angular/core';
import { ILvalue } from 'espression';
import { isReactive } from 'espression-rx';

import { BaseWidget } from '../base/abstractwidget';
import {
  CommonEventsDef,
  MainSlotContentDef,
  multilineExpr,
  WidgetDef,
} from '../base/public.interface';
import { Expressions } from '../expressions/index';

export interface FileWidgetOptions {
  title: string;
  multiple: boolean;
  disabled: boolean;
}

export type FileWidgetEvents = CommonEventsDef & {
  onAdded: multilineExpr;
};

export class FileWidgetMixin extends BaseWidget<
  FileWidgetOptions,
  MainSlotContentDef,
  FileWidgetEvents,
  true
> {
  private lvalue: ILvalue | undefined;

  /**
   * @important Needs to be overridden and decorated in derived Component class
   *
   * ```
   * @ViewChild('fileInput', { static: true }) files: File[] = [];
   * ```
   */
  fileInput: any;
  files: File[] = [];

  constructor(cdr: ChangeDetectorRef, expr: Expressions) {
    super(cdr, expr);
  }

  dynOnSetup(
    def: WidgetDef<FileWidgetOptions, MainSlotContentDef, FileWidgetEvents, true>
  ): WidgetDef<FileWidgetOptions, MainSlotContentDef, FileWidgetEvents, true> {
    if (typeof def.bind === 'string') {
      const lvalue = this.expr.lvalue(def.bind, this.context);

      if (!lvalue)
        throw new Error('Form field "bind" property must be an identifier or member expression');

      if (!isReactive(lvalue.o)) throw new Error('Bound Key must be of Reactive Type');

      this.lvalue = lvalue;
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

    // emit selection
    if (this.lvalue) this.lvalue!.o[this.lvalue!.m] = this.files;

    this.emmit('onAdded');
  }
}
