/**
 * Copyright (c) 2018 Adrian Panella <ianchi74@outlook.com>
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { NgModule } from '@angular/core';

import { WidgetsCoreModule } from '../../core/index';
import { MaterialModule } from '../material.module';

import { AccordionWidgetComponent } from './accordion/accordion.component';
import { CardWidgetComponent } from './card/card.component';
import { CodeWidgetComponent } from './code/code.component';
import { ContainerWidgetComponent } from './container/container.component';
import { DynamicWidgetComponent } from './dynamic/dynamic.component';
import { GridContainerWidgetComponent } from './grid-container/gridcontainer.component';
import { PopupWidgetComponent } from './popupwidget.component';
import { SpanWidgetComponent } from './span/span.component';
import { TableWidgetComponent } from './table/table.component';
import { TabsWidgetComponent } from './tabs/tabs.component';

@NgModule({
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
        { type: 'dynamic', component: DynamicWidgetComponent },
        { type: 'accordion', component: AccordionWidgetComponent },
        { type: 'span', component: SpanWidgetComponent },
      ],
    }),
  ],
  declarations: [
    CardWidgetComponent,
    TableWidgetComponent,
    ContainerWidgetComponent,
    GridContainerWidgetComponent,
    TabsWidgetComponent,
    CodeWidgetComponent,
    DynamicWidgetComponent,
    AccordionWidgetComponent,
    PopupWidgetComponent,
    SpanWidgetComponent,
  ],
  exports: [WidgetsCoreModule, PopupWidgetComponent],
  entryComponents: [PopupWidgetComponent],
})
export class CommonWidgetsModule {}
