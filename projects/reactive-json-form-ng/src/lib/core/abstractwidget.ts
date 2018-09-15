/**
 * Copyright (c) 2018 Adrian Panella <ianchi74@outlook.com>
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { ChangeDetectorRef, Input, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { combineLatest, isObservable, Observable, of, Subscription } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { Context } from './context';
import { Expressions } from './expressions';
import { WidgetDirective } from './widget.directive';
import { IOptionDef, IWidgetDef } from './widget.interface';

// tslint:disable-next-line:no-any
export interface IDictionary<T = any> {
  [key: string]: T;
}

export type Bindings<T> = { [P in keyof T]-?: Observable<NonNullable<T[P]>> };

export type ParsedObject<T> = { [P in keyof T]: T[P] | Observable<NonNullable<T[P]>> };
/**
 * Base class for all dynamic widget elements
 */
export abstract class AbstractWidget<T> implements OnDestroy, OnChanges, OnInit {
  /** Configuration object for the widget */
  @Input()
  widgetDef: IWidgetDef | undefined;
  @Input()
  context = new Context();

  /** String identifing the 'type' of the widget */
  type = '';
  /** Context to use for evaluations at this level */

  /**
   * Widget specific options all converted to observables, to unify between *expression* and
   * *constant* notation in the properties definition.
   * Each binding then auto updates the corresponding property in the derived widget.
   */
  bindings = {} as Bindings<T>;
  /** Resolved options */

  options = {} as T;
  content = [] as IWidgetDef[];

  element: WidgetDirective | undefined;

  /**
   * Initialization state of the widget
   * It becomes `true` once all bound options are resolved for the first time
   */
  isInitialized = false;
  /** stores subscriptios to automatically unsubscribe onDestroy */
  protected set addSubscription(subs: Subscription) {
    this._subscriptions.push(subs);
  }

  private _subscriptions: Subscription[] = [];

  constructor(protected _cdr: ChangeDetectorRef, protected _expr: Expressions) {}

  /** Initialices the widget from a json definition */
  setup(element?: WidgetDirective, def?: IWidgetDef, context?: Context): void {
    def = def || { widget: 'none' };
    def.options = def.options || {};

    this.type = def.widget || 'none';
    this.element = element;

    this.context = context || new Context();

    this.widgetDef = def = this.dynOnSetup(def);

    this.bindings = parseDefObject<T>(def.options, this.context, true, this._expr);

    this.content = Array.isArray(def.content)
      ? def.content
      : typeof def.content === 'object'
        ? [def.content]
        : [];

    this.subscribeOptions();
  }

  /**
   * Helper function to add a `map` pipe to the corresponding input observable
   */
  // tslint:disable-next-line:no-any
  map(option: keyof T, callback: (v: any) => any): void {
    const opt = this.bindings[option];
    if (opt) this.bindings[option] = opt.pipe(map(callback));
  }
  /**
   * Hook to customize the observable bindings *before* updating the bound value.
   * Tipically using the `this.map()` function to add processing to specific options.
   * Modifications to value here affect the bound value.
   */
  dynOnBeforeBind(): void {}

  /**
   * Hook to customize the observable bindings *after* updating the bound value.
   * Perform some side effect, knowing that the value is updated.
   * Modifications to the observed value here are ignored
   */
  dynOnAfterBind(): void {}

  /** Hook to customize widget definition before procesing it */
  dynOnSetup(def: IWidgetDef): IWidgetDef {
    return def;
  }

  /** Hook called once all bound values are updated and each time that a bound value changes */
  dynOnChange(): void {}

  private subscribeOptions(): void {
    // tslint:disable-next-line:no-any
    const observables: Array<Observable<any>> = [];

    // call hook for cofiguration of options before updating the bound value
    this.dynOnBeforeBind();

    for (const prop in this.bindings) // tslint:disable-line:forin
      this.bindings[prop] = this.bindings[prop].pipe(tap(res => (this.options[prop] = res)));

    // call hook after updating the bound value
    this.dynOnAfterBind();

    for (const prop in this.bindings) // tslint:disable-line:forin
      observables.push(this.bindings[prop]);

    this.addSubscription = combineLatest(observables).subscribe(() => {
      this.isInitialized = true;
      this.dynOnChange();
      this._cdr.markForCheck();
    });
  }

  ngOnDestroy(): void {
    this._unsubscribe();
  }

  /**
   * OnChanges is never called on dynamic widget instantiation
   * It is intended to provide the same interface if the widget is used declarative in a template
   * instead of dynamically
   */
  ngOnChanges(): void {
    this._unsubscribe();
    this.setup(undefined, this.widgetDef, this.context);
  }

  ngOnInit(): void {
    console.log(`Widget OnInit ${this.type}`, this);
  }

  private _unsubscribe(): void {
    for (const subs of this._subscriptions) subs.unsubscribe();
  }
}

export function parseDefObject<T>(
  objDef: IOptionDef | undefined,
  context: Context,
  asObservable: true,
  expr: Expressions
): Bindings<T>;
export function parseDefObject<T>(
  objDef: IOptionDef | undefined,
  context: Context,
  asObservable: false,
  expr: Expressions
): ParsedObject<T>;
export function parseDefObject<T>(
  objDef: IOptionDef | undefined,
  context: Context,
  asObservable: boolean,
  expr: Expressions
): ParsedObject<T> {
  const result = {} as ParsedObject<T>;

  if (!objDef) return result;

  for (const prop in objDef) {
    if (prop.charAt(prop.length - 1) === '=') {
      if (typeof objDef[prop] !== 'string')
        throw new SyntaxError(`Binding option "${prop}" must be "string" expressions`);

      result[prop.slice(0, prop.length - 1) as keyof T] = expr.eval(
        objDef[prop],
        context,
        asObservable
      );
    } else
      result[prop as keyof T] =
        asObservable && !isObservable(objDef[prop]) ? of(objDef[prop]) : objDef[prop];
  }
  return result;
}
