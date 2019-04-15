/**
 * Copyright (c) 2018 Adrian Panella <ianchi74@outlook.com>
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

export interface IOptionDef {
  // tslint:disable-next-line:no-any
  [prop: string]: any;
}

export interface IBasicWidgetDef {
  /** Type of the Widget to instantiate */
  widget: string;

  /**
   * Optional expression to evaluate when creating the widget.
   * It's async and the result is ignored.
   * Typical use is to initialize context variables visible to all widget options and its children
   * @example
   * onInit: "asyncResult = http.get('someUrl')"
   */
  onInit?: string;
  /**
   * Optional expression to evaluate when creating the widget and wait for it's result.
   * It's sync and the result is ignored.
   * Typical use is to initialize context variables visible to all widget options and its children
   * when the result must be resolved before rendering the widget
   * @example
   * waitFor: "syncResult = http.get('someUrl')"
   */
  waitFor?: string;
  /**
   * Optional expression to evaluate when creating the widget and wait for it's result.
   * It's sync and the result must be truthy to render the widget.
   * If the result changes to falsey, the widget and it's children is destroyed.
   * It's equivalent to `ngIf`
   * @example
   * displayIf: "sate === 'active'"
   */
  displayIf?: string;

  /**
   * Object with attributes to pass to the specific Widget.
   * Keys are specific to each Widget.
   * All keys are allowed to be expression in the form `key=`
   */
  options?: IOptionDef;
  /**
   * Child widget or widgets of this widget.
   */
  content?: IWidgetDef | IWidgetDef[] | string;
}

export interface IFieldWidgetDef extends IBasicWidgetDef {
  bind: string;
}

export interface IFieldGroupWidgetDef extends IFieldWidgetDef, IBasicWidgetDef {
  /**
   * Alias to export *bound object* in child contexts.
   * The idea is to have a path independent access from child to parent
   *
   */

  exportAs?: string;
  /**
   * In array export the current element to child context under this elementfrom children, referencing only the parent level, but not all ancestors
   *
   */

  elementAs?: string;
  /**
   * In array export the current index to child context
   *
   */

  indexAs?: string;
}

/** JSON definition of a widget */
export type IWidgetDef = IFieldGroupWidgetDef | IBasicWidgetDef;
