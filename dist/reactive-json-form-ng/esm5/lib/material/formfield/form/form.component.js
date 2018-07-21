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
import { AbstractWidget, Context, Expressions, FORM_CONTROL } from '../../../core/index';
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9yZWFjdGl2ZS1qc29uLWZvcm0tbmcvIiwic291cmNlcyI6WyJsaWIvbWF0ZXJpYWwvZm9ybWZpZWxkL2Zvcm0vZm9ybS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFPQSxPQUFPLEVBQUUsU0FBUyxFQUFFLGlCQUFpQixFQUFFLHVCQUF1QixFQUFFLGlCQUFpQixFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pHLE9BQU8sRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDdEQsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLFlBQVksQ0FBQztBQUN0QyxPQUFPLEVBQUUsY0FBYyxFQUFjLE9BQU8sRUFBRSxXQUFXLEVBQUUsWUFBWSxFQUFFLE1BQU0scUJBQXFCLENBQUM7O0lBWTVELCtDQUFjO0lBR3JELDZCQUFZLEdBQXNCLEVBQUUsSUFBaUI7ZUFDbkQsa0JBQU0sR0FBRyxFQUFFLElBQUksQ0FBQztLQUNqQjs7Ozs7SUFFRCx3Q0FBVTs7OztJQUFWLFVBQVcsR0FBZTtRQUV4QixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksU0FBUyxDQUFDLEVBQUUsQ0FBQyxDQUFDOztRQUduQyxxQkFBTSxVQUFVLEdBQTBCLElBQUksQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDckUsRUFBRSxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztZQUNmLEVBQUUsQ0FBQyxDQUFDLFVBQVUsWUFBWSxTQUFTLENBQUM7Z0JBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQ3RGLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxVQUFVLFlBQVksU0FBUyxDQUFDO2dCQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1NBQzNFOztRQUdELE9BQU8sQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLE9BQU8sWUFBSSxHQUFDLFlBQVksSUFBRyxJQUFJLENBQUMsU0FBUyxNQUFHLENBQUM7O1FBSXZFLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLEdBQUcsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ3RDLE1BQU0sQ0FBQyxHQUFHLENBQUM7O0tBQ1o7O2dCQW5DRixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLFVBQVU7b0JBQ3BCLFFBQVEsRUFBRSwySEFHWDtvQkFDQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLENBQUM7b0JBQ1osYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7b0JBQ3JDLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO2lCQUNoRDs7OztnQkFkK0QsaUJBQWlCO2dCQUduQyxXQUFXOzs4QkFWekQ7RUFzQnlDLGNBQWM7U0FBMUMsbUJBQW1CIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTggQWRyaWFuIFBhbmVsbGEgPGlhbmNoaTc0QG91dGxvb2suY29tPlxuICpcbiAqIFRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLlxuICogaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9NSVRcbiAqL1xuXG5pbXBvcnQgeyBDb21wb25lbnQsIFZpZXdFbmNhcHN1bGF0aW9uLCBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ2hhbmdlRGV0ZWN0b3JSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZvcm1Hcm91cCwgRm9ybUFycmF5IH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgUnhPYmplY3QgfSBmcm9tICdlc3ByZXNzaW9uJztcbmltcG9ydCB7IEFic3RyYWN0V2lkZ2V0LCBJV2lkZ2V0RGVmLCBDb250ZXh0LCBFeHByZXNzaW9ucywgRk9STV9DT05UUk9MIH0gZnJvbSAnLi4vLi4vLi4vY29yZS9pbmRleCc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3dkZy1mb3JtJyxcbiAgdGVtcGxhdGU6IGA8bmctY29udGFpbmVyICpuZ0Zvcj1cImxldCBlbGVtZW50IG9mIGNvbnRlbnRcIiBbd2RnV2lkZ2V0XT1cImVsZW1lbnRcIiBbcGFyZW50Q29udGV4dF09XCJjb250ZXh0XCI+XG5cbjwvbmctY29udGFpbmVyPlxuYCxcbiAgc3R5bGVzOiBbYGBdLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBGb3JtV2lkZ2V0Q29tcG9uZW50IGV4dGVuZHMgQWJzdHJhY3RXaWRnZXQge1xuXG4gIGZvcm1Hcm91cDogRm9ybUdyb3VwO1xuICBjb25zdHJ1Y3RvcihjZHI6IENoYW5nZURldGVjdG9yUmVmLCBleHByOiBFeHByZXNzaW9ucykge1xuICAgIHN1cGVyKGNkciwgZXhwcik7XG4gIH1cblxuICBkeW5PblNldHVwKGRlZjogSVdpZGdldERlZikge1xuXG4gICAgdGhpcy5mb3JtR3JvdXAgPSBuZXcgRm9ybUdyb3VwKHt9KTtcblxuICAgIC8vIHJlZ2lzdGVyIHdpdGggcGFyZW50IGZvcm0sIGlmIGFueVxuICAgIGNvbnN0IHBhcmVudEZvcm06IEZvcm1Hcm91cCB8IEZvcm1BcnJheSA9IHRoaXMuY29udGV4dFtGT1JNX0NPTlRST0xdO1xuICAgIGlmIChwYXJlbnRGb3JtKSB7XG4gICAgICBpZiAocGFyZW50Rm9ybSBpbnN0YW5jZW9mIEZvcm1Hcm91cCkgcGFyZW50Rm9ybS5hZGRDb250cm9sKCdjb250cm9sJywgdGhpcy5mb3JtR3JvdXApO1xuICAgICAgZWxzZSBpZiAocGFyZW50Rm9ybSBpbnN0YW5jZW9mIEZvcm1BcnJheSkgcGFyZW50Rm9ybS5wdXNoKHRoaXMuZm9ybUdyb3VwKTtcbiAgICB9XG5cbiAgICAvLyBzYXZlIHRoaXMgRm9ybUdyb3VwIGFzIHBhcmVudCBmb3JtIGZvciB0aGUgY2hpbGRyZW5cbiAgICBDb250ZXh0LmRlZmluZUhpZGRlbih0aGlzLmNvbnRleHQsIHsgW0ZPUk1fQ09OVFJPTF06IHRoaXMuZm9ybUdyb3VwIH0pO1xuXG4gICAgLy8gY3JlYXRlIGEgU3RvcmUgZm9yIHRoZSB2YXJpYWJsZXNcblxuICAgIHRoaXMuY29udGV4dFsnJG1vZGVsJ10gPSBSeE9iamVjdCh7fSk7XG4gICAgcmV0dXJuIGRlZjtcbiAgfVxuXG59XG4iXX0=