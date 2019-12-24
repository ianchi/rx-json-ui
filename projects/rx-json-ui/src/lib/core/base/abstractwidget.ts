/**
 * Copyright (c) 2018 Adrian Panella <ianchi74@outlook.com>
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { ChangeDetectorRef, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { INode } from 'espression';
import { combineMixed } from 'espression-rx';
import { combineLatest, isObservable, Observable, of, Subscription } from 'rxjs';
import { map, switchMap, take, tap } from 'rxjs/operators';

import { Context, Expressions } from '../expressions/index';

import {
  AbstractEventsDef,
  AbstractOptionsDef,
  AbstractSlotContentDef,
  AbstractWidgetDef,
  CommonEventsDef,
  ConstrainEvents,
  ConstrainSlots,
  ContentDef,
  JsonWidgetDef,
  MainSlotContentDef,
  multilineExpr,
  SimpleContentDef,
  WidgetDef,
} from './public.interface';

export type Bindings<T> = { [P in keyof T]-?: Observable<T[P]> };

export type ParsedObject<T> = { [P in keyof T]: T[P] | Observable<T[P]> };

export type AbstractWidget = BaseWidget<
  AbstractOptionsDef,
  AbstractSlotContentDef | undefined,
  AbstractEventsDef,
  boolean | undefined
>;
/**
 * Base class for all dynamic widget elements
 */
export class BaseWidget<
  O extends AbstractOptionsDef,
  S extends ConstrainSlots<S> | undefined = undefined,
  E extends ConstrainEvents<E> = CommonEventsDef,
  B extends boolean | undefined = undefined
