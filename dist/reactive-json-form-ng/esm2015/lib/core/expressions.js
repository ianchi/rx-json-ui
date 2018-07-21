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
export class Expressions {
    /**
     * Evaluates an expression in the given context.
     * It uses the general parser.
     *
     * @param {?} expression String expression
     * @param {?} context
     * @param {?} asObservable Always converts result to observable
     * @return {?}
     */
    eval(expression, context, asObservable) {
        const /** @type {?} */ ast = this.parse(expression);
        return this.evaluate(ast, context, asObservable);
    }
}
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
export class ESpression extends Expressions {
    constructor() {
        super();
        const /** @type {?} */ es5 = es5Rules();
        // remove Progam / Statements rules, and keep only expressions
        es5[0] = [];
        this._parser = new Parser(es5);
        const /** @type {?} */ identifierRule = new IdentifierRule({ thisStr: null, literals: {} });
        this._keyParser = new Parser([
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
        this._rxEval = new ReactiveEval();
    }
    /**
     * Parses the string expression using the general parsing rules.
     *
     * * \@param expression
     * @param {?} expression
     * @return {?}
     */
    parse(expression) {
        let /** @type {?} */ result;
        try {
            result = this._parser.parse(expression);
        }
        catch (/** @type {?} */ e) {
            console.warn('Parsing Error', e.message, '\n', expression);
            result = undefined;
        }
        return result;
    }
    /**
     * Parses the string expression using the restricted 'key' parsing rules,
     * intended to parse bindings to model keys.
     * As they must be lvalues the rules are more limited.
     *
     * @param {?} expression
     * @return {?}
     */
    parseKey(expression) {
        let /** @type {?} */ result;
        try {
            result = this._keyParser.parse(expression);
        }
        catch (/** @type {?} */ e) {
            console.warn('Parsing Error', e.message, '\n', expression);
            result = undefined;
        }
        return result;
    }
    /**
     * Evaluate an AST in the given context.
     *
     * @param {?} ast Parsed expression to evaluate
     * @param {?} context
     * @param {?} asObservable Always converts result to observable
     * @return {?}
     */
    evaluate(ast, context, asObservable) {
        if (!ast)
            return asObservable ? EMPTY : undefined;
        let /** @type {?} */ result;
        try {
            result = this._rxEval.eval(ast, context);
        }
        catch (/** @type {?} */ e) {
            console.warn('Error evaluating expression: ', e.message);
            return asObservable ? of(undefined) : undefined;
        }
        return asObservable && !isObservable(result) ? of(result) : result;
    }
    /**
     * Evaluates an expression using *key* parsing rules and returns and lvalue object:
     * {o: evaluated_object, m: member}
     *
     * @param {?} expression
     * @param {?} context
     * @return {?}
     */
    lvalue(expression, context) {
        let /** @type {?} */ result;
        const /** @type {?} */ ast = this.parseKey(expression);
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
    }
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
    mapFactory() {
        const /** @type {?} */ self = this;
        return function map(obj, expression) {
            if (!expression || typeof expression !== 'string')
                return obj;
            const /** @type {?} */ ast = self._parser.parse(expression);
            if (!ast)
                return obj;
            if (Array.isArray(obj)) {
                return obj.map((value, index) => self._rxEval.eval(ast, Context.create(this, {
                    // tslint:disable-line:no-invalid-this
                    $object: obj,
                    $value: value,
                    $index: index
                })));
            }
            if (typeof obj === 'object') {
                const /** @type {?} */ result = {};
                for (const /** @type {?} */ prop in obj)
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
     * @return {?}
     */
    reduceFactory() {
        const /** @type {?} */ self = this;
        return function reduce(obj, expression, initValue) {
            if (!expression || typeof expression !== 'string')
                return obj;
            const /** @type {?} */ ast = self._parser.parse(expression);
            if (!ast)
                return initValue;
            if (Array.isArray(obj)) {
                return obj.reduce((prev, value, index) => self._rxEval.eval(ast, Context.create(this, {
                    // tslint:disable-line:no-invalid-this
                    $object: obj,
                    $prev: prev,
                    $value: value,
                    $index: index
                })), initValue);
            }
            if (typeof obj === 'object') {
                let /** @type {?} */ result = initValue;
                for (const /** @type {?} */ prop in obj)
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
    }
}
function ESpression_tsickle_Closure_declarations() {
    /** @type {?} */
    ESpression.prototype._parser;
    /** @type {?} */
    ESpression.prototype._keyParser;
    /** @type {?} */
    ESpression.prototype._rxEval;
}
export const /** @type {?} */ expressionProvider = {
    provide: Expressions,
    useClass: ESpression
};

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhwcmVzc2lvbnMuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9yZWFjdGl2ZS1qc29uLWZvcm0tbmcvIiwic291cmNlcyI6WyJsaWIvY29yZS9leHByZXNzaW9ucy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBT0EsT0FBTyxFQUNMLFlBQVksRUFBYyxNQUFNLEVBQUUsUUFBUSxFQUMxQyxjQUFjLEVBQUUsa0JBQWtCLEVBQUUsVUFBVSxFQUMvQyxNQUFNLFlBQVksQ0FBQztBQUNwQixPQUFPLEVBQUUsWUFBWSxFQUFFLEVBQUUsRUFBRSxLQUFLLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDL0MsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLFdBQVcsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7O0FBT3BDLE1BQU07Ozs7Ozs7Ozs7SUFZSixJQUFJLENBQUMsVUFBa0IsRUFBRSxPQUFnQixFQUFFLFlBQXFCO1FBQzlELHVCQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBRW5DLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsRUFBRSxPQUFPLEVBQUUsWUFBWSxDQUFDLENBQUM7S0FDbEQ7Q0FHRjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFRRCxNQUFNLGlCQUFrQixTQUFRLFdBQVc7SUFPekM7UUFFRSxLQUFLLEVBQUUsQ0FBQztRQUNSLHVCQUFNLEdBQUcsR0FBRyxRQUFRLEVBQUUsQ0FBQzs7UUFHdkIsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUVaLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7UUFHL0IsdUJBQU0sY0FBYyxHQUFHLElBQUksY0FBYyxDQUFDLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUMzRSxJQUFJLENBQUMsVUFBVSxHQUFH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b0JBQ2IsTUFBTSxFQUFFLEtBQUs7aUJBQ2QsQ0FBQyxDQUFDLEVBQUUsU0FBUyxDQUFDLENBQUM7YUFDckI7WUFDRCxFQUFFLENBQUMsQ0FBQyxPQUFPLEdBQUcsS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDO2dCQUU1QixxQkFBSSxNQUFNLEdBQUcsU0FBUyxDQUFDO2dCQUV2QixHQUFHLENBQUMsQ0FBQyx1QkFBTSxJQUFJLElBQUksR0FBRyxDQUFDOztvQkFFckIsTUFBTSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRTs7d0JBQ25ELEtBQUssRUFBRSxNQUFNO3dCQUNiLE1BQU0sRUFBRSxHQUFHLENBQUMsSUFBSSxDQUFDO3dCQUNqQixJQUFJLEVBQUUsSUFBSTtxQkFDWCxDQUFDLENBQUMsQ0FBQztnQkFFTixNQUFNLENBQUMsTUFBTSxDQUFDO2FBQ2Y7WUFDRCxNQUFNLENBQUMsR0FBRyxDQUFDO1NBQ1osQ0FBQztLQUNIO0NBQ0Y7Ozs7Ozs7OztBQUVELE1BQU0sQ0FBQyx1QkFBTSxrQkFBa0IsR0FBRztJQUNoQyxPQUFPLEVBQUUsV0FBVztJQUNwQixRQUFRLEVBQUUsVUFBVTtDQUNyQixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTggQWRyaWFuIFBhbmVsbGEgPGlhbmNoaTc0QG91dGxvb2suY29tPlxuICpcbiAqIFRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLlxuICogaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9NSVRcbiAqL1xuXG5pbXBvcnQge1xuICBSZWFjdGl2ZUV2YWwsIFN0YXRpY0V2YWwsIFBhcnNlciwgZXM1UnVsZXMsXG4gIElkZW50aWZpZXJSdWxlLCBCaW5hcnlPcGVyYXRvclJ1bGUsIE1FTUJFUl9FWFBcbn0gZnJvbSAnZXNwcmVzc2lvbic7XG5pbXBvcnQgeyBpc09ic2VydmFibGUsIG9mLCBFTVBUWSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgQ29udGV4dCB9IGZyb20gJy4vY29udGV4dCc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgSUFzdCB7XG4gIHR5cGU6IHN0cmluZztcbiAgW3Byb3A6IHN0cmluZ106IGFueTtcbn1cblxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIEV4cHJlc3Npb25zIHtcblxuICBhYnN0cmFjdCBwYXJzZUtleShleHByZXNzaW9uOiBzdHJpbmcpOiBJQXN0O1xuICBhYnN0cmFjdCBwYXJzZShleHByZXNzaW9uOiBzdHJpbmcpOiBJQXN0O1xuICAvKipcbiAgICogRXZhbHVhdGVzIGFuIGV4cHJlc3Npb24gaW4gdGhlIGdpdmVuIGNvbnRleHQuXG4gICAqIEl0IHVzZXMgdGhlIGdlbmVyYWwgcGFyc2VyLlxuICAgKlxuICAgKiBAcGFyYW0gZXhwcmVzc2lvbiBTdHJpbmcgZXhwcmVzc2lvblxuICAgKiBAcGFyYW0gY29udGV4dFxuICAgKiBAcGFyYW0gYXNPYnNlcnZhYmxlIEFsd2F5cyBjb252ZXJ0cyByZXN1bHQgdG8gb2JzZXJ2YWJsZVxuICAgKi9cbiAgZXZhbChleHByZXNzaW9uOiBzdHJpbmcsIGNvbnRleHQ6IENvbnRleHQsIGFzT2JzZXJ2YWJsZTogYm9vbGVhbikge1xuICAgIGNvbnN0IGFzdCA9IHRoaXMucGFyc2UoZXhwcmVzc2lvbik7XG5cbiAgICByZXR1cm4gdGhpcy5ldmFsdWF0ZShhc3QsIGNvbnRleHQsIGFzT2JzZXJ2YWJsZSk7XG4gIH1cbiAgYWJzdHJhY3QgZXZhbHVhdGUoYXN0OiBJQXN0LCBjb250ZXh0OiBDb250ZXh0LCBhc09ic2VydmFibGU6IGJvb2xlYW4pOiBhbnk7XG4gIGFic3RyYWN0IGx2YWx1ZShleHByZXNzaW9uOiBzdHJpbmcsIGNvbnRleHQ6IENvbnRleHQpOiB7IG8sIG0gfTtcbn1cblxuXG4vKipcbiAqIFNlcnZpY2UgZm9yIFBhcnNpbmcgYW5kIGZvciBldmFsdWF0aW5nIGV4cHJlc3Npb25zIGluIFdpZGdldCdzIGNvbmZpZ3VyYXRpb25cbiAqIFRoZSBmdW5jaW9uYWxpdHkgaXMgcHJvdmlkZWQgYnkgdGhlIEVTcHJlc3Npb24gcGFja2FnZVxuICpcbiAqL1xuZXhwb3J0IGNsYXNzIEVTcHJlc3Npb24gZXh0ZW5kcyBFeHByZXNzaW9ucyB7XG5cbiAgcHJpdmF0ZSBfcGFyc2VyOiBQYXJzZXI7XG4gIHByaXZhdGUgX2tleVBhcnNlcjogUGFyc2VyO1xuXG4gIHByaXZhdGUgX3J4RXZhbDogU3RhdGljRXZhbDtcblxuICBjb25zdHJ1Y3RvcigpIHtcblxuICAgIHN1cGVyKCk7XG4gICAgY29uc3QgZXM1ID0gZXM1UnVsZXMoKTtcblxuICAgIC8vIHJlbW92ZSBQcm9nYW0gLyBTdGF0ZW1lbnRzIHJ1bGVzLCBhbmQga2VlcCBvbmx5IGV4cHJlc3Npb25zXG4gICAgZXM1WzBdID0gW107XG5cbiAgICB0aGlzLl9wYXJzZXIgPSBuZXcgUGFyc2VyKGVzNSk7XG5cblxuICAgIGNvbnN0IGlkZW50aWZpZXJSdWxlID0gbmV3IElkZW50aWZpZXJSdWxlKHsgdGhpc1N0cjogbnVsbCwgbGl0ZXJhbHM6IHt9IH0pO1xuICAgIHRoaXMuX2tleVBhcnNlciA9IG5ldyBQYXJzZXIoW1xuICAgICAgW25ldyBCaW5hcnlPcGVyYXRvclJ1bGUoe1xuICAgICAgICAnLic6IHtcbiAgICAgICAgICB0eXBlOiBNRU1CRVJfRVhQLFxuICAgICAgICAgIGV4dHJhOiB7IGNvbXB1dGVkOiBmYWxzZSB9LFxuICAgICAgICAgIG5vb3A6IHRydWUsXG4gICAgICAgICAgbGVmdDogJ29iamVjdCcsIHJpZ2h0OiAncHJvcGVydHknLFxuICAgICAgICAgIHJ1bGVzOiBbW2lkZW50aWZpZXJSdWxlXV1cbiAgICAgICAgfVxuICAgICAgfSldLFxuICAgICAgW2lkZW50aWZpZXJSdWxlXVxuICAgIF0pO1xuXG4gICAgdGhpcy5fcnhFdmFsID0gbmV3IFJlYWN0aXZlRXZhbCgpO1xuICB9XG5cbiAgLyoqXG4gICAqIFBhcnNlcyB0aGUgc3RyaW5nIGV4cHJlc3Npb24gdXNpbmcgdGhlIGdlbmVyYWwgcGFyc2luZyBydWxlcy5cbiAgICpcbiAgICogKiBAcGFyYW0gZXhwcmVzc2lvblxuICAgKi9cbiAgcGFyc2UoZXhwcmVzc2lvbjogc3RyaW5nKTogSUFzdCB7XG4gICAgbGV0IHJlc3VsdDogSUFzdDtcbiAgICB0cnkge1xuICAgICAgcmVzdWx0ID0gdGhpcy5fcGFyc2VyLnBhcnNlKGV4cHJlc3Npb24pO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIGNvbnNvbGUud2FybignUGFyc2luZyBFcnJvcicsIGUubWVzc2FnZSwgJ1xcbicsIGV4cHJlc3Npb24pO1xuICAgICAgcmVzdWx0ID0gdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICAvKipcbiAgICogUGFyc2VzIHRoZSBzdHJpbmcgZXhwcmVzc2lvbiB1c2luZyB0aGUgcmVzdHJpY3RlZCAna2V5JyBwYXJzaW5nIHJ1bGVzLFxuICAgKiBpbnRlbmRlZCB0byBwYXJzZSBiaW5kaW5ncyB0byBtb2RlbCBrZXlzLlxuICAgKiBBcyB0aGV5IG11c3QgYmUgbHZhbHVlcyB0aGUgcnVsZXMgYXJlIG1vcmUgbGltaXRlZC5cbiAgICpcbiAgICogQHBhcmFtIGV4cHJlc3Npb25cbiAgICovXG4gIHBhcnNlS2V5KGV4cHJlc3Npb246IHN0cmluZyk6IElBc3Qge1xuICAgIGxldCByZXN1bHQ6IElBc3Q7XG4gICAgdHJ5IHtcbiAgICAgIHJlc3VsdCA9IHRoaXMuX2tleVBhcnNlci5wYXJzZShleHByZXNzaW9uKTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBjb25zb2xlLndhcm4oJ1BhcnNpbmcgRXJyb3InLCBlLm1lc3NhZ2UsICdcXG4nLCBleHByZXNzaW9uKTtcbiAgICAgIHJlc3VsdCA9IHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgLyoqXG4gICAqIEV2YWx1YXRlIGFuIEFTVCBpbiB0aGUgZ2l2ZW4gY29udGV4dC5cbiAgICpcbiAgICogQHBhcmFtIGFzdCBQYXJzZWQgZXhwcmVzc2lvbiB0byBldmFsdWF0ZVxuICAgKiBAcGFyYW0gY29udGV4dFxuICAgKiBAcGFyYW0gYXNPYnNlcnZhYmxlIEFsd2F5cyBjb252ZXJ0cyByZXN1bHQgdG8gb2JzZXJ2YWJsZVxuICAgKi9cbiAgZXZhbHVhdGUoYXN0OiBJQXN0LCBjb250ZXh0OiBDb250ZXh0LCBhc09ic2VydmFibGU6IGJvb2xlYW4pIHtcbiAgICBpZiAoIWFzdCkgcmV0dXJuIGFzT2JzZXJ2YWJsZSA/IEVNUFRZIDogdW5kZWZpbmVkO1xuXG4gICAgbGV0IHJlc3VsdDtcbiAgICB0cnkge1xuICAgICAgcmVzdWx0ID0gdGhpcy5fcnhFdmFsLmV2YWwoYXN0LCBjb250ZXh0KTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBjb25zb2xlLndhcm4oJ0Vycm9yIGV2YWx1YXRpbmcgZXhwcmVzc2lvbjogJywgZS5tZXNzYWdlKTtcbiAgICAgIHJldHVybiBhc09ic2VydmFibGUgPyBvZih1bmRlZmluZWQpIDogdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIHJldHVybiBhc09ic2VydmFibGUgJiYgIWlzT2JzZXJ2YWJsZShyZXN1bHQpID8gb2YocmVzdWx0KSA6IHJlc3VsdDtcbiAgfVxuXG4gIC8qKlxuICAgKiBFdmFsdWF0ZXMgYW4gZXhwcmVzc2lvbiB1c2luZyAqa2V5KiBwYXJzaW5nIHJ1bGVzIGFuZCByZXR1cm5zIGFuZCBsdmFsdWUgb2JqZWN0OlxuICAgKiB7bzogZXZhbHVhdGVkX29iamVjdCwgbTogbWVtYmVyfVxuICAgKlxuICAgKiBAcGFyYW0gZXhwcmVzc2lvblxuICAgKiBAcGFyYW0gY29udGV4dFxuICAgKi9cbiAgbHZhbHVlKGV4cHJlc3Npb246IHN0cmluZywgY29udGV4dDogQ29udGV4dCk6IHsgbywgbSB9IHtcbiAgICBsZXQgcmVzdWx0O1xuXG4gICAgY29uc3QgYXN0ID0gdGhpcy5wYXJzZUtleShleHByZXNzaW9uKTtcblxuICAgIGlmICghYXN0KSByZXR1cm4gbnVsbDtcbiAgICB0cnkge1xuICAgICAgcmVzdWx0ID0gdGhpcy5fcnhFdmFsLmx2YWx1ZShhc3QsIGNvbnRleHQpO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIGNvbnNvbGUud2FybignRXJyb3IgZXZhbHVhdGluZyBleHByZXNzaW9uOiAnLCBlLm1lc3NhZ2UpO1xuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cblxuICAvKipcbiAgICogRXhwcmVzc2lvbiB2ZXJzaW9uIG9mIHRoZSBBcnJheS5tYXAgZnVuY3Rpb24uXG4gICAqIEkgcmVwbGFjZXMgZWFjaCBhcnJheS9vYmplY3QgbWVtYmVyIHdpdGggdGhlIHJlc3VsdCBvZiBldmFsdWF0aW5nIGFuIGV4cHJlc3Npb24uXG4gICAqIFRoZSBleHByZXNzaW9uIGdldHMgaW4gaXRzIGV2YWwgY29udGV4dCB0aGUgdmFyaWFibGVzOlxuICAgKiBgJG9iamVjdGAgdGhlIG9yaWdpbmFsIG9iamVjdCBiZWluZyBtYXBlZFxuICAgKiBgJHZhbHVlYCB0aGUgY3VycmVudCB2YWx1ZVxuICAgKiBgJGluZGV4YCBmb3IgYXJyYXlzLCB0aGUgY3VycmVudCBpbmRleCBiZWluZyByZXBsYWNlZFxuICAgKiBgJGtleWAgZm9yIG9iamVjdHMsIHRoZSBjdXJyZW50IGtleVxuICAgKi9cbiAgbWFwRmFjdG9yeSgpIHtcbiAgICBjb25zdCBzZWxmID0gdGhpcztcbiAgICByZXR1cm4gZnVuY3Rpb24gbWFwKG9iajogQXJyYXk8YW55PiB8IE9iamVjdCwgZXhwcmVzc2lvbjogc3RyaW5nKTogQXJyYXk8YW55PiB8IE9iamVjdCB7XG5cbiAgICAgIGlmICghZXhwcmVzc2lvbiB8fCB0eXBlb2YgZXhwcmVzc2lvbiAhPT0gJ3N0cmluZycpIHJldHVybiBvYmo7XG5cblxuICAgICAgY29uc3QgYXN0ID0gc2VsZi5fcGFyc2VyLnBhcnNlKGV4cHJlc3Npb24pO1xuICAgICAgaWYgKCFhc3QpIHJldHVybiBvYmo7XG5cbiAgICAgIGlmIChBcnJheS5pc0FycmF5KG9iaikpIHtcblxuICAgICAgICByZXR1cm4gb2JqLm1hcCgodmFsdWUsIGluZGV4KSA9PlxuICAgICAgICAgIHNlbGYuX3J4RXZhbC5ldmFsKGFzdCwgQ29udGV4dC5jcmVhdGUodGhpcywgeyAvLyB0c2xpbnQ6ZGlzYWJsZS1saW5lOm5vLWludmFsaWQtdGhpc1xuICAgICAgICAgICAgJG9iamVjdDogb2JqLFxuICAgICAgICAgICAgJHZhbHVlOiB2YWx1ZSxcbiAgICAgICAgICAgICRpbmRleDogaW5kZXhcbiAgICAgICAgICB9KSkpO1xuICAgICAgfVxuICAgICAgaWYgKHR5cGVvZiBvYmogPT09ICdvYmplY3QnKSB7XG5cbiAgICAgICAgY29uc3QgcmVzdWx0ID0ge307XG5cbiAgICAgICAgZm9yIChjb25zdCBwcm9wIGluIG9iaikgLy8gdHNsaW50OmRpc2FibGUtbGluZTpmb3JpblxuXG4gICAgICAgICAgcmVzdWx0W3Byb3BdID0gc2VsZi5fcnhFdmFsLmV2YWwoYXN0LCBDb250ZXh0LmNyZWF0ZSh0aGlzLCB7IC8vIHRzbGludDpkaXNhYmxlLWxpbmU6bm8taW52YWxpZC10aGlzXG4gICAgICAgICAgICAkb2JqZWN0OiBvYmosXG4gICAgICAgICAgICAkdmFsdWU6IG9ialtwcm9wXSxcbiAgICAgICAgICAgICRrZXk6IHByb3BcbiAgICAgICAgICB9KSk7XG5cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgIH1cbiAgICAgIHJldHVybiBvYmo7XG4gICAgfTtcbiAgfVxuXG4gIC8qKlxuICAqIEV4cHJlc3Npb24gdmVyc2lvbiBvZiB0aGUgQXJyYXkucmVkdWNlIGZ1bmN0aW9uLlxuICAgKiBJIHJlcGxhY2VzIGVhY2ggYXJyYXkvb2JqZWN0IG1lbWJlciB3aXRoIHRoZSByZXN1bHQgb2YgZXZhbHVhdGluZyBhbiBleHByZXNzaW9uLlxuICAgKiBUaGUgZXhwcmVzc2lvbiBnZXRzIGluIGl0cyBldmFsIGNvbnRleHQgdGhlIHZhcmlhYmxlczpcbiAgICogYCRvYmplY3RgIHRoZSBvcmlnaW5hbCBvYmplY3QgYmVpbmcgbWFwZWRcbiAgICogYCR2YWx1ZWAgdGhlIGN1cnJlbnQgZWxlbWVudFxuICAgKiBgJGluZGV4YCBmb3IgYXJyYXlzLCB0aGUgY3VycmVudCBpbmRleCBiZWluZyByZXBsYWNlZFxuICAgKiBgJGtleWAgZm9yIG9iamVjdHMsIHRoZSBjdXJyZW50IGtleVxuICAgKiBgJHByZXZgIHRoZSBwcmV2aW91c2x5IHJldHVybmVkIHZhbHVlICh0aGUgYWN1bXVsYXRpb24pXG4gICAqIEBwYXJhbSBvYmpcbiAgICogQHBhcmFtIGV4cHJlc3Npb25cbiAgICogQHBhcmFtIGluaXRWYWx1ZVxuICAgKi9cbiAgcmVkdWNlRmFjdG9yeSgpIHtcbiAgICBjb25zdCBzZWxmID0gdGhpcztcblxuICAgIHJldHVybiBmdW5jdGlvbiByZWR1Y2Uob2JqOiBBcnJheTxhbnk+IHwgT2JqZWN0LCBleHByZXNzaW9uOiBzdHJpbmcsIGluaXRWYWx1ZTogYW55KTogQXJyYXk8YW55PiB8IE9iamVjdCB7XG5cbiAgICAgIGlmICghZXhwcmVzc2lvbiB8fCB0eXBlb2YgZXhwcmVzc2lvbiAhPT0gJ3N0cmluZycpIHJldHVybiBvYmo7XG5cbiAgICAgIGNvbnN0IGFzdCA9IHNlbGYuX3BhcnNlci5wYXJzZShleHByZXNzaW9uKTtcbiAgICAgIGlmICghYXN0KSByZXR1cm4gaW5pdFZhbHVlO1xuXG4gICAgICBpZiAoQXJyYXkuaXNBcnJheShvYmopKSB7XG4gICAgICAgIHJldHVybiBvYmoucmVkdWNlKFxuICAgICAgICAgIChwcmV2LCB2YWx1ZSwgaW5kZXgpID0+XG5cbiAgICAgICAgICAgIHNlbGYuX3J4RXZhbC5ldmFsKGFzdCwgQ29udGV4dC5jcmVhdGUodGhpcywgeyAvLyB0c2xpbnQ6ZGlzYWJsZS1saW5lOm5vLWludmFsaWQtdGhpc1xuICAgICAgICAgICAgICAkb2JqZWN0OiBvYmosXG4gICAgICAgICAgICAgICRwcmV2OiBwcmV2LFxuICAgICAgICAgICAgICAkdmFsdWU6IHZhbHVlLFxuICAgICAgICAgICAgICAkaW5kZXg6IGluZGV4XG4gICAgICAgICAgICB9KSksIGluaXRWYWx1ZSk7XG4gICAgICB9XG4gICAgICBpZiAodHlwZW9mIG9iaiA9PT0gJ29iamVjdCcpIHtcblxuICAgICAgICBsZXQgcmVzdWx0ID0gaW5pdFZhbHVlO1xuXG4gICAgICAgIGZvciAoY29uc3QgcHJvcCBpbiBvYmopIC8vIHRzbGludDpkaXNhYmxlLWxpbmU6Zm9yaW5cblxuICAgICAgICAgIHJlc3VsdCA9IHNlbGYuX3J4RXZhbC5ldmFsKGFzdCwgQ29udGV4dC5jcmVhdGUodGhpcywgeyAvLyB0c2xpbnQ6ZGlzYWJsZS1saW5lOm5vLWludmFsaWQtdGhpc1xuICAgICAgICAgICAgJHByZXY6IHJlc3VsdCxcbiAgICAgICAgICAgICR2YWx1ZTogb2JqW3Byb3BdLFxuICAgICAgICAgICAgJGtleTogcHJvcFxuICAgICAgICAgIH0pKTtcblxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgfVxuICAgICAgcmV0dXJuIG9iajtcbiAgICB9O1xuICB9XG59XG5cbmV4cG9ydCBjb25zdCBleHByZXNzaW9uUHJvdmlkZXIgPSB7XG4gIHByb3ZpZGU6IEV4cHJlc3Npb25zLFxuICB1c2VDbGFzczogRVNwcmVzc2lvblxufTtcbiJdfQ==