/*
 * Copyright (c) 2018 Adrian Panella <ianchi74@outlook.com>
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { ES6Parser, es6Rules, ILvalue, INode, Parser, StaticEval } from 'espression';
import { ReactiveEval } from 'espression-rx';
import { EMPTY, isObservable, Observable, of, throwError } from 'rxjs';

import { Context } from './context';
import { Expressions } from './expressions';

/**
 * Service for Parsing and for evaluating expressions in Widget's configuration
 * The functionality is provided by the ESpression package
 *
 */
export class ESpression extends Expressions {
  private _parser: Parser;
  private _keyParser: Parser;

  private _rxEval: StaticEval;

  constructor() {
    super();

    // remove Program / Statements rules, and keep only expressions
    this._parser = new ES6Parser(true);

    this._keyParser = new Parser(es6Rules(), 'lvalue');

    this._rxEval = new ReactiveEval();
  }

  /**
   * Parses the string expression using the general parsing rules.
   *
   * * @param expression
   */
  parse(expression: string): INode | undefined {
    let result: INode | undefined;
    try {
      result = this._parser.parse(expression);
    } catch (e) {
      console.warn('Parsing Error', e.message, '\n', expression);
      return undefined;
    }

    return result;
  }

  /**
   * Parses the string expression using the restricted 'key' parsing rules,
   * intended to parse bindings to model keys.
   * As they must be lvalue the rules are more limited.
   */
  parseKey(expression: string): INode | undefined {
    let result: INode | undefined;
    try {
      result = this._keyParser.parse(expression);
    } catch (e) {
      console.warn('Parsing Error', e.message, '\n', expression);
      return undefined;
    }

    return result;
  }

  /**
   * Evaluate an AST in the given context.
   * @param asObservable Always converts result to observable
   */
  evaluate(ast: INode | undefined, context: Context, asObservable?: boolean): any;
  evaluate(ast: INode | undefined, context: Context, asObservable: true): Observable<any>;
  evaluate(
    ast: INode | undefined,
    context: Context,
    asObservable?: boolean
  ): Observable<any> | any {
    if (!ast) return asObservable ? EMPTY : undefined;

    let result;
    try {
      result = this._rxEval.evaluate(ast, context);
    } catch (e) {
      if (asObservable) return throwError(e);

      throw e;
    }
    return asObservable && !isObservable(result) ? of(result) : result;
  }

  /**
   * Evaluates an expression using *key* parsing rules and returns and lvalue object:
   * {o: evaluated_object, m: member}
   */
  lvalue(expression: string, context: Context): ILvalue | undefined {
    let result;

    const ast = this.parseKey(expression);

    if (!ast) return undefined;
    try {
      result = this._rxEval.lvalue(ast, context);
    } catch (e) {
      console.warn(`${e.message} evaluating expression: ${expression}`);
      return undefined;
    }

    return result;
  }
}

export const expressionProvider = {
  provide: Expressions,
  useClass: ESpression,
};
