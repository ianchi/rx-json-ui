/**
 * Copyright (c) 2018 Adrian Panella <ianchi74@outlook.com>
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Inject, Injectable, InjectionToken, Type } from '@angular/core';

import { AbstractWidget } from './base/abstractwidget';
import { DefaultWidgetComponent } from './defaultwidget.component';

export const AF_CONFIG_TOKEN = new InjectionToken<AutoFormConfig[]>('AF_CONFIG_TOKEN');

export interface WidgetConf {
  type: string;
  component: Type<AbstractWidget>;
}

export interface AutoFormConfig {
  widgets?: WidgetConf[] | WidgetConf;
}

@Injectable({
  providedIn: 'root',
})
export class WidgetRegistry {
  private _registry = new Map<string, Type<AbstractWidget>>();

  private _default: Type<AbstractWidget>;

  constructor(@Inject(AF_CONFIG_TOKEN) configs: AutoFormConfig[] = []) {
    configs.forEach(conf => conf.widgets && this.register(conf.widgets));

    this._default = this._registry.get('default') || DefaultWidgetComponent;
  }

  register(widgets: WidgetConf[] | WidgetConf): void {
    if (!widgets) return;
    if (!Array.isArray(widgets)) widgets = [widgets];

    widgets.forEach(widget => {
      if (widget.type && widget.component) this._registry.set(widget.type, widget.component);
    });
  }

  get(type: string): Type<AbstractWidget> {
    return this._registry.get(type) || this._default;
  }
}
