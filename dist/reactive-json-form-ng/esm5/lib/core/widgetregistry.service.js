/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Copyright (c) 2018 Adrian Panella <ianchi74@outlook.com>
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */
import { Inject, InjectionToken, Injectable } from '@angular/core';
import { DefaultWidgetComponent } from './defaultwidget.component';
import * as i0 from "@angular/core";
export var /** @type {?} */ AF_CONFIG_TOKEN = new InjectionToken('AF_CONFIG_TOKEN');
/**
 * @record
 */
export function IWidgetConf() { }
function IWidgetConf_tsickle_Closure_declarations() {
    /** @type {?} */
    IWidgetConf.prototype.type;
    /** @type {?} */
    IWidgetConf.prototype.component;
}
/**
 * @record
 */
export function IAutoFormConfig() { }
function IAutoFormConfig_tsickle_Closure_declarations() {
    /** @type {?|undefined} */
    IAutoFormConfig.prototype.widgets;
}
var WidgetRegistry = /** @class */ (function () {
    function WidgetRegistry(configs) {
        if (configs === void 0) { configs = []; }
        var _this = this;
        this._registry = new Map();
        configs.forEach(function (conf) { return conf.widgets && _this.register(conf.widgets); });
        this._default = this._registry.get('default') || DefaultWidgetComponent;
    }
    /**
     * @param {?} widgets
     * @return {?}
     */
    WidgetRegistry.prototype.register = /**
     * @param {?} widgets
     * @return {?}
     */
    function (widgets) {
        var _this = this;
        if (!widgets)
            return;
        if (!Array.isArray(widgets))
            widgets = [widgets];
        widgets.forEach(function (widget) {
            if (widget.type && widget.component)
                _this._registry.set(widget.type, widget.component);
        });
    };
    /**
     * @param {?} type
     * @return {?}
     */
    WidgetRegistry.prototype.get = /**
     * @param {?} type
     * @return {?}
     */
    function (type) {
        return this._registry.get(type) || this._default;
    };
    WidgetRegistry.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] },
    ];
    /** @nocollapse */
    WidgetRegistry.ctorParameters = function () { return [
        { type: Array, decorators: [{ type: Inject, args: [AF_CONFIG_TOKEN,] }] }
    ]; };
    /** @nocollapse */ WidgetRegistry.ngInjectableDef = i0.defineInjectable({ factory: function WidgetRegistry_Factory() { return new WidgetRegistry(i0.inject(AF_CONFIG_TOKEN)); }, token: WidgetRegistry, providedIn: "root" });
    return WidgetRegistry;
}());
export { WidgetRegistry };
function WidgetRegistry_tsickle_Closure_declarations() {
    /** @type {?} */
    WidgetRegistry.prototype._registry;
    /** @type {?} */
    WidgetRegistry.prototype._default;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2lkZ2V0cmVnaXN0cnkuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL3JlYWN0aXZlLWpzb24tZm9ybS1uZy8iLCJzb3VyY2VzIjpbImxpYi9jb3JlL3dpZGdldHJlZ2lzdHJ5LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQU9BLE9BQU8sRUFBUSxNQUFNLEVBQUUsY0FBYyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUV6RSxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQzs7QUFFbkUsTUFBTSxDQUFDLHFCQUFNLGVBQWUsR0FBRyxJQUFJLGNBQWMsQ0FBa0IsaUJBQWlCLENBQUMsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFzQnBGLHdCQUFxQyxPQUErQjtRQUF4RCx3QkFBQSxFQUFBLFlBQXdEO1FBQXBFLGlCQUtDO3lCQVZtQixJQUFJLEdBQUcsRUFBZ0M7UUFPekQsT0FBTyxDQUFDLE9BQU8sQ0FBQyxVQUFBLElBQUksSUFBSSxPQUFBLElBQUksQ0FBQyxPQUFPLElBQUksS0FBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEVBQTNDLENBQTJDLENBQUMsQ0FBQztRQUVyRSxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxJQUFJLHNCQUFzQixDQUFDO0tBQ3pFOzs7OztJQUVELGlDQUFROzs7O0lBQVIsVUFBUyxPQUFvQztRQUE3QyxpQkFPQztRQU5DLEVBQUUsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDO1lBQUMsTUFBTSxDQUFDO1FBQ3JCLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUFDLE9BQU8sR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBRWpELE9BQU8sQ0FBQyxPQUFPLENBQUMsVUFBQSxNQUFNO1lBQ3BCLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLElBQUksTUFBTSxDQUFDLFNBQVMsQ0FBQztnQkFBQyxLQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQztTQUN4RixDQUFDLENBQUM7S0FDSjs7Ozs7SUFLRCw0QkFBRzs7OztJQUFILFVBQUksSUFBWTtRQUNkLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDO0tBQ2xEOztnQkEvQkYsVUFBVSxTQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQjs7Ozs0Q0FRYyxNQUFNLFNBQUMsZUFBZTs7O3lCQWpDckM7O1NBMEJhLGNBQWMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxOCBBZHJpYW4gUGFuZWxsYSA8aWFuY2hpNzRAb3V0bG9vay5jb20+XG4gKlxuICogVGhpcyBzb2Z0d2FyZSBpcyByZWxlYXNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuXG4gKiBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL01JVFxuICovXG5cbmltcG9ydCB7IFR5cGUsIEluamVjdCwgSW5qZWN0aW9uVG9rZW4sIEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEFic3RyYWN0V2lkZ2V0IH0gZnJvbSAnLi9hYnN0cmFjdHdpZGdldCc7XG5pbXBvcnQgeyBEZWZhdWx0V2lkZ2V0Q29tcG9uZW50IH0gZnJvbSAnLi9kZWZhdWx0d2lkZ2V0LmNvbXBvbmVudCc7XG5cbmV4cG9ydCBjb25zdCBBRl9DT05GSUdfVE9LRU4gPSBuZXcgSW5qZWN0aW9uVG9rZW48SUF1dG9Gb3JtQ29uZmlnPignQUZfQ09ORklHX1RPS0VOJyk7XG5cblxuZXhwb3J0IGludGVyZmFjZSBJV2lkZ2V0Q29uZiB7XG4gIHR5cGU6IHN0cmluZztcbiAgY29tcG9uZW50OiBUeXBlPEFic3RyYWN0V2lkZ2V0Pjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBJQXV0b0Zvcm1Db25maWcge1xuICB3aWRnZXRzPzogSVdpZGdldENvbmZbXSB8IElXaWRnZXRDb25mO1xufVxuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBXaWRnZXRSZWdpc3RyeSB7XG5cbiAgcHJpdmF0ZSBfcmVnaXN0cnkgPSBuZXcgTWFwPHN0cmluZywgVHlwZTxBYnN0cmFjdFdpZGdldD4+KCk7XG5cbiAgcHJpdmF0ZSBfZGVmYXVsdDogVHlwZTxBYnN0cmFjdFdpZGdldD47XG5cblxuICBjb25zdHJ1Y3RvcihASW5qZWN0KEFGX0NPTkZJR19UT0tFTikgY29uZmlnczogSUF1dG9Gb3JtQ29uZmlnW10gPSBbXSkge1xuXG4gICAgY29uZmlncy5mb3JFYWNoKGNvbmYgPT4gY29uZi53aWRnZXRzICYmIHRoaXMucmVnaXN0ZXIoY29uZi53aWRnZXRzKSk7XG5cbiAgICB0aGlzLl9kZWZhdWx0ID0gdGhpcy5fcmVnaXN0cnkuZ2V0KCdkZWZhdWx0JykgfHwgRGVmYXVsdFdpZGdldENvbXBvbmVudDtcbiAgfVxuXG4gIHJlZ2lzdGVyKHdpZGdldHM6IElXaWRnZXRDb25mW10gfCBJV2lkZ2V0Q29uZikge1xuICAgIGlmICghd2lkZ2V0cykgcmV0dXJuO1xuICAgIGlmICghQXJyYXkuaXNBcnJheSh3aWRnZXRzKSkgd2lkZ2V0cyA9IFt3aWRnZXRzXTtcblxuICAgIHdpZGdldHMuZm9yRWFjaCh3aWRnZXQgPT4ge1xuICAgICAgaWYgKHdpZGdldC50eXBlICYmIHdpZGdldC5jb21wb25lbnQpIHRoaXMuX3JlZ2lzdHJ5LnNldCh3aWRnZXQudHlwZSwgd2lkZ2V0LmNvbXBvbmVudCk7XG4gICAgfSk7XG4gIH1cblxuXG5cblxuICBnZXQodHlwZTogc3RyaW5nKTogVHlwZTxBYnN0cmFjdFdpZGdldD4ge1xuICAgIHJldHVybiB0aGlzLl9yZWdpc3RyeS5nZXQodHlwZSkgfHwgdGhpcy5fZGVmYXVsdDtcbiAgfVxuXG59XG4iXX0=