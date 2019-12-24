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

import { Expressions } from '../../../core/index';
import { FileWidgetMixin } from '../../../core/mixins/index';

@Component({
  selector: 'wdg-file',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FileWidgetComponent extends FileWidgetMixin {
  @ViewChild('fileInput', { static: true }) fileInput: any;

  constructor(cdr: ChangeDetectorRef, expr: Expressions) {
    super(cdr, expr);
  }
}
