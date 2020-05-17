/**
 * Copyright (c) 2018 Adrian Panella <ianchi74@outlook.com>
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import {
  ChangeDetectorRef,
  Directive,
  ElementRef,
  IterableChanges,
  IterableDiffer,
  IterableDiffers,
  KeyValueChanges,
  KeyValueDiffer,
  KeyValueDiffers,
  OnChanges,
  OnDestroy,
  OnInit,
  Renderer2,
} from '@angular/core';
import { INode } from 'espression';
import { combineMixed } from 'espression-rx';
import { combineLatest, isObservable, Observable, of, Subscription } from 'rxjs';
import { map, switchMap, take, tap } from 'rxjs/operators';

import { Context, Expressions } from '../expressions/index';

import {
  AbstractWidgetDef,
  ClassDef,
  CommonEventsDef,
  CommonOptionsDef,
  ConstrainBind,
  ConstrainEvents,
  ConstrainSlots,
  ContentDef,
  JsonWidgetDef,
  MainSlotContentDef,
  multilineExpr,
  NoBindWidgetDef,
  SimpleContentDef,
  WidgetDef,
} from './public.interface';

export type Bindings<T> = { [P in keyof T]-?: Observable<T[P]> };

export type ParsedObject<T> = { [P in keyof T]: T[P] | Observable<T[P]> };

export type AbstractWidget = BaseWidget<
  CommonOptionsDef,
  MainSlotContentDef | undefined,
  CommonEventsDef,
  ConstrainBind
>;
/**
 * Base class for all dynamic widget elements
 */
@Directive()
// tslint:disable-next-line: directive-class-suffix
export class BaseWidget<
  O extends CommonOptionsDef,
  S extends ConstrainSlots<S> | undefined = undefined,
  E extends ConstrainEvents<E> = CommonEventsDef,
  B extends ConstrainBind = NoBindWidgetDef
