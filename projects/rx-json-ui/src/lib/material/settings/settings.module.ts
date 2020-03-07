/**
 * Copyright (c) 2018 Adrian Panella <ianchi74@outlook.com>
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { NgModule } from '@angular/core';

import { WidgetsCoreModule } from '../../core/index';
import { MaterialModule } from '../material.module';

import { SetAutocompleteWidgetComponent } from './autocomplete/autocomplete.component';
import { SetButtonWidgetComponent } from './button/button.component';
import { SetContainerWidgetComponent } from './container/container.component';
import { SetExpansionWidgetComponent } from './expansion/expansion.component';
import { SetInputWidgetComponent } from './input/input.component';
import { SetLevelWidgetComponent } from './level/level.component';
import { SetLinkWidgetComponent } from './link/link.component';
import { SetListWidgetComponent } from './list/list.component';
import { SetPageWidgetComponent } from './page/page.component';
import { SetPopupWidgetComponent } from './popup/popup.component';
import { SetRowArrayWidgetComponent } from './rowArray/rowArray.component';
import { SetSectionWidgetComponent } from './section/section.component';
import { SetSectionGroupWidgetComponent } from './sectiongroup/sectiongroup.component';
import { SetSelectWidgetComponent } from './select/select.component';
import { SetSliderWidgetComponent } from './slider/slider.component';
import { SetSubpageWidgetComponent } from './subpage/subpage.component';
import { SetTextWidgetComponent } from './text/text.component';
import { SetToggleWidgetComponent } from './toggle/toggle.component';

export { SetAutocompleteWidgetComponent } from './autocomplete/autocomplete.component';
export { SetButtonWidgetComponent } from './button/button.component';
export { SetContainerWidgetComponent } from './container/container.component';
export { SetExpansionWidgetComponent } from './expansion/expansion.component';
export { SetInputWidgetComponent } from './input/input.component';
export { SetLevelWidgetComponent } from './level/level.component';
export { SetLinkWidgetComponent } from './link/link.component';
export { SetListWidgetComponent } from './list/list.component';
export { SetPageWidgetComponent } from './page/page.component';
export { SetPopupWidgetComponent } from './popup/popup.component';
export { SetRowArrayWidgetComponent } from './rowArray/rowArray.component';
export { SetSectionWidgetComponent } from './section/section.component';
export { SetSectionGroupWidgetComponent } from './sectiongroup/sectiongroup.component';
export { SetSelectWidgetComponent } from './select/select.component';
export { SetSliderWidgetComponent } from './slider/slider.component';
export { SetSubpageWidgetComponent } from './subpage/subpage.component';
export { SetTextWidgetComponent } from './text/text.component';
export { SetToggleWidgetComponent } from './toggle/toggle.component';

@NgModule({
  imports: [
    MaterialModule,

    WidgetsCoreModule.forRoot({
      widgets: [
        { type: 'set-page', component: SetPageWidgetComponent },
        { type: 'set-subpage', component: SetSubpageWidgetComponent },
        { type: 'set-section', component: SetSectionWidgetComponent },
        { type: 'set-toggle', component: SetToggleWidgetComponent },
        { type: 'set-input', component: SetInputWidgetComponent },
        { type: 'set-button', component: SetButtonWidgetComponent },
        { type: 'set-expansion', component: SetExpansionWidgetComponent },
        { type: 'set-sectiongroup', component: SetSectionGroupWidgetComponent },
        { type: 'set-rowarray', component: SetRowArrayWidgetComponent },
        { type: 'set-popup', component: SetPopupWidgetComponent },
        { type: 'set-link', component: SetLinkWidgetComponent },
        { type: 'set-slider', component: SetSliderWidgetComponent },
        { type: 'set-list', component: SetListWidgetComponent },
        { type: 'set-autocomplete', component: SetAutocompleteWidgetComponent },
        { type: 'set-select', component: SetSelectWidgetComponent },
        { type: 'set-level', component: SetLevelWidgetComponent },
        { type: 'set-container', component: SetContainerWidgetComponent },
        { type: 'set-text', component: SetTextWidgetComponent },
      ],
    }),
  ],
  declarations: [
    SetPageWidgetComponent,
    SetSectionWidgetComponent,
    SetToggleWidgetComponent,
    SetInputWidgetComponent,
    SetButtonWidgetComponent,
    SetExpansionWidgetComponent,
    SetSectionGroupWidgetComponent,
    SetRowArrayWidgetComponent,
    SetPopupWidgetComponent,
    SetSubpageWidgetComponent,
    SetLinkWidgetComponent,
    SetSliderWidgetComponent,
    SetListWidgetComponent,
    SetAutocompleteWidgetComponent,
    SetSelectWidgetComponent,
    SetLevelWidgetComponent,
    SetContainerWidgetComponent,
    SetTextWidgetComponent,
  ],
  exports: [],
})
export class SettingsWidgetsModule {}
