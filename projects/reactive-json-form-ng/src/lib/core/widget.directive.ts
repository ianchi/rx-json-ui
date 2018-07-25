/*
 * Copyright (c) 2018 Adrian Panella <ianchi74@outlook.com>
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import {
  ComponentFactoryResolver,
  ComponentRef,
  Directive,
  Inject,
  InjectionToken,
  Input,
  OnChanges,
  OnDestroy,
  Optional,
  ViewContainerRef,
} from '@angular/core';
import { Subscription } from 'rxjs';

import { AbstractWidget, parseDefObject } from './abstractwidget';
import { Context } from './context';
import { Expressions } from './expressions';
import { IWidgetDef } from './widget.interface';
import { WidgetRegistry } from './widgetregistry.service';

/** Injection token used to provide the default root context for widgets */
export const ROOT_CONTEXT = new InjectionToken<Context>('Widgets Root Context');

@Directive({
  selector: '[wdgWidget]',
})
export class WidgetDirective implements OnChanges, OnDestroy {
  @Input() wdgWidget: IWidgetDef;
  @Input() parentContext: Context;

  widget: AbstractWidget;
  context: Context;
  private _widgetRef: ComponentRef<AbstractWidget> | undefined;
  private _ifSubs: Subscription | undefined;

  constructor(
    private _container: ViewContainerRef,
    private _registry: WidgetRegistry,
    private _cfr: ComponentFactoryResolver,
    @Optional()
    @Inject(ROOT_CONTEXT)
    private _rootContext: Context,
    private _expr: Expressions
  ) {}

  ngOnChanges(): void {
    this._preCreate();
  }

  ngOnDestroy(): void {
    this._destroy();
    this._unsuscribe();
  }

  private _preCreate(): void {
    this.wdgWidget = this.wdgWidget || { type: 'none' };
    this.parentContext = this.parentContext || this._rootContext;
    this.context = Context.create(
      this.parentContext,
      parseDefObject(this.wdgWidget.context, this.parentContext, false, this._expr)
    );

    this._destroy();
    this._unsuscribe();

    if (this.wdgWidget.if) {
      this._ifSubs = this._expr
        .eval(this.wdgWidget.if, this.context, true)
        .subscribe((cond: any) => {
          if (cond && !this._widgetRef) this._create();
          else this._destroy();
        });
    } else this._create();
  }

  private _create(): void {
    const widgetClass = this._registry.get(this.wdgWidget.type);
    const factory = this._cfr.resolveComponentFactory(widgetClass);
    this._widgetRef = this._container.createComponent(factory);
    this.widget = this._widgetRef.instance;

    this.widget.setup(this, this.wdgWidget, this.context);
  }

  private _destroy(): void {
    if (this._widgetRef) {
      this._widgetRef.destroy();
      this._widgetRef = undefined;
    }
  }

  private _unsuscribe(): void {
    if (this._ifSubs) {
      this._ifSubs.unsubscribe();
      this._ifSubs = undefined;
    }
  }
}
