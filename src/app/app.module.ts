/*
 * Copyright (c) 2018 Adrian Panella <ianchi74@outlook.com>
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import {} from '@angular/animations';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RxObject } from 'espression-rx';
import {
  CommonWidgetsModule,
  Context,
  expressionProvider,
  FormFieldWidgetsModule,
  ROOT_EXPR_CONTEXT,
} from 'reactive-json-form-ng';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    CommonWidgetsModule,
    HttpClientModule,
    FormFieldWidgetsModule,
    BrowserAnimationsModule,
  ],
  providers: [
    expressionProvider,
    {
      provide: ROOT_EXPR_CONTEXT,
      useValue: Context.create(
        undefined,
        {
          RxObject,
          data: RxObject(
            {
              children: [
                {
                  subfield1: 'a',
                  subfield2: 'b',
                },
                {
                  subfield1: 'c',
                  subfield2: 'f',
                },
              ],
            },
            true
          ),
        },
        undefined,
        undefined,
        true
      ),
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
