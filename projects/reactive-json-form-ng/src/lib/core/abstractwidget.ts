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
import { IWidgetDef } from './widget.interface';

export interface IOptionDef {
  [prop: string]: any;
}

/**
 * Base class for all dynamic widget elements
 */
export abstract class AbstractWidget implements OnDestroy, OnChanges, OnInit {
  /** Configuration of the widget */
  @Input() widgetDef: IWidgetDef;
  @Input() context: Context;

  /** String identifing the 'type' of the widget */
  type: string;
  /** Context to use for evaluations at this level */

  /**
   * Widget specific options all converted to observables, to unify between *expression* and
   * *constant* notation in the properties definition.
   * Each binding then auto updates the corresponding property in the derived widget.
   */
  bindings: { [prop: string]: Observable<any> } = {};
  /** The input configuration of this object */

  content: IWidgetDef[];

  element: WidgetDirective;

  set addSubscription(subs: Subscription) {
    this._subscriptions.push(subs);
  }

  private _subscriptions: Subscription[] = [];

  constructor(protected _cdr: ChangeDetectorRef, protected _expr: Expressions) {}

  /** Initialices the widget from a json definition */
  setup(element: WidgetDirective, def: IWidgetDef, context: Context): void {
    def = def || { type: 'none' };
    def.options = def.options || {};

    this.type = def.type || 'none';
    this.element = element;

    console.log(`Widget setup ${this.type}`, this);

    this.context = context;

    this.widgetDef = def = this.dynOnSetup(def) || def;

    this.bindings = parseDefObject(def.options, this.context, true, this._expr);

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
  map(option: string, callback: (v: any) => any): void {
    const opt: Observable<any> = this.bindings[option];
    if (opt) this.bindings[option] = opt.pipe(map(callback));
  }
  /**
   * Hook to customize the observable bindings befor subscribing.
   * Tipically using the `this.map()` function to add processing to specific options
   */
  dynOnBeforeBind(): void {}

  dynOnAfterBind(): void {}

  /** Hook to customize widget definition before procesing it */
  dynOnSetup(def: IWidgetDef): IWidgetDef {
    return def;
  }

  subscribeOptions(): void {
    const observables = [];

    // call hook for cofiguration of options before updating the bound value
    this.dynOnBeforeBind();

    for (const prop in this.bindings) // tslint:disable-line:forin
      this.bindings[prop] = this.bindings[prop].pipe(tap(res => (this[prop] = res)));

    // call hook after updating the bound value
    this.dynOnAfterBind();

    for (const prop in this.bindings) // tslint:disable-line:forin
      observables.push(this.bindings[prop]);

    this.addSubscription = combineLatest(observables).subscribe(() => this._cdr.markForCheck());
  }

  ngOnDestroy(): void {
    this._unsubscribe();
  }

  /**
   * OnChanges is never called on dynamic widget instantiation
   * It is intended to provide the same interface is the widget is used declarative in a template
   * instead of dynamically
   */
  ngOnChanges(): void {
    console.log(`Widget OnChanges ${this.type}`, this);
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

export function parseDefObject(
  objDef: IOptionDef,
  context: Context,
  asObservable: boolean,
  expr: Expressions
): IOptionDef {
  const result: IOptionDef = {};

  if (!objDef) return {};

  for (const prop in objDef) {
    if (prop.charAt(prop.length - 1) === '=') {
      if (typeof objDef[prop] !== 'string')
        throw new SyntaxError('Binding options must be "string" Iexpressions');
      result[prop.slice(0, prop.length - 1)] = expr.eval(objDef[prop], context, asObservable);
    } else
      result[prop] = asObservable && !isObservable(objDef[prop]) ? of(objDef[prop]) : objDef[prop];
  }
  return result;
}
