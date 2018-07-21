/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Copyright (c) 2018 Adrian Panella <ianchi74@outlook.com>
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */
import * as tslib_1 from "tslib";
import { ReactiveEval, Parser, es5Rules, IdentifierRule, BinaryOperatorRule, MEMBER_EXP } from 'espression';
import { isObservable, of, EMPTY } from 'rxjs';
import { Context } from './context';
/**
 * @record
 */
export function IAst() { }
function IAst_tsickle_Closure_declarations() {
    /** @type {?} */
    IAst.prototype.type;
    /* TODO: handle strange member:
    [prop: string]: any;
    */
}
/**
 * @abstract
 */
var /**
 * @abstract
 */
Expressions = /** @class */ (function () {
    function Expressions() {
    }
    /**
     * Evaluates an expression in the given context.
     * It uses the general parser.
     *
     * @param expression String expression
     * @param context
     * @param asObservable Always converts result to observable
     */
    /**
     * Evaluates an expression in the given context.
     * It uses the general parser.
     *
     * @param {?} expression String expression
     * @param {?} context
     * @param {?} asObservable Always converts result to observable
     * @return {?}
     */
    Expressions.prototype.eval = /**
     * Evaluates an expression in the given context.
     * It uses the general parser.
     *
     * @param {?} expression String expression
     * @param {?} context
     * @param {?} asObservable Always converts result to observable
     * @return {?}
     */
    function (expression, context, asObservable) {
        var /** @type {?} */ ast = this.parse(expression);
        return this.evaluate(ast, context, asObservable);
    };
    return Expressions;
}());
/**
 * @abstract
 */
export { Expressions };
function Expressions_tsickle_Closure_declarations() {
    /**
     * @abstract
     * @param {?} expression
     * @return {?}
     */
    Expressions.prototype.parseKey = function (expression) { };
    /**
     * @abstract
     * @param {?} expression
     * @return {?}
     */
    Expressions.prototype.parse = function (expression) { };
    /**
     * @abstract
     * @param {?} ast
     * @param {?} context
     * @param {?} asObservable
     * @return {?}
     */
    Expressions.prototype.evaluate = function (ast, context, asObservable) { };
    /**
     * @abstract
     * @param {?} expression
     * @param {?} context
     * @return {?}
     */
    Expressions.prototype.lvalue = function (expression, context) { };
}
/**
 * Service for Parsing and for evaluating expressions in Widget's configuration
 * The funcionality is provided by the ESpression package
 *
 */
var /**
 * Service for Parsing and for evaluating expressions in Widget's configuration
 * The funcionality is provided by the ESpression package
 *
 */
