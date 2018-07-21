import { Input, Component, ViewEncapsulation, ChangeDetectionStrategy, ChangeDetectorRef, Inject, InjectionToken, Injectable, NgModule, Directive, ViewContainerRef, ComponentFactoryResolver, Optional, ViewChild, defineInjectable, inject, ANALYZE_FOR_ENTRY_COMPONENTS, Pipe } from '@angular/core';
import { of, combineLatest, isObservable, EMPTY } from 'rxjs';
import { tap, map, take, startWith } from 'rxjs/operators';
import { ReactiveEval, Parser, es5Rules, IdentifierRule, BinaryOperatorRule, MEMBER_EXP, GET_OBSERVABLE, isReactive, RxObject, combineMixed } from 'espression';
import { formatNumber, formatDate, CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, FormArray, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatChipsModule } from '@angular/material/chips';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSliderModule } from '@angular/material/slider';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { MatMenuModule } from '@angular/material/menu';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Helper class to hold context for expression evaluation.
 * It only gives a 'type' to a plain object.
 * It has static methods to manage inheritance and adding properties and builtins
 */
class Context {
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
    static create(parent, publicProps, readonlyProps, hiddenProps, builtins) {
        const /** @type {?} */ context = parent ? Object.create(parent) : new Context();
        if (builtins)
            Context.defineReadonly(context, Context.builtinsDef);
        if (publicProps)
            Object.assign(context, publicProps);
        if (readonlyProps)
            Context.defineReadonly(context, readonlyProps);
        if (hiddenProps)
            Context.defineHidden(context, hiddenProps);
        return context;
    }
    /**
     * Adds readonly properties to a Context
     * @param {?} context
     * @param {?} Props
     * @return {?}
     */
    static defineReadonly(context, Props) {
        // tslint:disable-next-line:forin
        for (const /** @type {?} */ prop in Props) {
            Object.defineProperty(context, prop, {
                enumerable: true,
                writable: false,
                value: Props[prop]
            });
        }
        return context;
    }
    /**
     * Adds hidden (non enumerable) properties to a Context
     * @param {?} context
     * @param {?} hiddenProps
     * @return {?}
     */
    static defineHidden(context, hiddenProps) {
        // tslint:disable-next-line:forin
        for (const /** @type {?} */ prop in hiddenProps) {
            Object.defineProperty(context, prop, {
                enumerable: false,
                writable: true,
                value: hiddenProps[prop]
            });
        }
        return context;
    }
    /**
     * adds public properties only if they don't exist in parent
     * @param {?} context
     * @param {?} props
     * @return {?}
     */
    static defineWeak(context, props) {
        // tslint:disable-next-line:forin
        for (const /** @type {?} */ prop in props) {
            if (prop in context)
                continue;
            Object.defineProperty(context, prop, {
                enumerable: true,
                writable: true,
                value: props[prop]
            });
        }
    }
}
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Base class for all dynamic widget elements
 * @abstract
 */
