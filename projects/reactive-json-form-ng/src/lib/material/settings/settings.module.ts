/**
 * Copyright (c) 2018 Adrian Panella <ianchi74@outlook.com>
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { NgModule } from '@angular/core';

import { WidgetsCoreModule } from '../../core/index';
import { MaterialModule } from '../material.module';

import { SetButtonWidgetComponent } from './button/button.component';
import { SetExpansionWidgetComponent } from './expansion/expansion.component';
import { SetInputWidgetComponent } from './input/input.component';
import { SetLinkWidgetComponent } from './link/link.component';
import { SetPageWidgetComponent } from './page/page.component';
import { SetPopupWidgetComponent } from './popup/popup.component';
import { SetRowArrayWidgetComponent } from './rowArray/rowArray.component';
import { SetSectionWidgetComponent } from './section/section.component';
import { SetSectionGroupWidgetComponent } from './sectiongroup/sectiongroup.component';
import { SetSubpageWidgetComponent } from './subpage/subpage.component';
import { SetToggleWidgetComponent } from './toggle/toggle.component';

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
  ],
  exports: [],
})
export class SettingsWidgetsModule {}
