/**
 * Copyright (c) 2018 Adrian Panella <ianchi74@outlook.com>
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */
import { Type, InjectionToken } from '@angular/core';
import { AbstractWidget } from './abstractwidget';
export declare const AF_CONFIG_TOKEN: InjectionToken<IAutoFormConfig>;
export interface IWidgetConf {
    type: string;
    component: Type<AbstractWidget>;
}
export interface IAutoFormConfig {
    widgets?: IWidgetConf[] | IWidgetConf;
}
export declare class WidgetRegistry {
    private _registry;
    private _default;
    constructor(configs?: IAutoFormConfig[]);
    register(widgets: IWidgetConf[] | IWidgetConf): void;
    get(type: string): Type<AbstractWidget>;
}
