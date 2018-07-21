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
import { CommonModule } from '@angular/common';
import { NgModule, ANALYZE_FOR_ENTRY_COMPONENTS } from '@angular/core';
import { DefaultWidgetComponent } from './defaultwidget.component';
import { AF_CONFIG_TOKEN } from './widgetregistry.service';
import { WidgetDirective } from './widget.directive';
import { FormatPipe } from './format';
import { RoutedWidgetComponent } from './routedwidget.component';
var WidgetsCoreModule = /** @class */ (function () {
    function WidgetsCoreModule() {
    }
    /**
     * @param {?=} config
     * @return {?}
     */
    WidgetsCoreModule.forRoot = /**
     * @param {?=} config
     * @return {?}
     */
    function (config) {
        if (config === void 0) { config = {}; }
        return {
            ngModule: WidgetsCoreModule,
            providers: [
                { provide: AF_CONFIG_TOKEN, useValue: config, multi: true },
                { provide: ANALYZE_FOR_ENTRY_COMPONENTS, useValue: config, multi: true }
            ]
        };
    };
    WidgetsCoreModule.decorators = [
        { type: NgModule, args: [{
                    imports: [CommonModule],
                    declarations: [
                        WidgetDirective,
                        RoutedWidgetComponent,
                        DefaultWidgetComponent,
                        FormatPipe
                    ],
                    entryComponents: [DefaultWidgetComponent],
                    exports: [
                        WidgetDirective,
                        RoutedWidgetComponent,
                        FormatPipe
                    ]
                },] },
    ];
    return WidgetsCoreModule;
}());
export { WidgetsCoreModule };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29yZS5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9yZWFjdGl2ZS1qc29uLWZvcm0tbmcvIiwic291cmNlcyI6WyJsaWIvY29yZS9jb3JlLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBT0EsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxRQUFRLEVBQXVCLDRCQUE0QixFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRTVGLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQ25FLE9BQU8sRUFBRSxlQUFlLEVBQW1CLE1BQU0sMEJBQTBCLENBQUM7QUFDNUUsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ3JELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxVQUFVLENBQUM7QUFDdEMsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sMEJBQTBCLENBQUM7Ozs7Ozs7O0lBcUJ4RCx5QkFBTzs7OztJQUFkLFVBQWUsTUFBNEI7UUFBNUIsdUJBQUEsRUFBQSxXQUE0QjtRQUN6QyxNQUFNLENBQUM7WUFDTCxRQUFRLEVBQUUsaUJBQWlCO1lBQzNCLFNBQVMsRUFBRTtnQkFDVCxFQUFFLE9BQU8sRUFBRSxlQUFlLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFO2dCQUMzRCxFQUFFLE9BQU8sRUFBRSw0QkFBNEIsRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUU7YUFDekU7U0FDRixDQUFDO0tBQ0g7O2dCQTFCRixRQUFRLFNBQUM7b0JBRVIsT0FBTyxFQUFFLENBQUMsWUFBWSxDQUFDO29CQUN2QixZQUFZLEVBQUU7d0JBQ1osZUFBZTt3QkFDZixxQkFBcUI7d0JBQ3JCLHNCQUFzQjt3QkFDdEIsVUFBVTtxQkFDWDtvQkFDRCxlQUFlLEVBQUUsQ0FBQyxzQkFBc0IsQ0FBQztvQkFDekMsT0FBTyxFQUFFO3dCQUNQLGVBQWU7d0JBQ2YscUJBQXFCO3dCQUNyQixVQUFVO3FCQUNYO2lCQUNGOzs0QkFoQ0Q7O1NBaUNhLGlCQUFpQiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDE4IEFkcmlhbiBQYW5lbGxhIDxpYW5jaGk3NEBvdXRsb29rLmNvbT5cbiAqXG4gKiBUaGlzIHNvZnR3YXJlIGlzIHJlbGVhc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS5cbiAqIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvTUlUXG4gKi9cblxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE5nTW9kdWxlLCBNb2R1bGVXaXRoUHJvdmlkZXJzLCBBTkFMWVpFX0ZPUl9FTlRSWV9DT01QT05FTlRTIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IERlZmF1bHRXaWRnZXRDb21wb25lbnQgfSBmcm9tICcuL2RlZmF1bHR3aWRnZXQuY29tcG9uZW50JztcbmltcG9ydCB7IEFGX0NPTkZJR19UT0tFTiwgSUF1dG9Gb3JtQ29uZmlnIH0gZnJvbSAnLi93aWRnZXRyZWdpc3RyeS5zZXJ2aWNlJztcbmltcG9ydCB7IFdpZGdldERpcmVjdGl2ZSB9IGZyb20gJy4vd2lkZ2V0LmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBGb3JtYXRQaXBlIH0gZnJvbSAnLi9mb3JtYXQnO1xuaW1wb3J0IHsgUm91dGVkV2lkZ2V0Q29tcG9uZW50IH0gZnJvbSAnLi9yb3V0ZWR3aWRnZXQuY29tcG9uZW50JztcblxuXG5ATmdNb2R1bGUoe1xuXG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGVdLFxuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBXaWRnZXREaXJlY3RpdmUsXG4gICAgUm91dGVkV2lkZ2V0Q29tcG9uZW50LFxuICAgIERlZmF1bHRXaWRnZXRDb21wb25lbnQsXG4gICAgRm9ybWF0UGlwZVxuICBdLFxuICBlbnRyeUNvbXBvbmVudHM6IFtEZWZhdWx0V2lkZ2V0Q29tcG9uZW50XSxcbiAgZXhwb3J0czogW1xuICAgIFdpZGdldERpcmVjdGl2ZSxcbiAgICBSb3V0ZWRXaWRnZXRDb21wb25lbnQsXG4gICAgRm9ybWF0UGlwZVxuICBdXG59KVxuZXhwb3J0IGNsYXNzIFdpZGdldHNDb3JlTW9kdWxlIHtcblxuICBzdGF0aWMgZm9yUm9vdChjb25maWc6IElBdXRvRm9ybUNvbmZpZyA9IHt9KTogTW9kdWxlV2l0aFByb3ZpZGVycyB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5nTW9kdWxlOiBXaWRnZXRzQ29yZU1vZHVsZSxcbiAgICAgIHByb3ZpZGVyczogW1xuICAgICAgICB7IHByb3ZpZGU6IEFGX0NPTkZJR19UT0tFTiwgdXNlVmFsdWU6IGNvbmZpZywgbXVsdGk6IHRydWUgfSxcbiAgICAgICAgeyBwcm92aWRlOiBBTkFMWVpFX0ZPUl9FTlRSWV9DT01QT05FTlRTLCB1c2VWYWx1ZTogY29uZmlnLCBtdWx0aTogdHJ1ZSB9XG4gICAgICBdXG4gICAgfTtcbiAgfVxufVxuXG5cbiJdfQ==