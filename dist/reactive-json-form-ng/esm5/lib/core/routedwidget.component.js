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
var RoutedWidgetComponent = /** @class */ (function () {
    function RoutedWidgetComponent(_route) {
        this._route = _route;
    }
    /**
     * @return {?}
     */
    RoutedWidgetComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.widgetDef = this._route.snapshot.data["widgetDef"] || { type: 'empty' };
        this.parentContext = this._route.snapshot.data["parentContext"];
    };
    RoutedWidgetComponent.decorators = [
        { type: Component, args: [{
                    selector: 'wdg-widget',
                    template: '<ng-container [wdgWidget]="widgetDef" [parentContext]="parentContext"></ng-container>',
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush
                },] },
    ];
    /** @nocollapse */
    RoutedWidgetComponent.ctorParameters = function () { return [
        { type: ActivatedRoute }
    ]; };
    return RoutedWidgetComponent;
}());
export { RoutedWidgetComponent };
function RoutedWidgetComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    RoutedWidgetComponent.prototype.widgetDef;
    /** @type {?} */
    RoutedWidgetComponent.prototype.parentContext;
    /** @type {?} */
    RoutedWidgetComponent.prototype._route;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGVkd2lkZ2V0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL3JlYWN0aXZlLWpzb24tZm9ybS1uZy8iLCJzb3VyY2VzIjpbImxpYi9jb3JlL3JvdXRlZHdpZGdldC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQU9BLE9BQU8sRUFBRSxTQUFTLEVBQUUsaUJBQWlCLEVBQUUsdUJBQXVCLEVBQVUsTUFBTSxlQUFlLENBQUM7QUFDOUYsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLGlCQUFpQixDQUFDOztJQWdCL0MsK0JBQW9CLE1BQXNCO1FBQXRCLFdBQU0sR0FBTixNQUFNLENBQWdCO0tBQUs7Ozs7SUFDL0Msd0NBQVE7OztJQUFSO1FBQ0UsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLGlCQUFjLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxDQUFDO1FBQzFFLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxpQkFBYyxDQUFDO0tBQzlEOztnQkFoQkYsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxZQUFZO29CQUN0QixRQUFRLEVBQUUsdUZBQXVGO29CQUVqRyxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtvQkFDckMsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07aUJBQ2hEOzs7O2dCQVZRLGNBQWM7O2dDQVJ2Qjs7U0FtQmEscUJBQXFCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTggQWRyaWFuIFBhbmVsbGEgPGlhbmNoaTc0QG91dGxvb2suY29tPlxuICpcbiAqIFRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLlxuICogaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9NSVRcbiAqL1xuXG5pbXBvcnQgeyBDb21wb25lbnQsIFZpZXdFbmNhcHN1bGF0aW9uLCBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBBY3RpdmF0ZWRSb3V0ZSB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBJV2lkZ2V0RGVmIH0gZnJvbSAnLi93aWRnZXQuaW50ZXJmYWNlJztcbmltcG9ydCB7IENvbnRleHQgfSBmcm9tICcuL2NvbnRleHQnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICd3ZGctd2lkZ2V0JyxcbiAgdGVtcGxhdGU6ICc8bmctY29udGFpbmVyIFt3ZGdXaWRnZXRdPVwid2lkZ2V0RGVmXCIgW3BhcmVudENvbnRleHRdPVwicGFyZW50Q29udGV4dFwiPjwvbmctY29udGFpbmVyPicsXG5cbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcbn0pXG5leHBvcnQgY2xhc3MgUm91dGVkV2lkZ2V0Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICB3aWRnZXREZWY6IElXaWRnZXREZWY7XG4gIHBhcmVudENvbnRleHQ6IENvbnRleHQ7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfcm91dGU6IEFjdGl2YXRlZFJvdXRlKSB7IH1cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy53aWRnZXREZWYgPSB0aGlzLl9yb3V0ZS5zbmFwc2hvdC5kYXRhLndpZGdldERlZiB8fCB7IHR5cGU6ICdlbXB0eScgfTtcbiAgICB0aGlzLnBhcmVudENvbnRleHQgPSB0aGlzLl9yb3V0ZS5zbmFwc2hvdC5kYXRhLnBhcmVudENvbnRleHQ7XG4gIH1cblxufVxuIl19