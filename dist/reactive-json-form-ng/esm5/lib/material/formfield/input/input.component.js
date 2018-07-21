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
import { Expressions, AbstractFormFieldWidget } from '../../../core';
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5wdXQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vcmVhY3RpdmUtanNvbi1mb3JtLW5nLyIsInNvdXJjZXMiOlsibGliL21hdGVyaWFsL2Zvcm1maWVsZC9pbnB1dC9pbnB1dC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFRQSxPQUFPLEVBQUUsU0FBUyxFQUFFLGlCQUFpQixFQUFFLHVCQUF1QixFQUFFLGlCQUFpQixFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pHLE9BQU8sRUFBRSxXQUFXLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSxlQUFlLENBQUM7O0lBZ0MzQixnREFBdUI7SUFPL0QsOEJBQVksR0FBc0IsRUFBRSxJQUFpQjtlQUNuRCxrQkFBTSxHQUFHLEVBQUUsSUFBSSxDQUFDO0tBQ2pCOztnQkF2Q0YsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxXQUFXO29CQUNyQixRQUFRLEVBQUUsNmZBdUJYO29CQUNDLE1BQU0sRUFBRSxDQUFDLEVBQUUsQ0FBQztvQkFDWixhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtvQkFDckMsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07aUJBQ2hEOzs7O2dCQWhDK0QsaUJBQWlCO2dCQUN4RSxXQUFXOzsrQkFUcEI7RUF5QzBDLHVCQUF1QjtTQUFwRCxvQkFBb0IiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxOCBBZHJpYW4gUGFuZWxsYSA8aWFuY2hpNzRAb3V0bG9vay5jb20+XG4gKlxuICogVGhpcyBzb2Z0d2FyZSBpcyByZWxlYXNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuXG4gKiBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL01JVFxuICovXG5cblxuaW1wb3J0IHsgQ29tcG9uZW50LCBWaWV3RW5jYXBzdWxhdGlvbiwgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENoYW5nZURldGVjdG9yUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBFeHByZXNzaW9ucywgQWJzdHJhY3RGb3JtRmllbGRXaWRnZXQgfSBmcm9tICcuLi8uLi8uLi9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnd2RnLWlucHV0JyxcbiAgdGVtcGxhdGU6IGA8bWF0LWZvcm0tZmllbGQgc3R5bGUud2lkdGg9XCIxMDAlXCI+XG5cbiAgICA8bWF0LWxhYmVsICpuZ0lmPVwidGl0bGVcIj5cbiAgICAgICAge3sgdGl0bGUgfX1cbiAgICA8L21hdC1sYWJlbD5cblxuICAgIDxpbnB1dCBtYXRJbnB1dFxuICAgICAgICAgICBuYW1lPVwiYWFhXCJcbiAgICAgICAgICAgW3R5cGVdPVwidHlwZSB8fCAndGV4dCdcIlxuICAgICAgICAgICBbZm9ybUNvbnRyb2xdPVwiZm9ybUNvbnRyb2xcIlxuICAgICAgICAgICBbcGxhY2Vob2xkZXJdPVwicGxhY2Vob2xkZXJcIlxuICAgICAgICAgICBbcmVxdWlyZWRdPVwicmVxdWlyZWRcIj5cblxuICAgIDxtYXQtZXJyb3IgW2lkXT1cIm51bGxcIj5cblxuICAgIDwvbWF0LWVycm9yPlxuXG4gICAgPG1hdC1oaW50ICpuZ0lmPVwiZGVzY3JpcHRpb25cIlxuICAgICAgICAgICAgICBbaWRdPVwibnVsbFwiPlxuICAgICAgICB7eyBkZXNjcmlwdGlvbiB9fVxuICAgIDwvbWF0LWhpbnQ+XG5cbjwvbWF0LWZvcm0tZmllbGQ+XG5gLFxuICBzdHlsZXM6IFtgYF0sXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXG59KVxuZXhwb3J0IGNsYXNzIElucHV0V2lkZ2V0Q29tcG9uZW50IGV4dGVuZHMgQWJzdHJhY3RGb3JtRmllbGRXaWRnZXQge1xuXG4gIHRpdGxlOiBzdHJpbmc7XG4gIGRlc2NyaXB0aW9uOiBzdHJpbmc7XG4gIHBsYWNlaG9sZGVyOiBzdHJpbmc7XG4gIHJlcXVpcmVkOiBib29sZWFuO1xuXG4gIGNvbnN0cnVjdG9yKGNkcjogQ2hhbmdlRGV0ZWN0b3JSZWYsIGV4cHI6IEV4cHJlc3Npb25zKSB7XG4gICAgc3VwZXIoY2RyLCBleHByKTtcbiAgfVxuXG59XG4iXX0=