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
import { NgModule } from '@angular/core';
import { MaterialModule } from '../material.module';
import { WidgetsCoreModule } from '../../core/index';
import { CardWidgetComponent } from './card/card.component';
import { TableWidgetComponent } from './table/table.component';
import { ContainerWidgetComponent } from './container/container.component';
import { GridContainerWidgetComponent } from './grid-container/gridcontainer.component';
import { TabsWidgetComponent } from './tabs/tabs.component';
import { CodeWidgetComponent } from './code/code.component';
var CommonWidgetsModule = /** @class */ (function () {
    function CommonWidgetsModule() {
    }
    CommonWidgetsModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        MaterialModule,
                        WidgetsCoreModule.forRoot({
                            widgets: [
                                { type: 'card', component: CardWidgetComponent },
                                { type: 'table', component: TableWidgetComponent },
                                { type: 'container', component: ContainerWidgetComponent },
                                { type: 'grid-container', component: GridContainerWidgetComponent },
                                { type: 'tabs', component: TabsWidgetComponent },
                                { type: 'code', component: CodeWidgetComponent },
                            ]
                        })
                    ],
                    declarations: [
                        CardWidgetComponent,
                        TableWidgetComponent,
                        ContainerWidgetComponent,
                        GridContainerWidgetComponent,
                        TabsWidgetComponent,
                        CodeWidgetComponent,
                    ],
                    exports: []
                },] },
    ];
    return CommonWidgetsModule;
}());
export { CommonWidgetsModule };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tbW9uLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL3JlYWN0aXZlLWpzb24tZm9ybS1uZy8iLCJzb3VyY2VzIjpbImxpYi9tYXRlcmlhbC9jb21tb24vY29tbW9uLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBUUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUV6QyxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDcEQsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFFckQsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDNUQsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDL0QsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFDM0UsT0FBTyxFQUFFLDRCQUE0QixFQUFFLE1BQU0sMENBQTBDLENBQUM7QUFDeEYsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDNUQsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7Ozs7O2dCQUUzRCxRQUFRLFNBQUM7b0JBQ1IsT0FBTyxFQUFFO3dCQUNQLGNBQWM7d0JBRWQsaUJBQWlCLENBQUMsT0FBTyxDQUFDOzRCQUN4QixPQUFPLEVBQUU7Z0NBQ1AsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxtQkFBbUIsRUFBRTtnQ0FDaEQsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLFNBQVMsRUFBRSxvQkFBb0IsRUFBRTtnQ0FDbEQsRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFLFNBQVMsRUFBRSx3QkFBd0IsRUFBQztnQ0FDekQsRUFBRSxJQUFJLEVBQUUsZ0JBQWdCLEVBQUUsU0FBUyxFQUFFLDRCQUE0QixFQUFDO2dDQUNsRSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLG1CQUFtQixFQUFDO2dDQUMvQyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLG1CQUFtQixFQUFDOzZCQUNoRDt5QkFDRixDQUFDO3FCQUNIO29CQUNELFlBQVksRUFBRTt3QkFDWixtQkFBbUI7d0JBQ25CLG9CQUFvQjt3QkFDcEIsd0JBQXdCO3dCQUN4Qiw0QkFBNEI7d0JBQzVCLG1CQUFtQjt3QkFDbkIsbUJBQW1CO3FCQUNwQjtvQkFDRCxPQUFPLEVBQUUsRUFBRTtpQkFDWjs7OEJBNUNEOztTQTZDYSxtQkFBbUIiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxOCBBZHJpYW4gUGFuZWxsYSA8aWFuY2hpNzRAb3V0bG9vay5jb20+XG4gKlxuICogVGhpcyBzb2Z0d2FyZSBpcyByZWxlYXNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuXG4gKiBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL01JVFxuICovXG5cblxuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgTWF0ZXJpYWxNb2R1bGUgfSBmcm9tICcuLi9tYXRlcmlhbC5tb2R1bGUnO1xuaW1wb3J0IHsgV2lkZ2V0c0NvcmVNb2R1bGUgfSBmcm9tICcuLi8uLi9jb3JlL2luZGV4JztcblxuaW1wb3J0IHsgQ2FyZFdpZGdldENvbXBvbmVudCB9IGZyb20gJy4vY2FyZC9jYXJkLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBUYWJsZVdpZGdldENvbXBvbmVudCB9IGZyb20gJy4vdGFibGUvdGFibGUuY29tcG9uZW50JztcbmltcG9ydCB7IENvbnRhaW5lcldpZGdldENvbXBvbmVudCB9IGZyb20gJy4vY29udGFpbmVyL2NvbnRhaW5lci5jb21wb25lbnQnO1xuaW1wb3J0IHsgR3JpZENvbnRhaW5lcldpZGdldENvbXBvbmVudCB9IGZyb20gJy4vZ3JpZC1jb250YWluZXIvZ3JpZGNvbnRhaW5lci5jb21wb25lbnQnO1xuaW1wb3J0IHsgVGFic1dpZGdldENvbXBvbmVudCB9IGZyb20gJy4vdGFicy90YWJzLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBDb2RlV2lkZ2V0Q29tcG9uZW50IH0gZnJvbSAnLi9jb2RlL2NvZGUuY29tcG9uZW50JztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIE1hdGVyaWFsTW9kdWxlLFxuXG4gICAgV2lkZ2V0c0NvcmVNb2R1bGUuZm9yUm9vdCh7XG4gICAgICB3aWRnZXRzOiBbXG4gICAgICAgIHsgdHlwZTogJ2NhcmQnLCBjb21wb25lbnQ6IENhcmRXaWRnZXRDb21wb25lbnQgfSxcbiAgICAgICAgeyB0eXBlOiAndGFibGUnLCBjb21wb25lbnQ6IFRhYmxlV2lkZ2V0Q29tcG9uZW50IH0sXG4gICAgICAgIHsgdHlwZTogJ2NvbnRhaW5lcicsIGNvbXBvbmVudDogQ29udGFpbmVyV2lkZ2V0Q29tcG9uZW50fSxcbiAgICAgICAgeyB0eXBlOiAnZ3JpZC1jb250YWluZXInLCBjb21wb25lbnQ6IEdyaWRDb250YWluZXJXaWRnZXRDb21wb25lbnR9LFxuICAgICAgICB7IHR5cGU6ICd0YWJzJywgY29tcG9uZW50OiBUYWJzV2lkZ2V0Q29tcG9uZW50fSxcbiAgICAgICAgeyB0eXBlOiAnY29kZScsIGNvbXBvbmVudDogQ29kZVdpZGdldENvbXBvbmVudH0sXG4gICAgICBdXG4gICAgfSlcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgQ2FyZFdpZGdldENvbXBvbmVudCxcbiAgICBUYWJsZVdpZGdldENvbXBvbmVudCxcbiAgICBDb250YWluZXJXaWRnZXRDb21wb25lbnQsXG4gICAgR3JpZENvbnRhaW5lcldpZGdldENvbXBvbmVudCxcbiAgICBUYWJzV2lkZ2V0Q29tcG9uZW50LFxuICAgIENvZGVXaWRnZXRDb21wb25lbnQsXG4gIF0sXG4gIGV4cG9ydHM6IFtdXG59KVxuZXhwb3J0IGNsYXNzIENvbW1vbldpZGdldHNNb2R1bGUgeyB9XG4iXX0=