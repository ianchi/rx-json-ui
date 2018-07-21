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
import { InputWidgetComponent } from './input/input.component';
import { CheckboxWidgetComponent } from './checkbox/checkbox.component';
import { ToggleWidgetComponent } from './toggle/toggle.component';
import { SliderWidgetComponent } from './slider/slider.component';
import { ButtonWidgetComponent } from './button/button.component';
import { FormWidgetComponent } from './form/form.component';
import { AutocompleteWidgetComponent } from './autocomplete/autocomplete.component';
export class FormFieldWidgetsModule {
}
FormFieldWidgetsModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    MaterialModule,
                    WidgetsCoreModule.forRoot({
                        widgets: [
                            { type: 'input', component: InputWidgetComponent },
                            { type: 'checkbox', component: CheckboxWidgetComponent },
                            { type: 'toggle', component: ToggleWidgetComponent },
                            { type: 'slider', component: SliderWidgetComponent },
                            { type: 'button', component: ButtonWidgetComponent },
                            { type: 'form', component: FormWidgetComponent },
                            { type: 'autocomplete', component: AutocompleteWidgetComponent },
                        ]
                    })
                ],
                declarations: [
                    InputWidgetComponent,
                    CheckboxWidgetComponent,
                    ToggleWidgetComponent,
                    SliderWidgetComponent,
                    ButtonWidgetComponent,
                    FormWidgetComponent,
                    AutocompleteWidgetComponent
                ],
                exports: []
            },] },
];

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybWZpZWxkLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL3JlYWN0aXZlLWpzb24tZm9ybS1uZy8iLCJzb3VyY2VzIjpbImxpYi9tYXRlcmlhbC9mb3JtZmllbGQvZm9ybWZpZWxkLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBUUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUV6QyxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDcEQsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sWUFBWSxDQUFDO0FBRS9DLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQy9ELE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQ3hFLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQ2xFLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQ2xFLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQ2xFLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQzVELE9BQU8sRUFBRSwyQkFBMkIsRUFBRSxNQUFNLHVDQUF1QyxDQUFDO0FBK0JwRixNQUFNOzs7WUE1QkwsUUFBUSxTQUFDO2dCQUNSLE9BQU8sRUFBRTtvQkFDUCxjQUFjO29CQUVkLGlCQUFpQixDQUFDLE9BQU8sQ0FBQzt3QkFDeEIsT0FBTyxFQUFFOzRCQUNQLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxTQUFTLEVBQUUsb0JBQW9CLEVBQUU7NEJBQ2xELEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxTQUFTLEVBQUUsdUJBQXVCLEVBQUU7NEJBQ3hELEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUUscUJBQXFCLEVBQUU7NEJBQ3BELEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUUscUJBQXFCLEVBQUU7NEJBQ3BELEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUUscUJBQXFCLEVBQUU7NEJBQ3BELEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsbUJBQW1CLEVBQUU7NEJBQ2hELEVBQUUsSUFBSSxFQUFFLGNBQWMsRUFBRSxTQUFTLEVBQUUsMkJBQTJCLEVBQUU7eUJBRWpFO3FCQUNGLENBQUM7aUJBQ0g7Z0JBQ0QsWUFBWSxFQUFFO29CQUNaLG9CQUFvQjtvQkFDcEIsdUJBQXVCO29CQUN2QixxQkFBcUI7b0JBQ3JCLHFCQUFxQjtvQkFDckIscUJBQXFCO29CQUNyQixtQkFBbUI7b0JBQ25CLDJCQUEyQjtpQkFDNUI7Z0JBQ0QsT0FBTyxFQUFFLEVBQUU7YUFDWiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDE4IEFkcmlhbiBQYW5lbGxhIDxpYW5jaGk3NEBvdXRsb29rLmNvbT5cbiAqXG4gKiBUaGlzIHNvZnR3YXJlIGlzIHJlbGVhc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS5cbiAqIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvTUlUXG4gKi9cblxuXG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBNYXRlcmlhbE1vZHVsZSB9IGZyb20gJy4uL21hdGVyaWFsLm1vZHVsZSc7XG5pbXBvcnQgeyBXaWRnZXRzQ29yZU1vZHVsZSB9IGZyb20gJy4uLy4uL2NvcmUnO1xuXG5pbXBvcnQgeyBJbnB1dFdpZGdldENvbXBvbmVudCB9IGZyb20gJy4vaW5wdXQvaW5wdXQuY29tcG9uZW50JztcbmltcG9ydCB7IENoZWNrYm94V2lkZ2V0Q29tcG9uZW50IH0gZnJvbSAnLi9jaGVja2JveC9jaGVja2JveC5jb21wb25lbnQnO1xuaW1wb3J0IHsgVG9nZ2xlV2lkZ2V0Q29tcG9uZW50IH0gZnJvbSAnLi90b2dnbGUvdG9nZ2xlLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBTbGlkZXJXaWRnZXRDb21wb25lbnQgfSBmcm9tICcuL3NsaWRlci9zbGlkZXIuY29tcG9uZW50JztcbmltcG9ydCB7IEJ1dHRvbldpZGdldENvbXBvbmVudCB9IGZyb20gJy4vYnV0dG9uL2J1dHRvbi5jb21wb25lbnQnO1xuaW1wb3J0IHsgRm9ybVdpZGdldENvbXBvbmVudCB9IGZyb20gJy4vZm9ybS9mb3JtLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBBdXRvY29tcGxldGVXaWRnZXRDb21wb25lbnQgfSBmcm9tICcuL2F1dG9jb21wbGV0ZS9hdXRvY29tcGxldGUuY29tcG9uZW50JztcblxuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgTWF0ZXJpYWxNb2R1bGUsXG5cbiAgICBXaWRnZXRzQ29yZU1vZHVsZS5mb3JSb290KHtcbiAgICAgIHdpZGdldHM6IFtcbiAgICAgICAgeyB0eXBlOiAnaW5wdXQnLCBjb21wb25lbnQ6IElucHV0V2lkZ2V0Q29tcG9uZW50IH0sXG4gICAgICAgIHsgdHlwZTogJ2NoZWNrYm94JywgY29tcG9uZW50OiBDaGVja2JveFdpZGdldENvbXBvbmVudCB9LFxuICAgICAgICB7IHR5cGU6ICd0b2dnbGUnLCBjb21wb25lbnQ6IFRvZ2dsZVdpZGdldENvbXBvbmVudCB9LFxuICAgICAgICB7IHR5cGU6ICdzbGlkZXInLCBjb21wb25lbnQ6IFNsaWRlcldpZGdldENvbXBvbmVudCB9LFxuICAgICAgICB7IHR5cGU6ICdidXR0b24nLCBjb21wb25lbnQ6IEJ1dHRvbldpZGdldENvbXBvbmVudCB9LFxuICAgICAgICB7IHR5cGU6ICdmb3JtJywgY29tcG9uZW50OiBGb3JtV2lkZ2V0Q29tcG9uZW50IH0sXG4gICAgICAgIHsgdHlwZTogJ2F1dG9jb21wbGV0ZScsIGNvbXBvbmVudDogQXV0b2NvbXBsZXRlV2lkZ2V0Q29tcG9uZW50IH0sXG5cbiAgICAgIF1cbiAgICB9KVxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBJbnB1dFdpZGdldENvbXBvbmVudCxcbiAgICBDaGVja2JveFdpZGdldENvbXBvbmVudCxcbiAgICBUb2dnbGVXaWRnZXRDb21wb25lbnQsXG4gICAgU2xpZGVyV2lkZ2V0Q29tcG9uZW50LFxuICAgIEJ1dHRvbldpZGdldENvbXBvbmVudCxcbiAgICBGb3JtV2lkZ2V0Q29tcG9uZW50LFxuICAgIEF1dG9jb21wbGV0ZVdpZGdldENvbXBvbmVudFxuICBdLFxuICBleHBvcnRzOiBbXVxufSlcbmV4cG9ydCBjbGFzcyBGb3JtRmllbGRXaWRnZXRzTW9kdWxlIHsgfVxuIl19