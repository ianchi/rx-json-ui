/**
 * Copyright (c) 2018 Adrian Panella <ianchi74@outlook.com>
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */
export interface IContextDef {
    [identifier: string]: any;
}
/**
 * Helper class to hold context for expression evaluation.
 * It only gives a 'type' to a plain object.
 * It has static methods to manage inheritance and adding properties and builtins
 */
export declare class Context {
    /** Helper definition of built-in objects */
    static builtinsDef: IContextDef;
    /**
     * Creates a Context object, inheriting from an optional `parent` and adding custom properties
     * and optionally builtin objects
     * @param parent
     * @param publicProps
     * @param readonlyProps
     * @param hiddenProps
     * @param builtins Boolean. If true adds builtinobjects as public properties,
     */
    static create(parent?: Context, publicProps?: IContextDef, readonlyProps?: IContextDef, hiddenProps?: IContextDef, builtins?: boolean): Context;
    /** Adds readonly properties to a Context */
    static defineReadonly(context: Context, Props: IContextDef): Context;
    /** Adds hidden (non enumerable) properties to a Context */
    static defineHidden(context: Context, hiddenProps: IContextDef): Context;
    /** adds public properties only if they don't exist in parent */
    static defineWeak(context: Context, props: IContextDef): void;
}
