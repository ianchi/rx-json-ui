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
import { InputWidgetComponent } from './input/input.component';
import { CheckboxWidgetComponent } from './checkbox/checkbox.component';
import { ToggleWidgetComponent } from './toggle/toggle.component';
import { SliderWidgetComponent } from './slider/slider.component';
import { ButtonWidgetComponent } from './button/button.component';
import { FormWidgetComponent } from './form/form.component';
import { AutocompleteWidgetComponent } from './autocomplete/autocomplete.component';
var FormFieldWidgetsModule = /** @class */ (function () {
    function FormFieldWidgetsModule() {
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
    return FormFieldWidgetsModule;
}());
export { FormFieldWidgetsModule };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybWZpZWxkLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL3JlYWN0aXZlLWpzb24tZm9ybS1uZy8iLCJzb3VyY2VzIjpbImxpYi9tYXRlcmlhbC9mb3JtZmllbGQvZm9ybWZpZWxkLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBUUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUV6QyxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDcEQsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFFckQsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDL0QsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFDeEUsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDbEUsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDbEUsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDbEUsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDNUQsT0FBTyxFQUFFLDJCQUEyQixFQUFFLE1BQU0sdUNBQXVDLENBQUM7Ozs7O2dCQUduRixRQUFRLFNBQUM7b0JBQ1IsT0FBTyxFQUFFO3dCQUNQLGNBQWM7d0JBRWQsaUJBQWlCLENBQUMsT0FBTyxDQUFDOzRCQUN4QixPQUFPLEVBQUU7Z0NBQ1AsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLFNBQVMsRUFBRSxvQkFBb0IsRUFBRTtnQ0FDbEQsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLFNBQVMsRUFBRSx1QkFBdUIsRUFBRTtnQ0FDeEQsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLFNBQVMsRUFBRSxxQkFBcUIsRUFBRTtnQ0FDcEQsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLFNBQVMsRUFBRSxxQkFBcUIsRUFBRTtnQ0FDcEQsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLFNBQVMsRUFBRSxxQkFBcUIsRUFBRTtnQ0FDcEQsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxtQkFBbUIsRUFBRTtnQ0FDaEQsRUFBRSxJQUFJLEVBQUUsY0FBYyxFQUFFLFNBQVMsRUFBRSwyQkFBMkIsRUFBRTs2QkFFakU7eUJBQ0YsQ0FBQztxQkFDSDtvQkFDRCxZQUFZLEVBQUU7d0JBQ1osb0JBQW9CO3dCQUNwQix1QkFBdUI7d0JBQ3ZCLHFCQUFxQjt3QkFDckIscUJBQXFCO3dCQUNyQixxQkFBcUI7d0JBQ3JCLG1CQUFtQjt3QkFDbkIsMkJBQTJCO3FCQUM1QjtvQkFDRCxPQUFPLEVBQUUsRUFBRTtpQkFDWjs7aUNBakREOztTQWtEYSxzQkFBc0IiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxOCBBZHJpYW4gUGFuZWxsYSA8aWFuY2hpNzRAb3V0bG9vay5jb20+XG4gKlxuICogVGhpcyBzb2Z0d2FyZSBpcyByZWxlYXNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuXG4gKiBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL01JVFxuICovXG5cblxuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgTWF0ZXJpYWxNb2R1bGUgfSBmcm9tICcuLi9tYXRlcmlhbC5tb2R1bGUnO1xuaW1wb3J0IHsgV2lkZ2V0c0NvcmVNb2R1bGUgfSBmcm9tICcuLi8uLi9jb3JlL2luZGV4JztcblxuaW1wb3J0IHsgSW5wdXRXaWRnZXRDb21wb25lbnQgfSBmcm9tICcuL2lucHV0L2lucHV0LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBDaGVja2JveFdpZGdldENvbXBvbmVudCB9IGZyb20gJy4vY2hlY2tib3gvY2hlY2tib3guY29tcG9uZW50JztcbmltcG9ydCB7IFRvZ2dsZVdpZGdldENvbXBvbmVudCB9IGZyb20gJy4vdG9nZ2xlL3RvZ2dsZS5jb21wb25lbnQnO1xuaW1wb3J0IHsgU2xpZGVyV2lkZ2V0Q29tcG9uZW50IH0gZnJvbSAnLi9zbGlkZXIvc2xpZGVyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBCdXR0b25XaWRnZXRDb21wb25lbnQgfSBmcm9tICcuL2J1dHRvbi9idXR0b24uY29tcG9uZW50JztcbmltcG9ydCB7IEZvcm1XaWRnZXRDb21wb25lbnQgfSBmcm9tICcuL2Zvcm0vZm9ybS5jb21wb25lbnQnO1xuaW1wb3J0IHsgQXV0b2NvbXBsZXRlV2lkZ2V0Q29tcG9uZW50IH0gZnJvbSAnLi9hdXRvY29tcGxldGUvYXV0b2NvbXBsZXRlLmNvbXBvbmVudCc7XG5cblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIE1hdGVyaWFsTW9kdWxlLFxuXG4gICAgV2lkZ2V0c0NvcmVNb2R1bGUuZm9yUm9vdCh7XG4gICAgICB3aWRnZXRzOiBbXG4gICAgICAgIHsgdHlwZTogJ2lucHV0JywgY29tcG9uZW50OiBJbnB1dFdpZGdldENvbXBvbmVudCB9LFxuICAgICAgICB7IHR5cGU6ICdjaGVja2JveCcsIGNvbXBvbmVudDogQ2hlY2tib3hXaWRnZXRDb21wb25lbnQgfSxcbiAgICAgICAgeyB0eXBlOiAndG9nZ2xlJywgY29tcG9uZW50OiBUb2dnbGVXaWRnZXRDb21wb25lbnQgfSxcbiAgICAgICAgeyB0eXBlOiAnc2xpZGVyJywgY29tcG9uZW50OiBTbGlkZXJXaWRnZXRDb21wb25lbnQgfSxcbiAgICAgICAgeyB0eXBlOiAnYnV0dG9uJywgY29tcG9uZW50OiBCdXR0b25XaWRnZXRDb21wb25lbnQgfSxcbiAgICAgICAgeyB0eXBlOiAnZm9ybScsIGNvbXBvbmVudDogRm9ybVdpZGdldENvbXBvbmVudCB9LFxuICAgICAgICB7IHR5cGU6ICdhdXRvY29tcGxldGUnLCBjb21wb25lbnQ6IEF1dG9jb21wbGV0ZVdpZGdldENvbXBvbmVudCB9LFxuXG4gICAgICBdXG4gICAgfSlcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgSW5wdXRXaWRnZXRDb21wb25lbnQsXG4gICAgQ2hlY2tib3hXaWRnZXRDb21wb25lbnQsXG4gICAgVG9nZ2xlV2lkZ2V0Q29tcG9uZW50LFxuICAgIFNsaWRlcldpZGdldENvbXBvbmVudCxcbiAgICBCdXR0b25XaWRnZXRDb21wb25lbnQsXG4gICAgRm9ybVdpZGdldENvbXBvbmVudCxcbiAgICBBdXRvY29tcGxldGVXaWRnZXRDb21wb25lbnRcbiAgXSxcbiAgZXhwb3J0czogW11cbn0pXG5leHBvcnQgY2xhc3MgRm9ybUZpZWxkV2lkZ2V0c01vZHVsZSB7IH1cbiJdfQ==