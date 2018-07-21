/**
 * Copyright (c) 2018 Adrian Panella <ianchi74@outlook.com>
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */
import { FormControl } from '@angular/forms';
import { ChangeDetectorRef } from '@angular/core';
import { INode } from 'espression';
import { AbstractWidget } from './abstractwidget';
import { Context } from './context';
import { Expressions } from './expressions';
import { IWidgetDef } from './widget.interface';
export declare const FORM_CONTROL: unique symbol;
export declare class AbstractFormFieldWidget extends AbstractWidget {
    formControl: FormControl;
    validate: INode;
    validateContext: Context;
    constructor(cdr: ChangeDetectorRef, expr: Expressions);
    dynOnSetup(def: IWidgetDef): IWidgetDef;
}
