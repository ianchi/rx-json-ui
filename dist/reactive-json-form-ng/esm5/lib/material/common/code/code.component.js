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
import { AbstractWidget, Expressions } from '../../../core';
var CodeWidgetComponent = /** @class */ (function (_super) {
    tslib_1.__extends(CodeWidgetComponent, _super);
    function CodeWidgetComponent(cdr, expr) {
        return _super.call(this, cdr, expr) || this;
    }
    CodeWidgetComponent.decorators = [
        { type: Component, args: [{
                    selector: 'wdg-code',
                    template: "<code>\n{{text}}\n</code>",
                    styles: ["dyn-code code{white-space:pre}"],
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush
                },] },
    ];
    /** @nocollapse */
    CodeWidgetComponent.ctorParameters = function () { return [
        { type: ChangeDetectorRef },
        { type: Expressions }
    ]; };
    return CodeWidgetComponent;
}(AbstractWidget));
export { CodeWidgetComponent };
function CodeWidgetComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    CodeWidgetComponent.prototype.text;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29kZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9yZWFjdGl2ZS1qc29uLWZvcm0tbmcvIiwic291cmNlcyI6WyJsaWIvbWF0ZXJpYWwvY29tbW9uL2NvZGUvY29kZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFPQSxPQUFPLEVBQUUsU0FBUyxFQUFFLGlCQUFpQixFQUFFLHVCQUF1QixFQUFFLGlCQUFpQixFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3hHLE9BQU8sRUFBRSxjQUFjLEVBQUUsV0FBVyxFQUFFLE1BQU0sZUFBZSxDQUFDOztJQVluQiwrQ0FBYztJQUluRCw2QkFBWSxHQUFzQixFQUFFLElBQWlCO2VBQ2pELGtCQUFNLEdBQUcsRUFBRSxJQUFJLENBQUM7S0FDbkI7O2dCQWhCSixTQUFTLFNBQUM7b0JBQ1AsUUFBUSxFQUFFLFVBQVU7b0JBQ3BCLFFBQVEsRUFBRSwyQkFFTjtvQkFDSixNQUFNLEVBQUUsQ0FBQyxnQ0FBZ0MsQ0FBQztvQkFFMUMsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7b0JBQ3JDLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO2lCQUNsRDs7OztnQkFaK0QsaUJBQWlCO2dCQUN4RCxXQUFXOzs4QkFScEM7RUFvQnlDLGNBQWM7U0FBMUMsbUJBQW1CIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTggQWRyaWFuIFBhbmVsbGEgPGlhbmNoaTc0QG91dGxvb2suY29tPlxuICpcbiAqIFRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLlxuICogaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9NSVRcbiAqL1xuXG5pbXBvcnQgeyBDb21wb25lbnQsIFZpZXdFbmNhcHN1bGF0aW9uLCBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ2hhbmdlRGV0ZWN0b3JSZWZ9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQWJzdHJhY3RXaWRnZXQsIEV4cHJlc3Npb25zIH0gZnJvbSAnLi4vLi4vLi4vY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnd2RnLWNvZGUnLFxuICAgIHRlbXBsYXRlOiBgPGNvZGU+XG57e3RleHR9fVxuPC9jb2RlPmAsXG4gICAgc3R5bGVzOiBbYGR5bi1jb2RlIGNvZGV7d2hpdGUtc3BhY2U6cHJlfWBdLFxuXG4gICAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBDb2RlV2lkZ2V0Q29tcG9uZW50IGV4dGVuZHMgQWJzdHJhY3RXaWRnZXQge1xuXG4gICAgdGV4dDogc3RyaW5nO1xuXG4gICAgY29uc3RydWN0b3IoY2RyOiBDaGFuZ2VEZXRlY3RvclJlZiwgZXhwcjogRXhwcmVzc2lvbnMpIHtcbiAgICAgICAgc3VwZXIoY2RyLCBleHByKTtcbiAgICB9XG5cbn1cbiJdfQ==