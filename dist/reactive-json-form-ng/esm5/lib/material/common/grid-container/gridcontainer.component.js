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
import { AbstractWidget, Expressions } from '../../../core/index';
var GridContainerWidgetComponent = /** @class */ (function (_super) {
    tslib_1.__extends(GridContainerWidgetComponent, _super);
    function GridContainerWidgetComponent(cdr, expr) {
        return _super.call(this, cdr, expr) || this;
    }
    /**
     * @return {?}
     */
    GridContainerWidgetComponent.prototype.dynOnBeforeBind = /**
     * @return {?}
     */
    function () {
        this.map('direction', function (dir) { return dir || 'row'; });
    };
    GridContainerWidgetComponent.decorators = [
        { type: Component, args: [{
                    selector: 'wdg-grid-container',
                    template: "<ng-container *ngFor=\"let element of content\" [wdgWidget]=\"element\" [parentContext]=\"context\">\n\n</ng-container>\n",
                    styles: ["dyn-grid-container.dyn-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));grid-auto-flow:row dense}"],
                    // tslint:disable-next-line:use-host-property-decorator
                    host: {
                        '[class.dyn-grid]': 'true',
                        '[style.flex-direction]': 'direction'
                    },
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush
                },] },
    ];
    /** @nocollapse */
    GridContainerWidgetComponent.ctorParameters = function () { return [
        { type: ChangeDetectorRef },
        { type: Expressions }
    ]; };
    return GridContainerWidgetComponent;
}(AbstractWidget));
export { GridContainerWidgetComponent };
function GridContainerWidgetComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    GridContainerWidgetComponent.prototype.direction;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JpZGNvbnRhaW5lci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9yZWFjdGl2ZS1qc29uLWZvcm0tbmcvIiwic291cmNlcyI6WyJsaWIvbWF0ZXJpYWwvY29tbW9uL2dyaWQtY29udGFpbmVyL2dyaWRjb250YWluZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBT0EsT0FBTyxFQUFFLFNBQVMsRUFBRSxpQkFBaUIsRUFBRSx1QkFBdUIsRUFBRSxpQkFBaUIsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN4RyxPQUFPLEVBQUUsY0FBYyxFQUFFLFdBQVcsRUFBRSxNQUFNLHFCQUFxQixDQUFDOztJQWtCaEIsd0RBQWM7SUFJOUQsc0NBQVksR0FBc0IsRUFBRSxJQUFpQjtlQUNuRCxrQkFBTSxHQUFHLEVBQUUsSUFBSSxDQUFDO0tBQ2pCOzs7O0lBRUQsc0RBQWU7OztJQUFmO1FBRUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxXQUFXLEVBQUUsVUFBQSxHQUFHLElBQUksT0FBQSxHQUFHLElBQUksS0FBSyxFQUFaLENBQVksQ0FBQyxDQUFDO0tBQzVDOztnQkEzQkYsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxvQkFBb0I7b0JBQzlCLFFBQVEsRUFBRSwySEFHWDtvQkFDQyxNQUFNLEVBQUUsQ0FBQyw2SEFBNkgsQ0FBQzs7b0JBR3ZJLElBQUksRUFBRTt3QkFDSixrQkFBa0IsRUFBRSxNQUFNO3dCQUMxQix3QkFBd0IsRUFBRSxXQUFXO3FCQUN0QztvQkFDRCxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtvQkFDckMsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07aUJBQ2hEOzs7O2dCQWxCK0QsaUJBQWlCO2dCQUN4RCxXQUFXOzt1Q0FScEM7RUEwQmtELGNBQWM7U0FBbkQsNEJBQTRCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTggQWRyaWFuIFBhbmVsbGEgPGlhbmNoaTc0QG91dGxvb2suY29tPlxuICpcbiAqIFRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLlxuICogaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9NSVRcbiAqL1xuXG5pbXBvcnQgeyBDb21wb25lbnQsIFZpZXdFbmNhcHN1bGF0aW9uLCBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ2hhbmdlRGV0ZWN0b3JSZWZ9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQWJzdHJhY3RXaWRnZXQsIEV4cHJlc3Npb25zIH0gZnJvbSAnLi4vLi4vLi4vY29yZS9pbmRleCc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3dkZy1ncmlkLWNvbnRhaW5lcicsXG4gIHRlbXBsYXRlOiBgPG5nLWNvbnRhaW5lciAqbmdGb3I9XCJsZXQgZWxlbWVudCBvZiBjb250ZW50XCIgW3dkZ1dpZGdldF09XCJlbGVtZW50XCIgW3BhcmVudENvbnRleHRdPVwiY29udGV4dFwiPlxuXG48L25nLWNvbnRhaW5lcj5cbmAsXG4gIHN0eWxlczogW2BkeW4tZ3JpZC1jb250YWluZXIuZHluLWdyaWR7ZGlzcGxheTpncmlkO2dyaWQtdGVtcGxhdGUtY29sdW1uczpyZXBlYXQoYXV0by1maXQsbWlubWF4KDMwMHB4LDFmcikpO2dyaWQtYXV0by1mbG93OnJvdyBkZW5zZX1gXSxcblxuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6dXNlLWhvc3QtcHJvcGVydHktZGVjb3JhdG9yXG4gIGhvc3Q6IHtcbiAgICAnW2NsYXNzLmR5bi1ncmlkXSc6ICd0cnVlJyxcbiAgICAnW3N0eWxlLmZsZXgtZGlyZWN0aW9uXSc6ICdkaXJlY3Rpb24nXG4gIH0sXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXG59KVxuZXhwb3J0IGNsYXNzIEdyaWRDb250YWluZXJXaWRnZXRDb21wb25lbnQgZXh0ZW5kcyBBYnN0cmFjdFdpZGdldCB7XG5cbiAgZGlyZWN0aW9uOiBzdHJpbmc7XG5cbiAgY29uc3RydWN0b3IoY2RyOiBDaGFuZ2VEZXRlY3RvclJlZiwgZXhwcjogRXhwcmVzc2lvbnMpIHtcbiAgICBzdXBlcihjZHIsIGV4cHIpO1xuICB9XG5cbiAgZHluT25CZWZvcmVCaW5kKCkge1xuXG4gICAgdGhpcy5tYXAoJ2RpcmVjdGlvbicsIGRpciA9PiBkaXIgfHwgJ3JvdycpO1xuICB9XG5cbn1cbiJdfQ==