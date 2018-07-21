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
import { WidgetsCoreModule } from '../../core';
import { CardWidgetComponent } from './card/card.component';
import { TableWidgetComponent } from './table/table.component';
import { ContainerWidgetComponent } from './container/container.component';
import { GridContainerWidgetComponent } from './grid-container/gridcontainer.component';
import { TabsWidgetComponent } from './tabs/tabs.component';
import { CodeWidgetComponent } from './code/code.component';
export class CommonWidgetsModule {
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tbW9uLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL3JlYWN0aXZlLWpzb24tZm9ybS1uZy8iLCJzb3VyY2VzIjpbImxpYi9tYXRlcmlhbC9jb21tb24vY29tbW9uLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBUUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUV6QyxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDcEQsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sWUFBWSxDQUFDO0FBRS9DLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQzVELE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQy9ELE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBQzNFLE9BQU8sRUFBRSw0QkFBNEIsRUFBRSxNQUFNLDBDQUEwQyxDQUFDO0FBQ3hGLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQzVELE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBMkI1RCxNQUFNOzs7WUF6QkwsUUFBUSxTQUFDO2dCQUNSLE9BQU8sRUFBRTtvQkFDUCxjQUFjO29CQUVkLGlCQUFpQixDQUFDLE9BQU8sQ0FBQzt3QkFDeEIsT0FBTyxFQUFFOzRCQUNQLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsbUJBQW1CLEVBQUU7NEJBQ2hELEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxTQUFTLEVBQUUsb0JBQW9CLEVBQUU7NEJBQ2xELEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSxTQUFTLEVBQUUsd0JBQXdCLEVBQUM7NEJBQ3pELEVBQUUsSUFBSSxFQUFFLGdCQUFnQixFQUFFLFNBQVMsRUFBRSw0QkFBNEIsRUFBQzs0QkFDbEUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxtQkFBbUIsRUFBQzs0QkFDL0MsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxtQkFBbUIsRUFBQzt5QkFDaEQ7cUJBQ0YsQ0FBQztpQkFDSDtnQkFDRCxZQUFZLEVBQUU7b0JBQ1osbUJBQW1CO29CQUNuQixvQkFBb0I7b0JBQ3BCLHdCQUF3QjtvQkFDeEIsNEJBQTRCO29CQUM1QixtQkFBbUI7b0JBQ25CLG1CQUFtQjtpQkFDcEI7Z0JBQ0QsT0FBTyxFQUFFLEVBQUU7YUFDWiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDE4IEFkcmlhbiBQYW5lbGxhIDxpYW5jaGk3NEBvdXRsb29rLmNvbT5cbiAqXG4gKiBUaGlzIHNvZnR3YXJlIGlzIHJlbGVhc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS5cbiAqIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvTUlUXG4gKi9cblxuXG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBNYXRlcmlhbE1vZHVsZSB9IGZyb20gJy4uL21hdGVyaWFsLm1vZHVsZSc7XG5pbXBvcnQgeyBXaWRnZXRzQ29yZU1vZHVsZSB9IGZyb20gJy4uLy4uL2NvcmUnO1xuXG5pbXBvcnQgeyBDYXJkV2lkZ2V0Q29tcG9uZW50IH0gZnJvbSAnLi9jYXJkL2NhcmQuY29tcG9uZW50JztcbmltcG9ydCB7IFRhYmxlV2lkZ2V0Q29tcG9uZW50IH0gZnJvbSAnLi90YWJsZS90YWJsZS5jb21wb25lbnQnO1xuaW1wb3J0IHsgQ29udGFpbmVyV2lkZ2V0Q29tcG9uZW50IH0gZnJvbSAnLi9jb250YWluZXIvY29udGFpbmVyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBHcmlkQ29udGFpbmVyV2lkZ2V0Q29tcG9uZW50IH0gZnJvbSAnLi9ncmlkLWNvbnRhaW5lci9ncmlkY29udGFpbmVyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBUYWJzV2lkZ2V0Q29tcG9uZW50IH0gZnJvbSAnLi90YWJzL3RhYnMuY29tcG9uZW50JztcbmltcG9ydCB7IENvZGVXaWRnZXRDb21wb25lbnQgfSBmcm9tICcuL2NvZGUvY29kZS5jb21wb25lbnQnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgTWF0ZXJpYWxNb2R1bGUsXG5cbiAgICBXaWRnZXRzQ29yZU1vZHVsZS5mb3JSb290KHtcbiAgICAgIHdpZGdldHM6IFtcbiAgICAgICAgeyB0eXBlOiAnY2FyZCcsIGNvbXBvbmVudDogQ2FyZFdpZGdldENvbXBvbmVudCB9LFxuICAgICAgICB7IHR5cGU6ICd0YWJsZScsIGNvbXBvbmVudDogVGFibGVXaWRnZXRDb21wb25lbnQgfSxcbiAgICAgICAgeyB0eXBlOiAnY29udGFpbmVyJywgY29tcG9uZW50OiBDb250YWluZXJXaWRnZXRDb21wb25lbnR9LFxuICAgICAgICB7IHR5cGU6ICdncmlkLWNvbnRhaW5lcicsIGNvbXBvbmVudDogR3JpZENvbnRhaW5lcldpZGdldENvbXBvbmVudH0sXG4gICAgICAgIHsgdHlwZTogJ3RhYnMnLCBjb21wb25lbnQ6IFRhYnNXaWRnZXRDb21wb25lbnR9LFxuICAgICAgICB7IHR5cGU6ICdjb2RlJywgY29tcG9uZW50OiBDb2RlV2lkZ2V0Q29tcG9uZW50fSxcbiAgICAgIF1cbiAgICB9KVxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBDYXJkV2lkZ2V0Q29tcG9uZW50LFxuICAgIFRhYmxlV2lkZ2V0Q29tcG9uZW50LFxuICAgIENvbnRhaW5lcldpZGdldENvbXBvbmVudCxcbiAgICBHcmlkQ29udGFpbmVyV2lkZ2V0Q29tcG9uZW50LFxuICAgIFRhYnNXaWRnZXRDb21wb25lbnQsXG4gICAgQ29kZVdpZGdldENvbXBvbmVudCxcbiAgXSxcbiAgZXhwb3J0czogW11cbn0pXG5leHBvcnQgY2xhc3MgQ29tbW9uV2lkZ2V0c01vZHVsZSB7IH1cbiJdfQ==