ESpression = /** @class */ (function (_super) {
    tslib_1.__extends(ESpression, _super);
    function ESpression() {
        var _this = _super.call(this) || this;
        var /** @type {?} */ es5 = es5Rules();
        // remove Progam / Statements rules, and keep only expressions
        es5[0] = [];
        _this._parser = new Parser(es5);
        var /** @type {?} */ identifierRule = new IdentifierRule({ thisStr: null, literals: {} });
        _this._keyParser = new Parser([
            [new BinaryOperatorRule({
                    '.': {
                        type: MEMBER_EXP,
                        extra: { computed: false },
                        noop: true,
                        left: 'object', right: 'property',
                        rules: [[identifierRule]]
                    }
                })],
            [identifierRule]
        ]);
        _this._rxEval = new ReactiveEval();
        return _this;
    }
    /**
     * Parses the string expression using the general parsing rules.
     *
     * * @param expression
     */
    /**
     * Parses the string expression using the general parsing rules.
     *
     * * \@param expression
     * @param {?} expression
     * @return {?}
     */
    ESpression.prototype.parse = /**
     * Parses the string expression using the general parsing rules.
     *
     * * \@param expression
     * @param {?} expression
     * @return {?}
     */
    function (expression) {
        var /** @type {?} */ result;
        try {
            result = this._parser.parse(expression);
        }
        catch (/** @type {?} */ e) {
            console.warn('Parsing Error', e.message, '\n', expression);
            result = undefined;
        }
        return result;
    };
    /**
     * Parses the string expression using the restricted 'key' parsing rules,
     * intended to parse bindings to model keys.
     * As they must be lvalues the rules are more limited.
     *
     * @param expression
     */
    /**
     * Parses the string expression using the restricted 'key' parsing rules,
     * intended to parse bindings to model keys.
     * As they must be lvalues the rules are more limited.
     *
     * @param {?} expression
     * @return {?}
     */
    ESpression.prototype.parseKey = /**
     * Parses the string expression using the restricted 'key' parsing rules,
     * intended to parse bindings to model keys.
     * As they must be lvalues the rules are more limited.
     *
     * @param {?} expression
     * @return {?}
     */
    function (expression) {
        var /** @type {?} */ result;
        try {
            result = this._keyParser.parse(expression);
        }
        catch (/** @type {?} */ e) {
            console.warn('Parsing Error', e.message, '\n', expression);
            result = undefined;
        }
        return result;
    };
    /**
     * Evaluate an AST in the given context.
     *
     * @param ast Parsed expression to evaluate
     * @param context
     * @param asObservable Always converts result to observable
     */
    /**
     * Evaluate an AST in the given context.
     *
     * @param {?} ast Parsed expression to evaluate
     * @param {?} context
     * @param {?} asObservable Always converts result to observable
     * @return {?}
     */
    ESpression.prototype.evaluate = /**
     * Evaluate an AST in the given context.
     *
     * @param {?} ast Parsed expression to evaluate
     * @param {?} context
     * @param {?} asObservable Always converts result to observable
     * @return {?}
     */
    function (ast, context, asObservable) {
        if (!ast)
            return asObservable ? EMPTY : undefined;
        var /** @type {?} */ result;
        try {
            result = this._rxEval.eval(ast, context);
        }
        catch (/** @type {?} */ e) {
            console.warn('Error evaluating expression: ', e.message);
            return asObservable ? of(undefined) : undefined;
        }
        return asObservable && !isObservable(result) ? of(result) : result;
    };
    /**
     * Evaluates an expression using *key* parsing rules and returns and lvalue object:
     * {o: evaluated_object, m: member}
     *
     * @param expression
     * @param context
     */
    /**
     * Evaluates an expression using *key* parsing rules and returns and lvalue object:
     * {o: evaluated_object, m: member}
     *
     * @param {?} expression
     * @param {?} context
     * @return {?}
     */
    ESpression.prototype.lvalue = /**
     * Evaluates an expression using *key* parsing rules and returns and lvalue object:
     * {o: evaluated_object, m: member}
     *
     * @param {?} expression
     * @param {?} context
     * @return {?}
     */
    function (expression, context) {
        var /** @type {?} */ result;
        var /** @type {?} */ ast = this.parseKey(expression);
        if (!ast)
            return null;
        try {
            result = this._rxEval.lvalue(ast, context);
        }
        catch (/** @type {?} */ e) {
            console.warn('Error evaluating expression: ', e.message);
            return undefined;
        }
        return result;
    };
    /**
     * Expression version of the Array.map function.
     * I replaces each array/object member with the result of evaluating an expression.
     * The expression gets in its eval context the variables:
     * `$object` the original object being maped
     * `$value` the current value
     * `$index` for arrays, the current index being replaced
     * `$key` for objects, the current key
     */
    /**
     * Expression version of the Array.map function.
     * I replaces each array/object member with the result of evaluating an expression.
     * The expression gets in its eval context the variables:
     * `$object` the original object being maped
     * `$value` the current value
     * `$index` for arrays, the current index being replaced
     * `$key` for objects, the current key
     * @return {?}
     */
    ESpression.prototype.mapFactory = /**
     * Expression version of the Array.map function.
     * I replaces each array/object member with the result of evaluating an expression.
     * The expression gets in its eval context the variables:
     * `$object` the original object being maped
     * `$value` the current value
     * `$index` for arrays, the current index being replaced
     * `$key` for objects, the current key
     * @return {?}
     */
    function () {
        var /** @type {?} */ self = this;
        return function map(obj, expression) {
            var _this = this;
            if (!expression || typeof expression !== 'string')
                return obj;
            var /** @type {?} */ ast = self._parser.parse(expression);
            if (!ast)
                return obj;
            if (Array.isArray(obj)) {
                return obj.map(function (value, index) {
                    return self._rxEval.eval(ast, Context.create(_this, {
                        // tslint:disable-line:no-invalid-this
                        $object: obj,
                        $value: value,
                        $index: index
                    }));
                });
            }
            if (typeof obj === 'object') {
                var /** @type {?} */ result = {};
                for (var /** @type {?} */ prop in obj)
                    // tslint:disable-line:forin
                    result[prop] = self._rxEval.eval(ast, Context.create(this, {
                        // tslint:disable-line:no-invalid-this
                        $object: obj,
                        $value: obj[prop],
                        $key: prop
                    }));
                return result;
            }
            return obj;
        };
    };
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
    /**
     * Expression version of the Array.reduce function.
     * I replaces each array/object member with the result of evaluating an expression.
     * The expression gets in its eval context the variables:
     * `$object` the original object being maped
     * `$value` the current element
     * `$index` for arrays, the current index being replaced
     * `$key` for objects, the current key
     * `$prev` the previously returned value (the acumulation)
     * @return {?}
     */
    ESpression.prototype.reduceFactory = /**
     * Expression version of the Array.reduce function.
     * I replaces each array/object member with the result of evaluating an expression.
     * The expression gets in its eval context the variables:
     * `$object` the original object being maped
     * `$value` the current element
     * `$index` for arrays, the current index being replaced
     * `$key` for objects, the current key
     * `$prev` the previously returned value (the acumulation)
     * @return {?}
     */
    function () {
        var /** @type {?} */ self = this;
        return function reduce(obj, expression, initValue) {
            var _this = this;
            if (!expression || typeof expression !== 'string')
                return obj;
            var /** @type {?} */ ast = self._parser.parse(expression);
            if (!ast)
                return initValue;
            if (Array.isArray(obj)) {
                return obj.reduce(function (prev, value, index) {
                    return self._rxEval.eval(ast, Context.create(_this, {
                        // tslint:disable-line:no-invalid-this
                        $object: obj,
                        $prev: prev,
                        $value: value,
                        $index: index
                    }));
                }, initValue);
            }
            if (typeof obj === 'object') {
                var /** @type {?} */ result = initValue;
                for (var /** @type {?} */ prop in obj)
                    // tslint:disable-line:forin
                    result = self._rxEval.eval(ast, Context.create(this, {
                        // tslint:disable-line:no-invalid-this
                        $prev: result,
                        $value: obj[prop],
                        $key: prop
                    }));
                return result;
            }
            return obj;
        };
    };
    return ESpression;
}(Expressions));
/**
 * Service for Parsing and for evaluating expressions in Widget's configuration
 * The funcionality is provided by the ESpression package
 *
 */
