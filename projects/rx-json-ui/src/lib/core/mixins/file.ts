/*!
 * Copyright (c) 2020 Adrian Panella <ianchi74@outlook.com>
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Directive } from '@angular/core';
import { ILvalue } from 'espression';
import { isReactive } from 'espression-rx';

import { BaseWidget } from '../base/abstractwidget';
import {
  CommonEventsDef,
  CommonOptionsDef,
  multilineExpr,
  OptBindWidgetDef,
  WidgetDef,
} from '../base/public.interface';

export interface FileWidgetOptions extends CommonOptionsDef {
  title: string;
  multiple: boolean;
  disabled: boolean;
}

export interface FileWidgetEvents extends CommonEventsDef {
  /**
   * Emitted when files have been read (and optional bound element updated).
   * Exports `$files` with an array of selected files.
   */
  onAdded: multilineExpr;
}

@Directive()
// tslint:disable-next-line: directive-class-suffix
export class FileWidgetMixin extends BaseWidget<
  FileWidgetOptions,
  undefined,
  FileWidgetEvents,
  OptBindWidgetDef
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

  dynOnSetup(
    def: WidgetDef<FileWidgetOptions, undefined, FileWidgetEvents, OptBindWidgetDef>
  ): WidgetDef<FileWidgetOptions, undefined, FileWidgetEvents, OptBindWidgetDef> {
    if (typeof def.bind === 'string') {
      const lvalue = this.expr.lvalue(def.bind, this.context);

      if (!lvalue)
        throw new Error('Form field "bind" property must be an identifier or member expression');

      if (!isReactive(lvalue.o)) throw new Error('Bound Key must be of Reactive Type');

      this.lvalue = lvalue;
    } else throw new Error('Missing "bind" property');

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

    this.emit('onAdded', { $files: this.files });
  }
}
