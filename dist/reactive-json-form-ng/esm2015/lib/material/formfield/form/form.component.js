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
import { Component, ViewEncapsulation, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormArray } from '@angular/forms';
import { RxObject } from 'espression';
import { AbstractWidget, Context, Expressions, FORM_CONTROL } from '../../../core/index';
export class FormWidgetComponent extends AbstractWidget {
    /**
     * @param {?} cdr
     * @param {?} expr
     */
    constructor(cdr, expr) {
        super(cdr, expr);
    }
    /**
     * @param {?} def
     * @return {?}
     */
    dynOnSetup(def) {
        this.formGroup = new FormGroup({});
        // register with parent form, if any
        const /** @type {?} */ parentForm = this.context[FORM_CONTROL];
        if (parentForm) {
            if (parentForm instanceof FormGroup)
                parentForm.addControl('control', this.formGroup);
            else if (parentForm instanceof FormArray)
                parentForm.push(this.formGroup);
        }
        // save this FormGroup as parent form for the children
        Context.defineHidden(this.context, { [FORM_CONTROL]: this.formGroup });
        // create a Store for the variables
        this.context['$model'] = RxObject({});
        return def;
    }
}
FormWidgetComponent.decorators = [
    { type: Component, args: [{
                selector: 'wdg-form',
                template: `<ng-container *ngFor="let element of content" [wdgWidget]="element" [parentContext]="context">

</ng-container>
`,
                styles: [``],
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush
            },] },
];
/** @nocollapse */
FormWidgetComponent.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: Expressions }
];
function FormWidgetComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    FormWidgetComponent.prototype.formGroup;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9yZWFjdGl2ZS1qc29uLWZvcm0tbmcvIiwic291cmNlcyI6WyJsaWIvbWF0ZXJpYWwvZm9ybWZpZWxkL2Zvcm0vZm9ybS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQU9BLE9BQU8sRUFBRSxTQUFTLEVBQUUsaUJBQWlCLEVBQUUsdUJBQXVCLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekcsT0FBTyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUN0RCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sWUFBWSxDQUFDO0FBQ3RDLE9BQU8sRUFBRSxjQUFjLEVBQWMsT0FBTyxFQUFFLFdBQVcsRUFBRSxZQUFZLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQVlyRyxNQUFNLDBCQUEyQixTQUFRLGNBQWM7Ozs7O0lBR3JELFlBQVksR0FBc0IsRUFBRSxJQUFpQjtRQUNuRCxLQUFLLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDO0tBQ2xCOzs7OztJQUVELFVBQVUsQ0FBQyxHQUFlO1FBRXhCLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxTQUFTLENBQUMsRUFBRSxDQUFDLENBQUM7O1FBR25DLHVCQUFNLFVBQVUsR0FBMEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUNyRSxFQUFFLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO1lBQ2YsRUFBRSxDQUFDLENBQUMsVUFBVSxZQUFZLFNBQVMsQ0FBQztnQkFBQyxVQUFVLENBQUMsVUFBVSxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDdEYsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLFVBQVUsWUFBWSxTQUFTLENBQUM7Z0JBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7U0FDM0U7O1FBR0QsT0FBTyxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLEVBQUUsQ0FBQyxZQUFZLENBQUMsRUFBRSxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQzs7UUFJdkUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsR0FBRyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDdEMsTUFBTSxDQUFDLEdBQUcsQ0FBQztLQUNaOzs7WUFuQ0YsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxVQUFVO2dCQUNwQixRQUFRLEVBQUU7OztDQUdYO2dCQUNDLE1BQU0sRUFBRSxDQUFDLEVBQUUsQ0FBQztnQkFDWixhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtnQkFDckMsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07YUFDaEQ7Ozs7WUFkK0QsaUJBQWlCO1lBR25DLFdBQVciLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxOCBBZHJpYW4gUGFuZWxsYSA8aWFuY2hpNzRAb3V0bG9vay5jb20+XG4gKlxuICogVGhpcyBzb2Z0d2FyZSBpcyByZWxlYXNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuXG4gKiBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL01JVFxuICovXG5cbmltcG9ydCB7IENvbXBvbmVudCwgVmlld0VuY2Fwc3VsYXRpb24sIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDaGFuZ2VEZXRlY3RvclJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRm9ybUdyb3VwLCBGb3JtQXJyYXkgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBSeE9iamVjdCB9IGZyb20gJ2VzcHJlc3Npb24nO1xuaW1wb3J0IHsgQWJzdHJhY3RXaWRnZXQsIElXaWRnZXREZWYsIENvbnRleHQsIEV4cHJlc3Npb25zLCBGT1JNX0NPTlRST0wgfSBmcm9tICcuLi8uLi8uLi9jb3JlL2luZGV4JztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnd2RnLWZvcm0nLFxuICB0ZW1wbGF0ZTogYDxuZy1jb250YWluZXIgKm5nRm9yPVwibGV0IGVsZW1lbnQgb2YgY29udGVudFwiIFt3ZGdXaWRnZXRdPVwiZWxlbWVudFwiIFtwYXJlbnRDb250ZXh0XT1cImNvbnRleHRcIj5cblxuPC9uZy1jb250YWluZXI+XG5gLFxuICBzdHlsZXM6IFtgYF0sXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXG59KVxuZXhwb3J0IGNsYXNzIEZvcm1XaWRnZXRDb21wb25lbnQgZXh0ZW5kcyBBYnN0cmFjdFdpZGdldCB7XG5cbiAgZm9ybUdyb3VwOiBGb3JtR3JvdXA7XG4gIGNvbnN0cnVjdG9yKGNkcjogQ2hhbmdlRGV0ZWN0b3JSZWYsIGV4cHI6IEV4cHJlc3Npb25zKSB7XG4gICAgc3VwZXIoY2RyLCBleHByKTtcbiAgfVxuXG4gIGR5bk9uU2V0dXAoZGVmOiBJV2lkZ2V0RGVmKSB7XG5cbiAgICB0aGlzLmZvcm1Hcm91cCA9IG5ldyBGb3JtR3JvdXAoe30pO1xuXG4gICAgLy8gcmVnaXN0ZXIgd2l0aCBwYXJlbnQgZm9ybSwgaWYgYW55XG4gICAgY29uc3QgcGFyZW50Rm9ybTogRm9ybUdyb3VwIHwgRm9ybUFycmF5ID0gdGhpcy5jb250ZXh0W0ZPUk1fQ09OVFJPTF07XG4gICAgaWYgKHBhcmVudEZvcm0pIHtcbiAgICAgIGlmIChwYXJlbnRGb3JtIGluc3RhbmNlb2YgRm9ybUdyb3VwKSBwYXJlbnRGb3JtLmFkZENvbnRyb2woJ2NvbnRyb2wnLCB0aGlzLmZvcm1Hcm91cCk7XG4gICAgICBlbHNlIGlmIChwYXJlbnRGb3JtIGluc3RhbmNlb2YgRm9ybUFycmF5KSBwYXJlbnRGb3JtLnB1c2godGhpcy5mb3JtR3JvdXApO1xuICAgIH1cblxuICAgIC8vIHNhdmUgdGhpcyBGb3JtR3JvdXAgYXMgcGFyZW50IGZvcm0gZm9yIHRoZSBjaGlsZHJlblxuICAgIENvbnRleHQuZGVmaW5lSGlkZGVuKHRoaXMuY29udGV4dCwgeyBbRk9STV9DT05UUk9MXTogdGhpcy5mb3JtR3JvdXAgfSk7XG5cbiAgICAvLyBjcmVhdGUgYSBTdG9yZSBmb3IgdGhlIHZhcmlhYmxlc1xuXG4gICAgdGhpcy5jb250ZXh0WyckbW9kZWwnXSA9IFJ4T2JqZWN0KHt9KTtcbiAgICByZXR1cm4gZGVmO1xuICB9XG5cbn1cbiJdfQ==