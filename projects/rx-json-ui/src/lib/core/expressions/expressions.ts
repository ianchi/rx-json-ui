/**
 * Copyright (c) 2018 Adrian Panella <ianchi74@outlook.com>
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { ILvalue, INode } from 'espression';
import { AS_OBSERVABLE, isReactive } from 'espression-rx';
import { isObservable, Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Context } from './context';

export abstract class Expressions {
  abstract parseKey(expression: string): INode | undefined;

  abstract parse(expression: string): INode | undefined;

  /**
   * Evaluates an expression in the given context.
   * It uses the general parser.
   *
   * @param asObservable Always converts result to observable
   */
  eval(expression: string, context: Context, asObservable?: boolean): any;
  eval(expression: string, context: Context, asObservable: true): Observable<any>;
  eval(expression: string, context: Context, asObservable?: boolean): Observable<any> | any {
    try {
      let res = this.evaluate(this.parse(expression), context, asObservable);
      if (asObservable && isReactive(res)) res = res[AS_OBSERVABLE]();
      else if (isObservable(res))
        res = res.pipe(
          catchError((e: any) => {
            console.warn(
              `${e.message} evaluating expression ${
                e.pos ? ` at position ${e.pos}` : ''
              }: ${expression}`
            );
            return of(undefined);
          })
        );
      return res;
    } catch (e) {
      console.warn(`${e.message} evaluating expression: ${expression}`);
      return asObservable ? of(undefined) : undefined;
    }
  }

  abstract evaluate(ast: INode | undefined, context: Context, asObservable?: boolean): any;
  abstract evaluate(ast: INode | undefined, context: Context, asObservable: true): Observable<any>;
  abstract evaluate(
    ast: INode | undefined,
    context: Context,
    asObservable?: boolean
  ): Observable<any> | any;

  abstract lvalue(expression: string, context: Context): ILvalue | undefined;
}
