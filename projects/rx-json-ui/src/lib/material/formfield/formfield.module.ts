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
import { FormArrayWidgetComponent } from './formArray/formArray.component';
import { FormExpansionWidgetComponent } from './formExpansion/formExpansion.component';
import { InputWidgetComponent } from './input/input.component';
import { SchemaWidgetComponent } from './schema/schema.component';
import { SelectWidgetComponent } from './select/select.component';
import { SliderWidgetComponent } from './slider/slider.component';
import { TextAreaWidgetComponent } from './textarea/textarea.component';
import { ToggleWidgetComponent } from './toggle/toggle.component';

export { AutocompleteWidgetComponent } from './autocomplete/autocomplete.component';
export { ButtonWidgetComponent } from './button/button.component';
export { CheckboxWidgetComponent } from './checkbox/checkbox.component';
export { FileWidgetComponent } from './file/file.component';
export { FormWidgetComponent } from './form/form.component';
export { FormArrayWidgetComponent } from './formArray/formArray.component';
export { FormExpansionWidgetComponent } from './formExpansion/formExpansion.component';
export { InputWidgetComponent } from './input/input.component';
export { SchemaWidgetComponent } from './schema/schema.component';
export { SelectWidgetComponent } from './select/select.component';
export { SliderWidgetComponent } from './slider/slider.component';
export { TextAreaWidgetComponent } from './textarea/textarea.component';
export { ToggleWidgetComponent } from './toggle/toggle.component';

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
        { type: 'form-expansion', component: FormExpansionWidgetComponent },
        { type: 'schema-form', component: SchemaWidgetComponent },
        { type: 'autocomplete', component: AutocompleteWidgetComponent },
        { type: 'file-button', component: FileWidgetComponent },
        { type: 'textarea', component: TextAreaWidgetComponent },
        { type: 'select', component: SelectWidgetComponent },
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
    FormExpansionWidgetComponent,
    SchemaWidgetComponent,
    AutocompleteWidgetComponent,
    FileWidgetComponent,
    TextAreaWidgetComponent,
    SelectWidgetComponent,
  ],
  exports: [],
})
export class FormFieldWidgetsModule {}
