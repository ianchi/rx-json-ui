/**
 * Copyright (c) 2018 Adrian Panella <ianchi74@outlook.com>
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { ChangeDetectionStrategy, Component, ViewChild, ViewEncapsulation } from '@angular/core';

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
}
