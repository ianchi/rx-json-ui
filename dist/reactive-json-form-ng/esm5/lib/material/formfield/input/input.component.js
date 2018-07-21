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
import { Expressions, AbstractFormFieldWidget } from '../../../core/index';
var InputWidgetComponent = /** @class */ (function (_super) {
    tslib_1.__extends(InputWidgetComponent, _super);
    function InputWidgetComponent(cdr, expr) {
        return _super.call(this, cdr, expr) || this;
    }
    InputWidgetComponent.decorators = [
        { type: Component, args: [{
                    selector: 'wdg-input',
                    template: "<mat-form-field style.width=\"100%\">\n\n    <mat-label *ngIf=\"title\">\n        {{ title }}\n    </mat-label>\n\n    <input matInput\n           name=\"aaa\"\n           [type]=\"type || 'text'\"\n           [formControl]=\"formControl\"\n           [placeholder]=\"placeholder\"\n           [required]=\"required\">\n\n    <mat-error [id]=\"null\">\n\n    </mat-error>\n\n    <mat-hint *ngIf=\"description\"\n              [id]=\"null\">\n        {{ description }}\n    </mat-hint>\n\n</mat-form-field>\n",
                    styles: [""],
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush
                },] },
    ];
    /** @nocollapse */
    InputWidgetComponent.ctorParameters = function () { return [
        { type: ChangeDetectorRef },
        { type: Expressions }
    ]; };
    return InputWidgetComponent;
}(AbstractFormFieldWidget));
export { InputWidgetComponent };
function InputWidgetComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    InputWidgetComponent.prototype.title;
    /** @type {?} */
    InputWidgetComponent.prototype.description;
    /** @type {?} */
    InputWidgetComponent.prototype.placeholder;
    /** @type {?} */
    InputWidgetComponent.prototype.required;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5wdXQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vcmVhY3RpdmUtanNvbi1mb3JtLW5nLyIsInNvdXJjZXMiOlsibGliL21hdGVyaWFsL2Zvcm1maWVsZC9pbnB1dC9pbnB1dC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFRQSxPQUFPLEVBQUUsU0FBUyxFQUFFLGlCQUFpQixFQUFFLHVCQUF1QixFQUFFLGlCQUFpQixFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pHLE9BQU8sRUFBRSxXQUFXLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQzs7SUFnQ2pDLGdEQUF1QjtJQU8vRCw4QkFBWSxHQUFzQixFQUFFLElBQWlCO2VBQ25ELGtCQUFNLEdBQUcsRUFBRSxJQUFJLENBQUM7S0FDakI7O2dCQXZDRixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLFdBQVc7b0JBQ3JCLFFBQVEsRUFBRSw2ZkF1Qlg7b0JBQ0MsTUFBTSxFQUFFLENBQUMsRUFBRSxDQUFDO29CQUNaLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO29CQUNyQyxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtpQkFDaEQ7Ozs7Z0JBaEMrRCxpQkFBaUI7Z0JBQ3hFLFdBQVc7OytCQVRwQjtFQXlDMEMsdUJBQXVCO1NBQXBELG9CQUFvQiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDE4IEFkcmlhbiBQYW5lbGxhIDxpYW5jaGk3NEBvdXRsb29rLmNvbT5cbiAqXG4gKiBUaGlzIHNvZnR3YXJlIGlzIHJlbGVhc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS5cbiAqIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvTUlUXG4gKi9cblxuXG5pbXBvcnQgeyBDb21wb25lbnQsIFZpZXdFbmNhcHN1bGF0aW9uLCBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ2hhbmdlRGV0ZWN0b3JSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEV4cHJlc3Npb25zLCBBYnN0cmFjdEZvcm1GaWVsZFdpZGdldCB9IGZyb20gJy4uLy4uLy4uL2NvcmUvaW5kZXgnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICd3ZGctaW5wdXQnLFxuICB0ZW1wbGF0ZTogYDxtYXQtZm9ybS1maWVsZCBzdHlsZS53aWR0aD1cIjEwMCVcIj5cblxuICAgIDxtYXQtbGFiZWwgKm5nSWY9XCJ0aXRsZVwiPlxuICAgICAgICB7eyB0aXRsZSB9fVxuICAgIDwvbWF0LWxhYmVsPlxuXG4gICAgPGlucHV0IG1hdElucHV0XG4gICAgICAgICAgIG5hbWU9XCJhYWFcIlxuICAgICAgICAgICBbdHlwZV09XCJ0eXBlIHx8ICd0ZXh0J1wiXG4gICAgICAgICAgIFtmb3JtQ29udHJvbF09XCJmb3JtQ29udHJvbFwiXG4gICAgICAgICAgIFtwbGFjZWhvbGRlcl09XCJwbGFjZWhvbGRlclwiXG4gICAgICAgICAgIFtyZXF1aXJlZF09XCJyZXF1aXJlZFwiPlxuXG4gICAgPG1hdC1lcnJvciBbaWRdPVwibnVsbFwiPlxuXG4gICAgPC9tYXQtZXJyb3I+XG5cbiAgICA8bWF0LWhpbnQgKm5nSWY9XCJkZXNjcmlwdGlvblwiXG4gICAgICAgICAgICAgIFtpZF09XCJudWxsXCI+XG4gICAgICAgIHt7IGRlc2NyaXB0aW9uIH19XG4gICAgPC9tYXQtaGludD5cblxuPC9tYXQtZm9ybS1maWVsZD5cbmAsXG4gIHN0eWxlczogW2BgXSxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcbn0pXG5leHBvcnQgY2xhc3MgSW5wdXRXaWRnZXRDb21wb25lbnQgZXh0ZW5kcyBBYnN0cmFjdEZvcm1GaWVsZFdpZGdldCB7XG5cbiAgdGl0bGU6IHN0cmluZztcbiAgZGVzY3JpcHRpb246IHN0cmluZztcbiAgcGxhY2Vob2xkZXI6IHN0cmluZztcbiAgcmVxdWlyZWQ6IGJvb2xlYW47XG5cbiAgY29uc3RydWN0b3IoY2RyOiBDaGFuZ2VEZXRlY3RvclJlZiwgZXhwcjogRXhwcmVzc2lvbnMpIHtcbiAgICBzdXBlcihjZHIsIGV4cHIpO1xuICB9XG5cbn1cbiJdfQ==