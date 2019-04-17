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
import { ILvalue } from 'espression';
import { isReactive } from 'espression-rx';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';

import { AbstractWidget, Expressions, IFieldWidgetDef, IWidgetDef } from '../../../core/index';

export interface ISetButtonWidgetOptions {
  title: string;
  description: string;
  buttonTitle: string;

  click: string;
  spinner: boolean;
  disabled: boolean;
}
@Component({
  selector: 'set-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'set-row set-row-flex' },
})
export class SetButtonWidgetComponent extends AbstractWidget<ISetButtonWidgetOptions> {
  private _lvalue: ILvalue | undefined;
  private _clickSubs: Subscription | undefined;

  running = false;
  constructor(cdr: ChangeDetectorRef, expr: Expressions) {
    super(cdr, expr);
  }

  dynOnSetup(def: IFieldWidgetDef): IWidgetDef {
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

    if (this.options.click) {
      this.running = true;
      this._clickSubs = this._expr
        .eval(this.options.click, this.context, true)
        .pipe(take(1))
        .subscribe(res => {
          this.running = false;
          if (this._lvalue) this._lvalue.o[this._lvalue.m] = res;
        });
    }
  }
}
