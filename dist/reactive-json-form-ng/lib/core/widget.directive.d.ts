import { ViewContainerRef, ComponentFactoryResolver, OnChanges, OnDestroy, InjectionToken } from '@angular/core';
import { WidgetRegistry } from './widgetregistry.service';
import { AbstractWidget } from './abstractwidget';
import { IWidgetDef } from './widget.interface';
import { Context } from './context';
import { Expressions } from './expressions';
/** Injection token used to provide the default root context for widgets */
export declare const ROOT_CONTEXT: InjectionToken<Context>;
export declare class WidgetDirective implements OnChanges, OnDestroy {
    private _container;
    private _registry;
    private _cfr;
    private _rootContext;
    private _expr;
    wdgWidget: IWidgetDef;
    parentContext: Context;
    widget: AbstractWidget;
    context: Context;
    private _widgetRef;
    private _ifSubs;
    constructor(_container: ViewContainerRef, _registry: WidgetRegistry, _cfr: ComponentFactoryResolver, _rootContext: Context, _expr: Expressions);
    ngOnChanges(): void;
    ngOnDestroy(): void;
    private _preCreate();
    private _create();
    private _destroy();
    private _unsuscribe();
}
