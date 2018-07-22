(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('rxjs'), require('rxjs/operators'), require('espression'), require('@angular/common'), require('@angular/router'), require('@angular/forms'), require('@angular/material/button'), require('@angular/material/dialog'), require('@angular/material/icon'), require('@angular/material/input'), require('@angular/material/list'), require('@angular/material/sidenav'), require('@angular/material/card'), require('@angular/material/toolbar'), require('@angular/material/progress-bar'), require('@angular/material/expansion'), require('@angular/material/select'), require('@angular/material/tabs'), require('@angular/material/snack-bar'), require('@angular/material/slide-toggle'), require('@angular/material/chips'), require('@angular/material/autocomplete'), require('@angular/material/checkbox'), require('@angular/material/slider'), require('@angular/material/table'), require('@angular/material/paginator'), require('@angular/material/sort'), require('@angular/material/menu')) :
    typeof define === 'function' && define.amd ? define('reactive-json-form-ng', ['exports', '@angular/core', 'rxjs', 'rxjs/operators', 'espression', '@angular/common', '@angular/router', '@angular/forms', '@angular/material/button', '@angular/material/dialog', '@angular/material/icon', '@angular/material/input', '@angular/material/list', '@angular/material/sidenav', '@angular/material/card', '@angular/material/toolbar', '@angular/material/progress-bar', '@angular/material/expansion', '@angular/material/select', '@angular/material/tabs', '@angular/material/snack-bar', '@angular/material/slide-toggle', '@angular/material/chips', '@angular/material/autocomplete', '@angular/material/checkbox', '@angular/material/slider', '@angular/material/table', '@angular/material/paginator', '@angular/material/sort', '@angular/material/menu'], factory) :
    (factory((global['reactive-json-form-ng'] = {}),global.ng.core,global.rxjs,global.rxjs.operators,null,global.ng.common,global.ng.router,global.ng.forms,global.ng.material.button,global.ng.material.dialog,global.ng.material.icon,global.ng.material.input,global.ng.material.list,global.ng.material.sidenav,global.ng.material.card,global.ng.material.toolbar,global.ng.material['progress-bar'],global.ng.material.expansion,global.ng.material.select,global.ng.material.tabs,global.ng.material['snack-bar'],global.ng.material['slide-toggle'],global.ng.material.chips,global.ng.material.autocomplete,global.ng.material.checkbox,global.ng.material.slider,global.ng.material.table,global.ng.material.paginator,global.ng.material.sort,global.ng.material.menu));
}(this, (function (exports,i0,rxjs,operators,espression,common,router,forms,button,dialog,icon,input,list,sidenav,card,toolbar,progressBar,expansion,select,tabs,snackBar,slideToggle,chips,autocomplete,checkbox,slider,table,paginator,sort,menu) { 'use strict';

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    /**
     * Helper class to hold context for expression evaluation.
     * It only gives a 'type' to a plain object.
     * It has static methods to manage inheritance and adding properties and builtins
     */
    var Context = (function () {
        function Context() {
        }
        /**
         * Creates a Context object, inheriting from an optional `parent` and adding custom properties
         * and optionally builtin objects
         * @param parent
         * @param publicProps
         * @param readonlyProps
         * @param hiddenProps
         * @param builtins Boolean. If true adds builtinobjects as public properties,
         */
        /**
         * Creates a Context object, inheriting from an optional `parent` and adding custom properties
         * and optionally builtin objects
         * @param {?=} parent
         * @param {?=} publicProps
         * @param {?=} readonlyProps
         * @param {?=} hiddenProps
         * @param {?=} builtins Boolean. If true adds builtinobjects as public properties,
         * @return {?}
         */
        Context.create = /**
         * Creates a Context object, inheriting from an optional `parent` and adding custom properties
         * and optionally builtin objects
         * @param {?=} parent
         * @param {?=} publicProps
         * @param {?=} readonlyProps
         * @param {?=} hiddenProps
         * @param {?=} builtins Boolean. If true adds builtinobjects as public properties,
         * @return {?}
         */
            function (parent, publicProps, readonlyProps, hiddenProps, builtins) {
                var /** @type {?} */ context = parent ? Object.create(parent) : new Context();
                if (builtins)
                    Context.defineReadonly(context, Context.builtinsDef);
                if (publicProps)
                    Object.assign(context, publicProps);
                if (readonlyProps)
                    Context.defineReadonly(context, readonlyProps);
                if (hiddenProps)
                    Context.defineHidden(context, hiddenProps);
                return context;
            };
        /** Adds readonly properties to a Context */
        /**
         * Adds readonly properties to a Context
         * @param {?} context
         * @param {?} Props
         * @return {?}
         */
        Context.defineReadonly = /**
         * Adds readonly properties to a Context
         * @param {?} context
         * @param {?} Props
         * @return {?}
         */
            function (context, Props) {
                // tslint:disable-next-line:forin
                for (var /** @type {?} */ prop in Props) {
                    Object.defineProperty(context, prop, {
                        enumerable: true,
                        writable: false,
                        value: Props[prop]
                    });
                }
                return context;
            };
        /** Adds hidden (non enumerable) properties to a Context */
        /**
         * Adds hidden (non enumerable) properties to a Context
         * @param {?} context
         * @param {?} hiddenProps
         * @return {?}
         */
        Context.defineHidden = /**
         * Adds hidden (non enumerable) properties to a Context
         * @param {?} context
         * @param {?} hiddenProps
         * @return {?}
         */
            function (context, hiddenProps) {
                // tslint:disable-next-line:forin
                for (var /** @type {?} */ prop in hiddenProps) {
                    Object.defineProperty(context, prop, {
                        enumerable: false,
                        writable: true,
                        value: hiddenProps[prop]
                    });
                }
                return context;
            };
        /** adds public properties only if they don't exist in parent */
        /**
         * adds public properties only if they don't exist in parent
         * @param {?} context
         * @param {?} props
         * @return {?}
         */
        Context.defineWeak = /**
         * adds public properties only if they don't exist in parent
         * @param {?} context
         * @param {?} props
         * @return {?}
         */
            function (context, props) {
                // tslint:disable-next-line:forin
                for (var /** @type {?} */ prop in props) {
                    if (prop in context)
                        continue;
                    Object.defineProperty(context, prop, {
                        enumerable: true,
                        writable: true,
                        value: props[prop]
                    });
                }
            };
        /**
         * Helper definition of built-in objects
         */
        Context.builtinsDef = {
            // Builtin functions:
            parseFloat: parseFloat,
            parseInt: parseInt,
            isNaN: isNaN,
            isFinite: isFinite,
            // Fundamental objects:
            Number: Number,
            Math: Math,
            Date: Date,
            Array: Array,
            JSON: JSON,
            Object: Object,
        };
        return Context;
    }());

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */
    /* global Reflect, Promise */
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b)
                if (b.hasOwnProperty(p))
                    d[p] = b[p]; };
        return extendStatics(d, b);
    };
    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }
    function __values(o) {
        var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
        if (m)
            return m.call(o);
        return {
            next: function () {
                if (o && i >= o.length)
                    o = void 0;
                return { value: o && o[i++], done: !o };
            }
        };
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    /**
     * Base class for all dynamic widget elements
     * @abstract
     */
    var AbstractWidget = (function () {
        function AbstractWidget(_cdr, _expr) {
            this._cdr = _cdr;
            this._expr = _expr;
            /**
             * Widget specific options all converted to observables, to unify between *expression* and
             * *constant* notation in the properties definition.
             * Each binding then auto updates the corresponding property in the derived widget.
             */
            this.bindings = {};
            this._subscriptions = [];
        }
        Object.defineProperty(AbstractWidget.prototype, "addSubscription", {
            set: /**
             * @param {?} subs
             * @return {?}
             */ function (subs) {
                this._subscriptions.push(subs);
            },
            enumerable: true,
            configurable: true
        });
        /** Initialices the widget from a json definition */
        /**
         * Initialices the widget from a json definition
         * @param {?} element
         * @param {?} def
         * @param {?} context
         * @return {?}
         */
        AbstractWidget.prototype.setup = /**
         * Initialices the widget from a json definition
         * @param {?} element
         * @param {?} def
         * @param {?} context
         * @return {?}
         */
            function (element, def, context) {
                def = def || { type: 'none' };
                def.options = def.options || {};
                this.type = def.type || 'none';
                this.element = element;
                console.log("Widget setup " + this.type, this);
                this.context = context;
                this.widgetDef = def = this.dynOnSetup(def) || def;
                this.bindings = parseDefObject(def.options, this.context, true, this._expr);
                this.content = Array.isArray(def.content) ? def.content : typeof def.content === 'object' ? [def.content] : [];
                this.subscribeOptions();
            };
        /**
         * Helper function to add a `map` pipe to the corresponding input observable
         */
        /**
         * Helper function to add a `map` pipe to the corresponding input observable
         * @param {?} option
         * @param {?} callback
         * @return {?}
         */
        AbstractWidget.prototype.map = /**
         * Helper function to add a `map` pipe to the corresponding input observable
         * @param {?} option
         * @param {?} callback
         * @return {?}
         */
            function (option, callback) {
                var /** @type {?} */ opt = this.bindings[option];
                if (opt)
                    this.bindings[option] = opt.pipe(operators.map(callback));
            };
        /**
         * Hook to customize the observable bindings befor subscribing.
         * Tipically using the `this.map()` function to add processing to specific options
         */
        /**
         * Hook to customize the observable bindings befor subscribing.
         * Tipically using the `this.map()` function to add processing to specific options
         * @return {?}
         */
        AbstractWidget.prototype.dynOnBeforeBind = /**
         * Hook to customize the observable bindings befor subscribing.
         * Tipically using the `this.map()` function to add processing to specific options
         * @return {?}
         */
            function () { };
        /**
         * @return {?}
         */
        AbstractWidget.prototype.dynOnAfterBind = /**
         * @return {?}
         */
            function () { };
        /** Hook to customize widget definition before procesing it */
        /**
         * Hook to customize widget definition before procesing it
         * @param {?} def
         * @return {?}
         */
        AbstractWidget.prototype.dynOnSetup = /**
         * Hook to customize widget definition before procesing it
         * @param {?} def
         * @return {?}
         */
            function (def) { return def; };
        /**
         * @return {?}
         */
        AbstractWidget.prototype.subscribeOptions = /**
         * @return {?}
         */
            function () {
                var _this = this;
                var /** @type {?} */ observables = [];
                // call hook for cofiguration of options before updating the bound value
                this.dynOnBeforeBind();
                var _loop_1 = function (prop) {
                    // tslint:disable-line:forin
                    this_1.bindings[prop] = this_1.bindings[prop].pipe(operators.tap(function (res) { return _this[prop] = res; }));
                };
                var this_1 = this;
                for (var /** @type {?} */ prop in this.bindings) {
                    _loop_1(prop);
                }
                // call hook after updating the bound value
                this.dynOnAfterBind();
                for (var /** @type {?} */ prop in this.bindings)
                    // tslint:disable-line:forin
                    observables.push(this.bindings[prop]);
                this.addSubscription = rxjs.combineLatest(observables).subscribe(function () { return _this._cdr.markForCheck(); });
            };
        /**
         * @return {?}
         */
        AbstractWidget.prototype.ngOnDestroy = /**
         * @return {?}
         */
            function () {
                this._unsubscribe();
            };
        /**
         * OnChanges is never called on dynamic widget instantiation
         * It is intended to provide the same interface is the widget is used declarative in a template
         * instead of dynamically
         */
        /**
         * OnChanges is never called on dynamic widget instantiation
         * It is intended to provide the same interface is the widget is used declarative in a template
         * instead of dynamically
         * @return {?}
         */
        AbstractWidget.prototype.ngOnChanges = /**
         * OnChanges is never called on dynamic widget instantiation
         * It is intended to provide the same interface is the widget is used declarative in a template
         * instead of dynamically
         * @return {?}
         */
            function () {
                console.log("Widget OnChanges " + this.type, this);
                this._unsubscribe();
                this.setup(null, this.widgetDef, this.context);
            };
        /**
         * @return {?}
         */
        AbstractWidget.prototype.ngOnInit = /**
         * @return {?}
         */
            function () {
                console.log("Widget OnInit " + this.type, this);
            };
        /**
         * @return {?}
         */
        AbstractWidget.prototype._unsubscribe = /**
         * @return {?}
         */
            function () {
                try {
                    for (var _a = __values(this._subscriptions), _b = _a.next(); !_b.done; _b = _a.next()) {
                        var subs = _b.value;
                        subs.unsubscribe();
                    }
                }
                catch (e_1_1) {
                    e_1 = { error: e_1_1 };
                }
                finally {
                    try {
                        if (_b && !_b.done && (_c = _a.return))
                            _c.call(_a);
                    }
                    finally {
                        if (e_1)
                            throw e_1.error;
                    }
                }
                var e_1, _c;
            };
        AbstractWidget.propDecorators = {
            widgetDef: [{ type: i0.Input }],
            context: [{ type: i0.Input }]
        };
        return AbstractWidget;
    }());
    /**
     * @param {?} objDef
     * @param {?} context
     * @param {?} asObservable
     * @param {?} expr
     * @return {?}
     */
    function parseDefObject(objDef, context, asObservable, expr) {
        var /** @type {?} */ result = {};
        if (!objDef)
            return null;
        for (var /** @type {?} */ prop in objDef) {
            if (prop.charAt(prop.length - 1) === '=') {
                if (typeof objDef[prop] !== 'string')
                    throw new SyntaxError('Binding options must be "string" Iexpressions');
                result[prop.slice(0, prop.length - 1)] = expr.eval(objDef[prop], context, asObservable);
            }
            else
                result[prop] = asObservable && !rxjs.isObservable(objDef[prop]) ? rxjs.of(objDef[prop]) : objDef[prop];
        }
        return result;
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    /**
     * @abstract
     */
    var /**
     * @abstract
     */ Expressions = (function () {
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
     * Service for Parsing and for evaluating expressions in Widget's configuration
     * The funcionality is provided by the ESpression package
     *
     */
    var /**
     * Service for Parsing and for evaluating expressions in Widget's configuration
     * The funcionality is provided by the ESpression package
     *
     */ ESpression = (function (_super) {
        __extends(ESpression, _super);
        function ESpression() {
            var _this = _super.call(this) || this;
            var /** @type {?} */ es5 = espression.es5Rules();
            // remove Progam / Statements rules, and keep only expressions
            es5[0] = [];
            _this._parser = new espression.Parser(es5);
            var /** @type {?} */ identifierRule = new espression.IdentifierRule({ thisStr: null, literals: {} });
            _this._keyParser = new espression.Parser([
                [new espression.BinaryOperatorRule({
                        '.': {
                            type: espression.MEMBER_EXP,
                            extra: { computed: false },
                            noop: true,
                            left: 'object', right: 'property',
                            rules: [[identifierRule]]
                        }
                    })],
                [identifierRule]
            ]);
            _this._rxEval = new espression.ReactiveEval();
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
                catch (e) {
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
                catch (e) {
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
                    return asObservable ? rxjs.EMPTY : undefined;
                var /** @type {?} */ result;
                try {
                    result = this._rxEval.eval(ast, context);
                }
                catch (e) {
                    console.warn('Error evaluating expression: ', e.message);
                    return asObservable ? rxjs.of(undefined) : undefined;
                }
                return asObservable && !rxjs.isObservable(result) ? rxjs.of(result) : result;
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
                catch (e) {
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
    var /** @type {?} */ expressionProvider = {
        provide: Expressions,
        useClass: ESpression
    };

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var DefaultWidgetComponent = (function (_super) {
        __extends(DefaultWidgetComponent, _super);
        function DefaultWidgetComponent(cdr, expr) {
            return _super.call(this, cdr, expr) || this;
        }
        DefaultWidgetComponent.decorators = [
            { type: i0.Component, args: [{
                        selector: 'wdg-default',
                        template: '<div>Unknown widget "{{type}}"</div>',
                        encapsulation: i0.ViewEncapsulation.None,
                        changeDetection: i0.ChangeDetectionStrategy.OnPush
                    },] },
        ];
        /** @nocollapse */
        DefaultWidgetComponent.ctorParameters = function () {
            return [
                { type: i0.ChangeDetectorRef },
                { type: Expressions }
            ];
        };
        return DefaultWidgetComponent;
    }(AbstractWidget));

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var /** @type {?} */ AF_CONFIG_TOKEN = new i0.InjectionToken('AF_CONFIG_TOKEN');
    var WidgetRegistry = (function () {
        function WidgetRegistry(configs) {
            if (configs === void 0) {
                configs = [];
            }
            var _this = this;
            this._registry = new Map();
            configs.forEach(function (conf) { return conf.widgets && _this.register(conf.widgets); });
            this._default = this._registry.get('default') || DefaultWidgetComponent;
        }
        /**
         * @param {?} widgets
         * @return {?}
         */
        WidgetRegistry.prototype.register = /**
         * @param {?} widgets
         * @return {?}
         */
            function (widgets) {
                var _this = this;
                if (!widgets)
                    return;
                if (!Array.isArray(widgets))
                    widgets = [widgets];
                widgets.forEach(function (widget) {
                    if (widget.type && widget.component)
                        _this._registry.set(widget.type, widget.component);
                });
            };
        /**
         * @param {?} type
         * @return {?}
         */
        WidgetRegistry.prototype.get = /**
         * @param {?} type
         * @return {?}
         */
            function (type) {
                return this._registry.get(type) || this._default;
            };
        WidgetRegistry.decorators = [
            { type: i0.Injectable, args: [{
                        providedIn: 'root'
                    },] },
        ];
        /** @nocollapse */
        WidgetRegistry.ctorParameters = function () {
            return [
                { type: Array, decorators: [{ type: i0.Inject, args: [AF_CONFIG_TOKEN,] }] }
            ];
        };
        /** @nocollapse */ WidgetRegistry.ngInjectableDef = i0.defineInjectable({ factory: function WidgetRegistry_Factory() { return new WidgetRegistry(i0.inject(AF_CONFIG_TOKEN)); }, token: WidgetRegistry, providedIn: "root" });
        return WidgetRegistry;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    /**
     * Injection token used to provide the default root context for widgets
     */
    var /** @type {?} */ ROOT_CONTEXT = new i0.InjectionToken('Widgets Root Context');
    var WidgetDirective = (function () {
        function WidgetDirective(_container, _registry, _cfr, _rootContext, _expr) {
            this._container = _container;
            this._registry = _registry;
            this._cfr = _cfr;
            this._rootContext = _rootContext;
            this._expr = _expr;
        }
        /**
         * @return {?}
         */
        WidgetDirective.prototype.ngOnChanges = /**
         * @return {?}
         */
            function () {
                this._preCreate();
            };
        /**
         * @return {?}
         */
        WidgetDirective.prototype.ngOnDestroy = /**
         * @return {?}
         */
            function () {
                this._destroy();
                this._unsuscribe();
            };
        /**
         * @return {?}
         */
        WidgetDirective.prototype._preCreate = /**
         * @return {?}
         */
            function () {
                var _this = this;
                this.wdgWidget = this.wdgWidget || { type: 'none' };
                this.parentContext = this.parentContext || this._rootContext;
                this.context = Context.create(this.parentContext, parseDefObject(this.wdgWidget.context, this.parentContext, false, this._expr));
                this._destroy();
                this._unsuscribe();
                if (this.wdgWidget.if) {
                    this._ifSubs = this._expr.eval(this.wdgWidget.if, this.context, true).subscribe(function (cond) {
                        if (cond && !_this._widgetRef)
                            _this._create();
                        else
                            _this._destroy();
                    });
                }
                else
                    this._create();
            };
        /**
         * @return {?}
         */
        WidgetDirective.prototype._create = /**
         * @return {?}
         */
            function () {
                var /** @type {?} */ widgetClass = this._registry.get(this.wdgWidget.type);
                var /** @type {?} */ factory = this._cfr.resolveComponentFactory(widgetClass);
                this._widgetRef = this._container.createComponent(factory);
                this.widget = this._widgetRef.instance;
                this.widget.setup(this, this.wdgWidget, this.context);
            };
        /**
         * @return {?}
         */
        WidgetDirective.prototype._destroy = /**
         * @return {?}
         */
            function () {
                if (this._widgetRef) {
                    this._widgetRef.destroy();
                    this._widgetRef = null;
                }
            };
        /**
         * @return {?}
         */
        WidgetDirective.prototype._unsuscribe = /**
         * @return {?}
         */
            function () {
                if (this._ifSubs) {
                    this._ifSubs.unsubscribe();
                    this._ifSubs = null;
                }
            };
        WidgetDirective.decorators = [
            { type: i0.Directive, args: [{
                        selector: '[wdgWidget]'
                    },] },
        ];
        /** @nocollapse */
        WidgetDirective.ctorParameters = function () {
            return [
                { type: i0.ViewContainerRef },
                { type: WidgetRegistry },
                { type: i0.ComponentFactoryResolver },
                { type: Context, decorators: [{ type: i0.Optional }, { type: i0.Inject, args: [ROOT_CONTEXT,] }] },
                { type: Expressions }
            ];
        };
        WidgetDirective.propDecorators = {
            wdgWidget: [{ type: i0.Input }],
            parentContext: [{ type: i0.Input }]
        };
        return WidgetDirective;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    /**
     * Angular Pipe to format text
     */
    var FormatPipe = (function () {
        function FormatPipe() {
        }
        /**
         * @param {?} value
         * @param {?} format
         * @return {?}
         */
        FormatPipe.prototype.transform = /**
         * @param {?} value
         * @param {?} format
         * @return {?}
         */
            function (value, format) {
                return format ? formatValue(value, format) : value;
            };
        FormatPipe.decorators = [
            { type: i0.Pipe, args: [{
                        name: 'format',
                        pure: true
                    },] },
        ];
        return FormatPipe;
    }());
    /**
     * @param {?} value
     * @param {?} format
     * @return {?}
     */
    function formatValue(value, format) {
        if (typeof format !== 'string' || value == null)
            return value;
        var /** @type {?} */ re = /^\s*(\w+)\s*(:(["'])([^"']*)\3)?$/;
        var /** @type {?} */ match = re.exec(format);
        if (!match[0])
            return value;
        switch (match[1].toUpperCase()) {
            case 'NUMBER':
                var /** @type {?} */ num = void 0;
                num = parseFloat(value);
                return isNaN(num) ? value : common.formatNumber(num, 'en-US', match[4]);
            case 'DATE':
                return common.formatDate(value, match[4], 'en-US');
        }
        return value;
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var RoutedWidgetComponent = (function () {
        function RoutedWidgetComponent(_route) {
            this._route = _route;
        }
        /**
         * @return {?}
         */
        RoutedWidgetComponent.prototype.ngOnInit = /**
         * @return {?}
         */
            function () {
                this.widgetDef = this._route.snapshot.data["widgetDef"] || { type: 'empty' };
                this.parentContext = this._route.snapshot.data["parentContext"];
            };
        RoutedWidgetComponent.decorators = [
            { type: i0.Component, args: [{
                        selector: 'wdg-widget',
                        template: '<ng-container [wdgWidget]="widgetDef" [parentContext]="parentContext"></ng-container>',
                        encapsulation: i0.ViewEncapsulation.None,
                        changeDetection: i0.ChangeDetectionStrategy.OnPush
                    },] },
        ];
        /** @nocollapse */
        RoutedWidgetComponent.ctorParameters = function () {
            return [
                { type: router.ActivatedRoute }
            ];
        };
        return RoutedWidgetComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var WidgetsCoreModule = (function () {
        function WidgetsCoreModule() {
        }
        /**
         * @param {?=} config
         * @return {?}
         */
        WidgetsCoreModule.forRoot = /**
         * @param {?=} config
         * @return {?}
         */
            function (config) {
                if (config === void 0) {
                    config = {};
                }
                return {
                    ngModule: WidgetsCoreModule,
                    providers: [
                        { provide: AF_CONFIG_TOKEN, useValue: config, multi: true },
                        { provide: i0.ANALYZE_FOR_ENTRY_COMPONENTS, useValue: config, multi: true }
                    ]
                };
            };
        WidgetsCoreModule.decorators = [
            { type: i0.NgModule, args: [{
                        imports: [common.CommonModule],
                        declarations: [
                            WidgetDirective,
                            RoutedWidgetComponent,
                            DefaultWidgetComponent,
                            FormatPipe
                        ],
                        entryComponents: [DefaultWidgetComponent],
                        exports: [
                            WidgetDirective,
                            RoutedWidgetComponent,
                            FormatPipe
                        ]
                    },] },
        ];
        return WidgetsCoreModule;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var /** @type {?} */ FORM_CONTROL = Symbol('FormControl');
    var AbstractFormFieldWidget = (function (_super) {
        __extends(AbstractFormFieldWidget, _super);
        function AbstractFormFieldWidget(cdr, expr) {
            return _super.call(this, cdr, expr) || this;
        }
        /**
         * @param {?} def
         * @return {?}
         */
        AbstractFormFieldWidget.prototype.dynOnSetup = /**
         * @param {?} def
         * @return {?}
         */
            function (def) {
                var _this = this;
                // get bound model
                if (!def.bind)
                    throw new Error('Form field widgets must have a "bind" property defined');
                var /** @type {?} */ lvalue = this._expr.lvalue(def.bind, this.context);
                if (!lvalue)
                    throw new Error('Form field "bind" property must be an identifier or member expression');
                if (!espression.isReactive(lvalue.o))
                    throw new Error('Bound Key must be of Reactive Type');
                // setup validation
                if (def.validate && (this.validate = this._expr.parse(def.validate))) {
                    // tslint:disable-line:whitespace
                    this.validateContext = Context.create(this.context);
                    this.formControl = new forms.FormControl(null, null, function (ctrl) {
                        _this.validateContext['$value'] = ctrl.value;
                        return _this._expr.evaluate(_this.validate, _this.validateContext, true).pipe(operators.take(1), operators.map(function (res) {
                            return res ? null : { validate: 'validation error' };
                        }));
                    });
                }
                else
                    this.formControl = new forms.FormControl();
                var /** @type {?} */ parentForm = this.context[FORM_CONTROL];
                if (parentForm) {
                    if (parentForm instanceof forms.FormGroup)
                        parentForm.addControl(lvalue.m, this.formControl);
                    else if (parentForm instanceof forms.FormArray)
                        parentForm.push(this.formControl);
                }
                // listen to bound context value and update on changes
                this.addSubscription = lvalue.o[espression.GET_OBSERVABLE](lvalue.m).subscribe(function (val) {
                    return val !== _this.formControl.value && _this.formControl.setValue(val);
                });
                // listen to control changes to update bound context value
                this.addSubscription = this.formControl.valueChanges.subscribe(function (val) {
                    if (val !== lvalue.o[lvalue.m])
                        lvalue.o[lvalue.m] = val;
                });
                return def;
            };
        return AbstractFormFieldWidget;
    }(AbstractWidget));

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    /**
     * Helper module to centrally import all material components
     */
    var MaterialModule = (function () {
        function MaterialModule() {
        }
        MaterialModule.decorators = [
            { type: i0.NgModule, args: [{
                        exports: [
                            common.CommonModule,
                            forms.ReactiveFormsModule,
                            autocomplete.MatAutocompleteModule,
                            sidenav.MatSidenavModule,
                            button.MatButtonModule,
                            icon.MatIconModule,
                            list.MatListModule,
                            input.MatInputModule,
                            dialog.MatDialogModule,
                            toolbar.MatToolbarModule,
                            progressBar.MatProgressBarModule,
                            expansion.MatExpansionModule,
                            select.MatSelectModule,
                            tabs.MatTabsModule,
                            snackBar.MatSnackBarModule,
                            slideToggle.MatSlideToggleModule,
                            chips.MatChipsModule,
                            card.MatCardModule,
                            checkbox.MatCheckboxModule,
                            slider.MatSliderModule,
                            table.MatTableModule,
                            paginator.MatPaginatorModule,
                            sort.MatSortModule,
                            menu.MatMenuModule,
                        ]
                    },] },
        ];
        return MaterialModule;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var InputWidgetComponent = (function (_super) {
        __extends(InputWidgetComponent, _super);
        function InputWidgetComponent(cdr, expr) {
            return _super.call(this, cdr, expr) || this;
        }
        InputWidgetComponent.decorators = [
            { type: i0.Component, args: [{
                        selector: 'wdg-input',
                        template: "<mat-form-field style.width=\"100%\">\n\n    <mat-label *ngIf=\"title\">\n        {{ title }}\n    </mat-label>\n\n    <input matInput\n           name=\"aaa\"\n           [type]=\"type || 'text'\"\n           [formControl]=\"formControl\"\n           [placeholder]=\"placeholder\"\n           [required]=\"required\">\n\n    <mat-error [id]=\"null\">\n\n    </mat-error>\n\n    <mat-hint *ngIf=\"description\"\n              [id]=\"null\">\n        {{ description }}\n    </mat-hint>\n\n</mat-form-field>\n",
                        styles: [""],
                        encapsulation: i0.ViewEncapsulation.None,
                        changeDetection: i0.ChangeDetectionStrategy.OnPush
                    },] },
        ];
        /** @nocollapse */
        InputWidgetComponent.ctorParameters = function () {
            return [
                { type: i0.ChangeDetectorRef },
                { type: Expressions }
            ];
        };
        return InputWidgetComponent;
    }(AbstractFormFieldWidget));

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var CheckboxWidgetComponent = (function (_super) {
        __extends(CheckboxWidgetComponent, _super);
        function CheckboxWidgetComponent(cdr, expr) {
            return _super.call(this, cdr, expr) || this;
        }
        CheckboxWidgetComponent.decorators = [
            { type: i0.Component, args: [{
                        selector: 'wdg-checkbox',
                        template: "<mat-checkbox labelPosition=\"before\" [formControl]=\"formControl\">\n  {{title}}\n</mat-checkbox>\n",
                        styles: [""],
                        encapsulation: i0.ViewEncapsulation.None,
                        changeDetection: i0.ChangeDetectionStrategy.OnPush
                    },] },
        ];
        /** @nocollapse */
        CheckboxWidgetComponent.ctorParameters = function () {
            return [
                { type: i0.ChangeDetectorRef },
                { type: Expressions }
            ];
        };
        return CheckboxWidgetComponent;
    }(AbstractFormFieldWidget));

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var ToggleWidgetComponent = (function (_super) {
        __extends(ToggleWidgetComponent, _super);
        function ToggleWidgetComponent(cdr, expr) {
            return _super.call(this, cdr, expr) || this;
        }
        ToggleWidgetComponent.decorators = [
            { type: i0.Component, args: [{
                        selector: 'wdg-toggle',
                        template: "<mat-slide-toggle labelPosition=\"before\">\n  {{ title}}\n</mat-slide-toggle>\n",
                        styles: [""],
                        encapsulation: i0.ViewEncapsulation.None,
                        changeDetection: i0.ChangeDetectionStrategy.OnPush
                    },] },
        ];
        /** @nocollapse */
        ToggleWidgetComponent.ctorParameters = function () {
            return [
                { type: i0.ChangeDetectorRef },
                { type: Expressions }
            ];
        };
        return ToggleWidgetComponent;
    }(AbstractFormFieldWidget));

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var SliderWidgetComponent = (function (_super) {
        __extends(SliderWidgetComponent, _super);
        function SliderWidgetComponent(cdr, expr) {
            return _super.call(this, cdr, expr) || this;
        }
        SliderWidgetComponent.decorators = [
            { type: i0.Component, args: [{
                        selector: 'wdg-slider',
                        template: "<span>{{title}}</span>\n<mat-slider [formControl]=\"formControl\"></mat-slider>\n",
                        styles: [""],
                        encapsulation: i0.ViewEncapsulation.None,
                        changeDetection: i0.ChangeDetectionStrategy.OnPush
                    },] },
        ];
        /** @nocollapse */
        SliderWidgetComponent.ctorParameters = function () {
            return [
                { type: i0.ChangeDetectorRef },
                { type: Expressions }
            ];
        };
        return SliderWidgetComponent;
    }(AbstractFormFieldWidget));

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var ButtonWidgetComponent = (function (_super) {
        __extends(ButtonWidgetComponent, _super);
        function ButtonWidgetComponent(cdr, expr) {
            return _super.call(this, cdr, expr) || this;
        }
        /**
         * @param {?} def
         * @return {?}
         */
        ButtonWidgetComponent.prototype.dynOnSetup = /**
         * @param {?} def
         * @return {?}
         */
            function (def) {
                if (def.bind) {
                    var /** @type {?} */ lvalue = this._expr.lvalue(def.bind, this.context);
                    if (!lvalue)
                        throw new Error('Form field "bind" property must be an identifier or member expression');
                    if (!espression.isReactive(lvalue.o))
                        throw new Error('Bound Key must be of Reactive Type');
                    this._lvalue = lvalue;
                }
                return def;
            };
        /**
         * @param {?} _event
         * @return {?}
         */
        ButtonWidgetComponent.prototype.clickEvent = /**
         * @param {?} _event
         * @return {?}
         */
            function (_event) {
                var _this = this;
                if (this._clickSubs) {
                    this._clickSubs.unsubscribe();
                    this._clickSubs = null;
                }
                if (this.click) {
                    this._clickSubs = this._expr.eval(this.click, this.context, true).pipe(operators.take(1)).subscribe(function (res) {
                        return _this._lvalue.o[_this._lvalue.m] = res;
                    });
                }
            };
        ButtonWidgetComponent.decorators = [
            { type: i0.Component, args: [{
                        selector: 'wdg-button',
                        template: "<button mat-button (click)=\"clickEvent($event)\">\n  {{title}}\n</button>\n",
                        styles: [""],
                        encapsulation: i0.ViewEncapsulation.None,
                        changeDetection: i0.ChangeDetectionStrategy.OnPush
                    },] },
        ];
        /** @nocollapse */
        ButtonWidgetComponent.ctorParameters = function () {
            return [
                { type: i0.ChangeDetectorRef },
                { type: Expressions }
            ];
        };
        return ButtonWidgetComponent;
    }(AbstractWidget));

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var FormWidgetComponent = (function (_super) {
        __extends(FormWidgetComponent, _super);
        function FormWidgetComponent(cdr, expr) {
            return _super.call(this, cdr, expr) || this;
        }
        /**
         * @param {?} def
         * @return {?}
         */
        FormWidgetComponent.prototype.dynOnSetup = /**
         * @param {?} def
         * @return {?}
         */
            function (def) {
                this.formGroup = new forms.FormGroup({});
                // register with parent form, if any
                var /** @type {?} */ parentForm = this.context[FORM_CONTROL];
                if (parentForm) {
                    if (parentForm instanceof forms.FormGroup)
                        parentForm.addControl('control', this.formGroup);
                    else if (parentForm instanceof forms.FormArray)
                        parentForm.push(this.formGroup);
                }
                // save this FormGroup as parent form for the children
                Context.defineHidden(this.context, (_a = {}, _a[FORM_CONTROL] = this.formGroup, _a));
                // create a Store for the variables
                this.context['$model'] = espression.RxObject({});
                return def;
                var _a;
            };
        FormWidgetComponent.decorators = [
            { type: i0.Component, args: [{
                        selector: 'wdg-form',
                        template: "<ng-container *ngFor=\"let element of content\" [wdgWidget]=\"element\" [parentContext]=\"context\">\n\n</ng-container>\n",
                        styles: [""],
                        encapsulation: i0.ViewEncapsulation.None,
                        changeDetection: i0.ChangeDetectionStrategy.OnPush
                    },] },
        ];
        /** @nocollapse */
        FormWidgetComponent.ctorParameters = function () {
            return [
                { type: i0.ChangeDetectorRef },
                { type: Expressions }
            ];
        };
        return FormWidgetComponent;
    }(AbstractWidget));

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var AutocompleteWidgetComponent = (function (_super) {
        __extends(AutocompleteWidgetComponent, _super);
        function AutocompleteWidgetComponent(cdr, expr) {
            var _this = _super.call(this, cdr, expr) || this;
            _this.enum = [];
            return _this;
        }
        /**
         * @return {?}
         */
        AutocompleteWidgetComponent.prototype.dynOnBeforeBind = /**
         * @return {?}
         */
            function () {
                this.map('enum', function (val) {
                    return Array.isArray(val) ? val : [];
                });
            };
        /**
         * @return {?}
         */
        AutocompleteWidgetComponent.prototype.dynOnAfterBind = /**
         * @return {?}
         */
            function () {
                var _this = this;
                this.map('enum', function (val) { return (_this._filter(_this.formControl.value), val); });
            };
        /**
         * @return {?}
         */
        AutocompleteWidgetComponent.prototype.ngOnInit = /**
         * @return {?}
         */
            function () {
                var _this = this;
                _super.prototype.ngOnInit.call(this);
                this.filteredOptions = this.formControl.valueChanges
                    .pipe(operators.startWith(''), operators.map(function (value) { return _this._filter(value); }));
            };
        /**
         * @param {?} value
         * @return {?}
         */
        AutocompleteWidgetComponent.prototype._filter = /**
         * @param {?} value
         * @return {?}
         */
            function (value) {
                var /** @type {?} */ filterValue = value && value.toLowerCase();
                return this.enum.filter(function (option) { return option.toLowerCase().includes(filterValue); });
            };
        AutocompleteWidgetComponent.decorators = [
            { type: i0.Component, args: [{
                        selector: 'wdg-autocomplete',
                        template: "<mat-form-field style.width=\"100%\">\n\n  <mat-label *ngIf=\"title\">\n    {{ title }}\n  </mat-label>\n\n  <input matInput name=\"aaa\" [type]=\"type || 'text'\" [formControl]=\"formControl\" [placeholder]=\"placeholder\"\n    [matAutocomplete]=\"auto\">\n\n  <mat-error [id]=\"null\">\n\n  </mat-error>\n\n  <mat-hint *ngIf=\"description\" [id]=\"null\">\n    {{ description }}\n  </mat-hint>\n\n  <mat-autocomplete #auto=\"matAutocomplete\">\n    <mat-option *ngFor=\"let option of filteredOptions | async; index as optIndex\" [value]=\"option\">\n      {{option}}\n    </mat-option>\n  </mat-autocomplete>\n\n</mat-form-field>\n",
                        styles: [""],
                        encapsulation: i0.ViewEncapsulation.None,
                        changeDetection: i0.ChangeDetectionStrategy.OnPush
                    },] },
        ];
        /** @nocollapse */
        AutocompleteWidgetComponent.ctorParameters = function () {
            return [
                { type: i0.ChangeDetectorRef },
                { type: Expressions }
            ];
        };
        return AutocompleteWidgetComponent;
    }(AbstractFormFieldWidget));

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var FormFieldWidgetsModule = (function () {
        function FormFieldWidgetsModule() {
        }
        FormFieldWidgetsModule.decorators = [
            { type: i0.NgModule, args: [{
                        imports: [
                            MaterialModule,
                            WidgetsCoreModule.forRoot({
                                widgets: [
                                    { type: 'input', component: InputWidgetComponent },
                                    { type: 'checkbox', component: CheckboxWidgetComponent },
                                    { type: 'toggle', component: ToggleWidgetComponent },
                                    { type: 'slider', component: SliderWidgetComponent },
                                    { type: 'button', component: ButtonWidgetComponent },
                                    { type: 'form', component: FormWidgetComponent },
                                    { type: 'autocomplete', component: AutocompleteWidgetComponent },
                                ]
                            })
                        ],
                        declarations: [
                            InputWidgetComponent,
                            CheckboxWidgetComponent,
                            ToggleWidgetComponent,
                            SliderWidgetComponent,
                            ButtonWidgetComponent,
                            FormWidgetComponent,
                            AutocompleteWidgetComponent
                        ],
                        exports: []
                    },] },
        ];
        return FormFieldWidgetsModule;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var CardWidgetComponent = (function (_super) {
        __extends(CardWidgetComponent, _super);
        function CardWidgetComponent(cdr, expr) {
            return _super.call(this, cdr, expr) || this;
        }
        CardWidgetComponent.decorators = [
            { type: i0.Component, args: [{
                        selector: 'wdg-card',
                        template: "<mat-card>\n  <mat-card-title *ngIf=\"title\">{{title}}</mat-card-title>\n  <mat-card-subtitle *ngIf=\"description\">{{description}}</mat-card-subtitle>\n  <mat-card-content>\n    <ng-container *ngFor=\"let element of content\" [wdgWidget]=\"element\" [parentContext]=\"context\"></ng-container>\n  </mat-card-content>\n  <mat-card-actions align=\"end\" *ngIf=\"actions\">\n    <ng-container *ngFor=\"let element of actions\" [wdgWidget]=\"element\" [parentContext]=\"context\"></ng-container>\n  </mat-card-actions>\n</mat-card>\n",
                        styles: [""],
                        encapsulation: i0.ViewEncapsulation.None,
                        changeDetection: i0.ChangeDetectionStrategy.OnPush
                    },] },
        ];
        /** @nocollapse */
        CardWidgetComponent.ctorParameters = function () {
            return [
                { type: i0.ChangeDetectorRef },
                { type: Expressions }
            ];
        };
        return CardWidgetComponent;
    }(AbstractWidget));

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var TableWidgetComponent = (function (_super) {
        __extends(TableWidgetComponent, _super);
        function TableWidgetComponent(cdr, expr) {
            var _this = _super.call(this, cdr, expr) || this;
            _this.disableSort = [];
            _this.actions = [];
            _this.tableDataSource = new table.MatTableDataSource();
            return _this;
        }
        /**
         * @return {?}
         */
        TableWidgetComponent.prototype.dynOnBeforeBind = /**
         * @return {?}
         */
            function () {
                var _this = this;
                var /** @type {?} */ opt = this.widgetDef.options;
                // if the only source is a static array, lets check if it has 'property=' columns to evaluate
                // and add the auto binding
                if (opt && !opt['dataSource='] &&
                    Array.isArray(opt["dataSource"])) {
                    var /** @type {?} */ dataSource = (espression.combineMixed(opt["dataSource"].map(function (row) {
                        return espression.combineMixed(parseDefObject(row, _this.context, false, _this._expr));
                    }, false), false));
                    if (rxjs.isObservable(dataSource))
                        this.bindings["dataSource"] = dataSource;
                    else
                        this.dataSource = dataSource;
                }
                this.map('disableSort', function (sort$$1) {
                    if (sort$$1 === true)
                        return null;
                    if (!Array.isArray(sort$$1))
                        return [];
                    return sort$$1;
                });
                this.map('dataSource', function (table$$1) {
                    return _this.tableDataSource.data = table$$1.map(function (row) {
                        row = parseDefObject(row, Context.create(_this.context, { $data: row }), false, _this._expr);
                        if (Array.isArray(_this.colTransform)) {
                            for (var /** @type {?} */ i = 0; i < _this.colTransform.length; i++) {
                                if (_this.colTransform[i]) {
                                    var /** @type {?} */ context = Context.create(_this.context);
                                    context.$data = row[_this.colKeys[i]];
                                    row[_this.colKeys[i]] = _this._expr.eval(_this.colTransform[i], context, false);
                                }
                            }
                        }
                        return row;
                    });
                });
                this.map('pageSizes', function (value) {
                    if (!Array.isArray(value) || !value.length) {
                        _this.tableDataSource.paginator = null;
                        return null;
                    }
                    _this.tableDataSource.paginator = _this.paginator;
                    return value;
                });
                this.map('colKeys', function (keys) {
                    if (_this.actions && _this.actions.length)
                        _this.showCols = keys.concat('__actions__');
                    else
                        _this.showCols = keys;
                    return keys;
                });
                this.map('actions', function (actions) {
                    if (!Array.isArray(actions))
                        actions = [];
                    _this.showCols = actions.length ? _this.colKeys.concat('__actions__') : _this.colKeys;
                    return actions;
                });
            };
        /**
         * @return {?}
         */
        TableWidgetComponent.prototype.ngOnInit = /**
         * @return {?}
         */
            function () {
                _super.prototype.ngOnInit.call(this);
                this.tableDataSource.sort = this.sort;
            };
        /**
         * @param {?} filterValue
         * @return {?}
         */
        TableWidgetComponent.prototype.applyFilter = /**
         * @param {?} filterValue
         * @return {?}
         */
            function (filterValue) {
                this.tableDataSource.filter = filterValue;
                if (this.tableDataSource.paginator) {
                    this.tableDataSource.paginator.firstPage();
                }
            };
        /**
         * @param {?} rowData
         * @param {?} actionIndex
         * @return {?}
         */
        TableWidgetComponent.prototype.actionClick = /**
         * @param {?} rowData
         * @param {?} actionIndex
         * @return {?}
         */
            function (rowData, actionIndex) {
                var /** @type {?} */ context = Context.create(this.context, { $data: rowData });
                this.addSubscription = this._expr.eval(this.actions[actionIndex].action, context, true).subscribe(function () {
                    // TODO logic to reload table
                });
            };
        TableWidgetComponent.decorators = [
            { type: i0.Component, args: [{
                        selector: 'wdg-table',
                        template: "<div>\n  <section class=\"table-title\">\n    <h6>{{title}}</h6>\n\n    <div class=\"spacer\"></div>\n\n    <mat-form-field *ngIf=\"filterBy\">\n      <input matInput (keyup)=\"applyFilter($event.target.value)\" placeholder=\"Filter\">\n    </mat-form-field>\n  </section>\n\n  <section class=\"mat-elevation-z1\">\n    <table mat-table [dataSource]=\"tableDataSource\" matSort [matSortDisabled]=\"!disableSort\">\n\n      <!-- Dynamic Column definitions-->\n      <ng-container [matColumnDef]=\"colKey\" *ngFor=\"let colKey of colKeys; index as colIndex\">\n        <th mat-header-cell *matHeaderCellDef mat-sort-header [disabled]=\"disableSort?.indexOf(colKey) >= 0\"> {{colHeaders[colIndex] || colKey}} </th>\n        <ng-container *ngIf=\"colFormat && colFormat[colIndex]; else noFormatCellDef\">\n          <td mat-cell *matCellDef=\"let rowData\">{{rowData[colKey] | format:colFormat[colIndex]}}</td>\n        </ng-container>\n        <ng-template #noFormatCellDef>\n          <td mat-cell *matCellDef=\"let rowData\">{{rowData[colKey]}}</td>\n        </ng-template>\n      </ng-container>\n\n      <ng-container *ngIf=\"actions?.length\" [matColumnDef]=\"'__actions__'\">\n        <th mat-header-cell *matHeaderCellDef > {{actionsHeader || 'Actions'}} </th>\n        <td mat-cell *matCellDef=\"let rowData\">\n          <button mat-icon-button [matMenuTriggerFor]=\"menu\">\n            <mat-icon svgIcon=\"dots-vertical\"></mat-icon>\n          </button>\n          <mat-menu #menu=\"matMenu\">\n\n            <button mat-menu-item *ngFor=\"let action of actions; index as actionIndex\" (click)=\"actionClick(rowData, actionIndex)\">\n              <mat-icon [svgIcon]=\"actions[actionIndex].icon\"></mat-icon>\n              <span>{{actions[actionIndex].label}}</span>\n            </button>\n          </mat-menu>\n        </td>\n      </ng-container>\n\n\n      <!-- Row definitions-->\n      <ng-container *ngIf=\"colHeaders\">\n        <tr mat-header-row *matHeaderRowDef=\"showCols\" class=\"header-row\"></tr>\n      </ng-container>\n      <tr mat-row *matRowDef=\"let element; columns: showCols;\" class=\"data-row\"></tr>\n    </table>\n\n    <mat-paginator [class.hiddenPaginator]=\"!pageSizes\" [pageSizeOptions]=\"pageSizes\" [hidePageSize]=\"pageSizes?.length<=1\"></mat-paginator>\n  </section>\n</div>\n",
                        styles: ["wdg-table table{width:100%}wdg-table tr.data-row:hover{background:#f5f5f5}wdg-table tr.data-row:active{background:#efefef}wdg-table .data-row td{border-bottom-width:0}wdg-table mat-paginator.hiddenPaginator{display:none}wdg-table .table-title{display:flex;flex-flow:row}wdg-table .table-title>*{flex:0 0 auto}wdg-table .table-title .spacer{flex:1 1 auto}"],
                        encapsulation: i0.ViewEncapsulation.None,
                        changeDetection: i0.ChangeDetectionStrategy.OnPush
                    },] },
        ];
        /** @nocollapse */
        TableWidgetComponent.ctorParameters = function () {
            return [
                { type: i0.ChangeDetectorRef },
                { type: Expressions }
            ];
        };
        TableWidgetComponent.propDecorators = {
            paginator: [{ type: i0.ViewChild, args: [paginator.MatPaginator,] }],
            sort: [{ type: i0.ViewChild, args: [sort.MatSort,] }]
        };
        return TableWidgetComponent;
    }(AbstractWidget));

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var ContainerWidgetComponent = (function (_super) {
        __extends(ContainerWidgetComponent, _super);
        function ContainerWidgetComponent(cdr, expr) {
            return _super.call(this, cdr, expr) || this;
        }
        /**
         * @return {?}
         */
        ContainerWidgetComponent.prototype.dynOnBeforeBind = /**
         * @return {?}
         */
            function () {
                this.map('direction', function (dir) { return dir || 'row'; });
            };
        ContainerWidgetComponent.decorators = [
            { type: i0.Component, args: [{
                        selector: 'wdg-container',
                        template: "<ng-container *ngFor=\"let element of content\" [wdgWidget]=\"element\" [parentContext]=\"context\">\n\n</ng-container>\n",
                        styles: ["wdg-container.wdg-flex{display:flex;flex-wrap:wrap}wdg-container.wdg-flex>*{flex:1 1 auto}"],
                        // tslint:disable-next-line:use-host-property-decorator
                        host: {
                            '[class.wdg-flex]': 'true',
                            '[style.flex-direction]': 'direction'
                        },
                        encapsulation: i0.ViewEncapsulation.None,
                        changeDetection: i0.ChangeDetectionStrategy.OnPush
                    },] },
        ];
        /** @nocollapse */
        ContainerWidgetComponent.ctorParameters = function () {
            return [
                { type: i0.ChangeDetectorRef },
                { type: Expressions }
            ];
        };
        return ContainerWidgetComponent;
    }(AbstractWidget));

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var GridContainerWidgetComponent = (function (_super) {
        __extends(GridContainerWidgetComponent, _super);
        function GridContainerWidgetComponent(cdr, expr) {
            return _super.call(this, cdr, expr) || this;
        }
        /**
         * @return {?}
         */
        GridContainerWidgetComponent.prototype.dynOnBeforeBind = /**
         * @return {?}
         */
            function () {
                this.map('direction', function (dir) { return dir || 'row'; });
            };
        GridContainerWidgetComponent.decorators = [
            { type: i0.Component, args: [{
                        selector: 'wdg-grid-container',
                        template: "<ng-container *ngFor=\"let element of content\" [wdgWidget]=\"element\" [parentContext]=\"context\">\n\n</ng-container>\n",
                        styles: ["wdg-grid-container.wdg-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));grid-auto-flow:row dense}"],
                        // tslint:disable-next-line:use-host-property-decorator
                        host: {
                            '[class.wdg-grid]': 'true',
                            '[style.flex-direction]': 'direction'
                        },
                        encapsulation: i0.ViewEncapsulation.None,
                        changeDetection: i0.ChangeDetectionStrategy.OnPush
                    },] },
        ];
        /** @nocollapse */
        GridContainerWidgetComponent.ctorParameters = function () {
            return [
                { type: i0.ChangeDetectorRef },
                { type: Expressions }
            ];
        };
        return GridContainerWidgetComponent;
    }(AbstractWidget));

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var TabsWidgetComponent = (function (_super) {
        __extends(TabsWidgetComponent, _super);
        function TabsWidgetComponent(cdr, expr) {
            return _super.call(this, cdr, expr) || this;
        }
        /**
         * @return {?}
         */
        TabsWidgetComponent.prototype.ngOnInit = /**
         * @return {?}
         */
            function () {
            };
        TabsWidgetComponent.decorators = [
            { type: i0.Component, args: [{
                        selector: 'wdg-tabs',
                        template: "<mat-tab-group>\n\n  <mat-tab *ngFor=\"let tab of content; index as tabIndex\" [label]=\"tabLabels[tabIndex] || ('Tab'+tabIndex)\">\n\n    <ng-template matTabContent>\n      <ng-container [wdgWidget]=\"tab\" [parentContext]=\"context\"></ng-container>\n    </ng-template>\n\n  </mat-tab>\n\n\n</mat-tab-group>\n",
                        styles: [""],
                        encapsulation: i0.ViewEncapsulation.None,
                        changeDetection: i0.ChangeDetectionStrategy.OnPush
                    },] },
        ];
        /** @nocollapse */
        TabsWidgetComponent.ctorParameters = function () {
            return [
                { type: i0.ChangeDetectorRef },
                { type: Expressions }
            ];
        };
        return TabsWidgetComponent;
    }(AbstractWidget));

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var CodeWidgetComponent = (function (_super) {
        __extends(CodeWidgetComponent, _super);
        function CodeWidgetComponent(cdr, expr) {
            return _super.call(this, cdr, expr) || this;
        }
        CodeWidgetComponent.decorators = [
            { type: i0.Component, args: [{
                        selector: 'wdg-code',
                        template: "<code>\n{{text}}\n</code>",
                        styles: ["wdg-code code{white-space:pre}"],
                        encapsulation: i0.ViewEncapsulation.None,
                        changeDetection: i0.ChangeDetectionStrategy.OnPush
                    },] },
        ];
        /** @nocollapse */
        CodeWidgetComponent.ctorParameters = function () {
            return [
                { type: i0.ChangeDetectorRef },
                { type: Expressions }
            ];
        };
        return CodeWidgetComponent;
    }(AbstractWidget));

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var CommonWidgetsModule = (function () {
        function CommonWidgetsModule() {
        }
        CommonWidgetsModule.decorators = [
            { type: i0.NgModule, args: [{
                        imports: [
                            MaterialModule,
                            WidgetsCoreModule.forRoot({
                                widgets: [
                                    { type: 'card', component: CardWidgetComponent },
                                    { type: 'table', component: TableWidgetComponent },
                                    { type: 'container', component: ContainerWidgetComponent },
                                    { type: 'grid-container', component: GridContainerWidgetComponent },
                                    { type: 'tabs', component: TabsWidgetComponent },
                                    { type: 'code', component: CodeWidgetComponent },
                                ]
                            })
                        ],
                        declarations: [
                            CardWidgetComponent,
                            TableWidgetComponent,
                            ContainerWidgetComponent,
                            GridContainerWidgetComponent,
                            TabsWidgetComponent,
                            CodeWidgetComponent,
                        ],
                        exports: []
                    },] },
        ];
        return CommonWidgetsModule;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */

    exports.Context = Context;
    exports.AbstractWidget = AbstractWidget;
    exports.parseDefObject = parseDefObject;
    exports.ROOT_CONTEXT = ROOT_CONTEXT;
    exports.WidgetDirective = WidgetDirective;
    exports.AF_CONFIG_TOKEN = AF_CONFIG_TOKEN;
    exports.WidgetRegistry = WidgetRegistry;
    exports.WidgetsCoreModule = WidgetsCoreModule;
    exports.FormatPipe = FormatPipe;
    exports.formatValue = formatValue;
    exports.RoutedWidgetComponent = RoutedWidgetComponent;
    exports.Expressions = Expressions;
    exports.ESpression = ESpression;
    exports.expressionProvider = expressionProvider;
    exports.FORM_CONTROL = FORM_CONTROL;
    exports.AbstractFormFieldWidget = AbstractFormFieldWidget;
    exports.FormFieldWidgetsModule = FormFieldWidgetsModule;
    exports.CommonWidgetsModule = CommonWidgetsModule;
    exports.MaterialModule = MaterialModule;
    exports.ɵa = DefaultWidgetComponent;
    exports.ɵi = CardWidgetComponent;
    exports.ɵn = CodeWidgetComponent;
    exports.ɵk = ContainerWidgetComponent;
    exports.ɵl = GridContainerWidgetComponent;
    exports.ɵj = TableWidgetComponent;
    exports.ɵm = TabsWidgetComponent;
    exports.ɵh = AutocompleteWidgetComponent;
    exports.ɵf = ButtonWidgetComponent;
    exports.ɵc = CheckboxWidgetComponent;
    exports.ɵg = FormWidgetComponent;
    exports.ɵb = InputWidgetComponent;
    exports.ɵe = SliderWidgetComponent;
    exports.ɵd = ToggleWidgetComponent;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVhY3RpdmUtanNvbi1mb3JtLW5nLnVtZC5qcy5tYXAiLCJzb3VyY2VzIjpbIm5nOi8vcmVhY3RpdmUtanNvbi1mb3JtLW5nL2xpYi9jb3JlL2NvbnRleHQudHMiLG51bGwsIm5nOi8vcmVhY3RpdmUtanNvbi1mb3JtLW5nL2xpYi9jb3JlL2Fic3RyYWN0d2lkZ2V0LnRzIiwibmc6Ly9yZWFjdGl2ZS1qc29uLWZvcm0tbmcvbGliL2NvcmUvZXhwcmVzc2lvbnMudHMiLCJuZzovL3JlYWN0aXZlLWpzb24tZm9ybS1uZy9saWIvY29yZS9kZWZhdWx0d2lkZ2V0LmNvbXBvbmVudC50cyIsIm5nOi8vcmVhY3RpdmUtanNvbi1mb3JtLW5nL2xpYi9jb3JlL3dpZGdldHJlZ2lzdHJ5LnNlcnZpY2UudHMiLCJuZzovL3JlYWN0aXZlLWpzb24tZm9ybS1uZy9saWIvY29yZS93aWRnZXQuZGlyZWN0aXZlLnRzIiwibmc6Ly9yZWFjdGl2ZS1qc29uLWZvcm0tbmcvbGliL2NvcmUvZm9ybWF0LnRzIiwibmc6Ly9yZWFjdGl2ZS1qc29uLWZvcm0tbmcvbGliL2NvcmUvcm91dGVkd2lkZ2V0LmNvbXBvbmVudC50cyIsIm5nOi8vcmVhY3RpdmUtanNvbi1mb3JtLW5nL2xpYi9jb3JlL2NvcmUubW9kdWxlLnRzIiwibmc6Ly9yZWFjdGl2ZS1qc29uLWZvcm0tbmcvbGliL2NvcmUvZm9ybWZpZWxkd2lkZ2V0LnRzIiwibmc6Ly9yZWFjdGl2ZS1qc29uLWZvcm0tbmcvbGliL21hdGVyaWFsL21hdGVyaWFsLm1vZHVsZS50cyIsIm5nOi8vcmVhY3RpdmUtanNvbi1mb3JtLW5nL2xpYi9tYXRlcmlhbC9mb3JtZmllbGQvaW5wdXQvaW5wdXQuY29tcG9uZW50LnRzIiwibmc6Ly9yZWFjdGl2ZS1qc29uLWZvcm0tbmcvbGliL21hdGVyaWFsL2Zvcm1maWVsZC9jaGVja2JveC9jaGVja2JveC5jb21wb25lbnQudHMiLCJuZzovL3JlYWN0aXZlLWpzb24tZm9ybS1uZy9saWIvbWF0ZXJpYWwvZm9ybWZpZWxkL3RvZ2dsZS90b2dnbGUuY29tcG9uZW50LnRzIiwibmc6Ly9yZWFjdGl2ZS1qc29uLWZvcm0tbmcvbGliL21hdGVyaWFsL2Zvcm1maWVsZC9zbGlkZXIvc2xpZGVyLmNvbXBvbmVudC50cyIsIm5nOi8vcmVhY3RpdmUtanNvbi1mb3JtLW5nL2xpYi9tYXRlcmlhbC9mb3JtZmllbGQvYnV0dG9uL2J1dHRvbi5jb21wb25lbnQudHMiLCJuZzovL3JlYWN0aXZlLWpzb24tZm9ybS1uZy9saWIvbWF0ZXJpYWwvZm9ybWZpZWxkL2Zvcm0vZm9ybS5jb21wb25lbnQudHMiLCJuZzovL3JlYWN0aXZlLWpzb24tZm9ybS1uZy9saWIvbWF0ZXJpYWwvZm9ybWZpZWxkL2F1dG9jb21wbGV0ZS9hdXRvY29tcGxldGUuY29tcG9uZW50LnRzIiwibmc6Ly9yZWFjdGl2ZS1qc29uLWZvcm0tbmcvbGliL21hdGVyaWFsL2Zvcm1maWVsZC9mb3JtZmllbGQubW9kdWxlLnRzIiwibmc6Ly9yZWFjdGl2ZS1qc29uLWZvcm0tbmcvbGliL21hdGVyaWFsL2NvbW1vbi9jYXJkL2NhcmQuY29tcG9uZW50LnRzIiwibmc6Ly9yZWFjdGl2ZS1qc29uLWZvcm0tbmcvbGliL21hdGVyaWFsL2NvbW1vbi90YWJsZS90YWJsZS5jb21wb25lbnQudHMiLCJuZzovL3JlYWN0aXZlLWpzb24tZm9ybS1uZy9saWIvbWF0ZXJpYWwvY29tbW9uL2NvbnRhaW5lci9jb250YWluZXIuY29tcG9uZW50LnRzIiwibmc6Ly9yZWFjdGl2ZS1qc29uLWZvcm0tbmcvbGliL21hdGVyaWFsL2NvbW1vbi9ncmlkLWNvbnRhaW5lci9ncmlkY29udGFpbmVyLmNvbXBvbmVudC50cyIsIm5nOi8vcmVhY3RpdmUtanNvbi1mb3JtLW5nL2xpYi9tYXRlcmlhbC9jb21tb24vdGFicy90YWJzLmNvbXBvbmVudC50cyIsIm5nOi8vcmVhY3RpdmUtanNvbi1mb3JtLW5nL2xpYi9tYXRlcmlhbC9jb21tb24vY29kZS9jb2RlLmNvbXBvbmVudC50cyIsIm5nOi8vcmVhY3RpdmUtanNvbi1mb3JtLW5nL2xpYi9tYXRlcmlhbC9jb21tb24vY29tbW9uLm1vZHVsZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxOCBBZHJpYW4gUGFuZWxsYSA8aWFuY2hpNzRAb3V0bG9vay5jb20+XG4gKlxuICogVGhpcyBzb2Z0d2FyZSBpcyByZWxlYXNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuXG4gKiBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL01JVFxuICovXG5cbmV4cG9ydCBpbnRlcmZhY2UgSUNvbnRleHREZWYge1xuICBbaWRlbnRpZmllcjogc3RyaW5nXTogYW55O1xufVxuXG5cbi8qKlxuICogSGVscGVyIGNsYXNzIHRvIGhvbGQgY29udGV4dCBmb3IgZXhwcmVzc2lvbiBldmFsdWF0aW9uLlxuICogSXQgb25seSBnaXZlcyBhICd0eXBlJyB0byBhIHBsYWluIG9iamVjdC5cbiAqIEl0IGhhcyBzdGF0aWMgbWV0aG9kcyB0byBtYW5hZ2UgaW5oZXJpdGFuY2UgYW5kIGFkZGluZyBwcm9wZXJ0aWVzIGFuZCBidWlsdGluc1xuICovXG5leHBvcnQgY2xhc3MgQ29udGV4dCB7XG5cbiAgLyoqIEhlbHBlciBkZWZpbml0aW9uIG9mIGJ1aWx0LWluIG9iamVjdHMgKi9cbiAgc3RhdGljIGJ1aWx0aW5zRGVmOiBJQ29udGV4dERlZiA9IHtcblxuICAgIC8vIEJ1aWx0aW4gZnVuY3Rpb25zOlxuICAgIHBhcnNlRmxvYXQ6IHBhcnNlRmxvYXQsXG4gICAgcGFyc2VJbnQ6IHBhcnNlSW50LFxuICAgIGlzTmFOOiBpc05hTixcbiAgICBpc0Zpbml0ZTogaXNGaW5pdGUsXG5cbiAgICAvLyBGdW5kYW1lbnRhbCBvYmplY3RzOlxuICAgIE51bWJlcjogTnVtYmVyLFxuICAgIE1hdGg6IE1hdGgsXG4gICAgRGF0ZTogRGF0ZSxcbiAgICBBcnJheTogQXJyYXksXG4gICAgSlNPTjogSlNPTixcbiAgICBPYmplY3Q6IE9iamVjdCxcblxuICB9O1xuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgQ29udGV4dCBvYmplY3QsIGluaGVyaXRpbmcgZnJvbSBhbiBvcHRpb25hbCBgcGFyZW50YCBhbmQgYWRkaW5nIGN1c3RvbSBwcm9wZXJ0aWVzXG4gICAqIGFuZCBvcHRpb25hbGx5IGJ1aWx0aW4gb2JqZWN0c1xuICAgKiBAcGFyYW0gcGFyZW50XG4gICAqIEBwYXJhbSBwdWJsaWNQcm9wc1xuICAgKiBAcGFyYW0gcmVhZG9ubHlQcm9wc1xuICAgKiBAcGFyYW0gaGlkZGVuUHJvcHNcbiAgICogQHBhcmFtIGJ1aWx0aW5zIEJvb2xlYW4uIElmIHRydWUgYWRkcyBidWlsdGlub2JqZWN0cyBhcyBwdWJsaWMgcHJvcGVydGllcyxcbiAgICovXG4gIHN0YXRpYyBjcmVhdGUocGFyZW50PzogQ29udGV4dCwgcHVibGljUHJvcHM/OiBJQ29udGV4dERlZixcbiAgICByZWFkb25seVByb3BzPzogSUNvbnRleHREZWYsXG4gICAgaGlkZGVuUHJvcHM/OiBJQ29udGV4dERlZixcbiAgICBidWlsdGlucz86IGJvb2xlYW4pOiBDb250ZXh0IHtcblxuICAgIGNvbnN0IGNvbnRleHQ6IENvbnRleHQgPSBwYXJlbnQgPyBPYmplY3QuY3JlYXRlKHBhcmVudCkgOiBuZXcgQ29udGV4dCgpO1xuXG4gICAgaWYgKGJ1aWx0aW5zKSBDb250ZXh0LmRlZmluZVJlYWRvbmx5KGNvbnRleHQsIENvbnRleHQuYnVpbHRpbnNEZWYpO1xuICAgIGlmIChwdWJsaWNQcm9wcykgT2JqZWN0LmFzc2lnbihjb250ZXh0LCBwdWJsaWNQcm9wcyk7XG4gICAgaWYgKHJlYWRvbmx5UHJvcHMpIENvbnRleHQuZGVmaW5lUmVhZG9ubHkoY29udGV4dCwgcmVhZG9ubHlQcm9wcyk7XG4gICAgaWYgKGhpZGRlblByb3BzKSBDb250ZXh0LmRlZmluZUhpZGRlbihjb250ZXh0LCBoaWRkZW5Qcm9wcyk7XG5cbiAgICByZXR1cm4gY29udGV4dDtcbiAgfVxuXG4gIC8qKiBBZGRzIHJlYWRvbmx5IHByb3BlcnRpZXMgdG8gYSBDb250ZXh0ICovXG4gIHN0YXRpYyBkZWZpbmVSZWFkb25seShjb250ZXh0OiBDb250ZXh0LCBQcm9wczogSUNvbnRleHREZWYpIHtcblxuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpmb3JpblxuICAgIGZvciAoY29uc3QgcHJvcCBpbiBQcm9wcykge1xuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGNvbnRleHQsIHByb3AsIHtcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgd3JpdGFibGU6IGZhbHNlLFxuICAgICAgICB2YWx1ZTogUHJvcHNbcHJvcF1cbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHJldHVybiBjb250ZXh0O1xuICB9XG5cbiAgLyoqIEFkZHMgaGlkZGVuIChub24gZW51bWVyYWJsZSkgcHJvcGVydGllcyB0byBhIENvbnRleHQgKi9cbiAgc3RhdGljIGRlZmluZUhpZGRlbihjb250ZXh0OiBDb250ZXh0LCBoaWRkZW5Qcm9wczogSUNvbnRleHREZWYpIHtcblxuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpmb3JpblxuICAgIGZvciAoY29uc3QgcHJvcCBpbiBoaWRkZW5Qcm9wcykge1xuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGNvbnRleHQsIHByb3AsIHtcbiAgICAgICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgICAgIHdyaXRhYmxlOiB0cnVlLFxuICAgICAgICB2YWx1ZTogaGlkZGVuUHJvcHNbcHJvcF1cbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHJldHVybiBjb250ZXh0O1xuICB9XG5cbiAgLyoqIGFkZHMgcHVibGljIHByb3BlcnRpZXMgb25seSBpZiB0aGV5IGRvbid0IGV4aXN0IGluIHBhcmVudCAqL1xuICBzdGF0aWMgZGVmaW5lV2Vhayhjb250ZXh0OiBDb250ZXh0LCBwcm9wczogSUNvbnRleHREZWYpIHtcblxuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpmb3JpblxuICAgIGZvciAoY29uc3QgcHJvcCBpbiBwcm9wcykge1xuICAgICAgaWYgKHByb3AgaW4gY29udGV4dCkgY29udGludWU7XG4gICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoY29udGV4dCwgcHJvcCwge1xuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICAgICAgdmFsdWU6IHByb3BzW3Byb3BdXG4gICAgICB9KTtcbiAgICB9XG4gIH1cbn1cbiIsIi8qISAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG5Db3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cclxuTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTsgeW91IG1heSBub3QgdXNlXHJcbnRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlXHJcbkxpY2Vuc2UgYXQgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXHJcblxyXG5USElTIENPREUgSVMgUFJPVklERUQgT04gQU4gKkFTIElTKiBCQVNJUywgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZXHJcbktJTkQsIEVJVEhFUiBFWFBSRVNTIE9SIElNUExJRUQsIElOQ0xVRElORyBXSVRIT1VUIExJTUlUQVRJT04gQU5ZIElNUExJRURcclxuV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIFRJVExFLCBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSxcclxuTUVSQ0hBTlRBQkxJVFkgT1IgTk9OLUlORlJJTkdFTUVOVC5cclxuXHJcblNlZSB0aGUgQXBhY2hlIFZlcnNpb24gMi4wIExpY2Vuc2UgZm9yIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9uc1xyXG5hbmQgbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXHJcbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqICovXHJcbi8qIGdsb2JhbCBSZWZsZWN0LCBQcm9taXNlICovXHJcblxyXG52YXIgZXh0ZW5kU3RhdGljcyA9IGZ1bmN0aW9uKGQsIGIpIHtcclxuICAgIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcclxuICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XHJcbiAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07IH07XHJcbiAgICByZXR1cm4gZXh0ZW5kU3RhdGljcyhkLCBiKTtcclxufTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2V4dGVuZHMoZCwgYikge1xyXG4gICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcclxuICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxyXG4gICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xyXG59XHJcblxyXG5leHBvcnQgdmFyIF9fYXNzaWduID0gZnVuY3Rpb24oKSB7XHJcbiAgICBfX2Fzc2lnbiA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24gX19hc3NpZ24odCkge1xyXG4gICAgICAgIGZvciAodmFyIHMsIGkgPSAxLCBuID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IG47IGkrKykge1xyXG4gICAgICAgICAgICBzID0gYXJndW1lbnRzW2ldO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkpIHRbcF0gPSBzW3BdO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdDtcclxuICAgIH1cclxuICAgIHJldHVybiBfX2Fzc2lnbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19yZXN0KHMsIGUpIHtcclxuICAgIHZhciB0ID0ge307XHJcbiAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkgJiYgZS5pbmRleE9mKHApIDwgMClcclxuICAgICAgICB0W3BdID0gc1twXTtcclxuICAgIGlmIChzICE9IG51bGwgJiYgdHlwZW9mIE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMgPT09IFwiZnVuY3Rpb25cIilcclxuICAgICAgICBmb3IgKHZhciBpID0gMCwgcCA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMocyk7IGkgPCBwLmxlbmd0aDsgaSsrKSBpZiAoZS5pbmRleE9mKHBbaV0pIDwgMClcclxuICAgICAgICAgICAgdFtwW2ldXSA9IHNbcFtpXV07XHJcbiAgICByZXR1cm4gdDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZGVjb3JhdGUoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpIHtcclxuICAgIHZhciBjID0gYXJndW1lbnRzLmxlbmd0aCwgciA9IGMgPCAzID8gdGFyZ2V0IDogZGVzYyA9PT0gbnVsbCA/IGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHRhcmdldCwga2V5KSA6IGRlc2MsIGQ7XHJcbiAgICBpZiAodHlwZW9mIFJlZmxlY3QgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIFJlZmxlY3QuZGVjb3JhdGUgPT09IFwiZnVuY3Rpb25cIikgciA9IFJlZmxlY3QuZGVjb3JhdGUoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpO1xyXG4gICAgZWxzZSBmb3IgKHZhciBpID0gZGVjb3JhdG9ycy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkgaWYgKGQgPSBkZWNvcmF0b3JzW2ldKSByID0gKGMgPCAzID8gZChyKSA6IGMgPiAzID8gZCh0YXJnZXQsIGtleSwgcikgOiBkKHRhcmdldCwga2V5KSkgfHwgcjtcclxuICAgIHJldHVybiBjID4gMyAmJiByICYmIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGtleSwgciksIHI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3BhcmFtKHBhcmFtSW5kZXgsIGRlY29yYXRvcikge1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uICh0YXJnZXQsIGtleSkgeyBkZWNvcmF0b3IodGFyZ2V0LCBrZXksIHBhcmFtSW5kZXgpOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX21ldGFkYXRhKG1ldGFkYXRhS2V5LCBtZXRhZGF0YVZhbHVlKSB7XHJcbiAgICBpZiAodHlwZW9mIFJlZmxlY3QgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIFJlZmxlY3QubWV0YWRhdGEgPT09IFwiZnVuY3Rpb25cIikgcmV0dXJuIFJlZmxlY3QubWV0YWRhdGEobWV0YWRhdGFLZXksIG1ldGFkYXRhVmFsdWUpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hd2FpdGVyKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xyXG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZShyZXN1bHQudmFsdWUpOyB9KS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XHJcbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xyXG4gICAgfSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2dlbmVyYXRvcih0aGlzQXJnLCBib2R5KSB7XHJcbiAgICB2YXIgXyA9IHsgbGFiZWw6IDAsIHNlbnQ6IGZ1bmN0aW9uKCkgeyBpZiAodFswXSAmIDEpIHRocm93IHRbMV07IHJldHVybiB0WzFdOyB9LCB0cnlzOiBbXSwgb3BzOiBbXSB9LCBmLCB5LCB0LCBnO1xyXG4gICAgcmV0dXJuIGcgPSB7IG5leHQ6IHZlcmIoMCksIFwidGhyb3dcIjogdmVyYigxKSwgXCJyZXR1cm5cIjogdmVyYigyKSB9LCB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgKGdbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpczsgfSksIGc7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgcmV0dXJuIGZ1bmN0aW9uICh2KSB7IHJldHVybiBzdGVwKFtuLCB2XSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHN0ZXAob3ApIHtcclxuICAgICAgICBpZiAoZikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkdlbmVyYXRvciBpcyBhbHJlYWR5IGV4ZWN1dGluZy5cIik7XHJcbiAgICAgICAgd2hpbGUgKF8pIHRyeSB7XHJcbiAgICAgICAgICAgIGlmIChmID0gMSwgeSAmJiAodCA9IG9wWzBdICYgMiA/IHlbXCJyZXR1cm5cIl0gOiBvcFswXSA/IHlbXCJ0aHJvd1wiXSB8fCAoKHQgPSB5W1wicmV0dXJuXCJdKSAmJiB0LmNhbGwoeSksIDApIDogeS5uZXh0KSAmJiAhKHQgPSB0LmNhbGwoeSwgb3BbMV0pKS5kb25lKSByZXR1cm4gdDtcclxuICAgICAgICAgICAgaWYgKHkgPSAwLCB0KSBvcCA9IFtvcFswXSAmIDIsIHQudmFsdWVdO1xyXG4gICAgICAgICAgICBzd2l0Y2ggKG9wWzBdKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDA6IGNhc2UgMTogdCA9IG9wOyBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgNDogXy5sYWJlbCsrOyByZXR1cm4geyB2YWx1ZTogb3BbMV0sIGRvbmU6IGZhbHNlIH07XHJcbiAgICAgICAgICAgICAgICBjYXNlIDU6IF8ubGFiZWwrKzsgeSA9IG9wWzFdOyBvcCA9IFswXTsgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDc6IG9wID0gXy5vcHMucG9wKCk7IF8udHJ5cy5wb3AoKTsgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgIGlmICghKHQgPSBfLnRyeXMsIHQgPSB0Lmxlbmd0aCA+IDAgJiYgdFt0Lmxlbmd0aCAtIDFdKSAmJiAob3BbMF0gPT09IDYgfHwgb3BbMF0gPT09IDIpKSB7IF8gPSAwOyBjb250aW51ZTsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gMyAmJiAoIXQgfHwgKG9wWzFdID4gdFswXSAmJiBvcFsxXSA8IHRbM10pKSkgeyBfLmxhYmVsID0gb3BbMV07IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSA2ICYmIF8ubGFiZWwgPCB0WzFdKSB7IF8ubGFiZWwgPSB0WzFdOyB0ID0gb3A7IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHQgJiYgXy5sYWJlbCA8IHRbMl0pIHsgXy5sYWJlbCA9IHRbMl07IF8ub3BzLnB1c2gob3ApOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0WzJdKSBfLm9wcy5wb3AoKTtcclxuICAgICAgICAgICAgICAgICAgICBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG9wID0gYm9keS5jYWxsKHRoaXNBcmcsIF8pO1xyXG4gICAgICAgIH0gY2F0Y2ggKGUpIHsgb3AgPSBbNiwgZV07IHkgPSAwOyB9IGZpbmFsbHkgeyBmID0gdCA9IDA7IH1cclxuICAgICAgICBpZiAob3BbMF0gJiA1KSB0aHJvdyBvcFsxXTsgcmV0dXJuIHsgdmFsdWU6IG9wWzBdID8gb3BbMV0gOiB2b2lkIDAsIGRvbmU6IHRydWUgfTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZXhwb3J0U3RhcihtLCBleHBvcnRzKSB7XHJcbiAgICBmb3IgKHZhciBwIGluIG0pIGlmICghZXhwb3J0cy5oYXNPd25Qcm9wZXJ0eShwKSkgZXhwb3J0c1twXSA9IG1bcF07XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3ZhbHVlcyhvKSB7XHJcbiAgICB2YXIgbSA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvW1N5bWJvbC5pdGVyYXRvcl0sIGkgPSAwO1xyXG4gICAgaWYgKG0pIHJldHVybiBtLmNhbGwobyk7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIG5leHQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKG8gJiYgaSA+PSBvLmxlbmd0aCkgbyA9IHZvaWQgMDtcclxuICAgICAgICAgICAgcmV0dXJuIHsgdmFsdWU6IG8gJiYgb1tpKytdLCBkb25lOiAhbyB9O1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3JlYWQobywgbikge1xyXG4gICAgdmFyIG0gPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb1tTeW1ib2wuaXRlcmF0b3JdO1xyXG4gICAgaWYgKCFtKSByZXR1cm4gbztcclxuICAgIHZhciBpID0gbS5jYWxsKG8pLCByLCBhciA9IFtdLCBlO1xyXG4gICAgdHJ5IHtcclxuICAgICAgICB3aGlsZSAoKG4gPT09IHZvaWQgMCB8fCBuLS0gPiAwKSAmJiAhKHIgPSBpLm5leHQoKSkuZG9uZSkgYXIucHVzaChyLnZhbHVlKTtcclxuICAgIH1cclxuICAgIGNhdGNoIChlcnJvcikgeyBlID0geyBlcnJvcjogZXJyb3IgfTsgfVxyXG4gICAgZmluYWxseSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgaWYgKHIgJiYgIXIuZG9uZSAmJiAobSA9IGlbXCJyZXR1cm5cIl0pKSBtLmNhbGwoaSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZpbmFsbHkgeyBpZiAoZSkgdGhyb3cgZS5lcnJvcjsgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGFyO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19zcHJlYWQoKSB7XHJcbiAgICBmb3IgKHZhciBhciA9IFtdLCBpID0gMDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKylcclxuICAgICAgICBhciA9IGFyLmNvbmNhdChfX3JlYWQoYXJndW1lbnRzW2ldKSk7XHJcbiAgICByZXR1cm4gYXI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2F3YWl0KHYpIHtcclxuICAgIHJldHVybiB0aGlzIGluc3RhbmNlb2YgX19hd2FpdCA/ICh0aGlzLnYgPSB2LCB0aGlzKSA6IG5ldyBfX2F3YWl0KHYpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY0dlbmVyYXRvcih0aGlzQXJnLCBfYXJndW1lbnRzLCBnZW5lcmF0b3IpIHtcclxuICAgIGlmICghU3ltYm9sLmFzeW5jSXRlcmF0b3IpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTeW1ib2wuYXN5bmNJdGVyYXRvciBpcyBub3QgZGVmaW5lZC5cIik7XHJcbiAgICB2YXIgZyA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSwgaSwgcSA9IFtdO1xyXG4gICAgcmV0dXJuIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiKSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuYXN5bmNJdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IGlmIChnW25dKSBpW25dID0gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChhLCBiKSB7IHEucHVzaChbbiwgdiwgYSwgYl0pID4gMSB8fCByZXN1bWUobiwgdik7IH0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiByZXN1bWUobiwgdikgeyB0cnkgeyBzdGVwKGdbbl0odikpOyB9IGNhdGNoIChlKSB7IHNldHRsZShxWzBdWzNdLCBlKTsgfSB9XHJcbiAgICBmdW5jdGlvbiBzdGVwKHIpIHsgci52YWx1ZSBpbnN0YW5jZW9mIF9fYXdhaXQgPyBQcm9taXNlLnJlc29sdmUoci52YWx1ZS52KS50aGVuKGZ1bGZpbGwsIHJlamVjdCkgOiBzZXR0bGUocVswXVsyXSwgcik7IH1cclxuICAgIGZ1bmN0aW9uIGZ1bGZpbGwodmFsdWUpIHsgcmVzdW1lKFwibmV4dFwiLCB2YWx1ZSk7IH1cclxuICAgIGZ1bmN0aW9uIHJlamVjdCh2YWx1ZSkgeyByZXN1bWUoXCJ0aHJvd1wiLCB2YWx1ZSk7IH1cclxuICAgIGZ1bmN0aW9uIHNldHRsZShmLCB2KSB7IGlmIChmKHYpLCBxLnNoaWZ0KCksIHEubGVuZ3RoKSByZXN1bWUocVswXVswXSwgcVswXVsxXSk7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNEZWxlZ2F0b3Iobykge1xyXG4gICAgdmFyIGksIHA7XHJcbiAgICByZXR1cm4gaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIsIGZ1bmN0aW9uIChlKSB7IHRocm93IGU7IH0pLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuLCBmKSB7IGlbbl0gPSBvW25dID8gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIChwID0gIXApID8geyB2YWx1ZTogX19hd2FpdChvW25dKHYpKSwgZG9uZTogbiA9PT0gXCJyZXR1cm5cIiB9IDogZiA/IGYodikgOiB2OyB9IDogZjsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY1ZhbHVlcyhvKSB7XHJcbiAgICBpZiAoIVN5bWJvbC5hc3luY0l0ZXJhdG9yKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3ltYm9sLmFzeW5jSXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xyXG4gICAgdmFyIG0gPSBvW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSwgaTtcclxuICAgIHJldHVybiBtID8gbS5jYWxsKG8pIDogKG8gPSB0eXBlb2YgX192YWx1ZXMgPT09IFwiZnVuY3Rpb25cIiA/IF9fdmFsdWVzKG8pIDogb1tTeW1ib2wuaXRlcmF0b3JdKCksIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiKSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuYXN5bmNJdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpKTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyBpW25dID0gb1tuXSAmJiBmdW5jdGlvbiAodikgeyByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkgeyB2ID0gb1tuXSh2KSwgc2V0dGxlKHJlc29sdmUsIHJlamVjdCwgdi5kb25lLCB2LnZhbHVlKTsgfSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHNldHRsZShyZXNvbHZlLCByZWplY3QsIGQsIHYpIHsgUHJvbWlzZS5yZXNvbHZlKHYpLnRoZW4oZnVuY3Rpb24odikgeyByZXNvbHZlKHsgdmFsdWU6IHYsIGRvbmU6IGQgfSk7IH0sIHJlamVjdCk7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fbWFrZVRlbXBsYXRlT2JqZWN0KGNvb2tlZCwgcmF3KSB7XHJcbiAgICBpZiAoT2JqZWN0LmRlZmluZVByb3BlcnR5KSB7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjb29rZWQsIFwicmF3XCIsIHsgdmFsdWU6IHJhdyB9KTsgfSBlbHNlIHsgY29va2VkLnJhdyA9IHJhdzsgfVxyXG4gICAgcmV0dXJuIGNvb2tlZDtcclxufTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2ltcG9ydFN0YXIobW9kKSB7XHJcbiAgICBpZiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSByZXR1cm4gbW9kO1xyXG4gICAgdmFyIHJlc3VsdCA9IHt9O1xyXG4gICAgaWYgKG1vZCAhPSBudWxsKSBmb3IgKHZhciBrIGluIG1vZCkgaWYgKE9iamVjdC5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1vZCwgaykpIHJlc3VsdFtrXSA9IG1vZFtrXTtcclxuICAgIHJlc3VsdC5kZWZhdWx0ID0gbW9kO1xyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9faW1wb3J0RGVmYXVsdChtb2QpIHtcclxuICAgIHJldHVybiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSA/IG1vZCA6IHsgZGVmYXVsdDogbW9kIH07XHJcbn1cclxuIiwiXG4vKipcbiAqIENvcHlyaWdodCAoYykgMjAxOCBBZHJpYW4gUGFuZWxsYSA8aWFuY2hpNzRAb3V0bG9vay5jb20+XG4gKlxuICogVGhpcyBzb2Z0d2FyZSBpcyByZWxlYXNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuXG4gKiBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL01JVFxuICovXG5cbmltcG9ydCB7IE9uRGVzdHJveSwgQ2hhbmdlRGV0ZWN0b3JSZWYsIElucHV0LCBPbkNoYW5nZXMsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgb2YsIFN1YnNjcmlwdGlvbiwgY29tYmluZUxhdGVzdCwgaXNPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyB0YXAsIG1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IElXaWRnZXREZWYgfSBmcm9tICcuL3dpZGdldC5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgV2lkZ2V0RGlyZWN0aXZlIH0gZnJvbSAnLi93aWRnZXQuZGlyZWN0aXZlJztcbmltcG9ydCB7IENvbnRleHQgfSBmcm9tICcuL2NvbnRleHQnO1xuaW1wb3J0IHsgRXhwcmVzc2lvbnMgfSBmcm9tICcuL2V4cHJlc3Npb25zJztcblxuZXhwb3J0IGludGVyZmFjZSBJT3B0aW9uRGVmIHsgW3Byb3A6IHN0cmluZ106IGFueTsgfVxuXG4vKipcbiAqIEJhc2UgY2xhc3MgZm9yIGFsbCBkeW5hbWljIHdpZGdldCBlbGVtZW50c1xuICovXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgQWJzdHJhY3RXaWRnZXQgaW1wbGVtZW50cyBPbkRlc3Ryb3ksIE9uQ2hhbmdlcywgT25Jbml0IHtcblxuICAvKiogQ29uZmlndXJhdGlvbiBvZiB0aGUgd2lkZ2V0ICovXG4gIEBJbnB1dCgpIHdpZGdldERlZjogSVdpZGdldERlZjtcbiAgQElucHV0KCkgY29udGV4dDogQ29udGV4dDtcblxuICAvKiogU3RyaW5nIGlkZW50aWZpbmcgdGhlICd0eXBlJyBvZiB0aGUgd2lkZ2V0ICovXG4gIHR5cGU6IHN0cmluZztcbiAgLyoqIENvbnRleHQgdG8gdXNlIGZvciBldmFsdWF0aW9ucyBhdCB0aGlzIGxldmVsICovXG5cbiAgLyoqIFdpZGdldCBzcGVjaWZpYyBvcHRpb25zIGFsbCBjb252ZXJ0ZWQgdG8gb2JzZXJ2YWJsZXMsIHRvIHVuaWZ5IGJldHdlZW4gKmV4cHJlc3Npb24qIGFuZFxuICAgKiAqY29uc3RhbnQqIG5vdGF0aW9uIGluIHRoZSBwcm9wZXJ0aWVzIGRlZmluaXRpb24uXG4gICAqIEVhY2ggYmluZGluZyB0aGVuIGF1dG8gdXBkYXRlcyB0aGUgY29ycmVzcG9uZGluZyBwcm9wZXJ0eSBpbiB0aGUgZGVyaXZlZCB3aWRnZXQuXG4gICAqL1xuICBiaW5kaW5nczogeyBbcHJvcDogc3RyaW5nXTogT2JzZXJ2YWJsZTxhbnk+IH0gPSB7fTtcbiAgLyoqIFRoZSBpbnB1dCBjb25maWd1cmF0aW9uIG9mIHRoaXMgb2JqZWN0ICovXG5cbiAgY29udGVudDogSVdpZGdldERlZltdO1xuXG4gIGVsZW1lbnQ6IFdpZGdldERpcmVjdGl2ZTtcblxuICBzZXQgYWRkU3Vic2NyaXB0aW9uKHN1YnM6IFN1YnNjcmlwdGlvbikge1xuICAgIHRoaXMuX3N1YnNjcmlwdGlvbnMucHVzaChzdWJzKTtcbiAgfVxuXG4gIHByaXZhdGUgX3N1YnNjcmlwdGlvbnM6IFN1YnNjcmlwdGlvbltdID0gW107XG5cblxuICBjb25zdHJ1Y3Rvcihwcm90ZWN0ZWQgX2NkcjogQ2hhbmdlRGV0ZWN0b3JSZWYsIHByb3RlY3RlZCBfZXhwcjogRXhwcmVzc2lvbnMpIHtcbiAgfVxuXG4gIC8qKiBJbml0aWFsaWNlcyB0aGUgd2lkZ2V0IGZyb20gYSBqc29uIGRlZmluaXRpb24gKi9cbiAgc2V0dXAoZWxlbWVudDogV2lkZ2V0RGlyZWN0aXZlLCBkZWY6IElXaWRnZXREZWYsIGNvbnRleHQ6IENvbnRleHQpIHtcbiAgICBkZWYgPSBkZWYgfHwgeyB0eXBlOiAnbm9uZScgfTtcbiAgICBkZWYub3B0aW9ucyA9IGRlZi5vcHRpb25zIHx8IHt9O1xuXG4gICAgdGhpcy50eXBlID0gZGVmLnR5cGUgfHwgJ25vbmUnO1xuICAgIHRoaXMuZWxlbWVudCA9IGVsZW1lbnQ7XG5cbiAgICBjb25zb2xlLmxvZyhgV2lkZ2V0IHNldHVwICR7dGhpcy50eXBlfWAsIHRoaXMpO1xuXG4gICAgdGhpcy5jb250ZXh0ID0gY29udGV4dDtcblxuICAgIHRoaXMud2lkZ2V0RGVmID0gZGVmID0gdGhpcy5keW5PblNldHVwKGRlZikgfHwgZGVmO1xuXG4gICAgdGhpcy5iaW5kaW5ncyA9IHBhcnNlRGVmT2JqZWN0KGRlZi5vcHRpb25zLCB0aGlzLmNvbnRleHQsIHRydWUsIHRoaXMuX2V4cHIpO1xuXG4gICAgdGhpcy5jb250ZW50ID0gQXJyYXkuaXNBcnJheShkZWYuY29udGVudCkgPyBkZWYuY29udGVudCA6IHR5cGVvZiBkZWYuY29udGVudCA9PT0gJ29iamVjdCcgPyBbZGVmLmNvbnRlbnRdIDogW107XG5cbiAgICB0aGlzLnN1YnNjcmliZU9wdGlvbnMoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBIZWxwZXIgZnVuY3Rpb24gdG8gYWRkIGEgYG1hcGAgcGlwZSB0byB0aGUgY29ycmVzcG9uZGluZyBpbnB1dCBvYnNlcnZhYmxlXG4gICAqL1xuICBtYXAob3B0aW9uOiBzdHJpbmcsIGNhbGxiYWNrOiAodjogYW55KSA9PiBhbnkpIHtcbiAgICBjb25zdCBvcHQ6IE9ic2VydmFibGU8YW55PiA9IHRoaXMuYmluZGluZ3Nbb3B0aW9uXTtcbiAgICBpZiAob3B0KSB0aGlzLmJpbmRpbmdzW29wdGlvbl0gPSBvcHQucGlwZShtYXAoY2FsbGJhY2spKTtcblxuICB9XG4gIC8qKlxuICAgKiBIb29rIHRvIGN1c3RvbWl6ZSB0aGUgb2JzZXJ2YWJsZSBiaW5kaW5ncyBiZWZvciBzdWJzY3JpYmluZy5cbiAgICogVGlwaWNhbGx5IHVzaW5nIHRoZSBgdGhpcy5tYXAoKWAgZnVuY3Rpb24gdG8gYWRkIHByb2Nlc3NpbmcgdG8gc3BlY2lmaWMgb3B0aW9uc1xuICAgKi9cbiAgZHluT25CZWZvcmVCaW5kKCkgeyB9XG5cbiAgZHluT25BZnRlckJpbmQoKSB7IH1cblxuICAvKiogSG9vayB0byBjdXN0b21pemUgd2lkZ2V0IGRlZmluaXRpb24gYmVmb3JlIHByb2Nlc2luZyBpdCAqL1xuICBkeW5PblNldHVwKGRlZjogSVdpZGdldERlZikgeyByZXR1cm4gZGVmOyB9XG5cbiAgc3Vic2NyaWJlT3B0aW9ucygpIHtcbiAgICBjb25zdCBvYnNlcnZhYmxlcyA9IFtdO1xuXG4gICAgLy8gY2FsbCBob29rIGZvciBjb2ZpZ3VyYXRpb24gb2Ygb3B0aW9ucyBiZWZvcmUgdXBkYXRpbmcgdGhlIGJvdW5kIHZhbHVlXG4gICAgdGhpcy5keW5PbkJlZm9yZUJpbmQoKTtcblxuICAgIGZvciAoY29uc3QgcHJvcCBpbiB0aGlzLmJpbmRpbmdzKSAvLyB0c2xpbnQ6ZGlzYWJsZS1saW5lOmZvcmluXG4gICAgICB0aGlzLmJpbmRpbmdzW3Byb3BdID0gdGhpcy5iaW5kaW5nc1twcm9wXS5waXBlKHRhcChyZXMgPT4gdGhpc1twcm9wXSA9IHJlcykpO1xuXG4gICAgLy8gY2FsbCBob29rIGFmdGVyIHVwZGF0aW5nIHRoZSBib3VuZCB2YWx1ZVxuICAgIHRoaXMuZHluT25BZnRlckJpbmQoKTtcblxuICAgIGZvciAoY29uc3QgcHJvcCBpbiB0aGlzLmJpbmRpbmdzKSAvLyB0c2xpbnQ6ZGlzYWJsZS1saW5lOmZvcmluXG4gICAgICBvYnNlcnZhYmxlcy5wdXNoKHRoaXMuYmluZGluZ3NbcHJvcF0pO1xuXG4gICAgdGhpcy5hZGRTdWJzY3JpcHRpb24gPSBjb21iaW5lTGF0ZXN0KG9ic2VydmFibGVzKS5zdWJzY3JpYmUoKCkgPT4gdGhpcy5fY2RyLm1hcmtGb3JDaGVjaygpKTtcblxuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5fdW5zdWJzY3JpYmUoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBPbkNoYW5nZXMgaXMgbmV2ZXIgY2FsbGVkIG9uIGR5bmFtaWMgd2lkZ2V0IGluc3RhbnRpYXRpb25cbiAgICogSXQgaXMgaW50ZW5kZWQgdG8gcHJvdmlkZSB0aGUgc2FtZSBpbnRlcmZhY2UgaXMgdGhlIHdpZGdldCBpcyB1c2VkIGRlY2xhcmF0aXZlIGluIGEgdGVtcGxhdGVcbiAgICogaW5zdGVhZCBvZiBkeW5hbWljYWxseVxuICAgKi9cbiAgbmdPbkNoYW5nZXMoKSB7XG4gICAgY29uc29sZS5sb2coYFdpZGdldCBPbkNoYW5nZXMgJHt0aGlzLnR5cGV9YCwgdGhpcyk7XG4gICAgdGhpcy5fdW5zdWJzY3JpYmUoKTtcbiAgICB0aGlzLnNldHVwKG51bGwsIHRoaXMud2lkZ2V0RGVmLCB0aGlzLmNvbnRleHQpO1xuICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgY29uc29sZS5sb2coYFdpZGdldCBPbkluaXQgJHt0aGlzLnR5cGV9YCwgdGhpcyk7XG4gIH1cblxuICBwcml2YXRlIF91bnN1YnNjcmliZSgpIHtcbiAgICBmb3IgKGNvbnN0IHN1YnMgb2YgdGhpcy5fc3Vic2NyaXB0aW9ucykgc3Vicy51bnN1YnNjcmliZSgpO1xuICB9XG5cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlRGVmT2JqZWN0KG9iakRlZjogSU9wdGlvbkRlZiwgY29udGV4dDogQ29udGV4dCwgYXNPYnNlcnZhYmxlOiBib29sZWFuLCBleHByOiBFeHByZXNzaW9ucykge1xuXG4gIGNvbnN0IHJlc3VsdDogSU9wdGlvbkRlZiA9IHt9O1xuXG4gIGlmICghb2JqRGVmKSByZXR1cm4gbnVsbDtcblxuICBmb3IgKGNvbnN0IHByb3AgaW4gb2JqRGVmKSB7XG5cbiAgICBpZiAocHJvcC5jaGFyQXQocHJvcC5sZW5ndGggLSAxKSA9PT0gJz0nKSB7XG4gICAgICBpZiAodHlwZW9mIG9iakRlZltwcm9wXSAhPT0gJ3N0cmluZycpIHRocm93IG5ldyBTeW50YXhFcnJvcignQmluZGluZyBvcHRpb25zIG11c3QgYmUgXCJzdHJpbmdcIiBJZXhwcmVzc2lvbnMnKTtcbiAgICAgIHJlc3VsdFtwcm9wLnNsaWNlKDAsIHByb3AubGVuZ3RoIC0gMSldID0gZXhwci5ldmFsKG9iakRlZltwcm9wXSwgY29udGV4dCwgYXNPYnNlcnZhYmxlKTtcblxuICAgIH0gZWxzZSByZXN1bHRbcHJvcF0gPSBhc09ic2VydmFibGUgJiYgIWlzT2JzZXJ2YWJsZShvYmpEZWZbcHJvcF0pID8gb2Yob2JqRGVmW3Byb3BdKSA6IG9iakRlZltwcm9wXTtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuIiwiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTggQWRyaWFuIFBhbmVsbGEgPGlhbmNoaTc0QG91dGxvb2suY29tPlxuICpcbiAqIFRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLlxuICogaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9NSVRcbiAqL1xuXG5pbXBvcnQge1xuICBSZWFjdGl2ZUV2YWwsIFN0YXRpY0V2YWwsIFBhcnNlciwgZXM1UnVsZXMsXG4gIElkZW50aWZpZXJSdWxlLCBCaW5hcnlPcGVyYXRvclJ1bGUsIE1FTUJFUl9FWFBcbn0gZnJvbSAnZXNwcmVzc2lvbic7XG5pbXBvcnQgeyBpc09ic2VydmFibGUsIG9mLCBFTVBUWSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgQ29udGV4dCB9IGZyb20gJy4vY29udGV4dCc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgSUFzdCB7XG4gIHR5cGU6IHN0cmluZztcbiAgW3Byb3A6IHN0cmluZ106IGFueTtcbn1cblxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIEV4cHJlc3Npb25zIHtcblxuICBhYnN0cmFjdCBwYXJzZUtleShleHByZXNzaW9uOiBzdHJpbmcpOiBJQXN0O1xuICBhYnN0cmFjdCBwYXJzZShleHByZXNzaW9uOiBzdHJpbmcpOiBJQXN0O1xuICAvKipcbiAgICogRXZhbHVhdGVzIGFuIGV4cHJlc3Npb24gaW4gdGhlIGdpdmVuIGNvbnRleHQuXG4gICAqIEl0IHVzZXMgdGhlIGdlbmVyYWwgcGFyc2VyLlxuICAgKlxuICAgKiBAcGFyYW0gZXhwcmVzc2lvbiBTdHJpbmcgZXhwcmVzc2lvblxuICAgKiBAcGFyYW0gY29udGV4dFxuICAgKiBAcGFyYW0gYXNPYnNlcnZhYmxlIEFsd2F5cyBjb252ZXJ0cyByZXN1bHQgdG8gb2JzZXJ2YWJsZVxuICAgKi9cbiAgZXZhbChleHByZXNzaW9uOiBzdHJpbmcsIGNvbnRleHQ6IENvbnRleHQsIGFzT2JzZXJ2YWJsZTogYm9vbGVhbikge1xuICAgIGNvbnN0IGFzdCA9IHRoaXMucGFyc2UoZXhwcmVzc2lvbik7XG5cbiAgICByZXR1cm4gdGhpcy5ldmFsdWF0ZShhc3QsIGNvbnRleHQsIGFzT2JzZXJ2YWJsZSk7XG4gIH1cbiAgYWJzdHJhY3QgZXZhbHVhdGUoYXN0OiBJQXN0LCBjb250ZXh0OiBDb250ZXh0LCBhc09ic2VydmFibGU6IGJvb2xlYW4pOiBhbnk7XG4gIGFic3RyYWN0IGx2YWx1ZShleHByZXNzaW9uOiBzdHJpbmcsIGNvbnRleHQ6IENvbnRleHQpOiB7IG8sIG0gfTtcbn1cblxuXG4vKipcbiAqIFNlcnZpY2UgZm9yIFBhcnNpbmcgYW5kIGZvciBldmFsdWF0aW5nIGV4cHJlc3Npb25zIGluIFdpZGdldCdzIGNvbmZpZ3VyYXRpb25cbiAqIFRoZSBmdW5jaW9uYWxpdHkgaXMgcHJvdmlkZWQgYnkgdGhlIEVTcHJlc3Npb24gcGFja2FnZVxuICpcbiAqL1xuZXhwb3J0IGNsYXNzIEVTcHJlc3Npb24gZXh0ZW5kcyBFeHByZXNzaW9ucyB7XG5cbiAgcHJpdmF0ZSBfcGFyc2VyOiBQYXJzZXI7XG4gIHByaXZhdGUgX2tleVBhcnNlcjogUGFyc2VyO1xuXG4gIHByaXZhdGUgX3J4RXZhbDogU3RhdGljRXZhbDtcblxuICBjb25zdHJ1Y3RvcigpIHtcblxuICAgIHN1cGVyKCk7XG4gICAgY29uc3QgZXM1ID0gZXM1UnVsZXMoKTtcblxuICAgIC8vIHJlbW92ZSBQcm9nYW0gLyBTdGF0ZW1lbnRzIHJ1bGVzLCBhbmQga2VlcCBvbmx5IGV4cHJlc3Npb25zXG4gICAgZXM1WzBdID0gW107XG5cbiAgICB0aGlzLl9wYXJzZXIgPSBuZXcgUGFyc2VyKGVzNSk7XG5cblxuICAgIGNvbnN0IGlkZW50aWZpZXJSdWxlID0gbmV3IElkZW50aWZpZXJSdWxlKHsgdGhpc1N0cjogbnVsbCwgbGl0ZXJhbHM6IHt9IH0pO1xuICAgIHRoaXMuX2tleVBhcnNlciA9IG5ldyBQYXJzZXIoW1xuICAgICAgW25ldyBCaW5hcnlPcGVyYXRvclJ1bGUoe1xuICAgICAgICAnLic6IHtcbiAgICAgICAgICB0eXBlOiBNRU1CRVJfRVhQLFxuICAgICAgICAgIGV4dHJhOiB7IGNvbXB1dGVkOiBmYWxzZSB9LFxuICAgICAgICAgIG5vb3A6IHRydWUsXG4gICAgICAgICAgbGVmdDogJ29iamVjdCcsIHJpZ2h0OiAncHJvcGVydHknLFxuICAgICAgICAgIHJ1bGVzOiBbW2lkZW50aWZpZXJSdWxlXV1cbiAgICAgICAgfVxuICAgICAgfSldLFxuICAgICAgW2lkZW50aWZpZXJSdWxlXVxuICAgIF0pO1xuXG4gICAgdGhpcy5fcnhFdmFsID0gbmV3IFJlYWN0aXZlRXZhbCgpO1xuICB9XG5cbiAgLyoqXG4gICAqIFBhcnNlcyB0aGUgc3RyaW5nIGV4cHJlc3Npb24gdXNpbmcgdGhlIGdlbmVyYWwgcGFyc2luZyBydWxlcy5cbiAgICpcbiAgICogKiBAcGFyYW0gZXhwcmVzc2lvblxuICAgKi9cbiAgcGFyc2UoZXhwcmVzc2lvbjogc3RyaW5nKTogSUFzdCB7XG4gICAgbGV0IHJlc3VsdDogSUFzdDtcbiAgICB0cnkge1xuICAgICAgcmVzdWx0ID0gdGhpcy5fcGFyc2VyLnBhcnNlKGV4cHJlc3Npb24pO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIGNvbnNvbGUud2FybignUGFyc2luZyBFcnJvcicsIGUubWVzc2FnZSwgJ1xcbicsIGV4cHJlc3Npb24pO1xuICAgICAgcmVzdWx0ID0gdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICAvKipcbiAgICogUGFyc2VzIHRoZSBzdHJpbmcgZXhwcmVzc2lvbiB1c2luZyB0aGUgcmVzdHJpY3RlZCAna2V5JyBwYXJzaW5nIHJ1bGVzLFxuICAgKiBpbnRlbmRlZCB0byBwYXJzZSBiaW5kaW5ncyB0byBtb2RlbCBrZXlzLlxuICAgKiBBcyB0aGV5IG11c3QgYmUgbHZhbHVlcyB0aGUgcnVsZXMgYXJlIG1vcmUgbGltaXRlZC5cbiAgICpcbiAgICogQHBhcmFtIGV4cHJlc3Npb25cbiAgICovXG4gIHBhcnNlS2V5KGV4cHJlc3Npb246IHN0cmluZyk6IElBc3Qge1xuICAgIGxldCByZXN1bHQ6IElBc3Q7XG4gICAgdHJ5IHtcbiAgICAgIHJlc3VsdCA9IHRoaXMuX2tleVBhcnNlci5wYXJzZShleHByZXNzaW9uKTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBjb25zb2xlLndhcm4oJ1BhcnNpbmcgRXJyb3InLCBlLm1lc3NhZ2UsICdcXG4nLCBleHByZXNzaW9uKTtcbiAgICAgIHJlc3VsdCA9IHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgLyoqXG4gICAqIEV2YWx1YXRlIGFuIEFTVCBpbiB0aGUgZ2l2ZW4gY29udGV4dC5cbiAgICpcbiAgICogQHBhcmFtIGFzdCBQYXJzZWQgZXhwcmVzc2lvbiB0byBldmFsdWF0ZVxuICAgKiBAcGFyYW0gY29udGV4dFxuICAgKiBAcGFyYW0gYXNPYnNlcnZhYmxlIEFsd2F5cyBjb252ZXJ0cyByZXN1bHQgdG8gb2JzZXJ2YWJsZVxuICAgKi9cbiAgZXZhbHVhdGUoYXN0OiBJQXN0LCBjb250ZXh0OiBDb250ZXh0LCBhc09ic2VydmFibGU6IGJvb2xlYW4pIHtcbiAgICBpZiAoIWFzdCkgcmV0dXJuIGFzT2JzZXJ2YWJsZSA/IEVNUFRZIDogdW5kZWZpbmVkO1xuXG4gICAgbGV0IHJlc3VsdDtcbiAgICB0cnkge1xuICAgICAgcmVzdWx0ID0gdGhpcy5fcnhFdmFsLmV2YWwoYXN0LCBjb250ZXh0KTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBjb25zb2xlLndhcm4oJ0Vycm9yIGV2YWx1YXRpbmcgZXhwcmVzc2lvbjogJywgZS5tZXNzYWdlKTtcbiAgICAgIHJldHVybiBhc09ic2VydmFibGUgPyBvZih1bmRlZmluZWQpIDogdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIHJldHVybiBhc09ic2VydmFibGUgJiYgIWlzT2JzZXJ2YWJsZShyZXN1bHQpID8gb2YocmVzdWx0KSA6IHJlc3VsdDtcbiAgfVxuXG4gIC8qKlxuICAgKiBFdmFsdWF0ZXMgYW4gZXhwcmVzc2lvbiB1c2luZyAqa2V5KiBwYXJzaW5nIHJ1bGVzIGFuZCByZXR1cm5zIGFuZCBsdmFsdWUgb2JqZWN0OlxuICAgKiB7bzogZXZhbHVhdGVkX29iamVjdCwgbTogbWVtYmVyfVxuICAgKlxuICAgKiBAcGFyYW0gZXhwcmVzc2lvblxuICAgKiBAcGFyYW0gY29udGV4dFxuICAgKi9cbiAgbHZhbHVlKGV4cHJlc3Npb246IHN0cmluZywgY29udGV4dDogQ29udGV4dCk6IHsgbywgbSB9IHtcbiAgICBsZXQgcmVzdWx0O1xuXG4gICAgY29uc3QgYXN0ID0gdGhpcy5wYXJzZUtleShleHByZXNzaW9uKTtcblxuICAgIGlmICghYXN0KSByZXR1cm4gbnVsbDtcbiAgICB0cnkge1xuICAgICAgcmVzdWx0ID0gdGhpcy5fcnhFdmFsLmx2YWx1ZShhc3QsIGNvbnRleHQpO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIGNvbnNvbGUud2FybignRXJyb3IgZXZhbHVhdGluZyBleHByZXNzaW9uOiAnLCBlLm1lc3NhZ2UpO1xuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cblxuICAvKipcbiAgICogRXhwcmVzc2lvbiB2ZXJzaW9uIG9mIHRoZSBBcnJheS5tYXAgZnVuY3Rpb24uXG4gICAqIEkgcmVwbGFjZXMgZWFjaCBhcnJheS9vYmplY3QgbWVtYmVyIHdpdGggdGhlIHJlc3VsdCBvZiBldmFsdWF0aW5nIGFuIGV4cHJlc3Npb24uXG4gICAqIFRoZSBleHByZXNzaW9uIGdldHMgaW4gaXRzIGV2YWwgY29udGV4dCB0aGUgdmFyaWFibGVzOlxuICAgKiBgJG9iamVjdGAgdGhlIG9yaWdpbmFsIG9iamVjdCBiZWluZyBtYXBlZFxuICAgKiBgJHZhbHVlYCB0aGUgY3VycmVudCB2YWx1ZVxuICAgKiBgJGluZGV4YCBmb3IgYXJyYXlzLCB0aGUgY3VycmVudCBpbmRleCBiZWluZyByZXBsYWNlZFxuICAgKiBgJGtleWAgZm9yIG9iamVjdHMsIHRoZSBjdXJyZW50IGtleVxuICAgKi9cbiAgbWFwRmFjdG9yeSgpIHtcbiAgICBjb25zdCBzZWxmID0gdGhpcztcbiAgICByZXR1cm4gZnVuY3Rpb24gbWFwKG9iajogQXJyYXk8YW55PiB8IE9iamVjdCwgZXhwcmVzc2lvbjogc3RyaW5nKTogQXJyYXk8YW55PiB8IE9iamVjdCB7XG5cbiAgICAgIGlmICghZXhwcmVzc2lvbiB8fCB0eXBlb2YgZXhwcmVzc2lvbiAhPT0gJ3N0cmluZycpIHJldHVybiBvYmo7XG5cblxuICAgICAgY29uc3QgYXN0ID0gc2VsZi5fcGFyc2VyLnBhcnNlKGV4cHJlc3Npb24pO1xuICAgICAgaWYgKCFhc3QpIHJldHVybiBvYmo7XG5cbiAgICAgIGlmIChBcnJheS5pc0FycmF5KG9iaikpIHtcblxuICAgICAgICByZXR1cm4gb2JqLm1hcCgodmFsdWUsIGluZGV4KSA9PlxuICAgICAgICAgIHNlbGYuX3J4RXZhbC5ldmFsKGFzdCwgQ29udGV4dC5jcmVhdGUodGhpcywgeyAvLyB0c2xpbnQ6ZGlzYWJsZS1saW5lOm5vLWludmFsaWQtdGhpc1xuICAgICAgICAgICAgJG9iamVjdDogb2JqLFxuICAgICAgICAgICAgJHZhbHVlOiB2YWx1ZSxcbiAgICAgICAgICAgICRpbmRleDogaW5kZXhcbiAgICAgICAgICB9KSkpO1xuICAgICAgfVxuICAgICAgaWYgKHR5cGVvZiBvYmogPT09ICdvYmplY3QnKSB7XG5cbiAgICAgICAgY29uc3QgcmVzdWx0ID0ge307XG5cbiAgICAgICAgZm9yIChjb25zdCBwcm9wIGluIG9iaikgLy8gdHNsaW50OmRpc2FibGUtbGluZTpmb3JpblxuXG4gICAgICAgICAgcmVzdWx0W3Byb3BdID0gc2VsZi5fcnhFdmFsLmV2YWwoYXN0LCBDb250ZXh0LmNyZWF0ZSh0aGlzLCB7IC8vIHRzbGludDpkaXNhYmxlLWxpbmU6bm8taW52YWxpZC10aGlzXG4gICAgICAgICAgICAkb2JqZWN0OiBvYmosXG4gICAgICAgICAgICAkdmFsdWU6IG9ialtwcm9wXSxcbiAgICAgICAgICAgICRrZXk6IHByb3BcbiAgICAgICAgICB9KSk7XG5cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgIH1cbiAgICAgIHJldHVybiBvYmo7XG4gICAgfTtcbiAgfVxuXG4gIC8qKlxuICAqIEV4cHJlc3Npb24gdmVyc2lvbiBvZiB0aGUgQXJyYXkucmVkdWNlIGZ1bmN0aW9uLlxuICAgKiBJIHJlcGxhY2VzIGVhY2ggYXJyYXkvb2JqZWN0IG1lbWJlciB3aXRoIHRoZSByZXN1bHQgb2YgZXZhbHVhdGluZyBhbiBleHByZXNzaW9uLlxuICAgKiBUaGUgZXhwcmVzc2lvbiBnZXRzIGluIGl0cyBldmFsIGNvbnRleHQgdGhlIHZhcmlhYmxlczpcbiAgICogYCRvYmplY3RgIHRoZSBvcmlnaW5hbCBvYmplY3QgYmVpbmcgbWFwZWRcbiAgICogYCR2YWx1ZWAgdGhlIGN1cnJlbnQgZWxlbWVudFxuICAgKiBgJGluZGV4YCBmb3IgYXJyYXlzLCB0aGUgY3VycmVudCBpbmRleCBiZWluZyByZXBsYWNlZFxuICAgKiBgJGtleWAgZm9yIG9iamVjdHMsIHRoZSBjdXJyZW50IGtleVxuICAgKiBgJHByZXZgIHRoZSBwcmV2aW91c2x5IHJldHVybmVkIHZhbHVlICh0aGUgYWN1bXVsYXRpb24pXG4gICAqIEBwYXJhbSBvYmpcbiAgICogQHBhcmFtIGV4cHJlc3Npb25cbiAgICogQHBhcmFtIGluaXRWYWx1ZVxuICAgKi9cbiAgcmVkdWNlRmFjdG9yeSgpIHtcbiAgICBjb25zdCBzZWxmID0gdGhpcztcblxuICAgIHJldHVybiBmdW5jdGlvbiByZWR1Y2Uob2JqOiBBcnJheTxhbnk+IHwgT2JqZWN0LCBleHByZXNzaW9uOiBzdHJpbmcsIGluaXRWYWx1ZTogYW55KTogQXJyYXk8YW55PiB8IE9iamVjdCB7XG5cbiAgICAgIGlmICghZXhwcmVzc2lvbiB8fCB0eXBlb2YgZXhwcmVzc2lvbiAhPT0gJ3N0cmluZycpIHJldHVybiBvYmo7XG5cbiAgICAgIGNvbnN0IGFzdCA9IHNlbGYuX3BhcnNlci5wYXJzZShleHByZXNzaW9uKTtcbiAgICAgIGlmICghYXN0KSByZXR1cm4gaW5pdFZhbHVlO1xuXG4gICAgICBpZiAoQXJyYXkuaXNBcnJheShvYmopKSB7XG4gICAgICAgIHJldHVybiBvYmoucmVkdWNlKFxuICAgICAgICAgIChwcmV2LCB2YWx1ZSwgaW5kZXgpID0+XG5cbiAgICAgICAgICAgIHNlbGYuX3J4RXZhbC5ldmFsKGFzdCwgQ29udGV4dC5jcmVhdGUodGhpcywgeyAvLyB0c2xpbnQ6ZGlzYWJsZS1saW5lOm5vLWludmFsaWQtdGhpc1xuICAgICAgICAgICAgICAkb2JqZWN0OiBvYmosXG4gICAgICAgICAgICAgICRwcmV2OiBwcmV2LFxuICAgICAgICAgICAgICAkdmFsdWU6IHZhbHVlLFxuICAgICAgICAgICAgICAkaW5kZXg6IGluZGV4XG4gICAgICAgICAgICB9KSksIGluaXRWYWx1ZSk7XG4gICAgICB9XG4gICAgICBpZiAodHlwZW9mIG9iaiA9PT0gJ29iamVjdCcpIHtcblxuICAgICAgICBsZXQgcmVzdWx0ID0gaW5pdFZhbHVlO1xuXG4gICAgICAgIGZvciAoY29uc3QgcHJvcCBpbiBvYmopIC8vIHRzbGludDpkaXNhYmxlLWxpbmU6Zm9yaW5cblxuICAgICAgICAgIHJlc3VsdCA9IHNlbGYuX3J4RXZhbC5ldmFsKGFzdCwgQ29udGV4dC5jcmVhdGUodGhpcywgeyAvLyB0c2xpbnQ6ZGlzYWJsZS1saW5lOm5vLWludmFsaWQtdGhpc1xuICAgICAgICAgICAgJHByZXY6IHJlc3VsdCxcbiAgICAgICAgICAgICR2YWx1ZTogb2JqW3Byb3BdLFxuICAgICAgICAgICAgJGtleTogcHJvcFxuICAgICAgICAgIH0pKTtcblxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgfVxuICAgICAgcmV0dXJuIG9iajtcbiAgICB9O1xuICB9XG59XG5cbmV4cG9ydCBjb25zdCBleHByZXNzaW9uUHJvdmlkZXIgPSB7XG4gIHByb3ZpZGU6IEV4cHJlc3Npb25zLFxuICB1c2VDbGFzczogRVNwcmVzc2lvblxufTtcbiIsIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDE4IEFkcmlhbiBQYW5lbGxhIDxpYW5jaGk3NEBvdXRsb29rLmNvbT5cbiAqXG4gKiBUaGlzIHNvZnR3YXJlIGlzIHJlbGVhc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS5cbiAqIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvTUlUXG4gKi9cblxuaW1wb3J0IHsgQ29tcG9uZW50LCBWaWV3RW5jYXBzdWxhdGlvbiwgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENoYW5nZURldGVjdG9yUmVmfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEFic3RyYWN0V2lkZ2V0IH0gZnJvbSAnLi9hYnN0cmFjdHdpZGdldCc7XG5pbXBvcnQgeyBFeHByZXNzaW9ucyB9IGZyb20gJy4vZXhwcmVzc2lvbnMnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICd3ZGctZGVmYXVsdCcsXG4gIHRlbXBsYXRlOiAnPGRpdj5Vbmtub3duIHdpZGdldCBcInt7dHlwZX19XCI8L2Rpdj4nLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBEZWZhdWx0V2lkZ2V0Q29tcG9uZW50IGV4dGVuZHMgQWJzdHJhY3RXaWRnZXQge1xuXG4gIGNvbnN0cnVjdG9yKGNkcjogQ2hhbmdlRGV0ZWN0b3JSZWYsIGV4cHI6IEV4cHJlc3Npb25zKSB7XG4gICAgc3VwZXIoY2RyLCBleHByKTtcbiAgfVxufVxuIiwiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTggQWRyaWFuIFBhbmVsbGEgPGlhbmNoaTc0QG91dGxvb2suY29tPlxuICpcbiAqIFRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLlxuICogaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9NSVRcbiAqL1xuXG5pbXBvcnQgeyBUeXBlLCBJbmplY3QsIEluamVjdGlvblRva2VuLCBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBBYnN0cmFjdFdpZGdldCB9IGZyb20gJy4vYWJzdHJhY3R3aWRnZXQnO1xuaW1wb3J0IHsgRGVmYXVsdFdpZGdldENvbXBvbmVudCB9IGZyb20gJy4vZGVmYXVsdHdpZGdldC5jb21wb25lbnQnO1xuXG5leHBvcnQgY29uc3QgQUZfQ09ORklHX1RPS0VOID0gbmV3IEluamVjdGlvblRva2VuPElBdXRvRm9ybUNvbmZpZz4oJ0FGX0NPTkZJR19UT0tFTicpO1xuXG5cbmV4cG9ydCBpbnRlcmZhY2UgSVdpZGdldENvbmYge1xuICB0eXBlOiBzdHJpbmc7XG4gIGNvbXBvbmVudDogVHlwZTxBYnN0cmFjdFdpZGdldD47XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgSUF1dG9Gb3JtQ29uZmlnIHtcbiAgd2lkZ2V0cz86IElXaWRnZXRDb25mW10gfCBJV2lkZ2V0Q29uZjtcbn1cblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgV2lkZ2V0UmVnaXN0cnkge1xuXG4gIHByaXZhdGUgX3JlZ2lzdHJ5ID0gbmV3IE1hcDxzdHJpbmcsIFR5cGU8QWJzdHJhY3RXaWRnZXQ+PigpO1xuXG4gIHByaXZhdGUgX2RlZmF1bHQ6IFR5cGU8QWJzdHJhY3RXaWRnZXQ+O1xuXG5cbiAgY29uc3RydWN0b3IoQEluamVjdChBRl9DT05GSUdfVE9LRU4pIGNvbmZpZ3M6IElBdXRvRm9ybUNvbmZpZ1tdID0gW10pIHtcblxuICAgIGNvbmZpZ3MuZm9yRWFjaChjb25mID0+IGNvbmYud2lkZ2V0cyAmJiB0aGlzLnJlZ2lzdGVyKGNvbmYud2lkZ2V0cykpO1xuXG4gICAgdGhpcy5fZGVmYXVsdCA9IHRoaXMuX3JlZ2lzdHJ5LmdldCgnZGVmYXVsdCcpIHx8IERlZmF1bHRXaWRnZXRDb21wb25lbnQ7XG4gIH1cblxuICByZWdpc3Rlcih3aWRnZXRzOiBJV2lkZ2V0Q29uZltdIHwgSVdpZGdldENvbmYpIHtcbiAgICBpZiAoIXdpZGdldHMpIHJldHVybjtcbiAgICBpZiAoIUFycmF5LmlzQXJyYXkod2lkZ2V0cykpIHdpZGdldHMgPSBbd2lkZ2V0c107XG5cbiAgICB3aWRnZXRzLmZvckVhY2god2lkZ2V0ID0+IHtcbiAgICAgIGlmICh3aWRnZXQudHlwZSAmJiB3aWRnZXQuY29tcG9uZW50KSB0aGlzLl9yZWdpc3RyeS5zZXQod2lkZ2V0LnR5cGUsIHdpZGdldC5jb21wb25lbnQpO1xuICAgIH0pO1xuICB9XG5cblxuXG5cbiAgZ2V0KHR5cGU6IHN0cmluZyk6IFR5cGU8QWJzdHJhY3RXaWRnZXQ+IHtcbiAgICByZXR1cm4gdGhpcy5fcmVnaXN0cnkuZ2V0KHR5cGUpIHx8IHRoaXMuX2RlZmF1bHQ7XG4gIH1cblxufVxuIiwiaW1wb3J0IHtcbiAgRGlyZWN0aXZlLCBJbnB1dCxcbiAgVmlld0NvbnRhaW5lclJlZixcbiAgQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLCBDb21wb25lbnRSZWYsXG4gIE9uQ2hhbmdlcywgT25EZXN0cm95LCBPcHRpb25hbCwgSW5qZWN0LCBJbmplY3Rpb25Ub2tlbixcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBXaWRnZXRSZWdpc3RyeSB9IGZyb20gJy4vd2lkZ2V0cmVnaXN0cnkuc2VydmljZSc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IEFic3RyYWN0V2lkZ2V0LCBwYXJzZURlZk9iamVjdCB9IGZyb20gJy4vYWJzdHJhY3R3aWRnZXQnO1xuaW1wb3J0IHsgSVdpZGdldERlZiB9IGZyb20gJy4vd2lkZ2V0LmludGVyZmFjZSc7XG5pbXBvcnQgeyBDb250ZXh0IH0gZnJvbSAnLi9jb250ZXh0JztcbmltcG9ydCB7IEV4cHJlc3Npb25zIH0gZnJvbSAnLi9leHByZXNzaW9ucyc7XG5cbi8qKiBJbmplY3Rpb24gdG9rZW4gdXNlZCB0byBwcm92aWRlIHRoZSBkZWZhdWx0IHJvb3QgY29udGV4dCBmb3Igd2lkZ2V0cyAqL1xuZXhwb3J0IGNvbnN0IFJPT1RfQ09OVEVYVCA9IG5ldyBJbmplY3Rpb25Ub2tlbjxDb250ZXh0PignV2lkZ2V0cyBSb290IENvbnRleHQnKTtcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW3dkZ1dpZGdldF0nXG59KVxuZXhwb3J0IGNsYXNzIFdpZGdldERpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uQ2hhbmdlcywgT25EZXN0cm95IHtcblxuICBASW5wdXQoKSB3ZGdXaWRnZXQ6IElXaWRnZXREZWY7XG4gIEBJbnB1dCgpIHBhcmVudENvbnRleHQ6IENvbnRleHQ7XG5cbiAgd2lkZ2V0OiBBYnN0cmFjdFdpZGdldDtcbiAgY29udGV4dDogQ29udGV4dDtcbiAgcHJpdmF0ZSBfd2lkZ2V0UmVmOiBDb21wb25lbnRSZWY8QWJzdHJhY3RXaWRnZXQ+O1xuICBwcml2YXRlIF9pZlN1YnM6IFN1YnNjcmlwdGlvbjtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIF9jb250YWluZXI6IFZpZXdDb250YWluZXJSZWYsXG4gICAgcHJpdmF0ZSBfcmVnaXN0cnk6IFdpZGdldFJlZ2lzdHJ5LFxuICAgIHByaXZhdGUgX2NmcjogQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLFxuICAgIEBPcHRpb25hbCgpIEBJbmplY3QoUk9PVF9DT05URVhUKSBwcml2YXRlIF9yb290Q29udGV4dDogQ29udGV4dCxcbiAgICBwcml2YXRlIF9leHByOiBFeHByZXNzaW9uc1xuICApIHtcbiAgfVxuXG4gIG5nT25DaGFuZ2VzKCkge1xuXG4gICAgdGhpcy5fcHJlQ3JlYXRlKCk7XG5cbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuX2Rlc3Ryb3koKTtcbiAgICB0aGlzLl91bnN1c2NyaWJlKCk7XG4gIH1cblxuICBwcml2YXRlIF9wcmVDcmVhdGUoKSB7XG4gICAgdGhpcy53ZGdXaWRnZXQgPSB0aGlzLndkZ1dpZGdldCB8fCB7IHR5cGU6ICdub25lJyB9O1xuICAgIHRoaXMucGFyZW50Q29udGV4dCA9IHRoaXMucGFyZW50Q29udGV4dCB8fCB0aGlzLl9yb290Q29udGV4dDtcbiAgICB0aGlzLmNvbnRleHQgPSBDb250ZXh0LmNyZWF0ZSh0aGlzLnBhcmVudENvbnRleHQsIHBhcnNlRGVmT2JqZWN0KHRoaXMud2RnV2lkZ2V0LmNvbnRleHQsIHRoaXMucGFyZW50Q29udGV4dCwgZmFsc2UsIHRoaXMuX2V4cHIpKTtcblxuICAgIHRoaXMuX2Rlc3Ryb3koKTtcbiAgICB0aGlzLl91bnN1c2NyaWJlKCk7XG5cbiAgICBpZiAodGhpcy53ZGdXaWRnZXQuaWYpIHtcbiAgICAgIHRoaXMuX2lmU3VicyA9IHRoaXMuX2V4cHIuZXZhbCh0aGlzLndkZ1dpZGdldC5pZiwgdGhpcy5jb250ZXh0LCB0cnVlKS5zdWJzY3JpYmUoY29uZCA9PiB7XG4gICAgICAgIGlmIChjb25kICYmICF0aGlzLl93aWRnZXRSZWYpIHRoaXMuX2NyZWF0ZSgpO1xuICAgICAgICBlbHNlIHRoaXMuX2Rlc3Ryb3koKTtcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB0aGlzLl9jcmVhdGUoKTtcblxuXG4gIH1cblxuICBwcml2YXRlIF9jcmVhdGUoKSB7XG5cbiAgICBjb25zdCB3aWRnZXRDbGFzcyA9IHRoaXMuX3JlZ2lzdHJ5LmdldCh0aGlzLndkZ1dpZGdldC50eXBlKTtcbiAgICBjb25zdCBmYWN0b3J5ID0gdGhpcy5fY2ZyLnJlc29sdmVDb21wb25lbnRGYWN0b3J5KHdpZGdldENsYXNzKTtcbiAgICB0aGlzLl93aWRnZXRSZWYgPSB0aGlzLl9jb250YWluZXIuY3JlYXRlQ29tcG9uZW50KGZhY3RvcnkpO1xuICAgIHRoaXMud2lkZ2V0ID0gdGhpcy5fd2lkZ2V0UmVmLmluc3RhbmNlO1xuXG4gICAgdGhpcy53aWRnZXQuc2V0dXAodGhpcywgdGhpcy53ZGdXaWRnZXQsIHRoaXMuY29udGV4dCk7XG5cbiAgfVxuXG4gIHByaXZhdGUgX2Rlc3Ryb3koKSB7XG4gICAgaWYgKHRoaXMuX3dpZGdldFJlZikge1xuICAgICAgdGhpcy5fd2lkZ2V0UmVmLmRlc3Ryb3koKTtcbiAgICAgIHRoaXMuX3dpZGdldFJlZiA9IG51bGw7XG4gICAgfVxuXG4gIH1cblxuICBwcml2YXRlIF91bnN1c2NyaWJlKCkge1xuXG4gICAgaWYgKHRoaXMuX2lmU3Vicykge1xuICAgICAgdGhpcy5faWZTdWJzLnVuc3Vic2NyaWJlKCk7XG4gICAgICB0aGlzLl9pZlN1YnMgPSBudWxsO1xuICAgIH1cbiAgfVxufVxuIiwiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTggQWRyaWFuIFBhbmVsbGEgPGlhbmNoaTc0QG91dGxvb2suY29tPlxuICpcbiAqIFRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLlxuICogaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9NSVRcbiAqL1xuXG5pbXBvcnQgeyBmb3JtYXROdW1iZXIsIGZvcm1hdERhdGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgUGlwZSwgUGlwZVRyYW5zZm9ybSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG4vKiogQW5ndWxhciBQaXBlIHRvIGZvcm1hdCB0ZXh0ICovXG5AUGlwZSh7XG4gIG5hbWU6ICdmb3JtYXQnLFxuICBwdXJlOiB0cnVlXG59KVxuZXhwb3J0IGNsYXNzIEZvcm1hdFBpcGUgaW1wbGVtZW50cyBQaXBlVHJhbnNmb3JtIHtcbiAgdHJhbnNmb3JtKHZhbHVlOiBhbnksIGZvcm1hdDogYW55KSB7XG4gICAgcmV0dXJuIGZvcm1hdCA/IGZvcm1hdFZhbHVlKHZhbHVlLCBmb3JtYXQpIDogdmFsdWU7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGZvcm1hdFZhbHVlKHZhbHVlOiBhbnksIGZvcm1hdDogc3RyaW5nKSB7XG4gIGlmICh0eXBlb2YgZm9ybWF0ICE9PSAnc3RyaW5nJyB8fCB2YWx1ZSA9PSBudWxsKSByZXR1cm4gdmFsdWU7XG4gIGNvbnN0IHJlID0gL15cXHMqKFxcdyspXFxzKig6KFtcIiddKShbXlwiJ10qKVxcMyk/JC87XG5cbiAgY29uc3QgbWF0Y2g6IFJlZ0V4cEV4ZWNBcnJheSA9IHJlLmV4ZWMoZm9ybWF0KTtcblxuICBpZiAoIW1hdGNoWzBdKSByZXR1cm4gdmFsdWU7XG5cbiAgc3dpdGNoIChtYXRjaFsxXS50b1VwcGVyQ2FzZSgpKSB7XG4gICAgY2FzZSAnTlVNQkVSJzpcbiAgICAgIGxldCBudW07XG4gICAgICBudW0gPSBwYXJzZUZsb2F0KHZhbHVlKTtcbiAgICAgIHJldHVybiBpc05hTihudW0pID8gdmFsdWUgOiBmb3JtYXROdW1iZXIobnVtLCAnZW4tVVMnLCBtYXRjaFs0XSk7XG4gICAgY2FzZSAnREFURSc6XG4gICAgICByZXR1cm4gZm9ybWF0RGF0ZSh2YWx1ZSwgbWF0Y2hbNF0sICdlbi1VUycpO1xuICB9XG5cbiAgcmV0dXJuIHZhbHVlO1xufVxuIiwiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTggQWRyaWFuIFBhbmVsbGEgPGlhbmNoaTc0QG91dGxvb2suY29tPlxuICpcbiAqIFRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLlxuICogaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9NSVRcbiAqL1xuXG5pbXBvcnQgeyBDb21wb25lbnQsIFZpZXdFbmNhcHN1bGF0aW9uLCBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBBY3RpdmF0ZWRSb3V0ZSB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBJV2lkZ2V0RGVmIH0gZnJvbSAnLi93aWRnZXQuaW50ZXJmYWNlJztcbmltcG9ydCB7IENvbnRleHQgfSBmcm9tICcuL2NvbnRleHQnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICd3ZGctd2lkZ2V0JyxcbiAgdGVtcGxhdGU6ICc8bmctY29udGFpbmVyIFt3ZGdXaWRnZXRdPVwid2lkZ2V0RGVmXCIgW3BhcmVudENvbnRleHRdPVwicGFyZW50Q29udGV4dFwiPjwvbmctY29udGFpbmVyPicsXG5cbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcbn0pXG5leHBvcnQgY2xhc3MgUm91dGVkV2lkZ2V0Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICB3aWRnZXREZWY6IElXaWRnZXREZWY7XG4gIHBhcmVudENvbnRleHQ6IENvbnRleHQ7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfcm91dGU6IEFjdGl2YXRlZFJvdXRlKSB7IH1cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy53aWRnZXREZWYgPSB0aGlzLl9yb3V0ZS5zbmFwc2hvdC5kYXRhLndpZGdldERlZiB8fCB7IHR5cGU6ICdlbXB0eScgfTtcbiAgICB0aGlzLnBhcmVudENvbnRleHQgPSB0aGlzLl9yb3V0ZS5zbmFwc2hvdC5kYXRhLnBhcmVudENvbnRleHQ7XG4gIH1cblxufVxuIiwiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTggQWRyaWFuIFBhbmVsbGEgPGlhbmNoaTc0QG91dGxvb2suY29tPlxuICpcbiAqIFRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLlxuICogaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9NSVRcbiAqL1xuXG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTmdNb2R1bGUsIE1vZHVsZVdpdGhQcm92aWRlcnMsIEFOQUxZWkVfRk9SX0VOVFJZX0NPTVBPTkVOVFMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgRGVmYXVsdFdpZGdldENvbXBvbmVudCB9IGZyb20gJy4vZGVmYXVsdHdpZGdldC5jb21wb25lbnQnO1xuaW1wb3J0IHsgQUZfQ09ORklHX1RPS0VOLCBJQXV0b0Zvcm1Db25maWcgfSBmcm9tICcuL3dpZGdldHJlZ2lzdHJ5LnNlcnZpY2UnO1xuaW1wb3J0IHsgV2lkZ2V0RGlyZWN0aXZlIH0gZnJvbSAnLi93aWRnZXQuZGlyZWN0aXZlJztcbmltcG9ydCB7IEZvcm1hdFBpcGUgfSBmcm9tICcuL2Zvcm1hdCc7XG5pbXBvcnQgeyBSb3V0ZWRXaWRnZXRDb21wb25lbnQgfSBmcm9tICcuL3JvdXRlZHdpZGdldC5jb21wb25lbnQnO1xuXG5ATmdNb2R1bGUoe1xuXG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGVdLFxuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBXaWRnZXREaXJlY3RpdmUsXG4gICAgUm91dGVkV2lkZ2V0Q29tcG9uZW50LFxuICAgIERlZmF1bHRXaWRnZXRDb21wb25lbnQsXG4gICAgRm9ybWF0UGlwZVxuICBdLFxuICBlbnRyeUNvbXBvbmVudHM6IFtEZWZhdWx0V2lkZ2V0Q29tcG9uZW50XSxcbiAgZXhwb3J0czogW1xuICAgIFdpZGdldERpcmVjdGl2ZSxcbiAgICBSb3V0ZWRXaWRnZXRDb21wb25lbnQsXG4gICAgRm9ybWF0UGlwZVxuICBdXG59KVxuZXhwb3J0IGNsYXNzIFdpZGdldHNDb3JlTW9kdWxlIHtcblxuICBzdGF0aWMgZm9yUm9vdChjb25maWc6IElBdXRvRm9ybUNvbmZpZyA9IHt9KTogTW9kdWxlV2l0aFByb3ZpZGVycyB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5nTW9kdWxlOiBXaWRnZXRzQ29yZU1vZHVsZSxcbiAgICAgIHByb3ZpZGVyczogW1xuICAgICAgICB7IHByb3ZpZGU6IEFGX0NPTkZJR19UT0tFTiwgdXNlVmFsdWU6IGNvbmZpZywgbXVsdGk6IHRydWUgfSxcbiAgICAgICAgeyBwcm92aWRlOiBBTkFMWVpFX0ZPUl9FTlRSWV9DT01QT05FTlRTLCB1c2VWYWx1ZTogY29uZmlnLCBtdWx0aTogdHJ1ZSB9XG4gICAgICBdXG4gICAgfTtcbiAgfVxufVxuXG5cbiIsIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDE4IEFkcmlhbiBQYW5lbGxhIDxpYW5jaGk3NEBvdXRsb29rLmNvbT5cbiAqXG4gKiBUaGlzIHNvZnR3YXJlIGlzIHJlbGVhc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS5cbiAqIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvTUlUXG4gKi9cblxuaW1wb3J0IHsgRm9ybUNvbnRyb2wsIEZvcm1Hcm91cCwgRm9ybUFycmF5LCBBYnN0cmFjdENvbnRyb2wgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBDaGFuZ2VEZXRlY3RvclJlZn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBHRVRfT0JTRVJWQUJMRSwgaXNSZWFjdGl2ZSwgSU5vZGUgfSBmcm9tICdlc3ByZXNzaW9uJztcbmltcG9ydCB7IHRha2UsIG1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IEFic3RyYWN0V2lkZ2V0IH0gZnJvbSAnLi9hYnN0cmFjdHdpZGdldCc7XG5pbXBvcnQgeyBDb250ZXh0IH0gZnJvbSAnLi9jb250ZXh0JztcbmltcG9ydCB7IEV4cHJlc3Npb25zIH0gZnJvbSAnLi9leHByZXNzaW9ucyc7XG5pbXBvcnQgeyBJV2lkZ2V0RGVmIH0gZnJvbSAnLi93aWRnZXQuaW50ZXJmYWNlJztcblxuXG5leHBvcnQgY29uc3QgRk9STV9DT05UUk9MID0gU3ltYm9sKCdGb3JtQ29udHJvbCcpO1xuZXhwb3J0IGNsYXNzIEFic3RyYWN0Rm9ybUZpZWxkV2lkZ2V0IGV4dGVuZHMgQWJzdHJhY3RXaWRnZXQge1xuXG5cbiAgZm9ybUNvbnRyb2w6IEZvcm1Db250cm9sO1xuXG4gIHZhbGlkYXRlOiBJTm9kZTtcbiAgdmFsaWRhdGVDb250ZXh0OiBDb250ZXh0O1xuICBjb25zdHJ1Y3RvcihjZHI6IENoYW5nZURldGVjdG9yUmVmLCBleHByOiBFeHByZXNzaW9ucykge1xuICAgIHN1cGVyKGNkciwgZXhwcik7XG4gIH1cbiAgZHluT25TZXR1cChkZWY6IElXaWRnZXREZWYpOiBJV2lkZ2V0RGVmIHtcblxuICAgIC8vIGdldCBib3VuZCBtb2RlbFxuICAgIGlmICghZGVmLmJpbmQpXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0Zvcm0gZmllbGQgd2lkZ2V0cyBtdXN0IGhhdmUgYSBcImJpbmRcIiBwcm9wZXJ0eSBkZWZpbmVkJyk7XG5cbiAgICBjb25zdCBsdmFsdWUgPSB0aGlzLl9leHByLmx2YWx1ZShkZWYuYmluZCwgdGhpcy5jb250ZXh0KTtcblxuICAgIGlmICghbHZhbHVlKVxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdGb3JtIGZpZWxkIFwiYmluZFwiIHByb3BlcnR5IG11c3QgYmUgYW4gaWRlbnRpZmllciBvciBtZW1iZXIgZXhwcmVzc2lvbicpO1xuXG4gICAgaWYgKCFpc1JlYWN0aXZlKGx2YWx1ZS5vKSlcbiAgICAgIHRocm93IG5ldyBFcnJvcignQm91bmQgS2V5IG11c3QgYmUgb2YgUmVhY3RpdmUgVHlwZScpO1xuXG5cbiAgICAvLyBzZXR1cCB2YWxpZGF0aW9uXG5cblxuICAgIGlmIChkZWYudmFsaWRhdGUgJiYgKHRoaXMudmFsaWRhdGUgPSB0aGlzLl9leHByLnBhcnNlKGRlZi52YWxpZGF0ZSkpKSB7Ly8gdHNsaW50OmRpc2FibGUtbGluZTp3aGl0ZXNwYWNlXG4gICAgICB0aGlzLnZhbGlkYXRlQ29udGV4dCA9IENvbnRleHQuY3JlYXRlKHRoaXMuY29udGV4dCk7XG5cbiAgICAgIHRoaXMuZm9ybUNvbnRyb2wgPSBuZXcgRm9ybUNvbnRyb2wobnVsbCwgbnVsbCwgKGN0cmw6IEFic3RyYWN0Q29udHJvbCkgPT4ge1xuICAgICAgICB0aGlzLnZhbGlkYXRlQ29udGV4dFsnJHZhbHVlJ10gPSBjdHJsLnZhbHVlO1xuICAgICAgICByZXR1cm4gdGhpcy5fZXhwci5ldmFsdWF0ZSh0aGlzLnZhbGlkYXRlLCB0aGlzLnZhbGlkYXRlQ29udGV4dCwgdHJ1ZSkucGlwZShcbiAgICAgICAgICB0YWtlKDEpLFxuICAgICAgICAgIG1hcChyZXMgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHJlcyA/IG51bGwgOiB7IHZhbGlkYXRlOiAndmFsaWRhdGlvbiBlcnJvcicgfTtcbiAgICAgICAgICB9KVxuICAgICAgICApO1xuICAgICAgfSk7XG4gICAgfSBlbHNlIHRoaXMuZm9ybUNvbnRyb2wgPSBuZXcgRm9ybUNvbnRyb2woKTtcblxuICAgIGNvbnN0IHBhcmVudEZvcm06IEZvcm1Hcm91cCB8IEZvcm1BcnJheSA9IHRoaXMuY29udGV4dFtGT1JNX0NPTlRST0xdO1xuICAgIGlmIChwYXJlbnRGb3JtKSB7XG4gICAgICBpZiAocGFyZW50Rm9ybSBpbnN0YW5jZW9mIEZvcm1Hcm91cCkgcGFyZW50Rm9ybS5hZGRDb250cm9sKGx2YWx1ZS5tLCB0aGlzLmZvcm1Db250cm9sKTtcbiAgICAgIGVsc2UgaWYgKHBhcmVudEZvcm0gaW5zdGFuY2VvZiBGb3JtQXJyYXkpIHBhcmVudEZvcm0ucHVzaCh0aGlzLmZvcm1Db250cm9sKTtcbiAgICB9XG5cbiAgICAvLyBsaXN0ZW4gdG8gYm91bmQgY29udGV4dCB2YWx1ZSBhbmQgdXBkYXRlIG9uIGNoYW5nZXNcbiAgICB0aGlzLmFkZFN1YnNjcmlwdGlvbiA9IGx2YWx1ZS5vW0dFVF9PQlNFUlZBQkxFXShsdmFsdWUubSkuc3Vic2NyaWJlKHZhbCA9PlxuICAgICAgdmFsICE9PSB0aGlzLmZvcm1Db250cm9sLnZhbHVlICYmIHRoaXMuZm9ybUNvbnRyb2wuc2V0VmFsdWUodmFsKSk7XG5cbiAgICAvLyBsaXN0ZW4gdG8gY29udHJvbCBjaGFuZ2VzIHRvIHVwZGF0ZSBib3VuZCBjb250ZXh0IHZhbHVlXG4gICAgdGhpcy5hZGRTdWJzY3JpcHRpb24gPSB0aGlzLmZvcm1Db250cm9sLnZhbHVlQ2hhbmdlcy5zdWJzY3JpYmUodmFsID0+IHtcbiAgICAgIGlmICh2YWwgIT09IGx2YWx1ZS5vW2x2YWx1ZS5tXSlcbiAgICAgICAgbHZhbHVlLm9bbHZhbHVlLm1dID0gdmFsO1xuICAgIH0pO1xuXG5cbiAgICByZXR1cm4gZGVmO1xuICB9XG59XG4iLCIvKiFcbiAqIENvcHlyaWdodCAoYykgMjAxNyBBZHJpYW4gUGFuZWxsYSA8aWFuY2hpNzRAb3V0bG9vay5jb20+LCBjb250cmlidXRvcnMuXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UuXG4gKi9cblxuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBSZWFjdGl2ZUZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuXG5pbXBvcnQgeyBNYXRCdXR0b25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9idXR0b24nO1xuaW1wb3J0IHsgTWF0RGlhbG9nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvZGlhbG9nJztcbmltcG9ydCB7IE1hdEljb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9pY29uJztcbmltcG9ydCB7IE1hdElucHV0TW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvaW5wdXQnO1xuaW1wb3J0IHsgTWF0TGlzdE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2xpc3QnO1xuaW1wb3J0IHsgTWF0U2lkZW5hdk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL3NpZGVuYXYnO1xuaW1wb3J0IHsgTWF0Q2FyZE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2NhcmQnO1xuaW1wb3J0IHsgTWF0VG9vbGJhck1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL3Rvb2xiYXInO1xuaW1wb3J0IHsgTWF0UHJvZ3Jlc3NCYXJNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9wcm9ncmVzcy1iYXInO1xuaW1wb3J0IHsgTWF0RXhwYW5zaW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvZXhwYW5zaW9uJztcbmltcG9ydCB7IE1hdFNlbGVjdE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL3NlbGVjdCc7XG5pbXBvcnQgeyBNYXRUYWJzTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvdGFicyc7XG5pbXBvcnQgeyBNYXRTbmFja0Jhck1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL3NuYWNrLWJhcic7XG5pbXBvcnQgeyBNYXRTbGlkZVRvZ2dsZU1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL3NsaWRlLXRvZ2dsZSc7XG5pbXBvcnQgeyBNYXRDaGlwc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2NoaXBzJztcbmltcG9ydCB7IE1hdEF1dG9jb21wbGV0ZU1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2F1dG9jb21wbGV0ZSc7XG5pbXBvcnQgeyBNYXRDaGVja2JveE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2NoZWNrYm94JztcbmltcG9ydCB7IE1hdFNsaWRlck1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL3NsaWRlcic7XG5pbXBvcnQgeyBNYXRUYWJsZU1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL3RhYmxlJztcbmltcG9ydCB7IE1hdFBhZ2luYXRvck1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL3BhZ2luYXRvcic7XG5pbXBvcnQgeyBNYXRTb3J0TW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvc29ydCc7XG5pbXBvcnQgeyBNYXRNZW51TW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvbWVudSc7XG5cbi8qKlxuICogSGVscGVyIG1vZHVsZSB0byBjZW50cmFsbHkgaW1wb3J0IGFsbCBtYXRlcmlhbCBjb21wb25lbnRzXG4gKi9cbkBOZ01vZHVsZSh7XG4gIGV4cG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgUmVhY3RpdmVGb3Jtc01vZHVsZSxcblxuICAgIE1hdEF1dG9jb21wbGV0ZU1vZHVsZSxcbiAgICBNYXRTaWRlbmF2TW9kdWxlLFxuICAgIE1hdEJ1dHRvbk1vZHVsZSxcbiAgICBNYXRJY29uTW9kdWxlLFxuICAgIE1hdExpc3RNb2R1bGUsXG4gICAgTWF0SW5wdXRNb2R1bGUsXG4gICAgTWF0RGlhbG9nTW9kdWxlLFxuICAgIE1hdFRvb2xiYXJNb2R1bGUsXG4gICAgTWF0UHJvZ3Jlc3NCYXJNb2R1bGUsXG4gICAgTWF0RXhwYW5zaW9uTW9kdWxlLFxuICAgIE1hdFNlbGVjdE1vZHVsZSxcbiAgICBNYXRUYWJzTW9kdWxlLFxuICAgIE1hdFNuYWNrQmFyTW9kdWxlLFxuICAgIE1hdFNsaWRlVG9nZ2xlTW9kdWxlLFxuICAgIE1hdENoaXBzTW9kdWxlLFxuICAgIE1hdENhcmRNb2R1bGUsXG4gICAgTWF0Q2hlY2tib3hNb2R1bGUsXG4gICAgTWF0U2xpZGVyTW9kdWxlLFxuICAgIE1hdFRhYmxlTW9kdWxlLFxuICAgIE1hdFBhZ2luYXRvck1vZHVsZSxcbiAgICBNYXRTb3J0TW9kdWxlLFxuICAgIE1hdE1lbnVNb2R1bGUsXG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgTWF0ZXJpYWxNb2R1bGUgeyB9XG4iLCIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxOCBBZHJpYW4gUGFuZWxsYSA8aWFuY2hpNzRAb3V0bG9vay5jb20+XG4gKlxuICogVGhpcyBzb2Z0d2FyZSBpcyByZWxlYXNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuXG4gKiBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL01JVFxuICovXG5cblxuaW1wb3J0IHsgQ29tcG9uZW50LCBWaWV3RW5jYXBzdWxhdGlvbiwgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENoYW5nZURldGVjdG9yUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBFeHByZXNzaW9ucywgQWJzdHJhY3RGb3JtRmllbGRXaWRnZXQgfSBmcm9tICcuLi8uLi8uLi9jb3JlL2luZGV4JztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnd2RnLWlucHV0JyxcbiAgdGVtcGxhdGU6IGA8bWF0LWZvcm0tZmllbGQgc3R5bGUud2lkdGg9XCIxMDAlXCI+XG5cbiAgICA8bWF0LWxhYmVsICpuZ0lmPVwidGl0bGVcIj5cbiAgICAgICAge3sgdGl0bGUgfX1cbiAgICA8L21hdC1sYWJlbD5cblxuICAgIDxpbnB1dCBtYXRJbnB1dFxuICAgICAgICAgICBuYW1lPVwiYWFhXCJcbiAgICAgICAgICAgW3R5cGVdPVwidHlwZSB8fCAndGV4dCdcIlxuICAgICAgICAgICBbZm9ybUNvbnRyb2xdPVwiZm9ybUNvbnRyb2xcIlxuICAgICAgICAgICBbcGxhY2Vob2xkZXJdPVwicGxhY2Vob2xkZXJcIlxuICAgICAgICAgICBbcmVxdWlyZWRdPVwicmVxdWlyZWRcIj5cblxuICAgIDxtYXQtZXJyb3IgW2lkXT1cIm51bGxcIj5cblxuICAgIDwvbWF0LWVycm9yPlxuXG4gICAgPG1hdC1oaW50ICpuZ0lmPVwiZGVzY3JpcHRpb25cIlxuICAgICAgICAgICAgICBbaWRdPVwibnVsbFwiPlxuICAgICAgICB7eyBkZXNjcmlwdGlvbiB9fVxuICAgIDwvbWF0LWhpbnQ+XG5cbjwvbWF0LWZvcm0tZmllbGQ+XG5gLFxuICBzdHlsZXM6IFtgYF0sXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXG59KVxuZXhwb3J0IGNsYXNzIElucHV0V2lkZ2V0Q29tcG9uZW50IGV4dGVuZHMgQWJzdHJhY3RGb3JtRmllbGRXaWRnZXQge1xuXG4gIHRpdGxlOiBzdHJpbmc7XG4gIGRlc2NyaXB0aW9uOiBzdHJpbmc7XG4gIHBsYWNlaG9sZGVyOiBzdHJpbmc7XG4gIHJlcXVpcmVkOiBib29sZWFuO1xuXG4gIGNvbnN0cnVjdG9yKGNkcjogQ2hhbmdlRGV0ZWN0b3JSZWYsIGV4cHI6IEV4cHJlc3Npb25zKSB7XG4gICAgc3VwZXIoY2RyLCBleHByKTtcbiAgfVxuXG59XG4iLCIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxOCBBZHJpYW4gUGFuZWxsYSA8aWFuY2hpNzRAb3V0bG9vay5jb20+XG4gKlxuICogVGhpcyBzb2Z0d2FyZSBpcyByZWxlYXNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuXG4gKiBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL01JVFxuICovXG5cblxuaW1wb3J0IHsgQ29tcG9uZW50LCBWaWV3RW5jYXBzdWxhdGlvbiwgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENoYW5nZURldGVjdG9yUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBFeHByZXNzaW9ucywgQWJzdHJhY3RGb3JtRmllbGRXaWRnZXQgfSBmcm9tICcuLi8uLi8uLi9jb3JlL2luZGV4JztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnd2RnLWNoZWNrYm94JyxcbiAgdGVtcGxhdGU6IGA8bWF0LWNoZWNrYm94IGxhYmVsUG9zaXRpb249XCJiZWZvcmVcIiBbZm9ybUNvbnRyb2xdPVwiZm9ybUNvbnRyb2xcIj5cbiAge3t0aXRsZX19XG48L21hdC1jaGVja2JveD5cbmAsXG4gIHN0eWxlczogW2BgXSxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcbn0pXG5leHBvcnQgY2xhc3MgQ2hlY2tib3hXaWRnZXRDb21wb25lbnQgZXh0ZW5kcyBBYnN0cmFjdEZvcm1GaWVsZFdpZGdldCB7XG4gIHRpdGxlOiBzdHJpbmc7XG4gIGNvbnN0cnVjdG9yKGNkcjogQ2hhbmdlRGV0ZWN0b3JSZWYsIGV4cHI6IEV4cHJlc3Npb25zKSB7XG4gICAgc3VwZXIoY2RyLCBleHByKTtcbiAgfVxuXG59XG4iLCIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxOCBBZHJpYW4gUGFuZWxsYSA8aWFuY2hpNzRAb3V0bG9vay5jb20+XG4gKlxuICogVGhpcyBzb2Z0d2FyZSBpcyByZWxlYXNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuXG4gKiBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL01JVFxuICovXG5cblxuaW1wb3J0IHsgQ29tcG9uZW50LCBWaWV3RW5jYXBzdWxhdGlvbiwgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENoYW5nZURldGVjdG9yUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBFeHByZXNzaW9ucywgQWJzdHJhY3RGb3JtRmllbGRXaWRnZXQgfSBmcm9tICcuLi8uLi8uLi9jb3JlL2luZGV4JztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnd2RnLXRvZ2dsZScsXG4gIHRlbXBsYXRlOiBgPG1hdC1zbGlkZS10b2dnbGUgbGFiZWxQb3NpdGlvbj1cImJlZm9yZVwiPlxuICB7eyB0aXRsZX19XG48L21hdC1zbGlkZS10b2dnbGU+XG5gLFxuICBzdHlsZXM6IFtgYF0sXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXG59KVxuZXhwb3J0IGNsYXNzIFRvZ2dsZVdpZGdldENvbXBvbmVudCBleHRlbmRzIEFic3RyYWN0Rm9ybUZpZWxkV2lkZ2V0IHtcblxuICB0aXRsZTogc3RyaW5nO1xuXG4gIGNvbnN0cnVjdG9yKGNkcjogQ2hhbmdlRGV0ZWN0b3JSZWYsIGV4cHI6IEV4cHJlc3Npb25zKSB7XG4gICAgc3VwZXIoY2RyLCBleHByKTtcbiAgfVxuXG5cbn1cbiIsIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDE4IEFkcmlhbiBQYW5lbGxhIDxpYW5jaGk3NEBvdXRsb29rLmNvbT5cbiAqXG4gKiBUaGlzIHNvZnR3YXJlIGlzIHJlbGVhc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS5cbiAqIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvTUlUXG4gKi9cblxuXG5pbXBvcnQgeyBDb21wb25lbnQsIFZpZXdFbmNhcHN1bGF0aW9uLCBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ2hhbmdlRGV0ZWN0b3JSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEV4cHJlc3Npb25zLCBBYnN0cmFjdEZvcm1GaWVsZFdpZGdldCB9IGZyb20gJy4uLy4uLy4uL2NvcmUvaW5kZXgnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICd3ZGctc2xpZGVyJyxcbiAgdGVtcGxhdGU6IGA8c3Bhbj57e3RpdGxlfX08L3NwYW4+XG48bWF0LXNsaWRlciBbZm9ybUNvbnRyb2xdPVwiZm9ybUNvbnRyb2xcIj48L21hdC1zbGlkZXI+XG5gLFxuICBzdHlsZXM6IFtgYF0sXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXG59KVxuZXhwb3J0IGNsYXNzIFNsaWRlcldpZGdldENvbXBvbmVudCBleHRlbmRzIEFic3RyYWN0Rm9ybUZpZWxkV2lkZ2V0IHtcblxuICB0aXRsZTogc3RyaW5nO1xuXG4gIGNvbnN0cnVjdG9yKGNkcjogQ2hhbmdlRGV0ZWN0b3JSZWYsIGV4cHI6IEV4cHJlc3Npb25zKSB7XG4gICAgc3VwZXIoY2RyLCBleHByKTtcbiAgfVxuXG59XG4iLCIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxOCBBZHJpYW4gUGFuZWxsYSA8aWFuY2hpNzRAb3V0bG9vay5jb20+XG4gKlxuICogVGhpcyBzb2Z0d2FyZSBpcyByZWxlYXNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuXG4gKiBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL01JVFxuICovXG5cblxuaW1wb3J0IHsgQ29tcG9uZW50LCBWaWV3RW5jYXBzdWxhdGlvbiwgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENoYW5nZURldGVjdG9yUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IHRha2UgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBpc1JlYWN0aXZlIH0gZnJvbSAnZXNwcmVzc2lvbic7XG5pbXBvcnQgeyBBYnN0cmFjdFdpZGdldCwgRXhwcmVzc2lvbnMsIElXaWRnZXREZWYsIH0gZnJvbSAnLi4vLi4vLi4vY29yZS9pbmRleCc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3dkZy1idXR0b24nLFxuICB0ZW1wbGF0ZTogYDxidXR0b24gbWF0LWJ1dHRvbiAoY2xpY2spPVwiY2xpY2tFdmVudCgkZXZlbnQpXCI+XG4gIHt7dGl0bGV9fVxuPC9idXR0b24+XG5gLFxuICBzdHlsZXM6IFtgYF0sXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXG59KVxuZXhwb3J0IGNsYXNzIEJ1dHRvbldpZGdldENvbXBvbmVudCBleHRlbmRzIEFic3RyYWN0V2lkZ2V0IHtcblxuICB0aXRsZTogc3RyaW5nO1xuICBjbGljazogc3RyaW5nO1xuXG4gIHByaXZhdGUgX2x2YWx1ZTogeyBvLCBtIH07XG4gIHByaXZhdGUgX2NsaWNrU3ViczogU3Vic2NyaXB0aW9uO1xuICBjb25zdHJ1Y3RvcihjZHI6IENoYW5nZURldGVjdG9yUmVmLCBleHByOiBFeHByZXNzaW9ucykge1xuICAgIHN1cGVyKGNkciwgZXhwcik7XG4gIH1cblxuICBkeW5PblNldHVwKGRlZjogSVdpZGdldERlZikge1xuXG4gICAgaWYgKGRlZi5iaW5kKSB7XG5cbiAgICAgIGNvbnN0IGx2YWx1ZSA9IHRoaXMuX2V4cHIubHZhbHVlKGRlZi5iaW5kLCB0aGlzLmNvbnRleHQpO1xuXG4gICAgICBpZiAoIWx2YWx1ZSlcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdGb3JtIGZpZWxkIFwiYmluZFwiIHByb3BlcnR5IG11c3QgYmUgYW4gaWRlbnRpZmllciBvciBtZW1iZXIgZXhwcmVzc2lvbicpO1xuXG4gICAgICBpZiAoIWlzUmVhY3RpdmUobHZhbHVlLm8pKVxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0JvdW5kIEtleSBtdXN0IGJlIG9mIFJlYWN0aXZlIFR5cGUnKTtcblxuICAgICAgdGhpcy5fbHZhbHVlID0gbHZhbHVlO1xuICAgIH1cblxuICAgIHJldHVybiBkZWY7XG4gIH1cblxuICBjbGlja0V2ZW50KF9ldmVudCkge1xuXG4gICAgaWYgKHRoaXMuX2NsaWNrU3Vicykge1xuICAgICAgdGhpcy5fY2xpY2tTdWJzLnVuc3Vic2NyaWJlKCk7XG4gICAgICB0aGlzLl9jbGlja1N1YnMgPSBudWxsO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmNsaWNrKSB7XG4gICAgICB0aGlzLl9jbGlja1N1YnMgPSB0aGlzLl9leHByLmV2YWwodGhpcy5jbGljaywgdGhpcy5jb250ZXh0LCB0cnVlKS5waXBlKFxuICAgICAgICB0YWtlKDEpKS5zdWJzY3JpYmUocmVzID0+XG4gICAgICAgICAgdGhpcy5fbHZhbHVlLm9bdGhpcy5fbHZhbHVlLm1dID0gcmVzKTtcbiAgICB9XG4gIH1cbn1cbiIsIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDE4IEFkcmlhbiBQYW5lbGxhIDxpYW5jaGk3NEBvdXRsb29rLmNvbT5cbiAqXG4gKiBUaGlzIHNvZnR3YXJlIGlzIHJlbGVhc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS5cbiAqIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvTUlUXG4gKi9cblxuaW1wb3J0IHsgQ29tcG9uZW50LCBWaWV3RW5jYXBzdWxhdGlvbiwgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENoYW5nZURldGVjdG9yUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGb3JtR3JvdXAsIEZvcm1BcnJheSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IFJ4T2JqZWN0IH0gZnJvbSAnZXNwcmVzc2lvbic7XG5pbXBvcnQgeyBBYnN0cmFjdFdpZGdldCwgSVdpZGdldERlZiwgQ29udGV4dCwgRXhwcmVzc2lvbnMsIEZPUk1fQ09OVFJPTCB9IGZyb20gJy4uLy4uLy4uL2NvcmUvaW5kZXgnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICd3ZGctZm9ybScsXG4gIHRlbXBsYXRlOiBgPG5nLWNvbnRhaW5lciAqbmdGb3I9XCJsZXQgZWxlbWVudCBvZiBjb250ZW50XCIgW3dkZ1dpZGdldF09XCJlbGVtZW50XCIgW3BhcmVudENvbnRleHRdPVwiY29udGV4dFwiPlxuXG48L25nLWNvbnRhaW5lcj5cbmAsXG4gIHN0eWxlczogW2BgXSxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcbn0pXG5leHBvcnQgY2xhc3MgRm9ybVdpZGdldENvbXBvbmVudCBleHRlbmRzIEFic3RyYWN0V2lkZ2V0IHtcblxuICBmb3JtR3JvdXA6IEZvcm1Hcm91cDtcbiAgY29uc3RydWN0b3IoY2RyOiBDaGFuZ2VEZXRlY3RvclJlZiwgZXhwcjogRXhwcmVzc2lvbnMpIHtcbiAgICBzdXBlcihjZHIsIGV4cHIpO1xuICB9XG5cbiAgZHluT25TZXR1cChkZWY6IElXaWRnZXREZWYpIHtcblxuICAgIHRoaXMuZm9ybUdyb3VwID0gbmV3IEZvcm1Hcm91cCh7fSk7XG5cbiAgICAvLyByZWdpc3RlciB3aXRoIHBhcmVudCBmb3JtLCBpZiBhbnlcbiAgICBjb25zdCBwYXJlbnRGb3JtOiBGb3JtR3JvdXAgfCBGb3JtQXJyYXkgPSB0aGlzLmNvbnRleHRbRk9STV9DT05UUk9MXTtcbiAgICBpZiAocGFyZW50Rm9ybSkge1xuICAgICAgaWYgKHBhcmVudEZvcm0gaW5zdGFuY2VvZiBGb3JtR3JvdXApIHBhcmVudEZvcm0uYWRkQ29udHJvbCgnY29udHJvbCcsIHRoaXMuZm9ybUdyb3VwKTtcbiAgICAgIGVsc2UgaWYgKHBhcmVudEZvcm0gaW5zdGFuY2VvZiBGb3JtQXJyYXkpIHBhcmVudEZvcm0ucHVzaCh0aGlzLmZvcm1Hcm91cCk7XG4gICAgfVxuXG4gICAgLy8gc2F2ZSB0aGlzIEZvcm1Hcm91cCBhcyBwYXJlbnQgZm9ybSBmb3IgdGhlIGNoaWxkcmVuXG4gICAgQ29udGV4dC5kZWZpbmVIaWRkZW4odGhpcy5jb250ZXh0LCB7IFtGT1JNX0NPTlRST0xdOiB0aGlzLmZvcm1Hcm91cCB9KTtcblxuICAgIC8vIGNyZWF0ZSBhIFN0b3JlIGZvciB0aGUgdmFyaWFibGVzXG5cbiAgICB0aGlzLmNvbnRleHRbJyRtb2RlbCddID0gUnhPYmplY3Qoe30pO1xuICAgIHJldHVybiBkZWY7XG4gIH1cblxufVxuIiwiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTggQWRyaWFuIFBhbmVsbGEgPGlhbmNoaTc0QG91dGxvb2suY29tPlxuICpcbiAqIFRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLlxuICogaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9NSVRcbiAqL1xuXG5pbXBvcnQgeyBDb21wb25lbnQsIFZpZXdFbmNhcHN1bGF0aW9uLCBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ2hhbmdlRGV0ZWN0b3JSZWYsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgbWFwLCBzdGFydFdpdGggfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBFeHByZXNzaW9ucywgQWJzdHJhY3RGb3JtRmllbGRXaWRnZXQgfSBmcm9tICcuLi8uLi8uLi9jb3JlL2luZGV4JztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnd2RnLWF1dG9jb21wbGV0ZScsXG4gIHRlbXBsYXRlOiBgPG1hdC1mb3JtLWZpZWxkIHN0eWxlLndpZHRoPVwiMTAwJVwiPlxuXG4gIDxtYXQtbGFiZWwgKm5nSWY9XCJ0aXRsZVwiPlxuICAgIHt7IHRpdGxlIH19XG4gIDwvbWF0LWxhYmVsPlxuXG4gIDxpbnB1dCBtYXRJbnB1dCBuYW1lPVwiYWFhXCIgW3R5cGVdPVwidHlwZSB8fCAndGV4dCdcIiBbZm9ybUNvbnRyb2xdPVwiZm9ybUNvbnRyb2xcIiBbcGxhY2Vob2xkZXJdPVwicGxhY2Vob2xkZXJcIlxuICAgIFttYXRBdXRvY29tcGxldGVdPVwiYXV0b1wiPlxuXG4gIDxtYXQtZXJyb3IgW2lkXT1cIm51bGxcIj5cblxuICA8L21hdC1lcnJvcj5cblxuICA8bWF0LWhpbnQgKm5nSWY9XCJkZXNjcmlwdGlvblwiIFtpZF09XCJudWxsXCI+XG4gICAge3sgZGVzY3JpcHRpb24gfX1cbiAgPC9tYXQtaGludD5cblxuICA8bWF0LWF1dG9jb21wbGV0ZSAjYXV0bz1cIm1hdEF1dG9jb21wbGV0ZVwiPlxuICAgIDxtYXQtb3B0aW9uICpuZ0Zvcj1cImxldCBvcHRpb24gb2YgZmlsdGVyZWRPcHRpb25zIHwgYXN5bmM7IGluZGV4IGFzIG9wdEluZGV4XCIgW3ZhbHVlXT1cIm9wdGlvblwiPlxuICAgICAge3tvcHRpb259fVxuICAgIDwvbWF0LW9wdGlvbj5cbiAgPC9tYXQtYXV0b2NvbXBsZXRlPlxuXG48L21hdC1mb3JtLWZpZWxkPlxuYCxcbiAgc3R5bGVzOiBbYGBdLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBBdXRvY29tcGxldGVXaWRnZXRDb21wb25lbnQgZXh0ZW5kcyBBYnN0cmFjdEZvcm1GaWVsZFdpZGdldCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgdGl0bGU6IHN0cmluZztcbiAgZGVzY3JpcHRpb246IHN0cmluZztcbiAgcGxhY2Vob2xkZXI6IHN0cmluZztcblxuICBlbnVtOiBzdHJpbmdbXSA9IFtdO1xuICBlbnVtTGFiZWw6IHN0cmluZ1tdO1xuICBmaWx0ZXJlZE9wdGlvbnM6IE9ic2VydmFibGU8c3RyaW5nW10+O1xuICBjb25zdHJ1Y3RvcihjZHI6IENoYW5nZURldGVjdG9yUmVmLCBleHByOiBFeHByZXNzaW9ucykge1xuICAgIHN1cGVyKGNkciwgZXhwcik7XG4gIH1cblxuXG5cbiAgZHluT25CZWZvcmVCaW5kKCkge1xuICAgIHRoaXMubWFwKCdlbnVtJywgdmFsID0+IHtcbiAgICAgIHJldHVybiBBcnJheS5pc0FycmF5KHZhbCkgPyB2YWwgOiBbXTtcbiAgICB9KTtcbiAgfVxuXG4gIGR5bk9uQWZ0ZXJCaW5kKCkge1xuICAgIHRoaXMubWFwKCdlbnVtJywgdmFsID0+ICh0aGlzLl9maWx0ZXIodGhpcy5mb3JtQ29udHJvbC52YWx1ZSksIHZhbCkpO1xuICB9XG4gIG5nT25Jbml0KCkge1xuICAgIHN1cGVyLm5nT25Jbml0KCk7XG5cbiAgICB0aGlzLmZpbHRlcmVkT3B0aW9ucyA9IHRoaXMuZm9ybUNvbnRyb2wudmFsdWVDaGFuZ2VzXG4gICAgICAucGlwZShcbiAgICAgICAgc3RhcnRXaXRoKCcnKSxcbiAgICAgICAgbWFwKHZhbHVlID0+IHRoaXMuX2ZpbHRlcih2YWx1ZSkpXG4gICAgICApO1xuICB9XG5cbiAgcHJpdmF0ZSBfZmlsdGVyKHZhbHVlOiBzdHJpbmcpOiBzdHJpbmdbXSB7XG5cbiAgICBjb25zdCBmaWx0ZXJWYWx1ZSA9IHZhbHVlICYmIHZhbHVlLnRvTG93ZXJDYXNlKCk7XG5cbiAgICByZXR1cm4gdGhpcy5lbnVtLmZpbHRlcihvcHRpb24gPT4gb3B0aW9uLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMoZmlsdGVyVmFsdWUpKTtcbiAgfVxuXG59XG4iLCIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxOCBBZHJpYW4gUGFuZWxsYSA8aWFuY2hpNzRAb3V0bG9vay5jb20+XG4gKlxuICogVGhpcyBzb2Z0d2FyZSBpcyByZWxlYXNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuXG4gKiBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL01JVFxuICovXG5cblxuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgTWF0ZXJpYWxNb2R1bGUgfSBmcm9tICcuLi9tYXRlcmlhbC5tb2R1bGUnO1xuaW1wb3J0IHsgV2lkZ2V0c0NvcmVNb2R1bGUgfSBmcm9tICcuLi8uLi9jb3JlL2luZGV4JztcblxuaW1wb3J0IHsgSW5wdXRXaWRnZXRDb21wb25lbnQgfSBmcm9tICcuL2lucHV0L2lucHV0LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBDaGVja2JveFdpZGdldENvbXBvbmVudCB9IGZyb20gJy4vY2hlY2tib3gvY2hlY2tib3guY29tcG9uZW50JztcbmltcG9ydCB7IFRvZ2dsZVdpZGdldENvbXBvbmVudCB9IGZyb20gJy4vdG9nZ2xlL3RvZ2dsZS5jb21wb25lbnQnO1xuaW1wb3J0IHsgU2xpZGVyV2lkZ2V0Q29tcG9uZW50IH0gZnJvbSAnLi9zbGlkZXIvc2xpZGVyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBCdXR0b25XaWRnZXRDb21wb25lbnQgfSBmcm9tICcuL2J1dHRvbi9idXR0b24uY29tcG9uZW50JztcbmltcG9ydCB7IEZvcm1XaWRnZXRDb21wb25lbnQgfSBmcm9tICcuL2Zvcm0vZm9ybS5jb21wb25lbnQnO1xuaW1wb3J0IHsgQXV0b2NvbXBsZXRlV2lkZ2V0Q29tcG9uZW50IH0gZnJvbSAnLi9hdXRvY29tcGxldGUvYXV0b2NvbXBsZXRlLmNvbXBvbmVudCc7XG5cblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIE1hdGVyaWFsTW9kdWxlLFxuXG4gICAgV2lkZ2V0c0NvcmVNb2R1bGUuZm9yUm9vdCh7XG4gICAgICB3aWRnZXRzOiBbXG4gICAgICAgIHsgdHlwZTogJ2lucHV0JywgY29tcG9uZW50OiBJbnB1dFdpZGdldENvbXBvbmVudCB9LFxuICAgICAgICB7IHR5cGU6ICdjaGVja2JveCcsIGNvbXBvbmVudDogQ2hlY2tib3hXaWRnZXRDb21wb25lbnQgfSxcbiAgICAgICAgeyB0eXBlOiAndG9nZ2xlJywgY29tcG9uZW50OiBUb2dnbGVXaWRnZXRDb21wb25lbnQgfSxcbiAgICAgICAgeyB0eXBlOiAnc2xpZGVyJywgY29tcG9uZW50OiBTbGlkZXJXaWRnZXRDb21wb25lbnQgfSxcbiAgICAgICAgeyB0eXBlOiAnYnV0dG9uJywgY29tcG9uZW50OiBCdXR0b25XaWRnZXRDb21wb25lbnQgfSxcbiAgICAgICAgeyB0eXBlOiAnZm9ybScsIGNvbXBvbmVudDogRm9ybVdpZGdldENvbXBvbmVudCB9LFxuICAgICAgICB7IHR5cGU6ICdhdXRvY29tcGxldGUnLCBjb21wb25lbnQ6IEF1dG9jb21wbGV0ZVdpZGdldENvbXBvbmVudCB9LFxuXG4gICAgICBdXG4gICAgfSlcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgSW5wdXRXaWRnZXRDb21wb25lbnQsXG4gICAgQ2hlY2tib3hXaWRnZXRDb21wb25lbnQsXG4gICAgVG9nZ2xlV2lkZ2V0Q29tcG9uZW50LFxuICAgIFNsaWRlcldpZGdldENvbXBvbmVudCxcbiAgICBCdXR0b25XaWRnZXRDb21wb25lbnQsXG4gICAgRm9ybVdpZGdldENvbXBvbmVudCxcbiAgICBBdXRvY29tcGxldGVXaWRnZXRDb21wb25lbnRcbiAgXSxcbiAgZXhwb3J0czogW11cbn0pXG5leHBvcnQgY2xhc3MgRm9ybUZpZWxkV2lkZ2V0c01vZHVsZSB7IH1cbiIsIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDE4IEFkcmlhbiBQYW5lbGxhIDxpYW5jaGk3NEBvdXRsb29rLmNvbT5cbiAqXG4gKiBUaGlzIHNvZnR3YXJlIGlzIHJlbGVhc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS5cbiAqIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvTUlUXG4gKi9cblxuXG5pbXBvcnQgeyBDb21wb25lbnQsIFZpZXdFbmNhcHN1bGF0aW9uLCBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ2hhbmdlRGV0ZWN0b3JSZWZ9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQWJzdHJhY3RXaWRnZXQsIElXaWRnZXREZWYsIEV4cHJlc3Npb25zIH0gZnJvbSAnLi4vLi4vLi4vY29yZS9pbmRleCc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3dkZy1jYXJkJyxcbiAgdGVtcGxhdGU6IGA8bWF0LWNhcmQ+XG4gIDxtYXQtY2FyZC10aXRsZSAqbmdJZj1cInRpdGxlXCI+e3t0aXRsZX19PC9tYXQtY2FyZC10aXRsZT5cbiAgPG1hdC1jYXJkLXN1YnRpdGxlICpuZ0lmPVwiZGVzY3JpcHRpb25cIj57e2Rlc2NyaXB0aW9ufX08L21hdC1jYXJkLXN1YnRpdGxlPlxuICA8bWF0LWNhcmQtY29udGVudD5cbiAgICA8bmctY29udGFpbmVyICpuZ0Zvcj1cImxldCBlbGVtZW50IG9mIGNvbnRlbnRcIiBbd2RnV2lkZ2V0XT1cImVsZW1lbnRcIiBbcGFyZW50Q29udGV4dF09XCJjb250ZXh0XCI+PC9uZy1jb250YWluZXI+XG4gIDwvbWF0LWNhcmQtY29udGVudD5cbiAgPG1hdC1jYXJkLWFjdGlvbnMgYWxpZ249XCJlbmRcIiAqbmdJZj1cImFjdGlvbnNcIj5cbiAgICA8bmctY29udGFpbmVyICpuZ0Zvcj1cImxldCBlbGVtZW50IG9mIGFjdGlvbnNcIiBbd2RnV2lkZ2V0XT1cImVsZW1lbnRcIiBbcGFyZW50Q29udGV4dF09XCJjb250ZXh0XCI+PC9uZy1jb250YWluZXI+XG4gIDwvbWF0LWNhcmQtYWN0aW9ucz5cbjwvbWF0LWNhcmQ+XG5gLFxuICBzdHlsZXM6IFtgYF0sXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXG59KVxuZXhwb3J0IGNsYXNzIENhcmRXaWRnZXRDb21wb25lbnQgZXh0ZW5kcyBBYnN0cmFjdFdpZGdldCB7XG5cbiAgdGl0bGU6IHN0cmluZztcbiAgZGVzY3JpcHRpb246IHN0cmluZztcbiAgYWN0aW9uczogSVdpZGdldERlZltdO1xuXG4gIGNvbnN0cnVjdG9yKGNkcjogQ2hhbmdlRGV0ZWN0b3JSZWYsIGV4cHI6IEV4cHJlc3Npb25zKSB7XG4gICAgc3VwZXIoY2RyLCBleHByKTtcbiAgfVxuXG59XG4iLCIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxOCBBZHJpYW4gUGFuZWxsYSA8aWFuY2hpNzRAb3V0bG9vay5jb20+XG4gKlxuICogVGhpcyBzb2Z0d2FyZSBpcyByZWxlYXNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuXG4gKiBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL01JVFxuICovXG5cblxuaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIFZpZXdFbmNhcHN1bGF0aW9uLCBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ2hhbmdlRGV0ZWN0b3JSZWYsIFZpZXdDaGlsZH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBpc09ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IE1hdFRhYmxlRGF0YVNvdXJjZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL3RhYmxlJztcbmltcG9ydCB7IE1hdFBhZ2luYXRvciB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL3BhZ2luYXRvcic7XG5pbXBvcnQgeyBNYXRTb3J0IH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvc29ydCc7XG5pbXBvcnQgeyBBYnN0cmFjdFdpZGdldCwgQ29udGV4dCwgRXhwcmVzc2lvbnMsIHBhcnNlRGVmT2JqZWN0IH0gZnJvbSAnLi4vLi4vLi4vY29yZS9pbmRleCc7XG5pbXBvcnQgeyBjb21iaW5lTWl4ZWQgfSBmcm9tICdlc3ByZXNzaW9uJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnd2RnLXRhYmxlJyxcbiAgdGVtcGxhdGU6IGA8ZGl2PlxuICA8c2VjdGlvbiBjbGFzcz1cInRhYmxlLXRpdGxlXCI+XG4gICAgPGg2Pnt7dGl0bGV9fTwvaDY+XG5cbiAgICA8ZGl2IGNsYXNzPVwic3BhY2VyXCI+PC9kaXY+XG5cbiAgICA8bWF0LWZvcm0tZmllbGQgKm5nSWY9XCJmaWx0ZXJCeVwiPlxuICAgICAgPGlucHV0IG1hdElucHV0IChrZXl1cCk9XCJhcHBseUZpbHRlcigkZXZlbnQudGFyZ2V0LnZhbHVlKVwiIHBsYWNlaG9sZGVyPVwiRmlsdGVyXCI+XG4gICAgPC9tYXQtZm9ybS1maWVsZD5cbiAgPC9zZWN0aW9uPlxuXG4gIDxzZWN0aW9uIGNsYXNzPVwibWF0LWVsZXZhdGlvbi16MVwiPlxuICAgIDx0YWJsZSBtYXQtdGFibGUgW2RhdGFTb3VyY2VdPVwidGFibGVEYXRhU291cmNlXCIgbWF0U29ydCBbbWF0U29ydERpc2FibGVkXT1cIiFkaXNhYmxlU29ydFwiPlxuXG4gICAgICA8IS0tIER5bmFtaWMgQ29sdW1uIGRlZmluaXRpb25zLS0+XG4gICAgICA8bmctY29udGFpbmVyIFttYXRDb2x1bW5EZWZdPVwiY29sS2V5XCIgKm5nRm9yPVwibGV0IGNvbEtleSBvZiBjb2xLZXlzOyBpbmRleCBhcyBjb2xJbmRleFwiPlxuICAgICAgICA8dGggbWF0LWhlYWRlci1jZWxsICptYXRIZWFkZXJDZWxsRGVmIG1hdC1zb3J0LWhlYWRlciBbZGlzYWJsZWRdPVwiZGlzYWJsZVNvcnQ/LmluZGV4T2YoY29sS2V5KSA+PSAwXCI+IHt7Y29sSGVhZGVyc1tjb2xJbmRleF0gfHwgY29sS2V5fX0gPC90aD5cbiAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cImNvbEZvcm1hdCAmJiBjb2xGb3JtYXRbY29sSW5kZXhdOyBlbHNlIG5vRm9ybWF0Q2VsbERlZlwiPlxuICAgICAgICAgIDx0ZCBtYXQtY2VsbCAqbWF0Q2VsbERlZj1cImxldCByb3dEYXRhXCI+e3tyb3dEYXRhW2NvbEtleV0gfCBmb3JtYXQ6Y29sRm9ybWF0W2NvbEluZGV4XX19PC90ZD5cbiAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgIDxuZy10ZW1wbGF0ZSAjbm9Gb3JtYXRDZWxsRGVmPlxuICAgICAgICAgIDx0ZCBtYXQtY2VsbCAqbWF0Q2VsbERlZj1cImxldCByb3dEYXRhXCI+e3tyb3dEYXRhW2NvbEtleV19fTwvdGQ+XG4gICAgICAgIDwvbmctdGVtcGxhdGU+XG4gICAgICA8L25nLWNvbnRhaW5lcj5cblxuICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cImFjdGlvbnM/Lmxlbmd0aFwiIFttYXRDb2x1bW5EZWZdPVwiJ19fYWN0aW9uc19fJ1wiPlxuICAgICAgICA8dGggbWF0LWhlYWRlci1jZWxsICptYXRIZWFkZXJDZWxsRGVmID4ge3thY3Rpb25zSGVhZGVyIHx8ICdBY3Rpb25zJ319IDwvdGg+XG4gICAgICAgIDx0ZCBtYXQtY2VsbCAqbWF0Q2VsbERlZj1cImxldCByb3dEYXRhXCI+XG4gICAgICAgICAgPGJ1dHRvbiBtYXQtaWNvbi1idXR0b24gW21hdE1lbnVUcmlnZ2VyRm9yXT1cIm1lbnVcIj5cbiAgICAgICAgICAgIDxtYXQtaWNvbiBzdmdJY29uPVwiZG90cy12ZXJ0aWNhbFwiPjwvbWF0LWljb24+XG4gICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgPG1hdC1tZW51ICNtZW51PVwibWF0TWVudVwiPlxuXG4gICAgICAgICAgICA8YnV0dG9uIG1hdC1tZW51LWl0ZW0gKm5nRm9yPVwibGV0IGFjdGlvbiBvZiBhY3Rpb25zOyBpbmRleCBhcyBhY3Rpb25JbmRleFwiIChjbGljayk9XCJhY3Rpb25DbGljayhyb3dEYXRhLCBhY3Rpb25JbmRleClcIj5cbiAgICAgICAgICAgICAgPG1hdC1pY29uIFtzdmdJY29uXT1cImFjdGlvbnNbYWN0aW9uSW5kZXhdLmljb25cIj48L21hdC1pY29uPlxuICAgICAgICAgICAgICA8c3Bhbj57e2FjdGlvbnNbYWN0aW9uSW5kZXhdLmxhYmVsfX08L3NwYW4+XG4gICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICA8L21hdC1tZW51PlxuICAgICAgICA8L3RkPlxuICAgICAgPC9uZy1jb250YWluZXI+XG5cblxuICAgICAgPCEtLSBSb3cgZGVmaW5pdGlvbnMtLT5cbiAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJjb2xIZWFkZXJzXCI+XG4gICAgICAgIDx0ciBtYXQtaGVhZGVyLXJvdyAqbWF0SGVhZGVyUm93RGVmPVwic2hvd0NvbHNcIiBjbGFzcz1cImhlYWRlci1yb3dcIj48L3RyPlxuICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICA8dHIgbWF0LXJvdyAqbWF0Um93RGVmPVwibGV0IGVsZW1lbnQ7IGNvbHVtbnM6IHNob3dDb2xzO1wiIGNsYXNzPVwiZGF0YS1yb3dcIj48L3RyPlxuICAgIDwvdGFibGU+XG5cbiAgICA8bWF0LXBhZ2luYXRvciBbY2xhc3MuaGlkZGVuUGFnaW5hdG9yXT1cIiFwYWdlU2l6ZXNcIiBbcGFnZVNpemVPcHRpb25zXT1cInBhZ2VTaXplc1wiIFtoaWRlUGFnZVNpemVdPVwicGFnZVNpemVzPy5sZW5ndGg8PTFcIj48L21hdC1wYWdpbmF0b3I+XG4gIDwvc2VjdGlvbj5cbjwvZGl2PlxuYCxcbiAgc3R5bGVzOiBbYHdkZy10YWJsZSB0YWJsZXt3aWR0aDoxMDAlfXdkZy10YWJsZSB0ci5kYXRhLXJvdzpob3ZlcntiYWNrZ3JvdW5kOiNmNWY1ZjV9d2RnLXRhYmxlIHRyLmRhdGEtcm93OmFjdGl2ZXtiYWNrZ3JvdW5kOiNlZmVmZWZ9d2RnLXRhYmxlIC5kYXRhLXJvdyB0ZHtib3JkZXItYm90dG9tLXdpZHRoOjB9d2RnLXRhYmxlIG1hdC1wYWdpbmF0b3IuaGlkZGVuUGFnaW5hdG9ye2Rpc3BsYXk6bm9uZX13ZGctdGFibGUgLnRhYmxlLXRpdGxle2Rpc3BsYXk6ZmxleDtmbGV4LWZsb3c6cm93fXdkZy10YWJsZSAudGFibGUtdGl0bGU+KntmbGV4OjAgMCBhdXRvfXdkZy10YWJsZSAudGFibGUtdGl0bGUgLnNwYWNlcntmbGV4OjEgMSBhdXRvfWBdLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBUYWJsZVdpZGdldENvbXBvbmVudCBleHRlbmRzIEFic3RyYWN0V2lkZ2V0IGltcGxlbWVudHMgT25Jbml0IHtcblxuICB0aXRsZTogc3RyaW5nO1xuICBkYXRhU291cmNlOiBPYnNlcnZhYmxlPGFueVtdPiB8IGFueVtdO1xuICB0YWJsZURhdGFTb3VyY2U6IE1hdFRhYmxlRGF0YVNvdXJjZTx7IFtwcm9wOiBzdHJpbmddOiBhbnkgfT47XG5cbiAgY29sS2V5czogc3RyaW5nW107XG4gIGNvbEhlYWRlcnM6IHN0cmluZ1tdO1xuICBjb2xzVmlzaWJsZTogc3RyaW5nW107XG4gIHBhZ2VTaXplczogbnVtYmVyW107XG4gIGZpbHRlckJ5OiBzdHJpbmdbXTtcbiAgZGlzYWJsZVNvcnQ6IHN0cmluZ1tdID0gW107XG5cbiAgY29sVHJhbnNmb3JtOiBzdHJpbmdbXTtcbiAgY29sRm9ybWF0OiBzdHJpbmdbXTtcblxuICBhY3Rpb25zOiB7IGljb246IHN0cmluZywgbGFiZWw6IHN0cmluZywgYWN0aW9uOiBzdHJpbmcgfVtdID0gW107XG4gIGFjdGlvbnNIZWFkZXI6IHN0cmluZztcbiAgc2hvd0NvbHM6IHN0cmluZ1tdO1xuXG4gIEBWaWV3Q2hpbGQoTWF0UGFnaW5hdG9yKSBwYWdpbmF0b3I6IE1hdFBhZ2luYXRvcjtcbiAgQFZpZXdDaGlsZChNYXRTb3J0KSBzb3J0OiBNYXRTb3J0O1xuXG4gIGNvbnN0cnVjdG9yKGNkcjogQ2hhbmdlRGV0ZWN0b3JSZWYsIGV4cHI6IEV4cHJlc3Npb25zKSB7XG4gICAgc3VwZXIoY2RyLCBleHByKTtcbiAgICB0aGlzLnRhYmxlRGF0YVNvdXJjZSA9IG5ldyBNYXRUYWJsZURhdGFTb3VyY2UoKTtcbiAgfVxuXG4gIGR5bk9uQmVmb3JlQmluZCgpIHtcblxuICAgIGNvbnN0IG9wdCA9IHRoaXMud2lkZ2V0RGVmLm9wdGlvbnM7XG5cblxuICAgIC8vIGlmIHRoZSBvbmx5IHNvdXJjZSBpcyBhIHN0YXRpYyBhcnJheSwgbGV0cyBjaGVjayBpZiBpdCBoYXMgJ3Byb3BlcnR5PScgY29sdW1ucyB0byBldmFsdWF0ZVxuICAgIC8vIGFuZCBhZGQgdGhlIGF1dG8gYmluZGluZ1xuICAgIGlmIChvcHQgJiYgIW9wdFsnZGF0YVNvdXJjZT0nXSAmJlxuICAgICAgQXJyYXkuaXNBcnJheShvcHQuZGF0YVNvdXJjZSkpIHtcblxuICAgICAgY29uc3QgZGF0YVNvdXJjZSA9IDxPYnNlcnZhYmxlPGFueVtdPj5jb21iaW5lTWl4ZWQob3B0LmRhdGFTb3VyY2UubWFwKHJvdyA9PlxuICAgICAgICBjb21iaW5lTWl4ZWQocGFyc2VEZWZPYmplY3Qocm93LCB0aGlzLmNvbnRleHQsIGZhbHNlLCB0aGlzLl9leHByKSksIGZhbHNlKSwgZmFsc2UpO1xuICAgICAgaWYgKGlzT2JzZXJ2YWJsZShkYXRhU291cmNlKSkgdGhpcy5iaW5kaW5ncy5kYXRhU291cmNlID0gZGF0YVNvdXJjZTtcbiAgICAgIGVsc2UgdGhpcy5kYXRhU291cmNlID0gZGF0YVNvdXJjZTtcbiAgICB9XG5cblxuICAgIHRoaXMubWFwKCdkaXNhYmxlU29ydCcsIHNvcnQgPT4ge1xuICAgICAgaWYgKHNvcnQgPT09IHRydWUpIHJldHVybiBudWxsO1xuICAgICAgaWYgKCFBcnJheS5pc0FycmF5KHNvcnQpKSByZXR1cm4gW107XG4gICAgICByZXR1cm4gc29ydDtcblxuICAgIH0pO1xuXG4gICAgdGhpcy5tYXAoJ2RhdGFTb3VyY2UnLCAodGFibGU6IGFueVtdKSA9PlxuICAgICAgdGhpcy50YWJsZURhdGFTb3VyY2UuZGF0YSA9IHRhYmxlLm1hcChyb3cgPT4ge1xuICAgICAgICByb3cgPSBwYXJzZURlZk9iamVjdChyb3csIENvbnRleHQuY3JlYXRlKHRoaXMuY29udGV4dCwgeyAkZGF0YTogcm93IH0pLCBmYWxzZSwgdGhpcy5fZXhwcik7XG5cbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkodGhpcy5jb2xUcmFuc2Zvcm0pKSB7XG5cbiAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuY29sVHJhbnNmb3JtLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5jb2xUcmFuc2Zvcm1baV0pIHtcbiAgICAgICAgICAgICAgY29uc3QgY29udGV4dDogYW55ID0gQ29udGV4dC5jcmVhdGUodGhpcy5jb250ZXh0KTtcbiAgICAgICAgICAgICAgY29udGV4dC4kZGF0YSA9IHJvd1t0aGlzLmNvbEtleXNbaV1dO1xuICAgICAgICAgICAgICByb3dbdGhpcy5jb2xLZXlzW2ldXSA9IHRoaXMuX2V4cHIuZXZhbCh0aGlzLmNvbFRyYW5zZm9ybVtpXSwgY29udGV4dCwgZmFsc2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHJvdztcbiAgICAgIH0pXG4gICAgKTtcblxuICAgIHRoaXMubWFwKCdwYWdlU2l6ZXMnLCAodmFsdWUpID0+IHtcbiAgICAgIGlmICghQXJyYXkuaXNBcnJheSh2YWx1ZSkgfHwgIXZhbHVlLmxlbmd0aCkge1xuICAgICAgICB0aGlzLnRhYmxlRGF0YVNvdXJjZS5wYWdpbmF0b3IgPSBudWxsO1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH1cbiAgICAgIHRoaXMudGFibGVEYXRhU291cmNlLnBhZ2luYXRvciA9IHRoaXMucGFnaW5hdG9yO1xuICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH0pO1xuXG4gICAgdGhpcy5tYXAoJ2NvbEtleXMnLCBrZXlzID0+IHtcbiAgICAgIGlmICh0aGlzLmFjdGlvbnMgJiYgdGhpcy5hY3Rpb25zLmxlbmd0aCkgdGhpcy5zaG93Q29scyA9IGtleXMuY29uY2F0KCdfX2FjdGlvbnNfXycpO1xuICAgICAgZWxzZSB0aGlzLnNob3dDb2xzID0ga2V5cztcbiAgICAgIHJldHVybiBrZXlzO1xuICAgIH0pO1xuICAgIHRoaXMubWFwKCdhY3Rpb25zJywgYWN0aW9ucyA9PiB7XG4gICAgICBpZiAoIUFycmF5LmlzQXJyYXkoYWN0aW9ucykpIGFjdGlvbnMgPSBbXTtcblxuICAgICAgdGhpcy5zaG93Q29scyA9IGFjdGlvbnMubGVuZ3RoID8gdGhpcy5jb2xLZXlzLmNvbmNhdCgnX19hY3Rpb25zX18nKSA6IHRoaXMuY29sS2V5cztcblxuICAgICAgcmV0dXJuIGFjdGlvbnM7XG4gICAgfSk7XG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICBzdXBlci5uZ09uSW5pdCgpO1xuXG4gICAgdGhpcy50YWJsZURhdGFTb3VyY2Uuc29ydCA9IHRoaXMuc29ydDtcbiAgfVxuICBhcHBseUZpbHRlcihmaWx0ZXJWYWx1ZTogc3RyaW5nKSB7XG4gICAgdGhpcy50YWJsZURhdGFTb3VyY2UuZmlsdGVyID0gZmlsdGVyVmFsdWU7XG5cbiAgICBpZiAodGhpcy50YWJsZURhdGFTb3VyY2UucGFnaW5hdG9yKSB7XG4gICAgICB0aGlzLnRhYmxlRGF0YVNvdXJjZS5wYWdpbmF0b3IuZmlyc3RQYWdlKCk7XG4gICAgfVxuICB9XG5cbiAgYWN0aW9uQ2xpY2socm93RGF0YTogYW55LCBhY3Rpb25JbmRleDogbnVtYmVyKSB7XG5cbiAgICBjb25zdCBjb250ZXh0ID0gQ29udGV4dC5jcmVhdGUodGhpcy5jb250ZXh0LCB7ICRkYXRhOiByb3dEYXRhIH0pO1xuXG4gICAgdGhpcy5hZGRTdWJzY3JpcHRpb24gPSB0aGlzLl9leHByLmV2YWwodGhpcy5hY3Rpb25zW2FjdGlvbkluZGV4XS5hY3Rpb24sIGNvbnRleHQsIHRydWUpLnN1YnNjcmliZShcbiAgICAgICgpID0+IHtcbiAgICAgICAgLy8gVE9ETyBsb2dpYyB0byByZWxvYWQgdGFibGVcbiAgICAgIH1cbiAgICApO1xuICB9XG5cblxufVxuIiwiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTggQWRyaWFuIFBhbmVsbGEgPGlhbmNoaTc0QG91dGxvb2suY29tPlxuICpcbiAqIFRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLlxuICogaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9NSVRcbiAqL1xuXG5pbXBvcnQgeyBDb21wb25lbnQsIFZpZXdFbmNhcHN1bGF0aW9uLCBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ2hhbmdlRGV0ZWN0b3JSZWZ9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQWJzdHJhY3RXaWRnZXQsIEV4cHJlc3Npb25zIH0gZnJvbSAnLi4vLi4vLi4vY29yZS9pbmRleCc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3dkZy1jb250YWluZXInLFxuICB0ZW1wbGF0ZTogYDxuZy1jb250YWluZXIgKm5nRm9yPVwibGV0IGVsZW1lbnQgb2YgY29udGVudFwiIFt3ZGdXaWRnZXRdPVwiZWxlbWVudFwiIFtwYXJlbnRDb250ZXh0XT1cImNvbnRleHRcIj5cblxuPC9uZy1jb250YWluZXI+XG5gLFxuICBzdHlsZXM6IFtgd2RnLWNvbnRhaW5lci53ZGctZmxleHtkaXNwbGF5OmZsZXg7ZmxleC13cmFwOndyYXB9d2RnLWNvbnRhaW5lci53ZGctZmxleD4qe2ZsZXg6MSAxIGF1dG99YF0sXG5cbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOnVzZS1ob3N0LXByb3BlcnR5LWRlY29yYXRvclxuICBob3N0OiB7XG4gICAgJ1tjbGFzcy53ZGctZmxleF0nOiAndHJ1ZScsXG4gICAgJ1tzdHlsZS5mbGV4LWRpcmVjdGlvbl0nOiAnZGlyZWN0aW9uJ1xuICB9LFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBDb250YWluZXJXaWRnZXRDb21wb25lbnQgZXh0ZW5kcyBBYnN0cmFjdFdpZGdldCB7XG5cbiAgZGlyZWN0aW9uOiBzdHJpbmc7XG5cbiAgY29uc3RydWN0b3IoY2RyOiBDaGFuZ2VEZXRlY3RvclJlZiwgZXhwcjogRXhwcmVzc2lvbnMpIHtcbiAgICBzdXBlcihjZHIsIGV4cHIpO1xuICB9XG5cbiAgZHluT25CZWZvcmVCaW5kKCkge1xuXG4gICAgdGhpcy5tYXAoJ2RpcmVjdGlvbicsIGRpciA9PiBkaXIgfHwgJ3JvdycpO1xuICB9XG5cbn1cbiIsIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDE4IEFkcmlhbiBQYW5lbGxhIDxpYW5jaGk3NEBvdXRsb29rLmNvbT5cbiAqXG4gKiBUaGlzIHNvZnR3YXJlIGlzIHJlbGVhc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS5cbiAqIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvTUlUXG4gKi9cblxuaW1wb3J0IHsgQ29tcG9uZW50LCBWaWV3RW5jYXBzdWxhdGlvbiwgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENoYW5nZURldGVjdG9yUmVmfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEFic3RyYWN0V2lkZ2V0LCBFeHByZXNzaW9ucyB9IGZyb20gJy4uLy4uLy4uL2NvcmUvaW5kZXgnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICd3ZGctZ3JpZC1jb250YWluZXInLFxuICB0ZW1wbGF0ZTogYDxuZy1jb250YWluZXIgKm5nRm9yPVwibGV0IGVsZW1lbnQgb2YgY29udGVudFwiIFt3ZGdXaWRnZXRdPVwiZWxlbWVudFwiIFtwYXJlbnRDb250ZXh0XT1cImNvbnRleHRcIj5cblxuPC9uZy1jb250YWluZXI+XG5gLFxuICBzdHlsZXM6IFtgd2RnLWdyaWQtY29udGFpbmVyLndkZy1ncmlke2Rpc3BsYXk6Z3JpZDtncmlkLXRlbXBsYXRlLWNvbHVtbnM6cmVwZWF0KGF1dG8tZml0LG1pbm1heCgzMDBweCwxZnIpKTtncmlkLWF1dG8tZmxvdzpyb3cgZGVuc2V9YF0sXG5cbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOnVzZS1ob3N0LXByb3BlcnR5LWRlY29yYXRvclxuICBob3N0OiB7XG4gICAgJ1tjbGFzcy53ZGctZ3JpZF0nOiAndHJ1ZScsXG4gICAgJ1tzdHlsZS5mbGV4LWRpcmVjdGlvbl0nOiAnZGlyZWN0aW9uJ1xuICB9LFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBHcmlkQ29udGFpbmVyV2lkZ2V0Q29tcG9uZW50IGV4dGVuZHMgQWJzdHJhY3RXaWRnZXQge1xuXG4gIGRpcmVjdGlvbjogc3RyaW5nO1xuXG4gIGNvbnN0cnVjdG9yKGNkcjogQ2hhbmdlRGV0ZWN0b3JSZWYsIGV4cHI6IEV4cHJlc3Npb25zKSB7XG4gICAgc3VwZXIoY2RyLCBleHByKTtcbiAgfVxuXG4gIGR5bk9uQmVmb3JlQmluZCgpIHtcblxuICAgIHRoaXMubWFwKCdkaXJlY3Rpb24nLCBkaXIgPT4gZGlyIHx8ICdyb3cnKTtcbiAgfVxuXG59XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgVmlld0VuY2Fwc3VsYXRpb24sIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDaGFuZ2VEZXRlY3RvclJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQWJzdHJhY3RXaWRnZXQsIEV4cHJlc3Npb25zIH0gZnJvbSAnLi4vLi4vLi4vY29yZS9pbmRleCc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3dkZy10YWJzJyxcbiAgdGVtcGxhdGU6IGA8bWF0LXRhYi1ncm91cD5cblxuICA8bWF0LXRhYiAqbmdGb3I9XCJsZXQgdGFiIG9mIGNvbnRlbnQ7IGluZGV4IGFzIHRhYkluZGV4XCIgW2xhYmVsXT1cInRhYkxhYmVsc1t0YWJJbmRleF0gfHwgKCdUYWInK3RhYkluZGV4KVwiPlxuXG4gICAgPG5nLXRlbXBsYXRlIG1hdFRhYkNvbnRlbnQ+XG4gICAgICA8bmctY29udGFpbmVyIFt3ZGdXaWRnZXRdPVwidGFiXCIgW3BhcmVudENvbnRleHRdPVwiY29udGV4dFwiPjwvbmctY29udGFpbmVyPlxuICAgIDwvbmctdGVtcGxhdGU+XG5cbiAgPC9tYXQtdGFiPlxuXG5cbjwvbWF0LXRhYi1ncm91cD5cbmAsXG4gIHN0eWxlczogW2BgXSxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcbn0pXG5leHBvcnQgY2xhc3MgVGFic1dpZGdldENvbXBvbmVudCBleHRlbmRzIEFic3RyYWN0V2lkZ2V0IGltcGxlbWVudHMgT25Jbml0IHtcblxuICB0YWJMYWJlbHM6IHN0cmluZ1tdO1xuICBjb25zdHJ1Y3RvcihjZHI6IENoYW5nZURldGVjdG9yUmVmLCBleHByOiBFeHByZXNzaW9ucykge1xuICAgIHN1cGVyKGNkciwgZXhwcik7XG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgfVxuXG59XG4iLCIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxOCBBZHJpYW4gUGFuZWxsYSA8aWFuY2hpNzRAb3V0bG9vay5jb20+XG4gKlxuICogVGhpcyBzb2Z0d2FyZSBpcyByZWxlYXNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuXG4gKiBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL01JVFxuICovXG5cbmltcG9ydCB7IENvbXBvbmVudCwgVmlld0VuY2Fwc3VsYXRpb24sIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDaGFuZ2VEZXRlY3RvclJlZn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBBYnN0cmFjdFdpZGdldCwgRXhwcmVzc2lvbnMgfSBmcm9tICcuLi8uLi8uLi9jb3JlL2luZGV4JztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICd3ZGctY29kZScsXG4gICAgdGVtcGxhdGU6IGA8Y29kZT5cbnt7dGV4dH19XG48L2NvZGU+YCxcbiAgICBzdHlsZXM6IFtgd2RnLWNvZGUgY29kZXt3aGl0ZS1zcGFjZTpwcmV9YF0sXG5cbiAgICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXG59KVxuZXhwb3J0IGNsYXNzIENvZGVXaWRnZXRDb21wb25lbnQgZXh0ZW5kcyBBYnN0cmFjdFdpZGdldCB7XG5cbiAgICB0ZXh0OiBzdHJpbmc7XG5cbiAgICBjb25zdHJ1Y3RvcihjZHI6IENoYW5nZURldGVjdG9yUmVmLCBleHByOiBFeHByZXNzaW9ucykge1xuICAgICAgICBzdXBlcihjZHIsIGV4cHIpO1xuICAgIH1cblxufVxuIiwiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTggQWRyaWFuIFBhbmVsbGEgPGlhbmNoaTc0QG91dGxvb2suY29tPlxuICpcbiAqIFRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLlxuICogaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9NSVRcbiAqL1xuXG5cbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IE1hdGVyaWFsTW9kdWxlIH0gZnJvbSAnLi4vbWF0ZXJpYWwubW9kdWxlJztcbmltcG9ydCB7IFdpZGdldHNDb3JlTW9kdWxlIH0gZnJvbSAnLi4vLi4vY29yZS9pbmRleCc7XG5cbmltcG9ydCB7IENhcmRXaWRnZXRDb21wb25lbnQgfSBmcm9tICcuL2NhcmQvY2FyZC5jb21wb25lbnQnO1xuaW1wb3J0IHsgVGFibGVXaWRnZXRDb21wb25lbnQgfSBmcm9tICcuL3RhYmxlL3RhYmxlLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBDb250YWluZXJXaWRnZXRDb21wb25lbnQgfSBmcm9tICcuL2NvbnRhaW5lci9jb250YWluZXIuY29tcG9uZW50JztcbmltcG9ydCB7IEdyaWRDb250YWluZXJXaWRnZXRDb21wb25lbnQgfSBmcm9tICcuL2dyaWQtY29udGFpbmVyL2dyaWRjb250YWluZXIuY29tcG9uZW50JztcbmltcG9ydCB7IFRhYnNXaWRnZXRDb21wb25lbnQgfSBmcm9tICcuL3RhYnMvdGFicy5jb21wb25lbnQnO1xuaW1wb3J0IHsgQ29kZVdpZGdldENvbXBvbmVudCB9IGZyb20gJy4vY29kZS9jb2RlLmNvbXBvbmVudCc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBNYXRlcmlhbE1vZHVsZSxcblxuICAgIFdpZGdldHNDb3JlTW9kdWxlLmZvclJvb3Qoe1xuICAgICAgd2lkZ2V0czogW1xuICAgICAgICB7IHR5cGU6ICdjYXJkJywgY29tcG9uZW50OiBDYXJkV2lkZ2V0Q29tcG9uZW50IH0sXG4gICAgICAgIHsgdHlwZTogJ3RhYmxlJywgY29tcG9uZW50OiBUYWJsZVdpZGdldENvbXBvbmVudCB9LFxuICAgICAgICB7IHR5cGU6ICdjb250YWluZXInLCBjb21wb25lbnQ6IENvbnRhaW5lcldpZGdldENvbXBvbmVudH0sXG4gICAgICAgIHsgdHlwZTogJ2dyaWQtY29udGFpbmVyJywgY29tcG9uZW50OiBHcmlkQ29udGFpbmVyV2lkZ2V0Q29tcG9uZW50fSxcbiAgICAgICAgeyB0eXBlOiAndGFicycsIGNvbXBvbmVudDogVGFic1dpZGdldENvbXBvbmVudH0sXG4gICAgICAgIHsgdHlwZTogJ2NvZGUnLCBjb21wb25lbnQ6IENvZGVXaWRnZXRDb21wb25lbnR9LFxuICAgICAgXVxuICAgIH0pXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW1xuICAgIENhcmRXaWRnZXRDb21wb25lbnQsXG4gICAgVGFibGVXaWRnZXRDb21wb25lbnQsXG4gICAgQ29udGFpbmVyV2lkZ2V0Q29tcG9uZW50LFxuICAgIEdyaWRDb250YWluZXJXaWRnZXRDb21wb25lbnQsXG4gICAgVGFic1dpZGdldENvbXBvbmVudCxcbiAgICBDb2RlV2lkZ2V0Q29tcG9uZW50LFxuICBdLFxuICBleHBvcnRzOiBbXVxufSlcbmV4cG9ydCBjbGFzcyBDb21tb25XaWRnZXRzTW9kdWxlIHsgfVxuIl0sIm5hbWVzIjpbIm1hcCIsInRhcCIsImNvbWJpbmVMYXRlc3QiLCJ0c2xpYl8xLl9fdmFsdWVzIiwiSW5wdXQiLCJpc09ic2VydmFibGUiLCJvZiIsInRzbGliXzEuX19leHRlbmRzIiwiZXM1UnVsZXMiLCJQYXJzZXIiLCJJZGVudGlmaWVyUnVsZSIsIkJpbmFyeU9wZXJhdG9yUnVsZSIsIk1FTUJFUl9FWFAiLCJSZWFjdGl2ZUV2YWwiLCJFTVBUWSIsIkNvbXBvbmVudCIsIlZpZXdFbmNhcHN1bGF0aW9uIiwiQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kiLCJDaGFuZ2VEZXRlY3RvclJlZiIsIkluamVjdGlvblRva2VuIiwiSW5qZWN0YWJsZSIsIkluamVjdCIsIkRpcmVjdGl2ZSIsIlZpZXdDb250YWluZXJSZWYiLCJDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIiLCJPcHRpb25hbCIsIlBpcGUiLCJmb3JtYXROdW1iZXIiLCJmb3JtYXREYXRlIiwiQWN0aXZhdGVkUm91dGUiLCJBTkFMWVpFX0ZPUl9FTlRSWV9DT01QT05FTlRTIiwiTmdNb2R1bGUiLCJDb21tb25Nb2R1bGUiLCJpc1JlYWN0aXZlIiwiRm9ybUNvbnRyb2wiLCJ0YWtlIiwiRm9ybUdyb3VwIiwiRm9ybUFycmF5IiwiR0VUX09CU0VSVkFCTEUiLCJSZWFjdGl2ZUZvcm1zTW9kdWxlIiwiTWF0QXV0b2NvbXBsZXRlTW9kdWxlIiwiTWF0U2lkZW5hdk1vZHVsZSIsIk1hdEJ1dHRvbk1vZHVsZSIsIk1hdEljb25Nb2R1bGUiLCJNYXRMaXN0TW9kdWxlIiwiTWF0SW5wdXRNb2R1bGUiLCJNYXREaWFsb2dNb2R1bGUiLCJNYXRUb29sYmFyTW9kdWxlIiwiTWF0UHJvZ3Jlc3NCYXJNb2R1bGUiLCJNYXRFeHBhbnNpb25Nb2R1bGUiLCJNYXRTZWxlY3RNb2R1bGUiLCJNYXRUYWJzTW9kdWxlIiwiTWF0U25hY2tCYXJNb2R1bGUiLCJNYXRTbGlkZVRvZ2dsZU1vZHVsZSIsIk1hdENoaXBzTW9kdWxlIiwiTWF0Q2FyZE1vZHVsZSIsIk1hdENoZWNrYm94TW9kdWxlIiwiTWF0U2xpZGVyTW9kdWxlIiwiTWF0VGFibGVNb2R1bGUiLCJNYXRQYWdpbmF0b3JNb2R1bGUiLCJNYXRTb3J0TW9kdWxlIiwiTWF0TWVudU1vZHVsZSIsIlJ4T2JqZWN0Iiwic3RhcnRXaXRoIiwiTWF0VGFibGVEYXRhU291cmNlIiwiY29tYmluZU1peGVkIiwic29ydCIsInRhYmxlIiwiVmlld0NoaWxkIiwiTWF0UGFnaW5hdG9yIiwiTWF0U29ydCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztRQStDUyxjQUFNOzs7Ozs7Ozs7O1lBQWIsVUFBYyxNQUFnQixFQUFFLFdBQXlCLEVBQ3ZELGFBQTJCLEVBQzNCLFdBQXlCLEVBQ3pCLFFBQWtCO2dCQUVsQixxQkFBTSxPQUFPLEdBQVksTUFBTSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEdBQUcsSUFBSSxPQUFPLEVBQUUsQ0FBQztnQkFFeEUsSUFBSSxRQUFRO29CQUFFLE9BQU8sQ0FBQyxjQUFjLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQztnQkFDbkUsSUFBSSxXQUFXO29CQUFFLE1BQU0sQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLFdBQVcsQ0FBQyxDQUFDO2dCQUNyRCxJQUFJLGFBQWE7b0JBQUUsT0FBTyxDQUFDLGNBQWMsQ0FBQyxPQUFPLEVBQUUsYUFBYSxDQUFDLENBQUM7Z0JBQ2xFLElBQUksV0FBVztvQkFBRSxPQUFPLENBQUMsWUFBWSxDQUFD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