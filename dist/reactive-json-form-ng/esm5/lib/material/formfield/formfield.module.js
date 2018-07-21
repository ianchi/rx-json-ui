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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybWZpZWxkLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL3JlYWN0aXZlLWpzb24tZm9ybS1uZy8iLCJzb3VyY2VzIjpbImxpYi9tYXRlcmlhbC9mb3JtZmllbGQvZm9ybWZpZWxkLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBUUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUV6QyxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDcEQsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sWUFBWSxDQUFDO0FBRS9DLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQy9ELE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQ3hFLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQ2xFLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQ2xFLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQ2xFLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQzVELE9BQU8sRUFBRSwyQkFBMkIsRUFBRSxNQUFNLHVDQUF1QyxDQUFDOzs7OztnQkFHbkYsUUFBUSxTQUFDO29CQUNSLE9BQU8sRUFBRTt3QkFDUCxjQUFjO3dCQUVkLGlCQUFpQixDQUFDLE9BQU8sQ0FBQzs0QkFDeEIsT0FBTyxFQUFFO2dDQUNQLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxTQUFTLEVBQUUsb0JBQW9CLEVBQUU7Z0NBQ2xELEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxTQUFTLEVBQUUsdUJBQXVCLEVBQUU7Z0NBQ3hELEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUUscUJBQXFCLEVBQUU7Z0NBQ3BELEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUUscUJBQXFCLEVBQUU7Z0NBQ3BELEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUUscUJBQXFCLEVBQUU7Z0NBQ3BELEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsbUJBQW1CLEVBQUU7Z0NBQ2hELEVBQUUsSUFBSSxFQUFFLGNBQWMsRUFBRSxTQUFTLEVBQUUsMkJBQTJCLEVBQUU7NkJBRWpFO3lCQUNGLENBQUM7cUJBQ0g7b0JBQ0QsWUFBWSxFQUFFO3dCQUNaLG9CQUFvQjt3QkFDcEIsdUJBQXVCO3dCQUN2QixxQkFBcUI7d0JBQ3JCLHFCQUFxQjt3QkFDckIscUJBQXFCO3dCQUNyQixtQkFBbUI7d0JBQ25CLDJCQUEyQjtxQkFDNUI7b0JBQ0QsT0FBTyxFQUFFLEVBQUU7aUJBQ1o7O2lDQWpERDs7U0FrRGEsc0JBQXNCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTggQWRyaWFuIFBhbmVsbGEgPGlhbmNoaTc0QG91dGxvb2suY29tPlxuICpcbiAqIFRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLlxuICogaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9NSVRcbiAqL1xuXG5cbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IE1hdGVyaWFsTW9kdWxlIH0gZnJvbSAnLi4vbWF0ZXJpYWwubW9kdWxlJztcbmltcG9ydCB7IFdpZGdldHNDb3JlTW9kdWxlIH0gZnJvbSAnLi4vLi4vY29yZSc7XG5cbmltcG9ydCB7IElucHV0V2lkZ2V0Q29tcG9uZW50IH0gZnJvbSAnLi9pbnB1dC9pbnB1dC5jb21wb25lbnQnO1xuaW1wb3J0IHsgQ2hlY2tib3hXaWRnZXRDb21wb25lbnQgfSBmcm9tICcuL2NoZWNrYm94L2NoZWNrYm94LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBUb2dnbGVXaWRnZXRDb21wb25lbnQgfSBmcm9tICcuL3RvZ2dsZS90b2dnbGUuY29tcG9uZW50JztcbmltcG9ydCB7IFNsaWRlcldpZGdldENvbXBvbmVudCB9IGZyb20gJy4vc2xpZGVyL3NsaWRlci5jb21wb25lbnQnO1xuaW1wb3J0IHsgQnV0dG9uV2lkZ2V0Q29tcG9uZW50IH0gZnJvbSAnLi9idXR0b24vYnV0dG9uLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBGb3JtV2lkZ2V0Q29tcG9uZW50IH0gZnJvbSAnLi9mb3JtL2Zvcm0uY29tcG9uZW50JztcbmltcG9ydCB7IEF1dG9jb21wbGV0ZVdpZGdldENvbXBvbmVudCB9IGZyb20gJy4vYXV0b2NvbXBsZXRlL2F1dG9jb21wbGV0ZS5jb21wb25lbnQnO1xuXG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBNYXRlcmlhbE1vZHVsZSxcblxuICAgIFdpZGdldHNDb3JlTW9kdWxlLmZvclJvb3Qoe1xuICAgICAgd2lkZ2V0czogW1xuICAgICAgICB7IHR5cGU6ICdpbnB1dCcsIGNvbXBvbmVudDogSW5wdXRXaWRnZXRDb21wb25lbnQgfSxcbiAgICAgICAgeyB0eXBlOiAnY2hlY2tib3gnLCBjb21wb25lbnQ6IENoZWNrYm94V2lkZ2V0Q29tcG9uZW50IH0sXG4gICAgICAgIHsgdHlwZTogJ3RvZ2dsZScsIGNvbXBvbmVudDogVG9nZ2xlV2lkZ2V0Q29tcG9uZW50IH0sXG4gICAgICAgIHsgdHlwZTogJ3NsaWRlcicsIGNvbXBvbmVudDogU2xpZGVyV2lkZ2V0Q29tcG9uZW50IH0sXG4gICAgICAgIHsgdHlwZTogJ2J1dHRvbicsIGNvbXBvbmVudDogQnV0dG9uV2lkZ2V0Q29tcG9uZW50IH0sXG4gICAgICAgIHsgdHlwZTogJ2Zvcm0nLCBjb21wb25lbnQ6IEZvcm1XaWRnZXRDb21wb25lbnQgfSxcbiAgICAgICAgeyB0eXBlOiAnYXV0b2NvbXBsZXRlJywgY29tcG9uZW50OiBBdXRvY29tcGxldGVXaWRnZXRDb21wb25lbnQgfSxcblxuICAgICAgXVxuICAgIH0pXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW1xuICAgIElucHV0V2lkZ2V0Q29tcG9uZW50LFxuICAgIENoZWNrYm94V2lkZ2V0Q29tcG9uZW50LFxuICAgIFRvZ2dsZVdpZGdldENvbXBvbmVudCxcbiAgICBTbGlkZXJXaWRnZXRDb21wb25lbnQsXG4gICAgQnV0dG9uV2lkZ2V0Q29tcG9uZW50LFxuICAgIEZvcm1XaWRnZXRDb21wb25lbnQsXG4gICAgQXV0b2NvbXBsZXRlV2lkZ2V0Q29tcG9uZW50XG4gIF0sXG4gIGV4cG9ydHM6IFtdXG59KVxuZXhwb3J0IGNsYXNzIEZvcm1GaWVsZFdpZGdldHNNb2R1bGUgeyB9XG4iXX0=