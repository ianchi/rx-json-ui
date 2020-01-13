/*!
 * Copyright (c) 2019 Adrian Panella <ianchi74@outlook.com>
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

export type Constrain<T, K> = { [key in keyof T]: K };
export type ConstrainSlots<S> = Constrain<S, SimpleContentDef> & MainSlotContentDef;
export type ConstrainEvents<E> = Constrain<E, multilineExpr | undefined> & CommonEventsDef;

/** Auxiliary type to generate json schema definitions */
export type JsonWidgetDef<
  O extends AbstractOptionsDef = {},
  S extends ConstrainSlots<S> | undefined = undefined,
  E extends ConstrainEvents<E> = CommonEventsDef,
  B extends boolean | undefined = undefined
> = Omit<
  WidgetDef<O, S, E, B> & (B extends true ? { bind: lvalueExpr } : {}),
  (S extends undefined ? 'content' : never) | (B extends undefined ? 'bind' : never)
>;

/** Auxiliary type to generate json schema definitions */
export type JsonContentDef = SimpleContentDef | AbstractWidgetDef;

/**
 * Definition of a generic Widget.
 * Specific Widgets can further restrict the available options
 */ export interface WidgetDef<
  O extends AbstractOptionsDef,
  S extends ConstrainSlots<S> | undefined = undefined,
  E extends ConstrainEvents<E> = CommonEventsDef,
  B extends boolean | undefined = undefined
> {
  $schema?: string;

  /**
   * Type of the Widget to instantiate
   */
  widget: string;

  /**
   * Object/property to bind the form field to.
   *
   * @parser lvalue
   */
  bind?: B extends undefined ? undefined : lvalueExpr;
  exportAs?: string;
  elementAs?: string;
  indexAs?: string;

  /**
   * Structural property, it is an expression that is evaluated before the creation of the component.
   * The widget is created only when it evaluates to truthy.
   * The expression is bound, so if it later emits a falsey value, the widget will be destroyed.
   * It is evaluated in its own sub context.
   *
   * @parser ES6
   */
  if?: multilineExpr;

  /**
   * Structural property, it is an expression that is evaluated before the creation of the component.
   * If the result of evaluation is an array, one instance of the widget will be created for each element.
   * The evaluation context has a `$trackBy` property that can be set to an arrow expression that returns a
   * key used to track the identity of each item returned by the array, to detect changes.
   * If it is not provided, detection is made by value/reference of each returned item.
   *
   * A child context will be created for each widget, with `$for` exposing the attributes:
   * + `index` with the index of the element in the array.
   * + `item` with the value of the item
   * + `for` with the whole array
   * If the result is anything other than an array, no widget is instantiated.
   *
   * The expression is bound, so if it later changes, widgets will be created/destroyed/moved accordingly.
   * It is evaluated in its own sub context and only after the `if` is evaluated to truthy.
   *
   * @parser ES6
   */
  for?: multilineExpr;

  /**
   * Object with input options to pass to the specific Widget.
   * All keys are allowed to be an expression in the form `"key=": "expr"` which denotes a
   * dynamic input binding to the result of evaluating the expression
   */
  options?: O;

  /**
   * Object with expressions to execute as event listener.
   * Expressions are evaluated and only one result is taken (and the unsubscribed).
   * `on` events don't wait for the result of the expression
   * `before` events wait for the expressions result, and may act depending on it.
   *
   * All hooks are evaluated on its own child context, so variables created are not seen
   * at the parent widget and lost after the event.
   * To keep results, assign to `$parentContext` properties.
   */
  events?: E;

  /**
   * Child widgets of this widget.
   * It can be an array of Widgets' definitions, which will be included in the `main` content area
   * of this Widget, or a map of slots and widgets to include in that slot (for widgets that
   * have multiple child slots).
   * The array of children widget definitions can be of static objects, or a string|string[] with an
   * expression that will return the widget definition.
   */
  content?: ContentDef<S>;
}

export type AbstractWidgetDef = WidgetDef<
  AbstractOptionsDef,
  AbstractSlotContentDef,
  AbstractEventsDef,
  boolean | undefined
>;
/**
 *
 */
