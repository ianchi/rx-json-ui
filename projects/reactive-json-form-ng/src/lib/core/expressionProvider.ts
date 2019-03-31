/*
 * Copyright (c) 2018 Adrian Panella <ianchi74@outlook.com>
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import {
  BinaryOperatorRule,
  ES5Parser,
  IdentifierRule,
  ILvalue,
  INode,
  MEMBER_TYPE,
  MEMBER_TYPE_COMP,
  NumberRule,
  Parser,
  StaticEval,
  StringRule,
} from 'espression';
import { ReactiveEval } from 'espression-rx';
import { EMPTY, isObservable, Observable, of } from 'rxjs';

import { Context } from './context';
import { Expressions } from './expressions';

/**
 * Service for Parsing and for evaluating expressions in Widget's configuration
 * The funcionality is provided by the ESpression package
 *
 */
export class ESpression extends Expressions {
  private _parser: Parser;
  private _keyParser: Parser;

  private _rxEval: StaticEval;

  constructor() {
    super();

    // remove Progam / Statements rules, and keep only expressions
    this._parser = new ES5Parser(true);

    this._keyParser = new Parser(
      {
        lvalue: [
          new BinaryOperatorRule({
            '.': MEMBER_TYPE,
            '[': { ...MEMBER_TYPE_COMP, subRules: 'computed' },
          }),
          'identifier',
        ],
        identifier: [new IdentifierRule({ reserved: ['this', 'true', 'false'] })],
        computed: [new StringRule(), new NumberRule(), 'identifier'],
        property: [new IdentifierRule()],
      },
      'lvalue'
    );

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
   * As they must be lvalues the rules are more limited.
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
      console.warn('Error evaluating expression: ', e.message);
      return asObservable ? of(undefined) : undefined;
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
          self._rxEval.evaluate(
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
        const result: any = {};

        for (const prop in obj) // tslint:disable-line:forin
          result[prop] = self._rxEval.evaluate(
            ast,
            // tslint:disable-next-line:no-invalid-this
            Context.create(this, {
              $object: obj,
              $value: (<any>obj)[prop],
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
            self._rxEval.evaluate(
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
          result = self._rxEval.evaluate(
            ast,
            // tslint:disable-next-line:no-invalid-this
            Context.create(this, {
              $prev: result,
              $value: (<any>obj)[prop],
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
