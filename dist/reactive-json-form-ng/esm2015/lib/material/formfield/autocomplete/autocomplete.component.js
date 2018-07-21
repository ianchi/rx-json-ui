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
import { map, startWith } from 'rxjs/operators';
import { Expressions, AbstractFormFieldWidget } from '../../../core';
export class AutocompleteWidgetComponent extends AbstractFormFieldWidget {
    /**
     * @param {?} cdr
     * @param {?} expr
     */
    constructor(cdr, expr) {
        super(cdr, expr);
        this.enum = [];
    }
    /**
     * @return {?}
     */
    dynOnBeforeBind() {
        this.map('enum', val => {
            return Array.isArray(val) ? val : [];
        });
    }
    /**
     * @return {?}
     */
    dynOnAfterBind() {
        this.map('enum', val => (this._filter(this.formControl.value), val));
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        super.ngOnInit();
        this.filteredOptions = this.formControl.valueChanges
            .pipe(startWith(''), map(value => this._filter(value)));
    }
    /**
     * @param {?} value
     * @return {?}
     */
    _filter(value) {
        const /** @type {?} */ filterValue = value && value.toLowerCase();
        return this.enum.filter(option => option.toLowerCase().includes(filterValue));
    }
}
AutocompleteWidgetComponent.decorators = [
    { type: Component, args: [{
                selector: 'wdg-autocomplete',
                template: `<mat-form-field style.width="100%">

  <mat-label *ngIf="title">
    {{ title }}
  </mat-label>

  <input matInput name="aaa" [type]="type || 'text'" [formControl]="formControl" [placeholder]="placeholder"
    [matAutocomplete]="auto">

  <mat-error [id]="null">

  </mat-error>

  <mat-hint *ngIf="description" [id]="null">
    {{ description }}
  </mat-hint>

  <mat-autocomplete #auto="matAutocomplete">
    <mat-option *ngFor="let option of filteredOptions | async; index as optIndex" [value]="option">
      {{option}}
    </mat-option>
  </mat-autocomplete>

</mat-form-field>
`,
                styles: [``],
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush
            },] },
];
/** @nocollapse */
AutocompleteWidgetComponent.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: Expressions }
];
function AutocompleteWidgetComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    AutocompleteWidgetComponent.prototype.title;
    /** @type {?} */
    AutocompleteWidgetComponent.prototype.description;
    /** @type {?} */
    AutocompleteWidgetComponent.prototype.placeholder;
    /** @type {?} */
    AutocompleteWidgetComponent.prototype.enum;
    /** @type {?} */
    AutocompleteWidgetComponent.prototype.enumLabel;
    /** @type {?} */
    AutocompleteWidgetComponent.prototype.filteredOptions;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0b2NvbXBsZXRlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL3JlYWN0aXZlLWpzb24tZm9ybS1uZy8iLCJzb3VyY2VzIjpbImxpYi9tYXRlcmlhbC9mb3JtZmllbGQvYXV0b2NvbXBsZXRlL2F1dG9jb21wbGV0ZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQU9BLE9BQU8sRUFBRSxTQUFTLEVBQUUsaUJBQWlCLEVBQUUsdUJBQXVCLEVBQUUsaUJBQWlCLEVBQVUsTUFBTSxlQUFlLENBQUM7QUFFakgsT0FBTyxFQUFFLEdBQUcsRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNoRCxPQUFPLEVBQUUsV0FBVyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sZUFBZSxDQUFDO0FBaUNyRSxNQUFNLGtDQUFtQyxTQUFRLHVCQUF1Qjs7Ozs7SUFTdEUsWUFBWSxHQUFzQixFQUFFLElBQWlCO1FBQ25ELEtBQUssQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUM7b0JBSkYsRUFBRTtLQUtsQjs7OztJQUlELGVBQWU7UUFDYixJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsRUFBRTtZQUNyQixNQUFNLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7U0FDdEMsQ0FBQyxDQUFDO0tBQ0o7Ozs7SUFFRCxjQUFjO1FBQ1osSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDO0tBQ3RFOzs7O0lBQ0QsUUFBUTtRQUNOLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUVqQixJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsWUFBWTthQUNqRCxJQUFJLENBQ0gsU0FBUyxDQUFDLEVBQUUsQ0FBQyxFQUNiLEdBQUcsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FDbEMsQ0FBQztLQUNMOzs7OztJQUVPLE9BQU8sQ0FBQyxLQUFhO1FBRTNCLHVCQUFNLFdBQVcsR0FBRyxLQUFLLElBQUksS0FBSyxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBRWpELE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxXQUFXLEVBQUUsQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQzs7OztZQXJFakYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxrQkFBa0I7Z0JBQzVCLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0NBd0JYO2dCQUNDLE1BQU0sRUFBRSxDQUFDLEVBQUUsQ0FBQztnQkFDWixhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtnQkFDckMsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07YUFDaEQ7Ozs7WUFuQytELGlCQUFpQjtZQUd4RSxXQUFXIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTggQWRyaWFuIFBhbmVsbGEgPGlhbmNoaTc0QG91dGxvb2suY29tPlxuICpcbiAqIFRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLlxuICogaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9NSVRcbiAqL1xuXG5pbXBvcnQgeyBDb21wb25lbnQsIFZpZXdFbmNhcHN1bGF0aW9uLCBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ2hhbmdlRGV0ZWN0b3JSZWYsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgbWFwLCBzdGFydFdpdGggfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBFeHByZXNzaW9ucywgQWJzdHJhY3RGb3JtRmllbGRXaWRnZXQgfSBmcm9tICcuLi8uLi8uLi9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnd2RnLWF1dG9jb21wbGV0ZScsXG4gIHRlbXBsYXRlOiBgPG1hdC1mb3JtLWZpZWxkIHN0eWxlLndpZHRoPVwiMTAwJVwiPlxuXG4gIDxtYXQtbGFiZWwgKm5nSWY9XCJ0aXRsZVwiPlxuICAgIHt7IHRpdGxlIH19XG4gIDwvbWF0LWxhYmVsPlxuXG4gIDxpbnB1dCBtYXRJbnB1dCBuYW1lPVwiYWFhXCIgW3R5cGVdPVwidHlwZSB8fCAndGV4dCdcIiBbZm9ybUNvbnRyb2xdPVwiZm9ybUNvbnRyb2xcIiBbcGxhY2Vob2xkZXJdPVwicGxhY2Vob2xkZXJcIlxuICAgIFttYXRBdXRvY29tcGxldGVdPVwiYXV0b1wiPlxuXG4gIDxtYXQtZXJyb3IgW2lkXT1cIm51bGxcIj5cblxuICA8L21hdC1lcnJvcj5cblxuICA8bWF0LWhpbnQgKm5nSWY9XCJkZXNjcmlwdGlvblwiIFtpZF09XCJudWxsXCI+XG4gICAge3sgZGVzY3JpcHRpb24gfX1cbiAgPC9tYXQtaGludD5cblxuICA8bWF0LWF1dG9jb21wbGV0ZSAjYXV0bz1cIm1hdEF1dG9jb21wbGV0ZVwiPlxuICAgIDxtYXQtb3B0aW9uICpuZ0Zvcj1cImxldCBvcHRpb24gb2YgZmlsdGVyZWRPcHRpb25zIHwgYXN5bmM7IGluZGV4IGFzIG9wdEluZGV4XCIgW3ZhbHVlXT1cIm9wdGlvblwiPlxuICAgICAge3tvcHRpb259fVxuICAgIDwvbWF0LW9wdGlvbj5cbiAgPC9tYXQtYXV0b2NvbXBsZXRlPlxuXG48L21hdC1mb3JtLWZpZWxkPlxuYCxcbiAgc3R5bGVzOiBbYGBdLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBBdXRvY29tcGxldGVXaWRnZXRDb21wb25lbnQgZXh0ZW5kcyBBYnN0cmFjdEZvcm1GaWVsZFdpZGdldCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgdGl0bGU6IHN0cmluZztcbiAgZGVzY3JpcHRpb246IHN0cmluZztcbiAgcGxhY2Vob2xkZXI6IHN0cmluZztcblxuICBlbnVtOiBzdHJpbmdbXSA9IFtdO1xuICBlbnVtTGFiZWw6IHN0cmluZ1tdO1xuICBmaWx0ZXJlZE9wdGlvbnM6IE9ic2VydmFibGU8c3RyaW5nW10+O1xuICBjb25zdHJ1Y3RvcihjZHI6IENoYW5nZURldGVjdG9yUmVmLCBleHByOiBFeHByZXNzaW9ucykge1xuICAgIHN1cGVyKGNkciwgZXhwcik7XG4gIH1cblxuXG5cbiAgZHluT25CZWZvcmVCaW5kKCkge1xuICAgIHRoaXMubWFwKCdlbnVtJywgdmFsID0+IHtcbiAgICAgIHJldHVybiBBcnJheS5pc0FycmF5KHZhbCkgPyB2YWwgOiBbXTtcbiAgICB9KTtcbiAgfVxuXG4gIGR5bk9uQWZ0ZXJCaW5kKCkge1xuICAgIHRoaXMubWFwKCdlbnVtJywgdmFsID0+ICh0aGlzLl9maWx0ZXIodGhpcy5mb3JtQ29udHJvbC52YWx1ZSksIHZhbCkpO1xuICB9XG4gIG5nT25Jbml0KCkge1xuICAgIHN1cGVyLm5nT25Jbml0KCk7XG5cbiAgICB0aGlzLmZpbHRlcmVkT3B0aW9ucyA9IHRoaXMuZm9ybUNvbnRyb2wudmFsdWVDaGFuZ2VzXG4gICAgICAucGlwZShcbiAgICAgICAgc3RhcnRXaXRoKCcnKSxcbiAgICAgICAgbWFwKHZhbHVlID0+IHRoaXMuX2ZpbHRlcih2YWx1ZSkpXG4gICAgICApO1xuICB9XG5cbiAgcHJpdmF0ZSBfZmlsdGVyKHZhbHVlOiBzdHJpbmcpOiBzdHJpbmdbXSB7XG5cbiAgICBjb25zdCBmaWx0ZXJWYWx1ZSA9IHZhbHVlICYmIHZhbHVlLnRvTG93ZXJDYXNlKCk7XG5cbiAgICByZXR1cm4gdGhpcy5lbnVtLmZpbHRlcihvcHRpb24gPT4gb3B0aW9uLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMoZmlsdGVyVmFsdWUpKTtcbiAgfVxuXG59XG4iXX0=