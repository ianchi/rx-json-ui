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
import { take } from 'rxjs/operators';
import { isReactive } from 'espression';
import { AbstractWidget, Expressions, } from '../../../core/index';
export class ButtonWidgetComponent extends AbstractWidget {
    /**
     * @param {?} cdr
     * @param {?} expr
     */
    constructor(cdr, expr) {
        super(cdr, expr);
    }
    /**
     * @param {?} def
     * @return {?}
     */
    dynOnSetup(def) {
        if (def.bind) {
            const /** @type {?} */ lvalue = this._expr.lvalue(def.bind, this.context);
            if (!lvalue)
                throw new Error('Form field "bind" property must be an identifier or member expression');
            if (!isReactive(lvalue.o))
                throw new Error('Bound Key must be of Reactive Type');
            this._lvalue = lvalue;
        }
        return def;
    }
    /**
     * @param {?} _event
     * @return {?}
     */
    clickEvent(_event) {
        if (this._clickSubs) {
            this._clickSubs.unsubscribe();
            this._clickSubs = null;
        }
        if (this.click) {
            this._clickSubs = this._expr.eval(this.click, this.context, true).pipe(take(1)).subscribe(res => this._lvalue.o[this._lvalue.m] = res);
        }
    }
}
ButtonWidgetComponent.decorators = [
    { type: Component, args: [{
                selector: 'wdg-button',
                template: `<button mat-button (click)="clickEvent($event)">
  {{title}}
</button>
`,
                styles: [``],
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush
            },] },
];
/** @nocollapse */
ButtonWidgetComponent.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: Expressions }
];
function ButtonWidgetComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    ButtonWidgetComponent.prototype.title;
    /** @type {?} */
    ButtonWidgetComponent.prototype.click;
    /** @type {?} */
    ButtonWidgetComponent.prototype._lvalue;
    /** @type {?} */
    ButtonWidgetComponent.prototype._clickSubs;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnV0dG9uLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL3JlYWN0aXZlLWpzb24tZm9ybS1uZy8iLCJzb3VyY2VzIjpbImxpYi9tYXRlcmlhbC9mb3JtZmllbGQvYnV0dG9uL2J1dHRvbi5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQVFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsaUJBQWlCLEVBQUUsdUJBQXVCLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFekcsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3RDLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxZQUFZLENBQUM7QUFDeEMsT0FBTyxFQUFFLGNBQWMsRUFBRSxXQUFXLEdBQWUsTUFBTSxxQkFBcUIsQ0FBQztBQVkvRSxNQUFNLDRCQUE2QixTQUFRLGNBQWM7Ozs7O0lBT3ZELFlBQVksR0FBc0IsRUFBRSxJQUFpQjtRQUNuRCxLQUFLLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDO0tBQ2xCOzs7OztJQUVELFVBQVUsQ0FBQyxHQUFlO1FBRXhCLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBRWIsdUJBQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBRXpELEVBQUUsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDO2dCQUNWLE1BQU0sSUFBSSxLQUFLLENBQUMsdUVBQXVFLENBQUMsQ0FBQztZQUUzRixFQUFFLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3hCLE1BQU0sSUFBSSxLQUFLLENBQUMsb0NBQW9DLENBQUMsQ0FBQztZQUV4RCxJQUFJLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQztTQUN2QjtRQUVELE1BQU0sQ0FBQyxHQUFHLENBQUM7S0FDWjs7Ozs7SUFFRCxVQUFVLENBQUMsTUFBTTtRQUVmLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO1lBQ3BCLElBQUksQ0FBQyxVQUFVLENBQUMsV0FBVyxFQUFFLENBQUM7WUFDOUIsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUM7U0FDeEI7UUFFRCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztZQUNmLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDLElBQUksQ0FDcEUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQ3ZCLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUM7U0FDM0M7S0FDRjs7O1lBbkRGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsWUFBWTtnQkFDdEIsUUFBUSxFQUFFOzs7Q0FHWDtnQkFDQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLENBQUM7Z0JBQ1osYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7Z0JBQ3JDLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO2FBQ2hEOzs7O1lBZitELGlCQUFpQjtZQUl4RCxXQUFXIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTggQWRyaWFuIFBhbmVsbGEgPGlhbmNoaTc0QG91dGxvb2suY29tPlxuICpcbiAqIFRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLlxuICogaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9NSVRcbiAqL1xuXG5cbmltcG9ydCB7IENvbXBvbmVudCwgVmlld0VuY2Fwc3VsYXRpb24sIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDaGFuZ2VEZXRlY3RvclJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyB0YWtlIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgaXNSZWFjdGl2ZSB9IGZyb20gJ2VzcHJlc3Npb24nO1xuaW1wb3J0IHsgQWJzdHJhY3RXaWRnZXQsIEV4cHJlc3Npb25zLCBJV2lkZ2V0RGVmLCB9IGZyb20gJy4uLy4uLy4uL2NvcmUvaW5kZXgnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICd3ZGctYnV0dG9uJyxcbiAgdGVtcGxhdGU6IGA8YnV0dG9uIG1hdC1idXR0b24gKGNsaWNrKT1cImNsaWNrRXZlbnQoJGV2ZW50KVwiPlxuICB7e3RpdGxlfX1cbjwvYnV0dG9uPlxuYCxcbiAgc3R5bGVzOiBbYGBdLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBCdXR0b25XaWRnZXRDb21wb25lbnQgZXh0ZW5kcyBBYnN0cmFjdFdpZGdldCB7XG5cbiAgdGl0bGU6IHN0cmluZztcbiAgY2xpY2s6IHN0cmluZztcblxuICBwcml2YXRlIF9sdmFsdWU6IHsgbywgbSB9O1xuICBwcml2YXRlIF9jbGlja1N1YnM6IFN1YnNjcmlwdGlvbjtcbiAgY29uc3RydWN0b3IoY2RyOiBDaGFuZ2VEZXRlY3RvclJlZiwgZXhwcjogRXhwcmVzc2lvbnMpIHtcbiAgICBzdXBlcihjZHIsIGV4cHIpO1xuICB9XG5cbiAgZHluT25TZXR1cChkZWY6IElXaWRnZXREZWYpIHtcblxuICAgIGlmIChkZWYuYmluZCkge1xuXG4gICAgICBjb25zdCBsdmFsdWUgPSB0aGlzLl9leHByLmx2YWx1ZShkZWYuYmluZCwgdGhpcy5jb250ZXh0KTtcblxuICAgICAgaWYgKCFsdmFsdWUpXG4gICAgICAgIHRocm93IG5ldyBFcnJvcignRm9ybSBmaWVsZCBcImJpbmRcIiBwcm9wZXJ0eSBtdXN0IGJlIGFuIGlkZW50aWZpZXIgb3IgbWVtYmVyIGV4cHJlc3Npb24nKTtcblxuICAgICAgaWYgKCFpc1JlYWN0aXZlKGx2YWx1ZS5vKSlcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdCb3VuZCBLZXkgbXVzdCBiZSBvZiBSZWFjdGl2ZSBUeXBlJyk7XG5cbiAgICAgIHRoaXMuX2x2YWx1ZSA9IGx2YWx1ZTtcbiAgICB9XG5cbiAgICByZXR1cm4gZGVmO1xuICB9XG5cbiAgY2xpY2tFdmVudChfZXZlbnQpIHtcblxuICAgIGlmICh0aGlzLl9jbGlja1N1YnMpIHtcbiAgICAgIHRoaXMuX2NsaWNrU3Vicy51bnN1YnNjcmliZSgpO1xuICAgICAgdGhpcy5fY2xpY2tTdWJzID0gbnVsbDtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5jbGljaykge1xuICAgICAgdGhpcy5fY2xpY2tTdWJzID0gdGhpcy5fZXhwci5ldmFsKHRoaXMuY2xpY2ssIHRoaXMuY29udGV4dCwgdHJ1ZSkucGlwZShcbiAgICAgICAgdGFrZSgxKSkuc3Vic2NyaWJlKHJlcyA9PlxuICAgICAgICAgIHRoaXMuX2x2YWx1ZS5vW3RoaXMuX2x2YWx1ZS5tXSA9IHJlcyk7XG4gICAgfVxuICB9XG59XG4iXX0=