class AbstractWidget {
    /**
     * @param {?} _cdr
     * @param {?} _expr
     */
    constructor(_cdr, _expr) {
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
    /**
     * @param {?} subs
     * @return {?}
     */
    set addSubscription(subs) {
        this._subscriptions.push(subs);
    }
    /**
     * Initialices the widget from a json definition
     * @param {?} element
     * @param {?} def
     * @param {?} context
     * @return {?}
     */
    setup(element, def, context) {
        def = def || { type: 'none' };
        def.options = def.options || {};
        this.type = def.type || 'none';
        this.element = element;
        console.log(`Widget setup ${this.type}`, this);
        this.context = context;
        this.widgetDef = def = this.dynOnSetup(def) || def;
        this.bindings = parseDefObject(def.options, this.context, true, this._expr);
        this.content = Array.isArray(def.content) ? def.content : typeof def.content === 'object' ? [def.content] : [];
        this.subscribeOptions();
    }
    /**
     * Helper function to add a `map` pipe to the corresponding input observable
     * @param {?} option
     * @param {?} callback
     * @return {?}
     */
    map(option, callback) {
        const /** @type {?} */ opt = this.bindings[option];
        if (opt)
            this.bindings[option] = opt.pipe(map(callback));
    }
    /**
     * Hook to customize the observable bindings befor subscribing.
     * Tipically using the `this.map()` function to add processing to specific options
     * @return {?}
     */
    dynOnBeforeBind() { }
    /**
     * @return {?}
     */
    dynOnAfterBind() { }
    /**
     * Hook to customize widget definition before procesing it
     * @param {?} def
     * @return {?}
     */
    dynOnSetup(def) { return def; }
    /**
     * @return {?}
     */
    subscribeOptions() {
        const /** @type {?} */ observables = [];
        // call hook for cofiguration of options before updating the bound value
        this.dynOnBeforeBind();
        for (const /** @type {?} */ prop in this.bindings)
            // tslint:disable-line:forin
            this.bindings[prop] = this.bindings[prop].pipe(tap(res => this[prop] = res));
        // call hook after updating the bound value
        this.dynOnAfterBind();
        for (const /** @type {?} */ prop in this.bindings)
            // tslint:disable-line:forin
            observables.push(this.bindings[prop]);
        this.addSubscription = combineLatest(observables).subscribe(() => this._cdr.markForCheck());
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._unsubscribe();
    }
    /**
     * OnChanges is never called on dynamic widget instantiation
     * It is intended to provide the same interface is the widget is used declarative in a template
     * instead of dynamically
     * @return {?}
     */
    ngOnChanges() {
        console.log(`Widget OnChanges ${this.type}`, this);
        this._unsubscribe();
        this.setup(null, this.widgetDef, this.context);
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        console.log(`Widget OnInit ${this.type}`, this);
    }
    /**
     * @return {?}
     */
    _unsubscribe() {
        for (const /** @type {?} */ subs of this._subscriptions)
            subs.unsubscribe();
    }
}
AbstractWidget.propDecorators = {
    widgetDef: [{ type: Input }],
    context: [{ type: Input }]
};
/**
 * @param {?} objDef
 * @param {?} context
 * @param {?} asObservable
 * @param {?} expr
 * @return {?}
 */
function parseDefObject(objDef, context, asObservable, expr) {
    const /** @type {?} */ result = {};
    if (!objDef)
        return null;
    for (const /** @type {?} */ prop in objDef) {
        if (prop.charAt(prop.length - 1) === '=') {
            if (typeof objDef[prop] !== 'string')
                throw new SyntaxError('Binding options must be "string" Iexpressions');
            result[prop.slice(0, prop.length - 1)] = expr.eval(objDef[prop], context, asObservable);
        }
        else
            result[prop] = asObservable && !isObservable(objDef[prop]) ? of(objDef[prop]) : objDef[prop];
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
class Expressions {
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
/**
 * Service for Parsing and for evaluating expressions in Widget's configuration
 * The funcionality is provided by the ESpression package
 *
 */
class ESpression extends Expressions {
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
        return function map$$1(obj, expression) {
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
const /** @type {?} */ expressionProvider = {
    provide: Expressions,
    useClass: ESpression
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class DefaultWidgetComponent extends AbstractWidget {
    /**
     * @param {?} cdr
     * @param {?} expr
     */
    constructor(cdr, expr) {
        super(cdr, expr);
    }
}
DefaultWidgetComponent.decorators = [
    { type: Component, args: [{
                selector: 'wdg-default',
                template: '<div>Unknown widget "{{type}}"</div>',
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush
            },] },
];
/** @nocollapse */
DefaultWidgetComponent.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: Expressions }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
const /** @type {?} */ AF_CONFIG_TOKEN = new InjectionToken('AF_CONFIG_TOKEN');
class WidgetRegistry {
    /**
     * @param {?=} configs
     */
    constructor(configs = []) {
        this._registry = new Map();
        configs.forEach(conf => conf.widgets && this.register(conf.widgets));
        this._default = this._registry.get('default') || DefaultWidgetComponent;
    }
    /**
     * @param {?} widgets
     * @return {?}
     */
    register(widgets) {
        if (!widgets)
            return;
        if (!Array.isArray(widgets))
            widgets = [widgets];
        widgets.forEach(widget => {
            if (widget.type && widget.component)
                this._registry.set(widget.type, widget.component);
        });
    }
    /**
     * @param {?} type
     * @return {?}
     */
    get(type) {
        return this._registry.get(type) || this._default;
    }
}
WidgetRegistry.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] },
];
/** @nocollapse */
WidgetRegistry.ctorParameters = () => [
    { type: Array, decorators: [{ type: Inject, args: [AF_CONFIG_TOKEN,] }] }
];
/** @nocollapse */ WidgetRegistry.ngInjectableDef = defineInjectable({ factory: function WidgetRegistry_Factory() { return new WidgetRegistry(inject(AF_CONFIG_TOKEN)); }, token: WidgetRegistry, providedIn: "root" });

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Injection token used to provide the default root context for widgets
 */
const /** @type {?} */ ROOT_CONTEXT = new InjectionToken('Widgets Root Context');
class WidgetDirective {
    /**
     * @param {?} _container
     * @param {?} _registry
     * @param {?} _cfr
     * @param {?} _rootContext
     * @param {?} _expr
     */
    constructor(_container, _registry, _cfr, _rootContext, _expr) {
        this._container = _container;
        this._registry = _registry;
        this._cfr = _cfr;
        this._rootContext = _rootContext;
        this._expr = _expr;
    }
    /**
     * @return {?}
     */
    ngOnChanges() {
        this._preCreate();
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._destroy();
        this._unsuscribe();
    }
    /**
     * @return {?}
     */
    _preCreate() {
        this.wdgWidget = this.wdgWidget || { type: 'none' };
        this.parentContext = this.parentContext || this._rootContext;
        this.context = Context.create(this.parentContext, parseDefObject(this.wdgWidget.context, this.parentContext, false, this._expr));
        this._destroy();
        this._unsuscribe();
        if (this.wdgWidget.if) {
            this._ifSubs = this._expr.eval(this.wdgWidget.if, this.context, true).subscribe(cond => {
                if (cond && !this._widgetRef)
                    this._create();
                else
                    this._destroy();
            });
        }
        else
            this._create();
    }
    /**
     * @return {?}
     */
    _create() {
        const /** @type {?} */ widgetClass = this._registry.get(this.wdgWidget.type);
        const /** @type {?} */ factory = this._cfr.resolveComponentFactory(widgetClass);
        this._widgetRef = this._container.createComponent(factory);
        this.widget = this._widgetRef.instance;
        this.widget.setup(this, this.wdgWidget, this.context);
    }
    /**
     * @return {?}
     */
    _destroy() {
        if (this._widgetRef) {
            this._widgetRef.destroy();
            this._widgetRef = null;
        }
    }
    /**
     * @return {?}
     */
    _unsuscribe() {
        if (this._ifSubs) {
            this._ifSubs.unsubscribe();
            this._ifSubs = null;
        }
    }
}
WidgetDirective.decorators = [
    { type: Directive, args: [{
                selector: '[wdgWidget]'
            },] },
];
/** @nocollapse */
WidgetDirective.ctorParameters = () => [
    { type: ViewContainerRef },
    { type: WidgetRegistry },
    { type: ComponentFactoryResolver },
    { type: Context, decorators: [{ type: Optional }, { type: Inject, args: [ROOT_CONTEXT,] }] },
    { type: Expressions }
];
WidgetDirective.propDecorators = {
    wdgWidget: [{ type: Input }],
    parentContext: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Angular Pipe to format text
 */
class FormatPipe {
    /**
     * @param {?} value
     * @param {?} format
     * @return {?}
     */
    transform(value, format) {
        return format ? formatValue(value, format) : value;
    }
}
FormatPipe.decorators = [
    { type: Pipe, args: [{
                name: 'format',
                pure: true
            },] },
];
/**
 * @param {?} value
 * @param {?} format
 * @return {?}
 */
function formatValue(value, format) {
    if (typeof format !== 'string' || value == null)
        return value;
    const /** @type {?} */ re = /^\s*(\w+)\s*(:(["'])([^"']*)\3)?$/;
    const /** @type {?} */ match = re.exec(format);
    if (!match[0])
        return value;
    switch (match[1].toUpperCase()) {
        case 'NUMBER':
            let /** @type {?} */ num;
            num = parseFloat(value);
            return isNaN(num) ? value : formatNumber(num, 'en-US', match[4]);
        case 'DATE':
            return formatDate(value, match[4], 'en-US');
    }
    return value;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class RoutedWidgetComponent {
    /**
     * @param {?} _route
     */
    constructor(_route) {
        this._route = _route;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.widgetDef = this._route.snapshot.data["widgetDef"] || { type: 'empty' };
        this.parentContext = this._route.snapshot.data["parentContext"];
    }
}
RoutedWidgetComponent.decorators = [
    { type: Component, args: [{
                selector: 'wdg-widget',
                template: '<ng-container [wdgWidget]="widgetDef" [parentContext]="parentContext"></ng-container>',
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush
            },] },
];
/** @nocollapse */
RoutedWidgetComponent.ctorParameters = () => [
    { type: ActivatedRoute }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class WidgetsCoreModule {
    /**
     * @param {?=} config
     * @return {?}
     */
    static forRoot(config = {}) {
        return {
            ngModule: WidgetsCoreModule,
            providers: [
                { provide: AF_CONFIG_TOKEN, useValue: config, multi: true },
                { provide: ANALYZE_FOR_ENTRY_COMPONENTS, useValue: config, multi: true }
            ]
        };
    }
}
WidgetsCoreModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule],
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
const /** @type {?} */ FORM_CONTROL = Symbol('FormControl');
class AbstractFormFieldWidget extends AbstractWidget {
    /**
     * @param {?} cdr
     * @param {?} expr
     */
    constructor(cdr, expr) {
        super(cdr, expr);
    }
    /**
     * @param {?} def
     * @return {?}
     */
    dynOnSetup(def) {
        // get bound model
        if (!def.bind)
            throw new Error('Form field widgets must have a "bind" property defined');
        const /** @type {?} */ lvalue = this._expr.lvalue(def.bind, this.context);
        if (!lvalue)
            throw new Error('Form field "bind" property must be an identifier or member expression');
        if (!isReactive(lvalue.o))
            throw new Error('Bound Key must be of Reactive Type');
        // setup validation
        if (def.validate && (this.validate = this._expr.parse(def.validate))) {
            // tslint:disable-line:whitespace
            this.validateContext = Context.create(this.context);
            this.formControl = new FormControl(null, null, (ctrl) => {
                this.validateContext['$value'] = ctrl.value;
                return this._expr.evaluate(this.validate, this.validateContext, true).pipe(take(1), map(res => {
                    return res ? null : { validate: 'validation error' };
                }));
            });
        }
        else
            this.formControl = new FormControl();
        const /** @type {?} */ parentForm = this.context[FORM_CONTROL];
        if (parentForm) {
            if (parentForm instanceof FormGroup)
                parentForm.addControl(lvalue.m, this.formControl);
            else if (parentForm instanceof FormArray)
                parentForm.push(this.formControl);
        }
        // listen to bound context value and update on changes
        this.addSubscription = lvalue.o[GET_OBSERVABLE](lvalue.m).subscribe(val => val !== this.formControl.value && this.formControl.setValue(val));
        // listen to control changes to update bound context value
        this.addSubscription = this.formControl.valueChanges.subscribe(val => {
            if (val !== lvalue.o[lvalue.m])
                lvalue.o[lvalue.m] = val;
        });
        return def;
    }
}

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
class MaterialModule {
}
MaterialModule.decorators = [
    { type: NgModule, args: [{
                exports: [
                    CommonModule,
                    ReactiveFormsModule,
                    MatAutocompleteModule,
                    MatSidenavModule,
                    MatButtonModule,
                    MatIconModule,
                    MatListModule,
                    MatInputModule,
                    MatDialogModule,
                    MatToolbarModule,
                    MatProgressBarModule,
                    MatExpansionModule,
                    MatSelectModule,
                    MatTabsModule,
                    MatSnackBarModule,
                    MatSlideToggleModule,
                    MatChipsModule,
                    MatCardModule,
                    MatCheckboxModule,
                    MatSliderModule,
                    MatTableModule,
                    MatPaginatorModule,
                    MatSortModule,
                    MatMenuModule,
                ]
            },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class InputWidgetComponent extends AbstractFormFieldWidget {
    /**
     * @param {?} cdr
     * @param {?} expr
     */
    constructor(cdr, expr) {
        super(cdr, expr);
    }
}
InputWidgetComponent.decorators = [
    { type: Component, args: [{
                selector: 'wdg-input',
                template: `<mat-form-field style.width="100%">

    <mat-label *ngIf="title">
        {{ title }}
    </mat-label>

    <input matInput
           name="aaa"
           [type]="type || 'text'"
           [formControl]="formControl"
           [placeholder]="placeholder"
           [required]="required">

    <mat-error [id]="null">

    </mat-error>

    <mat-hint *ngIf="description"
              [id]="null">
        {{ description }}
    </mat-hint>

</mat-form-field>
`,
                styles: [``],
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush
            },] },
];
/** @nocollapse */
InputWidgetComponent.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: Expressions }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class CheckboxWidgetComponent extends AbstractFormFieldWidget {
    /**
     * @param {?} cdr
     * @param {?} expr
     */
    constructor(cdr, expr) {
        super(cdr, expr);
    }
}
CheckboxWidgetComponent.decorators = [
    { type: Component, args: [{
                selector: 'wdg-checkbox',
                template: `<mat-checkbox labelPosition="before" [formControl]="formControl">
  {{title}}
</mat-checkbox>
`,
                styles: [``],
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush
            },] },
];
/** @nocollapse */
CheckboxWidgetComponent.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: Expressions }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class ToggleWidgetComponent extends AbstractFormFieldWidget {
    /**
     * @param {?} cdr
     * @param {?} expr
     */
    constructor(cdr, expr) {
        super(cdr, expr);
    }
}
ToggleWidgetComponent.decorators = [
    { type: Component, args: [{
                selector: 'wdg-toggle',
                template: `<mat-slide-toggle labelPosition="before">
  {{ title}}
</mat-slide-toggle>
`,
                styles: [``],
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush
            },] },
];
/** @nocollapse */
ToggleWidgetComponent.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: Expressions }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class SliderWidgetComponent extends AbstractFormFieldWidget {
    /**
     * @param {?} cdr
     * @param {?} expr
     */
    constructor(cdr, expr) {
        super(cdr, expr);
    }
}
SliderWidgetComponent.decorators = [
    { type: Component, args: [{
                selector: 'wdg-slider',
                template: `<span>{{title}}</span>
<mat-slider [formControl]="formControl"></mat-slider>
`,
                styles: [``],
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush
            },] },
];
/** @nocollapse */
SliderWidgetComponent.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: Expressions }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class ButtonWidgetComponent extends AbstractWidget {
    /**
     * @param {?} cdr
     * @param {?} expr
     */
    constructor(cdr, expr) {
        super(cdr, expr);
    }
    /**
     * @param {?} def
     * @return {?}
     */
    dynOnSetup(def) {
        if (def.bind) {
            const /** @type {?} */ lvalue = this._expr.lvalue(def.bind, this.context);
            if (!lvalue)
                throw new Error('Form field "bind" property must be an identifier or member expression');
            if (!isReactive(lvalue.o))
                throw new Error('Bound Key must be of Reactive Type');
            this._lvalue = lvalue;
        }
        return def;
    }
    /**
     * @param {?} _event
     * @return {?}
     */
    clickEvent(_event) {
        if (this._clickSubs) {
            this._clickSubs.unsubscribe();
            this._clickSubs = null;
        }
        if (this.click) {
            this._clickSubs = this._expr.eval(this.click, this.context, true).pipe(take(1)).subscribe(res => this._lvalue.o[this._lvalue.m] = res);
        }
    }
}
ButtonWidgetComponent.decorators = [
    { type: Component, args: [{
                selector: 'wdg-button',
                template: `<button mat-button (click)="clickEvent($event)">
  {{title}}
</button>
`,
                styles: [``],
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush
            },] },
];
/** @nocollapse */
ButtonWidgetComponent.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: Expressions }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class FormWidgetComponent extends AbstractWidget {
    /**
     * @param {?} cdr
     * @param {?} expr
     */
    constructor(cdr, expr) {
        super(cdr, expr);
    }
    /**
     * @param {?} def
     * @return {?}
     */
    dynOnSetup(def) {
        this.formGroup = new FormGroup({});
        // register with parent form, if any
        const /** @type {?} */ parentForm = this.context[FORM_CONTROL];
        if (parentForm) {
            if (parentForm instanceof FormGroup)
                parentForm.addControl('control', this.formGroup);
            else if (parentForm instanceof FormArray)
                parentForm.push(this.formGroup);
        }
        // save this FormGroup as parent form for the children
        Context.defineHidden(this.context, { [FORM_CONTROL]: this.formGroup });
        // create a Store for the variables
        this.context['$model'] = RxObject({});
        return def;
    }
}
FormWidgetComponent.decorators = [
    { type: Component, args: [{
                selector: 'wdg-form',
                template: `<ng-container *ngFor="let element of content" [wdgWidget]="element" [parentContext]="context">

</ng-container>
`,
                styles: [``],
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush
            },] },
];
/** @nocollapse */
FormWidgetComponent.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: Expressions }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class AutocompleteWidgetComponent extends AbstractFormFieldWidget {
    /**
     * @param {?} cdr
     * @param {?} expr
     */
    constructor(cdr, expr) {
        super(cdr, expr);
        this.enum = [];
    }
    /**
     * @return {?}
     */
    dynOnBeforeBind() {
        this.map('enum', val => {
            return Array.isArray(val) ? val : [];
        });
    }
    /**
     * @return {?}
     */
    dynOnAfterBind() {
        this.map('enum', val => (this._filter(this.formControl.value), val));
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        super.ngOnInit();
        this.filteredOptions = this.formControl.valueChanges
            .pipe(startWith(''), map(value => this._filter(value)));
    }
    /**
     * @param {?} value
     * @return {?}
     */
    _filter(value) {
        const /** @type {?} */ filterValue = value && value.toLowerCase();
        return this.enum.filter(option => option.toLowerCase().includes(filterValue));
    }
}
AutocompleteWidgetComponent.decorators = [
    { type: Component, args: [{
                selector: 'wdg-autocomplete',
                template: `<mat-form-field style.width="100%">

  <mat-label *ngIf="title">
    {{ title }}
  </mat-label>

  <input matInput name="aaa" [type]="type || 'text'" [formControl]="formControl" [placeholder]="placeholder"
    [matAutocomplete]="auto">

  <mat-error [id]="null">

  </mat-error>

  <mat-hint *ngIf="description" [id]="null">
    {{ description }}
  </mat-hint>

  <mat-autocomplete #auto="matAutocomplete">
    <mat-option *ngFor="let option of filteredOptions | async; index as optIndex" [value]="option">
      {{option}}
    </mat-option>
  </mat-autocomplete>

</mat-form-field>
`,
                styles: [``],
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush
            },] },
];
/** @nocollapse */
AutocompleteWidgetComponent.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: Expressions }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class FormFieldWidgetsModule {
}
FormFieldWidgetsModule.decorators = [
    { type: NgModule, args: [{
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class CardWidgetComponent extends AbstractWidget {
    /**
     * @param {?} cdr
     * @param {?} expr
     */
    constructor(cdr, expr) {
        super(cdr, expr);
    }
}
CardWidgetComponent.decorators = [
    { type: Component, args: [{
                selector: 'wdg-card',
                template: `<mat-card>
  <mat-card-title *ngIf="title">{{title}}</mat-card-title>
  <mat-card-subtitle *ngIf="description">{{description}}</mat-card-subtitle>
  <mat-card-content>
    <ng-container *ngFor="let element of content" [wdgWidget]="element" [parentContext]="context"></ng-container>
  </mat-card-content>
  <mat-card-actions align="end" *ngIf="actions">
    <ng-container *ngFor="let element of actions" [wdgWidget]="element" [parentContext]="context"></ng-container>
  </mat-card-actions>
</mat-card>
`,
                styles: [``],
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush
            },] },
];
/** @nocollapse */
CardWidgetComponent.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: Expressions }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class TableWidgetComponent extends AbstractWidget {
    /**
     * @param {?} cdr
     * @param {?} expr
     */
    constructor(cdr, expr) {
        super(cdr, expr);
        this.disableSort = [];
        this.actions = [];
        this.tableDataSource = new MatTableDataSource();
    }
    /**
     * @return {?}
     */
    dynOnBeforeBind() {
        const /** @type {?} */ opt = this.widgetDef.options;
        // if the only source is a static array, lets check if it has 'property=' columns to evaluate
        // and add the auto binding
        if (opt && !opt['dataSource='] &&
            Array.isArray(opt["dataSource"])) {
            const /** @type {?} */ dataSource = /** @type {?} */ (combineMixed(opt["dataSource"].map(row => combineMixed(parseDefObject(row, this.context, false, this._expr)), false), false));
            if (isObservable(dataSource))
                this.bindings["dataSource"] = dataSource;
            else
                this.dataSource = dataSource;
        }
        this.map('disableSort', sort => {
            if (sort === true)
                return null;
            if (!Array.isArray(sort))
                return [];
            return sort;
        });
        this.map('dataSource', (table) => this.tableDataSource.data = table.map(row => {
            row = parseDefObject(row, Context.create(this.context, { $data: row }), false, this._expr);
            if (Array.isArray(this.colTransform)) {
                for (let /** @type {?} */ i = 0; i < this.colTransform.length; i++) {
                    if (this.colTransform[i]) {
                        const /** @type {?} */ context = Context.create(this.context);
                        context.$data = row[this.colKeys[i]];
                        row[this.colKeys[i]] = this._expr.eval(this.colTransform[i], context, false);
                    }
                }
            }
            return row;
        }));
        this.map('pageSizes', (value) => {
            if (!Array.isArray(value) || !value.length) {
                this.tableDataSource.paginator = null;
                return null;
            }
            this.tableDataSource.paginator = this.paginator;
            return value;
        });
        this.map('colKeys', keys => {
            if (this.actions && this.actions.length)
                this.showCols = keys.concat('__actions__');
            else
                this.showCols = keys;
            return keys;
        });
        this.map('actions', actions => {
            if (!Array.isArray(actions))
                actions = [];
            this.showCols = actions.length ? this.colKeys.concat('__actions__') : this.colKeys;
            return actions;
        });
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        super.ngOnInit();
        this.tableDataSource.sort = this.sort;
    }
    /**
     * @param {?} filterValue
     * @return {?}
     */
    applyFilter(filterValue) {
        this.tableDataSource.filter = filterValue;
        if (this.tableDataSource.paginator) {
            this.tableDataSource.paginator.firstPage();
        }
    }
    /**
     * @param {?} rowData
     * @param {?} actionIndex
     * @return {?}
     */
    actionClick(rowData, actionIndex) {
        const /** @type {?} */ context = Context.create(this.context, { $data: rowData });
        this.addSubscription = this._expr.eval(this.actions[actionIndex].action, context, true).subscribe(() => {
            // TODO logic to reload table
        });
    }
}
TableWidgetComponent.decorators = [
    { type: Component, args: [{
                selector: 'wdg-table',
                template: `<div>
  <section class="table-title">
    <h6>{{title}}</h6>

    <div class="spacer"></div>

    <mat-form-field *ngIf="filterBy">
      <input matInput (keyup)="applyFilter($event.target.value)" placeholder="Filter">
    </mat-form-field>
  </section>

  <section class="mat-elevation-z1">
    <table mat-table [dataSource]="tableDataSource" matSort [matSortDisabled]="!disableSort">

      <!-- Dynamic Column definitions-->
      <ng-container [matColumnDef]="colKey" *ngFor="let colKey of colKeys; index as colIndex">
        <th mat-header-cell *matHeaderCellDef mat-sort-header [disabled]="disableSort?.indexOf(colKey) >= 0"> {{colHeaders[colIndex] || colKey}} </th>
        <ng-container *ngIf="colFormat && colFormat[colIndex]; else noFormatCellDef">
          <td mat-cell *matCellDef="let rowData">{{rowData[colKey] | format:colFormat[colIndex]}}</td>
        </ng-container>
        <ng-template #noFormatCellDef>
          <td mat-cell *matCellDef="let rowData">{{rowData[colKey]}}</td>
        </ng-template>
      </ng-container>

      <ng-container *ngIf="actions?.length" [matColumnDef]="'__actions__'">
        <th mat-header-cell *matHeaderCellDef > {{actionsHeader || 'Actions'}} </th>
        <td mat-cell *matCellDef="let rowData">
          <button mat-icon-button [matMenuTriggerFor]="menu">
            <mat-icon svgIcon="dots-vertical"></mat-icon>
          </button>
          <mat-menu #menu="matMenu">

            <button mat-menu-item *ngFor="let action of actions; index as actionIndex" (click)="actionClick(rowData, actionIndex)">
              <mat-icon [svgIcon]="actions[actionIndex].icon"></mat-icon>
              <span>{{actions[actionIndex].label}}</span>
            </button>
          </mat-menu>
        </td>
      </ng-container>


      <!-- Row definitions-->
      <ng-container *ngIf="colHeaders">
        <tr mat-header-row *matHeaderRowDef="showCols" class="header-row"></tr>
      </ng-container>
      <tr mat-row *matRowDef="let element; columns: showCols;" class="data-row"></tr>
    </table>

    <mat-paginator [class.hiddenPaginator]="!pageSizes" [pageSizeOptions]="pageSizes" [hidePageSize]="pageSizes?.length<=1"></mat-paginator>
  </section>
</div>
`,
                styles: [`dyn-table table{width:100%}dyn-table tr.data-row:hover{background:#f5f5f5}dyn-table tr.data-row:active{background:#efefef}dyn-table .data-row td{border-bottom-width:0}dyn-table mat-paginator.hiddenPaginator{display:none}dyn-table .table-title{display:flex;flex-flow:row}dyn-table .table-title>*{flex:0 0 auto}dyn-table .table-title .spacer{flex:1 1 auto}`],
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush
            },] },
];
/** @nocollapse */
TableWidgetComponent.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: Expressions }
];
TableWidgetComponent.propDecorators = {
    paginator: [{ type: ViewChild, args: [MatPaginator,] }],
    sort: [{ type: ViewChild, args: [MatSort,] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class ContainerWidgetComponent extends AbstractWidget {
    /**
     * @param {?} cdr
     * @param {?} expr
     */
    constructor(cdr, expr) {
        super(cdr, expr);
    }
    /**
     * @return {?}
     */
    dynOnBeforeBind() {
        this.map('direction', dir => dir || 'row');
    }
}
ContainerWidgetComponent.decorators = [
    { type: Component, args: [{
                selector: 'wdg-container',
                template: `<ng-container *ngFor="let element of content" [wdgWidget]="element" [parentContext]="context">

</ng-container>
`,
                styles: [`dyn-container.dyn-flex{display:flex;flex-wrap:wrap}dyn-container.dyn-flex>*{flex:1 1 auto}`],
                // tslint:disable-next-line:use-host-property-decorator
                host: {
                    '[class.dyn-flex]': 'true',
                    '[style.flex-direction]': 'direction'
                },
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush
            },] },
];
/** @nocollapse */
ContainerWidgetComponent.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: Expressions }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class GridContainerWidgetComponent extends AbstractWidget {
    /**
     * @param {?} cdr
     * @param {?} expr
     */
    constructor(cdr, expr) {
        super(cdr, expr);
    }
    /**
     * @return {?}
     */
    dynOnBeforeBind() {
        this.map('direction', dir => dir || 'row');
    }
}
GridContainerWidgetComponent.decorators = [
    { type: Component, args: [{
                selector: 'wdg-grid-container',
                template: `<ng-container *ngFor="let element of content" [wdgWidget]="element" [parentContext]="context">

</ng-container>
`,
                styles: [`dyn-grid-container.dyn-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));grid-auto-flow:row dense}`],
                // tslint:disable-next-line:use-host-property-decorator
                host: {
                    '[class.dyn-grid]': 'true',
                    '[style.flex-direction]': 'direction'
                },
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush
            },] },
];
/** @nocollapse */
GridContainerWidgetComponent.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: Expressions }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class TabsWidgetComponent extends AbstractWidget {
    /**
     * @param {?} cdr
     * @param {?} expr
     */
    constructor(cdr, expr) {
        super(cdr, expr);
    }
    /**
     * @return {?}
     */
    ngOnInit() {
    }
}
TabsWidgetComponent.decorators = [
    { type: Component, args: [{
                selector: 'wdg-tabs',
                template: `<mat-tab-group>

  <mat-tab *ngFor="let tab of content; index as tabIndex" [label]="tabLabels[tabIndex] || ('Tab'+tabIndex)">

    <ng-template matTabContent>
      <ng-container [wdgWidget]="tab" [parentContext]="context"></ng-container>
    </ng-template>

  </mat-tab>


</mat-tab-group>
`,
                styles: [``],
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush
            },] },
];
/** @nocollapse */
TabsWidgetComponent.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: Expressions }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class CodeWidgetComponent extends AbstractWidget {
    /**
     * @param {?} cdr
     * @param {?} expr
     */
    constructor(cdr, expr) {
        super(cdr, expr);
    }
}
CodeWidgetComponent.decorators = [
    { type: Component, args: [{
                selector: 'wdg-code',
                template: `<code>
{{text}}
</code>`,
                styles: [`dyn-code code{white-space:pre}`],
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush
            },] },
];
/** @nocollapse */
CodeWidgetComponent.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: Expressions }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class CommonWidgetsModule {
}
CommonWidgetsModule.decorators = [
    { type: NgModule, args: [{
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

export { Context, AbstractWidget, parseDefObject, ROOT_CONTEXT, WidgetDirective, AF_CONFIG_TOKEN, WidgetRegistry, WidgetsCoreModule, FormatPipe, formatValue, RoutedWidgetComponent, Expressions, ESpression, expressionProvider, FORM_CONTROL, AbstractFormFieldWidget, FormFieldWidgetsModule, CommonWidgetsModule, MaterialModule };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVhY3RpdmUtanNvbi1mb3JtLW5nLmpzLm1hcCIsInNvdXJjZXMiOlsibmc6Ly9yZWFjdGl2ZS1qc29uLWZvcm0tbmcvbGliL2NvcmUvY29udGV4dC50cyIsIm5nOi8vcmVhY3RpdmUtanNvbi1mb3JtLW5nL2xpYi9jb3JlL2Fic3RyYWN0d2lkZ2V0LnRzIiwibmc6Ly9yZWFjdGl2ZS1qc29uLWZvcm0tbmcvbGliL2NvcmUvZXhwcmVzc2lvbnMudHMiLCJuZzovL3JlYWN0aXZlLWpzb24tZm9ybS1uZy9saWIvY29yZS9kZWZhdWx0d2lkZ2V0LmNvbXBvbmVudC50cyIsIm5nOi8vcmVhY3RpdmUtanNvbi1mb3JtLW5nL2xpYi9jb3JlL3dpZGdldHJlZ2lzdHJ5LnNlcnZpY2UudHMiLCJuZzovL3JlYWN0aXZlLWpzb24tZm9ybS1uZy9saWIvY29yZS93aWRnZXQuZGlyZWN0aXZlLnRzIiwibmc6Ly9yZWFjdGl2ZS1qc29uLWZvcm0tbmcvbGliL2NvcmUvZm9ybWF0LnRzIiwibmc6Ly9yZWFjdGl2ZS1qc29uLWZvcm0tbmcvbGliL2NvcmUvcm91dGVkd2lkZ2V0LmNvbXBvbmVudC50cyIsIm5nOi8vcmVhY3RpdmUtanNvbi1mb3JtLW5nL2xpYi9jb3JlL2NvcmUubW9kdWxlLnRzIiwibmc6Ly9yZWFjdGl2ZS1qc29uLWZvcm0tbmcvbGliL2NvcmUvZm9ybWZpZWxkd2lkZ2V0LnRzIiwibmc6Ly9yZWFjdGl2ZS1qc29uLWZvcm0tbmcvbGliL21hdGVyaWFsL21hdGVyaWFsLm1vZHVsZS50cyIsIm5nOi8vcmVhY3RpdmUtanNvbi1mb3JtLW5nL2xpYi9tYXRlcmlhbC9mb3JtZmllbGQvaW5wdXQvaW5wdXQuY29tcG9uZW50LnRzIiwibmc6Ly9yZWFjdGl2ZS1qc29uLWZvcm0tbmcvbGliL21hdGVyaWFsL2Zvcm1maWVsZC9jaGVja2JveC9jaGVja2JveC5jb21wb25lbnQudHMiLCJuZzovL3JlYWN0aXZlLWpzb24tZm9ybS1uZy9saWIvbWF0ZXJpYWwvZm9ybWZpZWxkL3RvZ2dsZS90b2dnbGUuY29tcG9uZW50LnRzIiwibmc6Ly9yZWFjdGl2ZS1qc29uLWZvcm0tbmcvbGliL21hdGVyaWFsL2Zvcm1maWVsZC9zbGlkZXIvc2xpZGVyLmNvbXBvbmVudC50cyIsIm5nOi8vcmVhY3RpdmUtanNvbi1mb3JtLW5nL2xpYi9tYXRlcmlhbC9mb3JtZmllbGQvYnV0dG9uL2J1dHRvbi5jb21wb25lbnQudHMiLCJuZzovL3JlYWN0aXZlLWpzb24tZm9ybS1uZy9saWIvbWF0ZXJpYWwvZm9ybWZpZWxkL2Zvcm0vZm9ybS5jb21wb25lbnQudHMiLCJuZzovL3JlYWN0aXZlLWpzb24tZm9ybS1uZy9saWIvbWF0ZXJpYWwvZm9ybWZpZWxkL2F1dG9jb21wbGV0ZS9hdXRvY29tcGxldGUuY29tcG9uZW50LnRzIiwibmc6Ly9yZWFjdGl2ZS1qc29uLWZvcm0tbmcvbGliL21hdGVyaWFsL2Zvcm1maWVsZC9mb3JtZmllbGQubW9kdWxlLnRzIiwibmc6Ly9yZWFjdGl2ZS1qc29uLWZvcm0tbmcvbGliL21hdGVyaWFsL2NvbW1vbi9jYXJkL2NhcmQuY29tcG9uZW50LnRzIiwibmc6Ly9yZWFjdGl2ZS1qc29uLWZvcm0tbmcvbGliL21hdGVyaWFsL2NvbW1vbi90YWJsZS90YWJsZS5jb21wb25lbnQudHMiLCJuZzovL3JlYWN0aXZlLWpzb24tZm9ybS1uZy9saWIvbWF0ZXJpYWwvY29tbW9uL2NvbnRhaW5lci9jb250YWluZXIuY29tcG9uZW50LnRzIiwibmc6Ly9yZWFjdGl2ZS1qc29uLWZvcm0tbmcvbGliL21hdGVyaWFsL2NvbW1vbi9ncmlkLWNvbnRhaW5lci9ncmlkY29udGFpbmVyLmNvbXBvbmVudC50cyIsIm5nOi8vcmVhY3RpdmUtanNvbi1mb3JtLW5nL2xpYi9tYXRlcmlhbC9jb21tb24vdGFicy90YWJzLmNvbXBvbmVudC50cyIsIm5nOi8vcmVhY3RpdmUtanNvbi1mb3JtLW5nL2xpYi9tYXRlcmlhbC9jb21tb24vY29kZS9jb2RlLmNvbXBvbmVudC50cyIsIm5nOi8vcmVhY3RpdmUtanNvbi1mb3JtLW5nL2xpYi9tYXRlcmlhbC9jb21tb24vY29tbW9uLm1vZHVsZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxOCBBZHJpYW4gUGFuZWxsYSA8aWFuY2hpNzRAb3V0bG9vay5jb20+XG4gKlxuICogVGhpcyBzb2Z0d2FyZSBpcyByZWxlYXNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuXG4gKiBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL01JVFxuICovXG5cbmV4cG9ydCBpbnRlcmZhY2UgSUNvbnRleHREZWYge1xuICBbaWRlbnRpZmllcjogc3RyaW5nXTogYW55O1xufVxuXG5cbi8qKlxuICogSGVscGVyIGNsYXNzIHRvIGhvbGQgY29udGV4dCBmb3IgZXhwcmVzc2lvbiBldmFsdWF0aW9uLlxuICogSXQgb25seSBnaXZlcyBhICd0eXBlJyB0byBhIHBsYWluIG9iamVjdC5cbiAqIEl0IGhhcyBzdGF0aWMgbWV0aG9kcyB0byBtYW5hZ2UgaW5oZXJpdGFuY2UgYW5kIGFkZGluZyBwcm9wZXJ0aWVzIGFuZCBidWlsdGluc1xuICovXG5leHBvcnQgY2xhc3MgQ29udGV4dCB7XG5cbiAgLyoqIEhlbHBlciBkZWZpbml0aW9uIG9mIGJ1aWx0LWluIG9iamVjdHMgKi9cbiAgc3RhdGljIGJ1aWx0aW5zRGVmOiBJQ29udGV4dERlZiA9IHtcblxuICAgIC8vIEJ1aWx0aW4gZnVuY3Rpb25zOlxuICAgIHBhcnNlRmxvYXQ6IHBhcnNlRmxvYXQsXG4gICAgcGFyc2VJbnQ6IHBhcnNlSW50LFxuICAgIGlzTmFOOiBpc05hTixcbiAgICBpc0Zpbml0ZTogaXNGaW5pdGUsXG5cbiAgICAvLyBGdW5kYW1lbnRhbCBvYmplY3RzOlxuICAgIE51bWJlcjogTnVtYmVyLFxuICAgIE1hdGg6IE1hdGgsXG4gICAgRGF0ZTogRGF0ZSxcbiAgICBBcnJheTogQXJyYXksXG4gICAgSlNPTjogSlNPTixcbiAgICBPYmplY3Q6IE9iamVjdCxcblxuICB9O1xuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgQ29udGV4dCBvYmplY3QsIGluaGVyaXRpbmcgZnJvbSBhbiBvcHRpb25hbCBgcGFyZW50YCBhbmQgYWRkaW5nIGN1c3RvbSBwcm9wZXJ0aWVzXG4gICAqIGFuZCBvcHRpb25hbGx5IGJ1aWx0aW4gb2JqZWN0c1xuICAgKiBAcGFyYW0gcGFyZW50XG4gICAqIEBwYXJhbSBwdWJsaWNQcm9wc1xuICAgKiBAcGFyYW0gcmVhZG9ubHlQcm9wc1xuICAgKiBAcGFyYW0gaGlkZGVuUHJvcHNcbiAgICogQHBhcmFtIGJ1aWx0aW5zIEJvb2xlYW4uIElmIHRydWUgYWRkcyBidWlsdGlub2JqZWN0cyBhcyBwdWJsaWMgcHJvcGVydGllcyxcbiAgICovXG4gIHN0YXRpYyBjcmVhdGUocGFyZW50PzogQ29udGV4dCwgcHVibGljUHJvcHM/OiBJQ29udGV4dERlZixcbiAgICByZWFkb25seVByb3BzPzogSUNvbnRleHREZWYsXG4gICAgaGlkZGVuUHJvcHM/OiBJQ29udGV4dERlZixcbiAgICBidWlsdGlucz86IGJvb2xlYW4pOiBDb250ZXh0IHtcblxuICAgIGNvbnN0IGNvbnRleHQ6IENvbnRleHQgPSBwYXJlbnQgPyBPYmplY3QuY3JlYXRlKHBhcmVudCkgOiBuZXcgQ29udGV4dCgpO1xuXG4gICAgaWYgKGJ1aWx0aW5zKSBDb250ZXh0LmRlZmluZVJlYWRvbmx5KGNvbnRleHQsIENvbnRleHQuYnVpbHRpbnNEZWYpO1xuICAgIGlmIChwdWJsaWNQcm9wcykgT2JqZWN0LmFzc2lnbihjb250ZXh0LCBwdWJsaWNQcm9wcyk7XG4gICAgaWYgKHJlYWRvbmx5UHJvcHMpIENvbnRleHQuZGVmaW5lUmVhZG9ubHkoY29udGV4dCwgcmVhZG9ubHlQcm9wcyk7XG4gICAgaWYgKGhpZGRlblByb3BzKSBDb250ZXh0LmRlZmluZUhpZGRlbihjb250ZXh0LCBoaWRkZW5Qcm9wcyk7XG5cbiAgICByZXR1cm4gY29udGV4dDtcbiAgfVxuXG4gIC8qKiBBZGRzIHJlYWRvbmx5IHByb3BlcnRpZXMgdG8gYSBDb250ZXh0ICovXG4gIHN0YXRpYyBkZWZpbmVSZWFkb25seShjb250ZXh0OiBDb250ZXh0LCBQcm9wczogSUNvbnRleHREZWYpIHtcblxuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpmb3JpblxuICAgIGZvciAoY29uc3QgcHJvcCBpbiBQcm9wcykge1xuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGNvbnRleHQsIHByb3AsIHtcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgd3JpdGFibGU6IGZhbHNlLFxuICAgICAgICB2YWx1ZTogUHJvcHNbcHJvcF1cbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHJldHVybiBjb250ZXh0O1xuICB9XG5cbiAgLyoqIEFkZHMgaGlkZGVuIChub24gZW51bWVyYWJsZSkgcHJvcGVydGllcyB0byBhIENvbnRleHQgKi9cbiAgc3RhdGljIGRlZmluZUhpZGRlbihjb250ZXh0OiBDb250ZXh0LCBoaWRkZW5Qcm9wczogSUNvbnRleHREZWYpIHtcblxuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpmb3JpblxuICAgIGZvciAoY29uc3QgcHJvcCBpbiBoaWRkZW5Qcm9wcykge1xuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGNvbnRleHQsIHByb3AsIHtcbiAgICAgICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgICAgIHdyaXRhYmxlOiB0cnVlLFxuICAgICAgICB2YWx1ZTogaGlkZGVuUHJvcHNbcHJvcF1cbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHJldHVybiBjb250ZXh0O1xuICB9XG5cbiAgLyoqIGFkZHMgcHVibGljIHByb3BlcnRpZXMgb25seSBpZiB0aGV5IGRvbid0IGV4aXN0IGluIHBhcmVudCAqL1xuICBzdGF0aWMgZGVmaW5lV2Vhayhjb250ZXh0OiBDb250ZXh0LCBwcm9wczogSUNvbnRleHREZWYpIHtcblxuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpmb3JpblxuICAgIGZvciAoY29uc3QgcHJvcCBpbiBwcm9wcykge1xuICAgICAgaWYgKHByb3AgaW4gY29udGV4dCkgY29udGludWU7XG4gICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoY29udGV4dCwgcHJvcCwge1xuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICAgICAgdmFsdWU6IHByb3BzW3Byb3BdXG4gICAgICB9KTtcbiAgICB9XG4gIH1cbn1cbiIsIlxuLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTggQWRyaWFuIFBhbmVsbGEgPGlhbmNoaTc0QG91dGxvb2suY29tPlxuICpcbiAqIFRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLlxuICogaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9NSVRcbiAqL1xuXG5pbXBvcnQgeyBPbkRlc3Ryb3ksIENoYW5nZURldGVjdG9yUmVmLCBJbnB1dCwgT25DaGFuZ2VzLCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUsIG9mLCBTdWJzY3JpcHRpb24sIGNvbWJpbmVMYXRlc3QsIGlzT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgdGFwLCBtYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBJV2lkZ2V0RGVmIH0gZnJvbSAnLi93aWRnZXQuaW50ZXJmYWNlJztcbmltcG9ydCB7IFdpZGdldERpcmVjdGl2ZSB9IGZyb20gJy4vd2lkZ2V0LmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBDb250ZXh0IH0gZnJvbSAnLi9jb250ZXh0JztcbmltcG9ydCB7IEV4cHJlc3Npb25zIH0gZnJvbSAnLi9leHByZXNzaW9ucyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgSU9wdGlvbkRlZiB7IFtwcm9wOiBzdHJpbmddOiBhbnk7IH1cblxuLyoqXG4gKiBCYXNlIGNsYXNzIGZvciBhbGwgZHluYW1pYyB3aWRnZXQgZWxlbWVudHNcbiAqL1xuZXhwb3J0IGFic3RyYWN0IGNsYXNzIEFic3RyYWN0V2lkZ2V0IGltcGxlbWVudHMgT25EZXN0cm95LCBPbkNoYW5nZXMsIE9uSW5pdCB7XG5cbiAgLyoqIENvbmZpZ3VyYXRpb24gb2YgdGhlIHdpZGdldCAqL1xuICBASW5wdXQoKSB3aWRnZXREZWY6IElXaWRnZXREZWY7XG4gIEBJbnB1dCgpIGNvbnRleHQ6IENvbnRleHQ7XG5cbiAgLyoqIFN0cmluZyBpZGVudGlmaW5nIHRoZSAndHlwZScgb2YgdGhlIHdpZGdldCAqL1xuICB0eXBlOiBzdHJpbmc7XG4gIC8qKiBDb250ZXh0IHRvIHVzZSBmb3IgZXZhbHVhdGlvbnMgYXQgdGhpcyBsZXZlbCAqL1xuXG4gIC8qKiBXaWRnZXQgc3BlY2lmaWMgb3B0aW9ucyBhbGwgY29udmVydGVkIHRvIG9ic2VydmFibGVzLCB0byB1bmlmeSBiZXR3ZWVuICpleHByZXNzaW9uKiBhbmRcbiAgICogKmNvbnN0YW50KiBub3RhdGlvbiBpbiB0aGUgcHJvcGVydGllcyBkZWZpbml0aW9uLlxuICAgKiBFYWNoIGJpbmRpbmcgdGhlbiBhdXRvIHVwZGF0ZXMgdGhlIGNvcnJlc3BvbmRpbmcgcHJvcGVydHkgaW4gdGhlIGRlcml2ZWQgd2lkZ2V0LlxuICAgKi9cbiAgYmluZGluZ3M6IHsgW3Byb3A6IHN0cmluZ106IE9ic2VydmFibGU8YW55PiB9ID0ge307XG4gIC8qKiBUaGUgaW5wdXQgY29uZmlndXJhdGlvbiBvZiB0aGlzIG9iamVjdCAqL1xuXG4gIGNvbnRlbnQ6IElXaWRnZXREZWZbXTtcblxuICBlbGVtZW50OiBXaWRnZXREaXJlY3RpdmU7XG5cbiAgc2V0IGFkZFN1YnNjcmlwdGlvbihzdWJzOiBTdWJzY3JpcHRpb24pIHtcbiAgICB0aGlzLl9zdWJzY3JpcHRpb25zLnB1c2goc3Vicyk7XG4gIH1cblxuICBwcml2YXRlIF9zdWJzY3JpcHRpb25zOiBTdWJzY3JpcHRpb25bXSA9IFtdO1xuXG5cbiAgY29uc3RydWN0b3IocHJvdGVjdGVkIF9jZHI6IENoYW5nZURldGVjdG9yUmVmLCBwcm90ZWN0ZWQgX2V4cHI6IEV4cHJlc3Npb25zKSB7XG4gIH1cblxuICAvKiogSW5pdGlhbGljZXMgdGhlIHdpZGdldCBmcm9tIGEganNvbiBkZWZpbml0aW9uICovXG4gIHNldHVwKGVsZW1lbnQ6IFdpZGdldERpcmVjdGl2ZSwgZGVmOiBJV2lkZ2V0RGVmLCBjb250ZXh0OiBDb250ZXh0KSB7XG4gICAgZGVmID0gZGVmIHx8IHsgdHlwZTogJ25vbmUnIH07XG4gICAgZGVmLm9wdGlvbnMgPSBkZWYub3B0aW9ucyB8fCB7fTtcblxuICAgIHRoaXMudHlwZSA9IGRlZi50eXBlIHx8ICdub25lJztcbiAgICB0aGlzLmVsZW1lbnQgPSBlbGVtZW50O1xuXG4gICAgY29uc29sZS5sb2coYFdpZGdldCBzZXR1cCAke3RoaXMudHlwZX1gLCB0aGlzKTtcblxuICAgIHRoaXMuY29udGV4dCA9IGNvbnRleHQ7XG5cbiAgICB0aGlzLndpZGdldERlZiA9IGRlZiA9IHRoaXMuZHluT25TZXR1cChkZWYpIHx8IGRlZjtcblxuICAgIHRoaXMuYmluZGluZ3MgPSBwYXJzZURlZk9iamVjdChkZWYub3B0aW9ucywgdGhpcy5jb250ZXh0LCB0cnVlLCB0aGlzLl9leHByKTtcblxuICAgIHRoaXMuY29udGVudCA9IEFycmF5LmlzQXJyYXkoZGVmLmNvbnRlbnQpID8gZGVmLmNvbnRlbnQgOiB0eXBlb2YgZGVmLmNvbnRlbnQgPT09ICdvYmplY3QnID8gW2RlZi5jb250ZW50XSA6IFtdO1xuXG4gICAgdGhpcy5zdWJzY3JpYmVPcHRpb25zKCk7XG4gIH1cblxuICAvKipcbiAgICogSGVscGVyIGZ1bmN0aW9uIHRvIGFkZCBhIGBtYXBgIHBpcGUgdG8gdGhlIGNvcnJlc3BvbmRpbmcgaW5wdXQgb2JzZXJ2YWJsZVxuICAgKi9cbiAgbWFwKG9wdGlvbjogc3RyaW5nLCBjYWxsYmFjazogKHY6IGFueSkgPT4gYW55KSB7XG4gICAgY29uc3Qgb3B0OiBPYnNlcnZhYmxlPGFueT4gPSB0aGlzLmJpbmRpbmdzW29wdGlvbl07XG4gICAgaWYgKG9wdCkgdGhpcy5iaW5kaW5nc1tvcHRpb25dID0gb3B0LnBpcGUobWFwKGNhbGxiYWNrKSk7XG5cbiAgfVxuICAvKipcbiAgICogSG9vayB0byBjdXN0b21pemUgdGhlIG9ic2VydmFibGUgYmluZGluZ3MgYmVmb3Igc3Vic2NyaWJpbmcuXG4gICAqIFRpcGljYWxseSB1c2luZyB0aGUgYHRoaXMubWFwKClgIGZ1bmN0aW9uIHRvIGFkZCBwcm9jZXNzaW5nIHRvIHNwZWNpZmljIG9wdGlvbnNcbiAgICovXG4gIGR5bk9uQmVmb3JlQmluZCgpIHsgfVxuXG4gIGR5bk9uQWZ0ZXJCaW5kKCkgeyB9XG5cbiAgLyoqIEhvb2sgdG8gY3VzdG9taXplIHdpZGdldCBkZWZpbml0aW9uIGJlZm9yZSBwcm9jZXNpbmcgaXQgKi9cbiAgZHluT25TZXR1cChkZWY6IElXaWRnZXREZWYpIHsgcmV0dXJuIGRlZjsgfVxuXG4gIHN1YnNjcmliZU9wdGlvbnMoKSB7XG4gICAgY29uc3Qgb2JzZXJ2YWJsZXMgPSBbXTtcblxuICAgIC8vIGNhbGwgaG9vayBmb3IgY29maWd1cmF0aW9uIG9mIG9wdGlvbnMgYmVmb3JlIHVwZGF0aW5nIHRoZSBib3VuZCB2YWx1ZVxuICAgIHRoaXMuZHluT25CZWZvcmVCaW5kKCk7XG5cbiAgICBmb3IgKGNvbnN0IHByb3AgaW4gdGhpcy5iaW5kaW5ncykgLy8gdHNsaW50OmRpc2FibGUtbGluZTpmb3JpblxuICAgICAgdGhpcy5iaW5kaW5nc1twcm9wXSA9IHRoaXMuYmluZGluZ3NbcHJvcF0ucGlwZSh0YXAocmVzID0+IHRoaXNbcHJvcF0gPSByZXMpKTtcblxuICAgIC8vIGNhbGwgaG9vayBhZnRlciB1cGRhdGluZyB0aGUgYm91bmQgdmFsdWVcbiAgICB0aGlzLmR5bk9uQWZ0ZXJCaW5kKCk7XG5cbiAgICBmb3IgKGNvbnN0IHByb3AgaW4gdGhpcy5iaW5kaW5ncykgLy8gdHNsaW50OmRpc2FibGUtbGluZTpmb3JpblxuICAgICAgb2JzZXJ2YWJsZXMucHVzaCh0aGlzLmJpbmRpbmdzW3Byb3BdKTtcblxuICAgIHRoaXMuYWRkU3Vic2NyaXB0aW9uID0gY29tYmluZUxhdGVzdChvYnNlcnZhYmxlcykuc3Vic2NyaWJlKCgpID0+IHRoaXMuX2Nkci5tYXJrRm9yQ2hlY2soKSk7XG5cbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuX3Vuc3Vic2NyaWJlKCk7XG4gIH1cblxuICAvKipcbiAgICogT25DaGFuZ2VzIGlzIG5ldmVyIGNhbGxlZCBvbiBkeW5hbWljIHdpZGdldCBpbnN0YW50aWF0aW9uXG4gICAqIEl0IGlzIGludGVuZGVkIHRvIHByb3ZpZGUgdGhlIHNhbWUgaW50ZXJmYWNlIGlzIHRoZSB3aWRnZXQgaXMgdXNlZCBkZWNsYXJhdGl2ZSBpbiBhIHRlbXBsYXRlXG4gICAqIGluc3RlYWQgb2YgZHluYW1pY2FsbHlcbiAgICovXG4gIG5nT25DaGFuZ2VzKCkge1xuICAgIGNvbnNvbGUubG9nKGBXaWRnZXQgT25DaGFuZ2VzICR7dGhpcy50eXBlfWAsIHRoaXMpO1xuICAgIHRoaXMuX3Vuc3Vic2NyaWJlKCk7XG4gICAgdGhpcy5zZXR1cChudWxsLCB0aGlzLndpZGdldERlZiwgdGhpcy5jb250ZXh0KTtcbiAgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIGNvbnNvbGUubG9nKGBXaWRnZXQgT25Jbml0ICR7dGhpcy50eXBlfWAsIHRoaXMpO1xuICB9XG5cbiAgcHJpdmF0ZSBfdW5zdWJzY3JpYmUoKSB7XG4gICAgZm9yIChjb25zdCBzdWJzIG9mIHRoaXMuX3N1YnNjcmlwdGlvbnMpIHN1YnMudW5zdWJzY3JpYmUoKTtcbiAgfVxuXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwYXJzZURlZk9iamVjdChvYmpEZWY6IElPcHRpb25EZWYsIGNvbnRleHQ6IENvbnRleHQsIGFzT2JzZXJ2YWJsZTogYm9vbGVhbiwgZXhwcjogRXhwcmVzc2lvbnMpIHtcblxuICBjb25zdCByZXN1bHQ6IElPcHRpb25EZWYgPSB7fTtcblxuICBpZiAoIW9iakRlZikgcmV0dXJuIG51bGw7XG5cbiAgZm9yIChjb25zdCBwcm9wIGluIG9iakRlZikge1xuXG4gICAgaWYgKHByb3AuY2hhckF0KHByb3AubGVuZ3RoIC0gMSkgPT09ICc9Jykge1xuICAgICAgaWYgKHR5cGVvZiBvYmpEZWZbcHJvcF0gIT09ICdzdHJpbmcnKSB0aHJvdyBuZXcgU3ludGF4RXJyb3IoJ0JpbmRpbmcgb3B0aW9ucyBtdXN0IGJlIFwic3RyaW5nXCIgSWV4cHJlc3Npb25zJyk7XG4gICAgICByZXN1bHRbcHJvcC5zbGljZSgwLCBwcm9wLmxlbmd0aCAtIDEpXSA9IGV4cHIuZXZhbChvYmpEZWZbcHJvcF0sIGNvbnRleHQsIGFzT2JzZXJ2YWJsZSk7XG5cbiAgICB9IGVsc2UgcmVzdWx0W3Byb3BdID0gYXNPYnNlcnZhYmxlICYmICFpc09ic2VydmFibGUob2JqRGVmW3Byb3BdKSA/IG9mKG9iakRlZltwcm9wXSkgOiBvYmpEZWZbcHJvcF07XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cbiIsIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDE4IEFkcmlhbiBQYW5lbGxhIDxpYW5jaGk3NEBvdXRsb29rLmNvbT5cbiAqXG4gKiBUaGlzIHNvZnR3YXJlIGlzIHJlbGVhc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS5cbiAqIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvTUlUXG4gKi9cblxuaW1wb3J0IHtcbiAgUmVhY3RpdmVFdmFsLCBTdGF0aWNFdmFsLCBQYXJzZXIsIGVzNVJ1bGVzLFxuICBJZGVudGlmaWVyUnVsZSwgQmluYXJ5T3BlcmF0b3JSdWxlLCBNRU1CRVJfRVhQXG59IGZyb20gJ2VzcHJlc3Npb24nO1xuaW1wb3J0IHsgaXNPYnNlcnZhYmxlLCBvZiwgRU1QVFkgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IENvbnRleHQgfSBmcm9tICcuL2NvbnRleHQnO1xuXG5leHBvcnQgaW50ZXJmYWNlIElBc3Qge1xuICB0eXBlOiBzdHJpbmc7XG4gIFtwcm9wOiBzdHJpbmddOiBhbnk7XG59XG5cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBFeHByZXNzaW9ucyB7XG5cbiAgYWJzdHJhY3QgcGFyc2VLZXkoZXhwcmVzc2lvbjogc3RyaW5nKTogSUFzdDtcbiAgYWJzdHJhY3QgcGFyc2UoZXhwcmVzc2lvbjogc3RyaW5nKTogSUFzdDtcbiAgLyoqXG4gICAqIEV2YWx1YXRlcyBhbiBleHByZXNzaW9uIGluIHRoZSBnaXZlbiBjb250ZXh0LlxuICAgKiBJdCB1c2VzIHRoZSBnZW5lcmFsIHBhcnNlci5cbiAgICpcbiAgICogQHBhcmFtIGV4cHJlc3Npb24gU3RyaW5nIGV4cHJlc3Npb25cbiAgICogQHBhcmFtIGNvbnRleHRcbiAgICogQHBhcmFtIGFzT2JzZXJ2YWJsZSBBbHdheXMgY29udmVydHMgcmVzdWx0IHRvIG9ic2VydmFibGVcbiAgICovXG4gIGV2YWwoZXhwcmVzc2lvbjogc3RyaW5nLCBjb250ZXh0OiBDb250ZXh0LCBhc09ic2VydmFibGU6IGJvb2xlYW4pIHtcbiAgICBjb25zdCBhc3QgPSB0aGlzLnBhcnNlKGV4cHJlc3Npb24pO1xuXG4gICAgcmV0dXJuIHRoaXMuZXZhbHVhdGUoYXN0LCBjb250ZXh0LCBhc09ic2VydmFibGUpO1xuICB9XG4gIGFic3RyYWN0IGV2YWx1YXRlKGFzdDogSUFzdCwgY29udGV4dDogQ29udGV4dCwgYXNPYnNlcnZhYmxlOiBib29sZWFuKTogYW55O1xuICBhYnN0cmFjdCBsdmFsdWUoZXhwcmVzc2lvbjogc3RyaW5nLCBjb250ZXh0OiBDb250ZXh0KTogeyBvLCBtIH07XG59XG5cblxuLyoqXG4gKiBTZXJ2aWNlIGZvciBQYXJzaW5nIGFuZCBmb3IgZXZhbHVhdGluZyBleHByZXNzaW9ucyBpbiBXaWRnZXQncyBjb25maWd1cmF0aW9uXG4gKiBUaGUgZnVuY2lvbmFsaXR5IGlzIHByb3ZpZGVkIGJ5IHRoZSBFU3ByZXNzaW9uIHBhY2thZ2VcbiAqXG4gKi9cbmV4cG9ydCBjbGFzcyBFU3ByZXNzaW9uIGV4dGVuZHMgRXhwcmVzc2lvbnMge1xuXG4gIHByaXZhdGUgX3BhcnNlcjogUGFyc2VyO1xuICBwcml2YXRlIF9rZXlQYXJzZXI6IFBhcnNlcjtcblxuICBwcml2YXRlIF9yeEV2YWw6IFN0YXRpY0V2YWw7XG5cbiAgY29uc3RydWN0b3IoKSB7XG5cbiAgICBzdXBlcigpO1xuICAgIGNvbnN0IGVzNSA9IGVzNVJ1bGVzKCk7XG5cbiAgICAvLyByZW1vdmUgUHJvZ2FtIC8gU3RhdGVtZW50cyBydWxlcywgYW5kIGtlZXAgb25seSBleHByZXNzaW9uc1xuICAgIGVzNVswXSA9IFtdO1xuXG4gICAgdGhpcy5fcGFyc2VyID0gbmV3IFBhcnNlcihlczUpO1xuXG5cbiAgICBjb25zdCBpZGVudGlmaWVyUnVsZSA9IG5ldyBJZGVudGlmaWVyUnVsZSh7IHRoaXNTdHI6IG51bGwsIGxpdGVyYWxzOiB7fSB9KTtcbiAgICB0aGlzLl9rZXlQYXJzZXIgPSBuZXcgUGFyc2VyKFtcbiAgICAgIFtuZXcgQmluYXJ5T3BlcmF0b3JSdWxlKHtcbiAgICAgICAgJy4nOiB7XG4gICAgICAgICAgdHlwZTogTUVNQkVSX0VYUCxcbiAgICAgICAgICBleHRyYTogeyBjb21wdXRlZDogZmFsc2UgfSxcbiAgICAgICAgICBub29wOiB0cnVlLFxuICAgICAgICAgIGxlZnQ6ICdvYmplY3QnLCByaWdodDogJ3Byb3BlcnR5JyxcbiAgICAgICAgICBydWxlczogW1tpZGVudGlmaWVyUnVsZV1dXG4gICAgICAgIH1cbiAgICAgIH0pXSxcbiAgICAgIFtpZGVudGlmaWVyUnVsZV1cbiAgICBdKTtcblxuICAgIHRoaXMuX3J4RXZhbCA9IG5ldyBSZWFjdGl2ZUV2YWwoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBQYXJzZXMgdGhlIHN0cmluZyBleHByZXNzaW9uIHVzaW5nIHRoZSBnZW5lcmFsIHBhcnNpbmcgcnVsZXMuXG4gICAqXG4gICAqICogQHBhcmFtIGV4cHJlc3Npb25cbiAgICovXG4gIHBhcnNlKGV4cHJlc3Npb246IHN0cmluZyk6IElBc3Qge1xuICAgIGxldCByZXN1bHQ6IElBc3Q7XG4gICAgdHJ5IHtcbiAgICAgIHJlc3VsdCA9IHRoaXMuX3BhcnNlci5wYXJzZShleHByZXNzaW9uKTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBjb25zb2xlLndhcm4oJ1BhcnNpbmcgRXJyb3InLCBlLm1lc3NhZ2UsICdcXG4nLCBleHByZXNzaW9uKTtcbiAgICAgIHJlc3VsdCA9IHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgLyoqXG4gICAqIFBhcnNlcyB0aGUgc3RyaW5nIGV4cHJlc3Npb24gdXNpbmcgdGhlIHJlc3RyaWN0ZWQgJ2tleScgcGFyc2luZyBydWxlcyxcbiAgICogaW50ZW5kZWQgdG8gcGFyc2UgYmluZGluZ3MgdG8gbW9kZWwga2V5cy5cbiAgICogQXMgdGhleSBtdXN0IGJlIGx2YWx1ZXMgdGhlIHJ1bGVzIGFyZSBtb3JlIGxpbWl0ZWQuXG4gICAqXG4gICAqIEBwYXJhbSBleHByZXNzaW9uXG4gICAqL1xuICBwYXJzZUtleShleHByZXNzaW9uOiBzdHJpbmcpOiBJQXN0IHtcbiAgICBsZXQgcmVzdWx0OiBJQXN0O1xuICAgIHRyeSB7XG4gICAgICByZXN1bHQgPSB0aGlzLl9rZXlQYXJzZXIucGFyc2UoZXhwcmVzc2lvbik7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgY29uc29sZS53YXJuKCdQYXJzaW5nIEVycm9yJywgZS5tZXNzYWdlLCAnXFxuJywgZXhwcmVzc2lvbik7XG4gICAgICByZXN1bHQgPSB1bmRlZmluZWQ7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIC8qKlxuICAgKiBFdmFsdWF0ZSBhbiBBU1QgaW4gdGhlIGdpdmVuIGNvbnRleHQuXG4gICAqXG4gICAqIEBwYXJhbSBhc3QgUGFyc2VkIGV4cHJlc3Npb24gdG8gZXZhbHVhdGVcbiAgICogQHBhcmFtIGNvbnRleHRcbiAgICogQHBhcmFtIGFzT2JzZXJ2YWJsZSBBbHdheXMgY29udmVydHMgcmVzdWx0IHRvIG9ic2VydmFibGVcbiAgICovXG4gIGV2YWx1YXRlKGFzdDogSUFzdCwgY29udGV4dDogQ29udGV4dCwgYXNPYnNlcnZhYmxlOiBib29sZWFuKSB7XG4gICAgaWYgKCFhc3QpIHJldHVybiBhc09ic2VydmFibGUgPyBFTVBUWSA6IHVuZGVmaW5lZDtcblxuICAgIGxldCByZXN1bHQ7XG4gICAgdHJ5IHtcbiAgICAgIHJlc3VsdCA9IHRoaXMuX3J4RXZhbC5ldmFsKGFzdCwgY29udGV4dCk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgY29uc29sZS53YXJuKCdFcnJvciBldmFsdWF0aW5nIGV4cHJlc3Npb246ICcsIGUubWVzc2FnZSk7XG4gICAgICByZXR1cm4gYXNPYnNlcnZhYmxlID8gb2YodW5kZWZpbmVkKSA6IHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICByZXR1cm4gYXNPYnNlcnZhYmxlICYmICFpc09ic2VydmFibGUocmVzdWx0KSA/IG9mKHJlc3VsdCkgOiByZXN1bHQ7XG4gIH1cblxuICAvKipcbiAgICogRXZhbHVhdGVzIGFuIGV4cHJlc3Npb24gdXNpbmcgKmtleSogcGFyc2luZyBydWxlcyBhbmQgcmV0dXJucyBhbmQgbHZhbHVlIG9iamVjdDpcbiAgICoge286IGV2YWx1YXRlZF9vYmplY3QsIG06IG1lbWJlcn1cbiAgICpcbiAgICogQHBhcmFtIGV4cHJlc3Npb25cbiAgICogQHBhcmFtIGNvbnRleHRcbiAgICovXG4gIGx2YWx1ZShleHByZXNzaW9uOiBzdHJpbmcsIGNvbnRleHQ6IENvbnRleHQpOiB7IG8sIG0gfSB7XG4gICAgbGV0IHJlc3VsdDtcblxuICAgIGNvbnN0IGFzdCA9IHRoaXMucGFyc2VLZXkoZXhwcmVzc2lvbik7XG5cbiAgICBpZiAoIWFzdCkgcmV0dXJuIG51bGw7XG4gICAgdHJ5IHtcbiAgICAgIHJlc3VsdCA9IHRoaXMuX3J4RXZhbC5sdmFsdWUoYXN0LCBjb250ZXh0KTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBjb25zb2xlLndhcm4oJ0Vycm9yIGV2YWx1YXRpbmcgZXhwcmVzc2lvbjogJywgZS5tZXNzYWdlKTtcbiAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG5cbiAgLyoqXG4gICAqIEV4cHJlc3Npb24gdmVyc2lvbiBvZiB0aGUgQXJyYXkubWFwIGZ1bmN0aW9uLlxuICAgKiBJIHJlcGxhY2VzIGVhY2ggYXJyYXkvb2JqZWN0IG1lbWJlciB3aXRoIHRoZSByZXN1bHQgb2YgZXZhbHVhdGluZyBhbiBleHByZXNzaW9uLlxuICAgKiBUaGUgZXhwcmVzc2lvbiBnZXRzIGluIGl0cyBldmFsIGNvbnRleHQgdGhlIHZhcmlhYmxlczpcbiAgICogYCRvYmplY3RgIHRoZSBvcmlnaW5hbCBvYmplY3QgYmVpbmcgbWFwZWRcbiAgICogYCR2YWx1ZWAgdGhlIGN1cnJlbnQgdmFsdWVcbiAgICogYCRpbmRleGAgZm9yIGFycmF5cywgdGhlIGN1cnJlbnQgaW5kZXggYmVpbmcgcmVwbGFjZWRcbiAgICogYCRrZXlgIGZvciBvYmplY3RzLCB0aGUgY3VycmVudCBrZXlcbiAgICovXG4gIG1hcEZhY3RvcnkoKSB7XG4gICAgY29uc3Qgc2VsZiA9IHRoaXM7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIG1hcChvYmo6IEFycmF5PGFueT4gfCBPYmplY3QsIGV4cHJlc3Npb246IHN0cmluZyk6IEFycmF5PGFueT4gfCBPYmplY3Qge1xuXG4gICAgICBpZiAoIWV4cHJlc3Npb24gfHwgdHlwZW9mIGV4cHJlc3Npb24gIT09ICdzdHJpbmcnKSByZXR1cm4gb2JqO1xuXG5cbiAgICAgIGNvbnN0IGFzdCA9IHNlbGYuX3BhcnNlci5wYXJzZShleHByZXNzaW9uKTtcbiAgICAgIGlmICghYXN0KSByZXR1cm4gb2JqO1xuXG4gICAgICBpZiAoQXJyYXkuaXNBcnJheShvYmopKSB7XG5cbiAgICAgICAgcmV0dXJuIG9iai5tYXAoKHZhbHVlLCBpbmRleCkgPT5cbiAgICAgICAgICBzZWxmLl9yeEV2YWwuZXZhbChhc3QsIENvbnRleHQuY3JlYXRlKHRoaXMsIHsgLy8gdHNsaW50OmRpc2FibGUtbGluZTpuby1pbnZhbGlkLXRoaXNcbiAgICAgICAgICAgICRvYmplY3Q6IG9iaixcbiAgICAgICAgICAgICR2YWx1ZTogdmFsdWUsXG4gICAgICAgICAgICAkaW5kZXg6IGluZGV4XG4gICAgICAgICAgfSkpKTtcbiAgICAgIH1cbiAgICAgIGlmICh0eXBlb2Ygb2JqID09PSAnb2JqZWN0Jykge1xuXG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IHt9O1xuXG4gICAgICAgIGZvciAoY29uc3QgcHJvcCBpbiBvYmopIC8vIHRzbGludDpkaXNhYmxlLWxpbmU6Zm9yaW5cblxuICAgICAgICAgIHJlc3VsdFtwcm9wXSA9IHNlbGYuX3J4RXZhbC5ldmFsKGFzdCwgQ29udGV4dC5jcmVhdGUodGhpcywgeyAvLyB0c2xpbnQ6ZGlzYWJsZS1saW5lOm5vLWludmFsaWQtdGhpc1xuICAgICAgICAgICAgJG9iamVjdDogb2JqLFxuICAgICAgICAgICAgJHZhbHVlOiBvYmpbcHJvcF0sXG4gICAgICAgICAgICAka2V5OiBwcm9wXG4gICAgICAgICAgfSkpO1xuXG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICB9XG4gICAgICByZXR1cm4gb2JqO1xuICAgIH07XG4gIH1cblxuICAvKipcbiAgKiBFeHByZXNzaW9uIHZlcnNpb24gb2YgdGhlIEFycmF5LnJlZHVjZSBmdW5jdGlvbi5cbiAgICogSSByZXBsYWNlcyBlYWNoIGFycmF5L29iamVjdCBtZW1iZXIgd2l0aCB0aGUgcmVzdWx0IG9mIGV2YWx1YXRpbmcgYW4gZXhwcmVzc2lvbi5cbiAgICogVGhlIGV4cHJlc3Npb24gZ2V0cyBpbiBpdHMgZXZhbCBjb250ZXh0IHRoZSB2YXJpYWJsZXM6XG4gICAqIGAkb2JqZWN0YCB0aGUgb3JpZ2luYWwgb2JqZWN0IGJlaW5nIG1hcGVkXG4gICAqIGAkdmFsdWVgIHRoZSBjdXJyZW50IGVsZW1lbnRcbiAgICogYCRpbmRleGAgZm9yIGFycmF5cywgdGhlIGN1cnJlbnQgaW5kZXggYmVpbmcgcmVwbGFjZWRcbiAgICogYCRrZXlgIGZvciBvYmplY3RzLCB0aGUgY3VycmVudCBrZXlcbiAgICogYCRwcmV2YCB0aGUgcHJldmlvdXNseSByZXR1cm5lZCB2YWx1ZSAodGhlIGFjdW11bGF0aW9uKVxuICAgKiBAcGFyYW0gb2JqXG4gICAqIEBwYXJhbSBleHByZXNzaW9uXG4gICAqIEBwYXJhbSBpbml0VmFsdWVcbiAgICovXG4gIHJlZHVjZUZhY3RvcnkoKSB7XG4gICAgY29uc3Qgc2VsZiA9IHRoaXM7XG5cbiAgICByZXR1cm4gZnVuY3Rpb24gcmVkdWNlKG9iajogQXJyYXk8YW55PiB8IE9iamVjdCwgZXhwcmVzc2lvbjogc3RyaW5nLCBpbml0VmFsdWU6IGFueSk6IEFycmF5PGFueT4gfCBPYmplY3Qge1xuXG4gICAgICBpZiAoIWV4cHJlc3Npb24gfHwgdHlwZW9mIGV4cHJlc3Npb24gIT09ICdzdHJpbmcnKSByZXR1cm4gb2JqO1xuXG4gICAgICBjb25zdCBhc3QgPSBzZWxmLl9wYXJzZXIucGFyc2UoZXhwcmVzc2lvbik7XG4gICAgICBpZiAoIWFzdCkgcmV0dXJuIGluaXRWYWx1ZTtcblxuICAgICAgaWYgKEFycmF5LmlzQXJyYXkob2JqKSkge1xuICAgICAgICByZXR1cm4gb2JqLnJlZHVjZShcbiAgICAgICAgICAocHJldiwgdmFsdWUsIGluZGV4KSA9PlxuXG4gICAgICAgICAgICBzZWxmLl9yeEV2YWwuZXZhbChhc3QsIENvbnRleHQuY3JlYXRlKHRoaXMsIHsgLy8gdHNsaW50OmRpc2FibGUtbGluZTpuby1pbnZhbGlkLXRoaXNcbiAgICAgICAgICAgICAgJG9iamVjdDogb2JqLFxuICAgICAgICAgICAgICAkcHJldjogcHJldixcbiAgICAgICAgICAgICAgJHZhbHVlOiB2YWx1ZSxcbiAgICAgICAgICAgICAgJGluZGV4OiBpbmRleFxuICAgICAgICAgICAgfSkpLCBpbml0VmFsdWUpO1xuICAgICAgfVxuICAgICAgaWYgKHR5cGVvZiBvYmogPT09ICdvYmplY3QnKSB7XG5cbiAgICAgICAgbGV0IHJlc3VsdCA9IGluaXRWYWx1ZTtcblxuICAgICAgICBmb3IgKGNvbnN0IHByb3AgaW4gb2JqKSAvLyB0c2xpbnQ6ZGlzYWJsZS1saW5lOmZvcmluXG5cbiAgICAgICAgICByZXN1bHQgPSBzZWxmLl9yeEV2YWwuZXZhbChhc3QsIENvbnRleHQuY3JlYXRlKHRoaXMsIHsgLy8gdHNsaW50OmRpc2FibGUtbGluZTpuby1pbnZhbGlkLXRoaXNcbiAgICAgICAgICAgICRwcmV2OiByZXN1bHQsXG4gICAgICAgICAgICAkdmFsdWU6IG9ialtwcm9wXSxcbiAgICAgICAgICAgICRrZXk6IHByb3BcbiAgICAgICAgICB9KSk7XG5cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgIH1cbiAgICAgIHJldHVybiBvYmo7XG4gICAgfTtcbiAgfVxufVxuXG5leHBvcnQgY29uc3QgZXhwcmVzc2lvblByb3ZpZGVyID0ge1xuICBwcm92aWRlOiBFeHByZXNzaW9ucyxcbiAgdXNlQ2xhc3M6IEVTcHJlc3Npb25cbn07XG4iLCIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxOCBBZHJpYW4gUGFuZWxsYSA8aWFuY2hpNzRAb3V0bG9vay5jb20+XG4gKlxuICogVGhpcyBzb2Z0d2FyZSBpcyByZWxlYXNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuXG4gKiBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL01JVFxuICovXG5cbmltcG9ydCB7IENvbXBvbmVudCwgVmlld0VuY2Fwc3VsYXRpb24sIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDaGFuZ2VEZXRlY3RvclJlZn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBBYnN0cmFjdFdpZGdldCB9IGZyb20gJy4vYWJzdHJhY3R3aWRnZXQnO1xuaW1wb3J0IHsgRXhwcmVzc2lvbnMgfSBmcm9tICcuL2V4cHJlc3Npb25zJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnd2RnLWRlZmF1bHQnLFxuICB0ZW1wbGF0ZTogJzxkaXY+VW5rbm93biB3aWRnZXQgXCJ7e3R5cGV9fVwiPC9kaXY+JyxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcbn0pXG5leHBvcnQgY2xhc3MgRGVmYXVsdFdpZGdldENvbXBvbmVudCBleHRlbmRzIEFic3RyYWN0V2lkZ2V0IHtcblxuICBjb25zdHJ1Y3RvcihjZHI6IENoYW5nZURldGVjdG9yUmVmLCBleHByOiBFeHByZXNzaW9ucykge1xuICAgIHN1cGVyKGNkciwgZXhwcik7XG4gIH1cbn1cbiIsIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDE4IEFkcmlhbiBQYW5lbGxhIDxpYW5jaGk3NEBvdXRsb29rLmNvbT5cbiAqXG4gKiBUaGlzIHNvZnR3YXJlIGlzIHJlbGVhc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS5cbiAqIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvTUlUXG4gKi9cblxuaW1wb3J0IHsgVHlwZSwgSW5qZWN0LCBJbmplY3Rpb25Ub2tlbiwgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQWJzdHJhY3RXaWRnZXQgfSBmcm9tICcuL2Fic3RyYWN0d2lkZ2V0JztcbmltcG9ydCB7IERlZmF1bHRXaWRnZXRDb21wb25lbnQgfSBmcm9tICcuL2RlZmF1bHR3aWRnZXQuY29tcG9uZW50JztcblxuZXhwb3J0IGNvbnN0IEFGX0NPTkZJR19UT0tFTiA9IG5ldyBJbmplY3Rpb25Ub2tlbjxJQXV0b0Zvcm1Db25maWc+KCdBRl9DT05GSUdfVE9LRU4nKTtcblxuXG5leHBvcnQgaW50ZXJmYWNlIElXaWRnZXRDb25mIHtcbiAgdHlwZTogc3RyaW5nO1xuICBjb21wb25lbnQ6IFR5cGU8QWJzdHJhY3RXaWRnZXQ+O1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIElBdXRvRm9ybUNvbmZpZyB7XG4gIHdpZGdldHM/OiBJV2lkZ2V0Q29uZltdIHwgSVdpZGdldENvbmY7XG59XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIFdpZGdldFJlZ2lzdHJ5IHtcblxuICBwcml2YXRlIF9yZWdpc3RyeSA9IG5ldyBNYXA8c3RyaW5nLCBUeXBlPEFic3RyYWN0V2lkZ2V0Pj4oKTtcblxuICBwcml2YXRlIF9kZWZhdWx0OiBUeXBlPEFic3RyYWN0V2lkZ2V0PjtcblxuXG4gIGNvbnN0cnVjdG9yKEBJbmplY3QoQUZfQ09ORklHX1RPS0VOKSBjb25maWdzOiBJQXV0b0Zvcm1Db25maWdbXSA9IFtdKSB7XG5cbiAgICBjb25maWdzLmZvckVhY2goY29uZiA9PiBjb25mLndpZGdldHMgJiYgdGhpcy5yZWdpc3Rlcihjb25mLndpZGdldHMpKTtcblxuICAgIHRoaXMuX2RlZmF1bHQgPSB0aGlzLl9yZWdpc3RyeS5nZXQoJ2RlZmF1bHQnKSB8fCBEZWZhdWx0V2lkZ2V0Q29tcG9uZW50O1xuICB9XG5cbiAgcmVnaXN0ZXIod2lkZ2V0czogSVdpZGdldENvbmZbXSB8IElXaWRnZXRDb25mKSB7XG4gICAgaWYgKCF3aWRnZXRzKSByZXR1cm47XG4gICAgaWYgKCFBcnJheS5pc0FycmF5KHdpZGdldHMpKSB3aWRnZXRzID0gW3dpZGdldHNdO1xuXG4gICAgd2lkZ2V0cy5mb3JFYWNoKHdpZGdldCA9PiB7XG4gICAgICBpZiAod2lkZ2V0LnR5cGUgJiYgd2lkZ2V0LmNvbXBvbmVudCkgdGhpcy5fcmVnaXN0cnkuc2V0KHdpZGdldC50eXBlLCB3aWRnZXQuY29tcG9uZW50KTtcbiAgICB9KTtcbiAgfVxuXG5cblxuXG4gIGdldCh0eXBlOiBzdHJpbmcpOiBUeXBlPEFic3RyYWN0V2lkZ2V0PiB7XG4gICAgcmV0dXJuIHRoaXMuX3JlZ2lzdHJ5LmdldCh0eXBlKSB8fCB0aGlzLl9kZWZhdWx0O1xuICB9XG5cbn1cbiIsImltcG9ydCB7XG4gIERpcmVjdGl2ZSwgSW5wdXQsXG4gIFZpZXdDb250YWluZXJSZWYsXG4gIENvbXBvbmVudEZhY3RvcnlSZXNvbHZlciwgQ29tcG9uZW50UmVmLFxuICBPbkNoYW5nZXMsIE9uRGVzdHJveSwgT3B0aW9uYWwsIEluamVjdCwgSW5qZWN0aW9uVG9rZW4sXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgV2lkZ2V0UmVnaXN0cnkgfSBmcm9tICcuL3dpZGdldHJlZ2lzdHJ5LnNlcnZpY2UnO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBBYnN0cmFjdFdpZGdldCwgcGFyc2VEZWZPYmplY3QgfSBmcm9tICcuL2Fic3RyYWN0d2lkZ2V0JztcbmltcG9ydCB7IElXaWRnZXREZWYgfSBmcm9tICcuL3dpZGdldC5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgQ29udGV4dCB9IGZyb20gJy4vY29udGV4dCc7XG5pbXBvcnQgeyBFeHByZXNzaW9ucyB9IGZyb20gJy4vZXhwcmVzc2lvbnMnO1xuXG4vKiogSW5qZWN0aW9uIHRva2VuIHVzZWQgdG8gcHJvdmlkZSB0aGUgZGVmYXVsdCByb290IGNvbnRleHQgZm9yIHdpZGdldHMgKi9cbmV4cG9ydCBjb25zdCBST09UX0NPTlRFWFQgPSBuZXcgSW5qZWN0aW9uVG9rZW48Q29udGV4dD4oJ1dpZGdldHMgUm9vdCBDb250ZXh0Jyk7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1t3ZGdXaWRnZXRdJ1xufSlcbmV4cG9ydCBjbGFzcyBXaWRnZXREaXJlY3RpdmUgaW1wbGVtZW50cyBPbkNoYW5nZXMsIE9uRGVzdHJveSB7XG5cbiAgQElucHV0KCkgd2RnV2lkZ2V0OiBJV2lkZ2V0RGVmO1xuICBASW5wdXQoKSBwYXJlbnRDb250ZXh0OiBDb250ZXh0O1xuXG4gIHdpZGdldDogQWJzdHJhY3RXaWRnZXQ7XG4gIGNvbnRleHQ6IENvbnRleHQ7XG4gIHByaXZhdGUgX3dpZGdldFJlZjogQ29tcG9uZW50UmVmPEFic3RyYWN0V2lkZ2V0PjtcbiAgcHJpdmF0ZSBfaWZTdWJzOiBTdWJzY3JpcHRpb247XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBfY29udGFpbmVyOiBWaWV3Q29udGFpbmVyUmVmLFxuICAgIHByaXZhdGUgX3JlZ2lzdHJ5OiBXaWRnZXRSZWdpc3RyeSxcbiAgICBwcml2YXRlIF9jZnI6IENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcixcbiAgICBAT3B0aW9uYWwoKSBASW5qZWN0KFJPT1RfQ09OVEVYVCkgcHJpdmF0ZSBfcm9vdENvbnRleHQ6IENvbnRleHQsXG4gICAgcHJpdmF0ZSBfZXhwcjogRXhwcmVzc2lvbnNcbiAgKSB7XG4gIH1cblxuICBuZ09uQ2hhbmdlcygpIHtcblxuICAgIHRoaXMuX3ByZUNyZWF0ZSgpO1xuXG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLl9kZXN0cm95KCk7XG4gICAgdGhpcy5fdW5zdXNjcmliZSgpO1xuICB9XG5cbiAgcHJpdmF0ZSBfcHJlQ3JlYXRlKCkge1xuICAgIHRoaXMud2RnV2lkZ2V0ID0gdGhpcy53ZGdXaWRnZXQgfHwgeyB0eXBlOiAnbm9uZScgfTtcbiAgICB0aGlzLnBhcmVudENvbnRleHQgPSB0aGlzLnBhcmVudENvbnRleHQgfHwgdGhpcy5fcm9vdENvbnRleHQ7XG4gICAgdGhpcy5jb250ZXh0ID0gQ29udGV4dC5jcmVhdGUodGhpcy5wYXJlbnRDb250ZXh0LCBwYXJzZURlZk9iamVjdCh0aGlzLndkZ1dpZGdldC5jb250ZXh0LCB0aGlzLnBhcmVudENvbnRleHQsIGZhbHNlLCB0aGlzLl9leHByKSk7XG5cbiAgICB0aGlzLl9kZXN0cm95KCk7XG4gICAgdGhpcy5fdW5zdXNjcmliZSgpO1xuXG4gICAgaWYgKHRoaXMud2RnV2lkZ2V0LmlmKSB7XG4gICAgICB0aGlzLl9pZlN1YnMgPSB0aGlzLl9leHByLmV2YWwodGhpcy53ZGdXaWRnZXQuaWYsIHRoaXMuY29udGV4dCwgdHJ1ZSkuc3Vic2NyaWJlKGNvbmQgPT4ge1xuICAgICAgICBpZiAoY29uZCAmJiAhdGhpcy5fd2lkZ2V0UmVmKSB0aGlzLl9jcmVhdGUoKTtcbiAgICAgICAgZWxzZSB0aGlzLl9kZXN0cm95KCk7XG4gICAgICB9KTtcbiAgICB9IGVsc2UgdGhpcy5fY3JlYXRlKCk7XG5cblxuICB9XG5cbiAgcHJpdmF0ZSBfY3JlYXRlKCkge1xuXG4gICAgY29uc3Qgd2lkZ2V0Q2xhc3MgPSB0aGlzLl9yZWdpc3RyeS5nZXQodGhpcy53ZGdXaWRnZXQudHlwZSk7XG4gICAgY29uc3QgZmFjdG9yeSA9IHRoaXMuX2Nmci5yZXNvbHZlQ29tcG9uZW50RmFjdG9yeSh3aWRnZXRDbGFzcyk7XG4gICAgdGhpcy5fd2lkZ2V0UmVmID0gdGhpcy5fY29udGFpbmVyLmNyZWF0ZUNvbXBvbmVudChmYWN0b3J5KTtcbiAgICB0aGlzLndpZGdldCA9IHRoaXMuX3dpZGdldFJlZi5pbnN0YW5jZTtcblxuICAgIHRoaXMud2lkZ2V0LnNldHVwKHRoaXMsIHRoaXMud2RnV2lkZ2V0LCB0aGlzLmNvbnRleHQpO1xuXG4gIH1cblxuICBwcml2YXRlIF9kZXN0cm95KCkge1xuICAgIGlmICh0aGlzLl93aWRnZXRSZWYpIHtcbiAgICAgIHRoaXMuX3dpZGdldFJlZi5kZXN0cm95KCk7XG4gICAgICB0aGlzLl93aWRnZXRSZWYgPSBudWxsO1xuICAgIH1cblxuICB9XG5cbiAgcHJpdmF0ZSBfdW5zdXNjcmliZSgpIHtcblxuICAgIGlmICh0aGlzLl9pZlN1YnMpIHtcbiAgICAgIHRoaXMuX2lmU3Vicy51bnN1YnNjcmliZSgpO1xuICAgICAgdGhpcy5faWZTdWJzID0gbnVsbDtcbiAgICB9XG4gIH1cbn1cbiIsIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDE4IEFkcmlhbiBQYW5lbGxhIDxpYW5jaGk3NEBvdXRsb29rLmNvbT5cbiAqXG4gKiBUaGlzIHNvZnR3YXJlIGlzIHJlbGVhc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS5cbiAqIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvTUlUXG4gKi9cblxuaW1wb3J0IHsgZm9ybWF0TnVtYmVyLCBmb3JtYXREYXRlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IFBpcGUsIFBpcGVUcmFuc2Zvcm0gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuLyoqIEFuZ3VsYXIgUGlwZSB0byBmb3JtYXQgdGV4dCAqL1xuQFBpcGUoe1xuICBuYW1lOiAnZm9ybWF0JyxcbiAgcHVyZTogdHJ1ZVxufSlcbmV4cG9ydCBjbGFzcyBGb3JtYXRQaXBlIGltcGxlbWVudHMgUGlwZVRyYW5zZm9ybSB7XG4gIHRyYW5zZm9ybSh2YWx1ZTogYW55LCBmb3JtYXQ6IGFueSkge1xuICAgIHJldHVybiBmb3JtYXQgPyBmb3JtYXRWYWx1ZSh2YWx1ZSwgZm9ybWF0KSA6IHZhbHVlO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBmb3JtYXRWYWx1ZSh2YWx1ZTogYW55LCBmb3JtYXQ6IHN0cmluZykge1xuICBpZiAodHlwZW9mIGZvcm1hdCAhPT0gJ3N0cmluZycgfHwgdmFsdWUgPT0gbnVsbCkgcmV0dXJuIHZhbHVlO1xuICBjb25zdCByZSA9IC9eXFxzKihcXHcrKVxccyooOihbXCInXSkoW15cIiddKilcXDMpPyQvO1xuXG4gIGNvbnN0IG1hdGNoOiBSZWdFeHBFeGVjQXJyYXkgPSByZS5leGVjKGZvcm1hdCk7XG5cbiAgaWYgKCFtYXRjaFswXSkgcmV0dXJuIHZhbHVlO1xuXG4gIHN3aXRjaCAobWF0Y2hbMV0udG9VcHBlckNhc2UoKSkge1xuICAgIGNhc2UgJ05VTUJFUic6XG4gICAgICBsZXQgbnVtO1xuICAgICAgbnVtID0gcGFyc2VGbG9hdCh2YWx1ZSk7XG4gICAgICByZXR1cm4gaXNOYU4obnVtKSA/IHZhbHVlIDogZm9ybWF0TnVtYmVyKG51bSwgJ2VuLVVTJywgbWF0Y2hbNF0pO1xuICAgIGNhc2UgJ0RBVEUnOlxuICAgICAgcmV0dXJuIGZvcm1hdERhdGUodmFsdWUsIG1hdGNoWzRdLCAnZW4tVVMnKTtcbiAgfVxuXG4gIHJldHVybiB2YWx1ZTtcbn1cbiIsIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDE4IEFkcmlhbiBQYW5lbGxhIDxpYW5jaGk3NEBvdXRsb29rLmNvbT5cbiAqXG4gKiBUaGlzIHNvZnR3YXJlIGlzIHJlbGVhc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS5cbiAqIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvTUlUXG4gKi9cblxuaW1wb3J0IHsgQ29tcG9uZW50LCBWaWV3RW5jYXBzdWxhdGlvbiwgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQWN0aXZhdGVkUm91dGUgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgSVdpZGdldERlZiB9IGZyb20gJy4vd2lkZ2V0LmludGVyZmFjZSc7XG5pbXBvcnQgeyBDb250ZXh0IH0gZnJvbSAnLi9jb250ZXh0JztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnd2RnLXdpZGdldCcsXG4gIHRlbXBsYXRlOiAnPG5nLWNvbnRhaW5lciBbd2RnV2lkZ2V0XT1cIndpZGdldERlZlwiIFtwYXJlbnRDb250ZXh0XT1cInBhcmVudENvbnRleHRcIj48L25nLWNvbnRhaW5lcj4nLFxuXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXG59KVxuZXhwb3J0IGNsYXNzIFJvdXRlZFdpZGdldENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgd2lkZ2V0RGVmOiBJV2lkZ2V0RGVmO1xuICBwYXJlbnRDb250ZXh0OiBDb250ZXh0O1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX3JvdXRlOiBBY3RpdmF0ZWRSb3V0ZSkgeyB9XG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMud2lkZ2V0RGVmID0gdGhpcy5fcm91dGUuc25hcHNob3QuZGF0YS53aWRnZXREZWYgfHwgeyB0eXBlOiAnZW1wdHknIH07XG4gICAgdGhpcy5wYXJlbnRDb250ZXh0ID0gdGhpcy5fcm91dGUuc25hcHNob3QuZGF0YS5wYXJlbnRDb250ZXh0O1xuICB9XG5cbn1cbiIsIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDE4IEFkcmlhbiBQYW5lbGxhIDxpYW5jaGk3NEBvdXRsb29rLmNvbT5cbiAqXG4gKiBUaGlzIHNvZnR3YXJlIGlzIHJlbGVhc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS5cbiAqIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvTUlUXG4gKi9cblxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE5nTW9kdWxlLCBNb2R1bGVXaXRoUHJvdmlkZXJzLCBBTkFMWVpFX0ZPUl9FTlRSWV9DT01QT05FTlRTIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IERlZmF1bHRXaWRnZXRDb21wb25lbnQgfSBmcm9tICcuL2RlZmF1bHR3aWRnZXQuY29tcG9uZW50JztcbmltcG9ydCB7IEFGX0NPTkZJR19UT0tFTiwgSUF1dG9Gb3JtQ29uZmlnIH0gZnJvbSAnLi93aWRnZXRyZWdpc3RyeS5zZXJ2aWNlJztcbmltcG9ydCB7IFdpZGdldERpcmVjdGl2ZSB9IGZyb20gJy4vd2lkZ2V0LmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBGb3JtYXRQaXBlIH0gZnJvbSAnLi9mb3JtYXQnO1xuaW1wb3J0IHsgUm91dGVkV2lkZ2V0Q29tcG9uZW50IH0gZnJvbSAnLi9yb3V0ZWR3aWRnZXQuY29tcG9uZW50JztcblxuXG5ATmdNb2R1bGUoe1xuXG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGVdLFxuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBXaWRnZXREaXJlY3RpdmUsXG4gICAgUm91dGVkV2lkZ2V0Q29tcG9uZW50LFxuICAgIERlZmF1bHRXaWRnZXRDb21wb25lbnQsXG4gICAgRm9ybWF0UGlwZVxuICBdLFxuICBlbnRyeUNvbXBvbmVudHM6IFtEZWZhdWx0V2lkZ2V0Q29tcG9uZW50XSxcbiAgZXhwb3J0czogW1xuICAgIFdpZGdldERpcmVjdGl2ZSxcbiAgICBSb3V0ZWRXaWRnZXRDb21wb25lbnQsXG4gICAgRm9ybWF0UGlwZVxuICBdXG59KVxuZXhwb3J0IGNsYXNzIFdpZGdldHNDb3JlTW9kdWxlIHtcblxuICBzdGF0aWMgZm9yUm9vdChjb25maWc6IElBdXRvRm9ybUNvbmZpZyA9IHt9KTogTW9kdWxlV2l0aFByb3ZpZGVycyB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5nTW9kdWxlOiBXaWRnZXRzQ29yZU1vZHVsZSxcbiAgICAgIHByb3ZpZGVyczogW1xuICAgICAgICB7IHByb3ZpZGU6IEFGX0NPTkZJR19UT0tFTiwgdXNlVmFsdWU6IGNvbmZpZywgbXVsdGk6IHRydWUgfSxcbiAgICAgICAgeyBwcm92aWRlOiBBTkFMWVpFX0ZPUl9FTlRSWV9DT01QT05FTlRTLCB1c2VWYWx1ZTogY29uZmlnLCBtdWx0aTogdHJ1ZSB9XG4gICAgICBdXG4gICAgfTtcbiAgfVxufVxuXG5cbiIsIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDE4IEFkcmlhbiBQYW5lbGxhIDxpYW5jaGk3NEBvdXRsb29rLmNvbT5cbiAqXG4gKiBUaGlzIHNvZnR3YXJlIGlzIHJlbGVhc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS5cbiAqIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvTUlUXG4gKi9cblxuaW1wb3J0IHsgRm9ybUNvbnRyb2wsIEZvcm1Hcm91cCwgRm9ybUFycmF5LCBBYnN0cmFjdENvbnRyb2wgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBDaGFuZ2VEZXRlY3RvclJlZn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBHRVRfT0JTRVJWQUJMRSwgaXNSZWFjdGl2ZSwgSU5vZGUgfSBmcm9tICdlc3ByZXNzaW9uJztcbmltcG9ydCB7IHRha2UsIG1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IEFic3RyYWN0V2lkZ2V0IH0gZnJvbSAnLi9hYnN0cmFjdHdpZGdldCc7XG5pbXBvcnQgeyBDb250ZXh0IH0gZnJvbSAnLi9jb250ZXh0JztcbmltcG9ydCB7IEV4cHJlc3Npb25zIH0gZnJvbSAnLi9leHByZXNzaW9ucyc7XG5pbXBvcnQgeyBJV2lkZ2V0RGVmIH0gZnJvbSAnLi93aWRnZXQuaW50ZXJmYWNlJztcblxuXG5leHBvcnQgY29uc3QgRk9STV9DT05UUk9MID0gU3ltYm9sKCdGb3JtQ29udHJvbCcpO1xuZXhwb3J0IGNsYXNzIEFic3RyYWN0Rm9ybUZpZWxkV2lkZ2V0IGV4dGVuZHMgQWJzdHJhY3RXaWRnZXQge1xuXG5cbiAgZm9ybUNvbnRyb2w6IEZvcm1Db250cm9sO1xuXG4gIHZhbGlkYXRlOiBJTm9kZTtcbiAgdmFsaWRhdGVDb250ZXh0OiBDb250ZXh0O1xuICBjb25zdHJ1Y3RvcihjZHI6IENoYW5nZURldGVjdG9yUmVmLCBleHByOiBFeHByZXNzaW9ucykge1xuICAgIHN1cGVyKGNkciwgZXhwcik7XG4gIH1cbiAgZHluT25TZXR1cChkZWY6IElXaWRnZXREZWYpOiBJV2lkZ2V0RGVmIHtcblxuICAgIC8vIGdldCBib3VuZCBtb2RlbFxuICAgIGlmICghZGVmLmJpbmQpXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0Zvcm0gZmllbGQgd2lkZ2V0cyBtdXN0IGhhdmUgYSBcImJpbmRcIiBwcm9wZXJ0eSBkZWZpbmVkJyk7XG5cbiAgICBjb25zdCBsdmFsdWUgPSB0aGlzLl9leHByLmx2YWx1ZShkZWYuYmluZCwgdGhpcy5jb250ZXh0KTtcblxuICAgIGlmICghbHZhbHVlKVxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdGb3JtIGZpZWxkIFwiYmluZFwiIHByb3BlcnR5IG11c3QgYmUgYW4gaWRlbnRpZmllciBvciBtZW1iZXIgZXhwcmVzc2lvbicpO1xuXG4gICAgaWYgKCFpc1JlYWN0aXZlKGx2YWx1ZS5vKSlcbiAgICAgIHRocm93IG5ldyBFcnJvcignQm91bmQgS2V5IG11c3QgYmUgb2YgUmVhY3RpdmUgVHlwZScpO1xuXG5cbiAgICAvLyBzZXR1cCB2YWxpZGF0aW9uXG5cblxuICAgIGlmIChkZWYudmFsaWRhdGUgJiYgKHRoaXMudmFsaWRhdGUgPSB0aGlzLl9leHByLnBhcnNlKGRlZi52YWxpZGF0ZSkpKSB7Ly8gdHNsaW50OmRpc2FibGUtbGluZTp3aGl0ZXNwYWNlXG4gICAgICB0aGlzLnZhbGlkYXRlQ29udGV4dCA9IENvbnRleHQuY3JlYXRlKHRoaXMuY29udGV4dCk7XG5cbiAgICAgIHRoaXMuZm9ybUNvbnRyb2wgPSBuZXcgRm9ybUNvbnRyb2wobnVsbCwgbnVsbCwgKGN0cmw6IEFic3RyYWN0Q29udHJvbCkgPT4ge1xuICAgICAgICB0aGlzLnZhbGlkYXRlQ29udGV4dFsnJHZhbHVlJ10gPSBjdHJsLnZhbHVlO1xuICAgICAgICByZXR1cm4gdGhpcy5fZXhwci5ldmFsdWF0ZSh0aGlzLnZhbGlkYXRlLCB0aGlzLnZhbGlkYXRlQ29udGV4dCwgdHJ1ZSkucGlwZShcbiAgICAgICAgICB0YWtlKDEpLFxuICAgICAgICAgIG1hcChyZXMgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHJlcyA/IG51bGwgOiB7IHZhbGlkYXRlOiAndmFsaWRhdGlvbiBlcnJvcicgfTtcbiAgICAgICAgICB9KVxuICAgICAgICApO1xuICAgICAgfSk7XG4gICAgfSBlbHNlIHRoaXMuZm9ybUNvbnRyb2wgPSBuZXcgRm9ybUNvbnRyb2woKTtcblxuICAgIGNvbnN0IHBhcmVudEZvcm06IEZvcm1Hcm91cCB8IEZvcm1BcnJheSA9IHRoaXMuY29udGV4dFtGT1JNX0NPTlRST0xdO1xuICAgIGlmIChwYXJlbnRGb3JtKSB7XG4gICAgICBpZiAocGFyZW50Rm9ybSBpbnN0YW5jZW9mIEZvcm1Hcm91cCkgcGFyZW50Rm9ybS5hZGRDb250cm9sKGx2YWx1ZS5tLCB0aGlzLmZvcm1Db250cm9sKTtcbiAgICAgIGVsc2UgaWYgKHBhcmVudEZvcm0gaW5zdGFuY2VvZiBGb3JtQXJyYXkpIHBhcmVudEZvcm0ucHVzaCh0aGlzLmZvcm1Db250cm9sKTtcbiAgICB9XG5cbiAgICAvLyBsaXN0ZW4gdG8gYm91bmQgY29udGV4dCB2YWx1ZSBhbmQgdXBkYXRlIG9uIGNoYW5nZXNcbiAgICB0aGlzLmFkZFN1YnNjcmlwdGlvbiA9IGx2YWx1ZS5vW0dFVF9PQlNFUlZBQkxFXShsdmFsdWUubSkuc3Vic2NyaWJlKHZhbCA9PlxuICAgICAgdmFsICE9PSB0aGlzLmZvcm1Db250cm9sLnZhbHVlICYmIHRoaXMuZm9ybUNvbnRyb2wuc2V0VmFsdWUodmFsKSk7XG5cbiAgICAvLyBsaXN0ZW4gdG8gY29udHJvbCBjaGFuZ2VzIHRvIHVwZGF0ZSBib3VuZCBjb250ZXh0IHZhbHVlXG4gICAgdGhpcy5hZGRTdWJzY3JpcHRpb24gPSB0aGlzLmZvcm1Db250cm9sLnZhbHVlQ2hhbmdlcy5zdWJzY3JpYmUodmFsID0+IHtcbiAgICAgIGlmICh2YWwgIT09IGx2YWx1ZS5vW2x2YWx1ZS5tXSlcbiAgICAgICAgbHZhbHVlLm9bbHZhbHVlLm1dID0gdmFsO1xuICAgIH0pO1xuXG5cbiAgICByZXR1cm4gZGVmO1xuICB9XG59XG4iLCIvKiFcbiAqIENvcHlyaWdodCAoYykgMjAxNyBBZHJpYW4gUGFuZWxsYSA8aWFuY2hpNzRAb3V0bG9vay5jb20+LCBjb250cmlidXRvcnMuXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UuXG4gKi9cblxuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBSZWFjdGl2ZUZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuXG5pbXBvcnQgeyBNYXRCdXR0b25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9idXR0b24nO1xuaW1wb3J0IHsgTWF0RGlhbG9nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvZGlhbG9nJztcbmltcG9ydCB7IE1hdEljb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9pY29uJztcbmltcG9ydCB7IE1hdElucHV0TW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvaW5wdXQnO1xuaW1wb3J0IHsgTWF0TGlzdE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2xpc3QnO1xuaW1wb3J0IHsgTWF0U2lkZW5hdk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL3NpZGVuYXYnO1xuaW1wb3J0IHsgTWF0Q2FyZE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2NhcmQnO1xuaW1wb3J0IHsgTWF0VG9vbGJhck1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL3Rvb2xiYXInO1xuaW1wb3J0IHsgTWF0UHJvZ3Jlc3NCYXJNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9wcm9ncmVzcy1iYXInO1xuaW1wb3J0IHsgTWF0RXhwYW5zaW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvZXhwYW5zaW9uJztcbmltcG9ydCB7IE1hdFNlbGVjdE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL3NlbGVjdCc7XG5pbXBvcnQgeyBNYXRUYWJzTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvdGFicyc7XG5pbXBvcnQgeyBNYXRTbmFja0Jhck1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL3NuYWNrLWJhcic7XG5pbXBvcnQgeyBNYXRTbGlkZVRvZ2dsZU1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL3NsaWRlLXRvZ2dsZSc7XG5pbXBvcnQgeyBNYXRDaGlwc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2NoaXBzJztcbmltcG9ydCB7IE1hdEF1dG9jb21wbGV0ZU1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2F1dG9jb21wbGV0ZSc7XG5pbXBvcnQgeyBNYXRDaGVja2JveE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2NoZWNrYm94JztcbmltcG9ydCB7IE1hdFNsaWRlck1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL3NsaWRlcic7XG5pbXBvcnQgeyBNYXRUYWJsZU1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL3RhYmxlJztcbmltcG9ydCB7IE1hdFBhZ2luYXRvck1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL3BhZ2luYXRvcic7XG5pbXBvcnQgeyBNYXRTb3J0TW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvc29ydCc7XG5pbXBvcnQgeyBNYXRNZW51TW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvbWVudSc7XG5cbi8qKlxuICogSGVscGVyIG1vZHVsZSB0byBjZW50cmFsbHkgaW1wb3J0IGFsbCBtYXRlcmlhbCBjb21wb25lbnRzXG4gKi9cbkBOZ01vZHVsZSh7XG4gIGV4cG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgUmVhY3RpdmVGb3Jtc01vZHVsZSxcblxuICAgIE1hdEF1dG9jb21wbGV0ZU1vZHVsZSxcbiAgICBNYXRTaWRlbmF2TW9kdWxlLFxuICAgIE1hdEJ1dHRvbk1vZHVsZSxcbiAgICBNYXRJY29uTW9kdWxlLFxuICAgIE1hdExpc3RNb2R1bGUsXG4gICAgTWF0SW5wdXRNb2R1bGUsXG4gICAgTWF0RGlhbG9nTW9kdWxlLFxuICAgIE1hdFRvb2xiYXJNb2R1bGUsXG4gICAgTWF0UHJvZ3Jlc3NCYXJNb2R1bGUsXG4gICAgTWF0RXhwYW5zaW9uTW9kdWxlLFxuICAgIE1hdFNlbGVjdE1vZHVsZSxcbiAgICBNYXRUYWJzTW9kdWxlLFxuICAgIE1hdFNuYWNrQmFyTW9kdWxlLFxuICAgIE1hdFNsaWRlVG9nZ2xlTW9kdWxlLFxuICAgIE1hdENoaXBzTW9kdWxlLFxuICAgIE1hdENhcmRNb2R1bGUsXG4gICAgTWF0Q2hlY2tib3hNb2R1bGUsXG4gICAgTWF0U2xpZGVyTW9kdWxlLFxuICAgIE1hdFRhYmxlTW9kdWxlLFxuICAgIE1hdFBhZ2luYXRvck1vZHVsZSxcbiAgICBNYXRTb3J0TW9kdWxlLFxuICAgIE1hdE1lbnVNb2R1bGUsXG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgTWF0ZXJpYWxNb2R1bGUgeyB9XG4iLCIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxOCBBZHJpYW4gUGFuZWxsYSA8aWFuY2hpNzRAb3V0bG9vay5jb20+XG4gKlxuICogVGhpcyBzb2Z0d2FyZSBpcyByZWxlYXNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuXG4gKiBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL01JVFxuICovXG5cblxuaW1wb3J0IHsgQ29tcG9uZW50LCBWaWV3RW5jYXBzdWxhdGlvbiwgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENoYW5nZURldGVjdG9yUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBFeHByZXNzaW9ucywgQWJzdHJhY3RGb3JtRmllbGRXaWRnZXQgfSBmcm9tICcuLi8uLi8uLi9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnd2RnLWlucHV0JyxcbiAgdGVtcGxhdGU6IGA8bWF0LWZvcm0tZmllbGQgc3R5bGUud2lkdGg9XCIxMDAlXCI+XG5cbiAgICA8bWF0LWxhYmVsICpuZ0lmPVwidGl0bGVcIj5cbiAgICAgICAge3sgdGl0bGUgfX1cbiAgICA8L21hdC1sYWJlbD5cblxuICAgIDxpbnB1dCBtYXRJbnB1dFxuICAgICAgICAgICBuYW1lPVwiYWFhXCJcbiAgICAgICAgICAgW3R5cGVdPVwidHlwZSB8fCAndGV4dCdcIlxuICAgICAgICAgICBbZm9ybUNvbnRyb2xdPVwiZm9ybUNvbnRyb2xcIlxuICAgICAgICAgICBbcGxhY2Vob2xkZXJdPVwicGxhY2Vob2xkZXJcIlxuICAgICAgICAgICBbcmVxdWlyZWRdPVwicmVxdWlyZWRcIj5cblxuICAgIDxtYXQtZXJyb3IgW2lkXT1cIm51bGxcIj5cblxuICAgIDwvbWF0LWVycm9yPlxuXG4gICAgPG1hdC1oaW50ICpuZ0lmPVwiZGVzY3JpcHRpb25cIlxuICAgICAgICAgICAgICBbaWRdPVwibnVsbFwiPlxuICAgICAgICB7eyBkZXNjcmlwdGlvbiB9fVxuICAgIDwvbWF0LWhpbnQ+XG5cbjwvbWF0LWZvcm0tZmllbGQ+XG5gLFxuICBzdHlsZXM6IFtgYF0sXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXG59KVxuZXhwb3J0IGNsYXNzIElucHV0V2lkZ2V0Q29tcG9uZW50IGV4dGVuZHMgQWJzdHJhY3RGb3JtRmllbGRXaWRnZXQge1xuXG4gIHRpdGxlOiBzdHJpbmc7XG4gIGRlc2NyaXB0aW9uOiBzdHJpbmc7XG4gIHBsYWNlaG9sZGVyOiBzdHJpbmc7XG4gIHJlcXVpcmVkOiBib29sZWFuO1xuXG4gIGNvbnN0cnVjdG9yKGNkcjogQ2hhbmdlRGV0ZWN0b3JSZWYsIGV4cHI6IEV4cHJlc3Npb25zKSB7XG4gICAgc3VwZXIoY2RyLCBleHByKTtcbiAgfVxuXG59XG4iLCIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxOCBBZHJpYW4gUGFuZWxsYSA8aWFuY2hpNzRAb3V0bG9vay5jb20+XG4gKlxuICogVGhpcyBzb2Z0d2FyZSBpcyByZWxlYXNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuXG4gKiBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL01JVFxuICovXG5cblxuaW1wb3J0IHsgQ29tcG9uZW50LCBWaWV3RW5jYXBzdWxhdGlvbiwgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENoYW5nZURldGVjdG9yUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBFeHByZXNzaW9ucywgQWJzdHJhY3RGb3JtRmllbGRXaWRnZXQgfSBmcm9tICcuLi8uLi8uLi9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnd2RnLWNoZWNrYm94JyxcbiAgdGVtcGxhdGU6IGA8bWF0LWNoZWNrYm94IGxhYmVsUG9zaXRpb249XCJiZWZvcmVcIiBbZm9ybUNvbnRyb2xdPVwiZm9ybUNvbnRyb2xcIj5cbiAge3t0aXRsZX19XG48L21hdC1jaGVja2JveD5cbmAsXG4gIHN0eWxlczogW2BgXSxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcbn0pXG5leHBvcnQgY2xhc3MgQ2hlY2tib3hXaWRnZXRDb21wb25lbnQgZXh0ZW5kcyBBYnN0cmFjdEZvcm1GaWVsZFdpZGdldCB7XG4gIHRpdGxlOiBzdHJpbmc7XG4gIGNvbnN0cnVjdG9yKGNkcjogQ2hhbmdlRGV0ZWN0b3JSZWYsIGV4cHI6IEV4cHJlc3Npb25zKSB7XG4gICAgc3VwZXIoY2RyLCBleHByKTtcbiAgfVxuXG59XG4iLCIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxOCBBZHJpYW4gUGFuZWxsYSA8aWFuY2hpNzRAb3V0bG9vay5jb20+XG4gKlxuICogVGhpcyBzb2Z0d2FyZSBpcyByZWxlYXNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuXG4gKiBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL01JVFxuICovXG5cblxuaW1wb3J0IHsgQ29tcG9uZW50LCBWaWV3RW5jYXBzdWxhdGlvbiwgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENoYW5nZURldGVjdG9yUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBFeHByZXNzaW9ucywgQWJzdHJhY3RGb3JtRmllbGRXaWRnZXQgfSBmcm9tICcuLi8uLi8uLi9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnd2RnLXRvZ2dsZScsXG4gIHRlbXBsYXRlOiBgPG1hdC1zbGlkZS10b2dnbGUgbGFiZWxQb3NpdGlvbj1cImJlZm9yZVwiPlxuICB7eyB0aXRsZX19XG48L21hdC1zbGlkZS10b2dnbGU+XG5gLFxuICBzdHlsZXM6IFtgYF0sXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXG59KVxuZXhwb3J0IGNsYXNzIFRvZ2dsZVdpZGdldENvbXBvbmVudCBleHRlbmRzIEFic3RyYWN0Rm9ybUZpZWxkV2lkZ2V0IHtcblxuICB0aXRsZTogc3RyaW5nO1xuXG4gIGNvbnN0cnVjdG9yKGNkcjogQ2hhbmdlRGV0ZWN0b3JSZWYsIGV4cHI6IEV4cHJlc3Npb25zKSB7XG4gICAgc3VwZXIoY2RyLCBleHByKTtcbiAgfVxuXG5cbn1cbiIsIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDE4IEFkcmlhbiBQYW5lbGxhIDxpYW5jaGk3NEBvdXRsb29rLmNvbT5cbiAqXG4gKiBUaGlzIHNvZnR3YXJlIGlzIHJlbGVhc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS5cbiAqIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvTUlUXG4gKi9cblxuXG5pbXBvcnQgeyBDb21wb25lbnQsIFZpZXdFbmNhcHN1bGF0aW9uLCBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ2hhbmdlRGV0ZWN0b3JSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEV4cHJlc3Npb25zLCBBYnN0cmFjdEZvcm1GaWVsZFdpZGdldCB9IGZyb20gJy4uLy4uLy4uL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICd3ZGctc2xpZGVyJyxcbiAgdGVtcGxhdGU6IGA8c3Bhbj57e3RpdGxlfX08L3NwYW4+XG48bWF0LXNsaWRlciBbZm9ybUNvbnRyb2xdPVwiZm9ybUNvbnRyb2xcIj48L21hdC1zbGlkZXI+XG5gLFxuICBzdHlsZXM6IFtgYF0sXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXG59KVxuZXhwb3J0IGNsYXNzIFNsaWRlcldpZGdldENvbXBvbmVudCBleHRlbmRzIEFic3RyYWN0Rm9ybUZpZWxkV2lkZ2V0IHtcblxuICB0aXRsZTogc3RyaW5nO1xuXG4gIGNvbnN0cnVjdG9yKGNkcjogQ2hhbmdlRGV0ZWN0b3JSZWYsIGV4cHI6IEV4cHJlc3Npb25zKSB7XG4gICAgc3VwZXIoY2RyLCBleHByKTtcbiAgfVxuXG59XG4iLCIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxOCBBZHJpYW4gUGFuZWxsYSA8aWFuY2hpNzRAb3V0bG9vay5jb20+XG4gKlxuICogVGhpcyBzb2Z0d2FyZSBpcyByZWxlYXNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuXG4gKiBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL01JVFxuICovXG5cblxuaW1wb3J0IHsgQ29tcG9uZW50LCBWaWV3RW5jYXBzdWxhdGlvbiwgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENoYW5nZURldGVjdG9yUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IHRha2UgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBpc1JlYWN0aXZlIH0gZnJvbSAnZXNwcmVzc2lvbic7XG5pbXBvcnQgeyBBYnN0cmFjdFdpZGdldCwgRXhwcmVzc2lvbnMsIElXaWRnZXREZWYsIH0gZnJvbSAnLi4vLi4vLi4vY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3dkZy1idXR0b24nLFxuICB0ZW1wbGF0ZTogYDxidXR0b24gbWF0LWJ1dHRvbiAoY2xpY2spPVwiY2xpY2tFdmVudCgkZXZlbnQpXCI+XG4gIHt7dGl0bGV9fVxuPC9idXR0b24+XG5gLFxuICBzdHlsZXM6IFtgYF0sXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXG59KVxuZXhwb3J0IGNsYXNzIEJ1dHRvbldpZGdldENvbXBvbmVudCBleHRlbmRzIEFic3RyYWN0V2lkZ2V0IHtcblxuICB0aXRsZTogc3RyaW5nO1xuICBjbGljazogc3RyaW5nO1xuXG4gIHByaXZhdGUgX2x2YWx1ZTogeyBvLCBtIH07XG4gIHByaXZhdGUgX2NsaWNrU3ViczogU3Vic2NyaXB0aW9uO1xuICBjb25zdHJ1Y3RvcihjZHI6IENoYW5nZURldGVjdG9yUmVmLCBleHByOiBFeHByZXNzaW9ucykge1xuICAgIHN1cGVyKGNkciwgZXhwcik7XG4gIH1cblxuICBkeW5PblNldHVwKGRlZjogSVdpZGdldERlZikge1xuXG4gICAgaWYgKGRlZi5iaW5kKSB7XG5cbiAgICAgIGNvbnN0IGx2YWx1ZSA9IHRoaXMuX2V4cHIubHZhbHVlKGRlZi5iaW5kLCB0aGlzLmNvbnRleHQpO1xuXG4gICAgICBpZiAoIWx2YWx1ZSlcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdGb3JtIGZpZWxkIFwiYmluZFwiIHByb3BlcnR5IG11c3QgYmUgYW4gaWRlbnRpZmllciBvciBtZW1iZXIgZXhwcmVzc2lvbicpO1xuXG4gICAgICBpZiAoIWlzUmVhY3RpdmUobHZhbHVlLm8pKVxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0JvdW5kIEtleSBtdXN0IGJlIG9mIFJlYWN0aXZlIFR5cGUnKTtcblxuICAgICAgdGhpcy5fbHZhbHVlID0gbHZhbHVlO1xuICAgIH1cblxuICAgIHJldHVybiBkZWY7XG4gIH1cblxuICBjbGlja0V2ZW50KF9ldmVudCkge1xuXG4gICAgaWYgKHRoaXMuX2NsaWNrU3Vicykge1xuICAgICAgdGhpcy5fY2xpY2tTdWJzLnVuc3Vic2NyaWJlKCk7XG4gICAgICB0aGlzLl9jbGlja1N1YnMgPSBudWxsO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmNsaWNrKSB7XG4gICAgICB0aGlzLl9jbGlja1N1YnMgPSB0aGlzLl9leHByLmV2YWwodGhpcy5jbGljaywgdGhpcy5jb250ZXh0LCB0cnVlKS5waXBlKFxuICAgICAgICB0YWtlKDEpKS5zdWJzY3JpYmUocmVzID0+XG4gICAgICAgICAgdGhpcy5fbHZhbHVlLm9bdGhpcy5fbHZhbHVlLm1dID0gcmVzKTtcbiAgICB9XG4gIH1cbn1cbiIsIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDE4IEFkcmlhbiBQYW5lbGxhIDxpYW5jaGk3NEBvdXRsb29rLmNvbT5cbiAqXG4gKiBUaGlzIHNvZnR3YXJlIGlzIHJlbGVhc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS5cbiAqIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvTUlUXG4gKi9cblxuaW1wb3J0IHsgQ29tcG9uZW50LCBWaWV3RW5jYXBzdWxhdGlvbiwgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENoYW5nZURldGVjdG9yUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGb3JtR3JvdXAsIEZvcm1BcnJheSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IFJ4T2JqZWN0IH0gZnJvbSAnZXNwcmVzc2lvbic7XG5pbXBvcnQgeyBBYnN0cmFjdFdpZGdldCwgSVdpZGdldERlZiwgQ29udGV4dCwgRXhwcmVzc2lvbnMsIEZPUk1fQ09OVFJPTCB9IGZyb20gJy4uLy4uLy4uL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICd3ZGctZm9ybScsXG4gIHRlbXBsYXRlOiBgPG5nLWNvbnRhaW5lciAqbmdGb3I9XCJsZXQgZWxlbWVudCBvZiBjb250ZW50XCIgW3dkZ1dpZGdldF09XCJlbGVtZW50XCIgW3BhcmVudENvbnRleHRdPVwiY29udGV4dFwiPlxuXG48L25nLWNvbnRhaW5lcj5cbmAsXG4gIHN0eWxlczogW2BgXSxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcbn0pXG5leHBvcnQgY2xhc3MgRm9ybVdpZGdldENvbXBvbmVudCBleHRlbmRzIEFic3RyYWN0V2lkZ2V0IHtcblxuICBmb3JtR3JvdXA6IEZvcm1Hcm91cDtcbiAgY29uc3RydWN0b3IoY2RyOiBDaGFuZ2VEZXRlY3RvclJlZiwgZXhwcjogRXhwcmVzc2lvbnMpIHtcbiAgICBzdXBlcihjZHIsIGV4cHIpO1xuICB9XG5cbiAgZHluT25TZXR1cChkZWY6IElXaWRnZXREZWYpIHtcblxuICAgIHRoaXMuZm9ybUdyb3VwID0gbmV3IEZvcm1Hcm91cCh7fSk7XG5cbiAgICAvLyByZWdpc3RlciB3aXRoIHBhcmVudCBmb3JtLCBpZiBhbnlcbiAgICBjb25zdCBwYXJlbnRGb3JtOiBGb3JtR3JvdXAgfCBGb3JtQXJyYXkgPSB0aGlzLmNvbnRleHRbRk9STV9DT05UUk9MXTtcbiAgICBpZiAocGFyZW50Rm9ybSkge1xuICAgICAgaWYgKHBhcmVudEZvcm0gaW5zdGFuY2VvZiBGb3JtR3JvdXApIHBhcmVudEZvcm0uYWRkQ29udHJvbCgnY29udHJvbCcsIHRoaXMuZm9ybUdyb3VwKTtcbiAgICAgIGVsc2UgaWYgKHBhcmVudEZvcm0gaW5zdGFuY2VvZiBGb3JtQXJyYXkpIHBhcmVudEZvcm0ucHVzaCh0aGlzLmZvcm1Hcm91cCk7XG4gICAgfVxuXG4gICAgLy8gc2F2ZSB0aGlzIEZvcm1Hcm91cCBhcyBwYXJlbnQgZm9ybSBmb3IgdGhlIGNoaWxkcmVuXG4gICAgQ29udGV4dC5kZWZpbmVIaWRkZW4odGhpcy5jb250ZXh0LCB7IFtGT1JNX0NPTlRST0xdOiB0aGlzLmZvcm1Hcm91cCB9KTtcblxuICAgIC8vIGNyZWF0ZSBhIFN0b3JlIGZvciB0aGUgdmFyaWFibGVzXG5cbiAgICB0aGlzLmNvbnRleHRbJyRtb2RlbCddID0gUnhPYmplY3Qoe30pO1xuICAgIHJldHVybiBkZWY7XG4gIH1cblxufVxuIiwiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTggQWRyaWFuIFBhbmVsbGEgPGlhbmNoaTc0QG91dGxvb2suY29tPlxuICpcbiAqIFRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLlxuICogaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9NSVRcbiAqL1xuXG5pbXBvcnQgeyBDb21wb25lbnQsIFZpZXdFbmNhcHN1bGF0aW9uLCBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ2hhbmdlRGV0ZWN0b3JSZWYsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgbWFwLCBzdGFydFdpdGggfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBFeHByZXNzaW9ucywgQWJzdHJhY3RGb3JtRmllbGRXaWRnZXQgfSBmcm9tICcuLi8uLi8uLi9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnd2RnLWF1dG9jb21wbGV0ZScsXG4gIHRlbXBsYXRlOiBgPG1hdC1mb3JtLWZpZWxkIHN0eWxlLndpZHRoPVwiMTAwJVwiPlxuXG4gIDxtYXQtbGFiZWwgKm5nSWY9XCJ0aXRsZVwiPlxuICAgIHt7IHRpdGxlIH19XG4gIDwvbWF0LWxhYmVsPlxuXG4gIDxpbnB1dCBtYXRJbnB1dCBuYW1lPVwiYWFhXCIgW3R5cGVdPVwidHlwZSB8fCAndGV4dCdcIiBbZm9ybUNvbnRyb2xdPVwiZm9ybUNvbnRyb2xcIiBbcGxhY2Vob2xkZXJdPVwicGxhY2Vob2xkZXJcIlxuICAgIFttYXRBdXRvY29tcGxldGVdPVwiYXV0b1wiPlxuXG4gIDxtYXQtZXJyb3IgW2lkXT1cIm51bGxcIj5cblxuICA8L21hdC1lcnJvcj5cblxuICA8bWF0LWhpbnQgKm5nSWY9XCJkZXNjcmlwdGlvblwiIFtpZF09XCJudWxsXCI+XG4gICAge3sgZGVzY3JpcHRpb24gfX1cbiAgPC9tYXQtaGludD5cblxuICA8bWF0LWF1dG9jb21wbGV0ZSAjYXV0bz1cIm1hdEF1dG9jb21wbGV0ZVwiPlxuICAgIDxtYXQtb3B0aW9uICpuZ0Zvcj1cImxldCBvcHRpb24gb2YgZmlsdGVyZWRPcHRpb25zIHwgYXN5bmM7IGluZGV4IGFzIG9wdEluZGV4XCIgW3ZhbHVlXT1cIm9wdGlvblwiPlxuICAgICAge3tvcHRpb259fVxuICAgIDwvbWF0LW9wdGlvbj5cbiAgPC9tYXQtYXV0b2NvbXBsZXRlPlxuXG48L21hdC1mb3JtLWZpZWxkPlxuYCxcbiAgc3R5bGVzOiBbYGBdLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBBdXRvY29tcGxldGVXaWRnZXRDb21wb25lbnQgZXh0ZW5kcyBBYnN0cmFjdEZvcm1GaWVsZFdpZGdldCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgdGl0bGU6IHN0cmluZztcbiAgZGVzY3JpcHRpb246IHN0cmluZztcbiAgcGxhY2Vob2xkZXI6IHN0cmluZztcblxuICBlbnVtOiBzdHJpbmdbXSA9IFtdO1xuICBlbnVtTGFiZWw6IHN0cmluZ1tdO1xuICBmaWx0ZXJlZE9wdGlvbnM6IE9ic2VydmFibGU8c3RyaW5nW10+O1xuICBjb25zdHJ1Y3RvcihjZHI6IENoYW5nZURldGVjdG9yUmVmLCBleHByOiBFeHByZXNzaW9ucykge1xuICAgIHN1cGVyKGNkciwgZXhwcik7XG4gIH1cblxuXG5cbiAgZHluT25CZWZvcmVCaW5kKCkge1xuICAgIHRoaXMubWFwKCdlbnVtJywgdmFsID0+IHtcbiAgICAgIHJldHVybiBBcnJheS5pc0FycmF5KHZhbCkgPyB2YWwgOiBbXTtcbiAgICB9KTtcbiAgfVxuXG4gIGR5bk9uQWZ0ZXJCaW5kKCkge1xuICAgIHRoaXMubWFwKCdlbnVtJywgdmFsID0+ICh0aGlzLl9maWx0ZXIodGhpcy5mb3JtQ29udHJvbC52YWx1ZSksIHZhbCkpO1xuICB9XG4gIG5nT25Jbml0KCkge1xuICAgIHN1cGVyLm5nT25Jbml0KCk7XG5cbiAgICB0aGlzLmZpbHRlcmVkT3B0aW9ucyA9IHRoaXMuZm9ybUNvbnRyb2wudmFsdWVDaGFuZ2VzXG4gICAgICAucGlwZShcbiAgICAgICAgc3RhcnRXaXRoKCcnKSxcbiAgICAgICAgbWFwKHZhbHVlID0+IHRoaXMuX2ZpbHRlcih2YWx1ZSkpXG4gICAgICApO1xuICB9XG5cbiAgcHJpdmF0ZSBfZmlsdGVyKHZhbHVlOiBzdHJpbmcpOiBzdHJpbmdbXSB7XG5cbiAgICBjb25zdCBmaWx0ZXJWYWx1ZSA9IHZhbHVlICYmIHZhbHVlLnRvTG93ZXJDYXNlKCk7XG5cbiAgICByZXR1cm4gdGhpcy5lbnVtLmZpbHRlcihvcHRpb24gPT4gb3B0aW9uLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMoZmlsdGVyVmFsdWUpKTtcbiAgfVxuXG59XG4iLCIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxOCBBZHJpYW4gUGFuZWxsYSA8aWFuY2hpNzRAb3V0bG9vay5jb20+XG4gKlxuICogVGhpcyBzb2Z0d2FyZSBpcyByZWxlYXNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuXG4gKiBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL01JVFxuICovXG5cblxuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgTWF0ZXJpYWxNb2R1bGUgfSBmcm9tICcuLi9tYXRlcmlhbC5tb2R1bGUnO1xuaW1wb3J0IHsgV2lkZ2V0c0NvcmVNb2R1bGUgfSBmcm9tICcuLi8uLi9jb3JlJztcblxuaW1wb3J0IHsgSW5wdXRXaWRnZXRDb21wb25lbnQgfSBmcm9tICcuL2lucHV0L2lucHV0LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBDaGVja2JveFdpZGdldENvbXBvbmVudCB9IGZyb20gJy4vY2hlY2tib3gvY2hlY2tib3guY29tcG9uZW50JztcbmltcG9ydCB7IFRvZ2dsZVdpZGdldENvbXBvbmVudCB9IGZyb20gJy4vdG9nZ2xlL3RvZ2dsZS5jb21wb25lbnQnO1xuaW1wb3J0IHsgU2xpZGVyV2lkZ2V0Q29tcG9uZW50IH0gZnJvbSAnLi9zbGlkZXIvc2xpZGVyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBCdXR0b25XaWRnZXRDb21wb25lbnQgfSBmcm9tICcuL2J1dHRvbi9idXR0b24uY29tcG9uZW50JztcbmltcG9ydCB7IEZvcm1XaWRnZXRDb21wb25lbnQgfSBmcm9tICcuL2Zvcm0vZm9ybS5jb21wb25lbnQnO1xuaW1wb3J0IHsgQXV0b2NvbXBsZXRlV2lkZ2V0Q29tcG9uZW50IH0gZnJvbSAnLi9hdXRvY29tcGxldGUvYXV0b2NvbXBsZXRlLmNvbXBvbmVudCc7XG5cblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIE1hdGVyaWFsTW9kdWxlLFxuXG4gICAgV2lkZ2V0c0NvcmVNb2R1bGUuZm9yUm9vdCh7XG4gICAgICB3aWRnZXRzOiBbXG4gICAgICAgIHsgdHlwZTogJ2lucHV0JywgY29tcG9uZW50OiBJbnB1dFdpZGdldENvbXBvbmVudCB9LFxuICAgICAgICB7IHR5cGU6ICdjaGVja2JveCcsIGNvbXBvbmVudDogQ2hlY2tib3hXaWRnZXRDb21wb25lbnQgfSxcbiAgICAgICAgeyB0eXBlOiAndG9nZ2xlJywgY29tcG9uZW50OiBUb2dnbGVXaWRnZXRDb21wb25lbnQgfSxcbiAgICAgICAgeyB0eXBlOiAnc2xpZGVyJywgY29tcG9uZW50OiBTbGlkZXJXaWRnZXRDb21wb25lbnQgfSxcbiAgICAgICAgeyB0eXBlOiAnYnV0dG9uJywgY29tcG9uZW50OiBCdXR0b25XaWRnZXRDb21wb25lbnQgfSxcbiAgICAgICAgeyB0eXBlOiAnZm9ybScsIGNvbXBvbmVudDogRm9ybVdpZGdldENvbXBvbmVudCB9LFxuICAgICAgICB7IHR5cGU6ICdhdXRvY29tcGxldGUnLCBjb21wb25lbnQ6IEF1dG9jb21wbGV0ZVdpZGdldENvbXBvbmVudCB9LFxuXG4gICAgICBdXG4gICAgfSlcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgSW5wdXRXaWRnZXRDb21wb25lbnQsXG4gICAgQ2hlY2tib3hXaWRnZXRDb21wb25lbnQsXG4gICAgVG9nZ2xlV2lkZ2V0Q29tcG9uZW50LFxuICAgIFNsaWRlcldpZGdldENvbXBvbmVudCxcbiAgICBCdXR0b25XaWRnZXRDb21wb25lbnQsXG4gICAgRm9ybVdpZGdldENvbXBvbmVudCxcbiAgICBBdXRvY29tcGxldGVXaWRnZXRDb21wb25lbnRcbiAgXSxcbiAgZXhwb3J0czogW11cbn0pXG5leHBvcnQgY2xhc3MgRm9ybUZpZWxkV2lkZ2V0c01vZHVsZSB7IH1cbiIsIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDE4IEFkcmlhbiBQYW5lbGxhIDxpYW5jaGk3NEBvdXRsb29rLmNvbT5cbiAqXG4gKiBUaGlzIHNvZnR3YXJlIGlzIHJlbGVhc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS5cbiAqIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvTUlUXG4gKi9cblxuXG5pbXBvcnQgeyBDb21wb25lbnQsIFZpZXdFbmNhcHN1bGF0aW9uLCBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ2hhbmdlRGV0ZWN0b3JSZWZ9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQWJzdHJhY3RXaWRnZXQsIElXaWRnZXREZWYsIEV4cHJlc3Npb25zIH0gZnJvbSAnLi4vLi4vLi4vY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3dkZy1jYXJkJyxcbiAgdGVtcGxhdGU6IGA8bWF0LWNhcmQ+XG4gIDxtYXQtY2FyZC10aXRsZSAqbmdJZj1cInRpdGxlXCI+e3t0aXRsZX19PC9tYXQtY2FyZC10aXRsZT5cbiAgPG1hdC1jYXJkLXN1YnRpdGxlICpuZ0lmPVwiZGVzY3JpcHRpb25cIj57e2Rlc2NyaXB0aW9ufX08L21hdC1jYXJkLXN1YnRpdGxlPlxuICA8bWF0LWNhcmQtY29udGVudD5cbiAgICA8bmctY29udGFpbmVyICpuZ0Zvcj1cImxldCBlbGVtZW50IG9mIGNvbnRlbnRcIiBbd2RnV2lkZ2V0XT1cImVsZW1lbnRcIiBbcGFyZW50Q29udGV4dF09XCJjb250ZXh0XCI+PC9uZy1jb250YWluZXI+XG4gIDwvbWF0LWNhcmQtY29udGVudD5cbiAgPG1hdC1jYXJkLWFjdGlvbnMgYWxpZ249XCJlbmRcIiAqbmdJZj1cImFjdGlvbnNcIj5cbiAgICA8bmctY29udGFpbmVyICpuZ0Zvcj1cImxldCBlbGVtZW50IG9mIGFjdGlvbnNcIiBbd2RnV2lkZ2V0XT1cImVsZW1lbnRcIiBbcGFyZW50Q29udGV4dF09XCJjb250ZXh0XCI+PC9uZy1jb250YWluZXI+XG4gIDwvbWF0LWNhcmQtYWN0aW9ucz5cbjwvbWF0LWNhcmQ+XG5gLFxuICBzdHlsZXM6IFtgYF0sXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXG59KVxuZXhwb3J0IGNsYXNzIENhcmRXaWRnZXRDb21wb25lbnQgZXh0ZW5kcyBBYnN0cmFjdFdpZGdldCB7XG5cbiAgdGl0bGU6IHN0cmluZztcbiAgZGVzY3JpcHRpb246IHN0cmluZztcbiAgYWN0aW9uczogSVdpZGdldERlZltdO1xuXG4gIGNvbnN0cnVjdG9yKGNkcjogQ2hhbmdlRGV0ZWN0b3JSZWYsIGV4cHI6IEV4cHJlc3Npb25zKSB7XG4gICAgc3VwZXIoY2RyLCBleHByKTtcbiAgfVxuXG59XG4iLCIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxOCBBZHJpYW4gUGFuZWxsYSA8aWFuY2hpNzRAb3V0bG9vay5jb20+XG4gKlxuICogVGhpcyBzb2Z0d2FyZSBpcyByZWxlYXNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuXG4gKiBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL01JVFxuICovXG5cblxuaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIFZpZXdFbmNhcHN1bGF0aW9uLCBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ2hhbmdlRGV0ZWN0b3JSZWYsIFZpZXdDaGlsZH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBpc09ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IE1hdFRhYmxlRGF0YVNvdXJjZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL3RhYmxlJztcbmltcG9ydCB7IE1hdFBhZ2luYXRvciB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL3BhZ2luYXRvcic7XG5pbXBvcnQgeyBNYXRTb3J0IH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvc29ydCc7XG5pbXBvcnQgeyBBYnN0cmFjdFdpZGdldCwgQ29udGV4dCwgRXhwcmVzc2lvbnMsIHBhcnNlRGVmT2JqZWN0IH0gZnJvbSAnLi4vLi4vLi4vY29yZSc7XG5pbXBvcnQgeyBjb21iaW5lTWl4ZWQgfSBmcm9tICdlc3ByZXNzaW9uJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnd2RnLXRhYmxlJyxcbiAgdGVtcGxhdGU6IGA8ZGl2PlxuICA8c2VjdGlvbiBjbGFzcz1cInRhYmxlLXRpdGxlXCI+XG4gICAgPGg2Pnt7dGl0bGV9fTwvaDY+XG5cbiAgICA8ZGl2IGNsYXNzPVwic3BhY2VyXCI+PC9kaXY+XG5cbiAgICA8bWF0LWZvcm0tZmllbGQgKm5nSWY9XCJmaWx0ZXJCeVwiPlxuICAgICAgPGlucHV0IG1hdElucHV0IChrZXl1cCk9XCJhcHBseUZpbHRlcigkZXZlbnQudGFyZ2V0LnZhbHVlKVwiIHBsYWNlaG9sZGVyPVwiRmlsdGVyXCI+XG4gICAgPC9tYXQtZm9ybS1maWVsZD5cbiAgPC9zZWN0aW9uPlxuXG4gIDxzZWN0aW9uIGNsYXNzPVwibWF0LWVsZXZhdGlvbi16MVwiPlxuICAgIDx0YWJsZSBtYXQtdGFibGUgW2RhdGFTb3VyY2VdPVwidGFibGVEYXRhU291cmNlXCIgbWF0U29ydCBbbWF0U29ydERpc2FibGVkXT1cIiFkaXNhYmxlU29ydFwiPlxuXG4gICAgICA8IS0tIER5bmFtaWMgQ29sdW1uIGRlZmluaXRpb25zLS0+XG4gICAgICA8bmctY29udGFpbmVyIFttYXRDb2x1bW5EZWZdPVwiY29sS2V5XCIgKm5nRm9yPVwibGV0IGNvbEtleSBvZiBjb2xLZXlzOyBpbmRleCBhcyBjb2xJbmRleFwiPlxuICAgICAgICA8dGggbWF0LWhlYWRlci1jZWxsICptYXRIZWFkZXJDZWxsRGVmIG1hdC1zb3J0LWhlYWRlciBbZGlzYWJsZWRdPVwiZGlzYWJsZVNvcnQ/LmluZGV4T2YoY29sS2V5KSA+PSAwXCI+IHt7Y29sSGVhZGVyc1tjb2xJbmRleF0gfHwgY29sS2V5fX0gPC90aD5cbiAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cImNvbEZvcm1hdCAmJiBjb2xGb3JtYXRbY29sSW5kZXhdOyBlbHNlIG5vRm9ybWF0Q2VsbERlZlwiPlxuICAgICAgICAgIDx0ZCBtYXQtY2VsbCAqbWF0Q2VsbERlZj1cImxldCByb3dEYXRhXCI+e3tyb3dEYXRhW2NvbEtleV0gfCBmb3JtYXQ6Y29sRm9ybWF0W2NvbEluZGV4XX19PC90ZD5cbiAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgIDxuZy10ZW1wbGF0ZSAjbm9Gb3JtYXRDZWxsRGVmPlxuICAgICAgICAgIDx0ZCBtYXQtY2VsbCAqbWF0Q2VsbERlZj1cImxldCByb3dEYXRhXCI+e3tyb3dEYXRhW2NvbEtleV19fTwvdGQ+XG4gICAgICAgIDwvbmctdGVtcGxhdGU+XG4gICAgICA8L25nLWNvbnRhaW5lcj5cblxuICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cImFjdGlvbnM/Lmxlbmd0aFwiIFttYXRDb2x1bW5EZWZdPVwiJ19fYWN0aW9uc19fJ1wiPlxuICAgICAgICA8dGggbWF0LWhlYWRlci1jZWxsICptYXRIZWFkZXJDZWxsRGVmID4ge3thY3Rpb25zSGVhZGVyIHx8ICdBY3Rpb25zJ319IDwvdGg+XG4gICAgICAgIDx0ZCBtYXQtY2VsbCAqbWF0Q2VsbERlZj1cImxldCByb3dEYXRhXCI+XG4gICAgICAgICAgPGJ1dHRvbiBtYXQtaWNvbi1idXR0b24gW21hdE1lbnVUcmlnZ2VyRm9yXT1cIm1lbnVcIj5cbiAgICAgICAgICAgIDxtYXQtaWNvbiBzdmdJY29uPVwiZG90cy12ZXJ0aWNhbFwiPjwvbWF0LWljb24+XG4gICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgPG1hdC1tZW51ICNtZW51PVwibWF0TWVudVwiPlxuXG4gICAgICAgICAgICA8YnV0dG9uIG1hdC1tZW51LWl0ZW0gKm5nRm9yPVwibGV0IGFjdGlvbiBvZiBhY3Rpb25zOyBpbmRleCBhcyBhY3Rpb25JbmRleFwiIChjbGljayk9XCJhY3Rpb25DbGljayhyb3dEYXRhLCBhY3Rpb25JbmRleClcIj5cbiAgICAgICAgICAgICAgPG1hdC1pY29uIFtzdmdJY29uXT1cImFjdGlvbnNbYWN0aW9uSW5kZXhdLmljb25cIj48L21hdC1pY29uPlxuICAgICAgICAgICAgICA8c3Bhbj57e2FjdGlvbnNbYWN0aW9uSW5kZXhdLmxhYmVsfX08L3NwYW4+XG4gICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICA8L21hdC1tZW51PlxuICAgICAgICA8L3RkPlxuICAgICAgPC9uZy1jb250YWluZXI+XG5cblxuICAgICAgPCEtLSBSb3cgZGVmaW5pdGlvbnMtLT5cbiAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJjb2xIZWFkZXJzXCI+XG4gICAgICAgIDx0ciBtYXQtaGVhZGVyLXJvdyAqbWF0SGVhZGVyUm93RGVmPVwic2hvd0NvbHNcIiBjbGFzcz1cImhlYWRlci1yb3dcIj48L3RyPlxuICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICA8dHIgbWF0LXJvdyAqbWF0Um93RGVmPVwibGV0IGVsZW1lbnQ7IGNvbHVtbnM6IHNob3dDb2xzO1wiIGNsYXNzPVwiZGF0YS1yb3dcIj48L3RyPlxuICAgIDwvdGFibGU+XG5cbiAgICA8bWF0LXBhZ2luYXRvciBbY2xhc3MuaGlkZGVuUGFnaW5hdG9yXT1cIiFwYWdlU2l6ZXNcIiBbcGFnZVNpemVPcHRpb25zXT1cInBhZ2VTaXplc1wiIFtoaWRlUGFnZVNpemVdPVwicGFnZVNpemVzPy5sZW5ndGg8PTFcIj48L21hdC1wYWdpbmF0b3I+XG4gIDwvc2VjdGlvbj5cbjwvZGl2PlxuYCxcbiAgc3R5bGVzOiBbYGR5bi10YWJsZSB0YWJsZXt3aWR0aDoxMDAlfWR5bi10YWJsZSB0ci5kYXRhLXJvdzpob3ZlcntiYWNrZ3JvdW5kOiNmNWY1ZjV9ZHluLXRhYmxlIHRyLmRhdGEtcm93OmFjdGl2ZXtiYWNrZ3JvdW5kOiNlZmVmZWZ9ZHluLXRhYmxlIC5kYXRhLXJvdyB0ZHtib3JkZXItYm90dG9tLXdpZHRoOjB9ZHluLXRhYmxlIG1hdC1wYWdpbmF0b3IuaGlkZGVuUGFnaW5hdG9ye2Rpc3BsYXk6bm9uZX1keW4tdGFibGUgLnRhYmxlLXRpdGxle2Rpc3BsYXk6ZmxleDtmbGV4LWZsb3c6cm93fWR5bi10YWJsZSAudGFibGUtdGl0bGU+KntmbGV4OjAgMCBhdXRvfWR5bi10YWJsZSAudGFibGUtdGl0bGUgLnNwYWNlcntmbGV4OjEgMSBhdXRvfWBdLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBUYWJsZVdpZGdldENvbXBvbmVudCBleHRlbmRzIEFic3RyYWN0V2lkZ2V0IGltcGxlbWVudHMgT25Jbml0IHtcblxuICB0aXRsZTogc3RyaW5nO1xuICBkYXRhU291cmNlOiBPYnNlcnZhYmxlPGFueVtdPiB8IGFueVtdO1xuICB0YWJsZURhdGFTb3VyY2U6IE1hdFRhYmxlRGF0YVNvdXJjZTx7IFtwcm9wOiBzdHJpbmddOiBhbnkgfT47XG5cbiAgY29sS2V5czogc3RyaW5nW107XG4gIGNvbEhlYWRlcnM6IHN0cmluZ1tdO1xuICBjb2xzVmlzaWJsZTogc3RyaW5nW107XG4gIHBhZ2VTaXplczogbnVtYmVyW107XG4gIGZpbHRlckJ5OiBzdHJpbmdbXTtcbiAgZGlzYWJsZVNvcnQ6IHN0cmluZ1tdID0gW107XG5cbiAgY29sVHJhbnNmb3JtOiBzdHJpbmdbXTtcbiAgY29sRm9ybWF0OiBzdHJpbmdbXTtcblxuICBhY3Rpb25zOiB7IGljb246IHN0cmluZywgbGFiZWw6IHN0cmluZywgYWN0aW9uOiBzdHJpbmcgfVtdID0gW107XG4gIGFjdGlvbnNIZWFkZXI6IHN0cmluZztcbiAgc2hvd0NvbHM6IHN0cmluZ1tdO1xuXG4gIEBWaWV3Q2hpbGQoTWF0UGFnaW5hdG9yKSBwYWdpbmF0b3I6IE1hdFBhZ2luYXRvcjtcbiAgQFZpZXdDaGlsZChNYXRTb3J0KSBzb3J0OiBNYXRTb3J0O1xuXG4gIGNvbnN0cnVjdG9yKGNkcjogQ2hhbmdlRGV0ZWN0b3JSZWYsIGV4cHI6IEV4cHJlc3Npb25zKSB7XG4gICAgc3VwZXIoY2RyLCBleHByKTtcbiAgICB0aGlzLnRhYmxlRGF0YVNvdXJjZSA9IG5ldyBNYXRUYWJsZURhdGFTb3VyY2UoKTtcbiAgfVxuXG4gIGR5bk9uQmVmb3JlQmluZCgpIHtcblxuICAgIGNvbnN0IG9wdCA9IHRoaXMud2lkZ2V0RGVmLm9wdGlvbnM7XG5cblxuICAgIC8vIGlmIHRoZSBvbmx5IHNvdXJjZSBpcyBhIHN0YXRpYyBhcnJheSwgbGV0cyBjaGVjayBpZiBpdCBoYXMgJ3Byb3BlcnR5PScgY29sdW1ucyB0byBldmFsdWF0ZVxuICAgIC8vIGFuZCBhZGQgdGhlIGF1dG8gYmluZGluZ1xuICAgIGlmIChvcHQgJiYgIW9wdFsnZGF0YVNvdXJjZT0nXSAmJlxuICAgICAgQXJyYXkuaXNBcnJheShvcHQuZGF0YVNvdXJjZSkpIHtcblxuICAgICAgY29uc3QgZGF0YVNvdXJjZSA9IDxPYnNlcnZhYmxlPGFueVtdPj5jb21iaW5lTWl4ZWQob3B0LmRhdGFTb3VyY2UubWFwKHJvdyA9PlxuICAgICAgICBjb21iaW5lTWl4ZWQocGFyc2VEZWZPYmplY3Qocm93LCB0aGlzLmNvbnRleHQsIGZhbHNlLCB0aGlzLl9leHByKSksIGZhbHNlKSwgZmFsc2UpO1xuICAgICAgaWYgKGlzT2JzZXJ2YWJsZShkYXRhU291cmNlKSkgdGhpcy5iaW5kaW5ncy5kYXRhU291cmNlID0gZGF0YVNvdXJjZTtcbiAgICAgIGVsc2UgdGhpcy5kYXRhU291cmNlID0gZGF0YVNvdXJjZTtcbiAgICB9XG5cblxuICAgIHRoaXMubWFwKCdkaXNhYmxlU29ydCcsIHNvcnQgPT4ge1xuICAgICAgaWYgKHNvcnQgPT09IHRydWUpIHJldHVybiBudWxsO1xuICAgICAgaWYgKCFBcnJheS5pc0FycmF5KHNvcnQpKSByZXR1cm4gW107XG4gICAgICByZXR1cm4gc29ydDtcblxuICAgIH0pO1xuXG4gICAgdGhpcy5tYXAoJ2RhdGFTb3VyY2UnLCAodGFibGU6IGFueVtdKSA9PlxuICAgICAgdGhpcy50YWJsZURhdGFTb3VyY2UuZGF0YSA9IHRhYmxlLm1hcChyb3cgPT4ge1xuICAgICAgICByb3cgPSBwYXJzZURlZk9iamVjdChyb3csIENvbnRleHQuY3JlYXRlKHRoaXMuY29udGV4dCwgeyAkZGF0YTogcm93IH0pLCBmYWxzZSwgdGhpcy5fZXhwcik7XG5cbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkodGhpcy5jb2xUcmFuc2Zvcm0pKSB7XG5cbiAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuY29sVHJhbnNmb3JtLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5jb2xUcmFuc2Zvcm1baV0pIHtcbiAgICAgICAgICAgICAgY29uc3QgY29udGV4dDogYW55ID0gQ29udGV4dC5jcmVhdGUodGhpcy5jb250ZXh0KTtcbiAgICAgICAgICAgICAgY29udGV4dC4kZGF0YSA9IHJvd1t0aGlzLmNvbEtleXNbaV1dO1xuICAgICAgICAgICAgICByb3dbdGhpcy5jb2xLZXlzW2ldXSA9IHRoaXMuX2V4cHIuZXZhbCh0aGlzLmNvbFRyYW5zZm9ybVtpXSwgY29udGV4dCwgZmFsc2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHJvdztcbiAgICAgIH0pXG4gICAgKTtcblxuICAgIHRoaXMubWFwKCdwYWdlU2l6ZXMnLCAodmFsdWUpID0+IHtcbiAgICAgIGlmICghQXJyYXkuaXNBcnJheSh2YWx1ZSkgfHwgIXZhbHVlLmxlbmd0aCkge1xuICAgICAgICB0aGlzLnRhYmxlRGF0YVNvdXJjZS5wYWdpbmF0b3IgPSBudWxsO1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH1cbiAgICAgIHRoaXMudGFibGVEYXRhU291cmNlLnBhZ2luYXRvciA9IHRoaXMucGFnaW5hdG9yO1xuICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH0pO1xuXG4gICAgdGhpcy5tYXAoJ2NvbEtleXMnLCBrZXlzID0+IHtcbiAgICAgIGlmICh0aGlzLmFjdGlvbnMgJiYgdGhpcy5hY3Rpb25zLmxlbmd0aCkgdGhpcy5zaG93Q29scyA9IGtleXMuY29uY2F0KCdfX2FjdGlvbnNfXycpO1xuICAgICAgZWxzZSB0aGlzLnNob3dDb2xzID0ga2V5cztcbiAgICAgIHJldHVybiBrZXlzO1xuICAgIH0pO1xuICAgIHRoaXMubWFwKCdhY3Rpb25zJywgYWN0aW9ucyA9PiB7XG4gICAgICBpZiAoIUFycmF5LmlzQXJyYXkoYWN0aW9ucykpIGFjdGlvbnMgPSBbXTtcblxuICAgICAgdGhpcy5zaG93Q29scyA9IGFjdGlvbnMubGVuZ3RoID8gdGhpcy5jb2xLZXlzLmNvbmNhdCgnX19hY3Rpb25zX18nKSA6IHRoaXMuY29sS2V5cztcblxuICAgICAgcmV0dXJuIGFjdGlvbnM7XG4gICAgfSk7XG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICBzdXBlci5uZ09uSW5pdCgpO1xuXG4gICAgdGhpcy50YWJsZURhdGFTb3VyY2Uuc29ydCA9IHRoaXMuc29ydDtcbiAgfVxuICBhcHBseUZpbHRlcihmaWx0ZXJWYWx1ZTogc3RyaW5nKSB7XG4gICAgdGhpcy50YWJsZURhdGFTb3VyY2UuZmlsdGVyID0gZmlsdGVyVmFsdWU7XG5cbiAgICBpZiAodGhpcy50YWJsZURhdGFTb3VyY2UucGFnaW5hdG9yKSB7XG4gICAgICB0aGlzLnRhYmxlRGF0YVNvdXJjZS5wYWdpbmF0b3IuZmlyc3RQYWdlKCk7XG4gICAgfVxuICB9XG5cbiAgYWN0aW9uQ2xpY2socm93RGF0YTogYW55LCBhY3Rpb25JbmRleDogbnVtYmVyKSB7XG5cbiAgICBjb25zdCBjb250ZXh0ID0gQ29udGV4dC5jcmVhdGUodGhpcy5jb250ZXh0LCB7ICRkYXRhOiByb3dEYXRhIH0pO1xuXG4gICAgdGhpcy5hZGRTdWJzY3JpcHRpb24gPSB0aGlzLl9leHByLmV2YWwodGhpcy5hY3Rpb25zW2FjdGlvbkluZGV4XS5hY3Rpb24sIGNvbnRleHQsIHRydWUpLnN1YnNjcmliZShcbiAgICAgICgpID0+IHtcbiAgICAgICAgLy8gVE9ETyBsb2dpYyB0byByZWxvYWQgdGFibGVcbiAgICAgIH1cbiAgICApO1xuICB9XG5cblxufVxuIiwiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTggQWRyaWFuIFBhbmVsbGEgPGlhbmNoaTc0QG91dGxvb2suY29tPlxuICpcbiAqIFRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLlxuICogaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9NSVRcbiAqL1xuXG5pbXBvcnQgeyBDb21wb25lbnQsIFZpZXdFbmNhcHN1bGF0aW9uLCBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ2hhbmdlRGV0ZWN0b3JSZWZ9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQWJzdHJhY3RXaWRnZXQsIEV4cHJlc3Npb25zIH0gZnJvbSAnLi4vLi4vLi4vY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3dkZy1jb250YWluZXInLFxuICB0ZW1wbGF0ZTogYDxuZy1jb250YWluZXIgKm5nRm9yPVwibGV0IGVsZW1lbnQgb2YgY29udGVudFwiIFt3ZGdXaWRnZXRdPVwiZWxlbWVudFwiIFtwYXJlbnRDb250ZXh0XT1cImNvbnRleHRcIj5cblxuPC9uZy1jb250YWluZXI+XG5gLFxuICBzdHlsZXM6IFtgZHluLWNvbnRhaW5lci5keW4tZmxleHtkaXNwbGF5OmZsZXg7ZmxleC13cmFwOndyYXB9ZHluLWNvbnRhaW5lci5keW4tZmxleD4qe2ZsZXg6MSAxIGF1dG99YF0sXG5cbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOnVzZS1ob3N0LXByb3BlcnR5LWRlY29yYXRvclxuICBob3N0OiB7XG4gICAgJ1tjbGFzcy5keW4tZmxleF0nOiAndHJ1ZScsXG4gICAgJ1tzdHlsZS5mbGV4LWRpcmVjdGlvbl0nOiAnZGlyZWN0aW9uJ1xuICB9LFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBDb250YWluZXJXaWRnZXRDb21wb25lbnQgZXh0ZW5kcyBBYnN0cmFjdFdpZGdldCB7XG5cbiAgZGlyZWN0aW9uOiBzdHJpbmc7XG5cbiAgY29uc3RydWN0b3IoY2RyOiBDaGFuZ2VEZXRlY3RvclJlZiwgZXhwcjogRXhwcmVzc2lvbnMpIHtcbiAgICBzdXBlcihjZHIsIGV4cHIpO1xuICB9XG5cbiAgZHluT25CZWZvcmVCaW5kKCkge1xuXG4gICAgdGhpcy5tYXAoJ2RpcmVjdGlvbicsIGRpciA9PiBkaXIgfHwgJ3JvdycpO1xuICB9XG5cbn1cbiIsIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDE4IEFkcmlhbiBQYW5lbGxhIDxpYW5jaGk3NEBvdXRsb29rLmNvbT5cbiAqXG4gKiBUaGlzIHNvZnR3YXJlIGlzIHJlbGVhc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS5cbiAqIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvTUlUXG4gKi9cblxuaW1wb3J0IHsgQ29tcG9uZW50LCBWaWV3RW5jYXBzdWxhdGlvbiwgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENoYW5nZURldGVjdG9yUmVmfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEFic3RyYWN0V2lkZ2V0LCBFeHByZXNzaW9ucyB9IGZyb20gJy4uLy4uLy4uL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICd3ZGctZ3JpZC1jb250YWluZXInLFxuICB0ZW1wbGF0ZTogYDxuZy1jb250YWluZXIgKm5nRm9yPVwibGV0IGVsZW1lbnQgb2YgY29udGVudFwiIFt3ZGdXaWRnZXRdPVwiZWxlbWVudFwiIFtwYXJlbnRDb250ZXh0XT1cImNvbnRleHRcIj5cblxuPC9uZy1jb250YWluZXI+XG5gLFxuICBzdHlsZXM6IFtgZHluLWdyaWQtY29udGFpbmVyLmR5bi1ncmlke2Rpc3BsYXk6Z3JpZDtncmlkLXRlbXBsYXRlLWNvbHVtbnM6cmVwZWF0KGF1dG8tZml0LG1pbm1heCgzMDBweCwxZnIpKTtncmlkLWF1dG8tZmxvdzpyb3cgZGVuc2V9YF0sXG5cbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOnVzZS1ob3N0LXByb3BlcnR5LWRlY29yYXRvclxuICBob3N0OiB7XG4gICAgJ1tjbGFzcy5keW4tZ3JpZF0nOiAndHJ1ZScsXG4gICAgJ1tzdHlsZS5mbGV4LWRpcmVjdGlvbl0nOiAnZGlyZWN0aW9uJ1xuICB9LFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBHcmlkQ29udGFpbmVyV2lkZ2V0Q29tcG9uZW50IGV4dGVuZHMgQWJzdHJhY3RXaWRnZXQge1xuXG4gIGRpcmVjdGlvbjogc3RyaW5nO1xuXG4gIGNvbnN0cnVjdG9yKGNkcjogQ2hhbmdlRGV0ZWN0b3JSZWYsIGV4cHI6IEV4cHJlc3Npb25zKSB7XG4gICAgc3VwZXIoY2RyLCBleHByKTtcbiAgfVxuXG4gIGR5bk9uQmVmb3JlQmluZCgpIHtcblxuICAgIHRoaXMubWFwKCdkaXJlY3Rpb24nLCBkaXIgPT4gZGlyIHx8ICdyb3cnKTtcbiAgfVxuXG59XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgVmlld0VuY2Fwc3VsYXRpb24sIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDaGFuZ2VEZXRlY3RvclJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQWJzdHJhY3RXaWRnZXQsIEV4cHJlc3Npb25zIH0gZnJvbSAnLi4vLi4vLi4vY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3dkZy10YWJzJyxcbiAgdGVtcGxhdGU6IGA8bWF0LXRhYi1ncm91cD5cblxuICA8bWF0LXRhYiAqbmdGb3I9XCJsZXQgdGFiIG9mIGNvbnRlbnQ7IGluZGV4IGFzIHRhYkluZGV4XCIgW2xhYmVsXT1cInRhYkxhYmVsc1t0YWJJbmRleF0gfHwgKCdUYWInK3RhYkluZGV4KVwiPlxuXG4gICAgPG5nLXRlbXBsYXRlIG1hdFRhYkNvbnRlbnQ+XG4gICAgICA8bmctY29udGFpbmVyIFt3ZGdXaWRnZXRdPVwidGFiXCIgW3BhcmVudENvbnRleHRdPVwiY29udGV4dFwiPjwvbmctY29udGFpbmVyPlxuICAgIDwvbmctdGVtcGxhdGU+XG5cbiAgPC9tYXQtdGFiPlxuXG5cbjwvbWF0LXRhYi1ncm91cD5cbmAsXG4gIHN0eWxlczogW2BgXSxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcbn0pXG5leHBvcnQgY2xhc3MgVGFic1dpZGdldENvbXBvbmVudCBleHRlbmRzIEFic3RyYWN0V2lkZ2V0IGltcGxlbWVudHMgT25Jbml0IHtcblxuICB0YWJMYWJlbHM6IHN0cmluZ1tdO1xuICBjb25zdHJ1Y3RvcihjZHI6IENoYW5nZURldGVjdG9yUmVmLCBleHByOiBFeHByZXNzaW9ucykge1xuICAgIHN1cGVyKGNkciwgZXhwcik7XG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgfVxuXG59XG4iLCIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxOCBBZHJpYW4gUGFuZWxsYSA8aWFuY2hpNzRAb3V0bG9vay5jb20+XG4gKlxuICogVGhpcyBzb2Z0d2FyZSBpcyByZWxlYXNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuXG4gKiBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL01JVFxuICovXG5cbmltcG9ydCB7IENvbXBvbmVudCwgVmlld0VuY2Fwc3VsYXRpb24sIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDaGFuZ2VEZXRlY3RvclJlZn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBBYnN0cmFjdFdpZGdldCwgRXhwcmVzc2lvbnMgfSBmcm9tICcuLi8uLi8uLi9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICd3ZGctY29kZScsXG4gICAgdGVtcGxhdGU6IGA8Y29kZT5cbnt7dGV4dH19XG48L2NvZGU+YCxcbiAgICBzdHlsZXM6IFtgZHluLWNvZGUgY29kZXt3aGl0ZS1zcGFjZTpwcmV9YF0sXG5cbiAgICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXG59KVxuZXhwb3J0IGNsYXNzIENvZGVXaWRnZXRDb21wb25lbnQgZXh0ZW5kcyBBYnN0cmFjdFdpZGdldCB7XG5cbiAgICB0ZXh0OiBzdHJpbmc7XG5cbiAgICBjb25zdHJ1Y3RvcihjZHI6IENoYW5nZURldGVjdG9yUmVmLCBleHByOiBFeHByZXNzaW9ucykge1xuICAgICAgICBzdXBlcihjZHIsIGV4cHIpO1xuICAgIH1cblxufVxuIiwiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTggQWRyaWFuIFBhbmVsbGEgPGlhbmNoaTc0QG91dGxvb2suY29tPlxuICpcbiAqIFRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLlxuICogaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9NSVRcbiAqL1xuXG5cbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IE1hdGVyaWFsTW9kdWxlIH0gZnJvbSAnLi4vbWF0ZXJpYWwubW9kdWxlJztcbmltcG9ydCB7IFdpZGdldHNDb3JlTW9kdWxlIH0gZnJvbSAnLi4vLi4vY29yZSc7XG5cbmltcG9ydCB7IENhcmRXaWRnZXRDb21wb25lbnQgfSBmcm9tICcuL2NhcmQvY2FyZC5jb21wb25lbnQnO1xuaW1wb3J0IHsgVGFibGVXaWRnZXRDb21wb25lbnQgfSBmcm9tICcuL3RhYmxlL3RhYmxlLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBDb250YWluZXJXaWRnZXRDb21wb25lbnQgfSBmcm9tICcuL2NvbnRhaW5lci9jb250YWluZXIuY29tcG9uZW50JztcbmltcG9ydCB7IEdyaWRDb250YWluZXJXaWRnZXRDb21wb25lbnQgfSBmcm9tICcuL2dyaWQtY29udGFpbmVyL2dyaWRjb250YWluZXIuY29tcG9uZW50JztcbmltcG9ydCB7IFRhYnNXaWRnZXRDb21wb25lbnQgfSBmcm9tICcuL3RhYnMvdGFicy5jb21wb25lbnQnO1xuaW1wb3J0IHsgQ29kZVdpZGdldENvbXBvbmVudCB9IGZyb20gJy4vY29kZS9jb2RlLmNvbXBvbmVudCc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBNYXRlcmlhbE1vZHVsZSxcblxuICAgIFdpZGdldHNDb3JlTW9kdWxlLmZvclJvb3Qoe1xuICAgICAgd2lkZ2V0czogW1xuICAgICAgICB7IHR5cGU6ICdjYXJkJywgY29tcG9uZW50OiBDYXJkV2lkZ2V0Q29tcG9uZW50IH0sXG4gICAgICAgIHsgdHlwZTogJ3RhYmxlJywgY29tcG9uZW50OiBUYWJsZVdpZGdldENvbXBvbmVudCB9LFxuICAgICAgICB7IHR5cGU6ICdjb250YWluZXInLCBjb21wb25lbnQ6IENvbnRhaW5lcldpZGdldENvbXBvbmVudH0sXG4gICAgICAgIHsgdHlwZTogJ2dyaWQtY29udGFpbmVyJywgY29tcG9uZW50OiBHcmlkQ29udGFpbmVyV2lkZ2V0Q29tcG9uZW50fSxcbiAgICAgICAgeyB0eXBlOiAndGFicycsIGNvbXBvbmVudDogVGFic1dpZGdldENvbXBvbmVudH0sXG4gICAgICAgIHsgdHlwZTogJ2NvZGUnLCBjb21wb25lbnQ6IENvZGVXaWRnZXRDb21wb25lbnR9LFxuICAgICAgXVxuICAgIH0pXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW1xuICAgIENhcmRXaWRnZXRDb21wb25lbnQsXG4gICAgVGFibGVXaWRnZXRDb21wb25lbnQsXG4gICAgQ29udGFpbmVyV2lkZ2V0Q29tcG9uZW50LFxuICAgIEdyaWRDb250YWluZXJXaWRnZXRDb21wb25lbnQsXG4gICAgVGFic1dpZGdldENvbXBvbmVudCxcbiAgICBDb2RlV2lkZ2V0Q29tcG9uZW50LFxuICBdLFxuICBleHBvcnRzOiBbXVxufSlcbmV4cG9ydCBjbGFzcyBDb21tb25XaWRnZXRzTW9kdWxlIHsgfVxuIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQWlCQTs7Ozs7Ozs7Ozs7SUE4QkUsT0FBTyxNQUFNLENBQUMsTUFBZ0IsRUFBRSxXQUF5QixFQUN2RCxhQUEyQixFQUMzQixXQUF5QixFQUN6QixRQUFrQjtRQUVsQix1QkFBTSxPQUFPLEdBQVksTUFBTSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEdBQUcsSUFBSSxPQUFPLEVBQUUsQ0FBQztRQUV4RSxJQUFJLFFBQVE7WUFBRSxPQUFPLENBQUMsY0FBYyxDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDbkUsSUFBSSxXQUFXO1lBQUUsTUFBTSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsV0FBVyxD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