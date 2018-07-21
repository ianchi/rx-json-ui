/**
 * Copyright (c) 2018 Adrian Panella <ianchi74@outlook.com>
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders, ANALYZE_FOR_ENTRY_COMPONENTS } from '@angular/core';

import { DefaultWidgetComponent } from './defaultwidget.component';
import { AF_CONFIG_TOKEN, IAutoFormConfig } from './widgetregistry.service';
import { WidgetDirective } from './widget.directive';
import { FormatPipe } from './format';
import { RoutedWidgetComponent } from './routedwidget.component';

@NgModule({

  imports: [CommonModule],
  declarations: [
    WidgetDirective,
    RoutedWidgetComponent,
    DefaultWidgetComponent,
    FormatPipe
  ],
  entryComponents: [DefaultWidgetComponent],
  exports: [
    WidgetDirective,
    RoutedWidgetComponent,
    FormatPipe
  ]
})
export class WidgetsCoreModule {

  static forRoot(config: IAutoFormConfig = {}): ModuleWithProviders {
    return {
      ngModule: WidgetsCoreModule,
      providers: [
        { provide: AF_CONFIG_TOKEN, useValue: config, multi: true },
        { provide: ANALYZE_FOR_ENTRY_COMPONENTS, useValue: config, multi: true }
      ]
    };
  }
}