> implements OnDestroy, OnChanges, OnInit {
  /** Configuration object for the widget */
  widgetDef: WidgetDef<O, S, E, B> | undefined;

  /** Used to generate de json schema files */
  jsonWidgetDef = {} as JsonWidgetDef<O, S, E, B>;
  context = new Context();

  /**
   * Widget specific options all converted to observables, to unify between *expression* and
   * *constant* notation in the properties definition.
   * Each binding then auto updates the corresponding property in the derived widget.
   */
  bindings = {} as Bindings<O>;

  /** Resolved options */
  options = {} as O;
  events = {} as Record<keyof E, INode | undefined>;
  content?: S;

  contentBind: Observable<S> | undefined;

  /**
   * Initialization state of the widget
   * It becomes `true` once all bound options are resolved for the first time
   */
  isInitialized = false;

  /** stores subscriptions to automatically unsubscribe onDestroy */
  protected set addSubscription(subs: Subscription) {
    this.subscriptions.push(subs);
  }
  private subscriptions: Subscription[] = [];

  constructor(protected _cdr: ChangeDetectorRef, protected expr: Expressions) {}

  /** Initializes the widget from a json definition */
  setup(widgetDef: WidgetDef<O, S, E, B>, context?: Context): void {
    widgetDef.options = widgetDef.options || ({} as O);

    this.context = context || new Context();

    this.widgetDef = widgetDef = this.dynOnSetup(widgetDef);

    if (widgetDef.events) this.parseEventsDef(widgetDef.events);
    this.emmit('onSetup');

    this.bindings = parseDefObject<O>(widgetDef.options, this.context, true, this.expr);

    if (widgetDef.content)
      this.contentBind = this.parseContentDef(widgetDef.content).pipe(
        tap(content => {
          this.content = content;
          this.emmit('onContentChange');
        })
      );

    this.subscribeOptions();
  }

  private parseContentDef(content: ContentDef<S>): Observable<S> {
    let sloted: AbstractSlotContentDef;
    // check invalid definition and convert to slotted
    if (typeof content === 'undefined' || typeof content !== 'object') {
      this.content = { main: [] as AbstractWidgetDef[] } as S;
      throw new Error('Invalid content definition');
    }

    if (Array.isArray(content)) sloted = { main: content } as MainSlotContentDef;
    else if (!('main' in content)) {
      this.content = { main: [] as AbstractWidgetDef[] } as S;
      throw new Error('Missing "main" slot in content definition');
    } else sloted = content as AbstractSlotContentDef;

    // parse each slot definition
    const slots: Array<keyof AbstractSlotContentDef> = Object.keys(sloted);

    return combineLatest(
      slots.map((slot: keyof AbstractSlotContentDef) => this.parseSimpleContentDef(sloted[slot]))
    ).pipe(
      map(simple =>
        slots.reduce(
          (cont, slot, idx) => {
            if (cont) cont[slot as keyof S] = simple[idx] as S[keyof S];
            return cont;
          },
          { main: [] as AbstractWidgetDef[] } as S
        )
      )
    );
  }

  private parseEventsDef(eventsDef: AbstractEventsDef): void {
    let expr: multilineExpr | undefined;
    // tslint:disable-next-line: forin
    for (const event in eventsDef) {
      expr = eventsDef[event];
      if (expr)
        this.events[event as keyof E] = this.expr.parse(
          Array.isArray(expr) ? expr.join('\n') : expr
        );
    }
  }
  private parseSimpleContentDef(
    content: SimpleContentDef | AbstractWidgetDef
  ): Observable<AbstractWidgetDef[]> {
    if (typeof content !== 'object') return of([]);
    if (!Array.isArray(content)) return of([content]);

    const args = content.map(item => {
      // allow multiline expressions
      if (Array.isArray(item)) item = item.join('\n');

      return typeof item !== 'string'
        ? item
        : this.expr
            .eval(item, this.context, true)
            .pipe(switchMap(resItem => this.parseSimpleContentDef(resItem)));
    });
    return combineMixed(args, true).pipe(
      map(items => [].concat(...items) as AbstractWidgetDef[]),
      map((items: any[]) =>
        items.map(item =>
          !item || typeof item !== 'object' || !item.widget ? { widget: 'none' } : item
        )
      )
    );
  }

  // Helper functions

  /**
   * Helper function to add a `map` pipe to the corresponding input observable
   */
  protected map(option: keyof O, callback: (v: any) => any): void {
    const opt = this.bindings[option];
    if (opt) this.bindings[option] = opt.pipe(map(callback));
  }

  emmit(event: keyof E, subContext?: object, nextFn?: (value: any) => void): void {
    const ast = this.events[event];
    if (!ast) return;

    this.addSubscription = this.expr
      .evaluate(ast, Context.create(this.context, subContext), true)
      .pipe(take(1))
      .subscribe(value => {
        if (nextFn) {
          nextFn(value);
          // in case some internal state has changed in the callback
          this._cdr.markForCheck();
        }
      });
  }

  private subscribeOptions(): void {
    // tslint:disable-next-line:no-any
    const observables: Array<Observable<any>> = [];

    // get dynamic content
    if (this.contentBind) observables.push(this.contentBind);

    // call hook for configuration of options before updating the bound value
    this.dynOnBeforeBind();

    for (const prop in this.bindings) // tslint:disable-line:forin
      this.bindings[prop] = this.bindings[prop].pipe(tap(res => (this.options[prop] = res)));

    // call hook after updating the bound value
    this.dynOnAfterBind();

    for (const prop in this.bindings) // tslint:disable-line:forin
      observables.push(this.bindings[prop]);

    if (observables.length)
      this.addSubscription = combineLatest(observables).subscribe(() => {
        this.dynOnChange();

        if (!this.isInitialized) this.emmit('onInit');
        this.isInitialized = true;

        this.emmit('onChange', { $options: this.options });
        this._cdr.markForCheck();
      });
    else {
      this.isInitialized = true;
      this._cdr.markForCheck();
    }
  }

  private unsubscribe(): void {
    for (const subs of this.subscriptions) subs.unsubscribe();
    this.subscriptions = [];
  }

  // Angular Lifecycle hooks
  // -----------------------

  ngOnDestroy(): void {
    this.emmit('onDestroy');
    this.unsubscribe();
  }

  /**
   * OnChanges is never called on dynamic widget instantiation
   * It is intended to prevent the widget from being used declarative in a template
   * instead of dynamically
   */
  ngOnChanges(): void {
    throw new Error('Widgets should not be referenced declaratively in a template.');
  }

  ngOnInit(): void {}

  // Widget's Lifecycle hooks declarations
  // ------------------------

  /** Hook to customize widget definition before processing it */
  dynOnSetup(def: WidgetDef<O, S, E, B>): WidgetDef<O, S, E, B> {
    return def;
  }

  /**
   * Hook to customize the observable bindings *before* updating the bound value.
   * Typically using the `this.map()` function to add processing to specific options.
   * Modifications to value here affect the bound value.
   */
  dynOnBeforeBind(): void {}

  /**
   * Hook to customize the observable bindings *after* updating the bound value.
   * Perform some side effect, knowing that the value is updated.
   * Modifications to the observed value here are ignored
   */
  dynOnAfterBind(): void {}

  /** Hook called once all bound values are updated and each time that a bound value changes */
  dynOnChange(): void {}
}

export function parseDefObject<T extends object>(
  objDef: T | undefined,
  context: Context,
  asObservable: true,
  expr: Expressions
): Bindings<T>;
export function parseDefObject<T extends object>(
  objDef: T | undefined,
  context: Context,
  asObservable: false,
  expr: Expressions
): ParsedObject<T>;
export function parseDefObject<T extends object>(
  objDef: T | undefined,
  context: Context,
  asObservable: boolean,
  expr: Expressions
): ParsedObject<T> {
  const result = {} as ParsedObject<T>;

  if (!objDef || typeof objDef !== 'object') return result;

  for (const prop in objDef) {
    if (prop.charAt(prop.length - 1) === '=') {
      let val: T[keyof T] | string = objDef[prop];

      // allow multiline expressions
      if (Array.isArray(val)) val = val.join('\n');
      else if (typeof val !== 'string')
        throw new SyntaxError(`Binding option "${prop}" must be "string" expressions`);

      result[prop.slice(0, prop.length - 1) as keyof T] = expr.eval(val, context, asObservable);
    } else
      result[prop] = asObservable && !isObservable(objDef[prop]) ? of(objDef[prop]) : objDef[prop];
  }
  return result;
}