export interface AbstractOptionsDef {
  [option: string]: any;
}

/**
 * Definition of the content of the widget.
 * It can be defined as an object with named slots with different content
 * or as a single array of widgets that default to the `main` slot.
 */
export type AbstractContentDef = AbstractSlotContentDef | SimpleContentDef;

/**
 * Content definition for widgets with a single slot *
 * It is equivalent to a slotted definition with a single `main` slot
 */
export type SimpleContentDef = Array<AbstractWidgetDef | multilineExpr>;

// tslint:disable-next-line: interface-over-type-literal
export type MainSlotContentDef = {
  /** The content for the main slot. It must always be present */
  main: SimpleContentDef;
};

export type ContentDef<S> = S extends undefined ? undefined : S | SimpleContentDef;

/**
 * Content definition used when the widget has multiple slots where to insert
 * different content.
 */
export interface AbstractSlotContentDef extends MainSlotContentDef {
  /** Optional content for additional slots defined by each widget */
  [extraSlots: string]: SimpleContentDef;
}

/**
 * Input Options common to ALL widgets.
 * They are handled directly by the AbstractBaseWidget
 */
export interface CommonOptionsDef {
  /** class or classes to apply to the widget */
  class: string | string[];
}

/**
 * @parser ES6
 */
export type expr = string;

/**
 * @parser lvalue
 */
export type lvalueExpr = string;

/**
 * @parser ES6
 */
export type multiExpr = string[];

/**
 * An expression to be evaluated that can optionally be split to be written in multiple lines.
 * It is a convenience feature to allow for line breaks in places as *json* that don't allow splitting long lines.
 *
 * It can be a *normal* single line string, or an *array of strings* that will be joined together by a line break
 * (`\n`) to form a single expression before evaluating.
 */
export type multilineExpr = expr | multiExpr;

/**
 * Object with expressions to execute as event listener.
 * Expressions are evaluated and only one result is taken (and the unsubscribed).
 * `on` events don't wait for the result of the expression
 * `before` events wait for the expressions result, and may act depending on it.
 *
 * These are the common events to all widgets, specific widgets may emit their own specific events
 * (i.e. a button emits an `onClick` event)
 *
 * @remark All event listeners are evaluated on its own child context, so variables created are not seen
 * at the parent widget and lost after the event.
 * To make it visible it must be added to the `$parentContext`
 *
 * @example
 * ```
 * privateVar = 'this can't be seen outside this listener'
 * $parentContext.publicVar = 'this is exported and can be seen in the rest of the widget'
 * ```
 */
export interface AbstractEventsDef extends CommonEventsDef {
  /**
   * Additional custom events defined by the widget
   *
   * @parser ES6
   */
  [onCustomEvent: string]: multilineExpr | undefined;
}

// tslint:disable-next-line: interface-over-type-literal
export type CommonEventsDef = {
  /**
   * First event emitted after the widget component is created and before any other actions takes place.
   * Only structural properties (`if` and `for`) are evaluated first, so the widget instance is already created.
   *
   * Any change to the parent context is guaranteed to be visible to any expression bound input property.
   * So it is typically a place to initialize any variable needed elsewhere in the widget.
   *
   * @parser ES6
   */
  onSetup?: multilineExpr;

  /**
   * Emitted once after all bound input options have been resolved.
   *
   * @parser ES6
   */
  onInit?: multilineExpr;

  /**
   * Emitted once after all bound input options have been resolved after the `onInit` event
   * and on every change of any bound input option
   * This event receives in the evaluation context `$options` with the current options
   *
   * @parser ES6
   */
  onChange?: multilineExpr;

  /**
   * Emitted once after the Content definition has been resolved and on any change of the
   * content definition, if it was bound to an expression
   *
   * @parser ES6
   */
  onContentChange?: multilineExpr;

  /**
   * Emitted before the widget is destroyed
   *
   * @parser ES6
   */
  onDestroy?: multilineExpr;
};

export type FieldEventDef = CommonEventsDef & {
  /**
   * @parser ES6
   */
  onValueChange?: multilineExpr;
  /**
   * @parser ES6
   */
  onValidate?: multilineExpr;
};
