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
import * as tslib_1 from "tslib";
import { Input } from '@angular/core';
import { of, combineLatest, isObservable } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { Context } from './context';
/**
 * @record
 */
export function IOptionDef() { }
function IOptionDef_tsickle_Closure_declarations() {
    /* TODO: handle strange member:
    [prop: string]: any;
    */
}
/**
 * Base class for all dynamic widget elements
 * @abstract
 */
var AbstractWidget = /** @class */ (function () {
    function AbstractWidget(_cdr, _expr) {
        this._cdr = _cdr;
        this._expr = _expr;
        /**
         * Widget specific options all converted to observables, to unify between *expression* and
         * *constant* notation in the properties definition.
         * Each binding then auto updates the corresponding property in the derived widget.
         */
        this.bindings = {};
        this._subscriptions = [];
    }
    Object.defineProperty(AbstractWidget.prototype, "addSubscription", {
        set: /**
         * @param {?} subs
         * @return {?}
         */
        function (subs) {
            this._subscriptions.push(subs);
        },
        enumerable: true,
        configurable: true
    });
    /** Initialices the widget from a json definition */
    /**
     * Initialices the widget from a json definition
     * @param {?} element
     * @param {?} def
     * @param {?} context
     * @return {?}
     */
    AbstractWidget.prototype.setup = /**
     * Initialices the widget from a json definition
     * @param {?} element
     * @param {?} def
     * @param {?} context
     * @return {?}
     */
    function (element, def, context) {
        def = def || { type: 'none' };
        def.options = def.options || {};
        this.type = def.type || 'none';
        this.element = element;
        console.log("Widget setup " + this.type, this);
        this.context = context;
        this.widgetDef = def = this.dynOnSetup(def) || def;
        this.bindings = parseDefObject(def.options, this.context, true, this._expr);
        this.content = Array.isArray(def.content) ? def.content : typeof def.content === 'object' ? [def.content] : [];
        this.subscribeOptions();
    };
    /**
     * Helper function to add a `map` pipe to the corresponding input observable
     */
    /**
     * Helper function to add a `map` pipe to the corresponding input observable
     * @param {?} option
     * @param {?} callback
     * @return {?}
     */
    AbstractWidget.prototype.map = /**
     * Helper function to add a `map` pipe to the corresponding input observable
     * @param {?} option
     * @param {?} callback
     * @return {?}
     */
    function (option, callback) {
        var /** @type {?} */ opt = this.bindings[option];
        if (opt)
            this.bindings[option] = opt.pipe(map(callback));
    };
    /**
     * Hook to customize the observable bindings befor subscribing.
     * Tipically using the `this.map()` function to add processing to specific options
     */
    /**
     * Hook to customize the observable bindings befor subscribing.
     * Tipically using the `this.map()` function to add processing to specific options
     * @return {?}
     */
    AbstractWidget.prototype.dynOnBeforeBind = /**
     * Hook to customize the observable bindings befor subscribing.
     * Tipically using the `this.map()` function to add processing to specific options
     * @return {?}
     */
    function () { };
    /**
     * @return {?}
     */
    AbstractWidget.prototype.dynOnAfterBind = /**
     * @return {?}
     */
    function () { };
    /** Hook to customize widget definition before procesing it */
    /**
     * Hook to customize widget definition before procesing it
     * @param {?} def
     * @return {?}
     */
    AbstractWidget.prototype.dynOnSetup = /**
     * Hook to customize widget definition before procesing it
     * @param {?} def
     * @return {?}
     */
    function (def) { return def; };
    /**
     * @return {?}
     */
    AbstractWidget.prototype.subscribeOptions = /**
     * @return {?}
     */
    function () {
        var _this = this;
        var /** @type {?} */ observables = [];
        // call hook for cofiguration of options before updating the bound value
        this.dynOnBeforeBind();
        var _loop_1 = function (prop) {
            // tslint:disable-line:forin
            this_1.bindings[prop] = this_1.bindings[prop].pipe(tap(function (res) { return _this[prop] = res; }));
        };
        var this_1 = this;
        for (var /** @type {?} */ prop in this.bindings) {
            _loop_1(prop);
        }
        // call hook after updating the bound value
        this.dynOnAfterBind();
        for (var /** @type {?} */ prop in this.bindings)
            // tslint:disable-line:forin
            observables.push(this.bindings[prop]);
        this.addSubscription = combineLatest(observables).subscribe(function () { return _this._cdr.markForCheck(); });
    };
    /**
     * @return {?}
     */
    AbstractWidget.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this._unsubscribe();
    };
    /**
     * OnChanges is never called on dynamic widget instantiation
     * It is intended to provide the same interface is the widget is used declarative in a template
     * instead of dynamically
     */
    /**
     * OnChanges is never called on dynamic widget instantiation
     * It is intended to provide the same interface is the widget is used declarative in a template
     * instead of dynamically
     * @return {?}
     */
    AbstractWidget.prototype.ngOnChanges = /**
     * OnChanges is never called on dynamic widget instantiation
     * It is intended to provide the same interface is the widget is used declarative in a template
     * instead of dynamically
     * @return {?}
     */
    function () {
        console.log("Widget OnChanges " + this.type, this);
        this._unsubscribe();
        this.setup(null, this.widgetDef, this.context);
    };
    /**
     * @return {?}
     */
    AbstractWidget.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        console.log("Widget OnInit " + this.type, this);
    };
    /**
     * @return {?}
     */
    AbstractWidget.prototype._unsubscribe = /**
     * @return {?}
     */
    function () {
        try {
            for (var _a = tslib_1.__values(this._subscriptions), _b = _a.next(); !_b.done; _b = _a.next()) {
                var subs = _b.value;
                subs.unsubscribe();
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
            }
            finally { if (e_1) throw e_1.error; }
        }
        var e_1, _c;
    };
    AbstractWidget.propDecorators = {
        widgetDef: [{ type: Input }],
        context: [{ type: Input }]
    };
    return AbstractWidget;
}());
export { AbstractWidget };
function AbstractWidget_tsickle_Closure_declarations() {
    /**
     * Configuration of the widget
     * @type {?}
     */
    AbstractWidget.prototype.widgetDef;
    /** @type {?} */
    AbstractWidget.prototype.context;
    /**
     * String identifing the 'type' of the widget
     * @type {?}
     */
    AbstractWidget.prototype.type;
    /**
     * Widget specific options all converted to observables, to unify between *expression* and
     * *constant* notation in the properties definition.
     * Each binding then auto updates the corresponding property in the derived widget.
     * @type {?}
     */
    AbstractWidget.prototype.bindings;
    /**
     * The input configuration of this object
     * @type {?}
     */
    AbstractWidget.prototype.content;
    /** @type {?} */
    AbstractWidget.prototype.element;
    /** @type {?} */
    AbstractWidget.prototype._subscriptions;
    /** @type {?} */
    AbstractWidget.prototype._cdr;
    /** @type {?} */
    AbstractWidget.prototype._expr;
}
/**
 * @param {?} objDef
 * @param {?} context
 * @param {?} asObservable
 * @param {?} expr
 * @return {?}
 */