export { ESpression };
function ESpression_tsickle_Closure_declarations() {
    /** @type {?} */
    ESpression.prototype._parser;
    /** @type {?} */
    ESpression.prototype._keyParser;
    /** @type {?} */
    ESpression.prototype._rxEval;
}
export var /** @type {?} */ expressionProvider = {
    provide: Expressions,
    useClass: ESpression
};

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhwcmVzc2lvbnMuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9yZWFjdGl2ZS1qc29uLWZvcm0tbmcvIiwic291cmNlcyI6WyJsaWIvY29yZS9leHByZXNzaW9ucy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQU9BLE9BQU8sRUFDTCxZQUFZLEVBQWMsTUFBTSxFQUFFLFFBQVEsRUFDMUMsY0FBYyxFQUFFLGtCQUFrQixFQUFFLFVBQVUsRUFDL0MsTUFBTSxZQUFZLENBQUM7QUFDcEIsT0FBTyxFQUFFLFlBQVksRUFBRSxFQUFFLEVBQUUsS0FBSyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQy9DLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxXQUFXLENBQUM7Ozs7Ozs7Ozs7Ozs7OztBQU9wQzs7O0FBQUE7OztJQUlFOzs7Ozs7O09BT0c7Ozs7Ozs7Ozs7SUFDSCwwQkFBSTs7Ozs7Ozs7O0lBQUosVUFBSyxVQUFrQixFQUFFLE9BQWdCLEVBQUUsWUFBcUI7UUFDOUQscUJBQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUM7UUFFbkMsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxFQUFFLE9BQU8sRUFBRSxZQUFZLENBQUMsQ0FBQztLQUNsRDtzQkFuQ0g7SUFzQ0MsQ0FBQTs7OztBQW5CRCx1QkFtQkM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBUUQ7Ozs7O0FBQUE7SUFBZ0Msc0NBQVc7SUFPekM7UUFBQSxZQUVFLGlCQUFPLFNBd0JSO1FBdkJDLHFCQUFNLEdBQUcsR0FBRyxRQUFRLEVBQUUsQ0FBQzs7UUFHdkIsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUVaLEtBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7UUFHL0IscUJBQU0sY0FBYyxHQUFHLElBQUksY0FBYyxDQUFDLEVBQUUsT0FBTyxFQUFF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dGVudCI6WyIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxOCBBZHJpYW4gUGFuZWxsYSA8aWFuY2hpNzRAb3V0bG9vay5jb20+XG4gKlxuICogVGhpcyBzb2Z0d2FyZSBpcyByZWxlYXNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuXG4gKiBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL01JVFxuICovXG5cbmltcG9ydCB7XG4gIFJlYWN0aXZlRXZhbCwgU3RhdGljRXZhbCwgUGFyc2VyLCBlczVSdWxlcyxcbiAgSWRlbnRpZmllclJ1bGUsIEJpbmFyeU9wZXJhdG9yUnVsZSwgTUVNQkVSX0VYUFxufSBmcm9tICdlc3ByZXNzaW9uJztcbmltcG9ydCB7IGlzT2JzZXJ2YWJsZSwgb2YsIEVNUFRZIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBDb250ZXh0IH0gZnJvbSAnLi9jb250ZXh0JztcblxuZXhwb3J0IGludGVyZmFjZSBJQXN0IHtcbiAgdHlwZTogc3RyaW5nO1xuICBbcHJvcDogc3RyaW5nXTogYW55O1xufVxuXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgRXhwcmVzc2lvbnMge1xuXG4gIGFic3RyYWN0IHBhcnNlS2V5KGV4cHJlc3Npb246IHN0cmluZyk6IElBc3Q7XG4gIGFic3RyYWN0IHBhcnNlKGV4cHJlc3Npb246IHN0cmluZyk6IElBc3Q7XG4gIC8qKlxuICAgKiBFdmFsdWF0ZXMgYW4gZXhwcmVzc2lvbiBpbiB0aGUgZ2l2ZW4gY29udGV4dC5cbiAgICogSXQgdXNlcyB0aGUgZ2VuZXJhbCBwYXJzZXIuXG4gICAqXG4gICAqIEBwYXJhbSBleHByZXNzaW9uIFN0cmluZyBleHByZXNzaW9uXG4gICAqIEBwYXJhbSBjb250ZXh0XG4gICAqIEBwYXJhbSBhc09ic2VydmFibGUgQWx3YXlzIGNvbnZlcnRzIHJlc3VsdCB0byBvYnNlcnZhYmxlXG4gICAqL1xuICBldmFsKGV4cHJlc3Npb246IHN0cmluZywgY29udGV4dDogQ29udGV4dCwgYXNPYnNlcnZhYmxlOiBib29sZWFuKSB7XG4gICAgY29uc3QgYXN0ID0gdGhpcy5wYXJzZShleHByZXNzaW9uKTtcblxuICAgIHJldHVybiB0aGlzLmV2YWx1YXRlKGFzdCwgY29udGV4dCwgYXNPYnNlcnZhYmxlKTtcbiAgfVxuICBhYnN0cmFjdCBldmFsdWF0ZShhc3Q6IElBc3QsIGNvbnRleHQ6IENvbnRleHQsIGFzT2JzZXJ2YWJsZTogYm9vbGVhbik6IGFueTtcbiAgYWJzdHJhY3QgbHZhbHVlKGV4cHJlc3Npb246IHN0cmluZywgY29udGV4dDogQ29udGV4dCk6IHsgbywgbSB9O1xufVxuXG5cbi8qKlxuICogU2VydmljZSBmb3IgUGFyc2luZyBhbmQgZm9yIGV2YWx1YXRpbmcgZXhwcmVzc2lvbnMgaW4gV2lkZ2V0J3MgY29uZmlndXJhdGlvblxuICogVGhlIGZ1bmNpb25hbGl0eSBpcyBwcm92aWRlZCBieSB0aGUgRVNwcmVzc2lvbiBwYWNrYWdlXG4gKlxuICovXG5leHBvcnQgY2xhc3MgRVNwcmVzc2lvbiBleHRlbmRzIEV4cHJlc3Npb25zIHtcblxuICBwcml2YXRlIF9wYXJzZXI6IFBhcnNlcjtcbiAgcHJpdmF0ZSBfa2V5UGFyc2VyOiBQYXJzZXI7XG5cbiAgcHJpdmF0ZSBfcnhFdmFsOiBTdGF0aWNFdmFsO1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuXG4gICAgc3VwZXIoKTtcbiAgICBjb25zdCBlczUgPSBlczVSdWxlcygpO1xuXG4gICAgLy8gcmVtb3ZlIFByb2dhbSAvIFN0YXRlbWVudHMgcnVsZXMsIGFuZCBrZWVwIG9ubHkgZXhwcmVzc2lvbnNcbiAgICBlczVbMF0gPSBbXTtcblxuICAgIHRoaXMuX3BhcnNlciA9IG5ldyBQYXJzZXIoZXM1KTtcblxuXG4gICAgY29uc3QgaWRlbnRpZmllclJ1bGUgPSBuZXcgSWRlbnRpZmllclJ1bGUoeyB0aGlzU3RyOiBudWxsLCBsaXRlcmFsczoge30gfSk7XG4gICAgdGhpcy5fa2V5UGFyc2VyID0gbmV3IFBhcnNlcihbXG4gICAgICBbbmV3IEJpbmFyeU9wZXJhdG9yUnVsZSh7XG4gICAgICAgICcuJzoge1xuICAgICAgICAgIHR5cGU6IE1FTUJFUl9FWFAsXG4gICAgICAgICAgZXh0cmE6IHsgY29tcHV0ZWQ6IGZhbHNlIH0sXG4gICAgICAgICAgbm9vcDogdHJ1ZSxcbiAgICAgICAgICBsZWZ0OiAnb2JqZWN0JywgcmlnaHQ6ICdwcm9wZXJ0eScsXG4gICAgICAgICAgcnVsZXM6IFtbaWRlbnRpZmllclJ1bGVdXVxuICAgICAgICB9XG4gICAgICB9KV0sXG4gICAgICBbaWRlbnRpZmllclJ1bGVdXG4gICAgXSk7XG5cbiAgICB0aGlzLl9yeEV2YWwgPSBuZXcgUmVhY3RpdmVFdmFsKCk7XG4gIH1cblxuICAvKipcbiAgICogUGFyc2VzIHRoZSBzdHJpbmcgZXhwcmVzc2lvbiB1c2luZyB0aGUgZ2VuZXJhbCBwYXJzaW5nIHJ1bGVzLlxuICAgKlxuICAgKiAqIEBwYXJhbSBleHByZXNzaW9uXG4gICAqL1xuICBwYXJzZShleHByZXNzaW9uOiBzdHJpbmcpOiBJQXN0IHtcbiAgICBsZXQgcmVzdWx0OiBJQXN0O1xuICAgIHRyeSB7XG4gICAgICByZXN1bHQgPSB0aGlzLl9wYXJzZXIucGFyc2UoZXhwcmVzc2lvbik7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgY29uc29sZS53YXJuKCdQYXJzaW5nIEVycm9yJywgZS5tZXNzYWdlLCAnXFxuJywgZXhwcmVzc2lvbik7XG4gICAgICByZXN1bHQgPSB1bmRlZmluZWQ7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIC8qKlxuICAgKiBQYXJzZXMgdGhlIHN0cmluZyBleHByZXNzaW9uIHVzaW5nIHRoZSByZXN0cmljdGVkICdrZXknIHBhcnNpbmcgcnVsZXMsXG4gICAqIGludGVuZGVkIHRvIHBhcnNlIGJpbmRpbmdzIHRvIG1vZGVsIGtleXMuXG4gICAqIEFzIHRoZXkgbXVzdCBiZSBsdmFsdWVzIHRoZSBydWxlcyBhcmUgbW9yZSBsaW1pdGVkLlxuICAgKlxuICAgKiBAcGFyYW0gZXhwcmVzc2lvblxuICAgKi9cbiAgcGFyc2VLZXkoZXhwcmVzc2lvbjogc3RyaW5nKTogSUFzdCB7XG4gICAgbGV0IHJlc3VsdDogSUFzdDtcbiAgICB0cnkge1xuICAgICAgcmVzdWx0ID0gdGhpcy5fa2V5UGFyc2VyLnBhcnNlKGV4cHJlc3Npb24pO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIGNvbnNvbGUud2FybignUGFyc2luZyBFcnJvcicsIGUubWVzc2FnZSwgJ1xcbicsIGV4cHJlc3Npb24pO1xuICAgICAgcmVzdWx0ID0gdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICAvKipcbiAgICogRXZhbHVhdGUgYW4gQVNUIGluIHRoZSBnaXZlbiBjb250ZXh0LlxuICAgKlxuICAgKiBAcGFyYW0gYXN0IFBhcnNlZCBleHByZXNzaW9uIHRvIGV2YWx1YXRlXG4gICAqIEBwYXJhbSBjb250ZXh0XG4gICAqIEBwYXJhbSBhc09ic2VydmFibGUgQWx3YXlzIGNvbnZlcnRzIHJlc3VsdCB0byBvYnNlcnZhYmxlXG4gICAqL1xuICBldmFsdWF0ZShhc3Q6IElBc3QsIGNvbnRleHQ6IENvbnRleHQsIGFzT2JzZXJ2YWJsZTogYm9vbGVhbikge1xuICAgIGlmICghYXN0KSByZXR1cm4gYXNPYnNlcnZhYmxlID8gRU1QVFkgOiB1bmRlZmluZWQ7XG5cbiAgICBsZXQgcmVzdWx0O1xuICAgIHRyeSB7XG4gICAgICByZXN1bHQgPSB0aGlzLl9yeEV2YWwuZXZhbChhc3QsIGNvbnRleHQpO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIGNvbnNvbGUud2FybignRXJyb3IgZXZhbHVhdGluZyBleHByZXNzaW9uOiAnLCBlLm1lc3NhZ2UpO1xuICAgICAgcmV0dXJuIGFzT2JzZXJ2YWJsZSA/IG9mKHVuZGVmaW5lZCkgOiB1bmRlZmluZWQ7XG4gICAgfVxuXG4gICAgcmV0dXJuIGFzT2JzZXJ2YWJsZSAmJiAhaXNPYnNlcnZhYmxlKHJlc3VsdCkgPyBvZihyZXN1bHQpIDogcmVzdWx0O1xuICB9XG5cbiAgLyoqXG4gICAqIEV2YWx1YXRlcyBhbiBleHByZXNzaW9uIHVzaW5nICprZXkqIHBhcnNpbmcgcnVsZXMgYW5kIHJldHVybnMgYW5kIGx2YWx1ZSBvYmplY3Q6XG4gICAqIHtvOiBldmFsdWF0ZWRfb2JqZWN0LCBtOiBtZW1iZXJ9XG4gICAqXG4gICAqIEBwYXJhbSBleHByZXNzaW9uXG4gICAqIEBwYXJhbSBjb250ZXh0XG4gICAqL1xuICBsdmFsdWUoZXhwcmVzc2lvbjogc3RyaW5nLCBjb250ZXh0OiBDb250ZXh0KTogeyBvLCBtIH0ge1xuICAgIGxldCByZXN1bHQ7XG5cbiAgICBjb25zdCBhc3QgPSB0aGlzLnBhcnNlS2V5KGV4cHJlc3Npb24pO1xuXG4gICAgaWYgKCFhc3QpIHJldHVybiBudWxsO1xuICAgIHRyeSB7XG4gICAgICByZXN1bHQgPSB0aGlzLl9yeEV2YWwubHZhbHVlKGFzdCwgY29udGV4dCk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgY29uc29sZS53YXJuKCdFcnJvciBldmFsdWF0aW5nIGV4cHJlc3Npb246ICcsIGUubWVzc2FnZSk7XG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuXG4gIC8qKlxuICAgKiBFeHByZXNzaW9uIHZlcnNpb24gb2YgdGhlIEFycmF5Lm1hcCBmdW5jdGlvbi5cbiAgICogSSByZXBsYWNlcyBlYWNoIGFycmF5L29iamVjdCBtZW1iZXIgd2l0aCB0aGUgcmVzdWx0IG9mIGV2YWx1YXRpbmcgYW4gZXhwcmVzc2lvbi5cbiAgICogVGhlIGV4cHJlc3Npb24gZ2V0cyBpbiBpdHMgZXZhbCBjb250ZXh0IHRoZSB2YXJpYWJsZXM6XG4gICAqIGAkb2JqZWN0YCB0aGUgb3JpZ2luYWwgb2JqZWN0IGJlaW5nIG1hcGVkXG4gICAqIGAkdmFsdWVgIHRoZSBjdXJyZW50IHZhbHVlXG4gICAqIGAkaW5kZXhgIGZvciBhcnJheXMsIHRoZSBjdXJyZW50IGluZGV4IGJlaW5nIHJlcGxhY2VkXG4gICAqIGAka2V5YCBmb3Igb2JqZWN0cywgdGhlIGN1cnJlbnQga2V5XG4gICAqL1xuICBtYXBGYWN0b3J5KCkge1xuICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xuICAgIHJldHVybiBmdW5jdGlvbiBtYXAob2JqOiBBcnJheTxhbnk+IHwgT2JqZWN0LCBleHByZXNzaW9uOiBzdHJpbmcpOiBBcnJheTxhbnk+IHwgT2JqZWN0IHtcblxuICAgICAgaWYgKCFleHByZXNzaW9uIHx8IHR5cGVvZiBleHByZXNzaW9uICE9PSAnc3RyaW5nJykgcmV0dXJuIG9iajtcblxuXG4gICAgICBjb25zdCBhc3QgPSBzZWxmLl9wYXJzZXIucGFyc2UoZXhwcmVzc2lvbik7XG4gICAgICBpZiAoIWFzdCkgcmV0dXJuIG9iajtcblxuICAgICAgaWYgKEFycmF5LmlzQXJyYXkob2JqKSkge1xuXG4gICAgICAgIHJldHVybiBvYmoubWFwKCh2YWx1ZSwgaW5kZXgpID0+XG4gICAgICAgICAgc2VsZi5fcnhFdmFsLmV2YWwoYXN0LCBDb250ZXh0LmNyZWF0ZSh0aGlzLCB7IC8vIHRzbGludDpkaXNhYmxlLWxpbmU6bm8taW52YWxpZC10aGlzXG4gICAgICAgICAgICAkb2JqZWN0OiBvYmosXG4gICAgICAgICAgICAkdmFsdWU6IHZhbHVlLFxuICAgICAgICAgICAgJGluZGV4OiBpbmRleFxuICAgICAgICAgIH0pKSk7XG4gICAgICB9XG4gICAgICBpZiAodHlwZW9mIG9iaiA9PT0gJ29iamVjdCcpIHtcblxuICAgICAgICBjb25zdCByZXN1bHQgPSB7fTtcblxuICAgICAgICBmb3IgKGNvbnN0IHByb3AgaW4gb2JqKSAvLyB0c2xpbnQ6ZGlzYWJsZS1saW5lOmZvcmluXG5cbiAgICAgICAgICByZXN1bHRbcHJvcF0gPSBzZWxmLl9yeEV2YWwuZXZhbChhc3QsIENvbnRleHQuY3JlYXRlKHRoaXMsIHsgLy8gdHNsaW50OmRpc2FibGUtbGluZTpuby1pbnZhbGlkLXRoaXNcbiAgICAgICAgICAgICRvYmplY3Q6IG9iaixcbiAgICAgICAgICAgICR2YWx1ZTogb2JqW3Byb3BdLFxuICAgICAgICAgICAgJGtleTogcHJvcFxuICAgICAgICAgIH0pKTtcblxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgfVxuICAgICAgcmV0dXJuIG9iajtcbiAgICB9O1xuICB9XG5cbiAgLyoqXG4gICogRXhwcmVzc2lvbiB2ZXJzaW9uIG9mIHRoZSBBcnJheS5yZWR1Y2UgZnVuY3Rpb24uXG4gICAqIEkgcmVwbGFjZXMgZWFjaCBhcnJheS9vYmplY3QgbWVtYmVyIHdpdGggdGhlIHJlc3VsdCBvZiBldmFsdWF0aW5nIGFuIGV4cHJlc3Npb24uXG4gICAqIFRoZSBleHByZXNzaW9uIGdldHMgaW4gaXRzIGV2YWwgY29udGV4dCB0aGUgdmFyaWFibGVzOlxuICAgKiBgJG9iamVjdGAgdGhlIG9yaWdpbmFsIG9iamVjdCBiZWluZyBtYXBlZFxuICAgKiBgJHZhbHVlYCB0aGUgY3VycmVudCBlbGVtZW50XG4gICAqIGAkaW5kZXhgIGZvciBhcnJheXMsIHRoZSBjdXJyZW50IGluZGV4IGJlaW5nIHJlcGxhY2VkXG4gICAqIGAka2V5YCBmb3Igb2JqZWN0cywgdGhlIGN1cnJlbnQga2V5XG4gICAqIGAkcHJldmAgdGhlIHByZXZpb3VzbHkgcmV0dXJuZWQgdmFsdWUgKHRoZSBhY3VtdWxhdGlvbilcbiAgICogQHBhcmFtIG9ialxuICAgKiBAcGFyYW0gZXhwcmVzc2lvblxuICAgKiBAcGFyYW0gaW5pdFZhbHVlXG4gICAqL1xuICByZWR1Y2VGYWN0b3J5KCkge1xuICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xuXG4gICAgcmV0dXJuIGZ1bmN0aW9uIHJlZHVjZShvYmo6IEFycmF5PGFueT4gfCBPYmplY3QsIGV4cHJlc3Npb246IHN0cmluZywgaW5pdFZhbHVlOiBhbnkpOiBBcnJheTxhbnk+IHwgT2JqZWN0IHtcblxuICAgICAgaWYgKCFleHByZXNzaW9uIHx8IHR5cGVvZiBleHByZXNzaW9uICE9PSAnc3RyaW5nJykgcmV0dXJuIG9iajtcblxuICAgICAgY29uc3QgYXN0ID0gc2VsZi5fcGFyc2VyLnBhcnNlKGV4cHJlc3Npb24pO1xuICAgICAgaWYgKCFhc3QpIHJldHVybiBpbml0VmFsdWU7XG5cbiAgICAgIGlmIChBcnJheS5pc0FycmF5KG9iaikpIHtcbiAgICAgICAgcmV0dXJuIG9iai5yZWR1Y2UoXG4gICAgICAgICAgKHByZXYsIHZhbHVlLCBpbmRleCkgPT5cblxuICAgICAgICAgICAgc2VsZi5fcnhFdmFsLmV2YWwoYXN0LCBDb250ZXh0LmNyZWF0ZSh0aGlzLCB7IC8vIHRzbGludDpkaXNhYmxlLWxpbmU6bm8taW52YWxpZC10aGlzXG4gICAgICAgICAgICAgICRvYmplY3Q6IG9iaixcbiAgICAgICAgICAgICAgJHByZXY6IHByZXYsXG4gICAgICAgICAgICAgICR2YWx1ZTogdmFsdWUsXG4gICAgICAgICAgICAgICRpbmRleDogaW5kZXhcbiAgICAgICAgICAgIH0pKSwgaW5pdFZhbHVlKTtcbiAgICAgIH1cbiAgICAgIGlmICh0eXBlb2Ygb2JqID09PSAnb2JqZWN0Jykge1xuXG4gICAgICAgIGxldCByZXN1bHQgPSBpbml0VmFsdWU7XG5cbiAgICAgICAgZm9yIChjb25zdCBwcm9wIGluIG9iaikgLy8gdHNsaW50OmRpc2FibGUtbGluZTpmb3JpblxuXG4gICAgICAgICAgcmVzdWx0ID0gc2VsZi5fcnhFdmFsLmV2YWwoYXN0LCBDb250ZXh0LmNyZWF0ZSh0aGlzLCB7IC8vIHRzbGludDpkaXNhYmxlLWxpbmU6bm8taW52YWxpZC10aGlzXG4gICAgICAgICAgICAkcHJldjogcmVzdWx0LFxuICAgICAgICAgICAgJHZhbHVlOiBvYmpbcHJvcF0sXG4gICAgICAgICAgICAka2V5OiBwcm9wXG4gICAgICAgICAgfSkpO1xuXG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICB9XG4gICAgICByZXR1cm4gb2JqO1xuICAgIH07XG4gIH1cbn1cblxuZXhwb3J0IGNvbnN0IGV4cHJlc3Npb25Qcm92aWRlciA9IHtcbiAgcHJvdmlkZTogRXhwcmVzc2lvbnMsXG4gIHVzZUNsYXNzOiBFU3ByZXNzaW9uXG59O1xuIl19