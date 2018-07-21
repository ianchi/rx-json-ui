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
import { Component, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
export class RoutedWidgetComponent {
    /**
     * @param {?} _route
     */
    constructor(_route) {
        this._route = _route;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.widgetDef = this._route.snapshot.data["widgetDef"] || { type: 'empty' };
        this.parentContext = this._route.snapshot.data["parentContext"];
    }
}
RoutedWidgetComponent.decorators = [
    { type: Component, args: [{
                selector: 'wdg-widget',
                template: '<ng-container [wdgWidget]="widgetDef" [parentContext]="parentContext"></ng-container>',
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush
            },] },
];
/** @nocollapse */
RoutedWidgetComponent.ctorParameters = () => [
    { type: ActivatedRoute }
];
function RoutedWidgetComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    RoutedWidgetComponent.prototype.widgetDef;
    /** @type {?} */
    RoutedWidgetComponent.prototype.parentContext;
    /** @type {?} */
    RoutedWidgetComponent.prototype._route;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGVkd2lkZ2V0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL3JlYWN0aXZlLWpzb24tZm9ybS1uZy8iLCJzb3VyY2VzIjpbImxpYi9jb3JlL3JvdXRlZHdpZGdldC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQU9BLE9BQU8sRUFBRSxTQUFTLEVBQUUsaUJBQWlCLEVBQUUsdUJBQXVCLEVBQVUsTUFBTSxlQUFlLENBQUM7QUFDOUYsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBV2pELE1BQU07Ozs7SUFLSixZQUFvQixNQUFzQjtRQUF0QixXQUFNLEdBQU4sTUFBTSxDQUFnQjtLQUFLOzs7O0lBQy9DLFFBQVE7UUFDTixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksaUJBQWMsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLENBQUM7UUFDMUUsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLGlCQUFjLENBQUM7S0FDOUQ7OztZQWhCRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLFlBQVk7Z0JBQ3RCLFFBQVEsRUFBRSx1RkFBdUY7Z0JBRWpHLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO2dCQUNyQyxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTthQUNoRDs7OztZQVZRLGNBQWMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxOCBBZHJpYW4gUGFuZWxsYSA8aWFuY2hpNzRAb3V0bG9vay5jb20+XG4gKlxuICogVGhpcyBzb2Z0d2FyZSBpcyByZWxlYXNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuXG4gKiBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL01JVFxuICovXG5cbmltcG9ydCB7IENvbXBvbmVudCwgVmlld0VuY2Fwc3VsYXRpb24sIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEFjdGl2YXRlZFJvdXRlIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IElXaWRnZXREZWYgfSBmcm9tICcuL3dpZGdldC5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgQ29udGV4dCB9IGZyb20gJy4vY29udGV4dCc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3dkZy13aWRnZXQnLFxuICB0ZW1wbGF0ZTogJzxuZy1jb250YWluZXIgW3dkZ1dpZGdldF09XCJ3aWRnZXREZWZcIiBbcGFyZW50Q29udGV4dF09XCJwYXJlbnRDb250ZXh0XCI+PC9uZy1jb250YWluZXI+JyxcblxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBSb3V0ZWRXaWRnZXRDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gIHdpZGdldERlZjogSVdpZGdldERlZjtcbiAgcGFyZW50Q29udGV4dDogQ29udGV4dDtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9yb3V0ZTogQWN0aXZhdGVkUm91dGUpIHsgfVxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLndpZGdldERlZiA9IHRoaXMuX3JvdXRlLnNuYXBzaG90LmRhdGEud2lkZ2V0RGVmIHx8IHsgdHlwZTogJ2VtcHR5JyB9O1xuICAgIHRoaXMucGFyZW50Q29udGV4dCA9IHRoaXMuX3JvdXRlLnNuYXBzaG90LmRhdGEucGFyZW50Q29udGV4dDtcbiAgfVxuXG59XG4iXX0=