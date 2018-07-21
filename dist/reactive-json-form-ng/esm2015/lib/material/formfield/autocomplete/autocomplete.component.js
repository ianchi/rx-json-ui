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
import { Expressions, AbstractFormFieldWidget } from '../../../core/index';
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0b2NvbXBsZXRlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL3JlYWN0aXZlLWpzb24tZm9ybS1uZy8iLCJzb3VyY2VzIjpbImxpYi9tYXRlcmlhbC9mb3JtZmllbGQvYXV0b2NvbXBsZXRlL2F1dG9jb21wbGV0ZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQU9BLE9BQU8sRUFBRSxTQUFTLEVBQUUsaUJBQWlCLEVBQUUsdUJBQXVCLEVBQUUsaUJBQWlCLEVBQVUsTUFBTSxlQUFlLENBQUM7QUFFakgsT0FBTyxFQUFFLEdBQUcsRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNoRCxPQUFPLEVBQUUsV0FBVyxFQUFFLHVCQUF1QixFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFpQzNFLE1BQU0sa0NBQW1DLFNBQVEsdUJBQXVCOzs7OztJQVN0RSxZQUFZLEdBQXNCLEVBQUUsSUFBaUI7UUFDbkQsS0FBSyxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQztvQkFKRixFQUFFO0tBS2xCOzs7O0lBSUQsZUFBZTtRQUNiLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxFQUFFO1lBQ3JCLE1BQU0sQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztTQUN0QyxDQUFDLENBQUM7S0FDSjs7OztJQUVELGNBQWM7UUFDWixJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUM7S0FDdEU7Ozs7SUFDRCxRQUFRO1FBQ04sS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBRWpCLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxZQUFZO2FBQ2pELElBQUksQ0FDSCxTQUFTLENBQUMsRUFBRSxDQUFDLEVBQ2IsR0FBRyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUNsQyxDQUFDO0tBQ0w7Ozs7O0lBRU8sT0FBTyxDQUFDLEtBQWE7UUFFM0IsdUJBQU0sV0FBVyxHQUFHLEtBQUssSUFBSSxLQUFLLENBQUMsV0FBVyxFQUFFLENBQUM7UUFFakQsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLFdBQVcsRUFBRSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDOzs7O1lBckVqRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLGtCQUFrQjtnQkFDNUIsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Q0F3Qlg7Z0JBQ0MsTUFBTSxFQUFFLENBQUMsRUFBRSxDQUFDO2dCQUNaLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO2dCQUNyQyxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTthQUNoRDs7OztZQW5DK0QsaUJBQWlCO1lBR3hFLFdBQVciLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxOCBBZHJpYW4gUGFuZWxsYSA8aWFuY2hpNzRAb3V0bG9vay5jb20+XG4gKlxuICogVGhpcyBzb2Z0d2FyZSBpcyByZWxlYXNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuXG4gKiBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL01JVFxuICovXG5cbmltcG9ydCB7IENvbXBvbmVudCwgVmlld0VuY2Fwc3VsYXRpb24sIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDaGFuZ2VEZXRlY3RvclJlZiwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBtYXAsIHN0YXJ0V2l0aCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IEV4cHJlc3Npb25zLCBBYnN0cmFjdEZvcm1GaWVsZFdpZGdldCB9IGZyb20gJy4uLy4uLy4uL2NvcmUvaW5kZXgnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICd3ZGctYXV0b2NvbXBsZXRlJyxcbiAgdGVtcGxhdGU6IGA8bWF0LWZvcm0tZmllbGQgc3R5bGUud2lkdGg9XCIxMDAlXCI+XG5cbiAgPG1hdC1sYWJlbCAqbmdJZj1cInRpdGxlXCI+XG4gICAge3sgdGl0bGUgfX1cbiAgPC9tYXQtbGFiZWw+XG5cbiAgPGlucHV0IG1hdElucHV0IG5hbWU9XCJhYWFcIiBbdHlwZV09XCJ0eXBlIHx8ICd0ZXh0J1wiIFtmb3JtQ29udHJvbF09XCJmb3JtQ29udHJvbFwiIFtwbGFjZWhvbGRlcl09XCJwbGFjZWhvbGRlclwiXG4gICAgW21hdEF1dG9jb21wbGV0ZV09XCJhdXRvXCI+XG5cbiAgPG1hdC1lcnJvciBbaWRdPVwibnVsbFwiPlxuXG4gIDwvbWF0LWVycm9yPlxuXG4gIDxtYXQtaGludCAqbmdJZj1cImRlc2NyaXB0aW9uXCIgW2lkXT1cIm51bGxcIj5cbiAgICB7eyBkZXNjcmlwdGlvbiB9fVxuICA8L21hdC1oaW50PlxuXG4gIDxtYXQtYXV0b2NvbXBsZXRlICNhdXRvPVwibWF0QXV0b2NvbXBsZXRlXCI+XG4gICAgPG1hdC1vcHRpb24gKm5nRm9yPVwibGV0IG9wdGlvbiBvZiBmaWx0ZXJlZE9wdGlvbnMgfCBhc3luYzsgaW5kZXggYXMgb3B0SW5kZXhcIiBbdmFsdWVdPVwib3B0aW9uXCI+XG4gICAgICB7e29wdGlvbn19XG4gICAgPC9tYXQtb3B0aW9uPlxuICA8L21hdC1hdXRvY29tcGxldGU+XG5cbjwvbWF0LWZvcm0tZmllbGQ+XG5gLFxuICBzdHlsZXM6IFtgYF0sXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXG59KVxuZXhwb3J0IGNsYXNzIEF1dG9jb21wbGV0ZVdpZGdldENvbXBvbmVudCBleHRlbmRzIEFic3RyYWN0Rm9ybUZpZWxkV2lkZ2V0IGltcGxlbWVudHMgT25Jbml0IHtcblxuICB0aXRsZTogc3RyaW5nO1xuICBkZXNjcmlwdGlvbjogc3RyaW5nO1xuICBwbGFjZWhvbGRlcjogc3RyaW5nO1xuXG4gIGVudW06IHN0cmluZ1tdID0gW107XG4gIGVudW1MYWJlbDogc3RyaW5nW107XG4gIGZpbHRlcmVkT3B0aW9uczogT2JzZXJ2YWJsZTxzdHJpbmdbXT47XG4gIGNvbnN0cnVjdG9yKGNkcjogQ2hhbmdlRGV0ZWN0b3JSZWYsIGV4cHI6IEV4cHJlc3Npb25zKSB7XG4gICAgc3VwZXIoY2RyLCBleHByKTtcbiAgfVxuXG5cblxuICBkeW5PbkJlZm9yZUJpbmQoKSB7XG4gICAgdGhpcy5tYXAoJ2VudW0nLCB2YWwgPT4ge1xuICAgICAgcmV0dXJuIEFycmF5LmlzQXJyYXkodmFsKSA/IHZhbCA6IFtdO1xuICAgIH0pO1xuICB9XG5cbiAgZHluT25BZnRlckJpbmQoKSB7XG4gICAgdGhpcy5tYXAoJ2VudW0nLCB2YWwgPT4gKHRoaXMuX2ZpbHRlcih0aGlzLmZvcm1Db250cm9sLnZhbHVlKSwgdmFsKSk7XG4gIH1cbiAgbmdPbkluaXQoKSB7XG4gICAgc3VwZXIubmdPbkluaXQoKTtcblxuICAgIHRoaXMuZmlsdGVyZWRPcHRpb25zID0gdGhpcy5mb3JtQ29udHJvbC52YWx1ZUNoYW5nZXNcbiAgICAgIC5waXBlKFxuICAgICAgICBzdGFydFdpdGgoJycpLFxuICAgICAgICBtYXAodmFsdWUgPT4gdGhpcy5fZmlsdGVyKHZhbHVlKSlcbiAgICAgICk7XG4gIH1cblxuICBwcml2YXRlIF9maWx0ZXIodmFsdWU6IHN0cmluZyk6IHN0cmluZ1tdIHtcblxuICAgIGNvbnN0IGZpbHRlclZhbHVlID0gdmFsdWUgJiYgdmFsdWUudG9Mb3dlckNhc2UoKTtcblxuICAgIHJldHVybiB0aGlzLmVudW0uZmlsdGVyKG9wdGlvbiA9PiBvcHRpb24udG9Mb3dlckNhc2UoKS5pbmNsdWRlcyhmaWx0ZXJWYWx1ZSkpO1xuICB9XG5cbn1cbiJdfQ==