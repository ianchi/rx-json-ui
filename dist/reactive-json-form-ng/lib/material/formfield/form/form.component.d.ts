/**
 * Copyright (c) 2018 Adrian Panella <ianchi74@outlook.com>
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */
import { ChangeDetectorRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AbstractWidget, IWidgetDef, Expressions } from '../../../core';
export declare class FormWidgetComponent extends AbstractWidget {
    formGroup: FormGroup;
    constructor(cdr: ChangeDetectorRef, expr: Expressions);
    dynOnSetup(def: IWidgetDef): IWidgetDef;
}
