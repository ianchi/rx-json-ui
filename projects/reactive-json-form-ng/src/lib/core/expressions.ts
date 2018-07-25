/**
 * Copyright (c) 2018 Adrian Panella <ianchi74@outlook.com>
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import {
  BinaryOperatorRule,
  es5Rules,
  IdentifierRule,
  MEMBER_EXP,
  Parser,
  ReactiveEval,
  StaticEval,
} from 'espression';
import { EMPTY, isObservable, Observable, of } from 'rxjs';

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
  abstract evaluate(ast: IAst | undefined, context: Context, asObservable: boolean): any;
  abstract lvalue(expression: string, context: Context): ILvalue | undefined;
}

/**
 * Service for Parsing and for evaluating expressions in Widget's configuration
 * The funcionality is provided by the ESpression package
 *
 */
// tslint:disable-next-line:max-classes-per-file
export class ESpression extends Expressions {
  private _parser: Parser;
  private _keyParser: Parser;

  private _rxEval: StaticEval;

  constructor() {
    super();
    const es5 = es5Rules();

    // remove Progam / Statements rules, and keep only expressions
    es5[0] = [];

    this._parser = new Parser(es5);

    const identifierRule = new IdentifierRule({ thisStr: undefined, literals: {} });
    this._keyParser = new Parser([
      [
        new BinaryOperatorRule({
          '.': {
            type: MEMBER_EXP,
            extra: { computed: false },
            noop: true,
            left: 'object',
            right: 'property',
            rules: [[identifierRule]],
          },
        }),
      ],
      [identifierRule],
    ]);

    this._rxEval = new ReactiveEval();
  }

  /**
   * Parses the string expression using the general parsing rules.
   *
   * * @param expression
   */
  parse(expression: string): IAst | undefined {
    let result: IAst;
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
   * As they must be lvalues the rules are more limited.
   *
   * @param expression
   */
  parseKey(expression: string): IAst | undefined {
    let result: IAst;
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
   *
   * @param ast Parsed expression to evaluate
   * @param context
   * @param asObservable Always converts result to observable
   */
  evaluate(ast: IAst | undefined, context: Context, asObservable: boolean): any {
    if (!ast) return asObservable ? EMPTY : undefined;

    let result;
    try {
      result = this._rxEval.eval(ast, context);
    } catch (e) {
      console.warn('Error evaluating expression: ', e.message);
      return asObservable ? of(undefined) : undefined;
    }

    return asObservable && !isObservable(result) ? of(result) : result;
  }

  /**
   * Evaluates an expression using *key* parsing rules and returns and lvalue object:
   * {o: evaluated_object, m: member}
   *
   * @param expression
   * @param context
   */
  lvalue(expression: string, context: Context): ILvalue | undefined {
    let result;

    const ast = this.parseKey(expression);

    if (!ast) return undefined;
    try {
      result = this._rxEval.lvalue(ast, context);
    } catch (e) {
      console.warn('Error evaluating expression: ', e.message);
      return undefined;
    }

    return result;
  }

  /**
   * Expression version of the Array.map function.
   * I replaces each array/object member with the result of evaluating an expression.
   * The expression gets in its eval context the variables:
   * `$object` the original object being maped
   * `$value` the current value
   * `$index` for arrays, the current index being replaced
   * `$key` for objects, the current key
   */
  mapFactory(): (obj: any[] | object, expression: string) => any[] | object {
    const self = this;
    return function map(this: Context, obj: any[] | object, expression: string): any[] | object {
      if (!expression || typeof expression !== 'string') return obj;

      const ast = self._parser.parse(expression);
      if (!ast) return obj;

      if (Array.isArray(obj)) {
        return obj.map((value, index) =>
          self._rxEval.eval(
            ast,
            // tslint:disable-next-line:no-invalid-this
            Context.create(this, {
              $object: obj,
              $value: value,
              $index: index,
            })
          )
        );
      }
      if (typeof obj === 'object') {
        const result = {};

        for (const prop in obj) // tslint:disable-line:forin
          result[prop] = self._rxEval.eval(
            ast,
            // tslint:disable-next-line:no-invalid-this
            Context.create(this, {
              $object: obj,
              $value: obj[prop],
              $key: prop,
            })
          );

        return result;
      }
      return obj;
    };
  }

  /**
   * Expression version of the Array.reduce function.
   * I replaces each array/object member with the result of evaluating an expression.
   * The expression gets in its eval context the variables:
   * `$object` the original object being maped
   * `$value` the current element
   * `$index` for arrays, the current index being replaced
   * `$key` for objects, the current key
   * `$prev` the previously returned value (the acumulation)
   * @param obj
   * @param expression
   * @param initValue
   */
  reduceFactory(): (obj: any[] | object, expression: string, initValue: any) => any {
    const self = this;

    return function reduce(
      this: Context,
      obj: any[] | object,
      expression: string,
      initValue: any
    ): any[] | object {
      if (!expression || typeof expression !== 'string') return obj;

      const ast = self._parser.parse(expression);
      if (!ast) return initValue;

      if (Array.isArray(obj)) {
        return obj.reduce(
          (prev, value, index) =>
            self._rxEval.eval(
              ast,
              // tslint:disable-next-line:no-invalid-this
              Context.create(this, {
                $object: obj,
                $prev: prev,
                $value: value,
                $index: index,
              })
            ),
          initValue
        );
      }
      if (typeof obj === 'object') {
        let result = initValue;

        for (const prop in obj) // tslint:disable-line:forin
          result = self._rxEval.eval(
            ast,
            // tslint:disable-next-line:no-invalid-this
            Context.create(this, {
              $prev: result,
              $value: obj[prop],
              $key: prop,
            })
          );

        return result;
      }
      return obj;
    };
  }
}

export const expressionProvider = {
  provide: Expressions,
  useClass: ESpression,
};
