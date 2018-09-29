/*
 * Copyright (c) 2018 Adrian Panella <ianchi74@outlook.com>
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ISchema, IWidgetDef } from 'reactive-json-form-ng';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'app';

  widgetDef: IWidgetDef;
  schema: ISchema;

  constructor(private http: HttpClient) {
    http.get('assets/schema.json').subscribe((sch: ISchema) => {
      this.schema = sch;
      this.widgetDef = { widget: 'schema-form', options: { schema: sch, bind: 'data' } };
    });
    this.widgetDef = {
      widget: 'card',
      options: {
        title: 'Card Title',
        description: 'this is a description',
      },
      content: [
        {
          widget: 'form-expanssion',
          bind: 'data',
          options: {
            "title=": "`${$model.field1} - ${$model.field2}`",
            "description=": "`This has ${$model.children.length} elements`"
          },

          content: [
            {
              widget: 'input',
              bind: '$model.field1',
              options: {title: 'Input field',},
            },
            {
              widget: 'input',
              bind: '$model.field2',
              options: {title: 'Input field 2',},
            },
            {
              widget: 'form-array',
              bind: '$model.children',
              options: {
                newRow: '{}',
                allowDel: true,
              },
              content: [
                {
                  widget: 'form',
                  bind: '$data',
                  content: [
                    {
                      widget: 'input',
                      bind: '$data.subfield1',
                      options: {
                        title: 'Row field1',
                      },
                    },
                    {
                      widget: 'input',
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
              widget: 'button',
              bind: '$model.$click',
              options: { title: 'Show data', click: 'true' },
            },
            {
              widget: 'code',
              options: { 'text=': 'JSON.stringify($model.$click && $model,undefined,2)' },
            },
          ],
        },
      ],
    };
  }
}
