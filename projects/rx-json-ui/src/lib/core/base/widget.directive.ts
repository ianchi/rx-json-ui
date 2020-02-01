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
  IterableChangeRecord,
  IterableChanges,
  IterableDiffer,
  IterableDiffers,
  OnChanges,
  OnDestroy,
  Optional,
  TrackByFunction,
  ViewContainerRef,
} from '@angular/core';
import { Observable, of, Subscription } from 'rxjs';
import { distinctUntilChanged, map, switchMap } from 'rxjs/operators';

import { Context, Expressions, ROOT_EXPR_CONTEXT } from '../expressions/index';
import { WidgetRegistry } from '../widgetregistry.service';

import { AbstractWidget } from './abstractwidget';
import { AbstractWidgetDef } from './public.interface';

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
  structuralContext: Context | undefined;
  private subscriptions: Subscription | undefined;
  private componentFactory: ComponentFactory<AbstractWidget> | undefined;
  private widgetRef: Array<ComponentRef<AbstractWidget>> = [];

  private forDiffer: IterableDiffer<any> | undefined;
  private forTrackBy: TrackByFunction<any> | undefined;
  private forArray: any[] | undefined;

  constructor(
    private container: ViewContainerRef,
    private registry: WidgetRegistry,
    private cfr: ComponentFactoryResolver,
    @Optional()
    @Inject(ROOT_EXPR_CONTEXT)
    private rootContext: Context | undefined,
    private expr: Expressions,
    private differs: IterableDiffers
  ) {}

  /**
   * Initializes the widget instantiation process.
   * Recreates everything on each change of inputs.
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
    this.structuralContext = Context.create(this.parentContext);

    // create the structural observable
    if (this.widgetDef.if) {
      const ifExpr = Array.isArray(this.widgetDef.if)
        ? this.widgetDef.if.join('\n')
        : this.widgetDef.if;
      structural$ = this.expr.eval(ifExpr, this.structuralContext, true).pipe(
        map(v => !!v),
        distinctUntilChanged()
      );
    } else structural$ = of(true);

    if (this.widgetDef.for) {
      // if we have an `if` and a `for` first evaluate the `if`
      // and each time it evaluates to truthy evaluate the `for`
      const forExpr = Array.isArray(this.widgetDef.for)
        ? this.widgetDef.for.join('\n')
        : this.widgetDef.for;
      structural$ = structural$.pipe(
        switchMap(val => {
          return val
            ? this.expr
                .eval(forExpr, this.structuralContext!, true)
                .pipe(map(a => (Array.isArray(a) ? a : [])))
            : of([]);
        })
      );
    }

    this.subscriptions = structural$.subscribe(val => {
      // check if the `if` was false
      if (val === false) this.destroyWidgets();
      else this.createWidgets(val);
    });
  }

  createWidgets(data: true | any[]): void {
    if (!this.componentFactory || !this.widgetDef) return;

    // check if we have a `for` structure directive
    if (data === true) {
      this.widgetRef = [this.container.createComponent(this.componentFactory)];

      this.widgetRef[0].instance.setup(
        this.widgetDef,
        Context.create(this.structuralContext, undefined, { $parent: this.parentContext })
      );
    } else {
      this.setFor(data);
    }
  }

  createForWidget(data: any, index: number | null): ComponentRef<AbstractWidget> {
    if (!this.componentFactory || !this.widgetDef || index === null)
      throw new Error('Invalid widget definition');

    // expose a read-only `$for` reactive property with the `item` and the `index`
    const context = Context.create(this.structuralContext, undefined, {
      $parent: this.parentContext,
      $for: { data, index, array: this.forArray },
    });

    const widgetRef = this.container.createComponent(this.componentFactory, index);
    widgetRef.instance.setup(this.widgetDef, context);

    return widgetRef;
  }

  ngOnDestroy(): void {
    this.unsuscribeStructural();
    this.destroyWidgets();
  }
  /** Unsubscribes from the structural properties expressions */
  unsuscribeStructural(): void {
    if (this.subscriptions) {
      this.subscriptions.unsubscribe();
      this.subscriptions = undefined;
    }
  }

  destroyWidgets(): void {
    if (!this.widgetRef) return;

    this.widgetRef.map(ref => ref.destroy());
    this.widgetRef = [];
  }

  /**
   * Checks the basic validity of the widget definition and that it is properly registered
   * Initializes the componentFactory
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

  // `for` routines, based on code borrowed from Angular `ngFor`

  /**
   * Applies the changes when needed.
   */
  private setFor(value: any[]): void {
    if (!this.forDiffer && value) {
      try {
        if (
          this.structuralContext &&
          this.structuralContext.hasOwnProperty('$trackBy') &&
          typeof this.structuralContext.$trackBy === 'function'
        )
          this.forTrackBy = this.structuralContext.$trackBy;
        this.forDiffer = this.differs.find(value).create(this.forTrackBy);
      } catch {
        throw new Error(`Cannot find a differ supporting object '${value}'`);
      }
    }
    this.forArray = value;
    if (this.forDiffer) {
      const changes = this.forDiffer.diff(value);
      if (changes) this.applyForChanges(changes);
    }
  }

  private applyForChanges(changes: IterableChanges<any>): void {
    changes.forEachOperation(
      (
        record: IterableChangeRecord<any>,
        adjustedPreviousIndex: number | null,
        currentIndex: number | null
      ) => {
        if (record.previousIndex == null && currentIndex !== null) {
          // added elements
          const component = this.createForWidget(record.item, currentIndex);

          this.widgetRef.splice(currentIndex, 0, component);
        } else if (currentIndex == null && adjustedPreviousIndex !== null) {
          // removed elements
          this.container.remove(adjustedPreviousIndex);
          this.widgetRef.splice(adjustedPreviousIndex, 1);
        } else if (adjustedPreviousIndex !== null && currentIndex !== null) {
          // moved elements
          const view = this.container.get(adjustedPreviousIndex)!;
          this.container.move(view, currentIndex);

          const component = this.widgetRef[adjustedPreviousIndex];
          this.widgetRef.splice(adjustedPreviousIndex, 1);
          this.widgetRef.splice(currentIndex, 0, component);
        }
      }
    );

    // the identity of the item changed (even if the trackBy returned the same ID, the objects have different references )
    changes.forEachIdentityChange((record: IterableChangeRecord<any>) => {
      if (record.currentIndex)
        this.widgetRef[record.currentIndex].instance.context.$for.item = record.item;
    });

    // update index

    this.widgetRef.forEach((element, i) => {
      if (element.instance.context.$for.index !== i) element.instance.context.$for.index = i;
    });
  }
}
