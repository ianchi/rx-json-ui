/**
 * Copyright (c) 2018 Adrian Panella <ianchi74@outlook.com>
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Observable } from 'rxjs';

import { Context } from './context';

export interface IAst {
  type: string;
  [prop: string]: any;
}

export interface ILvalue {
  o: object;
  m: string;
}

export abstract class Expressions {
  abstract parseKey(expression: string): IAst | undefined;
  abstract parse(expression: string): IAst | undefined;
  /**
   * Evaluates an expression in the given context.
   * It uses the general parser.
   *
   * @param expression String expression
   * @param context
   * @param asObservable Always converts result to observable
   */
  eval(expression: string, context: Context, asObservable?: boolean): any;
  eval(expression: string, context: Context, asObservable: true): Observable<any>;
  eval(expression: string, context: Context, asObservable?: boolean): Observable<any> | any {
    const ast = this.parse(expression);

    return this.evaluate(ast, context, asObservable);
  }
  abstract evaluate(ast: IAst | undefined, context: Context, asObservable?: boolean): any;
  abstract evaluate(ast: IAst | undefined, context: Context, asObservable: true): Observable<any>;
  abstract evaluate(
    ast: IAst | undefined,
    context: Context,
    asObservable?: boolean
  ): Observable<any> | any;
  abstract lvalue(expression: string, context: Context): ILvalue | undefined;
}
