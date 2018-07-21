/**
 * Copyright (c) 2018 Adrian Panella <ianchi74@outlook.com>
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */
import { ChangeDetectorRef } from '@angular/core';
import { Expressions, AbstractFormFieldWidget } from '../../../core/index';
export declare class InputWidgetComponent extends AbstractFormFieldWidget {
    title: string;
    description: string;
    placeholder: string;
    required: boolean;
    constructor(cdr: ChangeDetectorRef, expr: Expressions);
}
