/**
 * Copyright (c) 2018 Adrian Panella <ianchi74@outlook.com>
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */
import { ChangeDetectorRef } from '@angular/core';
import { AbstractWidget } from './abstractwidget';
import { Expressions } from './expressions';
export declare class DefaultWidgetComponent extends AbstractWidget {
    constructor(cdr: ChangeDetectorRef, expr: Expressions);
}
