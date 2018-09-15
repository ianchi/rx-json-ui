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
import { take } from 'rxjs/operators';

import { AbstractWidget } from './abstractwidget';
import { Context } from './context';
import { Expressions } from './expressions';
import { IWidgetDef } from './widget.interface';
import { WidgetRegistry } from './widgetregistry.service';

/** Injection token used to provide the default root context for widgets */
export const ROOT_EXPR_CONTEXT = new InjectionToken<Context>('Widgets Root Context');

@Directive({
  selector: '[wdgWidget]',
})
export class WidgetDirective implements OnChanges, OnDestroy {
  /** Object with the widget definition */
  @Input('wdgWidget')
  widgetDef: IWidgetDef = { widget: 'none' };
  @Input()
  parentContext: Context | undefined;

  /** Reference to widget class instance */
  widget: AbstractWidget<any> | undefined;
  context: Context | undefined;
  /** Reference to widget Component instance */
  private _widgetRef: ComponentRef<AbstractWidget<any>> | undefined;
  private _ifSubscription: Subscription | undefined;

  private _waitSubscription: Subscription | undefined;
  constructor(
    private _container: ViewContainerRef,
    private _registry: WidgetRegistry,
    private _cfr: ComponentFactoryResolver,
    @Optional()
    @Inject(ROOT_EXPR_CONTEXT)
    private _rootContext: Context | undefined,
    private _expr: Expressions
  ) {}

  ngOnChanges(): void {
    this._preCreate();
  }

  ngOnDestroy(): void {
    this._unsuscribe();
    this._destroyComponent();
  }

  /**
   * Initialization before creating the widget instance
   * It creates the context and validates de IF condition and observes to finish
   * the actual Component creation
   */
  private _preCreate(): void {
    this.widgetDef = this.widgetDef || { widget: 'none' };

    // reset state
    this._unsuscribe();
    this._destroyComponent();

    // Creates child context
    this.parentContext = this.parentContext || this._rootContext || new Context();
    this.context = Context.create(this.parentContext);

    // run initialization expressions
    if (this.widgetDef.onInit) this._expr.eval(this.widgetDef.onInit, this.context);
    if (this.widgetDef.waitFor)
      this._waitSubscription = this._expr
        .eval(this.widgetDef.waitFor, this.context, true)
        .pipe(take(1))
        .subscribe(() => this._checkIf());
    else this._checkIf();
  }
  private _checkIf(): void {
    // validate IF condition and listen for changes
    if (this.widgetDef.displayIf) {
      this._ifSubscription = this._expr
        .eval(this.widgetDef.displayIf, this.context!, true)
        .subscribe((result: any) => {
          if (result && !this._widgetRef) this._createComponent();
          else if (!result) this._destroyComponent();
        });
    } else this._createComponent();
  }

  private _createComponent(): void {
    if (!this.widgetDef) return;
    this._destroyComponent();
    
    const widgetClass = this._registry.get(this.widgetDef.widget);
    const factory = this._cfr.resolveComponentFactory(widgetClass);
    this._widgetRef = this._container.createComponent(factory);
    this.widget = this._widgetRef.instance;

    this.widget.setup(this, this.widgetDef, this.context);
  }

  /** Destroys the WidgetComponent instance */
  private _destroyComponent(): void {
    if (this._widgetRef) {
      this._widgetRef.destroy();
      this._widgetRef = undefined;
    }
  }

  /** Stops observig IF condition */
  private _unsuscribe(): void {
    if (this._ifSubscription) {
      this._ifSubscription.unsubscribe();
      this._ifSubscription = undefined;
    }
    if (this._waitSubscription) {
      this._waitSubscription.unsubscribe();
      this._waitSubscription = undefined;
    }
  }
}
