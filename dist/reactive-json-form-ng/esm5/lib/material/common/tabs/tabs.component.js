/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component, ViewEncapsulation, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { AbstractWidget, Expressions } from '../../../core';
var TabsWidgetComponent = /** @class */ (function (_super) {
    tslib_1.__extends(TabsWidgetComponent, _super);
    function TabsWidgetComponent(cdr, expr) {
        return _super.call(this, cdr, expr) || this;
    }
    /**
     * @return {?}
     */
    TabsWidgetComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
    };
    TabsWidgetComponent.decorators = [
        { type: Component, args: [{
                    selector: 'wdg-tabs',
                    template: "<mat-tab-group>\n\n  <mat-tab *ngFor=\"let tab of content; index as tabIndex\" [label]=\"tabLabels[tabIndex] || ('Tab'+tabIndex)\">\n\n    <ng-template matTabContent>\n      <ng-container [wdgWidget]=\"tab\" [parentContext]=\"context\"></ng-container>\n    </ng-template>\n\n  </mat-tab>\n\n\n</mat-tab-group>\n",
                    styles: [""],
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush
                },] },
    ];
    /** @nocollapse */
    TabsWidgetComponent.ctorParameters = function () { return [
        { type: ChangeDetectorRef },
        { type: Expressions }
    ]; };
    return TabsWidgetComponent;
}(AbstractWidget));
export { TabsWidgetComponent };
function TabsWidgetComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    TabsWidgetComponent.prototype.tabLabels;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFicy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9yZWFjdGl2ZS1qc29uLWZvcm0tbmcvIiwic291cmNlcyI6WyJsaWIvbWF0ZXJpYWwvY29tbW9uL3RhYnMvdGFicy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFVLGlCQUFpQixFQUFFLHVCQUF1QixFQUFFLGlCQUFpQixFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ2pILE9BQU8sRUFBRSxjQUFjLEVBQUUsV0FBVyxFQUFFLE1BQU0sZUFBZSxDQUFDOztJQXFCbkIsK0NBQWM7SUFHckQsNkJBQVksR0FBc0IsRUFBRSxJQUFpQjtlQUNuRCxrQkFBTSxHQUFHLEVBQUUsSUFBSSxDQUFDO0tBQ2pCOzs7O0lBRUQsc0NBQVE7OztJQUFSO0tBQ0M7O2dCQTNCRixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLFVBQVU7b0JBQ3BCLFFBQVEsRUFBRSx5VEFZWDtvQkFDQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLENBQUM7b0JBQ1osYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7b0JBQ3JDLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO2lCQUNoRDs7OztnQkFyQnVFLGlCQUFpQjtnQkFDaEUsV0FBVzs7OEJBRHBDO0VBc0J5QyxjQUFjO1NBQTFDLG1CQUFtQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBWaWV3RW5jYXBzdWxhdGlvbiwgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENoYW5nZURldGVjdG9yUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBBYnN0cmFjdFdpZGdldCwgRXhwcmVzc2lvbnMgfSBmcm9tICcuLi8uLi8uLi9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnd2RnLXRhYnMnLFxuICB0ZW1wbGF0ZTogYDxtYXQtdGFiLWdyb3VwPlxuXG4gIDxtYXQtdGFiICpuZ0Zvcj1cImxldCB0YWIgb2YgY29udGVudDsgaW5kZXggYXMgdGFiSW5kZXhcIiBbbGFiZWxdPVwidGFiTGFiZWxzW3RhYkluZGV4XSB8fCAoJ1RhYicrdGFiSW5kZXgpXCI+XG5cbiAgICA8bmctdGVtcGxhdGUgbWF0VGFiQ29udGVudD5cbiAgICAgIDxuZy1jb250YWluZXIgW3dkZ1dpZGdldF09XCJ0YWJcIiBbcGFyZW50Q29udGV4dF09XCJjb250ZXh0XCI+PC9uZy1jb250YWluZXI+XG4gICAgPC9uZy10ZW1wbGF0ZT5cblxuICA8L21hdC10YWI+XG5cblxuPC9tYXQtdGFiLWdyb3VwPlxuYCxcbiAgc3R5bGVzOiBbYGBdLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBUYWJzV2lkZ2V0Q29tcG9uZW50IGV4dGVuZHMgQWJzdHJhY3RXaWRnZXQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gIHRhYkxhYmVsczogc3RyaW5nW107XG4gIGNvbnN0cnVjdG9yKGNkcjogQ2hhbmdlRGV0ZWN0b3JSZWYsIGV4cHI6IEV4cHJlc3Npb25zKSB7XG4gICAgc3VwZXIoY2RyLCBleHByKTtcbiAgfVxuXG4gIG5nT25Jbml0KCkge1xuICB9XG5cbn1cbiJdfQ==