/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component, ViewEncapsulation, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { AbstractWidget, Expressions } from '../../../core/index';
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFicy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9yZWFjdGl2ZS1qc29uLWZvcm0tbmcvIiwic291cmNlcyI6WyJsaWIvbWF0ZXJpYWwvY29tbW9uL3RhYnMvdGFicy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFVLGlCQUFpQixFQUFFLHVCQUF1QixFQUFFLGlCQUFpQixFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ2pILE9BQU8sRUFBRSxjQUFjLEVBQUUsV0FBVyxFQUFFLE1BQU0scUJBQXFCLENBQUM7O0lBcUJ6QiwrQ0FBYztJQUdyRCw2QkFBWSxHQUFzQixFQUFFLElBQWlCO2VBQ25ELGtCQUFNLEdBQUcsRUFBRSxJQUFJLENBQUM7S0FDakI7Ozs7SUFFRCxzQ0FBUTs7O0lBQVI7S0FDQzs7Z0JBM0JGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsVUFBVTtvQkFDcEIsUUFBUSxFQUFFLHlUQVlYO29CQUNDLE1BQU0sRUFBRSxDQUFDLEVBQUUsQ0FBQztvQkFDWixhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtvQkFDckMsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07aUJBQ2hEOzs7O2dCQXJCdUUsaUJBQWlCO2dCQUNoRSxXQUFXOzs4QkFEcEM7RUFzQnlDLGNBQWM7U0FBMUMsbUJBQW1CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIFZpZXdFbmNhcHN1bGF0aW9uLCBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ2hhbmdlRGV0ZWN0b3JSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEFic3RyYWN0V2lkZ2V0LCBFeHByZXNzaW9ucyB9IGZyb20gJy4uLy4uLy4uL2NvcmUvaW5kZXgnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICd3ZGctdGFicycsXG4gIHRlbXBsYXRlOiBgPG1hdC10YWItZ3JvdXA+XG5cbiAgPG1hdC10YWIgKm5nRm9yPVwibGV0IHRhYiBvZiBjb250ZW50OyBpbmRleCBhcyB0YWJJbmRleFwiIFtsYWJlbF09XCJ0YWJMYWJlbHNbdGFiSW5kZXhdIHx8ICgnVGFiJyt0YWJJbmRleClcIj5cblxuICAgIDxuZy10ZW1wbGF0ZSBtYXRUYWJDb250ZW50PlxuICAgICAgPG5nLWNvbnRhaW5lciBbd2RnV2lkZ2V0XT1cInRhYlwiIFtwYXJlbnRDb250ZXh0XT1cImNvbnRleHRcIj48L25nLWNvbnRhaW5lcj5cbiAgICA8L25nLXRlbXBsYXRlPlxuXG4gIDwvbWF0LXRhYj5cblxuXG48L21hdC10YWItZ3JvdXA+XG5gLFxuICBzdHlsZXM6IFtgYF0sXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXG59KVxuZXhwb3J0IGNsYXNzIFRhYnNXaWRnZXRDb21wb25lbnQgZXh0ZW5kcyBBYnN0cmFjdFdpZGdldCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgdGFiTGFiZWxzOiBzdHJpbmdbXTtcbiAgY29uc3RydWN0b3IoY2RyOiBDaGFuZ2VEZXRlY3RvclJlZiwgZXhwcjogRXhwcmVzc2lvbnMpIHtcbiAgICBzdXBlcihjZHIsIGV4cHIpO1xuICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gIH1cblxufVxuIl19