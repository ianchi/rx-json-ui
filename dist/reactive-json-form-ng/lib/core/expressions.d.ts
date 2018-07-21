import { Context } from './context';
export interface IAst {
    type: string;
    [prop: string]: any;
}
export declare abstract class Expressions {
    abstract parseKey(expression: string): IAst;
    abstract parse(expression: string): IAst;
    /**
     * Evaluates an expression in the given context.
     * It uses the general parser.
     *
     * @param expression String expression
     * @param context
     * @param asObservable Always converts result to observable
     */
    eval(expression: string, context: Context, asObservable: boolean): any;
    abstract evaluate(ast: IAst, context: Context, asObservable: boolean): any;
    abstract lvalue(expression: string, context: Context): {
        o;
        m;
    };
}
/**
 * Service for Parsing and for evaluating expressions in Widget's configuration
 * The funcionality is provided by the ESpression package
 *
 */
export declare class ESpression extends Expressions {
    private _parser;
    private _keyParser;
    private _rxEval;
    constructor();
    /**
     * Parses the string expression using the general parsing rules.
     *
     * * @param expression
     */
    parse(expression: string): IAst;
    /**
     * Parses the string expression using the restricted 'key' parsing rules,
     * intended to parse bindings to model keys.
     * As they must be lvalues the rules are more limited.
     *
     * @param expression
     */
    parseKey(expression: string): IAst;
    /**
     * Evaluate an AST in the given context.
     *
     * @param ast Parsed expression to evaluate
     * @param context
     * @param asObservable Always converts result to observable
     */
    evaluate(ast: IAst, context: Context, asObservable: boolean): any;
    /**
     * Evaluates an expression using *key* parsing rules and returns and lvalue object:
     * {o: evaluated_object, m: member}
     *
     * @param expression
     * @param context
     */
    lvalue(expression: string, context: Context): {
        o;
        m;
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
    mapFactory(): (obj: Object | any[], expression: string) => Object | any[];
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
    reduceFactory(): (obj: Object | any[], expression: string, initValue: any) => Object | any[];
}
export declare const expressionProvider: {
    provide: typeof Expressions;
    useClass: typeof ESpression;
};
