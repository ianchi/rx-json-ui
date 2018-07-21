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
export class InputWidgetComponent extends AbstractFormFieldWidget {
    /**
     * @param {?} cdr
     * @param {?} expr
     */
    constructor(cdr, expr) {
        super(cdr, expr);
    }
}
InputWidgetComponent.decorators = [
    { type: Component, args: [{
                selector: 'wdg-input',
                template: `<mat-form-field style.width="100%">

    <mat-label *ngIf="title">
        {{ title }}
    </mat-label>

    <input matInput
           name="aaa"
           [type]="type || 'text'"
           [formControl]="formControl"
           [placeholder]="placeholder"
           [required]="required">

    <mat-error [id]="null">

    </mat-error>

    <mat-hint *ngIf="description"
              [id]="null">
        {{ description }}
    </mat-hint>

</mat-form-field>
`,
                styles: [``],
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush
            },] },
];
/** @nocollapse */
InputWidgetComponent.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: Expressions }
];
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5wdXQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vcmVhY3RpdmUtanNvbi1mb3JtLW5nLyIsInNvdXJjZXMiOlsibGliL21hdGVyaWFsL2Zvcm1maWVsZC9pbnB1dC9pbnB1dC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQVFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsaUJBQWlCLEVBQUUsdUJBQXVCLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekcsT0FBTyxFQUFFLFdBQVcsRUFBRSx1QkFBdUIsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQWdDckUsTUFBTSwyQkFBNEIsU0FBUSx1QkFBdUI7Ozs7O0lBTy9ELFlBQVksR0FBc0IsRUFBRSxJQUFpQjtRQUNuRCxLQUFLLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDO0tBQ2xCOzs7WUF2Q0YsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxXQUFXO2dCQUNyQixRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0NBdUJYO2dCQUNDLE1BQU0sRUFBRSxDQUFDLEVBQUUsQ0FBQztnQkFDWixhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtnQkFDckMsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07YUFDaEQ7Ozs7WUFoQytELGlCQUFpQjtZQUN4RSxXQUFXIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTggQWRyaWFuIFBhbmVsbGEgPGlhbmNoaTc0QG91dGxvb2suY29tPlxuICpcbiAqIFRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLlxuICogaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9NSVRcbiAqL1xuXG5cbmltcG9ydCB7IENvbXBvbmVudCwgVmlld0VuY2Fwc3VsYXRpb24sIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDaGFuZ2VEZXRlY3RvclJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRXhwcmVzc2lvbnMsIEFic3RyYWN0Rm9ybUZpZWxkV2lkZ2V0IH0gZnJvbSAnLi4vLi4vLi4vY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3dkZy1pbnB1dCcsXG4gIHRlbXBsYXRlOiBgPG1hdC1mb3JtLWZpZWxkIHN0eWxlLndpZHRoPVwiMTAwJVwiPlxuXG4gICAgPG1hdC1sYWJlbCAqbmdJZj1cInRpdGxlXCI+XG4gICAgICAgIHt7IHRpdGxlIH19XG4gICAgPC9tYXQtbGFiZWw+XG5cbiAgICA8aW5wdXQgbWF0SW5wdXRcbiAgICAgICAgICAgbmFtZT1cImFhYVwiXG4gICAgICAgICAgIFt0eXBlXT1cInR5cGUgfHwgJ3RleHQnXCJcbiAgICAgICAgICAgW2Zvcm1Db250cm9sXT1cImZvcm1Db250cm9sXCJcbiAgICAgICAgICAgW3BsYWNlaG9sZGVyXT1cInBsYWNlaG9sZGVyXCJcbiAgICAgICAgICAgW3JlcXVpcmVkXT1cInJlcXVpcmVkXCI+XG5cbiAgICA8bWF0LWVycm9yIFtpZF09XCJudWxsXCI+XG5cbiAgICA8L21hdC1lcnJvcj5cblxuICAgIDxtYXQtaGludCAqbmdJZj1cImRlc2NyaXB0aW9uXCJcbiAgICAgICAgICAgICAgW2lkXT1cIm51bGxcIj5cbiAgICAgICAge3sgZGVzY3JpcHRpb24gfX1cbiAgICA8L21hdC1oaW50PlxuXG48L21hdC1mb3JtLWZpZWxkPlxuYCxcbiAgc3R5bGVzOiBbYGBdLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBJbnB1dFdpZGdldENvbXBvbmVudCBleHRlbmRzIEFic3RyYWN0Rm9ybUZpZWxkV2lkZ2V0IHtcblxuICB0aXRsZTogc3RyaW5nO1xuICBkZXNjcmlwdGlvbjogc3RyaW5nO1xuICBwbGFjZWhvbGRlcjogc3RyaW5nO1xuICByZXF1aXJlZDogYm9vbGVhbjtcblxuICBjb25zdHJ1Y3RvcihjZHI6IENoYW5nZURldGVjdG9yUmVmLCBleHByOiBFeHByZXNzaW9ucykge1xuICAgIHN1cGVyKGNkciwgZXhwcik7XG4gIH1cblxufVxuIl19