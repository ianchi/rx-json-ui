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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tbW9uLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL3JlYWN0aXZlLWpzb24tZm9ybS1uZy8iLCJzb3VyY2VzIjpbImxpYi9tYXRlcmlhbC9jb21tb24vY29tbW9uLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBUUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUV6QyxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDcEQsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFFckQsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDNUQsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDL0QsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFDM0UsT0FBTyxFQUFFLDRCQUE0QixFQUFFLE1BQU0sMENBQTBDLENBQUM7QUFDeEYsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDNUQsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUEyQjVELE1BQU07OztZQXpCTCxRQUFRLFNBQUM7Z0JBQ1IsT0FBTyxFQUFFO29CQUNQLGNBQWM7b0JBRWQsaUJBQWlCLENBQUMsT0FBTyxDQUFDO3dCQUN4QixPQUFPLEVBQUU7NEJBQ1AsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxtQkFBbUIsRUFBRTs0QkFDaEQsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLFNBQVMsRUFBRSxvQkFBb0IsRUFBRTs0QkFDbEQsRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFLFNBQVMsRUFBRSx3QkFBd0IsRUFBQzs0QkFDekQsRUFBRSxJQUFJLEVBQUUsZ0JBQWdCLEVBQUUsU0FBUyxFQUFFLDRCQUE0QixFQUFDOzRCQUNsRSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLG1CQUFtQixFQUFDOzRCQUMvQyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLG1CQUFtQixFQUFDO3lCQUNoRDtxQkFDRixDQUFDO2lCQUNIO2dCQUNELFlBQVksRUFBRTtvQkFDWixtQkFBbUI7b0JBQ25CLG9CQUFvQjtvQkFDcEIsd0JBQXdCO29CQUN4Qiw0QkFBNEI7b0JBQzVCLG1CQUFtQjtvQkFDbkIsbUJBQW1CO2lCQUNwQjtnQkFDRCxPQUFPLEVBQUUsRUFBRTthQUNaIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTggQWRyaWFuIFBhbmVsbGEgPGlhbmNoaTc0QG91dGxvb2suY29tPlxuICpcbiAqIFRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLlxuICogaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9NSVRcbiAqL1xuXG5cbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IE1hdGVyaWFsTW9kdWxlIH0gZnJvbSAnLi4vbWF0ZXJpYWwubW9kdWxlJztcbmltcG9ydCB7IFdpZGdldHNDb3JlTW9kdWxlIH0gZnJvbSAnLi4vLi4vY29yZS9pbmRleCc7XG5cbmltcG9ydCB7IENhcmRXaWRnZXRDb21wb25lbnQgfSBmcm9tICcuL2NhcmQvY2FyZC5jb21wb25lbnQnO1xuaW1wb3J0IHsgVGFibGVXaWRnZXRDb21wb25lbnQgfSBmcm9tICcuL3RhYmxlL3RhYmxlLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBDb250YWluZXJXaWRnZXRDb21wb25lbnQgfSBmcm9tICcuL2NvbnRhaW5lci9jb250YWluZXIuY29tcG9uZW50JztcbmltcG9ydCB7IEdyaWRDb250YWluZXJXaWRnZXRDb21wb25lbnQgfSBmcm9tICcuL2dyaWQtY29udGFpbmVyL2dyaWRjb250YWluZXIuY29tcG9uZW50JztcbmltcG9ydCB7IFRhYnNXaWRnZXRDb21wb25lbnQgfSBmcm9tICcuL3RhYnMvdGFicy5jb21wb25lbnQnO1xuaW1wb3J0IHsgQ29kZVdpZGdldENvbXBvbmVudCB9IGZyb20gJy4vY29kZS9jb2RlLmNvbXBvbmVudCc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBNYXRlcmlhbE1vZHVsZSxcblxuICAgIFdpZGdldHNDb3JlTW9kdWxlLmZvclJvb3Qoe1xuICAgICAgd2lkZ2V0czogW1xuICAgICAgICB7IHR5cGU6ICdjYXJkJywgY29tcG9uZW50OiBDYXJkV2lkZ2V0Q29tcG9uZW50IH0sXG4gICAgICAgIHsgdHlwZTogJ3RhYmxlJywgY29tcG9uZW50OiBUYWJsZVdpZGdldENvbXBvbmVudCB9LFxuICAgICAgICB7IHR5cGU6ICdjb250YWluZXInLCBjb21wb25lbnQ6IENvbnRhaW5lcldpZGdldENvbXBvbmVudH0sXG4gICAgICAgIHsgdHlwZTogJ2dyaWQtY29udGFpbmVyJywgY29tcG9uZW50OiBHcmlkQ29udGFpbmVyV2lkZ2V0Q29tcG9uZW50fSxcbiAgICAgICAgeyB0eXBlOiAndGFicycsIGNvbXBvbmVudDogVGFic1dpZGdldENvbXBvbmVudH0sXG4gICAgICAgIHsgdHlwZTogJ2NvZGUnLCBjb21wb25lbnQ6IENvZGVXaWRnZXRDb21wb25lbnR9LFxuICAgICAgXVxuICAgIH0pXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW1xuICAgIENhcmRXaWRnZXRDb21wb25lbnQsXG4gICAgVGFibGVXaWRnZXRDb21wb25lbnQsXG4gICAgQ29udGFpbmVyV2lkZ2V0Q29tcG9uZW50LFxuICAgIEdyaWRDb250YWluZXJXaWRnZXRDb21wb25lbnQsXG4gICAgVGFic1dpZGdldENvbXBvbmVudCxcbiAgICBDb2RlV2lkZ2V0Q29tcG9uZW50LFxuICBdLFxuICBleHBvcnRzOiBbXVxufSlcbmV4cG9ydCBjbGFzcyBDb21tb25XaWRnZXRzTW9kdWxlIHsgfVxuIl19