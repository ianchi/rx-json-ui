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
import { Expressions, AbstractFormFieldWidget } from '../../../core';
export class CheckboxWidgetComponent extends AbstractFormFieldWidget {
    /**
     * @param {?} cdr
     * @param {?} expr
     */
    constructor(cdr, expr) {
        super(cdr, expr);
    }
}
CheckboxWidgetComponent.decorators = [
    { type: Component, args: [{
                selector: 'wdg-checkbox',
                template: `<mat-checkbox labelPosition="before" [formControl]="formControl">
  {{title}}
</mat-checkbox>
`,
                styles: [``],
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush
            },] },
];
/** @nocollapse */
CheckboxWidgetComponent.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: Expressions }
];
function CheckboxWidgetComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    CheckboxWidgetComponent.prototype.title;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlY2tib3guY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vcmVhY3RpdmUtanNvbi1mb3JtLW5nLyIsInNvdXJjZXMiOlsibGliL21hdGVyaWFsL2Zvcm1maWVsZC9jaGVja2JveC9jaGVja2JveC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQVFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsaUJBQWlCLEVBQUUsdUJBQXVCLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekcsT0FBTyxFQUFFLFdBQVcsRUFBRSx1QkFBdUIsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQVlyRSxNQUFNLDhCQUErQixTQUFRLHVCQUF1Qjs7Ozs7SUFFbEUsWUFBWSxHQUFzQixFQUFFLElBQWlCO1FBQ25ELEtBQUssQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUM7S0FDbEI7OztZQWRGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsY0FBYztnQkFDeEIsUUFBUSxFQUFFOzs7Q0FHWDtnQkFDQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLENBQUM7Z0JBQ1osYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7Z0JBQ3JDLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO2FBQ2hEOzs7O1lBWitELGlCQUFpQjtZQUN4RSxXQUFXIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTggQWRyaWFuIFBhbmVsbGEgPGlhbmNoaTc0QG91dGxvb2suY29tPlxuICpcbiAqIFRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLlxuICogaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9NSVRcbiAqL1xuXG5cbmltcG9ydCB7IENvbXBvbmVudCwgVmlld0VuY2Fwc3VsYXRpb24sIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDaGFuZ2VEZXRlY3RvclJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRXhwcmVzc2lvbnMsIEFic3RyYWN0Rm9ybUZpZWxkV2lkZ2V0IH0gZnJvbSAnLi4vLi4vLi4vY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3dkZy1jaGVja2JveCcsXG4gIHRlbXBsYXRlOiBgPG1hdC1jaGVja2JveCBsYWJlbFBvc2l0aW9uPVwiYmVmb3JlXCIgW2Zvcm1Db250cm9sXT1cImZvcm1Db250cm9sXCI+XG4gIHt7dGl0bGV9fVxuPC9tYXQtY2hlY2tib3g+XG5gLFxuICBzdHlsZXM6IFtgYF0sXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXG59KVxuZXhwb3J0IGNsYXNzIENoZWNrYm94V2lkZ2V0Q29tcG9uZW50IGV4dGVuZHMgQWJzdHJhY3RGb3JtRmllbGRXaWRnZXQge1xuICB0aXRsZTogc3RyaW5nO1xuICBjb25zdHJ1Y3RvcihjZHI6IENoYW5nZURldGVjdG9yUmVmLCBleHByOiBFeHByZXNzaW9ucykge1xuICAgIHN1cGVyKGNkciwgZXhwcik7XG4gIH1cblxufVxuIl19