/**
 * Copyright (c) 2018 Adrian Panella <ianchi74@outlook.com>
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { NgModule } from '@angular/core';

import { WidgetsCoreModule } from '../../core/index';
import { MaterialModule } from '../material.module';

import { SetBaseComponent } from './base/base.component';

@NgModule({
  imports: [MaterialModule, WidgetsCoreModule],

  declarations: [SetBaseComponent],
  exports: [SetBaseComponent],
})
export class BaseSettingsModule {}
