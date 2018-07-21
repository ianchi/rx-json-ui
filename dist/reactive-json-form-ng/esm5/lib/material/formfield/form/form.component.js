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
import { FormGroup, FormArray } from '@angular/forms';
import { RxObject } from 'espression';
import { AbstractWidget, Context, Expressions, FORM_CONTROL } from '../../../core';
var FormWidgetComponent = /** @class */ (function (_super) {
    tslib_1.__extends(FormWidgetComponent, _super);
    function FormWidgetComponent(cdr, expr) {
        return _super.call(this, cdr, expr) || this;
    }
    /**
     * @param {?} def
     * @return {?}
     */
    FormWidgetComponent.prototype.dynOnSetup = /**
     * @param {?} def
     * @return {?}
     */
    function (def) {
        this.formGroup = new FormGroup({});
        // register with parent form, if any
        var /** @type {?} */ parentForm = this.context[FORM_CONTROL];
        if (parentForm) {
            if (parentForm instanceof FormGroup)
                parentForm.addControl('control', this.formGroup);
            else if (parentForm instanceof FormArray)
                parentForm.push(this.formGroup);
        }
        // save this FormGroup as parent form for the children
        Context.defineHidden(this.context, (_a = {}, _a[FORM_CONTROL] = this.formGroup, _a));
        // create a Store for the variables
        this.context['$model'] = RxObject({});
        return def;
        var _a;
    };
    FormWidgetComponent.decorators = [
        { type: Component, args: [{
                    selector: 'wdg-form',
                    template: "<ng-container *ngFor=\"let element of content\" [wdgWidget]=\"element\" [parentContext]=\"context\">\n\n</ng-container>\n",
                    styles: [""],
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush
                },] },
    ];
    /** @nocollapse */
    FormWidgetComponent.ctorParameters = function () { return [
        { type: ChangeDetectorRef },
        { type: Expressions }
    ]; };
    return FormWidgetComponent;
}(AbstractWidget));
export { FormWidgetComponent };
function FormWidgetComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    FormWidgetComponent.prototype.formGroup;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9yZWFjdGl2ZS1qc29uLWZvcm0tbmcvIiwic291cmNlcyI6WyJsaWIvbWF0ZXJpYWwvZm9ybWZpZWxkL2Zvcm0vZm9ybS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFPQSxPQUFPLEVBQUUsU0FBUyxFQUFFLGlCQUFpQixFQUFFLHVCQUF1QixFQUFFLGlCQUFpQixFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pHLE9BQU8sRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDdEQsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLFlBQVksQ0FBQztBQUN0QyxPQUFPLEVBQUUsY0FBYyxFQUFjLE9BQU8sRUFBRSxXQUFXLEVBQUUsWUFBWSxFQUFFLE1BQU0sZUFBZSxDQUFDOztJQVl0RCwrQ0FBYztJQUdyRCw2QkFBWSxHQUFzQixFQUFFLElBQWlCO2VBQ25ELGtCQUFNLEdBQUcsRUFBRSxJQUFJLENBQUM7S0FDakI7Ozs7O0lBRUQsd0NBQVU7Ozs7SUFBVixVQUFXLEdBQWU7UUFFeEIsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLFNBQVMsQ0FBQyxFQUFFLENBQUMsQ0FBQzs7UUFHbkMscUJBQU0sVUFBVSxHQUEwQixJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQ3JFLEVBQUUsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7WUFDZixFQUFFLENBQUMsQ0FBQyxVQUFVLFlBQVksU0FBUyxDQUFDO2dCQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUN0RixJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsVUFBVSxZQUFZLFNBQVMsQ0FBQztnQkFBQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztTQUMzRTs7UUFHRCxPQUFPLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxPQUFPLFlBQUksR0FBQyxZQUFZLElBQUcsSUFBSSxDQUFDLFNBQVMsTUFBRyxDQUFDOztRQUl2RSxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUN0QyxNQUFNLENBQUMsR0FBRyxDQUFDOztLQUNaOztnQkFuQ0YsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxVQUFVO29CQUNwQixRQUFRLEVBQUUsMkhBR1g7b0JBQ0MsTUFBTSxFQUFFLENBQUMsRUFBRSxDQUFDO29CQUNaLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO29CQUNyQyxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtpQkFDaEQ7Ozs7Z0JBZCtELGlCQUFpQjtnQkFHbkMsV0FBVzs7OEJBVnpEO0VBc0J5QyxjQUFjO1NBQTFDLG1CQUFtQiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDE4IEFkcmlhbiBQYW5lbGxhIDxpYW5jaGk3NEBvdXRsb29rLmNvbT5cbiAqXG4gKiBUaGlzIHNvZnR3YXJlIGlzIHJlbGVhc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS5cbiAqIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvTUlUXG4gKi9cblxuaW1wb3J0IHsgQ29tcG9uZW50LCBWaWV3RW5jYXBzdWxhdGlvbiwgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENoYW5nZURldGVjdG9yUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGb3JtR3JvdXAsIEZvcm1BcnJheSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IFJ4T2JqZWN0IH0gZnJvbSAnZXNwcmVzc2lvbic7XG5pbXBvcnQgeyBBYnN0cmFjdFdpZGdldCwgSVdpZGdldERlZiwgQ29udGV4dCwgRXhwcmVzc2lvbnMsIEZPUk1fQ09OVFJPTCB9IGZyb20gJy4uLy4uLy4uL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICd3ZGctZm9ybScsXG4gIHRlbXBsYXRlOiBgPG5nLWNvbnRhaW5lciAqbmdGb3I9XCJsZXQgZWxlbWVudCBvZiBjb250ZW50XCIgW3dkZ1dpZGdldF09XCJlbGVtZW50XCIgW3BhcmVudENvbnRleHRdPVwiY29udGV4dFwiPlxuXG48L25nLWNvbnRhaW5lcj5cbmAsXG4gIHN0eWxlczogW2BgXSxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcbn0pXG5leHBvcnQgY2xhc3MgRm9ybVdpZGdldENvbXBvbmVudCBleHRlbmRzIEFic3RyYWN0V2lkZ2V0IHtcblxuICBmb3JtR3JvdXA6IEZvcm1Hcm91cDtcbiAgY29uc3RydWN0b3IoY2RyOiBDaGFuZ2VEZXRlY3RvclJlZiwgZXhwcjogRXhwcmVzc2lvbnMpIHtcbiAgICBzdXBlcihjZHIsIGV4cHIpO1xuICB9XG5cbiAgZHluT25TZXR1cChkZWY6IElXaWRnZXREZWYpIHtcblxuICAgIHRoaXMuZm9ybUdyb3VwID0gbmV3IEZvcm1Hcm91cCh7fSk7XG5cbiAgICAvLyByZWdpc3RlciB3aXRoIHBhcmVudCBmb3JtLCBpZiBhbnlcbiAgICBjb25zdCBwYXJlbnRGb3JtOiBGb3JtR3JvdXAgfCBGb3JtQXJyYXkgPSB0aGlzLmNvbnRleHRbRk9STV9DT05UUk9MXTtcbiAgICBpZiAocGFyZW50Rm9ybSkge1xuICAgICAgaWYgKHBhcmVudEZvcm0gaW5zdGFuY2VvZiBGb3JtR3JvdXApIHBhcmVudEZvcm0uYWRkQ29udHJvbCgnY29udHJvbCcsIHRoaXMuZm9ybUdyb3VwKTtcbiAgICAgIGVsc2UgaWYgKHBhcmVudEZvcm0gaW5zdGFuY2VvZiBGb3JtQXJyYXkpIHBhcmVudEZvcm0ucHVzaCh0aGlzLmZvcm1Hcm91cCk7XG4gICAgfVxuXG4gICAgLy8gc2F2ZSB0aGlzIEZvcm1Hcm91cCBhcyBwYXJlbnQgZm9ybSBmb3IgdGhlIGNoaWxkcmVuXG4gICAgQ29udGV4dC5kZWZpbmVIaWRkZW4odGhpcy5jb250ZXh0LCB7IFtGT1JNX0NPTlRST0xdOiB0aGlzLmZvcm1Hcm91cCB9KTtcblxuICAgIC8vIGNyZWF0ZSBhIFN0b3JlIGZvciB0aGUgdmFyaWFibGVzXG5cbiAgICB0aGlzLmNvbnRleHRbJyRtb2RlbCddID0gUnhPYmplY3Qoe30pO1xuICAgIHJldHVybiBkZWY7XG4gIH1cblxufVxuIl19