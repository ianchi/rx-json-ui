/**
 * Copyright (c) 2018 Adrian Panella <ianchi74@outlook.com>
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Component, ViewEncapsulation, ChangeDetectionStrategy, ChangeDetectorRef} from '@angular/core';
import { AbstractWidget, Expressions } from '../../../core';

@Component({
    selector: 'wdg-code',
    templateUrl: './code.component.html',
    styleUrls: ['./code.component.scss'],

    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CodeWidgetComponent extends AbstractWidget {

    text: string;

    constructor(cdr: ChangeDetectorRef, expr: Expressions) {
        super(cdr, expr);
    }

}