> implements OnDestroy, OnChanges, OnInit {
  /** Configuration object for the widget */
  widgetDef: WidgetDef<O, S, E, B> | undefined;

  /** Used to generate de json schema files */
  jsonWidgetDef: JsonWidgetDef<O, S, E, B> | undefined;
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

  // class internal state
  private _iterableDiffer: IterableDiffer<string> | undefined;
  private _keyValueDiffer: KeyValueDiffer<string, any> | undefined;
  private _rawClass: ClassDef | undefined;

  constructor(
    protected _cdr: ChangeDetectorRef,
    protected expr: Expressions,
    protected iterableDiffers: IterableDiffers,
    protected keyValueDiffers: KeyValueDiffers,
    protected ngElement: ElementRef,
    protected renderer: Renderer2
  ) {}

  /** Initializes the widget from a json definition */
  setup(widgetDef: WidgetDef<O, S, E, B>, context?: Context): void {
    widgetDef.options = widgetDef.options || ({} as O);
    this.context = context || new Context();

    this.widgetDef = widgetDef = this.dynOnSetup(widgetDef);

    if (widgetDef.events) this.parseEventsDef(widgetDef.events);
    this.emit('onSetup');
    this.dynOnAfterSetup();

    this.bindings = parseDefObject<O>(widgetDef.options, this.context, true, this.expr);

    if (widgetDef.content)
      this.contentBind = this.parseContentDef(widgetDef.content).pipe(
        tap((content) => {
          this.content = content;
          this.emit('onContentChange');
        })
      );

    this.subscribeOptions();
  }

  private parseContentDef(content: ContentDef<S>): Observable<S> {
    let sloted: S;
    // check invalid definition and convert to slotted
    if (typeof content === 'undefined' || typeof content !== 'object') {
      this.content = { main: [] as SimpleContentDef } as S;
      throw new Error('Invalid content definition');
    }

    if (Array.isArray(content)) sloted = { main: content as SimpleContentDef } as S;
    else if (!('main' in content)) {
      this.content = { main: [] as AbstractWidgetDef[] } as S;
      throw new Error('Missing "main" slot in content definition');
    } else sloted = content as S;

    // parse each slot definition
    const slots: Array<keyof S> = Object.keys(sloted!) as Array<keyof S>;

    return combineLatest(
      slots.map((slot: keyof S) => this.parseSimpleContentDef(sloted![slot]))
    ).pipe(
      map((simple) =>
        slots.reduce(
          (cont, slot, idx) => {
            if (cont) cont[slot as keyof S] = simple[idx] as any;
            return cont;
          },
          { main: [] as SimpleContentDef } as S
        )
      )
    );
  }

  private parseEventsDef(eventsDef: E): void {
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

    const args = content.map((item) => {
      // allow multiline expressions
      if (Array.isArray(item)) item = item.join('\n');

      return typeof item !== 'string'
        ? item
        : this.expr
            .eval(item, this.context, true)
            .pipe(switchMap((resItem) => this.parseSimpleContentDef(resItem)));
    });
    return combineMixed(args, true).pipe(
      map((items) => [].concat(...items) as AbstractWidgetDef[]),
      map((items: any[]) =>
        items.map((item) =>
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

  emit(event: keyof E, subContext?: object, nextFn?: (value: any) => void): void {
    const ast = this.events[event];
    if (!ast) return;

    this.addSubscription = this.expr
      .evaluate(ast, Context.create(this.context, subContext), true)
      .pipe(take(1))
      .subscribe((value) => {
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
      this.bindings[prop] = this.bindings[prop].pipe(tap((res) => (this.options[prop] = res)));

    this.map('class', (klass) => (this.setClass(klass), klass));

    // call hook after updating the bound value
    this.dynOnAfterBind();

    for (const prop in this.bindings) // tslint:disable-line:forin
      observables.push(this.bindings[prop]);

    if (observables.length)
      this.addSubscription = combineLatest(observables).subscribe(() => {
        this.dynOnChange();

        if (!this.isInitialized) {
          this.isInitialized = true;
          this.emit('onInit');
        }

        this.emit('onChange', { $options: this.options });
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
    this.emit('onDestroy');
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

  /** Hook to complete setup after parsing `events` and after onSetup */
  dynOnAfterSetup(): void {}

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

  // following code is based on code from Angular ngStyle directive
  setClass(value: ClassDef): void {
    value = typeof value === 'string' ? value.split(/\s+/) : value;

    // test for new value or change of type
    if (
      !value ||
      (!this._iterableDiffer && !this._keyValueDiffer) ||
      (this._iterableDiffer && !Array.isArray(value)) ||
      (this._keyValueDiffer && typeof value !== 'object')
    ) {
      this._removeClasses(this._rawClass);

      this._iterableDiffer = undefined;
      this._keyValueDiffer = undefined;

      this._rawClass = value;
      if (value) {
        if (Array.isArray(value)) {
          this._iterableDiffer = this.iterableDiffers.find(value).create();
        } else {
          this._keyValueDiffer = this.keyValueDiffers.find(value).create();
        }
      }
    }
    // update class according to value
    if (this._iterableDiffer) {
      const iterableChanges = this._iterableDiffer.diff(this._rawClass as string[]);
      if (iterableChanges) {
        this._applyIterableChanges(iterableChanges);
      }
    } else if (this._keyValueDiffer) {
      const keyValueChanges = this._keyValueDiffer.diff(this._rawClass as { [k: string]: any });
      if (keyValueChanges) {
        this._applyKeyValueChanges(keyValueChanges);
      }
    }
  }

  private _applyKeyValueChanges(changes: KeyValueChanges<string, any>): void {
    changes.forEachAddedItem((record) => this._toggleClass(record.key, record.currentValue));
    changes.forEachChangedItem((record) => this._toggleClass(record.key, record.currentValue));
    changes.forEachRemovedItem((record) => {
      if (record.previousValue) {
        this._toggleClass(record.key, false);
      }
    });
  }

  private _applyIterableChanges(changes: IterableChanges<string>): void {
    changes.forEachAddedItem((record) => {
      if (typeof record.item === 'string') {
        this._toggleClass(record.item, true);
      } else {
        throw new Error(
          `class can only be expressed as strings, got ${JSON.stringify(record.item)}`
        );
      }
    });

    changes.forEachRemovedItem((record) => this._toggleClass(record.item, false));
  }

  /**
   * Removes a collection of CSS classes from the DOM element.
   */
  private _removeClasses(rawClassVal?: ClassDef): void {
    if (rawClassVal) {
      if (Array.isArray(rawClassVal) || rawClassVal instanceof Set) {
        (<any>rawClassVal).forEach((klass: string) => this._toggleClass(klass, false));
      } else {
        Object.keys(rawClassVal).forEach((klass) => this._toggleClass(klass, false));
      }
    }
  }

  private _toggleClass(klass: string, enabled: boolean): void {
    klass = klass.trim();
    if (klass) {
      klass.split(/\s+/g).forEach((kls) => {
        if (enabled) {
          this.renderer.addClass(this.ngElement.nativeElement, kls);
        } else {
          this.renderer.removeClass(this.ngElement.nativeElement, kls);
        }
      });
    }
  }
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
