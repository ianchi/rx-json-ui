/**
 * Copyright (c) 2018 Adrian Panella <ianchi74@outlook.com>
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */
import { OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IWidgetDef } from './widget.interface';
import { Context } from './context';
export declare class RoutedWidgetComponent implements OnInit {
    private _route;
    widgetDef: IWidgetDef;
    parentContext: Context;
    constructor(_route: ActivatedRoute);
    ngOnInit(): void;
}
