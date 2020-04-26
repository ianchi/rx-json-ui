/**
 * Copyright (c) 2018 Adrian Panella <ianchi74@outlook.com>
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewEncapsulation,
} from '@angular/core';

import { AbstractWidgetDef, Context } from '../../../core';

@Component({
  selector: 'set-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SetBaseComponent {
  @Input() icon: string | undefined;
  @Input() title: string | undefined;
  @Input() subtitle: string | undefined;
  @Input() description: string | undefined;
  @Input() error: string | undefined;
  @Input() value: string | undefined;

  @Input() expanded: boolean | undefined;
  @Input() noExpand: boolean | undefined;

  @Input() content: AbstractWidgetDef[] | undefined;
  @Input() context: Context | undefined;
  @Output() toggle: EventEmitter<any> = new EventEmitter();
  toggleState(): void {
    if (!this.content || this.noExpand) return;
    this.expanded = !this.expanded;
    this.toggle.emit(this.expanded);
  }
}
