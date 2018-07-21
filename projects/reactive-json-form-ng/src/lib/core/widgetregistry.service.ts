/**
 * Copyright (c) 2018 Adrian Panella <ianchi74@outlook.com>
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Type, Inject, InjectionToken, Injectable } from '@angular/core';
import { AbstractWidget } from './abstractwidget';
import { DefaultWidgetComponent } from './defaultwidget.component';

export const AF_CONFIG_TOKEN = new InjectionToken<IAutoFormConfig>('AF_CONFIG_TOKEN');


export interface IWidgetConf {
  type: string;
  component: Type<AbstractWidget>;
}

export interface IAutoFormConfig {
  widgets?: IWidgetConf[] | IWidgetConf;
}

@Injectable({
  providedIn: 'root'
})
export class WidgetRegistry {

  private _registry = new Map<string, Type<AbstractWidget>>();

  private _default: Type<AbstractWidget>;


  constructor(@Inject(AF_CONFIG_TOKEN) configs: IAutoFormConfig[] = []) {

    configs.forEach(conf => conf.widgets && this.register(conf.widgets));

    this._default = this._registry.get('default') || DefaultWidgetComponent;
  }

  register(widgets: IWidgetConf[] | IWidgetConf) {
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
