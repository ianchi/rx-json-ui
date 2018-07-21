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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29yZS5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9yZWFjdGl2ZS1qc29uLWZvcm0tbmcvIiwic291cmNlcyI6WyJsaWIvY29yZS9jb3JlLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBT0EsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxRQUFRLEVBQXVCLDRCQUE0QixFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRTVGLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQ25FLE9BQU8sRUFBRSxlQUFlLEVBQW1CLE1BQU0sMEJBQTBCLENBQUM7QUFDNUUsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ3JELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxVQUFVLENBQUM7QUFDdEMsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sMEJBQTBCLENBQUM7Ozs7Ozs7O0lBb0J4RCx5QkFBTzs7OztJQUFkLFVBQWUsTUFBNEI7UUFBNUIsdUJBQUEsRUFBQSxXQUE0QjtRQUN6QyxNQUFNLENBQUM7WUFDTCxRQUFRLEVBQUUsaUJBQWlCO1lBQzNCLFNBQVMsRUFBRTtnQkFDVCxFQUFFLE9BQU8sRUFBRSxlQUFlLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFO2dCQUMzRCxFQUFFLE9BQU8sRUFBRSw0QkFBNEIsRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUU7YUFDekU7U0FDRixDQUFDO0tBQ0g7O2dCQTFCRixRQUFRLFNBQUM7b0JBRVIsT0FBTyxFQUFFLENBQUMsWUFBWSxDQUFDO29CQUN2QixZQUFZLEVBQUU7d0JBQ1osZUFBZTt3QkFDZixxQkFBcUI7d0JBQ3JCLHNCQUFzQjt3QkFDdEIsVUFBVTtxQkFDWDtvQkFDRCxlQUFlLEVBQUUsQ0FBQyxzQkFBc0IsQ0FBQztvQkFDekMsT0FBTyxFQUFFO3dCQUNQLGVBQWU7d0JBQ2YscUJBQXFCO3dCQUNyQixVQUFVO3FCQUNYO2lCQUNGOzs0QkEvQkQ7O1NBZ0NhLGlCQUFpQiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDE4IEFkcmlhbiBQYW5lbGxhIDxpYW5jaGk3NEBvdXRsb29rLmNvbT5cbiAqXG4gKiBUaGlzIHNvZnR3YXJlIGlzIHJlbGVhc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS5cbiAqIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvTUlUXG4gKi9cblxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE5nTW9kdWxlLCBNb2R1bGVXaXRoUHJvdmlkZXJzLCBBTkFMWVpFX0ZPUl9FTlRSWV9DT01QT05FTlRTIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IERlZmF1bHRXaWRnZXRDb21wb25lbnQgfSBmcm9tICcuL2RlZmF1bHR3aWRnZXQuY29tcG9uZW50JztcbmltcG9ydCB7IEFGX0NPTkZJR19UT0tFTiwgSUF1dG9Gb3JtQ29uZmlnIH0gZnJvbSAnLi93aWRnZXRyZWdpc3RyeS5zZXJ2aWNlJztcbmltcG9ydCB7IFdpZGdldERpcmVjdGl2ZSB9IGZyb20gJy4vd2lkZ2V0LmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBGb3JtYXRQaXBlIH0gZnJvbSAnLi9mb3JtYXQnO1xuaW1wb3J0IHsgUm91dGVkV2lkZ2V0Q29tcG9uZW50IH0gZnJvbSAnLi9yb3V0ZWR3aWRnZXQuY29tcG9uZW50JztcblxuQE5nTW9kdWxlKHtcblxuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlXSxcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgV2lkZ2V0RGlyZWN0aXZlLFxuICAgIFJvdXRlZFdpZGdldENvbXBvbmVudCxcbiAgICBEZWZhdWx0V2lkZ2V0Q29tcG9uZW50LFxuICAgIEZvcm1hdFBpcGVcbiAgXSxcbiAgZW50cnlDb21wb25lbnRzOiBbRGVmYXVsdFdpZGdldENvbXBvbmVudF0sXG4gIGV4cG9ydHM6IFtcbiAgICBXaWRnZXREaXJlY3RpdmUsXG4gICAgUm91dGVkV2lkZ2V0Q29tcG9uZW50LFxuICAgIEZvcm1hdFBpcGVcbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBXaWRnZXRzQ29yZU1vZHVsZSB7XG5cbiAgc3RhdGljIGZvclJvb3QoY29uZmlnOiBJQXV0b0Zvcm1Db25maWcgPSB7fSk6IE1vZHVsZVdpdGhQcm92aWRlcnMge1xuICAgIHJldHVybiB7XG4gICAgICBuZ01vZHVsZTogV2lkZ2V0c0NvcmVNb2R1bGUsXG4gICAgICBwcm92aWRlcnM6IFtcbiAgICAgICAgeyBwcm92aWRlOiBBRl9DT05GSUdfVE9LRU4sIHVzZVZhbHVlOiBjb25maWcsIG11bHRpOiB0cnVlIH0sXG4gICAgICAgIHsgcHJvdmlkZTogQU5BTFlaRV9GT1JfRU5UUllfQ09NUE9ORU5UUywgdXNlVmFsdWU6IGNvbmZpZywgbXVsdGk6IHRydWUgfVxuICAgICAgXVxuICAgIH07XG4gIH1cbn1cblxuXG4iXX0=