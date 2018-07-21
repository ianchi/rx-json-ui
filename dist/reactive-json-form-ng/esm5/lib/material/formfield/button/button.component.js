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
import { Component, ViewEncapsulation, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { take } from 'rxjs/operators';
import { isReactive } from 'espression';
import { AbstractWidget, Expressions, } from '../../../core';
var ButtonWidgetComponent = /** @class */ (function (_super) {
    tslib_1.__extends(ButtonWidgetComponent, _super);
    function ButtonWidgetComponent(cdr, expr) {
        return _super.call(this, cdr, expr) || this;
    }
    /**
     * @param {?} def
     * @return {?}
     */
    ButtonWidgetComponent.prototype.dynOnSetup = /**
     * @param {?} def
     * @return {?}
     */
    function (def) {
        if (def.bind) {
            var /** @type {?} */ lvalue = this._expr.lvalue(def.bind, this.context);
            if (!lvalue)
                throw new Error('Form field "bind" property must be an identifier or member expression');
            if (!isReactive(lvalue.o))
                throw new Error('Bound Key must be of Reactive Type');
            this._lvalue = lvalue;
        }
        return def;
    };
    /**
     * @param {?} _event
     * @return {?}
     */
    ButtonWidgetComponent.prototype.clickEvent = /**
     * @param {?} _event
     * @return {?}
     */
    function (_event) {
        var _this = this;
        if (this._clickSubs) {
            this._clickSubs.unsubscribe();
            this._clickSubs = null;
        }
        if (this.click) {
            this._clickSubs = this._expr.eval(this.click, this.context, true).pipe(take(1)).subscribe(function (res) {
                return _this._lvalue.o[_this._lvalue.m] = res;
            });
        }
    };
    ButtonWidgetComponent.decorators = [
        { type: Component, args: [{
                    selector: 'wdg-button',
                    template: "<button mat-button (click)=\"clickEvent($event)\">\n  {{title}}\n</button>\n",
                    styles: [""],
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush
                },] },
    ];
    /** @nocollapse */
    ButtonWidgetComponent.ctorParameters = function () { return [
        { type: ChangeDetectorRef },
        { type: Expressions }
    ]; };
    return ButtonWidgetComponent;
}(AbstractWidget));
export { ButtonWidgetComponent };
function ButtonWidgetComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    ButtonWidgetComponent.prototype.title;
    /** @type {?} */
    ButtonWidgetComponent.prototype.click;
    /** @type {?} */
    ButtonWidgetComponent.prototype._lvalue;
    /** @type {?} */
    ButtonWidgetComponent.prototype._clickSubs;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnV0dG9uLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL3JlYWN0aXZlLWpzb24tZm9ybS1uZy8iLCJzb3VyY2VzIjpbImxpYi9tYXRlcmlhbC9mb3JtZmllbGQvYnV0dG9uL2J1dHRvbi5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFRQSxPQUFPLEVBQUUsU0FBUyxFQUFFLGlCQUFpQixFQUFFLHVCQUF1QixFQUFFLGlCQUFpQixFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRXpHLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUN0QyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sWUFBWSxDQUFDO0FBQ3hDLE9BQU8sRUFBRSxjQUFjLEVBQUUsV0FBVyxHQUFlLE1BQU0sZUFBZSxDQUFDOztJQVk5QixpREFBYztJQU92RCwrQkFBWSxHQUFzQixFQUFFLElBQWlCO2VBQ25ELGtCQUFNLEdBQUcsRUFBRSxJQUFJLENBQUM7S0FDakI7Ozs7O0lBRUQsMENBQVU7Ozs7SUFBVixVQUFXLEdBQWU7UUFFeEIsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7WUFFYixxQkFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7WUFFekQsRUFBRSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUM7Z0JBQ1YsTUFBTSxJQUFJLEtBQUssQ0FBQyx1RUFBdUUsQ0FBQyxDQUFDO1lBRTNGLEVBQUUsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDeEIsTUFBTSxJQUFJLEtBQUssQ0FBQyxvQ0FBb0MsQ0FBQyxDQUFDO1lBRXhELElBQUksQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDO1NBQ3ZCO1FBRUQsTUFBTSxDQUFDLEdBQUcsQ0FBQztLQUNaOzs7OztJQUVELDBDQUFVOzs7O0lBQVYsVUFBVyxNQUFNO1FBQWpCLGlCQVlDO1FBVkMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7WUFDcEIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxXQUFXLEVBQUUsQ0FBQztZQUM5QixJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQztTQUN4QjtRQUVELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQ2YsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUNwRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsVUFBQSxHQUFHO2dCQUNwQixPQUFBLEtBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEtBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRztZQUFwQyxDQUFvQyxDQUFDLENBQUM7U0FDM0M7S0FDRjs7Z0JBbkRGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsWUFBWTtvQkFDdEIsUUFBUSxFQUFFLDhFQUdYO29CQUNDLE1BQU0sRUFBRSxDQUFDLEVBQUUsQ0FBQztvQkFDWixhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtvQkFDckMsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07aUJBQ2hEOzs7O2dCQWYrRCxpQkFBaUI7Z0JBSXhELFdBQVc7O2dDQVpwQztFQXdCMkMsY0FBYztTQUE1QyxxQkFBcUIiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxOCBBZHJpYW4gUGFuZWxsYSA8aWFuY2hpNzRAb3V0bG9vay5jb20+XG4gKlxuICogVGhpcyBzb2Z0d2FyZSBpcyByZWxlYXNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuXG4gKiBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL01JVFxuICovXG5cblxuaW1wb3J0IHsgQ29tcG9uZW50LCBWaWV3RW5jYXBzdWxhdGlvbiwgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENoYW5nZURldGVjdG9yUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IHRha2UgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBpc1JlYWN0aXZlIH0gZnJvbSAnZXNwcmVzc2lvbic7XG5pbXBvcnQgeyBBYnN0cmFjdFdpZGdldCwgRXhwcmVzc2lvbnMsIElXaWRnZXREZWYsIH0gZnJvbSAnLi4vLi4vLi4vY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3dkZy1idXR0b24nLFxuICB0ZW1wbGF0ZTogYDxidXR0b24gbWF0LWJ1dHRvbiAoY2xpY2spPVwiY2xpY2tFdmVudCgkZXZlbnQpXCI+XG4gIHt7dGl0bGV9fVxuPC9idXR0b24+XG5gLFxuICBzdHlsZXM6IFtgYF0sXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXG59KVxuZXhwb3J0IGNsYXNzIEJ1dHRvbldpZGdldENvbXBvbmVudCBleHRlbmRzIEFic3RyYWN0V2lkZ2V0IHtcblxuICB0aXRsZTogc3RyaW5nO1xuICBjbGljazogc3RyaW5nO1xuXG4gIHByaXZhdGUgX2x2YWx1ZTogeyBvLCBtIH07XG4gIHByaXZhdGUgX2NsaWNrU3ViczogU3Vic2NyaXB0aW9uO1xuICBjb25zdHJ1Y3RvcihjZHI6IENoYW5nZURldGVjdG9yUmVmLCBleHByOiBFeHByZXNzaW9ucykge1xuICAgIHN1cGVyKGNkciwgZXhwcik7XG4gIH1cblxuICBkeW5PblNldHVwKGRlZjogSVdpZGdldERlZikge1xuXG4gICAgaWYgKGRlZi5iaW5kKSB7XG5cbiAgICAgIGNvbnN0IGx2YWx1ZSA9IHRoaXMuX2V4cHIubHZhbHVlKGRlZi5iaW5kLCB0aGlzLmNvbnRleHQpO1xuXG4gICAgICBpZiAoIWx2YWx1ZSlcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdGb3JtIGZpZWxkIFwiYmluZFwiIHByb3BlcnR5IG11c3QgYmUgYW4gaWRlbnRpZmllciBvciBtZW1iZXIgZXhwcmVzc2lvbicpO1xuXG4gICAgICBpZiAoIWlzUmVhY3RpdmUobHZhbHVlLm8pKVxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0JvdW5kIEtleSBtdXN0IGJlIG9mIFJlYWN0aXZlIFR5cGUnKTtcblxuICAgICAgdGhpcy5fbHZhbHVlID0gbHZhbHVlO1xuICAgIH1cblxuICAgIHJldHVybiBkZWY7XG4gIH1cblxuICBjbGlja0V2ZW50KF9ldmVudCkge1xuXG4gICAgaWYgKHRoaXMuX2NsaWNrU3Vicykge1xuICAgICAgdGhpcy5fY2xpY2tTdWJzLnVuc3Vic2NyaWJlKCk7XG4gICAgICB0aGlzLl9jbGlja1N1YnMgPSBudWxsO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmNsaWNrKSB7XG4gICAgICB0aGlzLl9jbGlja1N1YnMgPSB0aGlzLl9leHByLmV2YWwodGhpcy5jbGljaywgdGhpcy5jb250ZXh0LCB0cnVlKS5waXBlKFxuICAgICAgICB0YWtlKDEpKS5zdWJzY3JpYmUocmVzID0+XG4gICAgICAgICAgdGhpcy5fbHZhbHVlLm9bdGhpcy5fbHZhbHVlLm1dID0gcmVzKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==