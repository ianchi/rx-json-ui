/**
 * Copyright (c) 2018 Adrian Panella <ianchi74@outlook.com>
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */
import { ChangeDetectorRef } from '@angular/core';
import { AbstractWidget, Expressions } from '../../../core';
export declare class CodeWidgetComponent extends AbstractWidget {
    text: string;
    constructor(cdr: ChangeDetectorRef, expr: Expressions);
}
