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
import { AbstractWidget, Context, Expressions, FORM_CONTROL } from '../../../core';
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9yZWFjdGl2ZS1qc29uLWZvcm0tbmcvIiwic291cmNlcyI6WyJsaWIvbWF0ZXJpYWwvZm9ybWZpZWxkL2Zvcm0vZm9ybS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQU9BLE9BQU8sRUFBRSxTQUFTLEVBQUUsaUJBQWlCLEVBQUUsdUJBQXVCLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekcsT0FBTyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUN0RCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sWUFBWSxDQUFDO0FBQ3RDLE9BQU8sRUFBRSxjQUFjLEVBQWMsT0FBTyxFQUFFLFdBQVcsRUFBRSxZQUFZLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFZL0YsTUFBTSwwQkFBMkIsU0FBUSxjQUFjOzs7OztJQUdyRCxZQUFZLEdBQXNCLEVBQUUsSUFBaUI7UUFDbkQsS0FBSyxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQztLQUNsQjs7Ozs7SUFFRCxVQUFVLENBQUMsR0FBZTtRQUV4QixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksU0FBUyxDQUFDLEVBQUUsQ0FBQyxDQUFDOztRQUduQyx1QkFBTSxVQUFVLEdBQTBCLElBQUksQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDckUsRUFBRSxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztZQUNmLEVBQUUsQ0FBQyxDQUFDLFVBQVUsWUFBWSxTQUFTLENBQUM7Z0JBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQ3RGLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxVQUFVLFlBQVksU0FBUyxDQUFDO2dCQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1NBQzNFOztRQUdELE9BQU8sQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxFQUFFLENBQUMsWUFBWSxDQUFDLEVBQUUsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDLENBQUM7O1FBSXZFLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLEdBQUcsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ3RDLE1BQU0sQ0FBQyxHQUFHLENBQUM7S0FDWjs7O1lBbkNGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsVUFBVTtnQkFDcEIsUUFBUSxFQUFFOzs7Q0FHWDtnQkFDQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLENBQUM7Z0JBQ1osYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7Z0JBQ3JDLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO2FBQ2hEOzs7O1lBZCtELGlCQUFpQjtZQUduQyxXQUFXIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTggQWRyaWFuIFBhbmVsbGEgPGlhbmNoaTc0QG91dGxvb2suY29tPlxuICpcbiAqIFRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLlxuICogaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9NSVRcbiAqL1xuXG5pbXBvcnQgeyBDb21wb25lbnQsIFZpZXdFbmNhcHN1bGF0aW9uLCBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ2hhbmdlRGV0ZWN0b3JSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZvcm1Hcm91cCwgRm9ybUFycmF5IH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgUnhPYmplY3QgfSBmcm9tICdlc3ByZXNzaW9uJztcbmltcG9ydCB7IEFic3RyYWN0V2lkZ2V0LCBJV2lkZ2V0RGVmLCBDb250ZXh0LCBFeHByZXNzaW9ucywgRk9STV9DT05UUk9MIH0gZnJvbSAnLi4vLi4vLi4vY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3dkZy1mb3JtJyxcbiAgdGVtcGxhdGU6IGA8bmctY29udGFpbmVyICpuZ0Zvcj1cImxldCBlbGVtZW50IG9mIGNvbnRlbnRcIiBbd2RnV2lkZ2V0XT1cImVsZW1lbnRcIiBbcGFyZW50Q29udGV4dF09XCJjb250ZXh0XCI+XG5cbjwvbmctY29udGFpbmVyPlxuYCxcbiAgc3R5bGVzOiBbYGBdLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBGb3JtV2lkZ2V0Q29tcG9uZW50IGV4dGVuZHMgQWJzdHJhY3RXaWRnZXQge1xuXG4gIGZvcm1Hcm91cDogRm9ybUdyb3VwO1xuICBjb25zdHJ1Y3RvcihjZHI6IENoYW5nZURldGVjdG9yUmVmLCBleHByOiBFeHByZXNzaW9ucykge1xuICAgIHN1cGVyKGNkciwgZXhwcik7XG4gIH1cblxuICBkeW5PblNldHVwKGRlZjogSVdpZGdldERlZikge1xuXG4gICAgdGhpcy5mb3JtR3JvdXAgPSBuZXcgRm9ybUdyb3VwKHt9KTtcblxuICAgIC8vIHJlZ2lzdGVyIHdpdGggcGFyZW50IGZvcm0sIGlmIGFueVxuICAgIGNvbnN0IHBhcmVudEZvcm06IEZvcm1Hcm91cCB8IEZvcm1BcnJheSA9IHRoaXMuY29udGV4dFtGT1JNX0NPTlRST0xdO1xuICAgIGlmIChwYXJlbnRGb3JtKSB7XG4gICAgICBpZiAocGFyZW50Rm9ybSBpbnN0YW5jZW9mIEZvcm1Hcm91cCkgcGFyZW50Rm9ybS5hZGRDb250cm9sKCdjb250cm9sJywgdGhpcy5mb3JtR3JvdXApO1xuICAgICAgZWxzZSBpZiAocGFyZW50Rm9ybSBpbnN0YW5jZW9mIEZvcm1BcnJheSkgcGFyZW50Rm9ybS5wdXNoKHRoaXMuZm9ybUdyb3VwKTtcbiAgICB9XG5cbiAgICAvLyBzYXZlIHRoaXMgRm9ybUdyb3VwIGFzIHBhcmVudCBmb3JtIGZvciB0aGUgY2hpbGRyZW5cbiAgICBDb250ZXh0LmRlZmluZUhpZGRlbih0aGlzLmNvbnRleHQsIHsgW0ZPUk1fQ09OVFJPTF06IHRoaXMuZm9ybUdyb3VwIH0pO1xuXG4gICAgLy8gY3JlYXRlIGEgU3RvcmUgZm9yIHRoZSB2YXJpYWJsZXNcblxuICAgIHRoaXMuY29udGV4dFsnJG1vZGVsJ10gPSBSeE9iamVjdCh7fSk7XG4gICAgcmV0dXJuIGRlZjtcbiAgfVxuXG59XG4iXX0=