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
  ViewEncapsulation,
} from '@angular/core';
import { isReactive } from 'espression';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';

import { AbstractWidget, Expressions, ILvalue, IWidgetDef } from '../../../core/index';

@Component({
  selector: 'wdg-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonWidgetComponent extends AbstractWidget {
  title: string;
  click: string;

  private _lvalue: ILvalue;
  private _clickSubs: Subscription | undefined;
  constructor(cdr: ChangeDetectorRef, expr: Expressions) {
    super(cdr, expr);
  }

  dynOnSetup(def: IWidgetDef): IWidgetDef {
    if (def.bind) {
      const lvalue = this._expr.lvalue(def.bind, this.context);

      if (!lvalue)
        throw new Error('Form field "bind" property must be an identifier or member expression');

      if (!isReactive(lvalue.o)) throw new Error('Bound Key must be of Reactive Type');

      this._lvalue = lvalue;
    }

    return def;
  }

  clickEvent(): void {
    if (this._clickSubs) {
      this._clickSubs.unsubscribe();
      this._clickSubs = undefined;
    }

    if (this.click) {
      this._clickSubs = this._expr
        .eval(this.click, this.context, true)
        .pipe(take(1))
        .subscribe(res => (this._lvalue.o[this._lvalue.m] = res));
    }
  }
}
