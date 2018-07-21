/**
 * Copyright (c) 2018 Adrian Panella <ianchi74@outlook.com>
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */


import { Component, ViewEncapsulation, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { isReactive } from 'espression';
import { AbstractWidget, Expressions, IWidgetDef, } from '../../../core';

@Component({
  selector: 'wdg-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonWidgetComponent extends AbstractWidget {

  title: string;
  click: string;

  private _lvalue: { o, m };
  private _clickSubs: Subscription;
  constructor(cdr: ChangeDetectorRef, expr: Expressions) {
    super(cdr, expr);
  }

  dynOnSetup(def: IWidgetDef) {

    if (def.bind) {

      const lvalue = this._expr.lvalue(def.bind, this.context);

      if (!lvalue)
        throw new Error('Form field "bind" property must be an identifier or member expression');

      if (!isReactive(lvalue.o))
        throw new Error('Bound Key must be of Reactive Type');

      this._lvalue = lvalue;
    }

    return def;
  }

  clickEvent(_event) {

    if (this._clickSubs) {
      this._clickSubs.unsubscribe();
      this._clickSubs = null;
    }

    if (this.click) {
      this._clickSubs = this._expr.eval(this.click, this.context, true).pipe(
        take(1)).subscribe(res =>
          this._lvalue.o[this._lvalue.m] = res);
    }
  }
}
