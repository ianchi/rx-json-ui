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
                        styles: ["dyn-table table{width:100%}dyn-table tr.data-row:hover{background:#f5f5f5}dyn-table tr.data-row:active{background:#efefef}dyn-table .data-row td{border-bottom-width:0}dyn-table mat-paginator.hiddenPaginator{display:none}dyn-table .table-title{display:flex;flex-flow:row}dyn-table .table-title>*{flex:0 0 auto}dyn-table .table-title .spacer{flex:1 1 auto}"],
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
                        styles: ["dyn-container.dyn-flex{display:flex;flex-wrap:wrap}dyn-container.dyn-flex>*{flex:1 1 auto}"],
                        // tslint:disable-next-line:use-host-property-decorator
                        host: {
                            '[class.dyn-flex]': 'true',
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
                        styles: ["dyn-grid-container.dyn-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));grid-auto-flow:row dense}"],
                        // tslint:disable-next-line:use-host-property-decorator
                        host: {
                            '[class.dyn-grid]': 'true',
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
                        styles: ["dyn-code code{white-space:pre}"],
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

    Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVhY3RpdmUtanNvbi1mb3JtLW5nLnVtZC5qcy5tYXAiLCJzb3VyY2VzIjpbIm5nOi8vcmVhY3RpdmUtanNvbi1mb3JtLW5nL2xpYi9jb3JlL2NvbnRleHQudHMiLG51bGwsIm5nOi8vcmVhY3RpdmUtanNvbi1mb3JtLW5nL2xpYi9jb3JlL2Fic3RyYWN0d2lkZ2V0LnRzIiwibmc6Ly9yZWFjdGl2ZS1qc29uLWZvcm0tbmcvbGliL2NvcmUvZXhwcmVzc2lvbnMudHMiLCJuZzovL3JlYWN0aXZlLWpzb24tZm9ybS1uZy9saWIvY29yZS9kZWZhdWx0d2lkZ2V0LmNvbXBvbmVudC50cyIsIm5nOi8vcmVhY3RpdmUtanNvbi1mb3JtLW5nL2xpYi9jb3JlL3dpZGdldHJlZ2lzdHJ5LnNlcnZpY2UudHMiLCJuZzovL3JlYWN0aXZlLWpzb24tZm9ybS1uZy9saWIvY29yZS93aWRnZXQuZGlyZWN0aXZlLnRzIiwibmc6Ly9yZWFjdGl2ZS1qc29uLWZvcm0tbmcvbGliL2NvcmUvZm9ybWF0LnRzIiwibmc6Ly9yZWFjdGl2ZS1qc29uLWZvcm0tbmcvbGliL2NvcmUvcm91dGVkd2lkZ2V0LmNvbXBvbmVudC50cyIsIm5nOi8vcmVhY3RpdmUtanNvbi1mb3JtLW5nL2xpYi9jb3JlL2NvcmUubW9kdWxlLnRzIiwibmc6Ly9yZWFjdGl2ZS1qc29uLWZvcm0tbmcvbGliL2NvcmUvZm9ybWZpZWxkd2lkZ2V0LnRzIiwibmc6Ly9yZWFjdGl2ZS1qc29uLWZvcm0tbmcvbGliL21hdGVyaWFsL21hdGVyaWFsLm1vZHVsZS50cyIsIm5nOi8vcmVhY3RpdmUtanNvbi1mb3JtLW5nL2xpYi9tYXRlcmlhbC9mb3JtZmllbGQvaW5wdXQvaW5wdXQuY29tcG9uZW50LnRzIiwibmc6Ly9yZWFjdGl2ZS1qc29uLWZvcm0tbmcvbGliL21hdGVyaWFsL2Zvcm1maWVsZC9jaGVja2JveC9jaGVja2JveC5jb21wb25lbnQudHMiLCJuZzovL3JlYWN0aXZlLWpzb24tZm9ybS1uZy9saWIvbWF0ZXJpYWwvZm9ybWZpZWxkL3RvZ2dsZS90b2dnbGUuY29tcG9uZW50LnRzIiwibmc6Ly9yZWFjdGl2ZS1qc29uLWZvcm0tbmcvbGliL21hdGVyaWFsL2Zvcm1maWVsZC9zbGlkZXIvc2xpZGVyLmNvbXBvbmVudC50cyIsIm5nOi8vcmVhY3RpdmUtanNvbi1mb3JtLW5nL2xpYi9tYXRlcmlhbC9mb3JtZmllbGQvYnV0dG9uL2J1dHRvbi5jb21wb25lbnQudHMiLCJuZzovL3JlYWN0aXZlLWpzb24tZm9ybS1uZy9saWIvbWF0ZXJpYWwvZm9ybWZpZWxkL2Zvcm0vZm9ybS5jb21wb25lbnQudHMiLCJuZzovL3JlYWN0aXZlLWpzb24tZm9ybS1uZy9saWIvbWF0ZXJpYWwvZm9ybWZpZWxkL2F1dG9jb21wbGV0ZS9hdXRvY29tcGxldGUuY29tcG9uZW50LnRzIiwibmc6Ly9yZWFjdGl2ZS1qc29uLWZvcm0tbmcvbGliL21hdGVyaWFsL2Zvcm1maWVsZC9mb3JtZmllbGQubW9kdWxlLnRzIiwibmc6Ly9yZWFjdGl2ZS1qc29uLWZvcm0tbmcvbGliL21hdGVyaWFsL2NvbW1vbi9jYXJkL2NhcmQuY29tcG9uZW50LnRzIiwibmc6Ly9yZWFjdGl2ZS1qc29uLWZvcm0tbmcvbGliL21hdGVyaWFsL2NvbW1vbi90YWJsZS90YWJsZS5jb21wb25lbnQudHMiLCJuZzovL3JlYWN0aXZlLWpzb24tZm9ybS1uZy9saWIvbWF0ZXJpYWwvY29tbW9uL2NvbnRhaW5lci9jb250YWluZXIuY29tcG9uZW50LnRzIiwibmc6Ly9yZWFjdGl2ZS1qc29uLWZvcm0tbmcvbGliL21hdGVyaWFsL2NvbW1vbi9ncmlkLWNvbnRhaW5lci9ncmlkY29udGFpbmVyLmNvbXBvbmVudC50cyIsIm5nOi8vcmVhY3RpdmUtanNvbi1mb3JtLW5nL2xpYi9tYXRlcmlhbC9jb21tb24vdGFicy90YWJzLmNvbXBvbmVudC50cyIsIm5nOi8vcmVhY3RpdmUtanNvbi1mb3JtLW5nL2xpYi9tYXRlcmlhbC9jb21tb24vY29kZS9jb2RlLmNvbXBvbmVudC50cyIsIm5nOi8vcmVhY3RpdmUtanNvbi1mb3JtLW5nL2xpYi9tYXRlcmlhbC9jb21tb24vY29tbW9uLm1vZHVsZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxOCBBZHJpYW4gUGFuZWxsYSA8aWFuY2hpNzRAb3V0bG9vay5jb20+XG4gKlxuICogVGhpcyBzb2Z0d2FyZSBpcyByZWxlYXNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuXG4gKiBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL01JVFxuICovXG5cbmV4cG9ydCBpbnRlcmZhY2UgSUNvbnRleHREZWYge1xuICBbaWRlbnRpZmllcjogc3RyaW5nXTogYW55O1xufVxuXG5cbi8qKlxuICogSGVscGVyIGNsYXNzIHRvIGhvbGQgY29udGV4dCBmb3IgZXhwcmVzc2lvbiBldmFsdWF0aW9uLlxuICogSXQgb25seSBnaXZlcyBhICd0eXBlJyB0byBhIHBsYWluIG9iamVjdC5cbiAqIEl0IGhhcyBzdGF0aWMgbWV0aG9kcyB0byBtYW5hZ2UgaW5oZXJpdGFuY2UgYW5kIGFkZGluZyBwcm9wZXJ0aWVzIGFuZCBidWlsdGluc1xuICovXG5leHBvcnQgY2xhc3MgQ29udGV4dCB7XG5cbiAgLyoqIEhlbHBlciBkZWZpbml0aW9uIG9mIGJ1aWx0LWluIG9iamVjdHMgKi9cbiAgc3RhdGljIGJ1aWx0aW5zRGVmOiBJQ29udGV4dERlZiA9IHtcblxuICAgIC8vIEJ1aWx0aW4gZnVuY3Rpb25zOlxuICAgIHBhcnNlRmxvYXQ6IHBhcnNlRmxvYXQsXG4gICAgcGFyc2VJbnQ6IHBhcnNlSW50LFxuICAgIGlzTmFOOiBpc05hTixcbiAgICBpc0Zpbml0ZTogaXNGaW5pdGUsXG5cbiAgICAvLyBGdW5kYW1lbnRhbCBvYmplY3RzOlxuICAgIE51bWJlcjogTnVtYmVyLFxuICAgIE1hdGg6IE1hdGgsXG4gICAgRGF0ZTogRGF0ZSxcbiAgICBBcnJheTogQXJyYXksXG4gICAgSlNPTjogSlNPTixcbiAgICBPYmplY3Q6IE9iamVjdCxcblxuICB9O1xuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgQ29udGV4dCBvYmplY3QsIGluaGVyaXRpbmcgZnJvbSBhbiBvcHRpb25hbCBgcGFyZW50YCBhbmQgYWRkaW5nIGN1c3RvbSBwcm9wZXJ0aWVzXG4gICAqIGFuZCBvcHRpb25hbGx5IGJ1aWx0aW4gb2JqZWN0c1xuICAgKiBAcGFyYW0gcGFyZW50XG4gICAqIEBwYXJhbSBwdWJsaWNQcm9wc1xuICAgKiBAcGFyYW0gcmVhZG9ubHlQcm9wc1xuICAgKiBAcGFyYW0gaGlkZGVuUHJvcHNcbiAgICogQHBhcmFtIGJ1aWx0aW5zIEJvb2xlYW4uIElmIHRydWUgYWRkcyBidWlsdGlub2JqZWN0cyBhcyBwdWJsaWMgcHJvcGVydGllcyxcbiAgICovXG4gIHN0YXRpYyBjcmVhdGUocGFyZW50PzogQ29udGV4dCwgcHVibGljUHJvcHM/OiBJQ29udGV4dERlZixcbiAgICByZWFkb25seVByb3BzPzogSUNvbnRleHREZWYsXG4gICAgaGlkZGVuUHJvcHM/OiBJQ29udGV4dERlZixcbiAgICBidWlsdGlucz86IGJvb2xlYW4pOiBDb250ZXh0IHtcblxuICAgIGNvbnN0IGNvbnRleHQ6IENvbnRleHQgPSBwYXJlbnQgPyBPYmplY3QuY3JlYXRlKHBhcmVudCkgOiBuZXcgQ29udGV4dCgpO1xuXG4gICAgaWYgKGJ1aWx0aW5zKSBDb250ZXh0LmRlZmluZVJlYWRvbmx5KGNvbnRleHQsIENvbnRleHQuYnVpbHRpbnNEZWYpO1xuICAgIGlmIChwdWJsaWNQcm9wcykgT2JqZWN0LmFzc2lnbihjb250ZXh0LCBwdWJsaWNQcm9wcyk7XG4gICAgaWYgKHJlYWRvbmx5UHJvcHMpIENvbnRleHQuZGVmaW5lUmVhZG9ubHkoY29udGV4dCwgcmVhZG9ubHlQcm9wcyk7XG4gICAgaWYgKGhpZGRlblByb3BzKSBDb250ZXh0LmRlZmluZUhpZGRlbihjb250ZXh0LCBoaWRkZW5Qcm9wcyk7XG5cbiAgICByZXR1cm4gY29udGV4dDtcbiAgfVxuXG4gIC8qKiBBZGRzIHJlYWRvbmx5IHByb3BlcnRpZXMgdG8gYSBDb250ZXh0ICovXG4gIHN0YXRpYyBkZWZpbmVSZWFkb25seShjb250ZXh0OiBDb250ZXh0LCBQcm9wczogSUNvbnRleHREZWYpIHtcblxuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpmb3JpblxuICAgIGZvciAoY29uc3QgcHJvcCBpbiBQcm9wcykge1xuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGNvbnRleHQsIHByb3AsIHtcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgd3JpdGFibGU6IGZhbHNlLFxuICAgICAgICB2YWx1ZTogUHJvcHNbcHJvcF1cbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHJldHVybiBjb250ZXh0O1xuICB9XG5cbiAgLyoqIEFkZHMgaGlkZGVuIChub24gZW51bWVyYWJsZSkgcHJvcGVydGllcyB0byBhIENvbnRleHQgKi9cbiAgc3RhdGljIGRlZmluZUhpZGRlbihjb250ZXh0OiBDb250ZXh0LCBoaWRkZW5Qcm9wczogSUNvbnRleHREZWYpIHtcblxuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpmb3JpblxuICAgIGZvciAoY29uc3QgcHJvcCBpbiBoaWRkZW5Qcm9wcykge1xuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGNvbnRleHQsIHByb3AsIHtcbiAgICAgICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgICAgIHdyaXRhYmxlOiB0cnVlLFxuICAgICAgICB2YWx1ZTogaGlkZGVuUHJvcHNbcHJvcF1cbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHJldHVybiBjb250ZXh0O1xuICB9XG5cbiAgLyoqIGFkZHMgcHVibGljIHByb3BlcnRpZXMgb25seSBpZiB0aGV5IGRvbid0IGV4aXN0IGluIHBhcmVudCAqL1xuICBzdGF0aWMgZGVmaW5lV2Vhayhjb250ZXh0OiBDb250ZXh0LCBwcm9wczogSUNvbnRleHREZWYpIHtcblxuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpmb3JpblxuICAgIGZvciAoY29uc3QgcHJvcCBpbiBwcm9wcykge1xuICAgICAgaWYgKHByb3AgaW4gY29udGV4dCkgY29udGludWU7XG4gICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoY29udGV4dCwgcHJvcCwge1xuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICAgICAgdmFsdWU6IHByb3BzW3Byb3BdXG4gICAgICB9KTtcbiAgICB9XG4gIH1cbn1cbiIsIi8qISAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG5Db3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cclxuTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTsgeW91IG1heSBub3QgdXNlXHJcbnRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlXHJcbkxpY2Vuc2UgYXQgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXHJcblxyXG5USElTIENPREUgSVMgUFJPVklERUQgT04gQU4gKkFTIElTKiBCQVNJUywgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZXHJcbktJTkQsIEVJVEhFUiBFWFBSRVNTIE9SIElNUExJRUQsIElOQ0xVRElORyBXSVRIT1VUIExJTUlUQVRJT04gQU5ZIElNUExJRURcclxuV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIFRJVExFLCBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSxcclxuTUVSQ0hBTlRBQkxJVFkgT1IgTk9OLUlORlJJTkdFTUVOVC5cclxuXHJcblNlZSB0aGUgQXBhY2hlIFZlcnNpb24gMi4wIExpY2Vuc2UgZm9yIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9uc1xyXG5hbmQgbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXHJcbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqICovXHJcbi8qIGdsb2JhbCBSZWZsZWN0LCBQcm9taXNlICovXHJcblxyXG52YXIgZXh0ZW5kU3RhdGljcyA9IGZ1bmN0aW9uKGQsIGIpIHtcclxuICAgIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcclxuICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XHJcbiAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07IH07XHJcbiAgICByZXR1cm4gZXh0ZW5kU3RhdGljcyhkLCBiKTtcclxufTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2V4dGVuZHMoZCwgYikge1xyXG4gICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcclxuICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxyXG4gICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xyXG59XHJcblxyXG5leHBvcnQgdmFyIF9fYXNzaWduID0gZnVuY3Rpb24oKSB7XHJcbiAgICBfX2Fzc2lnbiA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24gX19hc3NpZ24odCkge1xyXG4gICAgICAgIGZvciAodmFyIHMsIGkgPSAxLCBuID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IG47IGkrKykge1xyXG4gICAgICAgICAgICBzID0gYXJndW1lbnRzW2ldO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkpIHRbcF0gPSBzW3BdO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdDtcclxuICAgIH1cclxuICAgIHJldHVybiBfX2Fzc2lnbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19yZXN0KHMsIGUpIHtcclxuICAgIHZhciB0ID0ge307XHJcbiAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkgJiYgZS5pbmRleE9mKHApIDwgMClcclxuICAgICAgICB0W3BdID0gc1twXTtcclxuICAgIGlmIChzICE9IG51bGwgJiYgdHlwZW9mIE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMgPT09IFwiZnVuY3Rpb25cIilcclxuICAgICAgICBmb3IgKHZhciBpID0gMCwgcCA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMocyk7IGkgPCBwLmxlbmd0aDsgaSsrKSBpZiAoZS5pbmRleE9mKHBbaV0pIDwgMClcclxuICAgICAgICAgICAgdFtwW2ldXSA9IHNbcFtpXV07XHJcbiAgICByZXR1cm4gdDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZGVjb3JhdGUoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpIHtcclxuICAgIHZhciBjID0gYXJndW1lbnRzLmxlbmd0aCwgciA9IGMgPCAzID8gdGFyZ2V0IDogZGVzYyA9PT0gbnVsbCA/IGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHRhcmdldCwga2V5KSA6IGRlc2MsIGQ7XHJcbiAgICBpZiAodHlwZW9mIFJlZmxlY3QgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIFJlZmxlY3QuZGVjb3JhdGUgPT09IFwiZnVuY3Rpb25cIikgciA9IFJlZmxlY3QuZGVjb3JhdGUoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpO1xyXG4gICAgZWxzZSBmb3IgKHZhciBpID0gZGVjb3JhdG9ycy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkgaWYgKGQgPSBkZWNvcmF0b3JzW2ldKSByID0gKGMgPCAzID8gZChyKSA6IGMgPiAzID8gZCh0YXJnZXQsIGtleSwgcikgOiBkKHRhcmdldCwga2V5KSkgfHwgcjtcclxuICAgIHJldHVybiBjID4gMyAmJiByICYmIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGtleSwgciksIHI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3BhcmFtKHBhcmFtSW5kZXgsIGRlY29yYXRvcikge1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uICh0YXJnZXQsIGtleSkgeyBkZWNvcmF0b3IodGFyZ2V0LCBrZXksIHBhcmFtSW5kZXgpOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX21ldGFkYXRhKG1ldGFkYXRhS2V5LCBtZXRhZGF0YVZhbHVlKSB7XHJcbiAgICBpZiAodHlwZW9mIFJlZmxlY3QgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIFJlZmxlY3QubWV0YWRhdGEgPT09IFwiZnVuY3Rpb25cIikgcmV0dXJuIFJlZmxlY3QubWV0YWRhdGEobWV0YWRhdGFLZXksIG1ldGFkYXRhVmFsdWUpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hd2FpdGVyKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xyXG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZShyZXN1bHQudmFsdWUpOyB9KS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XHJcbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xyXG4gICAgfSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2dlbmVyYXRvcih0aGlzQXJnLCBib2R5KSB7XHJcbiAgICB2YXIgXyA9IHsgbGFiZWw6IDAsIHNlbnQ6IGZ1bmN0aW9uKCkgeyBpZiAodFswXSAmIDEpIHRocm93IHRbMV07IHJldHVybiB0WzFdOyB9LCB0cnlzOiBbXSwgb3BzOiBbXSB9LCBmLCB5LCB0LCBnO1xyXG4gICAgcmV0dXJuIGcgPSB7IG5leHQ6IHZlcmIoMCksIFwidGhyb3dcIjogdmVyYigxKSwgXCJyZXR1cm5cIjogdmVyYigyKSB9LCB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgKGdbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpczsgfSksIGc7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgcmV0dXJuIGZ1bmN0aW9uICh2KSB7IHJldHVybiBzdGVwKFtuLCB2XSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHN0ZXAob3ApIHtcclxuICAgICAgICBpZiAoZikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkdlbmVyYXRvciBpcyBhbHJlYWR5IGV4ZWN1dGluZy5cIik7XHJcbiAgICAgICAgd2hpbGUgKF8pIHRyeSB7XHJcbiAgICAgICAgICAgIGlmIChmID0gMSwgeSAmJiAodCA9IG9wWzBdICYgMiA/IHlbXCJyZXR1cm5cIl0gOiBvcFswXSA/IHlbXCJ0aHJvd1wiXSB8fCAoKHQgPSB5W1wicmV0dXJuXCJdKSAmJiB0LmNhbGwoeSksIDApIDogeS5uZXh0KSAmJiAhKHQgPSB0LmNhbGwoeSwgb3BbMV0pKS5kb25lKSByZXR1cm4gdDtcclxuICAgICAgICAgICAgaWYgKHkgPSAwLCB0KSBvcCA9IFtvcFswXSAmIDIsIHQudmFsdWVdO1xyXG4gICAgICAgICAgICBzd2l0Y2ggKG9wWzBdKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDA6IGNhc2UgMTogdCA9IG9wOyBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgNDogXy5sYWJlbCsrOyByZXR1cm4geyB2YWx1ZTogb3BbMV0sIGRvbmU6IGZhbHNlIH07XHJcbiAgICAgICAgICAgICAgICBjYXNlIDU6IF8ubGFiZWwrKzsgeSA9IG9wWzFdOyBvcCA9IFswXTsgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDc6IG9wID0gXy5vcHMucG9wKCk7IF8udHJ5cy5wb3AoKTsgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgIGlmICghKHQgPSBfLnRyeXMsIHQgPSB0Lmxlbmd0aCA+IDAgJiYgdFt0Lmxlbmd0aCAtIDFdKSAmJiAob3BbMF0gPT09IDYgfHwgb3BbMF0gPT09IDIpKSB7IF8gPSAwOyBjb250aW51ZTsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gMyAmJiAoIXQgfHwgKG9wWzFdID4gdFswXSAmJiBvcFsxXSA8IHRbM10pKSkgeyBfLmxhYmVsID0gb3BbMV07IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSA2ICYmIF8ubGFiZWwgPCB0WzFdKSB7IF8ubGFiZWwgPSB0WzFdOyB0ID0gb3A7IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHQgJiYgXy5sYWJlbCA8IHRbMl0pIHsgXy5sYWJlbCA9IHRbMl07IF8ub3BzLnB1c2gob3ApOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0WzJdKSBfLm9wcy5wb3AoKTtcclxuICAgICAgICAgICAgICAgICAgICBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG9wID0gYm9keS5jYWxsKHRoaXNBcmcsIF8pO1xyXG4gICAgICAgIH0gY2F0Y2ggKGUpIHsgb3AgPSBbNiwgZV07IHkgPSAwOyB9IGZpbmFsbHkgeyBmID0gdCA9IDA7IH1cclxuICAgICAgICBpZiAob3BbMF0gJiA1KSB0aHJvdyBvcFsxXTsgcmV0dXJuIHsgdmFsdWU6IG9wWzBdID8gb3BbMV0gOiB2b2lkIDAsIGRvbmU6IHRydWUgfTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZXhwb3J0U3RhcihtLCBleHBvcnRzKSB7XHJcbiAgICBmb3IgKHZhciBwIGluIG0pIGlmICghZXhwb3J0cy5oYXNPd25Qcm9wZXJ0eShwKSkgZXhwb3J0c1twXSA9IG1bcF07XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3ZhbHVlcyhvKSB7XHJcbiAgICB2YXIgbSA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvW1N5bWJvbC5pdGVyYXRvcl0sIGkgPSAwO1xyXG4gICAgaWYgKG0pIHJldHVybiBtLmNhbGwobyk7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIG5leHQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKG8gJiYgaSA+PSBvLmxlbmd0aCkgbyA9IHZvaWQgMDtcclxuICAgICAgICAgICAgcmV0dXJuIHsgdmFsdWU6IG8gJiYgb1tpKytdLCBkb25lOiAhbyB9O1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3JlYWQobywgbikge1xyXG4gICAgdmFyIG0gPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb1tTeW1ib2wuaXRlcmF0b3JdO1xyXG4gICAgaWYgKCFtKSByZXR1cm4gbztcclxuICAgIHZhciBpID0gbS5jYWxsKG8pLCByLCBhciA9IFtdLCBlO1xyXG4gICAgdHJ5IHtcclxuICAgICAgICB3aGlsZSAoKG4gPT09IHZvaWQgMCB8fCBuLS0gPiAwKSAmJiAhKHIgPSBpLm5leHQoKSkuZG9uZSkgYXIucHVzaChyLnZhbHVlKTtcclxuICAgIH1cclxuICAgIGNhdGNoIChlcnJvcikgeyBlID0geyBlcnJvcjogZXJyb3IgfTsgfVxyXG4gICAgZmluYWxseSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgaWYgKHIgJiYgIXIuZG9uZSAmJiAobSA9IGlbXCJyZXR1cm5cIl0pKSBtLmNhbGwoaSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZpbmFsbHkgeyBpZiAoZSkgdGhyb3cgZS5lcnJvcjsgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGFyO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19zcHJlYWQoKSB7XHJcbiAgICBmb3IgKHZhciBhciA9IFtdLCBpID0gMDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKylcclxuICAgICAgICBhciA9IGFyLmNvbmNhdChfX3JlYWQoYXJndW1lbnRzW2ldKSk7XHJcbiAgICByZXR1cm4gYXI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2F3YWl0KHYpIHtcclxuICAgIHJldHVybiB0aGlzIGluc3RhbmNlb2YgX19hd2FpdCA/ICh0aGlzLnYgPSB2LCB0aGlzKSA6IG5ldyBfX2F3YWl0KHYpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY0dlbmVyYXRvcih0aGlzQXJnLCBfYXJndW1lbnRzLCBnZW5lcmF0b3IpIHtcclxuICAgIGlmICghU3ltYm9sLmFzeW5jSXRlcmF0b3IpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTeW1ib2wuYXN5bmNJdGVyYXRvciBpcyBub3QgZGVmaW5lZC5cIik7XHJcbiAgICB2YXIgZyA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSwgaSwgcSA9IFtdO1xyXG4gICAgcmV0dXJuIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiKSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuYXN5bmNJdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IGlmIChnW25dKSBpW25dID0gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChhLCBiKSB7IHEucHVzaChbbiwgdiwgYSwgYl0pID4gMSB8fCByZXN1bWUobiwgdik7IH0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiByZXN1bWUobiwgdikgeyB0cnkgeyBzdGVwKGdbbl0odikpOyB9IGNhdGNoIChlKSB7IHNldHRsZShxWzBdWzNdLCBlKTsgfSB9XHJcbiAgICBmdW5jdGlvbiBzdGVwKHIpIHsgci52YWx1ZSBpbnN0YW5jZW9mIF9fYXdhaXQgPyBQcm9taXNlLnJlc29sdmUoci52YWx1ZS52KS50aGVuKGZ1bGZpbGwsIHJlamVjdCkgOiBzZXR0bGUocVswXVsyXSwgcik7IH1cclxuICAgIGZ1bmN0aW9uIGZ1bGZpbGwodmFsdWUpIHsgcmVzdW1lKFwibmV4dFwiLCB2YWx1ZSk7IH1cclxuICAgIGZ1bmN0aW9uIHJlamVjdCh2YWx1ZSkgeyByZXN1bWUoXCJ0aHJvd1wiLCB2YWx1ZSk7IH1cclxuICAgIGZ1bmN0aW9uIHNldHRsZShmLCB2KSB7IGlmIChmKHYpLCBxLnNoaWZ0KCksIHEubGVuZ3RoKSByZXN1bWUocVswXVswXSwgcVswXVsxXSk7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNEZWxlZ2F0b3Iobykge1xyXG4gICAgdmFyIGksIHA7XHJcbiAgICByZXR1cm4gaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIsIGZ1bmN0aW9uIChlKSB7IHRocm93IGU7IH0pLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuLCBmKSB7IGlbbl0gPSBvW25dID8gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIChwID0gIXApID8geyB2YWx1ZTogX19hd2FpdChvW25dKHYpKSwgZG9uZTogbiA9PT0gXCJyZXR1cm5cIiB9IDogZiA/IGYodikgOiB2OyB9IDogZjsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY1ZhbHVlcyhvKSB7XHJcbiAgICBpZiAoIVN5bWJvbC5hc3luY0l0ZXJhdG9yKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3ltYm9sLmFzeW5jSXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xyXG4gICAgdmFyIG0gPSBvW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSwgaTtcclxuICAgIHJldHVybiBtID8gbS5jYWxsKG8pIDogKG8gPSB0eXBlb2YgX192YWx1ZXMgPT09IFwiZnVuY3Rpb25cIiA/IF9fdmFsdWVzKG8pIDogb1tTeW1ib2wuaXRlcmF0b3JdKCksIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiKSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuYXN5bmNJdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpKTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyBpW25dID0gb1tuXSAmJiBmdW5jdGlvbiAodikgeyByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkgeyB2ID0gb1tuXSh2KSwgc2V0dGxlKHJlc29sdmUsIHJlamVjdCwgdi5kb25lLCB2LnZhbHVlKTsgfSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHNldHRsZShyZXNvbHZlLCByZWplY3QsIGQsIHYpIHsgUHJvbWlzZS5yZXNvbHZlKHYpLnRoZW4oZnVuY3Rpb24odikgeyByZXNvbHZlKHsgdmFsdWU6IHYsIGRvbmU6IGQgfSk7IH0sIHJlamVjdCk7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fbWFrZVRlbXBsYXRlT2JqZWN0KGNvb2tlZCwgcmF3KSB7XHJcbiAgICBpZiAoT2JqZWN0LmRlZmluZVByb3BlcnR5KSB7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjb29rZWQsIFwicmF3XCIsIHsgdmFsdWU6IHJhdyB9KTsgfSBlbHNlIHsgY29va2VkLnJhdyA9IHJhdzsgfVxyXG4gICAgcmV0dXJuIGNvb2tlZDtcclxufTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2ltcG9ydFN0YXIobW9kKSB7XHJcbiAgICBpZiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSByZXR1cm4gbW9kO1xyXG4gICAgdmFyIHJlc3VsdCA9IHt9O1xyXG4gICAgaWYgKG1vZCAhPSBudWxsKSBmb3IgKHZhciBrIGluIG1vZCkgaWYgKE9iamVjdC5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1vZCwgaykpIHJlc3VsdFtrXSA9IG1vZFtrXTtcclxuICAgIHJlc3VsdC5kZWZhdWx0ID0gbW9kO1xyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9faW1wb3J0RGVmYXVsdChtb2QpIHtcclxuICAgIHJldHVybiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSA/IG1vZCA6IHsgZGVmYXVsdDogbW9kIH07XHJcbn1cclxuIiwiXG4vKipcbiAqIENvcHlyaWdodCAoYykgMjAxOCBBZHJpYW4gUGFuZWxsYSA8aWFuY2hpNzRAb3V0bG9vay5jb20+XG4gKlxuICogVGhpcyBzb2Z0d2FyZSBpcyByZWxlYXNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuXG4gKiBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL01JVFxuICovXG5cbmltcG9ydCB7IE9uRGVzdHJveSwgQ2hhbmdlRGV0ZWN0b3JSZWYsIElucHV0LCBPbkNoYW5nZXMsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgb2YsIFN1YnNjcmlwdGlvbiwgY29tYmluZUxhdGVzdCwgaXNPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyB0YXAsIG1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IElXaWRnZXREZWYgfSBmcm9tICcuL3dpZGdldC5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgV2lkZ2V0RGlyZWN0aXZlIH0gZnJvbSAnLi93aWRnZXQuZGlyZWN0aXZlJztcbmltcG9ydCB7IENvbnRleHQgfSBmcm9tICcuL2NvbnRleHQnO1xuaW1wb3J0IHsgRXhwcmVzc2lvbnMgfSBmcm9tICcuL2V4cHJlc3Npb25zJztcblxuZXhwb3J0IGludGVyZmFjZSBJT3B0aW9uRGVmIHsgW3Byb3A6IHN0cmluZ106IGFueTsgfVxuXG4vKipcbiAqIEJhc2UgY2xhc3MgZm9yIGFsbCBkeW5hbWljIHdpZGdldCBlbGVtZW50c1xuICovXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgQWJzdHJhY3RXaWRnZXQgaW1wbGVtZW50cyBPbkRlc3Ryb3ksIE9uQ2hhbmdlcywgT25Jbml0IHtcblxuICAvKiogQ29uZmlndXJhdGlvbiBvZiB0aGUgd2lkZ2V0ICovXG4gIEBJbnB1dCgpIHdpZGdldERlZjogSVdpZGdldERlZjtcbiAgQElucHV0KCkgY29udGV4dDogQ29udGV4dDtcblxuICAvKiogU3RyaW5nIGlkZW50aWZpbmcgdGhlICd0eXBlJyBvZiB0aGUgd2lkZ2V0ICovXG4gIHR5cGU6IHN0cmluZztcbiAgLyoqIENvbnRleHQgdG8gdXNlIGZvciBldmFsdWF0aW9ucyBhdCB0aGlzIGxldmVsICovXG5cbiAgLyoqIFdpZGdldCBzcGVjaWZpYyBvcHRpb25zIGFsbCBjb252ZXJ0ZWQgdG8gb2JzZXJ2YWJsZXMsIHRvIHVuaWZ5IGJldHdlZW4gKmV4cHJlc3Npb24qIGFuZFxuICAgKiAqY29uc3RhbnQqIG5vdGF0aW9uIGluIHRoZSBwcm9wZXJ0aWVzIGRlZmluaXRpb24uXG4gICAqIEVhY2ggYmluZGluZyB0aGVuIGF1dG8gdXBkYXRlcyB0aGUgY29ycmVzcG9uZGluZyBwcm9wZXJ0eSBpbiB0aGUgZGVyaXZlZCB3aWRnZXQuXG4gICAqL1xuICBiaW5kaW5nczogeyBbcHJvcDogc3RyaW5nXTogT2JzZXJ2YWJsZTxhbnk+IH0gPSB7fTtcbiAgLyoqIFRoZSBpbnB1dCBjb25maWd1cmF0aW9uIG9mIHRoaXMgb2JqZWN0ICovXG5cbiAgY29udGVudDogSVdpZGdldERlZltdO1xuXG4gIGVsZW1lbnQ6IFdpZGdldERpcmVjdGl2ZTtcblxuICBzZXQgYWRkU3Vic2NyaXB0aW9uKHN1YnM6IFN1YnNjcmlwdGlvbikge1xuICAgIHRoaXMuX3N1YnNjcmlwdGlvbnMucHVzaChzdWJzKTtcbiAgfVxuXG4gIHByaXZhdGUgX3N1YnNjcmlwdGlvbnM6IFN1YnNjcmlwdGlvbltdID0gW107XG5cblxuICBjb25zdHJ1Y3Rvcihwcm90ZWN0ZWQgX2NkcjogQ2hhbmdlRGV0ZWN0b3JSZWYsIHByb3RlY3RlZCBfZXhwcjogRXhwcmVzc2lvbnMpIHtcbiAgfVxuXG4gIC8qKiBJbml0aWFsaWNlcyB0aGUgd2lkZ2V0IGZyb20gYSBqc29uIGRlZmluaXRpb24gKi9cbiAgc2V0dXAoZWxlbWVudDogV2lkZ2V0RGlyZWN0aXZlLCBkZWY6IElXaWRnZXREZWYsIGNvbnRleHQ6IENvbnRleHQpIHtcbiAgICBkZWYgPSBkZWYgfHwgeyB0eXBlOiAnbm9uZScgfTtcbiAgICBkZWYub3B0aW9ucyA9IGRlZi5vcHRpb25zIHx8IHt9O1xuXG4gICAgdGhpcy50eXBlID0gZGVmLnR5cGUgfHwgJ25vbmUnO1xuICAgIHRoaXMuZWxlbWVudCA9IGVsZW1lbnQ7XG5cbiAgICBjb25zb2xlLmxvZyhgV2lkZ2V0IHNldHVwICR7dGhpcy50eXBlfWAsIHRoaXMpO1xuXG4gICAgdGhpcy5jb250ZXh0ID0gY29udGV4dDtcblxuICAgIHRoaXMud2lkZ2V0RGVmID0gZGVmID0gdGhpcy5keW5PblNldHVwKGRlZikgfHwgZGVmO1xuXG4gICAgdGhpcy5iaW5kaW5ncyA9IHBhcnNlRGVmT2JqZWN0KGRlZi5vcHRpb25zLCB0aGlzLmNvbnRleHQsIHRydWUsIHRoaXMuX2V4cHIpO1xuXG4gICAgdGhpcy5jb250ZW50ID0gQXJyYXkuaXNBcnJheShkZWYuY29udGVudCkgPyBkZWYuY29udGVudCA6IHR5cGVvZiBkZWYuY29udGVudCA9PT0gJ29iamVjdCcgPyBbZGVmLmNvbnRlbnRdIDogW107XG5cbiAgICB0aGlzLnN1YnNjcmliZU9wdGlvbnMoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBIZWxwZXIgZnVuY3Rpb24gdG8gYWRkIGEgYG1hcGAgcGlwZSB0byB0aGUgY29ycmVzcG9uZGluZyBpbnB1dCBvYnNlcnZhYmxlXG4gICAqL1xuICBtYXAob3B0aW9uOiBzdHJpbmcsIGNhbGxiYWNrOiAodjogYW55KSA9PiBhbnkpIHtcbiAgICBjb25zdCBvcHQ6IE9ic2VydmFibGU8YW55PiA9IHRoaXMuYmluZGluZ3Nbb3B0aW9uXTtcbiAgICBpZiAob3B0KSB0aGlzLmJpbmRpbmdzW29wdGlvbl0gPSBvcHQucGlwZShtYXAoY2FsbGJhY2spKTtcblxuICB9XG4gIC8qKlxuICAgKiBIb29rIHRvIGN1c3RvbWl6ZSB0aGUgb2JzZXJ2YWJsZSBiaW5kaW5ncyBiZWZvciBzdWJzY3JpYmluZy5cbiAgICogVGlwaWNhbGx5IHVzaW5nIHRoZSBgdGhpcy5tYXAoKWAgZnVuY3Rpb24gdG8gYWRkIHByb2Nlc3NpbmcgdG8gc3BlY2lmaWMgb3B0aW9uc1xuICAgKi9cbiAgZHluT25CZWZvcmVCaW5kKCkgeyB9XG5cbiAgZHluT25BZnRlckJpbmQoKSB7IH1cblxuICAvKiogSG9vayB0byBjdXN0b21pemUgd2lkZ2V0IGRlZmluaXRpb24gYmVmb3JlIHByb2Nlc2luZyBpdCAqL1xuICBkeW5PblNldHVwKGRlZjogSVdpZGdldERlZikgeyByZXR1cm4gZGVmOyB9XG5cbiAgc3Vic2NyaWJlT3B0aW9ucygpIHtcbiAgICBjb25zdCBvYnNlcnZhYmxlcyA9IFtdO1xuXG4gICAgLy8gY2FsbCBob29rIGZvciBjb2ZpZ3VyYXRpb24gb2Ygb3B0aW9ucyBiZWZvcmUgdXBkYXRpbmcgdGhlIGJvdW5kIHZhbHVlXG4gICAgdGhpcy5keW5PbkJlZm9yZUJpbmQoKTtcblxuICAgIGZvciAoY29uc3QgcHJvcCBpbiB0aGlzLmJpbmRpbmdzKSAvLyB0c2xpbnQ6ZGlzYWJsZS1saW5lOmZvcmluXG4gICAgICB0aGlzLmJpbmRpbmdzW3Byb3BdID0gdGhpcy5iaW5kaW5nc1twcm9wXS5waXBlKHRhcChyZXMgPT4gdGhpc1twcm9wXSA9IHJlcykpO1xuXG4gICAgLy8gY2FsbCBob29rIGFmdGVyIHVwZGF0aW5nIHRoZSBib3VuZCB2YWx1ZVxuICAgIHRoaXMuZHluT25BZnRlckJpbmQoKTtcblxuICAgIGZvciAoY29uc3QgcHJvcCBpbiB0aGlzLmJpbmRpbmdzKSAvLyB0c2xpbnQ6ZGlzYWJsZS1saW5lOmZvcmluXG4gICAgICBvYnNlcnZhYmxlcy5wdXNoKHRoaXMuYmluZGluZ3NbcHJvcF0pO1xuXG4gICAgdGhpcy5hZGRTdWJzY3JpcHRpb24gPSBjb21iaW5lTGF0ZXN0KG9ic2VydmFibGVzKS5zdWJzY3JpYmUoKCkgPT4gdGhpcy5fY2RyLm1hcmtGb3JDaGVjaygpKTtcblxuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5fdW5zdWJzY3JpYmUoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBPbkNoYW5nZXMgaXMgbmV2ZXIgY2FsbGVkIG9uIGR5bmFtaWMgd2lkZ2V0IGluc3RhbnRpYXRpb25cbiAgICogSXQgaXMgaW50ZW5kZWQgdG8gcHJvdmlkZSB0aGUgc2FtZSBpbnRlcmZhY2UgaXMgdGhlIHdpZGdldCBpcyB1c2VkIGRlY2xhcmF0aXZlIGluIGEgdGVtcGxhdGVcbiAgICogaW5zdGVhZCBvZiBkeW5hbWljYWxseVxuICAgKi9cbiAgbmdPbkNoYW5nZXMoKSB7XG4gICAgY29uc29sZS5sb2coYFdpZGdldCBPbkNoYW5nZXMgJHt0aGlzLnR5cGV9YCwgdGhpcyk7XG4gICAgdGhpcy5fdW5zdWJzY3JpYmUoKTtcbiAgICB0aGlzLnNldHVwKG51bGwsIHRoaXMud2lkZ2V0RGVmLCB0aGlzLmNvbnRleHQpO1xuICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgY29uc29sZS5sb2coYFdpZGdldCBPbkluaXQgJHt0aGlzLnR5cGV9YCwgdGhpcyk7XG4gIH1cblxuICBwcml2YXRlIF91bnN1YnNjcmliZSgpIHtcbiAgICBmb3IgKGNvbnN0IHN1YnMgb2YgdGhpcy5fc3Vic2NyaXB0aW9ucykgc3Vicy51bnN1YnNjcmliZSgpO1xuICB9XG5cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlRGVmT2JqZWN0KG9iakRlZjogSU9wdGlvbkRlZiwgY29udGV4dDogQ29udGV4dCwgYXNPYnNlcnZhYmxlOiBib29sZWFuLCBleHByOiBFeHByZXNzaW9ucykge1xuXG4gIGNvbnN0IHJlc3VsdDogSU9wdGlvbkRlZiA9IHt9O1xuXG4gIGlmICghb2JqRGVmKSByZXR1cm4gbnVsbDtcblxuICBmb3IgKGNvbnN0IHByb3AgaW4gb2JqRGVmKSB7XG5cbiAgICBpZiAocHJvcC5jaGFyQXQocHJvcC5sZW5ndGggLSAxKSA9PT0gJz0nKSB7XG4gICAgICBpZiAodHlwZW9mIG9iakRlZltwcm9wXSAhPT0gJ3N0cmluZycpIHRocm93IG5ldyBTeW50YXhFcnJvcignQmluZGluZyBvcHRpb25zIG11c3QgYmUgXCJzdHJpbmdcIiBJZXhwcmVzc2lvbnMnKTtcbiAgICAgIHJlc3VsdFtwcm9wLnNsaWNlKDAsIHByb3AubGVuZ3RoIC0gMSldID0gZXhwci5ldmFsKG9iakRlZltwcm9wXSwgY29udGV4dCwgYXNPYnNlcnZhYmxlKTtcblxuICAgIH0gZWxzZSByZXN1bHRbcHJvcF0gPSBhc09ic2VydmFibGUgJiYgIWlzT2JzZXJ2YWJsZShvYmpEZWZbcHJvcF0pID8gb2Yob2JqRGVmW3Byb3BdKSA6IG9iakRlZltwcm9wXTtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuIiwiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTggQWRyaWFuIFBhbmVsbGEgPGlhbmNoaTc0QG91dGxvb2suY29tPlxuICpcbiAqIFRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLlxuICogaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9NSVRcbiAqL1xuXG5pbXBvcnQge1xuICBSZWFjdGl2ZUV2YWwsIFN0YXRpY0V2YWwsIFBhcnNlciwgZXM1UnVsZXMsXG4gIElkZW50aWZpZXJSdWxlLCBCaW5hcnlPcGVyYXRvclJ1bGUsIE1FTUJFUl9FWFBcbn0gZnJvbSAnZXNwcmVzc2lvbic7XG5pbXBvcnQgeyBpc09ic2VydmFibGUsIG9mLCBFTVBUWSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgQ29udGV4dCB9IGZyb20gJy4vY29udGV4dCc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgSUFzdCB7XG4gIHR5cGU6IHN0cmluZztcbiAgW3Byb3A6IHN0cmluZ106IGFueTtcbn1cblxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIEV4cHJlc3Npb25zIHtcblxuICBhYnN0cmFjdCBwYXJzZUtleShleHByZXNzaW9uOiBzdHJpbmcpOiBJQXN0O1xuICBhYnN0cmFjdCBwYXJzZShleHByZXNzaW9uOiBzdHJpbmcpOiBJQXN0O1xuICAvKipcbiAgICogRXZhbHVhdGVzIGFuIGV4cHJlc3Npb24gaW4gdGhlIGdpdmVuIGNvbnRleHQuXG4gICAqIEl0IHVzZXMgdGhlIGdlbmVyYWwgcGFyc2VyLlxuICAgKlxuICAgKiBAcGFyYW0gZXhwcmVzc2lvbiBTdHJpbmcgZXhwcmVzc2lvblxuICAgKiBAcGFyYW0gY29udGV4dFxuICAgKiBAcGFyYW0gYXNPYnNlcnZhYmxlIEFsd2F5cyBjb252ZXJ0cyByZXN1bHQgdG8gb2JzZXJ2YWJsZVxuICAgKi9cbiAgZXZhbChleHByZXNzaW9uOiBzdHJpbmcsIGNvbnRleHQ6IENvbnRleHQsIGFzT2JzZXJ2YWJsZTogYm9vbGVhbikge1xuICAgIGNvbnN0IGFzdCA9IHRoaXMucGFyc2UoZXhwcmVzc2lvbik7XG5cbiAgICByZXR1cm4gdGhpcy5ldmFsdWF0ZShhc3QsIGNvbnRleHQsIGFzT2JzZXJ2YWJsZSk7XG4gIH1cbiAgYWJzdHJhY3QgZXZhbHVhdGUoYXN0OiBJQXN0LCBjb250ZXh0OiBDb250ZXh0LCBhc09ic2VydmFibGU6IGJvb2xlYW4pOiBhbnk7XG4gIGFic3RyYWN0IGx2YWx1ZShleHByZXNzaW9uOiBzdHJpbmcsIGNvbnRleHQ6IENvbnRleHQpOiB7IG8sIG0gfTtcbn1cblxuXG4vKipcbiAqIFNlcnZpY2UgZm9yIFBhcnNpbmcgYW5kIGZvciBldmFsdWF0aW5nIGV4cHJlc3Npb25zIGluIFdpZGdldCdzIGNvbmZpZ3VyYXRpb25cbiAqIFRoZSBmdW5jaW9uYWxpdHkgaXMgcHJvdmlkZWQgYnkgdGhlIEVTcHJlc3Npb24gcGFja2FnZVxuICpcbiAqL1xuZXhwb3J0IGNsYXNzIEVTcHJlc3Npb24gZXh0ZW5kcyBFeHByZXNzaW9ucyB7XG5cbiAgcHJpdmF0ZSBfcGFyc2VyOiBQYXJzZXI7XG4gIHByaXZhdGUgX2tleVBhcnNlcjogUGFyc2VyO1xuXG4gIHByaXZhdGUgX3J4RXZhbDogU3RhdGljRXZhbDtcblxuICBjb25zdHJ1Y3RvcigpIHtcblxuICAgIHN1cGVyKCk7XG4gICAgY29uc3QgZXM1ID0gZXM1UnVsZXMoKTtcblxuICAgIC8vIHJlbW92ZSBQcm9nYW0gLyBTdGF0ZW1lbnRzIHJ1bGVzLCBhbmQga2VlcCBvbmx5IGV4cHJlc3Npb25zXG4gICAgZXM1WzBdID0gW107XG5cbiAgICB0aGlzLl9wYXJzZXIgPSBuZXcgUGFyc2VyKGVzNSk7XG5cblxuICAgIGNvbnN0IGlkZW50aWZpZXJSdWxlID0gbmV3IElkZW50aWZpZXJSdWxlKHsgdGhpc1N0cjogbnVsbCwgbGl0ZXJhbHM6IHt9IH0pO1xuICAgIHRoaXMuX2tleVBhcnNlciA9IG5ldyBQYXJzZXIoW1xuICAgICAgW25ldyBCaW5hcnlPcGVyYXRvclJ1bGUoe1xuICAgICAgICAnLic6IHtcbiAgICAgICAgICB0eXBlOiBNRU1CRVJfRVhQLFxuICAgICAgICAgIGV4dHJhOiB7IGNvbXB1dGVkOiBmYWxzZSB9LFxuICAgICAgICAgIG5vb3A6IHRydWUsXG4gICAgICAgICAgbGVmdDogJ29iamVjdCcsIHJpZ2h0OiAncHJvcGVydHknLFxuICAgICAgICAgIHJ1bGVzOiBbW2lkZW50aWZpZXJSdWxlXV1cbiAgICAgICAgfVxuICAgICAgfSldLFxuICAgICAgW2lkZW50aWZpZXJSdWxlXVxuICAgIF0pO1xuXG4gICAgdGhpcy5fcnhFdmFsID0gbmV3IFJlYWN0aXZlRXZhbCgpO1xuICB9XG5cbiAgLyoqXG4gICAqIFBhcnNlcyB0aGUgc3RyaW5nIGV4cHJlc3Npb24gdXNpbmcgdGhlIGdlbmVyYWwgcGFyc2luZyBydWxlcy5cbiAgICpcbiAgICogKiBAcGFyYW0gZXhwcmVzc2lvblxuICAgKi9cbiAgcGFyc2UoZXhwcmVzc2lvbjogc3RyaW5nKTogSUFzdCB7XG4gICAgbGV0IHJlc3VsdDogSUFzdDtcbiAgICB0cnkge1xuICAgICAgcmVzdWx0ID0gdGhpcy5fcGFyc2VyLnBhcnNlKGV4cHJlc3Npb24pO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIGNvbnNvbGUud2FybignUGFyc2luZyBFcnJvcicsIGUubWVzc2FnZSwgJ1xcbicsIGV4cHJlc3Npb24pO1xuICAgICAgcmVzdWx0ID0gdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICAvKipcbiAgICogUGFyc2VzIHRoZSBzdHJpbmcgZXhwcmVzc2lvbiB1c2luZyB0aGUgcmVzdHJpY3RlZCAna2V5JyBwYXJzaW5nIHJ1bGVzLFxuICAgKiBpbnRlbmRlZCB0byBwYXJzZSBiaW5kaW5ncyB0byBtb2RlbCBrZXlzLlxuICAgKiBBcyB0aGV5IG11c3QgYmUgbHZhbHVlcyB0aGUgcnVsZXMgYXJlIG1vcmUgbGltaXRlZC5cbiAgICpcbiAgICogQHBhcmFtIGV4cHJlc3Npb25cbiAgICovXG4gIHBhcnNlS2V5KGV4cHJlc3Npb246IHN0cmluZyk6IElBc3Qge1xuICAgIGxldCByZXN1bHQ6IElBc3Q7XG4gICAgdHJ5IHtcbiAgICAgIHJlc3VsdCA9IHRoaXMuX2tleVBhcnNlci5wYXJzZShleHByZXNzaW9uKTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBjb25zb2xlLndhcm4oJ1BhcnNpbmcgRXJyb3InLCBlLm1lc3NhZ2UsICdcXG4nLCBleHByZXNzaW9uKTtcbiAgICAgIHJlc3VsdCA9IHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgLyoqXG4gICAqIEV2YWx1YXRlIGFuIEFTVCBpbiB0aGUgZ2l2ZW4gY29udGV4dC5cbiAgICpcbiAgICogQHBhcmFtIGFzdCBQYXJzZWQgZXhwcmVzc2lvbiB0byBldmFsdWF0ZVxuICAgKiBAcGFyYW0gY29udGV4dFxuICAgKiBAcGFyYW0gYXNPYnNlcnZhYmxlIEFsd2F5cyBjb252ZXJ0cyByZXN1bHQgdG8gb2JzZXJ2YWJsZVxuICAgKi9cbiAgZXZhbHVhdGUoYXN0OiBJQXN0LCBjb250ZXh0OiBDb250ZXh0LCBhc09ic2VydmFibGU6IGJvb2xlYW4pIHtcbiAgICBpZiAoIWFzdCkgcmV0dXJuIGFzT2JzZXJ2YWJsZSA/IEVNUFRZIDogdW5kZWZpbmVkO1xuXG4gICAgbGV0IHJlc3VsdDtcbiAgICB0cnkge1xuICAgICAgcmVzdWx0ID0gdGhpcy5fcnhFdmFsLmV2YWwoYXN0LCBjb250ZXh0KTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBjb25zb2xlLndhcm4oJ0Vycm9yIGV2YWx1YXRpbmcgZXhwcmVzc2lvbjogJywgZS5tZXNzYWdlKTtcbiAgICAgIHJldHVybiBhc09ic2VydmFibGUgPyBvZih1bmRlZmluZWQpIDogdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIHJldHVybiBhc09ic2VydmFibGUgJiYgIWlzT2JzZXJ2YWJsZShyZXN1bHQpID8gb2YocmVzdWx0KSA6IHJlc3VsdDtcbiAgfVxuXG4gIC8qKlxuICAgKiBFdmFsdWF0ZXMgYW4gZXhwcmVzc2lvbiB1c2luZyAqa2V5KiBwYXJzaW5nIHJ1bGVzIGFuZCByZXR1cm5zIGFuZCBsdmFsdWUgb2JqZWN0OlxuICAgKiB7bzogZXZhbHVhdGVkX29iamVjdCwgbTogbWVtYmVyfVxuICAgKlxuICAgKiBAcGFyYW0gZXhwcmVzc2lvblxuICAgKiBAcGFyYW0gY29udGV4dFxuICAgKi9cbiAgbHZhbHVlKGV4cHJlc3Npb246IHN0cmluZywgY29udGV4dDogQ29udGV4dCk6IHsgbywgbSB9IHtcbiAgICBsZXQgcmVzdWx0O1xuXG4gICAgY29uc3QgYXN0ID0gdGhpcy5wYXJzZUtleShleHByZXNzaW9uKTtcblxuICAgIGlmICghYXN0KSByZXR1cm4gbnVsbDtcbiAgICB0cnkge1xuICAgICAgcmVzdWx0ID0gdGhpcy5fcnhFdmFsLmx2YWx1ZShhc3QsIGNvbnRleHQpO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIGNvbnNvbGUud2FybignRXJyb3IgZXZhbHVhdGluZyBleHByZXNzaW9uOiAnLCBlLm1lc3NhZ2UpO1xuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cblxuICAvKipcbiAgICogRXhwcmVzc2lvbiB2ZXJzaW9uIG9mIHRoZSBBcnJheS5tYXAgZnVuY3Rpb24uXG4gICAqIEkgcmVwbGFjZXMgZWFjaCBhcnJheS9vYmplY3QgbWVtYmVyIHdpdGggdGhlIHJlc3VsdCBvZiBldmFsdWF0aW5nIGFuIGV4cHJlc3Npb24uXG4gICAqIFRoZSBleHByZXNzaW9uIGdldHMgaW4gaXRzIGV2YWwgY29udGV4dCB0aGUgdmFyaWFibGVzOlxuICAgKiBgJG9iamVjdGAgdGhlIG9yaWdpbmFsIG9iamVjdCBiZWluZyBtYXBlZFxuICAgKiBgJHZhbHVlYCB0aGUgY3VycmVudCB2YWx1ZVxuICAgKiBgJGluZGV4YCBmb3IgYXJyYXlzLCB0aGUgY3VycmVudCBpbmRleCBiZWluZyByZXBsYWNlZFxuICAgKiBgJGtleWAgZm9yIG9iamVjdHMsIHRoZSBjdXJyZW50IGtleVxuICAgKi9cbiAgbWFwRmFjdG9yeSgpIHtcbiAgICBjb25zdCBzZWxmID0gdGhpcztcbiAgICByZXR1cm4gZnVuY3Rpb24gbWFwKG9iajogQXJyYXk8YW55PiB8IE9iamVjdCwgZXhwcmVzc2lvbjogc3RyaW5nKTogQXJyYXk8YW55PiB8IE9iamVjdCB7XG5cbiAgICAgIGlmICghZXhwcmVzc2lvbiB8fCB0eXBlb2YgZXhwcmVzc2lvbiAhPT0gJ3N0cmluZycpIHJldHVybiBvYmo7XG5cblxuICAgICAgY29uc3QgYXN0ID0gc2VsZi5fcGFyc2VyLnBhcnNlKGV4cHJlc3Npb24pO1xuICAgICAgaWYgKCFhc3QpIHJldHVybiBvYmo7XG5cbiAgICAgIGlmIChBcnJheS5pc0FycmF5KG9iaikpIHtcblxuICAgICAgICByZXR1cm4gb2JqLm1hcCgodmFsdWUsIGluZGV4KSA9PlxuICAgICAgICAgIHNlbGYuX3J4RXZhbC5ldmFsKGFzdCwgQ29udGV4dC5jcmVhdGUodGhpcywgeyAvLyB0c2xpbnQ6ZGlzYWJsZS1saW5lOm5vLWludmFsaWQtdGhpc1xuICAgICAgICAgICAgJG9iamVjdDogb2JqLFxuICAgICAgICAgICAgJHZhbHVlOiB2YWx1ZSxcbiAgICAgICAgICAgICRpbmRleDogaW5kZXhcbiAgICAgICAgICB9KSkpO1xuICAgICAgfVxuICAgICAgaWYgKHR5cGVvZiBvYmogPT09ICdvYmplY3QnKSB7XG5cbiAgICAgICAgY29uc3QgcmVzdWx0ID0ge307XG5cbiAgICAgICAgZm9yIChjb25zdCBwcm9wIGluIG9iaikgLy8gdHNsaW50OmRpc2FibGUtbGluZTpmb3JpblxuXG4gICAgICAgICAgcmVzdWx0W3Byb3BdID0gc2VsZi5fcnhFdmFsLmV2YWwoYXN0LCBDb250ZXh0LmNyZWF0ZSh0aGlzLCB7IC8vIHRzbGludDpkaXNhYmxlLWxpbmU6bm8taW52YWxpZC10aGlzXG4gICAgICAgICAgICAkb2JqZWN0OiBvYmosXG4gICAgICAgICAgICAkdmFsdWU6IG9ialtwcm9wXSxcbiAgICAgICAgICAgICRrZXk6IHByb3BcbiAgICAgICAgICB9KSk7XG5cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgIH1cbiAgICAgIHJldHVybiBvYmo7XG4gICAgfTtcbiAgfVxuXG4gIC8qKlxuICAqIEV4cHJlc3Npb24gdmVyc2lvbiBvZiB0aGUgQXJyYXkucmVkdWNlIGZ1bmN0aW9uLlxuICAgKiBJIHJlcGxhY2VzIGVhY2ggYXJyYXkvb2JqZWN0IG1lbWJlciB3aXRoIHRoZSByZXN1bHQgb2YgZXZhbHVhdGluZyBhbiBleHByZXNzaW9uLlxuICAgKiBUaGUgZXhwcmVzc2lvbiBnZXRzIGluIGl0cyBldmFsIGNvbnRleHQgdGhlIHZhcmlhYmxlczpcbiAgICogYCRvYmplY3RgIHRoZSBvcmlnaW5hbCBvYmplY3QgYmVpbmcgbWFwZWRcbiAgICogYCR2YWx1ZWAgdGhlIGN1cnJlbnQgZWxlbWVudFxuICAgKiBgJGluZGV4YCBmb3IgYXJyYXlzLCB0aGUgY3VycmVudCBpbmRleCBiZWluZyByZXBsYWNlZFxuICAgKiBgJGtleWAgZm9yIG9iamVjdHMsIHRoZSBjdXJyZW50IGtleVxuICAgKiBgJHByZXZgIHRoZSBwcmV2aW91c2x5IHJldHVybmVkIHZhbHVlICh0aGUgYWN1bXVsYXRpb24pXG4gICAqIEBwYXJhbSBvYmpcbiAgICogQHBhcmFtIGV4cHJlc3Npb25cbiAgICogQHBhcmFtIGluaXRWYWx1ZVxuICAgKi9cbiAgcmVkdWNlRmFjdG9yeSgpIHtcbiAgICBjb25zdCBzZWxmID0gdGhpcztcblxuICAgIHJldHVybiBmdW5jdGlvbiByZWR1Y2Uob2JqOiBBcnJheTxhbnk+IHwgT2JqZWN0LCBleHByZXNzaW9uOiBzdHJpbmcsIGluaXRWYWx1ZTogYW55KTogQXJyYXk8YW55PiB8IE9iamVjdCB7XG5cbiAgICAgIGlmICghZXhwcmVzc2lvbiB8fCB0eXBlb2YgZXhwcmVzc2lvbiAhPT0gJ3N0cmluZycpIHJldHVybiBvYmo7XG5cbiAgICAgIGNvbnN0IGFzdCA9IHNlbGYuX3BhcnNlci5wYXJzZShleHByZXNzaW9uKTtcbiAgICAgIGlmICghYXN0KSByZXR1cm4gaW5pdFZhbHVlO1xuXG4gICAgICBpZiAoQXJyYXkuaXNBcnJheShvYmopKSB7XG4gICAgICAgIHJldHVybiBvYmoucmVkdWNlKFxuICAgICAgICAgIChwcmV2LCB2YWx1ZSwgaW5kZXgpID0+XG5cbiAgICAgICAgICAgIHNlbGYuX3J4RXZhbC5ldmFsKGFzdCwgQ29udGV4dC5jcmVhdGUodGhpcywgeyAvLyB0c2xpbnQ6ZGlzYWJsZS1saW5lOm5vLWludmFsaWQtdGhpc1xuICAgICAgICAgICAgICAkb2JqZWN0OiBvYmosXG4gICAgICAgICAgICAgICRwcmV2OiBwcmV2LFxuICAgICAgICAgICAgICAkdmFsdWU6IHZhbHVlLFxuICAgICAgICAgICAgICAkaW5kZXg6IGluZGV4XG4gICAgICAgICAgICB9KSksIGluaXRWYWx1ZSk7XG4gICAgICB9XG4gICAgICBpZiAodHlwZW9mIG9iaiA9PT0gJ29iamVjdCcpIHtcblxuICAgICAgICBsZXQgcmVzdWx0ID0gaW5pdFZhbHVlO1xuXG4gICAgICAgIGZvciAoY29uc3QgcHJvcCBpbiBvYmopIC8vIHRzbGludDpkaXNhYmxlLWxpbmU6Zm9yaW5cblxuICAgICAgICAgIHJlc3VsdCA9IHNlbGYuX3J4RXZhbC5ldmFsKGFzdCwgQ29udGV4dC5jcmVhdGUodGhpcywgeyAvLyB0c2xpbnQ6ZGlzYWJsZS1saW5lOm5vLWludmFsaWQtdGhpc1xuICAgICAgICAgICAgJHByZXY6IHJlc3VsdCxcbiAgICAgICAgICAgICR2YWx1ZTogb2JqW3Byb3BdLFxuICAgICAgICAgICAgJGtleTogcHJvcFxuICAgICAgICAgIH0pKTtcblxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgfVxuICAgICAgcmV0dXJuIG9iajtcbiAgICB9O1xuICB9XG59XG5cbmV4cG9ydCBjb25zdCBleHByZXNzaW9uUHJvdmlkZXIgPSB7XG4gIHByb3ZpZGU6IEV4cHJlc3Npb25zLFxuICB1c2VDbGFzczogRVNwcmVzc2lvblxufTtcbiIsIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDE4IEFkcmlhbiBQYW5lbGxhIDxpYW5jaGk3NEBvdXRsb29rLmNvbT5cbiAqXG4gKiBUaGlzIHNvZnR3YXJlIGlzIHJlbGVhc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS5cbiAqIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvTUlUXG4gKi9cblxuaW1wb3J0IHsgQ29tcG9uZW50LCBWaWV3RW5jYXBzdWxhdGlvbiwgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENoYW5nZURldGVjdG9yUmVmfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEFic3RyYWN0V2lkZ2V0IH0gZnJvbSAnLi9hYnN0cmFjdHdpZGdldCc7XG5pbXBvcnQgeyBFeHByZXNzaW9ucyB9IGZyb20gJy4vZXhwcmVzc2lvbnMnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICd3ZGctZGVmYXVsdCcsXG4gIHRlbXBsYXRlOiAnPGRpdj5Vbmtub3duIHdpZGdldCBcInt7dHlwZX19XCI8L2Rpdj4nLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBEZWZhdWx0V2lkZ2V0Q29tcG9uZW50IGV4dGVuZHMgQWJzdHJhY3RXaWRnZXQge1xuXG4gIGNvbnN0cnVjdG9yKGNkcjogQ2hhbmdlRGV0ZWN0b3JSZWYsIGV4cHI6IEV4cHJlc3Npb25zKSB7XG4gICAgc3VwZXIoY2RyLCBleHByKTtcbiAgfVxufVxuIiwiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTggQWRyaWFuIFBhbmVsbGEgPGlhbmNoaTc0QG91dGxvb2suY29tPlxuICpcbiAqIFRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLlxuICogaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9NSVRcbiAqL1xuXG5pbXBvcnQgeyBUeXBlLCBJbmplY3QsIEluamVjdGlvblRva2VuLCBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBBYnN0cmFjdFdpZGdldCB9IGZyb20gJy4vYWJzdHJhY3R3aWRnZXQnO1xuaW1wb3J0IHsgRGVmYXVsdFdpZGdldENvbXBvbmVudCB9IGZyb20gJy4vZGVmYXVsdHdpZGdldC5jb21wb25lbnQnO1xuXG5leHBvcnQgY29uc3QgQUZfQ09ORklHX1RPS0VOID0gbmV3IEluamVjdGlvblRva2VuPElBdXRvRm9ybUNvbmZpZz4oJ0FGX0NPTkZJR19UT0tFTicpO1xuXG5cbmV4cG9ydCBpbnRlcmZhY2UgSVdpZGdldENvbmYge1xuICB0eXBlOiBzdHJpbmc7XG4gIGNvbXBvbmVudDogVHlwZTxBYnN0cmFjdFdpZGdldD47XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgSUF1dG9Gb3JtQ29uZmlnIHtcbiAgd2lkZ2V0cz86IElXaWRnZXRDb25mW10gfCBJV2lkZ2V0Q29uZjtcbn1cblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgV2lkZ2V0UmVnaXN0cnkge1xuXG4gIHByaXZhdGUgX3JlZ2lzdHJ5ID0gbmV3IE1hcDxzdHJpbmcsIFR5cGU8QWJzdHJhY3RXaWRnZXQ+PigpO1xuXG4gIHByaXZhdGUgX2RlZmF1bHQ6IFR5cGU8QWJzdHJhY3RXaWRnZXQ+O1xuXG5cbiAgY29uc3RydWN0b3IoQEluamVjdChBRl9DT05GSUdfVE9LRU4pIGNvbmZpZ3M6IElBdXRvRm9ybUNvbmZpZ1tdID0gW10pIHtcblxuICAgIGNvbmZpZ3MuZm9yRWFjaChjb25mID0+IGNvbmYud2lkZ2V0cyAmJiB0aGlzLnJlZ2lzdGVyKGNvbmYud2lkZ2V0cykpO1xuXG4gICAgdGhpcy5fZGVmYXVsdCA9IHRoaXMuX3JlZ2lzdHJ5LmdldCgnZGVmYXVsdCcpIHx8IERlZmF1bHRXaWRnZXRDb21wb25lbnQ7XG4gIH1cblxuICByZWdpc3Rlcih3aWRnZXRzOiBJV2lkZ2V0Q29uZltdIHwgSVdpZGdldENvbmYpIHtcbiAgICBpZiAoIXdpZGdldHMpIHJldHVybjtcbiAgICBpZiAoIUFycmF5LmlzQXJyYXkod2lkZ2V0cykpIHdpZGdldHMgPSBbd2lkZ2V0c107XG5cbiAgICB3aWRnZXRzLmZvckVhY2god2lkZ2V0ID0+IHtcbiAgICAgIGlmICh3aWRnZXQudHlwZSAmJiB3aWRnZXQuY29tcG9uZW50KSB0aGlzLl9yZWdpc3RyeS5zZXQod2lkZ2V0LnR5cGUsIHdpZGdldC5jb21wb25lbnQpO1xuICAgIH0pO1xuICB9XG5cblxuXG5cbiAgZ2V0KHR5cGU6IHN0cmluZyk6IFR5cGU8QWJzdHJhY3RXaWRnZXQ+IHtcbiAgICByZXR1cm4gdGhpcy5fcmVnaXN0cnkuZ2V0KHR5cGUpIHx8IHRoaXMuX2RlZmF1bHQ7XG4gIH1cblxufVxuIiwiaW1wb3J0IHtcbiAgRGlyZWN0aXZlLCBJbnB1dCxcbiAgVmlld0NvbnRhaW5lclJlZixcbiAgQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLCBDb21wb25lbnRSZWYsXG4gIE9uQ2hhbmdlcywgT25EZXN0cm95LCBPcHRpb25hbCwgSW5qZWN0LCBJbmplY3Rpb25Ub2tlbixcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBXaWRnZXRSZWdpc3RyeSB9IGZyb20gJy4vd2lkZ2V0cmVnaXN0cnkuc2VydmljZSc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IEFic3RyYWN0V2lkZ2V0LCBwYXJzZURlZk9iamVjdCB9IGZyb20gJy4vYWJzdHJhY3R3aWRnZXQnO1xuaW1wb3J0IHsgSVdpZGdldERlZiB9IGZyb20gJy4vd2lkZ2V0LmludGVyZmFjZSc7XG5pbXBvcnQgeyBDb250ZXh0IH0gZnJvbSAnLi9jb250ZXh0JztcbmltcG9ydCB7IEV4cHJlc3Npb25zIH0gZnJvbSAnLi9leHByZXNzaW9ucyc7XG5cbi8qKiBJbmplY3Rpb24gdG9rZW4gdXNlZCB0byBwcm92aWRlIHRoZSBkZWZhdWx0IHJvb3QgY29udGV4dCBmb3Igd2lkZ2V0cyAqL1xuZXhwb3J0IGNvbnN0IFJPT1RfQ09OVEVYVCA9IG5ldyBJbmplY3Rpb25Ub2tlbjxDb250ZXh0PignV2lkZ2V0cyBSb290IENvbnRleHQnKTtcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW3dkZ1dpZGdldF0nXG59KVxuZXhwb3J0IGNsYXNzIFdpZGdldERpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uQ2hhbmdlcywgT25EZXN0cm95IHtcblxuICBASW5wdXQoKSB3ZGdXaWRnZXQ6IElXaWRnZXREZWY7XG4gIEBJbnB1dCgpIHBhcmVudENvbnRleHQ6IENvbnRleHQ7XG5cbiAgd2lkZ2V0OiBBYnN0cmFjdFdpZGdldDtcbiAgY29udGV4dDogQ29udGV4dDtcbiAgcHJpdmF0ZSBfd2lkZ2V0UmVmOiBDb21wb25lbnRSZWY8QWJzdHJhY3RXaWRnZXQ+O1xuICBwcml2YXRlIF9pZlN1YnM6IFN1YnNjcmlwdGlvbjtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIF9jb250YWluZXI6IFZpZXdDb250YWluZXJSZWYsXG4gICAgcHJpdmF0ZSBfcmVnaXN0cnk6IFdpZGdldFJlZ2lzdHJ5LFxuICAgIHByaXZhdGUgX2NmcjogQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLFxuICAgIEBPcHRpb25hbCgpIEBJbmplY3QoUk9PVF9DT05URVhUKSBwcml2YXRlIF9yb290Q29udGV4dDogQ29udGV4dCxcbiAgICBwcml2YXRlIF9leHByOiBFeHByZXNzaW9uc1xuICApIHtcbiAgfVxuXG4gIG5nT25DaGFuZ2VzKCkge1xuXG4gICAgdGhpcy5fcHJlQ3JlYXRlKCk7XG5cbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuX2Rlc3Ryb3koKTtcbiAgICB0aGlzLl91bnN1c2NyaWJlKCk7XG4gIH1cblxuICBwcml2YXRlIF9wcmVDcmVhdGUoKSB7XG4gICAgdGhpcy53ZGdXaWRnZXQgPSB0aGlzLndkZ1dpZGdldCB8fCB7IHR5cGU6ICdub25lJyB9O1xuICAgIHRoaXMucGFyZW50Q29udGV4dCA9IHRoaXMucGFyZW50Q29udGV4dCB8fCB0aGlzLl9yb290Q29udGV4dDtcbiAgICB0aGlzLmNvbnRleHQgPSBDb250ZXh0LmNyZWF0ZSh0aGlzLnBhcmVudENvbnRleHQsIHBhcnNlRGVmT2JqZWN0KHRoaXMud2RnV2lkZ2V0LmNvbnRleHQsIHRoaXMucGFyZW50Q29udGV4dCwgZmFsc2UsIHRoaXMuX2V4cHIpKTtcblxuICAgIHRoaXMuX2Rlc3Ryb3koKTtcbiAgICB0aGlzLl91bnN1c2NyaWJlKCk7XG5cbiAgICBpZiAodGhpcy53ZGdXaWRnZXQuaWYpIHtcbiAgICAgIHRoaXMuX2lmU3VicyA9IHRoaXMuX2V4cHIuZXZhbCh0aGlzLndkZ1dpZGdldC5pZiwgdGhpcy5jb250ZXh0LCB0cnVlKS5zdWJzY3JpYmUoY29uZCA9PiB7XG4gICAgICAgIGlmIChjb25kICYmICF0aGlzLl93aWRnZXRSZWYpIHRoaXMuX2NyZWF0ZSgpO1xuICAgICAgICBlbHNlIHRoaXMuX2Rlc3Ryb3koKTtcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB0aGlzLl9jcmVhdGUoKTtcblxuXG4gIH1cblxuICBwcml2YXRlIF9jcmVhdGUoKSB7XG5cbiAgICBjb25zdCB3aWRnZXRDbGFzcyA9IHRoaXMuX3JlZ2lzdHJ5LmdldCh0aGlzLndkZ1dpZGdldC50eXBlKTtcbiAgICBjb25zdCBmYWN0b3J5ID0gdGhpcy5fY2ZyLnJlc29sdmVDb21wb25lbnRGYWN0b3J5KHdpZGdldENsYXNzKTtcbiAgICB0aGlzLl93aWRnZXRSZWYgPSB0aGlzLl9jb250YWluZXIuY3JlYXRlQ29tcG9uZW50KGZhY3RvcnkpO1xuICAgIHRoaXMud2lkZ2V0ID0gdGhpcy5fd2lkZ2V0UmVmLmluc3RhbmNlO1xuXG4gICAgdGhpcy53aWRnZXQuc2V0dXAodGhpcywgdGhpcy53ZGdXaWRnZXQsIHRoaXMuY29udGV4dCk7XG5cbiAgfVxuXG4gIHByaXZhdGUgX2Rlc3Ryb3koKSB7XG4gICAgaWYgKHRoaXMuX3dpZGdldFJlZikge1xuICAgICAgdGhpcy5fd2lkZ2V0UmVmLmRlc3Ryb3koKTtcbiAgICAgIHRoaXMuX3dpZGdldFJlZiA9IG51bGw7XG4gICAgfVxuXG4gIH1cblxuICBwcml2YXRlIF91bnN1c2NyaWJlKCkge1xuXG4gICAgaWYgKHRoaXMuX2lmU3Vicykge1xuICAgICAgdGhpcy5faWZTdWJzLnVuc3Vic2NyaWJlKCk7XG4gICAgICB0aGlzLl9pZlN1YnMgPSBudWxsO1xuICAgIH1cbiAgfVxufVxuIiwiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTggQWRyaWFuIFBhbmVsbGEgPGlhbmNoaTc0QG91dGxvb2suY29tPlxuICpcbiAqIFRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLlxuICogaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9NSVRcbiAqL1xuXG5pbXBvcnQgeyBmb3JtYXROdW1iZXIsIGZvcm1hdERhdGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgUGlwZSwgUGlwZVRyYW5zZm9ybSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG4vKiogQW5ndWxhciBQaXBlIHRvIGZvcm1hdCB0ZXh0ICovXG5AUGlwZSh7XG4gIG5hbWU6ICdmb3JtYXQnLFxuICBwdXJlOiB0cnVlXG59KVxuZXhwb3J0IGNsYXNzIEZvcm1hdFBpcGUgaW1wbGVtZW50cyBQaXBlVHJhbnNmb3JtIHtcbiAgdHJhbnNmb3JtKHZhbHVlOiBhbnksIGZvcm1hdDogYW55KSB7XG4gICAgcmV0dXJuIGZvcm1hdCA/IGZvcm1hdFZhbHVlKHZhbHVlLCBmb3JtYXQpIDogdmFsdWU7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGZvcm1hdFZhbHVlKHZhbHVlOiBhbnksIGZvcm1hdDogc3RyaW5nKSB7XG4gIGlmICh0eXBlb2YgZm9ybWF0ICE9PSAnc3RyaW5nJyB8fCB2YWx1ZSA9PSBudWxsKSByZXR1cm4gdmFsdWU7XG4gIGNvbnN0IHJlID0gL15cXHMqKFxcdyspXFxzKig6KFtcIiddKShbXlwiJ10qKVxcMyk/JC87XG5cbiAgY29uc3QgbWF0Y2g6IFJlZ0V4cEV4ZWNBcnJheSA9IHJlLmV4ZWMoZm9ybWF0KTtcblxuICBpZiAoIW1hdGNoWzBdKSByZXR1cm4gdmFsdWU7XG5cbiAgc3dpdGNoIChtYXRjaFsxXS50b1VwcGVyQ2FzZSgpKSB7XG4gICAgY2FzZSAnTlVNQkVSJzpcbiAgICAgIGxldCBudW07XG4gICAgICBudW0gPSBwYXJzZUZsb2F0KHZhbHVlKTtcbiAgICAgIHJldHVybiBpc05hTihudW0pID8gdmFsdWUgOiBmb3JtYXROdW1iZXIobnVtLCAnZW4tVVMnLCBtYXRjaFs0XSk7XG4gICAgY2FzZSAnREFURSc6XG4gICAgICByZXR1cm4gZm9ybWF0RGF0ZSh2YWx1ZSwgbWF0Y2hbNF0sICdlbi1VUycpO1xuICB9XG5cbiAgcmV0dXJuIHZhbHVlO1xufVxuIiwiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTggQWRyaWFuIFBhbmVsbGEgPGlhbmNoaTc0QG91dGxvb2suY29tPlxuICpcbiAqIFRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLlxuICogaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9NSVRcbiAqL1xuXG5pbXBvcnQgeyBDb21wb25lbnQsIFZpZXdFbmNhcHN1bGF0aW9uLCBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBBY3RpdmF0ZWRSb3V0ZSB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBJV2lkZ2V0RGVmIH0gZnJvbSAnLi93aWRnZXQuaW50ZXJmYWNlJztcbmltcG9ydCB7IENvbnRleHQgfSBmcm9tICcuL2NvbnRleHQnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICd3ZGctd2lkZ2V0JyxcbiAgdGVtcGxhdGU6ICc8bmctY29udGFpbmVyIFt3ZGdXaWRnZXRdPVwid2lkZ2V0RGVmXCIgW3BhcmVudENvbnRleHRdPVwicGFyZW50Q29udGV4dFwiPjwvbmctY29udGFpbmVyPicsXG5cbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcbn0pXG5leHBvcnQgY2xhc3MgUm91dGVkV2lkZ2V0Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICB3aWRnZXREZWY6IElXaWRnZXREZWY7XG4gIHBhcmVudENvbnRleHQ6IENvbnRleHQ7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfcm91dGU6IEFjdGl2YXRlZFJvdXRlKSB7IH1cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy53aWRnZXREZWYgPSB0aGlzLl9yb3V0ZS5zbmFwc2hvdC5kYXRhLndpZGdldERlZiB8fCB7IHR5cGU6ICdlbXB0eScgfTtcbiAgICB0aGlzLnBhcmVudENvbnRleHQgPSB0aGlzLl9yb3V0ZS5zbmFwc2hvdC5kYXRhLnBhcmVudENvbnRleHQ7XG4gIH1cblxufVxuIiwiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTggQWRyaWFuIFBhbmVsbGEgPGlhbmNoaTc0QG91dGxvb2suY29tPlxuICpcbiAqIFRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLlxuICogaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9NSVRcbiAqL1xuXG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTmdNb2R1bGUsIE1vZHVsZVdpdGhQcm92aWRlcnMsIEFOQUxZWkVfRk9SX0VOVFJZX0NPTVBPTkVOVFMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgRGVmYXVsdFdpZGdldENvbXBvbmVudCB9IGZyb20gJy4vZGVmYXVsdHdpZGdldC5jb21wb25lbnQnO1xuaW1wb3J0IHsgQUZfQ09ORklHX1RPS0VOLCBJQXV0b0Zvcm1Db25maWcgfSBmcm9tICcuL3dpZGdldHJlZ2lzdHJ5LnNlcnZpY2UnO1xuaW1wb3J0IHsgV2lkZ2V0RGlyZWN0aXZlIH0gZnJvbSAnLi93aWRnZXQuZGlyZWN0aXZlJztcbmltcG9ydCB7IEZvcm1hdFBpcGUgfSBmcm9tICcuL2Zvcm1hdCc7XG5pbXBvcnQgeyBSb3V0ZWRXaWRnZXRDb21wb25lbnQgfSBmcm9tICcuL3JvdXRlZHdpZGdldC5jb21wb25lbnQnO1xuXG5cbkBOZ01vZHVsZSh7XG5cbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZV0sXG4gIGRlY2xhcmF0aW9uczogW1xuICAgIFdpZGdldERpcmVjdGl2ZSxcbiAgICBSb3V0ZWRXaWRnZXRDb21wb25lbnQsXG4gICAgRGVmYXVsdFdpZGdldENvbXBvbmVudCxcbiAgICBGb3JtYXRQaXBlXG4gIF0sXG4gIGVudHJ5Q29tcG9uZW50czogW0RlZmF1bHRXaWRnZXRDb21wb25lbnRdLFxuICBleHBvcnRzOiBbXG4gICAgV2lkZ2V0RGlyZWN0aXZlLFxuICAgIFJvdXRlZFdpZGdldENvbXBvbmVudCxcbiAgICBGb3JtYXRQaXBlXG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgV2lkZ2V0c0NvcmVNb2R1bGUge1xuXG4gIHN0YXRpYyBmb3JSb290KGNvbmZpZzogSUF1dG9Gb3JtQ29uZmlnID0ge30pOiBNb2R1bGVXaXRoUHJvdmlkZXJzIHtcbiAgICByZXR1cm4ge1xuICAgICAgbmdNb2R1bGU6IFdpZGdldHNDb3JlTW9kdWxlLFxuICAgICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIHsgcHJvdmlkZTogQUZfQ09ORklHX1RPS0VOLCB1c2VWYWx1ZTogY29uZmlnLCBtdWx0aTogdHJ1ZSB9LFxuICAgICAgICB7IHByb3ZpZGU6IEFOQUxZWkVfRk9SX0VOVFJZX0NPTVBPTkVOVFMsIHVzZVZhbHVlOiBjb25maWcsIG11bHRpOiB0cnVlIH1cbiAgICAgIF1cbiAgICB9O1xuICB9XG59XG5cblxuIiwiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTggQWRyaWFuIFBhbmVsbGEgPGlhbmNoaTc0QG91dGxvb2suY29tPlxuICpcbiAqIFRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLlxuICogaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9NSVRcbiAqL1xuXG5pbXBvcnQgeyBGb3JtQ29udHJvbCwgRm9ybUdyb3VwLCBGb3JtQXJyYXksIEFic3RyYWN0Q29udHJvbCB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IENoYW5nZURldGVjdG9yUmVmfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEdFVF9PQlNFUlZBQkxFLCBpc1JlYWN0aXZlLCBJTm9kZSB9IGZyb20gJ2VzcHJlc3Npb24nO1xuaW1wb3J0IHsgdGFrZSwgbWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgQWJzdHJhY3RXaWRnZXQgfSBmcm9tICcuL2Fic3RyYWN0d2lkZ2V0JztcbmltcG9ydCB7IENvbnRleHQgfSBmcm9tICcuL2NvbnRleHQnO1xuaW1wb3J0IHsgRXhwcmVzc2lvbnMgfSBmcm9tICcuL2V4cHJlc3Npb25zJztcbmltcG9ydCB7IElXaWRnZXREZWYgfSBmcm9tICcuL3dpZGdldC5pbnRlcmZhY2UnO1xuXG5cbmV4cG9ydCBjb25zdCBGT1JNX0NPTlRST0wgPSBTeW1ib2woJ0Zvcm1Db250cm9sJyk7XG5leHBvcnQgY2xhc3MgQWJzdHJhY3RGb3JtRmllbGRXaWRnZXQgZXh0ZW5kcyBBYnN0cmFjdFdpZGdldCB7XG5cblxuICBmb3JtQ29udHJvbDogRm9ybUNvbnRyb2w7XG5cbiAgdmFsaWRhdGU6IElOb2RlO1xuICB2YWxpZGF0ZUNvbnRleHQ6IENvbnRleHQ7XG4gIGNvbnN0cnVjdG9yKGNkcjogQ2hhbmdlRGV0ZWN0b3JSZWYsIGV4cHI6IEV4cHJlc3Npb25zKSB7XG4gICAgc3VwZXIoY2RyLCBleHByKTtcbiAgfVxuICBkeW5PblNldHVwKGRlZjogSVdpZGdldERlZik6IElXaWRnZXREZWYge1xuXG4gICAgLy8gZ2V0IGJvdW5kIG1vZGVsXG4gICAgaWYgKCFkZWYuYmluZClcbiAgICAgIHRocm93IG5ldyBFcnJvcignRm9ybSBmaWVsZCB3aWRnZXRzIG11c3QgaGF2ZSBhIFwiYmluZFwiIHByb3BlcnR5IGRlZmluZWQnKTtcblxuICAgIGNvbnN0IGx2YWx1ZSA9IHRoaXMuX2V4cHIubHZhbHVlKGRlZi5iaW5kLCB0aGlzLmNvbnRleHQpO1xuXG4gICAgaWYgKCFsdmFsdWUpXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0Zvcm0gZmllbGQgXCJiaW5kXCIgcHJvcGVydHkgbXVzdCBiZSBhbiBpZGVudGlmaWVyIG9yIG1lbWJlciBleHByZXNzaW9uJyk7XG5cbiAgICBpZiAoIWlzUmVhY3RpdmUobHZhbHVlLm8pKVxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdCb3VuZCBLZXkgbXVzdCBiZSBvZiBSZWFjdGl2ZSBUeXBlJyk7XG5cblxuICAgIC8vIHNldHVwIHZhbGlkYXRpb25cblxuXG4gICAgaWYgKGRlZi52YWxpZGF0ZSAmJiAodGhpcy52YWxpZGF0ZSA9IHRoaXMuX2V4cHIucGFyc2UoZGVmLnZhbGlkYXRlKSkpIHsvLyB0c2xpbnQ6ZGlzYWJsZS1saW5lOndoaXRlc3BhY2VcbiAgICAgIHRoaXMudmFsaWRhdGVDb250ZXh0ID0gQ29udGV4dC5jcmVhdGUodGhpcy5jb250ZXh0KTtcblxuICAgICAgdGhpcy5mb3JtQ29udHJvbCA9IG5ldyBGb3JtQ29udHJvbChudWxsLCBudWxsLCAoY3RybDogQWJzdHJhY3RDb250cm9sKSA9PiB7XG4gICAgICAgIHRoaXMudmFsaWRhdGVDb250ZXh0WyckdmFsdWUnXSA9IGN0cmwudmFsdWU7XG4gICAgICAgIHJldHVybiB0aGlzLl9leHByLmV2YWx1YXRlKHRoaXMudmFsaWRhdGUsIHRoaXMudmFsaWRhdGVDb250ZXh0LCB0cnVlKS5waXBlKFxuICAgICAgICAgIHRha2UoMSksXG4gICAgICAgICAgbWFwKHJlcyA9PiB7XG4gICAgICAgICAgICByZXR1cm4gcmVzID8gbnVsbCA6IHsgdmFsaWRhdGU6ICd2YWxpZGF0aW9uIGVycm9yJyB9O1xuICAgICAgICAgIH0pXG4gICAgICAgICk7XG4gICAgICB9KTtcbiAgICB9IGVsc2UgdGhpcy5mb3JtQ29udHJvbCA9IG5ldyBGb3JtQ29udHJvbCgpO1xuXG4gICAgY29uc3QgcGFyZW50Rm9ybTogRm9ybUdyb3VwIHwgRm9ybUFycmF5ID0gdGhpcy5jb250ZXh0W0ZPUk1fQ09OVFJPTF07XG4gICAgaWYgKHBhcmVudEZvcm0pIHtcbiAgICAgIGlmIChwYXJlbnRGb3JtIGluc3RhbmNlb2YgRm9ybUdyb3VwKSBwYXJlbnRGb3JtLmFkZENvbnRyb2wobHZhbHVlLm0sIHRoaXMuZm9ybUNvbnRyb2wpO1xuICAgICAgZWxzZSBpZiAocGFyZW50Rm9ybSBpbnN0YW5jZW9mIEZvcm1BcnJheSkgcGFyZW50Rm9ybS5wdXNoKHRoaXMuZm9ybUNvbnRyb2wpO1xuICAgIH1cblxuICAgIC8vIGxpc3RlbiB0byBib3VuZCBjb250ZXh0IHZhbHVlIGFuZCB1cGRhdGUgb24gY2hhbmdlc1xuICAgIHRoaXMuYWRkU3Vic2NyaXB0aW9uID0gbHZhbHVlLm9bR0VUX09CU0VSVkFCTEVdKGx2YWx1ZS5tKS5zdWJzY3JpYmUodmFsID0+XG4gICAgICB2YWwgIT09IHRoaXMuZm9ybUNvbnRyb2wudmFsdWUgJiYgdGhpcy5mb3JtQ29udHJvbC5zZXRWYWx1ZSh2YWwpKTtcblxuICAgIC8vIGxpc3RlbiB0byBjb250cm9sIGNoYW5nZXMgdG8gdXBkYXRlIGJvdW5kIGNvbnRleHQgdmFsdWVcbiAgICB0aGlzLmFkZFN1YnNjcmlwdGlvbiA9IHRoaXMuZm9ybUNvbnRyb2wudmFsdWVDaGFuZ2VzLnN1YnNjcmliZSh2YWwgPT4ge1xuICAgICAgaWYgKHZhbCAhPT0gbHZhbHVlLm9bbHZhbHVlLm1dKVxuICAgICAgICBsdmFsdWUub1tsdmFsdWUubV0gPSB2YWw7XG4gICAgfSk7XG5cblxuICAgIHJldHVybiBkZWY7XG4gIH1cbn1cbiIsIi8qIVxuICogQ29weXJpZ2h0IChjKSAyMDE3IEFkcmlhbiBQYW5lbGxhIDxpYW5jaGk3NEBvdXRsb29rLmNvbT4sIGNvbnRyaWJ1dG9ycy5cbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZS5cbiAqL1xuXG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IFJlYWN0aXZlRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5cbmltcG9ydCB7IE1hdEJ1dHRvbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2J1dHRvbic7XG5pbXBvcnQgeyBNYXREaWFsb2dNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9kaWFsb2cnO1xuaW1wb3J0IHsgTWF0SWNvbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2ljb24nO1xuaW1wb3J0IHsgTWF0SW5wdXRNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9pbnB1dCc7XG5pbXBvcnQgeyBNYXRMaXN0TW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvbGlzdCc7XG5pbXBvcnQgeyBNYXRTaWRlbmF2TW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvc2lkZW5hdic7XG5pbXBvcnQgeyBNYXRDYXJkTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvY2FyZCc7XG5pbXBvcnQgeyBNYXRUb29sYmFyTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvdG9vbGJhcic7XG5pbXBvcnQgeyBNYXRQcm9ncmVzc0Jhck1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL3Byb2dyZXNzLWJhcic7XG5pbXBvcnQgeyBNYXRFeHBhbnNpb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9leHBhbnNpb24nO1xuaW1wb3J0IHsgTWF0U2VsZWN0TW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvc2VsZWN0JztcbmltcG9ydCB7IE1hdFRhYnNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC90YWJzJztcbmltcG9ydCB7IE1hdFNuYWNrQmFyTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvc25hY2stYmFyJztcbmltcG9ydCB7IE1hdFNsaWRlVG9nZ2xlTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvc2xpZGUtdG9nZ2xlJztcbmltcG9ydCB7IE1hdENoaXBzTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvY2hpcHMnO1xuaW1wb3J0IHsgTWF0QXV0b2NvbXBsZXRlTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvYXV0b2NvbXBsZXRlJztcbmltcG9ydCB7IE1hdENoZWNrYm94TW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvY2hlY2tib3gnO1xuaW1wb3J0IHsgTWF0U2xpZGVyTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvc2xpZGVyJztcbmltcG9ydCB7IE1hdFRhYmxlTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvdGFibGUnO1xuaW1wb3J0IHsgTWF0UGFnaW5hdG9yTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvcGFnaW5hdG9yJztcbmltcG9ydCB7IE1hdFNvcnRNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9zb3J0JztcbmltcG9ydCB7IE1hdE1lbnVNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9tZW51JztcblxuLyoqXG4gKiBIZWxwZXIgbW9kdWxlIHRvIGNlbnRyYWxseSBpbXBvcnQgYWxsIG1hdGVyaWFsIGNvbXBvbmVudHNcbiAqL1xuQE5nTW9kdWxlKHtcbiAgZXhwb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBSZWFjdGl2ZUZvcm1zTW9kdWxlLFxuXG4gICAgTWF0QXV0b2NvbXBsZXRlTW9kdWxlLFxuICAgIE1hdFNpZGVuYXZNb2R1bGUsXG4gICAgTWF0QnV0dG9uTW9kdWxlLFxuICAgIE1hdEljb25Nb2R1bGUsXG4gICAgTWF0TGlzdE1vZHVsZSxcbiAgICBNYXRJbnB1dE1vZHVsZSxcbiAgICBNYXREaWFsb2dNb2R1bGUsXG4gICAgTWF0VG9vbGJhck1vZHVsZSxcbiAgICBNYXRQcm9ncmVzc0Jhck1vZHVsZSxcbiAgICBNYXRFeHBhbnNpb25Nb2R1bGUsXG4gICAgTWF0U2VsZWN0TW9kdWxlLFxuICAgIE1hdFRhYnNNb2R1bGUsXG4gICAgTWF0U25hY2tCYXJNb2R1bGUsXG4gICAgTWF0U2xpZGVUb2dnbGVNb2R1bGUsXG4gICAgTWF0Q2hpcHNNb2R1bGUsXG4gICAgTWF0Q2FyZE1vZHVsZSxcbiAgICBNYXRDaGVja2JveE1vZHVsZSxcbiAgICBNYXRTbGlkZXJNb2R1bGUsXG4gICAgTWF0VGFibGVNb2R1bGUsXG4gICAgTWF0UGFnaW5hdG9yTW9kdWxlLFxuICAgIE1hdFNvcnRNb2R1bGUsXG4gICAgTWF0TWVudU1vZHVsZSxcbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBNYXRlcmlhbE1vZHVsZSB7IH1cbiIsIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDE4IEFkcmlhbiBQYW5lbGxhIDxpYW5jaGk3NEBvdXRsb29rLmNvbT5cbiAqXG4gKiBUaGlzIHNvZnR3YXJlIGlzIHJlbGVhc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS5cbiAqIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvTUlUXG4gKi9cblxuXG5pbXBvcnQgeyBDb21wb25lbnQsIFZpZXdFbmNhcHN1bGF0aW9uLCBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ2hhbmdlRGV0ZWN0b3JSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEV4cHJlc3Npb25zLCBBYnN0cmFjdEZvcm1GaWVsZFdpZGdldCB9IGZyb20gJy4uLy4uLy4uL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICd3ZGctaW5wdXQnLFxuICB0ZW1wbGF0ZTogYDxtYXQtZm9ybS1maWVsZCBzdHlsZS53aWR0aD1cIjEwMCVcIj5cblxuICAgIDxtYXQtbGFiZWwgKm5nSWY9XCJ0aXRsZVwiPlxuICAgICAgICB7eyB0aXRsZSB9fVxuICAgIDwvbWF0LWxhYmVsPlxuXG4gICAgPGlucHV0IG1hdElucHV0XG4gICAgICAgICAgIG5hbWU9XCJhYWFcIlxuICAgICAgICAgICBbdHlwZV09XCJ0eXBlIHx8ICd0ZXh0J1wiXG4gICAgICAgICAgIFtmb3JtQ29udHJvbF09XCJmb3JtQ29udHJvbFwiXG4gICAgICAgICAgIFtwbGFjZWhvbGRlcl09XCJwbGFjZWhvbGRlclwiXG4gICAgICAgICAgIFtyZXF1aXJlZF09XCJyZXF1aXJlZFwiPlxuXG4gICAgPG1hdC1lcnJvciBbaWRdPVwibnVsbFwiPlxuXG4gICAgPC9tYXQtZXJyb3I+XG5cbiAgICA8bWF0LWhpbnQgKm5nSWY9XCJkZXNjcmlwdGlvblwiXG4gICAgICAgICAgICAgIFtpZF09XCJudWxsXCI+XG4gICAgICAgIHt7IGRlc2NyaXB0aW9uIH19XG4gICAgPC9tYXQtaGludD5cblxuPC9tYXQtZm9ybS1maWVsZD5cbmAsXG4gIHN0eWxlczogW2BgXSxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcbn0pXG5leHBvcnQgY2xhc3MgSW5wdXRXaWRnZXRDb21wb25lbnQgZXh0ZW5kcyBBYnN0cmFjdEZvcm1GaWVsZFdpZGdldCB7XG5cbiAgdGl0bGU6IHN0cmluZztcbiAgZGVzY3JpcHRpb246IHN0cmluZztcbiAgcGxhY2Vob2xkZXI6IHN0cmluZztcbiAgcmVxdWlyZWQ6IGJvb2xlYW47XG5cbiAgY29uc3RydWN0b3IoY2RyOiBDaGFuZ2VEZXRlY3RvclJlZiwgZXhwcjogRXhwcmVzc2lvbnMpIHtcbiAgICBzdXBlcihjZHIsIGV4cHIpO1xuICB9XG5cbn1cbiIsIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDE4IEFkcmlhbiBQYW5lbGxhIDxpYW5jaGk3NEBvdXRsb29rLmNvbT5cbiAqXG4gKiBUaGlzIHNvZnR3YXJlIGlzIHJlbGVhc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS5cbiAqIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvTUlUXG4gKi9cblxuXG5pbXBvcnQgeyBDb21wb25lbnQsIFZpZXdFbmNhcHN1bGF0aW9uLCBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ2hhbmdlRGV0ZWN0b3JSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEV4cHJlc3Npb25zLCBBYnN0cmFjdEZvcm1GaWVsZFdpZGdldCB9IGZyb20gJy4uLy4uLy4uL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICd3ZGctY2hlY2tib3gnLFxuICB0ZW1wbGF0ZTogYDxtYXQtY2hlY2tib3ggbGFiZWxQb3NpdGlvbj1cImJlZm9yZVwiIFtmb3JtQ29udHJvbF09XCJmb3JtQ29udHJvbFwiPlxuICB7e3RpdGxlfX1cbjwvbWF0LWNoZWNrYm94PlxuYCxcbiAgc3R5bGVzOiBbYGBdLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBDaGVja2JveFdpZGdldENvbXBvbmVudCBleHRlbmRzIEFic3RyYWN0Rm9ybUZpZWxkV2lkZ2V0IHtcbiAgdGl0bGU6IHN0cmluZztcbiAgY29uc3RydWN0b3IoY2RyOiBDaGFuZ2VEZXRlY3RvclJlZiwgZXhwcjogRXhwcmVzc2lvbnMpIHtcbiAgICBzdXBlcihjZHIsIGV4cHIpO1xuICB9XG5cbn1cbiIsIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDE4IEFkcmlhbiBQYW5lbGxhIDxpYW5jaGk3NEBvdXRsb29rLmNvbT5cbiAqXG4gKiBUaGlzIHNvZnR3YXJlIGlzIHJlbGVhc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS5cbiAqIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvTUlUXG4gKi9cblxuXG5pbXBvcnQgeyBDb21wb25lbnQsIFZpZXdFbmNhcHN1bGF0aW9uLCBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ2hhbmdlRGV0ZWN0b3JSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEV4cHJlc3Npb25zLCBBYnN0cmFjdEZvcm1GaWVsZFdpZGdldCB9IGZyb20gJy4uLy4uLy4uL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICd3ZGctdG9nZ2xlJyxcbiAgdGVtcGxhdGU6IGA8bWF0LXNsaWRlLXRvZ2dsZSBsYWJlbFBvc2l0aW9uPVwiYmVmb3JlXCI+XG4gIHt7IHRpdGxlfX1cbjwvbWF0LXNsaWRlLXRvZ2dsZT5cbmAsXG4gIHN0eWxlczogW2BgXSxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcbn0pXG5leHBvcnQgY2xhc3MgVG9nZ2xlV2lkZ2V0Q29tcG9uZW50IGV4dGVuZHMgQWJzdHJhY3RGb3JtRmllbGRXaWRnZXQge1xuXG4gIHRpdGxlOiBzdHJpbmc7XG5cbiAgY29uc3RydWN0b3IoY2RyOiBDaGFuZ2VEZXRlY3RvclJlZiwgZXhwcjogRXhwcmVzc2lvbnMpIHtcbiAgICBzdXBlcihjZHIsIGV4cHIpO1xuICB9XG5cblxufVxuIiwiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTggQWRyaWFuIFBhbmVsbGEgPGlhbmNoaTc0QG91dGxvb2suY29tPlxuICpcbiAqIFRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLlxuICogaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9NSVRcbiAqL1xuXG5cbmltcG9ydCB7IENvbXBvbmVudCwgVmlld0VuY2Fwc3VsYXRpb24sIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDaGFuZ2VEZXRlY3RvclJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRXhwcmVzc2lvbnMsIEFic3RyYWN0Rm9ybUZpZWxkV2lkZ2V0IH0gZnJvbSAnLi4vLi4vLi4vY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3dkZy1zbGlkZXInLFxuICB0ZW1wbGF0ZTogYDxzcGFuPnt7dGl0bGV9fTwvc3Bhbj5cbjxtYXQtc2xpZGVyIFtmb3JtQ29udHJvbF09XCJmb3JtQ29udHJvbFwiPjwvbWF0LXNsaWRlcj5cbmAsXG4gIHN0eWxlczogW2BgXSxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcbn0pXG5leHBvcnQgY2xhc3MgU2xpZGVyV2lkZ2V0Q29tcG9uZW50IGV4dGVuZHMgQWJzdHJhY3RGb3JtRmllbGRXaWRnZXQge1xuXG4gIHRpdGxlOiBzdHJpbmc7XG5cbiAgY29uc3RydWN0b3IoY2RyOiBDaGFuZ2VEZXRlY3RvclJlZiwgZXhwcjogRXhwcmVzc2lvbnMpIHtcbiAgICBzdXBlcihjZHIsIGV4cHIpO1xuICB9XG5cbn1cbiIsIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDE4IEFkcmlhbiBQYW5lbGxhIDxpYW5jaGk3NEBvdXRsb29rLmNvbT5cbiAqXG4gKiBUaGlzIHNvZnR3YXJlIGlzIHJlbGVhc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS5cbiAqIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvTUlUXG4gKi9cblxuXG5pbXBvcnQgeyBDb21wb25lbnQsIFZpZXdFbmNhcHN1bGF0aW9uLCBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ2hhbmdlRGV0ZWN0b3JSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgdGFrZSB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IGlzUmVhY3RpdmUgfSBmcm9tICdlc3ByZXNzaW9uJztcbmltcG9ydCB7IEFic3RyYWN0V2lkZ2V0LCBFeHByZXNzaW9ucywgSVdpZGdldERlZiwgfSBmcm9tICcuLi8uLi8uLi9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnd2RnLWJ1dHRvbicsXG4gIHRlbXBsYXRlOiBgPGJ1dHRvbiBtYXQtYnV0dG9uIChjbGljayk9XCJjbGlja0V2ZW50KCRldmVudClcIj5cbiAge3t0aXRsZX19XG48L2J1dHRvbj5cbmAsXG4gIHN0eWxlczogW2BgXSxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcbn0pXG5leHBvcnQgY2xhc3MgQnV0dG9uV2lkZ2V0Q29tcG9uZW50IGV4dGVuZHMgQWJzdHJhY3RXaWRnZXQge1xuXG4gIHRpdGxlOiBzdHJpbmc7XG4gIGNsaWNrOiBzdHJpbmc7XG5cbiAgcHJpdmF0ZSBfbHZhbHVlOiB7IG8sIG0gfTtcbiAgcHJpdmF0ZSBfY2xpY2tTdWJzOiBTdWJzY3JpcHRpb247XG4gIGNvbnN0cnVjdG9yKGNkcjogQ2hhbmdlRGV0ZWN0b3JSZWYsIGV4cHI6IEV4cHJlc3Npb25zKSB7XG4gICAgc3VwZXIoY2RyLCBleHByKTtcbiAgfVxuXG4gIGR5bk9uU2V0dXAoZGVmOiBJV2lkZ2V0RGVmKSB7XG5cbiAgICBpZiAoZGVmLmJpbmQpIHtcblxuICAgICAgY29uc3QgbHZhbHVlID0gdGhpcy5fZXhwci5sdmFsdWUoZGVmLmJpbmQsIHRoaXMuY29udGV4dCk7XG5cbiAgICAgIGlmICghbHZhbHVlKVxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0Zvcm0gZmllbGQgXCJiaW5kXCIgcHJvcGVydHkgbXVzdCBiZSBhbiBpZGVudGlmaWVyIG9yIG1lbWJlciBleHByZXNzaW9uJyk7XG5cbiAgICAgIGlmICghaXNSZWFjdGl2ZShsdmFsdWUubykpXG4gICAgICAgIHRocm93IG5ldyBFcnJvcignQm91bmQgS2V5IG11c3QgYmUgb2YgUmVhY3RpdmUgVHlwZScpO1xuXG4gICAgICB0aGlzLl9sdmFsdWUgPSBsdmFsdWU7XG4gICAgfVxuXG4gICAgcmV0dXJuIGRlZjtcbiAgfVxuXG4gIGNsaWNrRXZlbnQoX2V2ZW50KSB7XG5cbiAgICBpZiAodGhpcy5fY2xpY2tTdWJzKSB7XG4gICAgICB0aGlzLl9jbGlja1N1YnMudW5zdWJzY3JpYmUoKTtcbiAgICAgIHRoaXMuX2NsaWNrU3VicyA9IG51bGw7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuY2xpY2spIHtcbiAgICAgIHRoaXMuX2NsaWNrU3VicyA9IHRoaXMuX2V4cHIuZXZhbCh0aGlzLmNsaWNrLCB0aGlzLmNvbnRleHQsIHRydWUpLnBpcGUoXG4gICAgICAgIHRha2UoMSkpLnN1YnNjcmliZShyZXMgPT5cbiAgICAgICAgICB0aGlzLl9sdmFsdWUub1t0aGlzLl9sdmFsdWUubV0gPSByZXMpO1xuICAgIH1cbiAgfVxufVxuIiwiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTggQWRyaWFuIFBhbmVsbGEgPGlhbmNoaTc0QG91dGxvb2suY29tPlxuICpcbiAqIFRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLlxuICogaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9NSVRcbiAqL1xuXG5pbXBvcnQgeyBDb21wb25lbnQsIFZpZXdFbmNhcHN1bGF0aW9uLCBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ2hhbmdlRGV0ZWN0b3JSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZvcm1Hcm91cCwgRm9ybUFycmF5IH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgUnhPYmplY3QgfSBmcm9tICdlc3ByZXNzaW9uJztcbmltcG9ydCB7IEFic3RyYWN0V2lkZ2V0LCBJV2lkZ2V0RGVmLCBDb250ZXh0LCBFeHByZXNzaW9ucywgRk9STV9DT05UUk9MIH0gZnJvbSAnLi4vLi4vLi4vY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3dkZy1mb3JtJyxcbiAgdGVtcGxhdGU6IGA8bmctY29udGFpbmVyICpuZ0Zvcj1cImxldCBlbGVtZW50IG9mIGNvbnRlbnRcIiBbd2RnV2lkZ2V0XT1cImVsZW1lbnRcIiBbcGFyZW50Q29udGV4dF09XCJjb250ZXh0XCI+XG5cbjwvbmctY29udGFpbmVyPlxuYCxcbiAgc3R5bGVzOiBbYGBdLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBGb3JtV2lkZ2V0Q29tcG9uZW50IGV4dGVuZHMgQWJzdHJhY3RXaWRnZXQge1xuXG4gIGZvcm1Hcm91cDogRm9ybUdyb3VwO1xuICBjb25zdHJ1Y3RvcihjZHI6IENoYW5nZURldGVjdG9yUmVmLCBleHByOiBFeHByZXNzaW9ucykge1xuICAgIHN1cGVyKGNkciwgZXhwcik7XG4gIH1cblxuICBkeW5PblNldHVwKGRlZjogSVdpZGdldERlZikge1xuXG4gICAgdGhpcy5mb3JtR3JvdXAgPSBuZXcgRm9ybUdyb3VwKHt9KTtcblxuICAgIC8vIHJlZ2lzdGVyIHdpdGggcGFyZW50IGZvcm0sIGlmIGFueVxuICAgIGNvbnN0IHBhcmVudEZvcm06IEZvcm1Hcm91cCB8IEZvcm1BcnJheSA9IHRoaXMuY29udGV4dFtGT1JNX0NPTlRST0xdO1xuICAgIGlmIChwYXJlbnRGb3JtKSB7XG4gICAgICBpZiAocGFyZW50Rm9ybSBpbnN0YW5jZW9mIEZvcm1Hcm91cCkgcGFyZW50Rm9ybS5hZGRDb250cm9sKCdjb250cm9sJywgdGhpcy5mb3JtR3JvdXApO1xuICAgICAgZWxzZSBpZiAocGFyZW50Rm9ybSBpbnN0YW5jZW9mIEZvcm1BcnJheSkgcGFyZW50Rm9ybS5wdXNoKHRoaXMuZm9ybUdyb3VwKTtcbiAgICB9XG5cbiAgICAvLyBzYXZlIHRoaXMgRm9ybUdyb3VwIGFzIHBhcmVudCBmb3JtIGZvciB0aGUgY2hpbGRyZW5cbiAgICBDb250ZXh0LmRlZmluZUhpZGRlbih0aGlzLmNvbnRleHQsIHsgW0ZPUk1fQ09OVFJPTF06IHRoaXMuZm9ybUdyb3VwIH0pO1xuXG4gICAgLy8gY3JlYXRlIGEgU3RvcmUgZm9yIHRoZSB2YXJpYWJsZXNcblxuICAgIHRoaXMuY29udGV4dFsnJG1vZGVsJ10gPSBSeE9iamVjdCh7fSk7XG4gICAgcmV0dXJuIGRlZjtcbiAgfVxuXG59XG4iLCIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxOCBBZHJpYW4gUGFuZWxsYSA8aWFuY2hpNzRAb3V0bG9vay5jb20+XG4gKlxuICogVGhpcyBzb2Z0d2FyZSBpcyByZWxlYXNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuXG4gKiBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL01JVFxuICovXG5cbmltcG9ydCB7IENvbXBvbmVudCwgVmlld0VuY2Fwc3VsYXRpb24sIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDaGFuZ2VEZXRlY3RvclJlZiwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBtYXAsIHN0YXJ0V2l0aCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IEV4cHJlc3Npb25zLCBBYnN0cmFjdEZvcm1GaWVsZFdpZGdldCB9IGZyb20gJy4uLy4uLy4uL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICd3ZGctYXV0b2NvbXBsZXRlJyxcbiAgdGVtcGxhdGU6IGA8bWF0LWZvcm0tZmllbGQgc3R5bGUud2lkdGg9XCIxMDAlXCI+XG5cbiAgPG1hdC1sYWJlbCAqbmdJZj1cInRpdGxlXCI+XG4gICAge3sgdGl0bGUgfX1cbiAgPC9tYXQtbGFiZWw+XG5cbiAgPGlucHV0IG1hdElucHV0IG5hbWU9XCJhYWFcIiBbdHlwZV09XCJ0eXBlIHx8ICd0ZXh0J1wiIFtmb3JtQ29udHJvbF09XCJmb3JtQ29udHJvbFwiIFtwbGFjZWhvbGRlcl09XCJwbGFjZWhvbGRlclwiXG4gICAgW21hdEF1dG9jb21wbGV0ZV09XCJhdXRvXCI+XG5cbiAgPG1hdC1lcnJvciBbaWRdPVwibnVsbFwiPlxuXG4gIDwvbWF0LWVycm9yPlxuXG4gIDxtYXQtaGludCAqbmdJZj1cImRlc2NyaXB0aW9uXCIgW2lkXT1cIm51bGxcIj5cbiAgICB7eyBkZXNjcmlwdGlvbiB9fVxuICA8L21hdC1oaW50PlxuXG4gIDxtYXQtYXV0b2NvbXBsZXRlICNhdXRvPVwibWF0QXV0b2NvbXBsZXRlXCI+XG4gICAgPG1hdC1vcHRpb24gKm5nRm9yPVwibGV0IG9wdGlvbiBvZiBmaWx0ZXJlZE9wdGlvbnMgfCBhc3luYzsgaW5kZXggYXMgb3B0SW5kZXhcIiBbdmFsdWVdPVwib3B0aW9uXCI+XG4gICAgICB7e29wdGlvbn19XG4gICAgPC9tYXQtb3B0aW9uPlxuICA8L21hdC1hdXRvY29tcGxldGU+XG5cbjwvbWF0LWZvcm0tZmllbGQ+XG5gLFxuICBzdHlsZXM6IFtgYF0sXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXG59KVxuZXhwb3J0IGNsYXNzIEF1dG9jb21wbGV0ZVdpZGdldENvbXBvbmVudCBleHRlbmRzIEFic3RyYWN0Rm9ybUZpZWxkV2lkZ2V0IGltcGxlbWVudHMgT25Jbml0IHtcblxuICB0aXRsZTogc3RyaW5nO1xuICBkZXNjcmlwdGlvbjogc3RyaW5nO1xuICBwbGFjZWhvbGRlcjogc3RyaW5nO1xuXG4gIGVudW06IHN0cmluZ1tdID0gW107XG4gIGVudW1MYWJlbDogc3RyaW5nW107XG4gIGZpbHRlcmVkT3B0aW9uczogT2JzZXJ2YWJsZTxzdHJpbmdbXT47XG4gIGNvbnN0cnVjdG9yKGNkcjogQ2hhbmdlRGV0ZWN0b3JSZWYsIGV4cHI6IEV4cHJlc3Npb25zKSB7XG4gICAgc3VwZXIoY2RyLCBleHByKTtcbiAgfVxuXG5cblxuICBkeW5PbkJlZm9yZUJpbmQoKSB7XG4gICAgdGhpcy5tYXAoJ2VudW0nLCB2YWwgPT4ge1xuICAgICAgcmV0dXJuIEFycmF5LmlzQXJyYXkodmFsKSA/IHZhbCA6IFtdO1xuICAgIH0pO1xuICB9XG5cbiAgZHluT25BZnRlckJpbmQoKSB7XG4gICAgdGhpcy5tYXAoJ2VudW0nLCB2YWwgPT4gKHRoaXMuX2ZpbHRlcih0aGlzLmZvcm1Db250cm9sLnZhbHVlKSwgdmFsKSk7XG4gIH1cbiAgbmdPbkluaXQoKSB7XG4gICAgc3VwZXIubmdPbkluaXQoKTtcblxuICAgIHRoaXMuZmlsdGVyZWRPcHRpb25zID0gdGhpcy5mb3JtQ29udHJvbC52YWx1ZUNoYW5nZXNcbiAgICAgIC5waXBlKFxuICAgICAgICBzdGFydFdpdGgoJycpLFxuICAgICAgICBtYXAodmFsdWUgPT4gdGhpcy5fZmlsdGVyKHZhbHVlKSlcbiAgICAgICk7XG4gIH1cblxuICBwcml2YXRlIF9maWx0ZXIodmFsdWU6IHN0cmluZyk6IHN0cmluZ1tdIHtcblxuICAgIGNvbnN0IGZpbHRlclZhbHVlID0gdmFsdWUgJiYgdmFsdWUudG9Mb3dlckNhc2UoKTtcblxuICAgIHJldHVybiB0aGlzLmVudW0uZmlsdGVyKG9wdGlvbiA9PiBvcHRpb24udG9Mb3dlckNhc2UoKS5pbmNsdWRlcyhmaWx0ZXJWYWx1ZSkpO1xuICB9XG5cbn1cbiIsIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDE4IEFkcmlhbiBQYW5lbGxhIDxpYW5jaGk3NEBvdXRsb29rLmNvbT5cbiAqXG4gKiBUaGlzIHNvZnR3YXJlIGlzIHJlbGVhc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS5cbiAqIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvTUlUXG4gKi9cblxuXG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBNYXRlcmlhbE1vZHVsZSB9IGZyb20gJy4uL21hdGVyaWFsLm1vZHVsZSc7XG5pbXBvcnQgeyBXaWRnZXRzQ29yZU1vZHVsZSB9IGZyb20gJy4uLy4uL2NvcmUnO1xuXG5pbXBvcnQgeyBJbnB1dFdpZGdldENvbXBvbmVudCB9IGZyb20gJy4vaW5wdXQvaW5wdXQuY29tcG9uZW50JztcbmltcG9ydCB7IENoZWNrYm94V2lkZ2V0Q29tcG9uZW50IH0gZnJvbSAnLi9jaGVja2JveC9jaGVja2JveC5jb21wb25lbnQnO1xuaW1wb3J0IHsgVG9nZ2xlV2lkZ2V0Q29tcG9uZW50IH0gZnJvbSAnLi90b2dnbGUvdG9nZ2xlLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBTbGlkZXJXaWRnZXRDb21wb25lbnQgfSBmcm9tICcuL3NsaWRlci9zbGlkZXIuY29tcG9uZW50JztcbmltcG9ydCB7IEJ1dHRvbldpZGdldENvbXBvbmVudCB9IGZyb20gJy4vYnV0dG9uL2J1dHRvbi5jb21wb25lbnQnO1xuaW1wb3J0IHsgRm9ybVdpZGdldENvbXBvbmVudCB9IGZyb20gJy4vZm9ybS9mb3JtLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBBdXRvY29tcGxldGVXaWRnZXRDb21wb25lbnQgfSBmcm9tICcuL2F1dG9jb21wbGV0ZS9hdXRvY29tcGxldGUuY29tcG9uZW50JztcblxuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgTWF0ZXJpYWxNb2R1bGUsXG5cbiAgICBXaWRnZXRzQ29yZU1vZHVsZS5mb3JSb290KHtcbiAgICAgIHdpZGdldHM6IFtcbiAgICAgICAgeyB0eXBlOiAnaW5wdXQnLCBjb21wb25lbnQ6IElucHV0V2lkZ2V0Q29tcG9uZW50IH0sXG4gICAgICAgIHsgdHlwZTogJ2NoZWNrYm94JywgY29tcG9uZW50OiBDaGVja2JveFdpZGdldENvbXBvbmVudCB9LFxuICAgICAgICB7IHR5cGU6ICd0b2dnbGUnLCBjb21wb25lbnQ6IFRvZ2dsZVdpZGdldENvbXBvbmVudCB9LFxuICAgICAgICB7IHR5cGU6ICdzbGlkZXInLCBjb21wb25lbnQ6IFNsaWRlcldpZGdldENvbXBvbmVudCB9LFxuICAgICAgICB7IHR5cGU6ICdidXR0b24nLCBjb21wb25lbnQ6IEJ1dHRvbldpZGdldENvbXBvbmVudCB9LFxuICAgICAgICB7IHR5cGU6ICdmb3JtJywgY29tcG9uZW50OiBGb3JtV2lkZ2V0Q29tcG9uZW50IH0sXG4gICAgICAgIHsgdHlwZTogJ2F1dG9jb21wbGV0ZScsIGNvbXBvbmVudDogQXV0b2NvbXBsZXRlV2lkZ2V0Q29tcG9uZW50IH0sXG5cbiAgICAgIF1cbiAgICB9KVxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBJbnB1dFdpZGdldENvbXBvbmVudCxcbiAgICBDaGVja2JveFdpZGdldENvbXBvbmVudCxcbiAgICBUb2dnbGVXaWRnZXRDb21wb25lbnQsXG4gICAgU2xpZGVyV2lkZ2V0Q29tcG9uZW50LFxuICAgIEJ1dHRvbldpZGdldENvbXBvbmVudCxcbiAgICBGb3JtV2lkZ2V0Q29tcG9uZW50LFxuICAgIEF1dG9jb21wbGV0ZVdpZGdldENvbXBvbmVudFxuICBdLFxuICBleHBvcnRzOiBbXVxufSlcbmV4cG9ydCBjbGFzcyBGb3JtRmllbGRXaWRnZXRzTW9kdWxlIHsgfVxuIiwiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTggQWRyaWFuIFBhbmVsbGEgPGlhbmNoaTc0QG91dGxvb2suY29tPlxuICpcbiAqIFRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLlxuICogaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9NSVRcbiAqL1xuXG5cbmltcG9ydCB7IENvbXBvbmVudCwgVmlld0VuY2Fwc3VsYXRpb24sIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDaGFuZ2VEZXRlY3RvclJlZn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBBYnN0cmFjdFdpZGdldCwgSVdpZGdldERlZiwgRXhwcmVzc2lvbnMgfSBmcm9tICcuLi8uLi8uLi9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnd2RnLWNhcmQnLFxuICB0ZW1wbGF0ZTogYDxtYXQtY2FyZD5cbiAgPG1hdC1jYXJkLXRpdGxlICpuZ0lmPVwidGl0bGVcIj57e3RpdGxlfX08L21hdC1jYXJkLXRpdGxlPlxuICA8bWF0LWNhcmQtc3VidGl0bGUgKm5nSWY9XCJkZXNjcmlwdGlvblwiPnt7ZGVzY3JpcHRpb259fTwvbWF0LWNhcmQtc3VidGl0bGU+XG4gIDxtYXQtY2FyZC1jb250ZW50PlxuICAgIDxuZy1jb250YWluZXIgKm5nRm9yPVwibGV0IGVsZW1lbnQgb2YgY29udGVudFwiIFt3ZGdXaWRnZXRdPVwiZWxlbWVudFwiIFtwYXJlbnRDb250ZXh0XT1cImNvbnRleHRcIj48L25nLWNvbnRhaW5lcj5cbiAgPC9tYXQtY2FyZC1jb250ZW50PlxuICA8bWF0LWNhcmQtYWN0aW9ucyBhbGlnbj1cImVuZFwiICpuZ0lmPVwiYWN0aW9uc1wiPlxuICAgIDxuZy1jb250YWluZXIgKm5nRm9yPVwibGV0IGVsZW1lbnQgb2YgYWN0aW9uc1wiIFt3ZGdXaWRnZXRdPVwiZWxlbWVudFwiIFtwYXJlbnRDb250ZXh0XT1cImNvbnRleHRcIj48L25nLWNvbnRhaW5lcj5cbiAgPC9tYXQtY2FyZC1hY3Rpb25zPlxuPC9tYXQtY2FyZD5cbmAsXG4gIHN0eWxlczogW2BgXSxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcbn0pXG5leHBvcnQgY2xhc3MgQ2FyZFdpZGdldENvbXBvbmVudCBleHRlbmRzIEFic3RyYWN0V2lkZ2V0IHtcblxuICB0aXRsZTogc3RyaW5nO1xuICBkZXNjcmlwdGlvbjogc3RyaW5nO1xuICBhY3Rpb25zOiBJV2lkZ2V0RGVmW107XG5cbiAgY29uc3RydWN0b3IoY2RyOiBDaGFuZ2VEZXRlY3RvclJlZiwgZXhwcjogRXhwcmVzc2lvbnMpIHtcbiAgICBzdXBlcihjZHIsIGV4cHIpO1xuICB9XG5cbn1cbiIsIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDE4IEFkcmlhbiBQYW5lbGxhIDxpYW5jaGk3NEBvdXRsb29rLmNvbT5cbiAqXG4gKiBUaGlzIHNvZnR3YXJlIGlzIHJlbGVhc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS5cbiAqIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvTUlUXG4gKi9cblxuXG5pbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgVmlld0VuY2Fwc3VsYXRpb24sIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDaGFuZ2VEZXRlY3RvclJlZiwgVmlld0NoaWxkfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUsIGlzT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgTWF0VGFibGVEYXRhU291cmNlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvdGFibGUnO1xuaW1wb3J0IHsgTWF0UGFnaW5hdG9yIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvcGFnaW5hdG9yJztcbmltcG9ydCB7IE1hdFNvcnQgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9zb3J0JztcbmltcG9ydCB7IEFic3RyYWN0V2lkZ2V0LCBDb250ZXh0LCBFeHByZXNzaW9ucywgcGFyc2VEZWZPYmplY3QgfSBmcm9tICcuLi8uLi8uLi9jb3JlJztcbmltcG9ydCB7IGNvbWJpbmVNaXhlZCB9IGZyb20gJ2VzcHJlc3Npb24nO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICd3ZGctdGFibGUnLFxuICB0ZW1wbGF0ZTogYDxkaXY+XG4gIDxzZWN0aW9uIGNsYXNzPVwidGFibGUtdGl0bGVcIj5cbiAgICA8aDY+e3t0aXRsZX19PC9oNj5cblxuICAgIDxkaXYgY2xhc3M9XCJzcGFjZXJcIj48L2Rpdj5cblxuICAgIDxtYXQtZm9ybS1maWVsZCAqbmdJZj1cImZpbHRlckJ5XCI+XG4gICAgICA8aW5wdXQgbWF0SW5wdXQgKGtleXVwKT1cImFwcGx5RmlsdGVyKCRldmVudC50YXJnZXQudmFsdWUpXCIgcGxhY2Vob2xkZXI9XCJGaWx0ZXJcIj5cbiAgICA8L21hdC1mb3JtLWZpZWxkPlxuICA8L3NlY3Rpb24+XG5cbiAgPHNlY3Rpb24gY2xhc3M9XCJtYXQtZWxldmF0aW9uLXoxXCI+XG4gICAgPHRhYmxlIG1hdC10YWJsZSBbZGF0YVNvdXJjZV09XCJ0YWJsZURhdGFTb3VyY2VcIiBtYXRTb3J0IFttYXRTb3J0RGlzYWJsZWRdPVwiIWRpc2FibGVTb3J0XCI+XG5cbiAgICAgIDwhLS0gRHluYW1pYyBDb2x1bW4gZGVmaW5pdGlvbnMtLT5cbiAgICAgIDxuZy1jb250YWluZXIgW21hdENvbHVtbkRlZl09XCJjb2xLZXlcIiAqbmdGb3I9XCJsZXQgY29sS2V5IG9mIGNvbEtleXM7IGluZGV4IGFzIGNvbEluZGV4XCI+XG4gICAgICAgIDx0aCBtYXQtaGVhZGVyLWNlbGwgKm1hdEhlYWRlckNlbGxEZWYgbWF0LXNvcnQtaGVhZGVyIFtkaXNhYmxlZF09XCJkaXNhYmxlU29ydD8uaW5kZXhPZihjb2xLZXkpID49IDBcIj4ge3tjb2xIZWFkZXJzW2NvbEluZGV4XSB8fCBjb2xLZXl9fSA8L3RoPlxuICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiY29sRm9ybWF0ICYmIGNvbEZvcm1hdFtjb2xJbmRleF07IGVsc2Ugbm9Gb3JtYXRDZWxsRGVmXCI+XG4gICAgICAgICAgPHRkIG1hdC1jZWxsICptYXRDZWxsRGVmPVwibGV0IHJvd0RhdGFcIj57e3Jvd0RhdGFbY29sS2V5XSB8IGZvcm1hdDpjb2xGb3JtYXRbY29sSW5kZXhdfX08L3RkPlxuICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgPG5nLXRlbXBsYXRlICNub0Zvcm1hdENlbGxEZWY+XG4gICAgICAgICAgPHRkIG1hdC1jZWxsICptYXRDZWxsRGVmPVwibGV0IHJvd0RhdGFcIj57e3Jvd0RhdGFbY29sS2V5XX19PC90ZD5cbiAgICAgICAgPC9uZy10ZW1wbGF0ZT5cbiAgICAgIDwvbmctY29udGFpbmVyPlxuXG4gICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiYWN0aW9ucz8ubGVuZ3RoXCIgW21hdENvbHVtbkRlZl09XCInX19hY3Rpb25zX18nXCI+XG4gICAgICAgIDx0aCBtYXQtaGVhZGVyLWNlbGwgKm1hdEhlYWRlckNlbGxEZWYgPiB7e2FjdGlvbnNIZWFkZXIgfHwgJ0FjdGlvbnMnfX0gPC90aD5cbiAgICAgICAgPHRkIG1hdC1jZWxsICptYXRDZWxsRGVmPVwibGV0IHJvd0RhdGFcIj5cbiAgICAgICAgICA8YnV0dG9uIG1hdC1pY29uLWJ1dHRvbiBbbWF0TWVudVRyaWdnZXJGb3JdPVwibWVudVwiPlxuICAgICAgICAgICAgPG1hdC1pY29uIHN2Z0ljb249XCJkb3RzLXZlcnRpY2FsXCI+PC9tYXQtaWNvbj5cbiAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICA8bWF0LW1lbnUgI21lbnU9XCJtYXRNZW51XCI+XG5cbiAgICAgICAgICAgIDxidXR0b24gbWF0LW1lbnUtaXRlbSAqbmdGb3I9XCJsZXQgYWN0aW9uIG9mIGFjdGlvbnM7IGluZGV4IGFzIGFjdGlvbkluZGV4XCIgKGNsaWNrKT1cImFjdGlvbkNsaWNrKHJvd0RhdGEsIGFjdGlvbkluZGV4KVwiPlxuICAgICAgICAgICAgICA8bWF0LWljb24gW3N2Z0ljb25dPVwiYWN0aW9uc1thY3Rpb25JbmRleF0uaWNvblwiPjwvbWF0LWljb24+XG4gICAgICAgICAgICAgIDxzcGFuPnt7YWN0aW9uc1thY3Rpb25JbmRleF0ubGFiZWx9fTwvc3Bhbj5cbiAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgIDwvbWF0LW1lbnU+XG4gICAgICAgIDwvdGQ+XG4gICAgICA8L25nLWNvbnRhaW5lcj5cblxuXG4gICAgICA8IS0tIFJvdyBkZWZpbml0aW9ucy0tPlxuICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cImNvbEhlYWRlcnNcIj5cbiAgICAgICAgPHRyIG1hdC1oZWFkZXItcm93ICptYXRIZWFkZXJSb3dEZWY9XCJzaG93Q29sc1wiIGNsYXNzPVwiaGVhZGVyLXJvd1wiPjwvdHI+XG4gICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgIDx0ciBtYXQtcm93ICptYXRSb3dEZWY9XCJsZXQgZWxlbWVudDsgY29sdW1uczogc2hvd0NvbHM7XCIgY2xhc3M9XCJkYXRhLXJvd1wiPjwvdHI+XG4gICAgPC90YWJsZT5cblxuICAgIDxtYXQtcGFnaW5hdG9yIFtjbGFzcy5oaWRkZW5QYWdpbmF0b3JdPVwiIXBhZ2VTaXplc1wiIFtwYWdlU2l6ZU9wdGlvbnNdPVwicGFnZVNpemVzXCIgW2hpZGVQYWdlU2l6ZV09XCJwYWdlU2l6ZXM/Lmxlbmd0aDw9MVwiPjwvbWF0LXBhZ2luYXRvcj5cbiAgPC9zZWN0aW9uPlxuPC9kaXY+XG5gLFxuICBzdHlsZXM6IFtgZHluLXRhYmxlIHRhYmxle3dpZHRoOjEwMCV9ZHluLXRhYmxlIHRyLmRhdGEtcm93OmhvdmVye2JhY2tncm91bmQ6I2Y1ZjVmNX1keW4tdGFibGUgdHIuZGF0YS1yb3c6YWN0aXZle2JhY2tncm91bmQ6I2VmZWZlZn1keW4tdGFibGUgLmRhdGEtcm93IHRke2JvcmRlci1ib3R0b20td2lkdGg6MH1keW4tdGFibGUgbWF0LXBhZ2luYXRvci5oaWRkZW5QYWdpbmF0b3J7ZGlzcGxheTpub25lfWR5bi10YWJsZSAudGFibGUtdGl0bGV7ZGlzcGxheTpmbGV4O2ZsZXgtZmxvdzpyb3d9ZHluLXRhYmxlIC50YWJsZS10aXRsZT4qe2ZsZXg6MCAwIGF1dG99ZHluLXRhYmxlIC50YWJsZS10aXRsZSAuc3BhY2Vye2ZsZXg6MSAxIGF1dG99YF0sXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXG59KVxuZXhwb3J0IGNsYXNzIFRhYmxlV2lkZ2V0Q29tcG9uZW50IGV4dGVuZHMgQWJzdHJhY3RXaWRnZXQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gIHRpdGxlOiBzdHJpbmc7XG4gIGRhdGFTb3VyY2U6IE9ic2VydmFibGU8YW55W10+IHwgYW55W107XG4gIHRhYmxlRGF0YVNvdXJjZTogTWF0VGFibGVEYXRhU291cmNlPHsgW3Byb3A6IHN0cmluZ106IGFueSB9PjtcblxuICBjb2xLZXlzOiBzdHJpbmdbXTtcbiAgY29sSGVhZGVyczogc3RyaW5nW107XG4gIGNvbHNWaXNpYmxlOiBzdHJpbmdbXTtcbiAgcGFnZVNpemVzOiBudW1iZXJbXTtcbiAgZmlsdGVyQnk6IHN0cmluZ1tdO1xuICBkaXNhYmxlU29ydDogc3RyaW5nW10gPSBbXTtcblxuICBjb2xUcmFuc2Zvcm06IHN0cmluZ1tdO1xuICBjb2xGb3JtYXQ6IHN0cmluZ1tdO1xuXG4gIGFjdGlvbnM6IHsgaWNvbjogc3RyaW5nLCBsYWJlbDogc3RyaW5nLCBhY3Rpb246IHN0cmluZyB9W10gPSBbXTtcbiAgYWN0aW9uc0hlYWRlcjogc3RyaW5nO1xuICBzaG93Q29sczogc3RyaW5nW107XG5cbiAgQFZpZXdDaGlsZChNYXRQYWdpbmF0b3IpIHBhZ2luYXRvcjogTWF0UGFnaW5hdG9yO1xuICBAVmlld0NoaWxkKE1hdFNvcnQpIHNvcnQ6IE1hdFNvcnQ7XG5cbiAgY29uc3RydWN0b3IoY2RyOiBDaGFuZ2VEZXRlY3RvclJlZiwgZXhwcjogRXhwcmVzc2lvbnMpIHtcbiAgICBzdXBlcihjZHIsIGV4cHIpO1xuICAgIHRoaXMudGFibGVEYXRhU291cmNlID0gbmV3IE1hdFRhYmxlRGF0YVNvdXJjZSgpO1xuICB9XG5cbiAgZHluT25CZWZvcmVCaW5kKCkge1xuXG4gICAgY29uc3Qgb3B0ID0gdGhpcy53aWRnZXREZWYub3B0aW9ucztcblxuXG4gICAgLy8gaWYgdGhlIG9ubHkgc291cmNlIGlzIGEgc3RhdGljIGFycmF5LCBsZXRzIGNoZWNrIGlmIGl0IGhhcyAncHJvcGVydHk9JyBjb2x1bW5zIHRvIGV2YWx1YXRlXG4gICAgLy8gYW5kIGFkZCB0aGUgYXV0byBiaW5kaW5nXG4gICAgaWYgKG9wdCAmJiAhb3B0WydkYXRhU291cmNlPSddICYmXG4gICAgICBBcnJheS5pc0FycmF5KG9wdC5kYXRhU291cmNlKSkge1xuXG4gICAgICBjb25zdCBkYXRhU291cmNlID0gPE9ic2VydmFibGU8YW55W10+PmNvbWJpbmVNaXhlZChvcHQuZGF0YVNvdXJjZS5tYXAocm93ID0+XG4gICAgICAgIGNvbWJpbmVNaXhlZChwYXJzZURlZk9iamVjdChyb3csIHRoaXMuY29udGV4dCwgZmFsc2UsIHRoaXMuX2V4cHIpKSwgZmFsc2UpLCBmYWxzZSk7XG4gICAgICBpZiAoaXNPYnNlcnZhYmxlKGRhdGFTb3VyY2UpKSB0aGlzLmJpbmRpbmdzLmRhdGFTb3VyY2UgPSBkYXRhU291cmNlO1xuICAgICAgZWxzZSB0aGlzLmRhdGFTb3VyY2UgPSBkYXRhU291cmNlO1xuICAgIH1cblxuXG4gICAgdGhpcy5tYXAoJ2Rpc2FibGVTb3J0Jywgc29ydCA9PiB7XG4gICAgICBpZiAoc29ydCA9PT0gdHJ1ZSkgcmV0dXJuIG51bGw7XG4gICAgICBpZiAoIUFycmF5LmlzQXJyYXkoc29ydCkpIHJldHVybiBbXTtcbiAgICAgIHJldHVybiBzb3J0O1xuXG4gICAgfSk7XG5cbiAgICB0aGlzLm1hcCgnZGF0YVNvdXJjZScsICh0YWJsZTogYW55W10pID0+XG4gICAgICB0aGlzLnRhYmxlRGF0YVNvdXJjZS5kYXRhID0gdGFibGUubWFwKHJvdyA9PiB7XG4gICAgICAgIHJvdyA9IHBhcnNlRGVmT2JqZWN0KHJvdywgQ29udGV4dC5jcmVhdGUodGhpcy5jb250ZXh0LCB7ICRkYXRhOiByb3cgfSksIGZhbHNlLCB0aGlzLl9leHByKTtcblxuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheSh0aGlzLmNvbFRyYW5zZm9ybSkpIHtcblxuICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5jb2xUcmFuc2Zvcm0ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmNvbFRyYW5zZm9ybVtpXSkge1xuICAgICAgICAgICAgICBjb25zdCBjb250ZXh0OiBhbnkgPSBDb250ZXh0LmNyZWF0ZSh0aGlzLmNvbnRleHQpO1xuICAgICAgICAgICAgICBjb250ZXh0LiRkYXRhID0gcm93W3RoaXMuY29sS2V5c1tpXV07XG4gICAgICAgICAgICAgIHJvd1t0aGlzLmNvbEtleXNbaV1dID0gdGhpcy5fZXhwci5ldmFsKHRoaXMuY29sVHJhbnNmb3JtW2ldLCBjb250ZXh0LCBmYWxzZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcm93O1xuICAgICAgfSlcbiAgICApO1xuXG4gICAgdGhpcy5tYXAoJ3BhZ2VTaXplcycsICh2YWx1ZSkgPT4ge1xuICAgICAgaWYgKCFBcnJheS5pc0FycmF5KHZhbHVlKSB8fCAhdmFsdWUubGVuZ3RoKSB7XG4gICAgICAgIHRoaXMudGFibGVEYXRhU291cmNlLnBhZ2luYXRvciA9IG51bGw7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfVxuICAgICAgdGhpcy50YWJsZURhdGFTb3VyY2UucGFnaW5hdG9yID0gdGhpcy5wYWdpbmF0b3I7XG4gICAgICByZXR1cm4gdmFsdWU7XG4gICAgfSk7XG5cbiAgICB0aGlzLm1hcCgnY29sS2V5cycsIGtleXMgPT4ge1xuICAgICAgaWYgKHRoaXMuYWN0aW9ucyAmJiB0aGlzLmFjdGlvbnMubGVuZ3RoKSB0aGlzLnNob3dDb2xzID0ga2V5cy5jb25jYXQoJ19fYWN0aW9uc19fJyk7XG4gICAgICBlbHNlIHRoaXMuc2hvd0NvbHMgPSBrZXlzO1xuICAgICAgcmV0dXJuIGtleXM7XG4gICAgfSk7XG4gICAgdGhpcy5tYXAoJ2FjdGlvbnMnLCBhY3Rpb25zID0+IHtcbiAgICAgIGlmICghQXJyYXkuaXNBcnJheShhY3Rpb25zKSkgYWN0aW9ucyA9IFtdO1xuXG4gICAgICB0aGlzLnNob3dDb2xzID0gYWN0aW9ucy5sZW5ndGggPyB0aGlzLmNvbEtleXMuY29uY2F0KCdfX2FjdGlvbnNfXycpIDogdGhpcy5jb2xLZXlzO1xuXG4gICAgICByZXR1cm4gYWN0aW9ucztcbiAgICB9KTtcbiAgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHN1cGVyLm5nT25Jbml0KCk7XG5cbiAgICB0aGlzLnRhYmxlRGF0YVNvdXJjZS5zb3J0ID0gdGhpcy5zb3J0O1xuICB9XG4gIGFwcGx5RmlsdGVyKGZpbHRlclZhbHVlOiBzdHJpbmcpIHtcbiAgICB0aGlzLnRhYmxlRGF0YVNvdXJjZS5maWx0ZXIgPSBmaWx0ZXJWYWx1ZTtcblxuICAgIGlmICh0aGlzLnRhYmxlRGF0YVNvdXJjZS5wYWdpbmF0b3IpIHtcbiAgICAgIHRoaXMudGFibGVEYXRhU291cmNlLnBhZ2luYXRvci5maXJzdFBhZ2UoKTtcbiAgICB9XG4gIH1cblxuICBhY3Rpb25DbGljayhyb3dEYXRhOiBhbnksIGFjdGlvbkluZGV4OiBudW1iZXIpIHtcblxuICAgIGNvbnN0IGNvbnRleHQgPSBDb250ZXh0LmNyZWF0ZSh0aGlzLmNvbnRleHQsIHsgJGRhdGE6IHJvd0RhdGEgfSk7XG5cbiAgICB0aGlzLmFkZFN1YnNjcmlwdGlvbiA9IHRoaXMuX2V4cHIuZXZhbCh0aGlzLmFjdGlvbnNbYWN0aW9uSW5kZXhdLmFjdGlvbiwgY29udGV4dCwgdHJ1ZSkuc3Vic2NyaWJlKFxuICAgICAgKCkgPT4ge1xuICAgICAgICAvLyBUT0RPIGxvZ2ljIHRvIHJlbG9hZCB0YWJsZVxuICAgICAgfVxuICAgICk7XG4gIH1cblxuXG59XG4iLCIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxOCBBZHJpYW4gUGFuZWxsYSA8aWFuY2hpNzRAb3V0bG9vay5jb20+XG4gKlxuICogVGhpcyBzb2Z0d2FyZSBpcyByZWxlYXNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuXG4gKiBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL01JVFxuICovXG5cbmltcG9ydCB7IENvbXBvbmVudCwgVmlld0VuY2Fwc3VsYXRpb24sIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDaGFuZ2VEZXRlY3RvclJlZn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBBYnN0cmFjdFdpZGdldCwgRXhwcmVzc2lvbnMgfSBmcm9tICcuLi8uLi8uLi9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnd2RnLWNvbnRhaW5lcicsXG4gIHRlbXBsYXRlOiBgPG5nLWNvbnRhaW5lciAqbmdGb3I9XCJsZXQgZWxlbWVudCBvZiBjb250ZW50XCIgW3dkZ1dpZGdldF09XCJlbGVtZW50XCIgW3BhcmVudENvbnRleHRdPVwiY29udGV4dFwiPlxuXG48L25nLWNvbnRhaW5lcj5cbmAsXG4gIHN0eWxlczogW2BkeW4tY29udGFpbmVyLmR5bi1mbGV4e2Rpc3BsYXk6ZmxleDtmbGV4LXdyYXA6d3JhcH1keW4tY29udGFpbmVyLmR5bi1mbGV4Pip7ZmxleDoxIDEgYXV0b31gXSxcblxuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6dXNlLWhvc3QtcHJvcGVydHktZGVjb3JhdG9yXG4gIGhvc3Q6IHtcbiAgICAnW2NsYXNzLmR5bi1mbGV4XSc6ICd0cnVlJyxcbiAgICAnW3N0eWxlLmZsZXgtZGlyZWN0aW9uXSc6ICdkaXJlY3Rpb24nXG4gIH0sXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXG59KVxuZXhwb3J0IGNsYXNzIENvbnRhaW5lcldpZGdldENvbXBvbmVudCBleHRlbmRzIEFic3RyYWN0V2lkZ2V0IHtcblxuICBkaXJlY3Rpb246IHN0cmluZztcblxuICBjb25zdHJ1Y3RvcihjZHI6IENoYW5nZURldGVjdG9yUmVmLCBleHByOiBFeHByZXNzaW9ucykge1xuICAgIHN1cGVyKGNkciwgZXhwcik7XG4gIH1cblxuICBkeW5PbkJlZm9yZUJpbmQoKSB7XG5cbiAgICB0aGlzLm1hcCgnZGlyZWN0aW9uJywgZGlyID0+IGRpciB8fCAncm93Jyk7XG4gIH1cblxufVxuIiwiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTggQWRyaWFuIFBhbmVsbGEgPGlhbmNoaTc0QG91dGxvb2suY29tPlxuICpcbiAqIFRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLlxuICogaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9NSVRcbiAqL1xuXG5pbXBvcnQgeyBDb21wb25lbnQsIFZpZXdFbmNhcHN1bGF0aW9uLCBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ2hhbmdlRGV0ZWN0b3JSZWZ9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQWJzdHJhY3RXaWRnZXQsIEV4cHJlc3Npb25zIH0gZnJvbSAnLi4vLi4vLi4vY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3dkZy1ncmlkLWNvbnRhaW5lcicsXG4gIHRlbXBsYXRlOiBgPG5nLWNvbnRhaW5lciAqbmdGb3I9XCJsZXQgZWxlbWVudCBvZiBjb250ZW50XCIgW3dkZ1dpZGdldF09XCJlbGVtZW50XCIgW3BhcmVudENvbnRleHRdPVwiY29udGV4dFwiPlxuXG48L25nLWNvbnRhaW5lcj5cbmAsXG4gIHN0eWxlczogW2BkeW4tZ3JpZC1jb250YWluZXIuZHluLWdyaWR7ZGlzcGxheTpncmlkO2dyaWQtdGVtcGxhdGUtY29sdW1uczpyZXBlYXQoYXV0by1maXQsbWlubWF4KDMwMHB4LDFmcikpO2dyaWQtYXV0by1mbG93OnJvdyBkZW5zZX1gXSxcblxuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6dXNlLWhvc3QtcHJvcGVydHktZGVjb3JhdG9yXG4gIGhvc3Q6IHtcbiAgICAnW2NsYXNzLmR5bi1ncmlkXSc6ICd0cnVlJyxcbiAgICAnW3N0eWxlLmZsZXgtZGlyZWN0aW9uXSc6ICdkaXJlY3Rpb24nXG4gIH0sXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXG59KVxuZXhwb3J0IGNsYXNzIEdyaWRDb250YWluZXJXaWRnZXRDb21wb25lbnQgZXh0ZW5kcyBBYnN0cmFjdFdpZGdldCB7XG5cbiAgZGlyZWN0aW9uOiBzdHJpbmc7XG5cbiAgY29uc3RydWN0b3IoY2RyOiBDaGFuZ2VEZXRlY3RvclJlZiwgZXhwcjogRXhwcmVzc2lvbnMpIHtcbiAgICBzdXBlcihjZHIsIGV4cHIpO1xuICB9XG5cbiAgZHluT25CZWZvcmVCaW5kKCkge1xuXG4gICAgdGhpcy5tYXAoJ2RpcmVjdGlvbicsIGRpciA9PiBkaXIgfHwgJ3JvdycpO1xuICB9XG5cbn1cbiIsImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBWaWV3RW5jYXBzdWxhdGlvbiwgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENoYW5nZURldGVjdG9yUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBBYnN0cmFjdFdpZGdldCwgRXhwcmVzc2lvbnMgfSBmcm9tICcuLi8uLi8uLi9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnd2RnLXRhYnMnLFxuICB0ZW1wbGF0ZTogYDxtYXQtdGFiLWdyb3VwPlxuXG4gIDxtYXQtdGFiICpuZ0Zvcj1cImxldCB0YWIgb2YgY29udGVudDsgaW5kZXggYXMgdGFiSW5kZXhcIiBbbGFiZWxdPVwidGFiTGFiZWxzW3RhYkluZGV4XSB8fCAoJ1RhYicrdGFiSW5kZXgpXCI+XG5cbiAgICA8bmctdGVtcGxhdGUgbWF0VGFiQ29udGVudD5cbiAgICAgIDxuZy1jb250YWluZXIgW3dkZ1dpZGdldF09XCJ0YWJcIiBbcGFyZW50Q29udGV4dF09XCJjb250ZXh0XCI+PC9uZy1jb250YWluZXI+XG4gICAgPC9uZy10ZW1wbGF0ZT5cblxuICA8L21hdC10YWI+XG5cblxuPC9tYXQtdGFiLWdyb3VwPlxuYCxcbiAgc3R5bGVzOiBbYGBdLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBUYWJzV2lkZ2V0Q29tcG9uZW50IGV4dGVuZHMgQWJzdHJhY3RXaWRnZXQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gIHRhYkxhYmVsczogc3RyaW5nW107XG4gIGNvbnN0cnVjdG9yKGNkcjogQ2hhbmdlRGV0ZWN0b3JSZWYsIGV4cHI6IEV4cHJlc3Npb25zKSB7XG4gICAgc3VwZXIoY2RyLCBleHByKTtcbiAgfVxuXG4gIG5nT25Jbml0KCkge1xuICB9XG5cbn1cbiIsIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDE4IEFkcmlhbiBQYW5lbGxhIDxpYW5jaGk3NEBvdXRsb29rLmNvbT5cbiAqXG4gKiBUaGlzIHNvZnR3YXJlIGlzIHJlbGVhc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS5cbiAqIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvTUlUXG4gKi9cblxuaW1wb3J0IHsgQ29tcG9uZW50LCBWaWV3RW5jYXBzdWxhdGlvbiwgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENoYW5nZURldGVjdG9yUmVmfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEFic3RyYWN0V2lkZ2V0LCBFeHByZXNzaW9ucyB9IGZyb20gJy4uLy4uLy4uL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3dkZy1jb2RlJyxcbiAgICB0ZW1wbGF0ZTogYDxjb2RlPlxue3t0ZXh0fX1cbjwvY29kZT5gLFxuICAgIHN0eWxlczogW2BkeW4tY29kZSBjb2Rle3doaXRlLXNwYWNlOnByZX1gXSxcblxuICAgIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcbn0pXG5leHBvcnQgY2xhc3MgQ29kZVdpZGdldENvbXBvbmVudCBleHRlbmRzIEFic3RyYWN0V2lkZ2V0IHtcblxuICAgIHRleHQ6IHN0cmluZztcblxuICAgIGNvbnN0cnVjdG9yKGNkcjogQ2hhbmdlRGV0ZWN0b3JSZWYsIGV4cHI6IEV4cHJlc3Npb25zKSB7XG4gICAgICAgIHN1cGVyKGNkciwgZXhwcik7XG4gICAgfVxuXG59XG4iLCIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxOCBBZHJpYW4gUGFuZWxsYSA8aWFuY2hpNzRAb3V0bG9vay5jb20+XG4gKlxuICogVGhpcyBzb2Z0d2FyZSBpcyByZWxlYXNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuXG4gKiBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL01JVFxuICovXG5cblxuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgTWF0ZXJpYWxNb2R1bGUgfSBmcm9tICcuLi9tYXRlcmlhbC5tb2R1bGUnO1xuaW1wb3J0IHsgV2lkZ2V0c0NvcmVNb2R1bGUgfSBmcm9tICcuLi8uLi9jb3JlJztcblxuaW1wb3J0IHsgQ2FyZFdpZGdldENvbXBvbmVudCB9IGZyb20gJy4vY2FyZC9jYXJkLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBUYWJsZVdpZGdldENvbXBvbmVudCB9IGZyb20gJy4vdGFibGUvdGFibGUuY29tcG9uZW50JztcbmltcG9ydCB7IENvbnRhaW5lcldpZGdldENvbXBvbmVudCB9IGZyb20gJy4vY29udGFpbmVyL2NvbnRhaW5lci5jb21wb25lbnQnO1xuaW1wb3J0IHsgR3JpZENvbnRhaW5lcldpZGdldENvbXBvbmVudCB9IGZyb20gJy4vZ3JpZC1jb250YWluZXIvZ3JpZGNvbnRhaW5lci5jb21wb25lbnQnO1xuaW1wb3J0IHsgVGFic1dpZGdldENvbXBvbmVudCB9IGZyb20gJy4vdGFicy90YWJzLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBDb2RlV2lkZ2V0Q29tcG9uZW50IH0gZnJvbSAnLi9jb2RlL2NvZGUuY29tcG9uZW50JztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIE1hdGVyaWFsTW9kdWxlLFxuXG4gICAgV2lkZ2V0c0NvcmVNb2R1bGUuZm9yUm9vdCh7XG4gICAgICB3aWRnZXRzOiBbXG4gICAgICAgIHsgdHlwZTogJ2NhcmQnLCBjb21wb25lbnQ6IENhcmRXaWRnZXRDb21wb25lbnQgfSxcbiAgICAgICAgeyB0eXBlOiAndGFibGUnLCBjb21wb25lbnQ6IFRhYmxlV2lkZ2V0Q29tcG9uZW50IH0sXG4gICAgICAgIHsgdHlwZTogJ2NvbnRhaW5lcicsIGNvbXBvbmVudDogQ29udGFpbmVyV2lkZ2V0Q29tcG9uZW50fSxcbiAgICAgICAgeyB0eXBlOiAnZ3JpZC1jb250YWluZXInLCBjb21wb25lbnQ6IEdyaWRDb250YWluZXJXaWRnZXRDb21wb25lbnR9LFxuICAgICAgICB7IHR5cGU6ICd0YWJzJywgY29tcG9uZW50OiBUYWJzV2lkZ2V0Q29tcG9uZW50fSxcbiAgICAgICAgeyB0eXBlOiAnY29kZScsIGNvbXBvbmVudDogQ29kZVdpZGdldENvbXBvbmVudH0sXG4gICAgICBdXG4gICAgfSlcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgQ2FyZFdpZGdldENvbXBvbmVudCxcbiAgICBUYWJsZVdpZGdldENvbXBvbmVudCxcbiAgICBDb250YWluZXJXaWRnZXRDb21wb25lbnQsXG4gICAgR3JpZENvbnRhaW5lcldpZGdldENvbXBvbmVudCxcbiAgICBUYWJzV2lkZ2V0Q29tcG9uZW50LFxuICAgIENvZGVXaWRnZXRDb21wb25lbnQsXG4gIF0sXG4gIGV4cG9ydHM6IFtdXG59KVxuZXhwb3J0IGNsYXNzIENvbW1vbldpZGdldHNNb2R1bGUgeyB9XG4iXSwibmFtZXMiOlsibWFwIiwidGFwIiwiY29tYmluZUxhdGVzdCIsInRzbGliXzEuX192YWx1ZXMiLCJJbnB1dCIsImlzT2JzZXJ2YWJsZSIsIm9mIiwidHNsaWJfMS5fX2V4dGVuZHMiLCJlczVSdWxlcyIsIlBhcnNlciIsIklkZW50aWZpZXJSdWxlIiwiQmluYXJ5T3BlcmF0b3JSdWxlIiwiTUVNQkVSX0VYUCIsIlJlYWN0aXZlRXZhbCIsIkVNUFRZIiwiQ29tcG9uZW50IiwiVmlld0VuY2Fwc3VsYXRpb24iLCJDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSIsIkNoYW5nZURldGVjdG9yUmVmIiwiSW5qZWN0aW9uVG9rZW4iLCJJbmplY3RhYmxlIiwiSW5qZWN0IiwiRGlyZWN0aXZlIiwiVmlld0NvbnRhaW5lclJlZiIsIkNvbXBvbmVudEZhY3RvcnlSZXNvbHZlciIsIk9wdGlvbmFsIiwiUGlwZSIsImZvcm1hdE51bWJlciIsImZvcm1hdERhdGUiLCJBY3RpdmF0ZWRSb3V0ZSIsIkFOQUxZWkVfRk9SX0VOVFJZX0NPTVBPTkVOVFMiLCJOZ01vZHVsZSIsIkNvbW1vbk1vZHVsZSIsImlzUmVhY3RpdmUiLCJGb3JtQ29udHJvbCIsInRha2UiLCJGb3JtR3JvdXAiLCJGb3JtQXJyYXkiLCJHRVRfT0JTRVJWQUJMRSIsIlJlYWN0aXZlRm9ybXNNb2R1bGUiLCJNYXRBdXRvY29tcGxldGVNb2R1bGUiLCJNYXRTaWRlbmF2TW9kdWxlIiwiTWF0QnV0dG9uTW9kdWxlIiwiTWF0SWNvbk1vZHVsZSIsIk1hdExpc3RNb2R1bGUiLCJNYXRJbnB1dE1vZHVsZSIsIk1hdERpYWxvZ01vZHVsZSIsIk1hdFRvb2xiYXJNb2R1bGUiLCJNYXRQcm9ncmVzc0Jhck1vZHVsZSIsIk1hdEV4cGFuc2lvbk1vZHVsZSIsIk1hdFNlbGVjdE1vZHVsZSIsIk1hdFRhYnNNb2R1bGUiLCJNYXRTbmFja0Jhck1vZHVsZSIsIk1hdFNsaWRlVG9nZ2xlTW9kdWxlIiwiTWF0Q2hpcHNNb2R1bGUiLCJNYXRDYXJkTW9kdWxlIiwiTWF0Q2hlY2tib3hNb2R1bGUiLCJNYXRTbGlkZXJNb2R1bGUiLCJNYXRUYWJsZU1vZHVsZSIsIk1hdFBhZ2luYXRvck1vZHVsZSIsIk1hdFNvcnRNb2R1bGUiLCJNYXRNZW51TW9kdWxlIiwiUnhPYmplY3QiLCJzdGFydFdpdGgiLCJNYXRUYWJsZURhdGFTb3VyY2UiLCJjb21iaW5lTWl4ZWQiLCJzb3J0IiwidGFibGUiLCJWaWV3Q2hpbGQiLCJNYXRQYWdpbmF0b3IiLCJNYXRTb3J0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1FBK0NTLGNBQU07Ozs7Ozs7Ozs7WUFBYixVQUFjLE1BQWdCLEVBQUUsV0FBeUIsRUFDdkQsYUFBMkIsRUFDM0IsV0FBeUIsRUFDekIsUUFBa0I7Z0JBRWxCLHFCQUFNLE9BQU8sR0FBWSxNQUFNLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsR0FBRyxJQUFJLE9BQU8sRUFBRSxDQUFDO2dCQUV4RSxJQUFJLFFBQVE7b0JBQUUsT0FBTyxDQUFDLGNBQWMsQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDO2dCQUNuRSxJQUFJLFdBQVc7b0JBQUUsTUFBTSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsV0FBVyxDQUFDLENBQUM7Z0JBQ3JELElBQUksYUFBYTtvQkFBRSxPQUFPLENBQUMsY0FBYyxDQUFDLE9BQU8sRUFBRSxhQUFhLENBQUMsQ0FBQztnQkFDbEUsSUFBSSxXQUFXO29CQUFFLE9BQU8sQ0FBQyxZQUFZLENBQUMsT0FBTyxFQUFFLFdBQVcsQ0FBQyxDQUFDO2dCQUU1RCxPQUFPLE9BQU8sQ0FBQzthQUNoQjs7Ozs7Ozs7UUFHTSxzQkFBYzs7Ozs7O1lBQXJCLFVBQXNC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