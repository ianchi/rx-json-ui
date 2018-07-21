/**
 * Copyright (c) 2018 Adrian Panella <ianchi74@outlook.com>
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */
import { ChangeDetectorRef } from '@angular/core';
import { AbstractWidget, Expressions, IWidgetDef } from '../../../core/index';
export declare class ButtonWidgetComponent extends AbstractWidget {
    title: string;
    click: string;
    private _lvalue;
    private _clickSubs;
    constructor(cdr: ChangeDetectorRef, expr: Expressions);
    dynOnSetup(def: IWidgetDef): IWidgetDef;
    clickEvent(_event: any): void;
}
