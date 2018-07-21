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
import { map, startWith } from 'rxjs/operators';
import { Expressions, AbstractFormFieldWidget } from '../../../core';
var AutocompleteWidgetComponent = /** @class */ (function (_super) {
    tslib_1.__extends(AutocompleteWidgetComponent, _super);
    function AutocompleteWidgetComponent(cdr, expr) {
        var _this = _super.call(this, cdr, expr) || this;
        _this.enum = [];
        return _this;
    }
    /**
     * @return {?}
     */
    AutocompleteWidgetComponent.prototype.dynOnBeforeBind = /**
     * @return {?}
     */
    function () {
        this.map('enum', function (val) {
            return Array.isArray(val) ? val : [];
        });
    };
    /**
     * @return {?}
     */
    AutocompleteWidgetComponent.prototype.dynOnAfterBind = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.map('enum', function (val) { return (_this._filter(_this.formControl.value), val); });
    };
    /**
     * @return {?}
     */
    AutocompleteWidgetComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        _super.prototype.ngOnInit.call(this);
        this.filteredOptions = this.formControl.valueChanges
            .pipe(startWith(''), map(function (value) { return _this._filter(value); }));
    };
    /**
     * @param {?} value
     * @return {?}
     */
    AutocompleteWidgetComponent.prototype._filter = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        var /** @type {?} */ filterValue = value && value.toLowerCase();
        return this.enum.filter(function (option) { return option.toLowerCase().includes(filterValue); });
    };
    AutocompleteWidgetComponent.decorators = [
        { type: Component, args: [{
                    selector: 'wdg-autocomplete',
                    template: "<mat-form-field style.width=\"100%\">\n\n  <mat-label *ngIf=\"title\">\n    {{ title }}\n  </mat-label>\n\n  <input matInput name=\"aaa\" [type]=\"type || 'text'\" [formControl]=\"formControl\" [placeholder]=\"placeholder\"\n    [matAutocomplete]=\"auto\">\n\n  <mat-error [id]=\"null\">\n\n  </mat-error>\n\n  <mat-hint *ngIf=\"description\" [id]=\"null\">\n    {{ description }}\n  </mat-hint>\n\n  <mat-autocomplete #auto=\"matAutocomplete\">\n    <mat-option *ngFor=\"let option of filteredOptions | async; index as optIndex\" [value]=\"option\">\n      {{option}}\n    </mat-option>\n  </mat-autocomplete>\n\n</mat-form-field>\n",
                    styles: [""],
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush
                },] },
    ];
    /** @nocollapse */
    AutocompleteWidgetComponent.ctorParameters = function () { return [
        { type: ChangeDetectorRef },
        { type: Expressions }
    ]; };
    return AutocompleteWidgetComponent;
}(AbstractFormFieldWidget));
export { AutocompleteWidgetComponent };
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0b2NvbXBsZXRlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL3JlYWN0aXZlLWpzb24tZm9ybS1uZy8iLCJzb3VyY2VzIjpbImxpYi9tYXRlcmlhbC9mb3JtZmllbGQvYXV0b2NvbXBsZXRlL2F1dG9jb21wbGV0ZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFPQSxPQUFPLEVBQUUsU0FBUyxFQUFFLGlCQUFpQixFQUFFLHVCQUF1QixFQUFFLGlCQUFpQixFQUFVLE1BQU0sZUFBZSxDQUFDO0FBRWpILE9BQU8sRUFBRSxHQUFHLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDaEQsT0FBTyxFQUFFLFdBQVcsRUFBRSx1QkFBdUIsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7SUFpQ3BCLHVEQUF1QjtJQVN0RSxxQ0FBWSxHQUFzQixFQUFFLElBQWlCO1FBQXJELFlBQ0Usa0JBQU0sR0FBRyxFQUFFLElBQUksQ0FBQyxTQUNqQjtxQkFMZ0IsRUFBRTs7S0FLbEI7Ozs7SUFJRCxxREFBZTs7O0lBQWY7UUFDRSxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxVQUFBLEdBQUc7WUFDbEIsTUFBTSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO1NBQ3RDLENBQUMsQ0FBQztLQUNKOzs7O0lBRUQsb0RBQWM7OztJQUFkO1FBQUEsaUJBRUM7UUFEQyxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxVQUFBLEdBQUcsSUFBSSxPQUFBLENBQUMsS0FBSSxDQUFDLE9BQU8sQ0FBQyxLQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxFQUFFLEdBQUcsQ0FBQyxFQUEzQyxDQUEyQyxDQUFDLENBQUM7S0FDdEU7Ozs7SUFDRCw4Q0FBUTs7O0lBQVI7UUFBQSxpQkFRQztRQVBDLGlCQUFNLFFBQVEsV0FBRSxDQUFDO1FBRWpCLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxZQUFZO2FBQ2pELElBQUksQ0FDSCxTQUFTLENBQUMsRUFBRSxDQUFDLEVBQ2IsR0FBRyxDQUFDLFVBQUEsS0FBSyxJQUFJLE9BQUEsS0FBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBbkIsQ0FBbUIsQ0FBQyxDQUNsQyxDQUFDO0tBQ0w7Ozs7O0lBRU8sNkNBQU87Ozs7Y0FBQyxLQUFhO1FBRTNCLHFCQUFNLFdBQVcsR0FBRyxLQUFLLElBQUksS0FBSyxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBRWpELE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFBLE1BQU0sSUFBSSxPQUFBLE1BQU0sQ0FBQyxXQUFXLEVBQUUsQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLEVBQTFDLENBQTBDLENBQUMsQ0FBQzs7O2dCQXJFakYsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxrQkFBa0I7b0JBQzVCLFFBQVEsRUFBRSwybkJBd0JYO29CQUNDLE1BQU0sRUFBRSxDQUFDLEVBQUUsQ0FBQztvQkFDWixhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtvQkFDckMsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07aUJBQ2hEOzs7O2dCQW5DK0QsaUJBQWlCO2dCQUd4RSxXQUFXOztzQ0FWcEI7RUEyQ2lELHVCQUF1QjtTQUEzRCwyQkFBMkIiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxOCBBZHJpYW4gUGFuZWxsYSA8aWFuY2hpNzRAb3V0bG9vay5jb20+XG4gKlxuICogVGhpcyBzb2Z0d2FyZSBpcyByZWxlYXNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuXG4gKiBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL01JVFxuICovXG5cbmltcG9ydCB7IENvbXBvbmVudCwgVmlld0VuY2Fwc3VsYXRpb24sIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDaGFuZ2VEZXRlY3RvclJlZiwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBtYXAsIHN0YXJ0V2l0aCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IEV4cHJlc3Npb25zLCBBYnN0cmFjdEZvcm1GaWVsZFdpZGdldCB9IGZyb20gJy4uLy4uLy4uL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICd3ZGctYXV0b2NvbXBsZXRlJyxcbiAgdGVtcGxhdGU6IGA8bWF0LWZvcm0tZmllbGQgc3R5bGUud2lkdGg9XCIxMDAlXCI+XG5cbiAgPG1hdC1sYWJlbCAqbmdJZj1cInRpdGxlXCI+XG4gICAge3sgdGl0bGUgfX1cbiAgPC9tYXQtbGFiZWw+XG5cbiAgPGlucHV0IG1hdElucHV0IG5hbWU9XCJhYWFcIiBbdHlwZV09XCJ0eXBlIHx8ICd0ZXh0J1wiIFtmb3JtQ29udHJvbF09XCJmb3JtQ29udHJvbFwiIFtwbGFjZWhvbGRlcl09XCJwbGFjZWhvbGRlclwiXG4gICAgW21hdEF1dG9jb21wbGV0ZV09XCJhdXRvXCI+XG5cbiAgPG1hdC1lcnJvciBbaWRdPVwibnVsbFwiPlxuXG4gIDwvbWF0LWVycm9yPlxuXG4gIDxtYXQtaGludCAqbmdJZj1cImRlc2NyaXB0aW9uXCIgW2lkXT1cIm51bGxcIj5cbiAgICB7eyBkZXNjcmlwdGlvbiB9fVxuICA8L21hdC1oaW50PlxuXG4gIDxtYXQtYXV0b2NvbXBsZXRlICNhdXRvPVwibWF0QXV0b2NvbXBsZXRlXCI+XG4gICAgPG1hdC1vcHRpb24gKm5nRm9yPVwibGV0IG9wdGlvbiBvZiBmaWx0ZXJlZE9wdGlvbnMgfCBhc3luYzsgaW5kZXggYXMgb3B0SW5kZXhcIiBbdmFsdWVdPVwib3B0aW9uXCI+XG4gICAgICB7e29wdGlvbn19XG4gICAgPC9tYXQtb3B0aW9uPlxuICA8L21hdC1hdXRvY29tcGxldGU+XG5cbjwvbWF0LWZvcm0tZmllbGQ+XG5gLFxuICBzdHlsZXM6IFtgYF0sXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXG59KVxuZXhwb3J0IGNsYXNzIEF1dG9jb21wbGV0ZVdpZGdldENvbXBvbmVudCBleHRlbmRzIEFic3RyYWN0Rm9ybUZpZWxkV2lkZ2V0IGltcGxlbWVudHMgT25Jbml0IHtcblxuICB0aXRsZTogc3RyaW5nO1xuICBkZXNjcmlwdGlvbjogc3RyaW5nO1xuICBwbGFjZWhvbGRlcjogc3RyaW5nO1xuXG4gIGVudW06IHN0cmluZ1tdID0gW107XG4gIGVudW1MYWJlbDogc3RyaW5nW107XG4gIGZpbHRlcmVkT3B0aW9uczogT2JzZXJ2YWJsZTxzdHJpbmdbXT47XG4gIGNvbnN0cnVjdG9yKGNkcjogQ2hhbmdlRGV0ZWN0b3JSZWYsIGV4cHI6IEV4cHJlc3Npb25zKSB7XG4gICAgc3VwZXIoY2RyLCBleHByKTtcbiAgfVxuXG5cblxuICBkeW5PbkJlZm9yZUJpbmQoKSB7XG4gICAgdGhpcy5tYXAoJ2VudW0nLCB2YWwgPT4ge1xuICAgICAgcmV0dXJuIEFycmF5LmlzQXJyYXkodmFsKSA/IHZhbCA6IFtdO1xuICAgIH0pO1xuICB9XG5cbiAgZHluT25BZnRlckJpbmQoKSB7XG4gICAgdGhpcy5tYXAoJ2VudW0nLCB2YWwgPT4gKHRoaXMuX2ZpbHRlcih0aGlzLmZvcm1Db250cm9sLnZhbHVlKSwgdmFsKSk7XG4gIH1cbiAgbmdPbkluaXQoKSB7XG4gICAgc3VwZXIubmdPbkluaXQoKTtcblxuICAgIHRoaXMuZmlsdGVyZWRPcHRpb25zID0gdGhpcy5mb3JtQ29udHJvbC52YWx1ZUNoYW5nZXNcbiAgICAgIC5waXBlKFxuICAgICAgICBzdGFydFdpdGgoJycpLFxuICAgICAgICBtYXAodmFsdWUgPT4gdGhpcy5fZmlsdGVyKHZhbHVlKSlcbiAgICAgICk7XG4gIH1cblxuICBwcml2YXRlIF9maWx0ZXIodmFsdWU6IHN0cmluZyk6IHN0cmluZ1tdIHtcblxuICAgIGNvbnN0IGZpbHRlclZhbHVlID0gdmFsdWUgJiYgdmFsdWUudG9Mb3dlckNhc2UoKTtcblxuICAgIHJldHVybiB0aGlzLmVudW0uZmlsdGVyKG9wdGlvbiA9PiBvcHRpb24udG9Mb3dlckNhc2UoKS5pbmNsdWRlcyhmaWx0ZXJWYWx1ZSkpO1xuICB9XG5cbn1cbiJdfQ==