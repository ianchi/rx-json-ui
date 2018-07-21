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
import { Expressions, AbstractFormFieldWidget } from '../../../core';
var CheckboxWidgetComponent = /** @class */ (function (_super) {
    tslib_1.__extends(CheckboxWidgetComponent, _super);
    function CheckboxWidgetComponent(cdr, expr) {
        return _super.call(this, cdr, expr) || this;
    }
    CheckboxWidgetComponent.decorators = [
        { type: Component, args: [{
                    selector: 'wdg-checkbox',
                    template: "<mat-checkbox labelPosition=\"before\" [formControl]=\"formControl\">\n  {{title}}\n</mat-checkbox>\n",
                    styles: [""],
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush
                },] },
    ];
    /** @nocollapse */
    CheckboxWidgetComponent.ctorParameters = function () { return [
        { type: ChangeDetectorRef },
        { type: Expressions }
    ]; };
    return CheckboxWidgetComponent;
}(AbstractFormFieldWidget));
export { CheckboxWidgetComponent };
function CheckboxWidgetComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    CheckboxWidgetComponent.prototype.title;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlY2tib3guY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vcmVhY3RpdmUtanNvbi1mb3JtLW5nLyIsInNvdXJjZXMiOlsibGliL21hdGVyaWFsL2Zvcm1maWVsZC9jaGVja2JveC9jaGVja2JveC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFRQSxPQUFPLEVBQUUsU0FBUyxFQUFFLGlCQUFpQixFQUFFLHVCQUF1QixFQUFFLGlCQUFpQixFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pHLE9BQU8sRUFBRSxXQUFXLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSxlQUFlLENBQUM7O0lBWXhCLG1EQUF1QjtJQUVsRSxpQ0FBWSxHQUFzQixFQUFFLElBQWlCO2VBQ25ELGtCQUFNLEdBQUcsRUFBRSxJQUFJLENBQUM7S0FDakI7O2dCQWRGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsY0FBYztvQkFDeEIsUUFBUSxFQUFFLHVHQUdYO29CQUNDLE1BQU0sRUFBRSxDQUFDLEVBQUUsQ0FBQztvQkFDWixhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtvQkFDckMsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07aUJBQ2hEOzs7O2dCQVorRCxpQkFBaUI7Z0JBQ3hFLFdBQVc7O2tDQVRwQjtFQXFCNkMsdUJBQXVCO1NBQXZELHVCQUF1QiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDE4IEFkcmlhbiBQYW5lbGxhIDxpYW5jaGk3NEBvdXRsb29rLmNvbT5cbiAqXG4gKiBUaGlzIHNvZnR3YXJlIGlzIHJlbGVhc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS5cbiAqIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvTUlUXG4gKi9cblxuXG5pbXBvcnQgeyBDb21wb25lbnQsIFZpZXdFbmNhcHN1bGF0aW9uLCBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ2hhbmdlRGV0ZWN0b3JSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEV4cHJlc3Npb25zLCBBYnN0cmFjdEZvcm1GaWVsZFdpZGdldCB9IGZyb20gJy4uLy4uLy4uL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICd3ZGctY2hlY2tib3gnLFxuICB0ZW1wbGF0ZTogYDxtYXQtY2hlY2tib3ggbGFiZWxQb3NpdGlvbj1cImJlZm9yZVwiIFtmb3JtQ29udHJvbF09XCJmb3JtQ29udHJvbFwiPlxuICB7e3RpdGxlfX1cbjwvbWF0LWNoZWNrYm94PlxuYCxcbiAgc3R5bGVzOiBbYGBdLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBDaGVja2JveFdpZGdldENvbXBvbmVudCBleHRlbmRzIEFic3RyYWN0Rm9ybUZpZWxkV2lkZ2V0IHtcbiAgdGl0bGU6IHN0cmluZztcbiAgY29uc3RydWN0b3IoY2RyOiBDaGFuZ2VEZXRlY3RvclJlZiwgZXhwcjogRXhwcmVzc2lvbnMpIHtcbiAgICBzdXBlcihjZHIsIGV4cHIpO1xuICB9XG5cbn1cbiJdfQ==