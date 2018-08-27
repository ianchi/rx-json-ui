/*
 * Copyright (c) 2018 Adrian Panella <ianchi74@outlook.com>
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { IWidgetDef } from 'reactive-json-form-ng';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'app';

  widgetDef: IWidgetDef;

  constructor(private http: HttpClient) {
    this.widgetDef = {
      type: 'card',
      options: {
        title: 'Card Title',
        description: 'this is a description',
      },
      content: [
        {
          type: 'form',
          bind: 'data',

          content: [
            {
              type: 'input',
              bind: '$model.field1',
              options: {
                title: 'Input field',
              },
            },
            {
              type: 'form-array',
              bind: '$model.children',
              options: {
                newRow: '{}',
                allowDel: true,
              },
              content: [
                {
                  type: 'form',
                  bind: '$data',
                  content: [
                    {
                      type: 'input',
                      bind: '$data.subfield1',
                      options: {
                        title: 'Row field1',
                      },
                    },
                    {
                      type: 'input',
                      bind: '$data.subfield2',
                      options: {
                        title: 'Row field2',
                      },
                    },
                  ],
                },
              ],
            },
            {
              type: 'button',
              bind: '$model.$click',
              options: { title: 'Show data', click: 'true' },
            },
            {
              type: 'code',
              options: { 'text=': 'JSON.stringify($model.$click && $model,undefined,2)' },
            },
          ],
        },
      ],
    };
  }
}
