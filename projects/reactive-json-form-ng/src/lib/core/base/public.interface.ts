/*!
 * Copyright (c) 2019 Adrian Panella <ianchi74@outlook.com>
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

/**
 * Definition of a generic Widget.
 * Specific Widgets can further restrict the available options
 */
export interface AbstractWidgetDef {
  /**
   * Type of the Widget to instantiate
   * @minLength 1
   */
  widget: string;

  bind?: expr;
  exportAs?: expr;
  elementAs?: expr;
  indexAs?: expr;
  /**
   * Structural property, it is an expression that is evaluated before the creation of the component.
   * The widget is created only when it evaluates to truthy.
   * The expression is bound, so if it later emmits a falsey value, the widget will be destroyed.
   * It is evaluated in its own subcontext.
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
   * It is evaluated in its own subcontext and only after the `if` is evaluated to truthy.
   */
  for?: multilineExpr;

  /**
   * Object with input options to pass to the specific Widget.
   * All keys are allowed to be an expression in the form `"key=": "expr"` which denotes a
   * dynamic input binding to the result of evaluating the expression
   */
  options?: AbstractOptionsDef;

  /**
   * Object with expressions to execute as event listener.
   * Expressions are evaluated and only one result is taken (and the unsusbcribed).
   * `on` events don't wait for the result of the expression
   * `before` events wait for the expressions result, and may act depending on it.
   *
   * All hooks are evaluated on its own child context, so variables created are not seen
   * at the parent widget and lost after the event.
   * To keep results, assign to `$parentContext` properties.
   */
  events?: AbstractEventsDef;

  /**
   * Child widgets of this widget.
   * It can be an array of Widgets' definitions, which will be included in the `main` content area
   * of this Widget, or a map of slots and widgets to inclued in that slot (for widgets that
   * have multiple child slots).
   * The array of children widget definitions can be of static objects, or a string with an
   * expression that will return the widget definition.
   */
  content?: AbstractContentDef;
}

export interface AbstractOptionsDef {
  [option: string]: any;
}

export interface WidgetDef<
  O extends AbstractOptionsDef = AbstractOptionsDef,
  S extends SlotedContentDef = SlotedContentDef,
  E extends AbstractEventsDef = AbstractEventsDef
> extends AbstractWidgetDef {
  options?: O;

  events?: E;

  content?: S | SimpleContentDef;
}

/**
 * Definition of the content of the widget.
 */
export type AbstractContentDef = SlotedContentDef | SimpleContentDef;

/**
 * Content definition for widgets with a single slot *
 * It is equivalent to a sloted definition with a single `main` slot
 */
export type SimpleContentDef = Array<AbstractWidgetDef | multilineExpr>;
export interface MainSlotContentDef extends SlotedContentDef {
  main: SimpleContentDef;
}

/**
 * Content definition used when the widget has multiple slots where to insert
 * different content.
 */
export interface SlotedContentDef {
  /** The content for the main slot. It must allways be present */
  main: SimpleContentDef;

  /** Optional content for additional slots defined by each widget */
  [extraSlots: string]: SimpleContentDef;
}

/**
 * Input Options common to ALL widgets.
 * They are handled directly by the AbstractBaseWidget
 */
export interface CommonOptionsDef extends AbstractOptionsDef {
  /** class or classes to apply to the widget */
  class: string | string[];
}

/** A `string` with an expression to be evaluated */
export type expr = string;

/**
 * An expression to be evaluated that can optionally be split to be written in multiple lines.
 * It is a convenience feature to allow for line breaks in places as *json* that don't allow spliting long lines.
 *
 * It can be a *normal* single line string, or an *array of strings* that will be joined together by a line break
 * (`\n`) to form a single expression before evaluating.
 */
export type multilineExpr = expr | expr[];

/**
 * Object with expressions to execute as event listener.
 * Expressions are evaluated and only one result is taken (and the unsusbcribed).
 * `on` events don't wait for the result of the expression
 * `before` events wait for the expressions result, and may act depending on it.
 *
 * These are the common events to all widgets, specific widgets may emmit their own specific events
 * (i.e. a button emmits an `onClick` event)
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
export interface AbstractEventsDef {
  /**
   * First event emmited after the widget component is created and before any other actions takes place.
   * Only structural properties (`if` and `for`) are evaluated first, so the widget instance is already created.
   *
   * Any change to the parent context is guaranteed to be visible to any expression bound input property.
   * So it is tipically a place to initialize any variable needed elsewhere in the widget.
   */
  onSetup?: multilineExpr;

  /**
   * Emmited once after all bound input options have been resolved.
   *
   */
  onInit?: multilineExpr;

  /**
   * Emmited once after all bound input options have been resolved after the `onInit` event
   * and on every change of any bound input option
   * This event recieves in the evaluation context `$options` with the current options
   */
  onChanges?: multilineExpr;

  /**
   * Emmited once after the Content definition has been resolved and on any change of the
   * content definition, if it was bound to an expression
   */
  onContentChange?: multilineExpr;

  /**
   * Emmited before the widget is destroyed
   */
  onDestroy?: multilineExpr;

  /**
   * Additionall custom events defined by the widget
   */
  [onCustomEvent: string]: multilineExpr | undefined;
}

export interface FieldEventDef extends AbstractEventsDef {
  onValueChange?: multilineExpr;
}
