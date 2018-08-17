/**
 * Copyright (c) 2018 Adrian Panella <ianchi74@outlook.com>
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { IContextDef } from './context';

export interface IOptionDef {
  // tslint:disable-next-line:no-any
  [prop: string]: any;
}
/** JSON definition of a widget */
export interface IWidgetDef {
  /** Type of the Widget to instantiate */
  type: string;
  bind?: string;
  if?: string;
  validate?: string;

  context?: IContextDef;
  contextName?: string;

  /**
   * Object with attributes to pass to the specific Widget.
   * Keys are specific to each Widget
   */
  options?: IOptionDef;

  content?: IWidgetDef | IWidgetDef[];

  class?: { [property: string]: string };
  style?: { [property: string]: string };
}
