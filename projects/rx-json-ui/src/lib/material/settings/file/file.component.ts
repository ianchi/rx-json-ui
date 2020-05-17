/**
 * Copyright (c) 2018 Adrian Panella <ianchi74@outlook.com>
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { ChangeDetectionStrategy, Component, ViewChild, ViewEncapsulation } from '@angular/core';

import { BaseSetOption, FileWidgetMixin, FileWidgetOptions } from '../../../core/mixins/index';

export interface SetFileWidgetOptions extends FileWidgetOptions, BaseSetOption {
  buttonTitle: string;
}

@Component({
  selector: 'set-file',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'set-row' },
})
export class SetFileWidgetComponent extends FileWidgetMixin<SetFileWidgetOptions> {
  @ViewChild('fileInput', { static: true }) fileInput: any;
}
