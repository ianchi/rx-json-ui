/**
 * Copyright (c) 2018 Adrian Panella <ianchi74@outlook.com>
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Context } from './context';
import { IWidgetDef } from './widget.interface';

@Component({
  selector: 'wdg-widget',
  template: '<ng-container [wdgWidget]="widgetDef" [parentContext]="parentContext"></ng-container>',

  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RoutedWidgetComponent implements OnInit {
  widgetDef: IWidgetDef;
  parentContext: Context;

  constructor(private _route: ActivatedRoute) {}
  ngOnInit(): void {
    this.widgetDef = this._route.snapshot.data.widgetDef || { type: 'empty' };
    this.parentContext = this._route.snapshot.data.parentContext;
  }
}