export function parseDefObject(objDef, context, asObservable, expr) {
    var /** @type {?} */ result = {};
    if (!objDef)
        return null;
    for (var /** @type {?} */ prop in objDef) {
        if (prop.charAt(prop.length - 1) === '=') {
            if (typeof objDef[prop] !== 'string')
                throw new SyntaxError('Binding options must be "string" Iexpressions');
            result[prop.slice(0, prop.length - 1)] = expr.eval(objDef[prop], context, asObservable);
        }
        else
            result[prop] = asObservable && !isObservable(objDef[prop]) ? of(objDef[prop]) : objDef[prop];
    }
    return result;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWJzdHJhY3R3aWRnZXQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9yZWFjdGl2ZS1qc29uLWZvcm0tbmcvIiwic291cmNlcyI6WyJsaWIvY29yZS9hYnN0cmFjdHdpZGdldC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQVFBLE9BQU8sRUFBZ0MsS0FBSyxFQUFxQixNQUFNLGVBQWUsQ0FBQztBQUN2RixPQUFPLEVBQWMsRUFBRSxFQUFnQixhQUFhLEVBQUUsWUFBWSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ2pGLE9BQU8sRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFHMUMsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLFdBQVcsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7O0lBb0NsQyx3QkFBc0IsSUFBdUIsRUFBWSxLQUFrQjtRQUFyRCxTQUFJLEdBQUosSUFBSSxDQUFtQjtRQUFZLFVBQUssR0FBTCxLQUFLLENBQWE7Ozs7Ozt3QkFkM0IsRUFBRTs4QkFXVCxFQUFFO0tBSTFDO0lBUkQsc0JBQUksMkNBQWU7Ozs7O1FBQW5CLFVBQW9CLElBQWtCO1lBQ3BDLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ2hDOzs7T0FBQTtJQVFELG9EQUFvRDs7Ozs7Ozs7SUFDcEQsOEJBQUs7Ozs7Ozs7SUFBTCxVQUFNLE9BQXdCLEVBQUUsR0FBZSxFQUFFLE9BQWdCO1FBQy9ELEdBQUcsR0FBRyxHQUFHLElBQUksRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLENBQUM7UUFDOUIsR0FBRyxDQUFDLE9BQU8sR0FBRyxHQUFHLENBQUMsT0FBTyxJQUFJLEVBQUUsQ0FBQztRQUVoQyxJQUFJLENBQUMsSUFBSSxHQUFHLEdBQUcsQ0FBQyxJQUFJLElBQUksTUFBTSxDQUFDO1FBQy9CLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO1FBRXZCLE9BQU8sQ0FBQyxHQUFHLENBQUMsa0JBQWdC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LFlBQVksQ0FBQyxDQUFDO1NBRXpGO1FBQUMsSUFBSTtZQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxZQUFZLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO0tBQ3JHO0lBQ0QsTUFBTSxDQUFDLE1BQU0sQ0FBQztDQUNmIiwic291cmNlc0NvbnRlbnQiOlsiXG4vKipcbiAqIENvcHlyaWdodCAoYykgMjAxOCBBZHJpYW4gUGFuZWxsYSA8aWFuY2hpNzRAb3V0bG9vay5jb20+XG4gKlxuICogVGhpcyBzb2Z0d2FyZSBpcyByZWxlYXNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuXG4gKiBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL01JVFxuICovXG5cbmltcG9ydCB7IE9uRGVzdHJveSwgQ2hhbmdlRGV0ZWN0b3JSZWYsIElucHV0LCBPbkNoYW5nZXMsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgb2YsIFN1YnNjcmlwdGlvbiwgY29tYmluZUxhdGVzdCwgaXNPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyB0YXAsIG1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IElXaWRnZXREZWYgfSBmcm9tICcuL3dpZGdldC5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgV2lkZ2V0RGlyZWN0aXZlIH0gZnJvbSAnLi93aWRnZXQuZGlyZWN0aXZlJztcbmltcG9ydCB7IENvbnRleHQgfSBmcm9tICcuL2NvbnRleHQnO1xuaW1wb3J0IHsgRXhwcmVzc2lvbnMgfSBmcm9tICcuL2V4cHJlc3Npb25zJztcblxuZXhwb3J0IGludGVyZmFjZSBJT3B0aW9uRGVmIHsgW3Byb3A6IHN0cmluZ106IGFueTsgfVxuXG4vKipcbiAqIEJhc2UgY2xhc3MgZm9yIGFsbCBkeW5hbWljIHdpZGdldCBlbGVtZW50c1xuICovXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgQWJzdHJhY3RXaWRnZXQgaW1wbGVtZW50cyBPbkRlc3Ryb3ksIE9uQ2hhbmdlcywgT25Jbml0IHtcblxuICAvKiogQ29uZmlndXJhdGlvbiBvZiB0aGUgd2lkZ2V0ICovXG4gIEBJbnB1dCgpIHdpZGdldERlZjogSVdpZGdldERlZjtcbiAgQElucHV0KCkgY29udGV4dDogQ29udGV4dDtcblxuICAvKiogU3RyaW5nIGlkZW50aWZpbmcgdGhlICd0eXBlJyBvZiB0aGUgd2lkZ2V0ICovXG4gIHR5cGU6IHN0cmluZztcbiAgLyoqIENvbnRleHQgdG8gdXNlIGZvciBldmFsdWF0aW9ucyBhdCB0aGlzIGxldmVsICovXG5cbiAgLyoqIFdpZGdldCBzcGVjaWZpYyBvcHRpb25zIGFsbCBjb252ZXJ0ZWQgdG8gb2JzZXJ2YWJsZXMsIHRvIHVuaWZ5IGJldHdlZW4gKmV4cHJlc3Npb24qIGFuZFxuICAgKiAqY29uc3RhbnQqIG5vdGF0aW9uIGluIHRoZSBwcm9wZXJ0aWVzIGRlZmluaXRpb24uXG4gICAqIEVhY2ggYmluZGluZyB0aGVuIGF1dG8gdXBkYXRlcyB0aGUgY29ycmVzcG9uZGluZyBwcm9wZXJ0eSBpbiB0aGUgZGVyaXZlZCB3aWRnZXQuXG4gICAqL1xuICBiaW5kaW5nczogeyBbcHJvcDogc3RyaW5nXTogT2JzZXJ2YWJsZTxhbnk+IH0gPSB7fTtcbiAgLyoqIFRoZSBpbnB1dCBjb25maWd1cmF0aW9uIG9mIHRoaXMgb2JqZWN0ICovXG5cbiAgY29udGVudDogSVdpZGdldERlZltdO1xuXG4gIGVsZW1lbnQ6IFdpZGdldERpcmVjdGl2ZTtcblxuICBzZXQgYWRkU3Vic2NyaXB0aW9uKHN1YnM6IFN1YnNjcmlwdGlvbikge1xuICAgIHRoaXMuX3N1YnNjcmlwdGlvbnMucHVzaChzdWJzKTtcbiAgfVxuXG4gIHByaXZhdGUgX3N1YnNjcmlwdGlvbnM6IFN1YnNjcmlwdGlvbltdID0gW107XG5cblxuICBjb25zdHJ1Y3Rvcihwcm90ZWN0ZWQgX2NkcjogQ2hhbmdlRGV0ZWN0b3JSZWYsIHByb3RlY3RlZCBfZXhwcjogRXhwcmVzc2lvbnMpIHtcbiAgfVxuXG4gIC8qKiBJbml0aWFsaWNlcyB0aGUgd2lkZ2V0IGZyb20gYSBqc29uIGRlZmluaXRpb24gKi9cbiAgc2V0dXAoZWxlbWVudDogV2lkZ2V0RGlyZWN0aXZlLCBkZWY6IElXaWRnZXREZWYsIGNvbnRleHQ6IENvbnRleHQpIHtcbiAgICBkZWYgPSBkZWYgfHwgeyB0eXBlOiAnbm9uZScgfTtcbiAgICBkZWYub3B0aW9ucyA9IGRlZi5vcHRpb25zIHx8IHt9O1xuXG4gICAgdGhpcy50eXBlID0gZGVmLnR5cGUgfHwgJ25vbmUnO1xuICAgIHRoaXMuZWxlbWVudCA9IGVsZW1lbnQ7XG5cbiAgICBjb25zb2xlLmxvZyhgV2lkZ2V0IHNldHVwICR7dGhpcy50eXBlfWAsIHRoaXMpO1xuXG4gICAgdGhpcy5jb250ZXh0ID0gY29udGV4dDtcblxuICAgIHRoaXMud2lkZ2V0RGVmID0gZGVmID0gdGhpcy5keW5PblNldHVwKGRlZikgfHwgZGVmO1xuXG4gICAgdGhpcy5iaW5kaW5ncyA9IHBhcnNlRGVmT2JqZWN0KGRlZi5vcHRpb25zLCB0aGlzLmNvbnRleHQsIHRydWUsIHRoaXMuX2V4cHIpO1xuXG4gICAgdGhpcy5jb250ZW50ID0gQXJyYXkuaXNBcnJheShkZWYuY29udGVudCkgPyBkZWYuY29udGVudCA6IHR5cGVvZiBkZWYuY29udGVudCA9PT0gJ29iamVjdCcgPyBbZGVmLmNvbnRlbnRdIDogW107XG5cbiAgICB0aGlzLnN1YnNjcmliZU9wdGlvbnMoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBIZWxwZXIgZnVuY3Rpb24gdG8gYWRkIGEgYG1hcGAgcGlwZSB0byB0aGUgY29ycmVzcG9uZGluZyBpbnB1dCBvYnNlcnZhYmxlXG4gICAqL1xuICBtYXAob3B0aW9uOiBzdHJpbmcsIGNhbGxiYWNrOiAodjogYW55KSA9PiBhbnkpIHtcbiAgICBjb25zdCBvcHQ6IE9ic2VydmFibGU8YW55PiA9IHRoaXMuYmluZGluZ3Nbb3B0aW9uXTtcbiAgICBpZiAob3B0KSB0aGlzLmJpbmRpbmdzW29wdGlvbl0gPSBvcHQucGlwZShtYXAoY2FsbGJhY2spKTtcblxuICB9XG4gIC8qKlxuICAgKiBIb29rIHRvIGN1c3RvbWl6ZSB0aGUgb2JzZXJ2YWJsZSBiaW5kaW5ncyBiZWZvciBzdWJzY3JpYmluZy5cbiAgICogVGlwaWNhbGx5IHVzaW5nIHRoZSBgdGhpcy5tYXAoKWAgZnVuY3Rpb24gdG8gYWRkIHByb2Nlc3NpbmcgdG8gc3BlY2lmaWMgb3B0aW9uc1xuICAgKi9cbiAgZHluT25CZWZvcmVCaW5kKCkgeyB9XG5cbiAgZHluT25BZnRlckJpbmQoKSB7IH1cblxuICAvKiogSG9vayB0byBjdXN0b21pemUgd2lkZ2V0IGRlZmluaXRpb24gYmVmb3JlIHByb2Nlc2luZyBpdCAqL1xuICBkeW5PblNldHVwKGRlZjogSVdpZGdldERlZikgeyByZXR1cm4gZGVmOyB9XG5cbiAgc3Vic2NyaWJlT3B0aW9ucygpIHtcbiAgICBjb25zdCBvYnNlcnZhYmxlcyA9IFtdO1xuXG4gICAgLy8gY2FsbCBob29rIGZvciBjb2ZpZ3VyYXRpb24gb2Ygb3B0aW9ucyBiZWZvcmUgdXBkYXRpbmcgdGhlIGJvdW5kIHZhbHVlXG4gICAgdGhpcy5keW5PbkJlZm9yZUJpbmQoKTtcblxuICAgIGZvciAoY29uc3QgcHJvcCBpbiB0aGlzLmJpbmRpbmdzKSAvLyB0c2xpbnQ6ZGlzYWJsZS1saW5lOmZvcmluXG4gICAgICB0aGlzLmJpbmRpbmdzW3Byb3BdID0gdGhpcy5iaW5kaW5nc1twcm9wXS5waXBlKHRhcChyZXMgPT4gdGhpc1twcm9wXSA9IHJlcykpO1xuXG4gICAgLy8gY2FsbCBob29rIGFmdGVyIHVwZGF0aW5nIHRoZSBib3VuZCB2YWx1ZVxuICAgIHRoaXMuZHluT25BZnRlckJpbmQoKTtcblxuICAgIGZvciAoY29uc3QgcHJvcCBpbiB0aGlzLmJpbmRpbmdzKSAvLyB0c2xpbnQ6ZGlzYWJsZS1saW5lOmZvcmluXG4gICAgICBvYnNlcnZhYmxlcy5wdXNoKHRoaXMuYmluZGluZ3NbcHJvcF0pO1xuXG4gICAgdGhpcy5hZGRTdWJzY3JpcHRpb24gPSBjb21iaW5lTGF0ZXN0KG9ic2VydmFibGVzKS5zdWJzY3JpYmUoKCkgPT4gdGhpcy5fY2RyLm1hcmtGb3JDaGVjaygpKTtcblxuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5fdW5zdWJzY3JpYmUoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBPbkNoYW5nZXMgaXMgbmV2ZXIgY2FsbGVkIG9uIGR5bmFtaWMgd2lkZ2V0IGluc3RhbnRpYXRpb25cbiAgICogSXQgaXMgaW50ZW5kZWQgdG8gcHJvdmlkZSB0aGUgc2FtZSBpbnRlcmZhY2UgaXMgdGhlIHdpZGdldCBpcyB1c2VkIGRlY2xhcmF0aXZlIGluIGEgdGVtcGxhdGVcbiAgICogaW5zdGVhZCBvZiBkeW5hbWljYWxseVxuICAgKi9cbiAgbmdPbkNoYW5nZXMoKSB7XG4gICAgY29uc29sZS5sb2coYFdpZGdldCBPbkNoYW5nZXMgJHt0aGlzLnR5cGV9YCwgdGhpcyk7XG4gICAgdGhpcy5fdW5zdWJzY3JpYmUoKTtcbiAgICB0aGlzLnNldHVwKG51bGwsIHRoaXMud2lkZ2V0RGVmLCB0aGlzLmNvbnRleHQpO1xuICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgY29uc29sZS5sb2coYFdpZGdldCBPbkluaXQgJHt0aGlzLnR5cGV9YCwgdGhpcyk7XG4gIH1cblxuICBwcml2YXRlIF91bnN1YnNjcmliZSgpIHtcbiAgICBmb3IgKGNvbnN0IHN1YnMgb2YgdGhpcy5fc3Vic2NyaXB0aW9ucykgc3Vicy51bnN1YnNjcmliZSgpO1xuICB9XG5cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlRGVmT2JqZWN0KG9iakRlZjogSU9wdGlvbkRlZiwgY29udGV4dDogQ29udGV4dCwgYXNPYnNlcnZhYmxlOiBib29sZWFuLCBleHByOiBFeHByZXNzaW9ucykge1xuXG4gIGNvbnN0IHJlc3VsdDogSU9wdGlvbkRlZiA9IHt9O1xuXG4gIGlmICghb2JqRGVmKSByZXR1cm4gbnVsbDtcblxuICBmb3IgKGNvbnN0IHByb3AgaW4gb2JqRGVmKSB7XG5cbiAgICBpZiAocHJvcC5jaGFyQXQocHJvcC5sZW5ndGggLSAxKSA9PT0gJz0nKSB7XG4gICAgICBpZiAodHlwZW9mIG9iakRlZltwcm9wXSAhPT0gJ3N0cmluZycpIHRocm93IG5ldyBTeW50YXhFcnJvcignQmluZGluZyBvcHRpb25zIG11c3QgYmUgXCJzdHJpbmdcIiBJZXhwcmVzc2lvbnMnKTtcbiAgICAgIHJlc3VsdFtwcm9wLnNsaWNlKDAsIHByb3AubGVuZ3RoIC0gMSldID0gZXhwci5ldmFsKG9iakRlZltwcm9wXSwgY29udGV4dCwgYXNPYnNlcnZhYmxlKTtcblxuICAgIH0gZWxzZSByZXN1bHRbcHJvcF0gPSBhc09ic2VydmFibGUgJiYgIWlzT2JzZXJ2YWJsZShvYmpEZWZbcHJvcF0pID8gb2Yob2JqRGVmW3Byb3BdKSA6IG9iakRlZltwcm9wXTtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuIl19