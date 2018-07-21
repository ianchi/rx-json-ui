/**
 * Copyright (c) 2018 Adrian Panella <ianchi74@outlook.com>
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */
import { ChangeDetectorRef, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Expressions, AbstractFormFieldWidget } from '../../../core/index';
export declare class AutocompleteWidgetComponent extends AbstractFormFieldWidget implements OnInit {
    title: string;
    description: string;
    placeholder: string;
    enum: string[];
    enumLabel: string[];
    filteredOptions: Observable<string[]>;
    constructor(cdr: ChangeDetectorRef, expr: Expressions);
    dynOnBeforeBind(): void;
    dynOnAfterBind(): void;
    ngOnInit(): void;
    private _filter(value);
}
