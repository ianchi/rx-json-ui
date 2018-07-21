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
import { Expressions, AbstractFormFieldWidget } from '../../../core/index';
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0b2NvbXBsZXRlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL3JlYWN0aXZlLWpzb24tZm9ybS1uZy8iLCJzb3VyY2VzIjpbImxpYi9tYXRlcmlhbC9mb3JtZmllbGQvYXV0b2NvbXBsZXRlL2F1dG9jb21wbGV0ZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFPQSxPQUFPLEVBQUUsU0FBUyxFQUFFLGlCQUFpQixFQUFFLHVCQUF1QixFQUFFLGlCQUFpQixFQUFVLE1BQU0sZUFBZSxDQUFDO0FBRWpILE9BQU8sRUFBRSxHQUFHLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDaEQsT0FBTyxFQUFFLFdBQVcsRUFBRSx1QkFBdUIsRUFBRSxNQUFNLHFCQUFxQixDQUFDOztJQWlDMUIsdURBQXVCO0lBU3RFLHFDQUFZLEdBQXNCLEVBQUUsSUFBaUI7UUFBckQsWUFDRSxrQkFBTSxHQUFHLEVBQUUsSUFBSSxDQUFDLFNBQ2pCO3FCQUxnQixFQUFFOztLQUtsQjs7OztJQUlELHFEQUFlOzs7SUFBZjtRQUNFLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLFVBQUEsR0FBRztZQUNsQixNQUFNLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7U0FDdEMsQ0FBQyxDQUFDO0tBQ0o7Ozs7SUFFRCxvREFBYzs7O0lBQWQ7UUFBQSxpQkFFQztRQURDLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLFVBQUEsR0FBRyxJQUFJLE9BQUEsQ0FBQyxLQUFJLENBQUMsT0FBTyxDQUFDLEtBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLEVBQUUsR0FBRyxDQUFDLEVBQTNDLENBQTJDLENBQUMsQ0FBQztLQUN0RTs7OztJQUNELDhDQUFROzs7SUFBUjtRQUFBLGlCQVFDO1FBUEMsaUJBQU0sUUFBUSxXQUFFLENBQUM7UUFFakIsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLFlBQVk7YUFDakQsSUFBSSxDQUNILFNBQVMsQ0FBQyxFQUFFLENBQUMsRUFDYixHQUFHLENBQUMsVUFBQSxLQUFLLElBQUksT0FBQSxLQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUFuQixDQUFtQixDQUFDLENBQ2xDLENBQUM7S0FDTDs7Ozs7SUFFTyw2Q0FBTzs7OztjQUFDLEtBQWE7UUFFM0IscUJBQU0sV0FBVyxHQUFHLEtBQUssSUFBSSxLQUFLLENBQUMsV0FBVyxFQUFFLENBQUM7UUFFakQsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQUEsTUFBTSxJQUFJLE9BQUEsTUFBTSxDQUFDLFdBQVcsRUFBRSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsRUFBMUMsQ0FBMEMsQ0FBQyxDQUFDOzs7Z0JBckVqRixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLGtCQUFrQjtvQkFDNUIsUUFBUSxFQUFFLDJuQkF3Qlg7b0JBQ0MsTUFBTSxFQUFFLENBQUMsRUFBRSxDQUFDO29CQUNaLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO29CQUNyQyxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtpQkFDaEQ7Ozs7Z0JBbkMrRCxpQkFBaUI7Z0JBR3hFLFdBQVc7O3NDQVZwQjtFQTJDaUQsdUJBQXVCO1NBQTNELDJCQUEyQiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDE4IEFkcmlhbiBQYW5lbGxhIDxpYW5jaGk3NEBvdXRsb29rLmNvbT5cbiAqXG4gKiBUaGlzIHNvZnR3YXJlIGlzIHJlbGVhc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS5cbiAqIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvTUlUXG4gKi9cblxuaW1wb3J0IHsgQ29tcG9uZW50LCBWaWV3RW5jYXBzdWxhdGlvbiwgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENoYW5nZURldGVjdG9yUmVmLCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IG1hcCwgc3RhcnRXaXRoIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgRXhwcmVzc2lvbnMsIEFic3RyYWN0Rm9ybUZpZWxkV2lkZ2V0IH0gZnJvbSAnLi4vLi4vLi4vY29yZS9pbmRleCc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3dkZy1hdXRvY29tcGxldGUnLFxuICB0ZW1wbGF0ZTogYDxtYXQtZm9ybS1maWVsZCBzdHlsZS53aWR0aD1cIjEwMCVcIj5cblxuICA8bWF0LWxhYmVsICpuZ0lmPVwidGl0bGVcIj5cbiAgICB7eyB0aXRsZSB9fVxuICA8L21hdC1sYWJlbD5cblxuICA8aW5wdXQgbWF0SW5wdXQgbmFtZT1cImFhYVwiIFt0eXBlXT1cInR5cGUgfHwgJ3RleHQnXCIgW2Zvcm1Db250cm9sXT1cImZvcm1Db250cm9sXCIgW3BsYWNlaG9sZGVyXT1cInBsYWNlaG9sZGVyXCJcbiAgICBbbWF0QXV0b2NvbXBsZXRlXT1cImF1dG9cIj5cblxuICA8bWF0LWVycm9yIFtpZF09XCJudWxsXCI+XG5cbiAgPC9tYXQtZXJyb3I+XG5cbiAgPG1hdC1oaW50ICpuZ0lmPVwiZGVzY3JpcHRpb25cIiBbaWRdPVwibnVsbFwiPlxuICAgIHt7IGRlc2NyaXB0aW9uIH19XG4gIDwvbWF0LWhpbnQ+XG5cbiAgPG1hdC1hdXRvY29tcGxldGUgI2F1dG89XCJtYXRBdXRvY29tcGxldGVcIj5cbiAgICA8bWF0LW9wdGlvbiAqbmdGb3I9XCJsZXQgb3B0aW9uIG9mIGZpbHRlcmVkT3B0aW9ucyB8IGFzeW5jOyBpbmRleCBhcyBvcHRJbmRleFwiIFt2YWx1ZV09XCJvcHRpb25cIj5cbiAgICAgIHt7b3B0aW9ufX1cbiAgICA8L21hdC1vcHRpb24+XG4gIDwvbWF0LWF1dG9jb21wbGV0ZT5cblxuPC9tYXQtZm9ybS1maWVsZD5cbmAsXG4gIHN0eWxlczogW2BgXSxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcbn0pXG5leHBvcnQgY2xhc3MgQXV0b2NvbXBsZXRlV2lkZ2V0Q29tcG9uZW50IGV4dGVuZHMgQWJzdHJhY3RGb3JtRmllbGRXaWRnZXQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gIHRpdGxlOiBzdHJpbmc7XG4gIGRlc2NyaXB0aW9uOiBzdHJpbmc7XG4gIHBsYWNlaG9sZGVyOiBzdHJpbmc7XG5cbiAgZW51bTogc3RyaW5nW10gPSBbXTtcbiAgZW51bUxhYmVsOiBzdHJpbmdbXTtcbiAgZmlsdGVyZWRPcHRpb25zOiBPYnNlcnZhYmxlPHN0cmluZ1tdPjtcbiAgY29uc3RydWN0b3IoY2RyOiBDaGFuZ2VEZXRlY3RvclJlZiwgZXhwcjogRXhwcmVzc2lvbnMpIHtcbiAgICBzdXBlcihjZHIsIGV4cHIpO1xuICB9XG5cblxuXG4gIGR5bk9uQmVmb3JlQmluZCgpIHtcbiAgICB0aGlzLm1hcCgnZW51bScsIHZhbCA9PiB7XG4gICAgICByZXR1cm4gQXJyYXkuaXNBcnJheSh2YWwpID8gdmFsIDogW107XG4gICAgfSk7XG4gIH1cblxuICBkeW5PbkFmdGVyQmluZCgpIHtcbiAgICB0aGlzLm1hcCgnZW51bScsIHZhbCA9PiAodGhpcy5fZmlsdGVyKHRoaXMuZm9ybUNvbnRyb2wudmFsdWUpLCB2YWwpKTtcbiAgfVxuICBuZ09uSW5pdCgpIHtcbiAgICBzdXBlci5uZ09uSW5pdCgpO1xuXG4gICAgdGhpcy5maWx0ZXJlZE9wdGlvbnMgPSB0aGlzLmZvcm1Db250cm9sLnZhbHVlQ2hhbmdlc1xuICAgICAgLnBpcGUoXG4gICAgICAgIHN0YXJ0V2l0aCgnJyksXG4gICAgICAgIG1hcCh2YWx1ZSA9PiB0aGlzLl9maWx0ZXIodmFsdWUpKVxuICAgICAgKTtcbiAgfVxuXG4gIHByaXZhdGUgX2ZpbHRlcih2YWx1ZTogc3RyaW5nKTogc3RyaW5nW10ge1xuXG4gICAgY29uc3QgZmlsdGVyVmFsdWUgPSB2YWx1ZSAmJiB2YWx1ZS50b0xvd2VyQ2FzZSgpO1xuXG4gICAgcmV0dXJuIHRoaXMuZW51bS5maWx0ZXIob3B0aW9uID0+IG9wdGlvbi50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKGZpbHRlclZhbHVlKSk7XG4gIH1cblxufVxuIl19