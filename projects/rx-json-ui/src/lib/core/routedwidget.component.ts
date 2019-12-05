/**
 * Copyright (c) 2018 Adrian Panella <ianchi74@outlook.com>
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Inject,
  OnInit,
  Optional,
  ViewEncapsulation,
} from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { RxObject } from 'espression-rx';

import { WidgetDef } from './base/public.interface';
import { Context, ROOT_EXPR_CONTEXT } from './expressions/index';

@Component({
  selector: 'wdg-widget',
  template: '<ng-container [wdgWidget]="widgetDef" [parentContext]="context"></ng-container>',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RoutedWidgetComponent implements OnInit {
  widgetDef: WidgetDef | undefined;
  parentContext: Context | undefined;
  context: Context | undefined;
  paramMap: ParamMap | undefined;

  constructor(
    private _route: ActivatedRoute,
    private _cdr: ChangeDetectorRef,
    @Optional()
    @Inject(ROOT_EXPR_CONTEXT)
    private _rootContext: Context | undefined
  ) {}
  ngOnInit(): void {
    this._route.paramMap.subscribe((params: ParamMap) => {
      const rxParams: any = RxObject({});
      this.widgetDef = this._route.snapshot.data.widgetDef || {
        widget: 'empty',
      };
      this.parentContext = this._route.snapshot.data.parentContext || this._rootContext;

      for (const key of params.keys) rxParams[key] = params.get(key);

      this.context = Context.create(this.parentContext, {
        $routeParam: rxParams,
      });

      this._cdr.markForCheck();
    });
  }
}
