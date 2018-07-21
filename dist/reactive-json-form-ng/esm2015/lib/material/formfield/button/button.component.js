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
import { AbstractWidget, Expressions, } from '../../../core';
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnV0dG9uLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL3JlYWN0aXZlLWpzb24tZm9ybS1uZy8iLCJzb3VyY2VzIjpbImxpYi9tYXRlcmlhbC9mb3JtZmllbGQvYnV0dG9uL2J1dHRvbi5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQVFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsaUJBQWlCLEVBQUUsdUJBQXVCLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFekcsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3RDLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxZQUFZLENBQUM7QUFDeEMsT0FBTyxFQUFFLGNBQWMsRUFBRSxXQUFXLEdBQWUsTUFBTSxlQUFlLENBQUM7QUFZekUsTUFBTSw0QkFBNkIsU0FBUSxjQUFjOzs7OztJQU92RCxZQUFZLEdBQXNCLEVBQUUsSUFBaUI7UUFDbkQsS0FBSyxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQztLQUNsQjs7Ozs7SUFFRCxVQUFVLENBQUMsR0FBZTtRQUV4QixFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztZQUViLHVCQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUV6RCxFQUFFLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQztnQkFDVixNQUFNLElBQUksS0FBSyxDQUFDLHVFQUF1RSxDQUFDLENBQUM7WUFFM0YsRUFBRSxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUN4QixNQUFNLElBQUksS0FBSyxDQUFDLG9DQUFvQyxDQUFDLENBQUM7WUFFeEQsSUFBSSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUM7U0FDdkI7UUFFRCxNQUFNLENBQUMsR0FBRyxDQUFDO0tBQ1o7Ozs7O0lBRUQsVUFBVSxDQUFDLE1BQU07UUFFZixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztZQUNwQixJQUFJLENBQUMsVUFBVSxDQUFDLFdBQVcsRUFBRSxDQUFDO1lBQzlCLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDO1NBQ3hCO1FBRUQsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDZixJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQ3BFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUN2QixJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDO1NBQzNDO0tBQ0Y7OztZQW5ERixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLFlBQVk7Z0JBQ3RCLFFBQVEsRUFBRTs7O0NBR1g7Z0JBQ0MsTUFBTSxFQUFFLENBQUMsRUFBRSxDQUFDO2dCQUNaLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO2dCQUNyQyxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTthQUNoRDs7OztZQWYrRCxpQkFBaUI7WUFJeEQsV0FBVyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDE4IEFkcmlhbiBQYW5lbGxhIDxpYW5jaGk3NEBvdXRsb29rLmNvbT5cbiAqXG4gKiBUaGlzIHNvZnR3YXJlIGlzIHJlbGVhc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS5cbiAqIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvTUlUXG4gKi9cblxuXG5pbXBvcnQgeyBDb21wb25lbnQsIFZpZXdFbmNhcHN1bGF0aW9uLCBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ2hhbmdlRGV0ZWN0b3JSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgdGFrZSB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IGlzUmVhY3RpdmUgfSBmcm9tICdlc3ByZXNzaW9uJztcbmltcG9ydCB7IEFic3RyYWN0V2lkZ2V0LCBFeHByZXNzaW9ucywgSVdpZGdldERlZiwgfSBmcm9tICcuLi8uLi8uLi9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnd2RnLWJ1dHRvbicsXG4gIHRlbXBsYXRlOiBgPGJ1dHRvbiBtYXQtYnV0dG9uIChjbGljayk9XCJjbGlja0V2ZW50KCRldmVudClcIj5cbiAge3t0aXRsZX19XG48L2J1dHRvbj5cbmAsXG4gIHN0eWxlczogW2BgXSxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcbn0pXG5leHBvcnQgY2xhc3MgQnV0dG9uV2lkZ2V0Q29tcG9uZW50IGV4dGVuZHMgQWJzdHJhY3RXaWRnZXQge1xuXG4gIHRpdGxlOiBzdHJpbmc7XG4gIGNsaWNrOiBzdHJpbmc7XG5cbiAgcHJpdmF0ZSBfbHZhbHVlOiB7IG8sIG0gfTtcbiAgcHJpdmF0ZSBfY2xpY2tTdWJzOiBTdWJzY3JpcHRpb247XG4gIGNvbnN0cnVjdG9yKGNkcjogQ2hhbmdlRGV0ZWN0b3JSZWYsIGV4cHI6IEV4cHJlc3Npb25zKSB7XG4gICAgc3VwZXIoY2RyLCBleHByKTtcbiAgfVxuXG4gIGR5bk9uU2V0dXAoZGVmOiBJV2lkZ2V0RGVmKSB7XG5cbiAgICBpZiAoZGVmLmJpbmQpIHtcblxuICAgICAgY29uc3QgbHZhbHVlID0gdGhpcy5fZXhwci5sdmFsdWUoZGVmLmJpbmQsIHRoaXMuY29udGV4dCk7XG5cbiAgICAgIGlmICghbHZhbHVlKVxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0Zvcm0gZmllbGQgXCJiaW5kXCIgcHJvcGVydHkgbXVzdCBiZSBhbiBpZGVudGlmaWVyIG9yIG1lbWJlciBleHByZXNzaW9uJyk7XG5cbiAgICAgIGlmICghaXNSZWFjdGl2ZShsdmFsdWUubykpXG4gICAgICAgIHRocm93IG5ldyBFcnJvcignQm91bmQgS2V5IG11c3QgYmUgb2YgUmVhY3RpdmUgVHlwZScpO1xuXG4gICAgICB0aGlzLl9sdmFsdWUgPSBsdmFsdWU7XG4gICAgfVxuXG4gICAgcmV0dXJuIGRlZjtcbiAgfVxuXG4gIGNsaWNrRXZlbnQoX2V2ZW50KSB7XG5cbiAgICBpZiAodGhpcy5fY2xpY2tTdWJzKSB7XG4gICAgICB0aGlzLl9jbGlja1N1YnMudW5zdWJzY3JpYmUoKTtcbiAgICAgIHRoaXMuX2NsaWNrU3VicyA9IG51bGw7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuY2xpY2spIHtcbiAgICAgIHRoaXMuX2NsaWNrU3VicyA9IHRoaXMuX2V4cHIuZXZhbCh0aGlzLmNsaWNrLCB0aGlzLmNvbnRleHQsIHRydWUpLnBpcGUoXG4gICAgICAgIHRha2UoMSkpLnN1YnNjcmliZShyZXMgPT5cbiAgICAgICAgICB0aGlzLl9sdmFsdWUub1t0aGlzLl9sdmFsdWUubV0gPSByZXMpO1xuICAgIH1cbiAgfVxufVxuIl19