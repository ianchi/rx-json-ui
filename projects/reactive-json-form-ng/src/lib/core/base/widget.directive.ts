/*
 * Copyright (c) 2019 Adrian Panella <ianchi74@outlook.com>
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import {
  ComponentFactory,
  ComponentFactoryResolver,
  ComponentRef,
  Directive,
  Inject,
  Input,
  OnChanges,
  OnDestroy,
  Optional,
  ViewContainerRef,
} from '@angular/core';
import { Observable, of, Subscription } from 'rxjs';
import { distinctUntilChanged, map, switchMap } from 'rxjs/operators';

import { Context, Expressions, ROOT_EXPR_CONTEXT } from '../expressions/index';
import { WidgetRegistry } from '../widgetregistry.service';

import { AbstractWidget } from './abstractwidget';
import {
  AbstractEventsDef,
  AbstractOptionsDef,
  AbstractWidgetDef,
  SlotedContentDef,
} from './public.interface';

/**
 * Directive to include a widget tree in a page.
 * It is mainly used with a `ng-container`:
 * ```
 * <ng-container [wdgWidget]="widgetDef" [parentContext]="context">
 * </ng-container>
 * ```
 */
@Directive({ selector: '[wdgWidget]' })
export class WidgetDirective implements OnChanges, OnDestroy {
  /** Object with the widget definition */
  @Input('wdgWidget')
  widgetDef: AbstractWidgetDef | undefined;
  @Input()
  parentContext: Context | undefined;

  private subscriptions: Subscription | undefined;
  private componentFactory: ComponentFactory<any> | undefined;
  private widgetRef:
    | Array<ComponentRef<AbstractWidget<AbstractOptionsDef, SlotedContentDef, AbstractEventsDef>>>
    | undefined;

  constructor(
    private container: ViewContainerRef,
    private registry: WidgetRegistry,
    private cfr: ComponentFactoryResolver,
    @Optional()
    @Inject(ROOT_EXPR_CONTEXT)
    private rootContext: Context | undefined,
    private expr: Expressions
  ) {}

  /**
   * Initialices the widget instantiation proces.
   * Recreates everething on each change of inputs.
   * It evaluates the `if` / `for` structural properties and creates the widgets accordingly
   */
  ngOnChanges(): void {
    let structural$: Observable<any> | undefined;
    // if we already had created a widget, destroy it
    this.unsuscribeStructural();
    this.destroyWidgets();

    // make sure we have a valid widget definition
    if (!this.widgetDef) return;
    this.validateWidgetDef();
    this.parentContext = this.parentContext || this.rootContext || new Context();

    // create the structural observable
    if (this.widgetDef.if) {
      const ifContext = Context.create(this.parentContext);
      const ifExpr = Array.isArray(this.widgetDef.if)
        ? this.widgetDef.if.join('\n')
        : this.widgetDef.if;
      structural$ = this.expr.eval(ifExpr, ifContext, true).pipe(
        map(v => !!v),
        distinctUntilChanged()
      );

      if (this.widgetDef.for) {
        // if we have an `if` and a `for` first evaluate the `if`
        // and each time it evaluates to truthy evaluate the `for`
        const forExpr = Array.isArray(this.widgetDef.for)
          ? this.widgetDef.for.join('\n')
          : this.widgetDef.for;
        structural$ = structural$.pipe(
          switchMap(val => {
            const forContext = Context.create(this.parentContext);
            return val
              ? this.expr
                  .eval(forExpr, forContext, true)
                  .pipe(map(a => (Array.isArray(a) ? a : [])))
              : of([]);
          })
        );
      }
    } else if (this.widgetDef.for) {
      const forExpr = Array.isArray(this.widgetDef.for)
        ? this.widgetDef.for.join('\n')
        : this.widgetDef.for;
      const forContext = Context.create(this.parentContext);
      structural$ = this.expr
        .eval(forExpr, forContext, true)
        .pipe(map(a => (Array.isArray(a) ? a : [])));
    }

    if (structural$) {
      this.subscriptions = structural$.subscribe(val => {
        // check if the `if` was false
        if (val === false) this.destroyWidgets();
        else this.createWidgets(val);
      });
    } else this.createWidgets(true);
  }

  createWidgets(data: true | any[]): void {
    if (!this.componentFactory || !this.widgetDef) return;

    // check if we have a `for` structure directive
    if (data === true) {
      this.widgetRef = [this.container.createComponent(this.componentFactory)];

      this.widgetRef[0].instance.setup(this.widgetDef, Context.create(this.parentContext));
    } else {
    }
  }

  ngOnDestroy(): void {
    this.unsuscribeStructural();
    this.destroyWidgets();
  }
  /** Unsuscribes from the structural properties expressions */
  unsuscribeStructural(): void {
    if (this.subscriptions) {
      this.subscriptions.unsubscribe();
      this.subscriptions = undefined;
    }
  }

  destroyWidgets(): void {
    if (!this.widgetRef) return;

    this.widgetRef.map(ref => ref.destroy());
    this.widgetRef = undefined;
  }

  /**
   * Checks the basic validity of the widget definition and that it is properly registered
   * Initialices the componentFactory
   */
  validateWidgetDef(): boolean {
    this.componentFactory = undefined;

    if (
      typeof this.widgetDef !== 'object' ||
      Array.isArray(this.widgetDef) ||
      !this.widgetDef.widget
    ) {
      this.widgetDef = undefined;
      throw new Error('Invalid widget definition, must be object with "widget" property');
    }
    const widgetClass = this.registry.get(this.widgetDef.widget);

    if (!widgetClass) {
      const type = this.widgetDef.widget;
      this.widgetDef = undefined;
      throw new Error(`Widget "${type}" is not registered`);
    }
    this.componentFactory = this.cfr.resolveComponentFactory(widgetClass);

    return true;
  }
}
