/**
 * Copyright (c) 2018 Adrian Panella <ianchi74@outlook.com>
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */
import { OnDestroy, ChangeDetectorRef, OnChanges, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { IWidgetDef } from './widget.interface';
import { WidgetDirective } from './widget.directive';
import { Context } from './context';
import { Expressions } from './expressions';
export interface IOptionDef {
    [prop: string]: any;
}
/**
 * Base class for all dynamic widget elements
 */
export declare abstract class AbstractWidget implements OnDestroy, OnChanges, OnInit {
    protected _cdr: ChangeDetectorRef;
    protected _expr: Expressions;
    /** Configuration of the widget */
    widgetDef: IWidgetDef;
    context: Context;
    /** String identifing the 'type' of the widget */
    type: string;
    /** Context to use for evaluations at this level */
    /** Widget specific options all converted to observables, to unify between *expression* and
     * *constant* notation in the properties definition.
     * Each binding then auto updates the corresponding property in the derived widget.
     */
    bindings: {
        [prop: string]: Observable<any>;
    };
    /** The input configuration of this object */
    content: IWidgetDef[];
    element: WidgetDirective;
    addSubscription: Subscription;
    private _subscriptions;
    constructor(_cdr: ChangeDetectorRef, _expr: Expressions);
    /** Initialices the widget from a json definition */
    setup(element: WidgetDirective, def: IWidgetDef, context: Context): void;
    /**
     * Helper function to add a `map` pipe to the corresponding input observable
     */
    map(option: string, callback: (v: any) => any): void;
    /**
     * Hook to customize the observable bindings befor subscribing.
     * Tipically using the `this.map()` function to add processing to specific options
     */
    dynOnBeforeBind(): void;
    dynOnAfterBind(): void;
    /** Hook to customize widget definition before procesing it */
    dynOnSetup(def: IWidgetDef): IWidgetDef;
    subscribeOptions(): void;
    ngOnDestroy(): void;
    /**
     * OnChanges is never called on dynamic widget instantiation
     * It is intended to provide the same interface is the widget is used declarative in a template
     * instead of dynamically
     */
    ngOnChanges(): void;
    ngOnInit(): void;
    private _unsubscribe();
}
export declare function parseDefObject(objDef: IOptionDef, context: Context, asObservable: boolean, expr: Expressions): IOptionDef;
