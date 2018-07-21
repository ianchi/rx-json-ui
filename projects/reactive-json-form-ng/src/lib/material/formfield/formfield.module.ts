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


@NgModule({
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
})
export class FormFieldWidgetsModule { }
