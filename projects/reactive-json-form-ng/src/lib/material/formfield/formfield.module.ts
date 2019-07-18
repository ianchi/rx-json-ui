/**
 * Copyright (c) 2018 Adrian Panella <ianchi74@outlook.com>
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { NgModule } from '@angular/core';

import { WidgetsCoreModule } from '../../core/index';
import { MaterialModule } from '../material.module';

import { AutocompleteWidgetComponent } from './autocomplete/autocomplete.component';
import { ButtonWidgetComponent } from './button/button.component';
import { CheckboxWidgetComponent } from './checkbox/checkbox.component';
import { FileWidgetComponent } from './file/file.component';
import { FormWidgetComponent } from './form/form.component';
import { FormAccordionWidgetComponent } from './formAccordion/formAccordion.component';
import { FormArrayWidgetComponent } from './formArray/formArray.component';
import { FormExpanssionWidgetComponent } from './formExpanssion/formExpanssion.component';
import { InputWidgetComponent } from './input/input.component';
import { SchemaWidgetComponent } from './schema/schema.component';
import { SliderWidgetComponent } from './slider/slider.component';
import { TextAreaWidgetComponent } from './textarea/textarea.component';
import { ToggleWidgetComponent } from './toggle/toggle.component';

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
        { type: 'form-array', component: FormArrayWidgetComponent },
        { type: 'form-accordion', component: FormAccordionWidgetComponent },
        { type: 'form-expanssion', component: FormExpanssionWidgetComponent },
        { type: 'schema-form', component: SchemaWidgetComponent },
        { type: 'autocomplete', component: AutocompleteWidgetComponent },
        { type: 'file-button', component: FileWidgetComponent },
        { type: 'textarea', component: TextAreaWidgetComponent },
      ],
    }),
  ],
  declarations: [
    InputWidgetComponent,
    CheckboxWidgetComponent,
    ToggleWidgetComponent,
    SliderWidgetComponent,
    ButtonWidgetComponent,
    FormWidgetComponent,
    FormArrayWidgetComponent,
    FormAccordionWidgetComponent,
    FormExpanssionWidgetComponent,
    SchemaWidgetComponent,
    AutocompleteWidgetComponent,
    FileWidgetComponent,
    TextAreaWidgetComponent,
  ],
  exports: [],
})
export class FormFieldWidgetsModule {}
