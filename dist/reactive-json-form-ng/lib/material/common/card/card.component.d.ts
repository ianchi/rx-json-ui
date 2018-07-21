/**
 * Copyright (c) 2018 Adrian Panella <ianchi74@outlook.com>
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */
import { ChangeDetectorRef } from '@angular/core';
import { AbstractWidget, IWidgetDef, Expressions } from '../../../core';
export declare class CardWidgetComponent extends AbstractWidget {
    title: string;
    description: string;
    actions: IWidgetDef[];
    constructor(cdr: ChangeDetectorRef, expr: Expressions);
}
