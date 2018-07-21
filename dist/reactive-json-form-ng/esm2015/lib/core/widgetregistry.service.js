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
export const /** @type {?} */ AF_CONFIG_TOKEN = new InjectionToken('AF_CONFIG_TOKEN');
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
export class WidgetRegistry {
    /**
     * @param {?=} configs
     */
    constructor(configs = []) {
        this._registry = new Map();
        configs.forEach(conf => conf.widgets && this.register(conf.widgets));
        this._default = this._registry.get('default') || DefaultWidgetComponent;
    }
    /**
     * @param {?} widgets
     * @return {?}
     */
    register(widgets) {
        if (!widgets)
            return;
        if (!Array.isArray(widgets))
            widgets = [widgets];
        widgets.forEach(widget => {
            if (widget.type && widget.component)
                this._registry.set(widget.type, widget.component);
        });
    }
    /**
     * @param {?} type
     * @return {?}
     */
    get(type) {
        return this._registry.get(type) || this._default;
    }
}
WidgetRegistry.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] },
];
/** @nocollapse */
WidgetRegistry.ctorParameters = () => [
    { type: Array, decorators: [{ type: Inject, args: [AF_CONFIG_TOKEN,] }] }
];
/** @nocollapse */ WidgetRegistry.ngInjectableDef = i0.defineInjectable({ factory: function WidgetRegistry_Factory() { return new WidgetRegistry(i0.inject(AF_CONFIG_TOKEN)); }, token: WidgetRegistry, providedIn: "root" });
function WidgetRegistry_tsickle_Closure_declarations() {
    /** @type {?} */
    WidgetRegistry.prototype._registry;
    /** @type {?} */
    WidgetRegistry.prototype._default;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2lkZ2V0cmVnaXN0cnkuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL3JlYWN0aXZlLWpzb24tZm9ybS1uZy8iLCJzb3VyY2VzIjpbImxpYi9jb3JlL3dpZGdldHJlZ2lzdHJ5LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQU9BLE9BQU8sRUFBUSxNQUFNLEVBQUUsY0FBYyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUV6RSxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQzs7QUFFbkUsTUFBTSxDQUFDLHVCQUFNLGVBQWUsR0FBRyxJQUFJLGNBQWMsQ0FBa0IsaUJBQWlCLENBQUMsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQWV0RixNQUFNOzs7O0lBT0osWUFBcUMsVUFBNkIsRUFBRTt5QkFMaEQsSUFBSSxHQUFHLEVBQWdDO1FBT3pELE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsT0FBTyxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7UUFFckUsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsSUFBSSxzQkFBc0IsQ0FBQztLQUN6RTs7Ozs7SUFFRCxRQUFRLENBQUMsT0FBb0M7UUFDM0MsRUFBRSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUM7WUFBQyxNQUFNLENBQUM7UUFDckIsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQUMsT0FBTyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7UUFFakQsT0FBTyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsRUFBRTtZQUN2QixFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxJQUFJLE1BQU0sQ0FBQyxTQUFTLENBQUM7Z0JBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUM7U0FDeEYsQ0FBQyxDQUFDO0tBQ0o7Ozs7O0lBS0QsR0FBRyxDQUFDLElBQVk7UUFDZCxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQztLQUNsRDs7O1lBL0JGLFVBQVUsU0FBQztnQkFDVixVQUFVLEVBQUUsTUFBTTthQUNuQjs7Ozt3Q0FRYyxNQUFNLFNBQUMsZUFBZSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDE4IEFkcmlhbiBQYW5lbGxhIDxpYW5jaGk3NEBvdXRsb29rLmNvbT5cbiAqXG4gKiBUaGlzIHNvZnR3YXJlIGlzIHJlbGVhc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS5cbiAqIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvTUlUXG4gKi9cblxuaW1wb3J0IHsgVHlwZSwgSW5qZWN0LCBJbmplY3Rpb25Ub2tlbiwgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQWJzdHJhY3RXaWRnZXQgfSBmcm9tICcuL2Fic3RyYWN0d2lkZ2V0JztcbmltcG9ydCB7IERlZmF1bHRXaWRnZXRDb21wb25lbnQgfSBmcm9tICcuL2RlZmF1bHR3aWRnZXQuY29tcG9uZW50JztcblxuZXhwb3J0IGNvbnN0IEFGX0NPTkZJR19UT0tFTiA9IG5ldyBJbmplY3Rpb25Ub2tlbjxJQXV0b0Zvcm1Db25maWc+KCdBRl9DT05GSUdfVE9LRU4nKTtcblxuXG5leHBvcnQgaW50ZXJmYWNlIElXaWRnZXRDb25mIHtcbiAgdHlwZTogc3RyaW5nO1xuICBjb21wb25lbnQ6IFR5cGU8QWJzdHJhY3RXaWRnZXQ+O1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIElBdXRvRm9ybUNvbmZpZyB7XG4gIHdpZGdldHM/OiBJV2lkZ2V0Q29uZltdIHwgSVdpZGdldENvbmY7XG59XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIFdpZGdldFJlZ2lzdHJ5IHtcblxuICBwcml2YXRlIF9yZWdpc3RyeSA9IG5ldyBNYXA8c3RyaW5nLCBUeXBlPEFic3RyYWN0V2lkZ2V0Pj4oKTtcblxuICBwcml2YXRlIF9kZWZhdWx0OiBUeXBlPEFic3RyYWN0V2lkZ2V0PjtcblxuXG4gIGNvbnN0cnVjdG9yKEBJbmplY3QoQUZfQ09ORklHX1RPS0VOKSBjb25maWdzOiBJQXV0b0Zvcm1Db25maWdbXSA9IFtdKSB7XG5cbiAgICBjb25maWdzLmZvckVhY2goY29uZiA9PiBjb25mLndpZGdldHMgJiYgdGhpcy5yZWdpc3Rlcihjb25mLndpZGdldHMpKTtcblxuICAgIHRoaXMuX2RlZmF1bHQgPSB0aGlzLl9yZWdpc3RyeS5nZXQoJ2RlZmF1bHQnKSB8fCBEZWZhdWx0V2lkZ2V0Q29tcG9uZW50O1xuICB9XG5cbiAgcmVnaXN0ZXIod2lkZ2V0czogSVdpZGdldENvbmZbXSB8IElXaWRnZXRDb25mKSB7XG4gICAgaWYgKCF3aWRnZXRzKSByZXR1cm47XG4gICAgaWYgKCFBcnJheS5pc0FycmF5KHdpZGdldHMpKSB3aWRnZXRzID0gW3dpZGdldHNdO1xuXG4gICAgd2lkZ2V0cy5mb3JFYWNoKHdpZGdldCA9PiB7XG4gICAgICBpZiAod2lkZ2V0LnR5cGUgJiYgd2lkZ2V0LmNvbXBvbmVudCkgdGhpcy5fcmVnaXN0cnkuc2V0KHdpZGdldC50eXBlLCB3aWRnZXQuY29tcG9uZW50KTtcbiAgICB9KTtcbiAgfVxuXG5cblxuXG4gIGdldCh0eXBlOiBzdHJpbmcpOiBUeXBlPEFic3RyYWN0V2lkZ2V0PiB7XG4gICAgcmV0dXJuIHRoaXMuX3JlZ2lzdHJ5LmdldCh0eXBlKSB8fCB0aGlzLl9kZWZhdWx0O1xuICB9XG5cbn1cbiJdfQ==