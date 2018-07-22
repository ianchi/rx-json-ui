import { Input, Component, ViewEncapsulation, ChangeDetectionStrategy, ChangeDetectorRef, Inject, InjectionToken, Injectable, ViewChild, Directive, ViewContainerRef, ComponentFactoryResolver, Optional, NgModule, defineInjectable, inject, ANALYZE_FOR_ENTRY_COMPONENTS, Pipe } from '@angular/core';
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
                styles: [`wdg-table table{width:100%}wdg-table tr.data-row:hover{background:#f5f5f5}wdg-table tr.data-row:active{background:#efefef}wdg-table .data-row td{border-bottom-width:0}wdg-table mat-paginator.hiddenPaginator{display:none}wdg-table .table-title{display:flex;flex-flow:row}wdg-table .table-title>*{flex:0 0 auto}wdg-table .table-title .spacer{flex:1 1 auto}`],
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
                styles: [`wdg-container.wdg-flex{display:flex;flex-wrap:wrap}wdg-container.wdg-flex>*{flex:1 1 auto}`],
                // tslint:disable-next-line:use-host-property-decorator
                host: {
                    '[class.wdg-flex]': 'true',
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
                styles: [`wdg-grid-container.wdg-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));grid-auto-flow:row dense}`],
                // tslint:disable-next-line:use-host-property-decorator
                host: {
                    '[class.wdg-grid]': 'true',
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
                styles: [`wdg-code code{white-space:pre}`],
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

export { Context, AbstractWidget, parseDefObject, ROOT_CONTEXT, WidgetDirective, AF_CONFIG_TOKEN, WidgetRegistry, WidgetsCoreModule, FormatPipe, formatValue, RoutedWidgetComponent, Expressions, ESpression, expressionProvider, FORM_CONTROL, AbstractFormFieldWidget, FormFieldWidgetsModule, CommonWidgetsModule, MaterialModule, DefaultWidgetComponent as ɵa, CardWidgetComponent as ɵi, CodeWidgetComponent as ɵn, ContainerWidgetComponent as ɵk, GridContainerWidgetComponent as ɵl, TableWidgetComponent as ɵj, TabsWidgetComponent as ɵm, AutocompleteWidgetComponent as ɵh, ButtonWidgetComponent as ɵf, CheckboxWidgetComponent as ɵc, FormWidgetComponent as ɵg, InputWidgetComponent as ɵb, SliderWidgetComponent as ɵe, ToggleWidgetComponent as ɵd };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVhY3RpdmUtanNvbi1mb3JtLW5nLmpzLm1hcCIsInNvdXJjZXMiOlsibmc6Ly9yZWFjdGl2ZS1qc29uLWZvcm0tbmcvbGliL2NvcmUvY29udGV4dC50cyIsIm5nOi8vcmVhY3RpdmUtanNvbi1mb3JtLW5nL2xpYi9jb3JlL2Fic3RyYWN0d2lkZ2V0LnRzIiwibmc6Ly9yZWFjdGl2ZS1qc29uLWZvcm0tbmcvbGliL2NvcmUvZXhwcmVzc2lvbnMudHMiLCJuZzovL3JlYWN0aXZlLWpzb24tZm9ybS1uZy9saWIvY29yZS9kZWZhdWx0d2lkZ2V0LmNvbXBvbmVudC50cyIsIm5nOi8vcmVhY3RpdmUtanNvbi1mb3JtLW5nL2xpYi9jb3JlL3dpZGdldHJlZ2lzdHJ5LnNlcnZpY2UudHMiLCJuZzovL3JlYWN0aXZlLWpzb24tZm9ybS1uZy9saWIvY29yZS93aWRnZXQuZGlyZWN0aXZlLnRzIiwibmc6Ly9yZWFjdGl2ZS1qc29uLWZvcm0tbmcvbGliL2NvcmUvZm9ybWF0LnRzIiwibmc6Ly9yZWFjdGl2ZS1qc29uLWZvcm0tbmcvbGliL2NvcmUvcm91dGVkd2lkZ2V0LmNvbXBvbmVudC50cyIsIm5nOi8vcmVhY3RpdmUtanNvbi1mb3JtLW5nL2xpYi9jb3JlL2NvcmUubW9kdWxlLnRzIiwibmc6Ly9yZWFjdGl2ZS1qc29uLWZvcm0tbmcvbGliL2NvcmUvZm9ybWZpZWxkd2lkZ2V0LnRzIiwibmc6Ly9yZWFjdGl2ZS1qc29uLWZvcm0tbmcvbGliL21hdGVyaWFsL21hdGVyaWFsLm1vZHVsZS50cyIsIm5nOi8vcmVhY3RpdmUtanNvbi1mb3JtLW5nL2xpYi9tYXRlcmlhbC9mb3JtZmllbGQvaW5wdXQvaW5wdXQuY29tcG9uZW50LnRzIiwibmc6Ly9yZWFjdGl2ZS1qc29uLWZvcm0tbmcvbGliL21hdGVyaWFsL2Zvcm1maWVsZC9jaGVja2JveC9jaGVja2JveC5jb21wb25lbnQudHMiLCJuZzovL3JlYWN0aXZlLWpzb24tZm9ybS1uZy9saWIvbWF0ZXJpYWwvZm9ybWZpZWxkL3RvZ2dsZS90b2dnbGUuY29tcG9uZW50LnRzIiwibmc6Ly9yZWFjdGl2ZS1qc29uLWZvcm0tbmcvbGliL21hdGVyaWFsL2Zvcm1maWVsZC9zbGlkZXIvc2xpZGVyLmNvbXBvbmVudC50cyIsIm5nOi8vcmVhY3RpdmUtanNvbi1mb3JtLW5nL2xpYi9tYXRlcmlhbC9mb3JtZmllbGQvYnV0dG9uL2J1dHRvbi5jb21wb25lbnQudHMiLCJuZzovL3JlYWN0aXZlLWpzb24tZm9ybS1uZy9saWIvbWF0ZXJpYWwvZm9ybWZpZWxkL2Zvcm0vZm9ybS5jb21wb25lbnQudHMiLCJuZzovL3JlYWN0aXZlLWpzb24tZm9ybS1uZy9saWIvbWF0ZXJpYWwvZm9ybWZpZWxkL2F1dG9jb21wbGV0ZS9hdXRvY29tcGxldGUuY29tcG9uZW50LnRzIiwibmc6Ly9yZWFjdGl2ZS1qc29uLWZvcm0tbmcvbGliL21hdGVyaWFsL2Zvcm1maWVsZC9mb3JtZmllbGQubW9kdWxlLnRzIiwibmc6Ly9yZWFjdGl2ZS1qc29uLWZvcm0tbmcvbGliL21hdGVyaWFsL2NvbW1vbi9jYXJkL2NhcmQuY29tcG9uZW50LnRzIiwibmc6Ly9yZWFjdGl2ZS1qc29uLWZvcm0tbmcvbGliL21hdGVyaWFsL2NvbW1vbi90YWJsZS90YWJsZS5jb21wb25lbnQudHMiLCJuZzovL3JlYWN0aXZlLWpzb24tZm9ybS1uZy9saWIvbWF0ZXJpYWwvY29tbW9uL2NvbnRhaW5lci9jb250YWluZXIuY29tcG9uZW50LnRzIiwibmc6Ly9yZWFjdGl2ZS1qc29uLWZvcm0tbmcvbGliL21hdGVyaWFsL2NvbW1vbi9ncmlkLWNvbnRhaW5lci9ncmlkY29udGFpbmVyLmNvbXBvbmVudC50cyIsIm5nOi8vcmVhY3RpdmUtanNvbi1mb3JtLW5nL2xpYi9tYXRlcmlhbC9jb21tb24vdGFicy90YWJzLmNvbXBvbmVudC50cyIsIm5nOi8vcmVhY3RpdmUtanNvbi1mb3JtLW5nL2xpYi9tYXRlcmlhbC9jb21tb24vY29kZS9jb2RlLmNvbXBvbmVudC50cyIsIm5nOi8vcmVhY3RpdmUtanNvbi1mb3JtLW5nL2xpYi9tYXRlcmlhbC9jb21tb24vY29tbW9uLm1vZHVsZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxOCBBZHJpYW4gUGFuZWxsYSA8aWFuY2hpNzRAb3V0bG9vay5jb20+XG4gKlxuICogVGhpcyBzb2Z0d2FyZSBpcyByZWxlYXNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuXG4gKiBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL01JVFxuICovXG5cbmV4cG9ydCBpbnRlcmZhY2UgSUNvbnRleHREZWYge1xuICBbaWRlbnRpZmllcjogc3RyaW5nXTogYW55O1xufVxuXG5cbi8qKlxuICogSGVscGVyIGNsYXNzIHRvIGhvbGQgY29udGV4dCBmb3IgZXhwcmVzc2lvbiBldmFsdWF0aW9uLlxuICogSXQgb25seSBnaXZlcyBhICd0eXBlJyB0byBhIHBsYWluIG9iamVjdC5cbiAqIEl0IGhhcyBzdGF0aWMgbWV0aG9kcyB0byBtYW5hZ2UgaW5oZXJpdGFuY2UgYW5kIGFkZGluZyBwcm9wZXJ0aWVzIGFuZCBidWlsdGluc1xuICovXG5leHBvcnQgY2xhc3MgQ29udGV4dCB7XG5cbiAgLyoqIEhlbHBlciBkZWZpbml0aW9uIG9mIGJ1aWx0LWluIG9iamVjdHMgKi9cbiAgc3RhdGljIGJ1aWx0aW5zRGVmOiBJQ29udGV4dERlZiA9IHtcblxuICAgIC8vIEJ1aWx0aW4gZnVuY3Rpb25zOlxuICAgIHBhcnNlRmxvYXQ6IHBhcnNlRmxvYXQsXG4gICAgcGFyc2VJbnQ6IHBhcnNlSW50LFxuICAgIGlzTmFOOiBpc05hTixcbiAgICBpc0Zpbml0ZTogaXNGaW5pdGUsXG5cbiAgICAvLyBGdW5kYW1lbnRhbCBvYmplY3RzOlxuICAgIE51bWJlcjogTnVtYmVyLFxuICAgIE1hdGg6IE1hdGgsXG4gICAgRGF0ZTogRGF0ZSxcbiAgICBBcnJheTogQXJyYXksXG4gICAgSlNPTjogSlNPTixcbiAgICBPYmplY3Q6IE9iamVjdCxcblxuICB9O1xuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgQ29udGV4dCBvYmplY3QsIGluaGVyaXRpbmcgZnJvbSBhbiBvcHRpb25hbCBgcGFyZW50YCBhbmQgYWRkaW5nIGN1c3RvbSBwcm9wZXJ0aWVzXG4gICAqIGFuZCBvcHRpb25hbGx5IGJ1aWx0aW4gb2JqZWN0c1xuICAgKiBAcGFyYW0gcGFyZW50XG4gICAqIEBwYXJhbSBwdWJsaWNQcm9wc1xuICAgKiBAcGFyYW0gcmVhZG9ubHlQcm9wc1xuICAgKiBAcGFyYW0gaGlkZGVuUHJvcHNcbiAgICogQHBhcmFtIGJ1aWx0aW5zIEJvb2xlYW4uIElmIHRydWUgYWRkcyBidWlsdGlub2JqZWN0cyBhcyBwdWJsaWMgcHJvcGVydGllcyxcbiAgICovXG4gIHN0YXRpYyBjcmVhdGUocGFyZW50PzogQ29udGV4dCwgcHVibGljUHJvcHM/OiBJQ29udGV4dERlZixcbiAgICByZWFkb25seVByb3BzPzogSUNvbnRleHREZWYsXG4gICAgaGlkZGVuUHJvcHM/OiBJQ29udGV4dERlZixcbiAgICBidWlsdGlucz86IGJvb2xlYW4pOiBDb250ZXh0IHtcblxuICAgIGNvbnN0IGNvbnRleHQ6IENvbnRleHQgPSBwYXJlbnQgPyBPYmplY3QuY3JlYXRlKHBhcmVudCkgOiBuZXcgQ29udGV4dCgpO1xuXG4gICAgaWYgKGJ1aWx0aW5zKSBDb250ZXh0LmRlZmluZVJlYWRvbmx5KGNvbnRleHQsIENvbnRleHQuYnVpbHRpbnNEZWYpO1xuICAgIGlmIChwdWJsaWNQcm9wcykgT2JqZWN0LmFzc2lnbihjb250ZXh0LCBwdWJsaWNQcm9wcyk7XG4gICAgaWYgKHJlYWRvbmx5UHJvcHMpIENvbnRleHQuZGVmaW5lUmVhZG9ubHkoY29udGV4dCwgcmVhZG9ubHlQcm9wcyk7XG4gICAgaWYgKGhpZGRlblByb3BzKSBDb250ZXh0LmRlZmluZUhpZGRlbihjb250ZXh0LCBoaWRkZW5Qcm9wcyk7XG5cbiAgICByZXR1cm4gY29udGV4dDtcbiAgfVxuXG4gIC8qKiBBZGRzIHJlYWRvbmx5IHByb3BlcnRpZXMgdG8gYSBDb250ZXh0ICovXG4gIHN0YXRpYyBkZWZpbmVSZWFkb25seShjb250ZXh0OiBDb250ZXh0LCBQcm9wczogSUNvbnRleHREZWYpIHtcblxuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpmb3JpblxuICAgIGZvciAoY29uc3QgcHJvcCBpbiBQcm9wcykge1xuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGNvbnRleHQsIHByb3AsIHtcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgd3JpdGFibGU6IGZhbHNlLFxuICAgICAgICB2YWx1ZTogUHJvcHNbcHJvcF1cbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHJldHVybiBjb250ZXh0O1xuICB9XG5cbiAgLyoqIEFkZHMgaGlkZGVuIChub24gZW51bWVyYWJsZSkgcHJvcGVydGllcyB0byBhIENvbnRleHQgKi9cbiAgc3RhdGljIGRlZmluZUhpZGRlbihjb250ZXh0OiBDb250ZXh0LCBoaWRkZW5Qcm9wczogSUNvbnRleHREZWYpIHtcblxuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpmb3JpblxuICAgIGZvciAoY29uc3QgcHJvcCBpbiBoaWRkZW5Qcm9wcykge1xuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGNvbnRleHQsIHByb3AsIHtcbiAgICAgICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgICAgIHdyaXRhYmxlOiB0cnVlLFxuICAgICAgICB2YWx1ZTogaGlkZGVuUHJvcHNbcHJvcF1cbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHJldHVybiBjb250ZXh0O1xuICB9XG5cbiAgLyoqIGFkZHMgcHVibGljIHByb3BlcnRpZXMgb25seSBpZiB0aGV5IGRvbid0IGV4aXN0IGluIHBhcmVudCAqL1xuICBzdGF0aWMgZGVmaW5lV2Vhayhjb250ZXh0OiBDb250ZXh0LCBwcm9wczogSUNvbnRleHREZWYpIHtcblxuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpmb3JpblxuICAgIGZvciAoY29uc3QgcHJvcCBpbiBwcm9wcykge1xuICAgICAgaWYgKHByb3AgaW4gY29udGV4dCkgY29udGludWU7XG4gICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoY29udGV4dCwgcHJvcCwge1xuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICAgICAgdmFsdWU6IHByb3BzW3Byb3BdXG4gICAgICB9KTtcbiAgICB9XG4gIH1cbn1cbiIsIlxuLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTggQWRyaWFuIFBhbmVsbGEgPGlhbmNoaTc0QG91dGxvb2suY29tPlxuICpcbiAqIFRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLlxuICogaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9NSVRcbiAqL1xuXG5pbXBvcnQgeyBPbkRlc3Ryb3ksIENoYW5nZURldGVjdG9yUmVmLCBJbnB1dCwgT25DaGFuZ2VzLCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUsIG9mLCBTdWJzY3JpcHRpb24sIGNvbWJpbmVMYXRlc3QsIGlzT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgdGFwLCBtYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBJV2lkZ2V0RGVmIH0gZnJvbSAnLi93aWRnZXQuaW50ZXJmYWNlJztcbmltcG9ydCB7IFdpZGdldERpcmVjdGl2ZSB9IGZyb20gJy4vd2lkZ2V0LmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBDb250ZXh0IH0gZnJvbSAnLi9jb250ZXh0JztcbmltcG9ydCB7IEV4cHJlc3Npb25zIH0gZnJvbSAnLi9leHByZXNzaW9ucyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgSU9wdGlvbkRlZiB7IFtwcm9wOiBzdHJpbmddOiBhbnk7IH1cblxuLyoqXG4gKiBCYXNlIGNsYXNzIGZvciBhbGwgZHluYW1pYyB3aWRnZXQgZWxlbWVudHNcbiAqL1xuZXhwb3J0IGFic3RyYWN0IGNsYXNzIEFic3RyYWN0V2lkZ2V0IGltcGxlbWVudHMgT25EZXN0cm95LCBPbkNoYW5nZXMsIE9uSW5pdCB7XG5cbiAgLyoqIENvbmZpZ3VyYXRpb24gb2YgdGhlIHdpZGdldCAqL1xuICBASW5wdXQoKSB3aWRnZXREZWY6IElXaWRnZXREZWY7XG4gIEBJbnB1dCgpIGNvbnRleHQ6IENvbnRleHQ7XG5cbiAgLyoqIFN0cmluZyBpZGVudGlmaW5nIHRoZSAndHlwZScgb2YgdGhlIHdpZGdldCAqL1xuICB0eXBlOiBzdHJpbmc7XG4gIC8qKiBDb250ZXh0IHRvIHVzZSBmb3IgZXZhbHVhdGlvbnMgYXQgdGhpcyBsZXZlbCAqL1xuXG4gIC8qKiBXaWRnZXQgc3BlY2lmaWMgb3B0aW9ucyBhbGwgY29udmVydGVkIHRvIG9ic2VydmFibGVzLCB0byB1bmlmeSBiZXR3ZWVuICpleHByZXNzaW9uKiBhbmRcbiAgICogKmNvbnN0YW50KiBub3RhdGlvbiBpbiB0aGUgcHJvcGVydGllcyBkZWZpbml0aW9uLlxuICAgKiBFYWNoIGJpbmRpbmcgdGhlbiBhdXRvIHVwZGF0ZXMgdGhlIGNvcnJlc3BvbmRpbmcgcHJvcGVydHkgaW4gdGhlIGRlcml2ZWQgd2lkZ2V0LlxuICAgKi9cbiAgYmluZGluZ3M6IHsgW3Byb3A6IHN0cmluZ106IE9ic2VydmFibGU8YW55PiB9ID0ge307XG4gIC8qKiBUaGUgaW5wdXQgY29uZmlndXJhdGlvbiBvZiB0aGlzIG9iamVjdCAqL1xuXG4gIGNvbnRlbnQ6IElXaWRnZXREZWZbXTtcblxuICBlbGVtZW50OiBXaWRnZXREaXJlY3RpdmU7XG5cbiAgc2V0IGFkZFN1YnNjcmlwdGlvbihzdWJzOiBTdWJzY3JpcHRpb24pIHtcbiAgICB0aGlzLl9zdWJzY3JpcHRpb25zLnB1c2goc3Vicyk7XG4gIH1cblxuICBwcml2YXRlIF9zdWJzY3JpcHRpb25zOiBTdWJzY3JpcHRpb25bXSA9IFtdO1xuXG5cbiAgY29uc3RydWN0b3IocHJvdGVjdGVkIF9jZHI6IENoYW5nZURldGVjdG9yUmVmLCBwcm90ZWN0ZWQgX2V4cHI6IEV4cHJlc3Npb25zKSB7XG4gIH1cblxuICAvKiogSW5pdGlhbGljZXMgdGhlIHdpZGdldCBmcm9tIGEganNvbiBkZWZpbml0aW9uICovXG4gIHNldHVwKGVsZW1lbnQ6IFdpZGdldERpcmVjdGl2ZSwgZGVmOiBJV2lkZ2V0RGVmLCBjb250ZXh0OiBDb250ZXh0KSB7XG4gICAgZGVmID0gZGVmIHx8IHsgdHlwZTogJ25vbmUnIH07XG4gICAgZGVmLm9wdGlvbnMgPSBkZWYub3B0aW9ucyB8fCB7fTtcblxuICAgIHRoaXMudHlwZSA9IGRlZi50eXBlIHx8ICdub25lJztcbiAgICB0aGlzLmVsZW1lbnQgPSBlbGVtZW50O1xuXG4gICAgY29uc29sZS5sb2coYFdpZGdldCBzZXR1cCAke3RoaXMudHlwZX1gLCB0aGlzKTtcblxuICAgIHRoaXMuY29udGV4dCA9IGNvbnRleHQ7XG5cbiAgICB0aGlzLndpZGdldERlZiA9IGRlZiA9IHRoaXMuZHluT25TZXR1cChkZWYpIHx8IGRlZjtcblxuICAgIHRoaXMuYmluZGluZ3MgPSBwYXJzZURlZk9iamVjdChkZWYub3B0aW9ucywgdGhpcy5jb250ZXh0LCB0cnVlLCB0aGlzLl9leHByKTtcblxuICAgIHRoaXMuY29udGVudCA9IEFycmF5LmlzQXJyYXkoZGVmLmNvbnRlbnQpID8gZGVmLmNvbnRlbnQgOiB0eXBlb2YgZGVmLmNvbnRlbnQgPT09ICdvYmplY3QnID8gW2RlZi5jb250ZW50XSA6IFtdO1xuXG4gICAgdGhpcy5zdWJzY3JpYmVPcHRpb25zKCk7XG4gIH1cblxuICAvKipcbiAgICogSGVscGVyIGZ1bmN0aW9uIHRvIGFkZCBhIGBtYXBgIHBpcGUgdG8gdGhlIGNvcnJlc3BvbmRpbmcgaW5wdXQgb2JzZXJ2YWJsZVxuICAgKi9cbiAgbWFwKG9wdGlvbjogc3RyaW5nLCBjYWxsYmFjazogKHY6IGFueSkgPT4gYW55KSB7XG4gICAgY29uc3Qgb3B0OiBPYnNlcnZhYmxlPGFueT4gPSB0aGlzLmJpbmRpbmdzW29wdGlvbl07XG4gICAgaWYgKG9wdCkgdGhpcy5iaW5kaW5nc1tvcHRpb25dID0gb3B0LnBpcGUobWFwKGNhbGxiYWNrKSk7XG5cbiAgfVxuICAvKipcbiAgICogSG9vayB0byBjdXN0b21pemUgdGhlIG9ic2VydmFibGUgYmluZGluZ3MgYmVmb3Igc3Vic2NyaWJpbmcuXG4gICAqIFRpcGljYWxseSB1c2luZyB0aGUgYHRoaXMubWFwKClgIGZ1bmN0aW9uIHRvIGFkZCBwcm9jZXNzaW5nIHRvIHNwZWNpZmljIG9wdGlvbnNcbiAgICovXG4gIGR5bk9uQmVmb3JlQmluZCgpIHsgfVxuXG4gIGR5bk9uQWZ0ZXJCaW5kKCkgeyB9XG5cbiAgLyoqIEhvb2sgdG8gY3VzdG9taXplIHdpZGdldCBkZWZpbml0aW9uIGJlZm9yZSBwcm9jZXNpbmcgaXQgKi9cbiAgZHluT25TZXR1cChkZWY6IElXaWRnZXREZWYpIHsgcmV0dXJuIGRlZjsgfVxuXG4gIHN1YnNjcmliZU9wdGlvbnMoKSB7XG4gICAgY29uc3Qgb2JzZXJ2YWJsZXMgPSBbXTtcblxuICAgIC8vIGNhbGwgaG9vayBmb3IgY29maWd1cmF0aW9uIG9mIG9wdGlvbnMgYmVmb3JlIHVwZGF0aW5nIHRoZSBib3VuZCB2YWx1ZVxuICAgIHRoaXMuZHluT25CZWZvcmVCaW5kKCk7XG5cbiAgICBmb3IgKGNvbnN0IHByb3AgaW4gdGhpcy5iaW5kaW5ncykgLy8gdHNsaW50OmRpc2FibGUtbGluZTpmb3JpblxuICAgICAgdGhpcy5iaW5kaW5nc1twcm9wXSA9IHRoaXMuYmluZGluZ3NbcHJvcF0ucGlwZSh0YXAocmVzID0+IHRoaXNbcHJvcF0gPSByZXMpKTtcblxuICAgIC8vIGNhbGwgaG9vayBhZnRlciB1cGRhdGluZyB0aGUgYm91bmQgdmFsdWVcbiAgICB0aGlzLmR5bk9uQWZ0ZXJCaW5kKCk7XG5cbiAgICBmb3IgKGNvbnN0IHByb3AgaW4gdGhpcy5iaW5kaW5ncykgLy8gdHNsaW50OmRpc2FibGUtbGluZTpmb3JpblxuICAgICAgb2JzZXJ2YWJsZXMucHVzaCh0aGlzLmJpbmRpbmdzW3Byb3BdKTtcblxuICAgIHRoaXMuYWRkU3Vic2NyaXB0aW9uID0gY29tYmluZUxhdGVzdChvYnNlcnZhYmxlcykuc3Vic2NyaWJlKCgpID0+IHRoaXMuX2Nkci5tYXJrRm9yQ2hlY2soKSk7XG5cbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuX3Vuc3Vic2NyaWJlKCk7XG4gIH1cblxuICAvKipcbiAgICogT25DaGFuZ2VzIGlzIG5ldmVyIGNhbGxlZCBvbiBkeW5hbWljIHdpZGdldCBpbnN0YW50aWF0aW9uXG4gICAqIEl0IGlzIGludGVuZGVkIHRvIHByb3ZpZGUgdGhlIHNhbWUgaW50ZXJmYWNlIGlzIHRoZSB3aWRnZXQgaXMgdXNlZCBkZWNsYXJhdGl2ZSBpbiBhIHRlbXBsYXRlXG4gICAqIGluc3RlYWQgb2YgZHluYW1pY2FsbHlcbiAgICovXG4gIG5nT25DaGFuZ2VzKCkge1xuICAgIGNvbnNvbGUubG9nKGBXaWRnZXQgT25DaGFuZ2VzICR7dGhpcy50eXBlfWAsIHRoaXMpO1xuICAgIHRoaXMuX3Vuc3Vic2NyaWJlKCk7XG4gICAgdGhpcy5zZXR1cChudWxsLCB0aGlzLndpZGdldERlZiwgdGhpcy5jb250ZXh0KTtcbiAgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIGNvbnNvbGUubG9nKGBXaWRnZXQgT25Jbml0ICR7dGhpcy50eXBlfWAsIHRoaXMpO1xuICB9XG5cbiAgcHJpdmF0ZSBfdW5zdWJzY3JpYmUoKSB7XG4gICAgZm9yIChjb25zdCBzdWJzIG9mIHRoaXMuX3N1YnNjcmlwdGlvbnMpIHN1YnMudW5zdWJzY3JpYmUoKTtcbiAgfVxuXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwYXJzZURlZk9iamVjdChvYmpEZWY6IElPcHRpb25EZWYsIGNvbnRleHQ6IENvbnRleHQsIGFzT2JzZXJ2YWJsZTogYm9vbGVhbiwgZXhwcjogRXhwcmVzc2lvbnMpIHtcblxuICBjb25zdCByZXN1bHQ6IElPcHRpb25EZWYgPSB7fTtcblxuICBpZiAoIW9iakRlZikgcmV0dXJuIG51bGw7XG5cbiAgZm9yIChjb25zdCBwcm9wIGluIG9iakRlZikge1xuXG4gICAgaWYgKHByb3AuY2hhckF0KHByb3AubGVuZ3RoIC0gMSkgPT09ICc9Jykge1xuICAgICAgaWYgKHR5cGVvZiBvYmpEZWZbcHJvcF0gIT09ICdzdHJpbmcnKSB0aHJvdyBuZXcgU3ludGF4RXJyb3IoJ0JpbmRpbmcgb3B0aW9ucyBtdXN0IGJlIFwic3RyaW5nXCIgSWV4cHJlc3Npb25zJyk7XG4gICAgICByZXN1bHRbcHJvcC5zbGljZSgwLCBwcm9wLmxlbmd0aCAtIDEpXSA9IGV4cHIuZXZhbChvYmpEZWZbcHJvcF0sIGNvbnRleHQsIGFzT2JzZXJ2YWJsZSk7XG5cbiAgICB9IGVsc2UgcmVzdWx0W3Byb3BdID0gYXNPYnNlcnZhYmxlICYmICFpc09ic2VydmFibGUob2JqRGVmW3Byb3BdKSA/IG9mKG9iakRlZltwcm9wXSkgOiBvYmpEZWZbcHJvcF07XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cbiIsIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDE4IEFkcmlhbiBQYW5lbGxhIDxpYW5jaGk3NEBvdXRsb29rLmNvbT5cbiAqXG4gKiBUaGlzIHNvZnR3YXJlIGlzIHJlbGVhc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS5cbiAqIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvTUlUXG4gKi9cblxuaW1wb3J0IHtcbiAgUmVhY3RpdmVFdmFsLCBTdGF0aWNFdmFsLCBQYXJzZXIsIGVzNVJ1bGVzLFxuICBJZGVudGlmaWVyUnVsZSwgQmluYXJ5T3BlcmF0b3JSdWxlLCBNRU1CRVJfRVhQXG59IGZyb20gJ2VzcHJlc3Npb24nO1xuaW1wb3J0IHsgaXNPYnNlcnZhYmxlLCBvZiwgRU1QVFkgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IENvbnRleHQgfSBmcm9tICcuL2NvbnRleHQnO1xuXG5leHBvcnQgaW50ZXJmYWNlIElBc3Qge1xuICB0eXBlOiBzdHJpbmc7XG4gIFtwcm9wOiBzdHJpbmddOiBhbnk7XG59XG5cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBFeHByZXNzaW9ucyB7XG5cbiAgYWJzdHJhY3QgcGFyc2VLZXkoZXhwcmVzc2lvbjogc3RyaW5nKTogSUFzdDtcbiAgYWJzdHJhY3QgcGFyc2UoZXhwcmVzc2lvbjogc3RyaW5nKTogSUFzdDtcbiAgLyoqXG4gICAqIEV2YWx1YXRlcyBhbiBleHByZXNzaW9uIGluIHRoZSBnaXZlbiBjb250ZXh0LlxuICAgKiBJdCB1c2VzIHRoZSBnZW5lcmFsIHBhcnNlci5cbiAgICpcbiAgICogQHBhcmFtIGV4cHJlc3Npb24gU3RyaW5nIGV4cHJlc3Npb25cbiAgICogQHBhcmFtIGNvbnRleHRcbiAgICogQHBhcmFtIGFzT2JzZXJ2YWJsZSBBbHdheXMgY29udmVydHMgcmVzdWx0IHRvIG9ic2VydmFibGVcbiAgICovXG4gIGV2YWwoZXhwcmVzc2lvbjogc3RyaW5nLCBjb250ZXh0OiBDb250ZXh0LCBhc09ic2VydmFibGU6IGJvb2xlYW4pIHtcbiAgICBjb25zdCBhc3QgPSB0aGlzLnBhcnNlKGV4cHJlc3Npb24pO1xuXG4gICAgcmV0dXJuIHRoaXMuZXZhbHVhdGUoYXN0LCBjb250ZXh0LCBhc09ic2VydmFibGUpO1xuICB9XG4gIGFic3RyYWN0IGV2YWx1YXRlKGFzdDogSUFzdCwgY29udGV4dDogQ29udGV4dCwgYXNPYnNlcnZhYmxlOiBib29sZWFuKTogYW55O1xuICBhYnN0cmFjdCBsdmFsdWUoZXhwcmVzc2lvbjogc3RyaW5nLCBjb250ZXh0OiBDb250ZXh0KTogeyBvLCBtIH07XG59XG5cblxuLyoqXG4gKiBTZXJ2aWNlIGZvciBQYXJzaW5nIGFuZCBmb3IgZXZhbHVhdGluZyBleHByZXNzaW9ucyBpbiBXaWRnZXQncyBjb25maWd1cmF0aW9uXG4gKiBUaGUgZnVuY2lvbmFsaXR5IGlzIHByb3ZpZGVkIGJ5IHRoZSBFU3ByZXNzaW9uIHBhY2thZ2VcbiAqXG4gKi9cbmV4cG9ydCBjbGFzcyBFU3ByZXNzaW9uIGV4dGVuZHMgRXhwcmVzc2lvbnMge1xuXG4gIHByaXZhdGUgX3BhcnNlcjogUGFyc2VyO1xuICBwcml2YXRlIF9rZXlQYXJzZXI6IFBhcnNlcjtcblxuICBwcml2YXRlIF9yeEV2YWw6IFN0YXRpY0V2YWw7XG5cbiAgY29uc3RydWN0b3IoKSB7XG5cbiAgICBzdXBlcigpO1xuICAgIGNvbnN0IGVzNSA9IGVzNVJ1bGVzKCk7XG5cbiAgICAvLyByZW1vdmUgUHJvZ2FtIC8gU3RhdGVtZW50cyBydWxlcywgYW5kIGtlZXAgb25seSBleHByZXNzaW9uc1xuICAgIGVzNVswXSA9IFtdO1xuXG4gICAgdGhpcy5fcGFyc2VyID0gbmV3IFBhcnNlcihlczUpO1xuXG5cbiAgICBjb25zdCBpZGVudGlmaWVyUnVsZSA9IG5ldyBJZGVudGlmaWVyUnVsZSh7IHRoaXNTdHI6IG51bGwsIGxpdGVyYWxzOiB7fSB9KTtcbiAgICB0aGlzLl9rZXlQYXJzZXIgPSBuZXcgUGFyc2VyKFtcbiAgICAgIFtuZXcgQmluYXJ5T3BlcmF0b3JSdWxlKHtcbiAgICAgICAgJy4nOiB7XG4gICAgICAgICAgdHlwZTogTUVNQkVSX0VYUCxcbiAgICAgICAgICBleHRyYTogeyBjb21wdXRlZDogZmFsc2UgfSxcbiAgICAgICAgICBub29wOiB0cnVlLFxuICAgICAgICAgIGxlZnQ6ICdvYmplY3QnLCByaWdodDogJ3Byb3BlcnR5JyxcbiAgICAgICAgICBydWxlczogW1tpZGVudGlmaWVyUnVsZV1dXG4gICAgICAgIH1cbiAgICAgIH0pXSxcbiAgICAgIFtpZGVudGlmaWVyUnVsZV1cbiAgICBdKTtcblxuICAgIHRoaXMuX3J4RXZhbCA9IG5ldyBSZWFjdGl2ZUV2YWwoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBQYXJzZXMgdGhlIHN0cmluZyBleHByZXNzaW9uIHVzaW5nIHRoZSBnZW5lcmFsIHBhcnNpbmcgcnVsZXMuXG4gICAqXG4gICAqICogQHBhcmFtIGV4cHJlc3Npb25cbiAgICovXG4gIHBhcnNlKGV4cHJlc3Npb246IHN0cmluZyk6IElBc3Qge1xuICAgIGxldCByZXN1bHQ6IElBc3Q7XG4gICAgdHJ5IHtcbiAgICAgIHJlc3VsdCA9IHRoaXMuX3BhcnNlci5wYXJzZShleHByZXNzaW9uKTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBjb25zb2xlLndhcm4oJ1BhcnNpbmcgRXJyb3InLCBlLm1lc3NhZ2UsICdcXG4nLCBleHByZXNzaW9uKTtcbiAgICAgIHJlc3VsdCA9IHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgLyoqXG4gICAqIFBhcnNlcyB0aGUgc3RyaW5nIGV4cHJlc3Npb24gdXNpbmcgdGhlIHJlc3RyaWN0ZWQgJ2tleScgcGFyc2luZyBydWxlcyxcbiAgICogaW50ZW5kZWQgdG8gcGFyc2UgYmluZGluZ3MgdG8gbW9kZWwga2V5cy5cbiAgICogQXMgdGhleSBtdXN0IGJlIGx2YWx1ZXMgdGhlIHJ1bGVzIGFyZSBtb3JlIGxpbWl0ZWQuXG4gICAqXG4gICAqIEBwYXJhbSBleHByZXNzaW9uXG4gICAqL1xuICBwYXJzZUtleShleHByZXNzaW9uOiBzdHJpbmcpOiBJQXN0IHtcbiAgICBsZXQgcmVzdWx0OiBJQXN0O1xuICAgIHRyeSB7XG4gICAgICByZXN1bHQgPSB0aGlzLl9rZXlQYXJzZXIucGFyc2UoZXhwcmVzc2lvbik7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgY29uc29sZS53YXJuKCdQYXJzaW5nIEVycm9yJywgZS5tZXNzYWdlLCAnXFxuJywgZXhwcmVzc2lvbik7XG4gICAgICByZXN1bHQgPSB1bmRlZmluZWQ7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIC8qKlxuICAgKiBFdmFsdWF0ZSBhbiBBU1QgaW4gdGhlIGdpdmVuIGNvbnRleHQuXG4gICAqXG4gICAqIEBwYXJhbSBhc3QgUGFyc2VkIGV4cHJlc3Npb24gdG8gZXZhbHVhdGVcbiAgICogQHBhcmFtIGNvbnRleHRcbiAgICogQHBhcmFtIGFzT2JzZXJ2YWJsZSBBbHdheXMgY29udmVydHMgcmVzdWx0IHRvIG9ic2VydmFibGVcbiAgICovXG4gIGV2YWx1YXRlKGFzdDogSUFzdCwgY29udGV4dDogQ29udGV4dCwgYXNPYnNlcnZhYmxlOiBib29sZWFuKSB7XG4gICAgaWYgKCFhc3QpIHJldHVybiBhc09ic2VydmFibGUgPyBFTVBUWSA6IHVuZGVmaW5lZDtcblxuICAgIGxldCByZXN1bHQ7XG4gICAgdHJ5IHtcbiAgICAgIHJlc3VsdCA9IHRoaXMuX3J4RXZhbC5ldmFsKGFzdCwgY29udGV4dCk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgY29uc29sZS53YXJuKCdFcnJvciBldmFsdWF0aW5nIGV4cHJlc3Npb246ICcsIGUubWVzc2FnZSk7XG4gICAgICByZXR1cm4gYXNPYnNlcnZhYmxlID8gb2YodW5kZWZpbmVkKSA6IHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICByZXR1cm4gYXNPYnNlcnZhYmxlICYmICFpc09ic2VydmFibGUocmVzdWx0KSA/IG9mKHJlc3VsdCkgOiByZXN1bHQ7XG4gIH1cblxuICAvKipcbiAgICogRXZhbHVhdGVzIGFuIGV4cHJlc3Npb24gdXNpbmcgKmtleSogcGFyc2luZyBydWxlcyBhbmQgcmV0dXJucyBhbmQgbHZhbHVlIG9iamVjdDpcbiAgICoge286IGV2YWx1YXRlZF9vYmplY3QsIG06IG1lbWJlcn1cbiAgICpcbiAgICogQHBhcmFtIGV4cHJlc3Npb25cbiAgICogQHBhcmFtIGNvbnRleHRcbiAgICovXG4gIGx2YWx1ZShleHByZXNzaW9uOiBzdHJpbmcsIGNvbnRleHQ6IENvbnRleHQpOiB7IG8sIG0gfSB7XG4gICAgbGV0IHJlc3VsdDtcblxuICAgIGNvbnN0IGFzdCA9IHRoaXMucGFyc2VLZXkoZXhwcmVzc2lvbik7XG5cbiAgICBpZiAoIWFzdCkgcmV0dXJuIG51bGw7XG4gICAgdHJ5IHtcbiAgICAgIHJlc3VsdCA9IHRoaXMuX3J4RXZhbC5sdmFsdWUoYXN0LCBjb250ZXh0KTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBjb25zb2xlLndhcm4oJ0Vycm9yIGV2YWx1YXRpbmcgZXhwcmVzc2lvbjogJywgZS5tZXNzYWdlKTtcbiAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG5cbiAgLyoqXG4gICAqIEV4cHJlc3Npb24gdmVyc2lvbiBvZiB0aGUgQXJyYXkubWFwIGZ1bmN0aW9uLlxuICAgKiBJIHJlcGxhY2VzIGVhY2ggYXJyYXkvb2JqZWN0IG1lbWJlciB3aXRoIHRoZSByZXN1bHQgb2YgZXZhbHVhdGluZyBhbiBleHByZXNzaW9uLlxuICAgKiBUaGUgZXhwcmVzc2lvbiBnZXRzIGluIGl0cyBldmFsIGNvbnRleHQgdGhlIHZhcmlhYmxlczpcbiAgICogYCRvYmplY3RgIHRoZSBvcmlnaW5hbCBvYmplY3QgYmVpbmcgbWFwZWRcbiAgICogYCR2YWx1ZWAgdGhlIGN1cnJlbnQgdmFsdWVcbiAgICogYCRpbmRleGAgZm9yIGFycmF5cywgdGhlIGN1cnJlbnQgaW5kZXggYmVpbmcgcmVwbGFjZWRcbiAgICogYCRrZXlgIGZvciBvYmplY3RzLCB0aGUgY3VycmVudCBrZXlcbiAgICovXG4gIG1hcEZhY3RvcnkoKSB7XG4gICAgY29uc3Qgc2VsZiA9IHRoaXM7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIG1hcChvYmo6IEFycmF5PGFueT4gfCBPYmplY3QsIGV4cHJlc3Npb246IHN0cmluZyk6IEFycmF5PGFueT4gfCBPYmplY3Qge1xuXG4gICAgICBpZiAoIWV4cHJlc3Npb24gfHwgdHlwZW9mIGV4cHJlc3Npb24gIT09ICdzdHJpbmcnKSByZXR1cm4gb2JqO1xuXG5cbiAgICAgIGNvbnN0IGFzdCA9IHNlbGYuX3BhcnNlci5wYXJzZShleHByZXNzaW9uKTtcbiAgICAgIGlmICghYXN0KSByZXR1cm4gb2JqO1xuXG4gICAgICBpZiAoQXJyYXkuaXNBcnJheShvYmopKSB7XG5cbiAgICAgICAgcmV0dXJuIG9iai5tYXAoKHZhbHVlLCBpbmRleCkgPT5cbiAgICAgICAgICBzZWxmLl9yeEV2YWwuZXZhbChhc3QsIENvbnRleHQuY3JlYXRlKHRoaXMsIHsgLy8gdHNsaW50OmRpc2FibGUtbGluZTpuby1pbnZhbGlkLXRoaXNcbiAgICAgICAgICAgICRvYmplY3Q6IG9iaixcbiAgICAgICAgICAgICR2YWx1ZTogdmFsdWUsXG4gICAgICAgICAgICAkaW5kZXg6IGluZGV4XG4gICAgICAgICAgfSkpKTtcbiAgICAgIH1cbiAgICAgIGlmICh0eXBlb2Ygb2JqID09PSAnb2JqZWN0Jykge1xuXG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IHt9O1xuXG4gICAgICAgIGZvciAoY29uc3QgcHJvcCBpbiBvYmopIC8vIHRzbGludDpkaXNhYmxlLWxpbmU6Zm9yaW5cblxuICAgICAgICAgIHJlc3VsdFtwcm9wXSA9IHNlbGYuX3J4RXZhbC5ldmFsKGFzdCwgQ29udGV4dC5jcmVhdGUodGhpcywgeyAvLyB0c2xpbnQ6ZGlzYWJsZS1saW5lOm5vLWludmFsaWQtdGhpc1xuICAgICAgICAgICAgJG9iamVjdDogb2JqLFxuICAgICAgICAgICAgJHZhbHVlOiBvYmpbcHJvcF0sXG4gICAgICAgICAgICAka2V5OiBwcm9wXG4gICAgICAgICAgfSkpO1xuXG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICB9XG4gICAgICByZXR1cm4gb2JqO1xuICAgIH07XG4gIH1cblxuICAvKipcbiAgKiBFeHByZXNzaW9uIHZlcnNpb24gb2YgdGhlIEFycmF5LnJlZHVjZSBmdW5jdGlvbi5cbiAgICogSSByZXBsYWNlcyBlYWNoIGFycmF5L29iamVjdCBtZW1iZXIgd2l0aCB0aGUgcmVzdWx0IG9mIGV2YWx1YXRpbmcgYW4gZXhwcmVzc2lvbi5cbiAgICogVGhlIGV4cHJlc3Npb24gZ2V0cyBpbiBpdHMgZXZhbCBjb250ZXh0IHRoZSB2YXJpYWJsZXM6XG4gICAqIGAkb2JqZWN0YCB0aGUgb3JpZ2luYWwgb2JqZWN0IGJlaW5nIG1hcGVkXG4gICAqIGAkdmFsdWVgIHRoZSBjdXJyZW50IGVsZW1lbnRcbiAgICogYCRpbmRleGAgZm9yIGFycmF5cywgdGhlIGN1cnJlbnQgaW5kZXggYmVpbmcgcmVwbGFjZWRcbiAgICogYCRrZXlgIGZvciBvYmplY3RzLCB0aGUgY3VycmVudCBrZXlcbiAgICogYCRwcmV2YCB0aGUgcHJldmlvdXNseSByZXR1cm5lZCB2YWx1ZSAodGhlIGFjdW11bGF0aW9uKVxuICAgKiBAcGFyYW0gb2JqXG4gICAqIEBwYXJhbSBleHByZXNzaW9uXG4gICAqIEBwYXJhbSBpbml0VmFsdWVcbiAgICovXG4gIHJlZHVjZUZhY3RvcnkoKSB7XG4gICAgY29uc3Qgc2VsZiA9IHRoaXM7XG5cbiAgICByZXR1cm4gZnVuY3Rpb24gcmVkdWNlKG9iajogQXJyYXk8YW55PiB8IE9iamVjdCwgZXhwcmVzc2lvbjogc3RyaW5nLCBpbml0VmFsdWU6IGFueSk6IEFycmF5PGFueT4gfCBPYmplY3Qge1xuXG4gICAgICBpZiAoIWV4cHJlc3Npb24gfHwgdHlwZW9mIGV4cHJlc3Npb24gIT09ICdzdHJpbmcnKSByZXR1cm4gb2JqO1xuXG4gICAgICBjb25zdCBhc3QgPSBzZWxmLl9wYXJzZXIucGFyc2UoZXhwcmVzc2lvbik7XG4gICAgICBpZiAoIWFzdCkgcmV0dXJuIGluaXRWYWx1ZTtcblxuICAgICAgaWYgKEFycmF5LmlzQXJyYXkob2JqKSkge1xuICAgICAgICByZXR1cm4gb2JqLnJlZHVjZShcbiAgICAgICAgICAocHJldiwgdmFsdWUsIGluZGV4KSA9PlxuXG4gICAgICAgICAgICBzZWxmLl9yeEV2YWwuZXZhbChhc3QsIENvbnRleHQuY3JlYXRlKHRoaXMsIHsgLy8gdHNsaW50OmRpc2FibGUtbGluZTpuby1pbnZhbGlkLXRoaXNcbiAgICAgICAgICAgICAgJG9iamVjdDogb2JqLFxuICAgICAgICAgICAgICAkcHJldjogcHJldixcbiAgICAgICAgICAgICAgJHZhbHVlOiB2YWx1ZSxcbiAgICAgICAgICAgICAgJGluZGV4OiBpbmRleFxuICAgICAgICAgICAgfSkpLCBpbml0VmFsdWUpO1xuICAgICAgfVxuICAgICAgaWYgKHR5cGVvZiBvYmogPT09ICdvYmplY3QnKSB7XG5cbiAgICAgICAgbGV0IHJlc3VsdCA9IGluaXRWYWx1ZTtcblxuICAgICAgICBmb3IgKGNvbnN0IHByb3AgaW4gb2JqKSAvLyB0c2xpbnQ6ZGlzYWJsZS1saW5lOmZvcmluXG5cbiAgICAgICAgICByZXN1bHQgPSBzZWxmLl9yeEV2YWwuZXZhbChhc3QsIENvbnRleHQuY3JlYXRlKHRoaXMsIHsgLy8gdHNsaW50OmRpc2FibGUtbGluZTpuby1pbnZhbGlkLXRoaXNcbiAgICAgICAgICAgICRwcmV2OiByZXN1bHQsXG4gICAgICAgICAgICAkdmFsdWU6IG9ialtwcm9wXSxcbiAgICAgICAgICAgICRrZXk6IHByb3BcbiAgICAgICAgICB9KSk7XG5cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgIH1cbiAgICAgIHJldHVybiBvYmo7XG4gICAgfTtcbiAgfVxufVxuXG5leHBvcnQgY29uc3QgZXhwcmVzc2lvblByb3ZpZGVyID0ge1xuICBwcm92aWRlOiBFeHByZXNzaW9ucyxcbiAgdXNlQ2xhc3M6IEVTcHJlc3Npb25cbn07XG4iLCIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxOCBBZHJpYW4gUGFuZWxsYSA8aWFuY2hpNzRAb3V0bG9vay5jb20+XG4gKlxuICogVGhpcyBzb2Z0d2FyZSBpcyByZWxlYXNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuXG4gKiBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL01JVFxuICovXG5cbmltcG9ydCB7IENvbXBvbmVudCwgVmlld0VuY2Fwc3VsYXRpb24sIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDaGFuZ2VEZXRlY3RvclJlZn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBBYnN0cmFjdFdpZGdldCB9IGZyb20gJy4vYWJzdHJhY3R3aWRnZXQnO1xuaW1wb3J0IHsgRXhwcmVzc2lvbnMgfSBmcm9tICcuL2V4cHJlc3Npb25zJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnd2RnLWRlZmF1bHQnLFxuICB0ZW1wbGF0ZTogJzxkaXY+VW5rbm93biB3aWRnZXQgXCJ7e3R5cGV9fVwiPC9kaXY+JyxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcbn0pXG5leHBvcnQgY2xhc3MgRGVmYXVsdFdpZGdldENvbXBvbmVudCBleHRlbmRzIEFic3RyYWN0V2lkZ2V0IHtcblxuICBjb25zdHJ1Y3RvcihjZHI6IENoYW5nZURldGVjdG9yUmVmLCBleHByOiBFeHByZXNzaW9ucykge1xuICAgIHN1cGVyKGNkciwgZXhwcik7XG4gIH1cbn1cbiIsIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDE4IEFkcmlhbiBQYW5lbGxhIDxpYW5jaGk3NEBvdXRsb29rLmNvbT5cbiAqXG4gKiBUaGlzIHNvZnR3YXJlIGlzIHJlbGVhc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS5cbiAqIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvTUlUXG4gKi9cblxuaW1wb3J0IHsgVHlwZSwgSW5qZWN0LCBJbmplY3Rpb25Ub2tlbiwgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQWJzdHJhY3RXaWRnZXQgfSBmcm9tICcuL2Fic3RyYWN0d2lkZ2V0JztcbmltcG9ydCB7IERlZmF1bHRXaWRnZXRDb21wb25lbnQgfSBmcm9tICcuL2RlZmF1bHR3aWRnZXQuY29tcG9uZW50JztcblxuZXhwb3J0IGNvbnN0IEFGX0NPTkZJR19UT0tFTiA9IG5ldyBJbmplY3Rpb25Ub2tlbjxJQXV0b0Zvcm1Db25maWc+KCdBRl9DT05GSUdfVE9LRU4nKTtcblxuXG5leHBvcnQgaW50ZXJmYWNlIElXaWRnZXRDb25mIHtcbiAgdHlwZTogc3RyaW5nO1xuICBjb21wb25lbnQ6IFR5cGU8QWJzdHJhY3RXaWRnZXQ+O1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIElBdXRvRm9ybUNvbmZpZyB7XG4gIHdpZGdldHM/OiBJV2lkZ2V0Q29uZltdIHwgSVdpZGdldENvbmY7XG59XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIFdpZGdldFJlZ2lzdHJ5IHtcblxuICBwcml2YXRlIF9yZWdpc3RyeSA9IG5ldyBNYXA8c3RyaW5nLCBUeXBlPEFic3RyYWN0V2lkZ2V0Pj4oKTtcblxuICBwcml2YXRlIF9kZWZhdWx0OiBUeXBlPEFic3RyYWN0V2lkZ2V0PjtcblxuXG4gIGNvbnN0cnVjdG9yKEBJbmplY3QoQUZfQ09ORklHX1RPS0VOKSBjb25maWdzOiBJQXV0b0Zvcm1Db25maWdbXSA9IFtdKSB7XG5cbiAgICBjb25maWdzLmZvckVhY2goY29uZiA9PiBjb25mLndpZGdldHMgJiYgdGhpcy5yZWdpc3Rlcihjb25mLndpZGdldHMpKTtcblxuICAgIHRoaXMuX2RlZmF1bHQgPSB0aGlzLl9yZWdpc3RyeS5nZXQoJ2RlZmF1bHQnKSB8fCBEZWZhdWx0V2lkZ2V0Q29tcG9uZW50O1xuICB9XG5cbiAgcmVnaXN0ZXIod2lkZ2V0czogSVdpZGdldENvbmZbXSB8IElXaWRnZXRDb25mKSB7XG4gICAgaWYgKCF3aWRnZXRzKSByZXR1cm47XG4gICAgaWYgKCFBcnJheS5pc0FycmF5KHdpZGdldHMpKSB3aWRnZXRzID0gW3dpZGdldHNdO1xuXG4gICAgd2lkZ2V0cy5mb3JFYWNoKHdpZGdldCA9PiB7XG4gICAgICBpZiAod2lkZ2V0LnR5cGUgJiYgd2lkZ2V0LmNvbXBvbmVudCkgdGhpcy5fcmVnaXN0cnkuc2V0KHdpZGdldC50eXBlLCB3aWRnZXQuY29tcG9uZW50KTtcbiAgICB9KTtcbiAgfVxuXG5cblxuXG4gIGdldCh0eXBlOiBzdHJpbmcpOiBUeXBlPEFic3RyYWN0V2lkZ2V0PiB7XG4gICAgcmV0dXJuIHRoaXMuX3JlZ2lzdHJ5LmdldCh0eXBlKSB8fCB0aGlzLl9kZWZhdWx0O1xuICB9XG5cbn1cbiIsImltcG9ydCB7XG4gIERpcmVjdGl2ZSwgSW5wdXQsXG4gIFZpZXdDb250YWluZXJSZWYsXG4gIENvbXBvbmVudEZhY3RvcnlSZXNvbHZlciwgQ29tcG9uZW50UmVmLFxuICBPbkNoYW5nZXMsIE9uRGVzdHJveSwgT3B0aW9uYWwsIEluamVjdCwgSW5qZWN0aW9uVG9rZW4sXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgV2lkZ2V0UmVnaXN0cnkgfSBmcm9tICcuL3dpZGdldHJlZ2lzdHJ5LnNlcnZpY2UnO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBBYnN0cmFjdFdpZGdldCwgcGFyc2VEZWZPYmplY3QgfSBmcm9tICcuL2Fic3RyYWN0d2lkZ2V0JztcbmltcG9ydCB7IElXaWRnZXREZWYgfSBmcm9tICcuL3dpZGdldC5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgQ29udGV4dCB9IGZyb20gJy4vY29udGV4dCc7XG5pbXBvcnQgeyBFeHByZXNzaW9ucyB9IGZyb20gJy4vZXhwcmVzc2lvbnMnO1xuXG4vKiogSW5qZWN0aW9uIHRva2VuIHVzZWQgdG8gcHJvdmlkZSB0aGUgZGVmYXVsdCByb290IGNvbnRleHQgZm9yIHdpZGdldHMgKi9cbmV4cG9ydCBjb25zdCBST09UX0NPTlRFWFQgPSBuZXcgSW5qZWN0aW9uVG9rZW48Q29udGV4dD4oJ1dpZGdldHMgUm9vdCBDb250ZXh0Jyk7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1t3ZGdXaWRnZXRdJ1xufSlcbmV4cG9ydCBjbGFzcyBXaWRnZXREaXJlY3RpdmUgaW1wbGVtZW50cyBPbkNoYW5nZXMsIE9uRGVzdHJveSB7XG5cbiAgQElucHV0KCkgd2RnV2lkZ2V0OiBJV2lkZ2V0RGVmO1xuICBASW5wdXQoKSBwYXJlbnRDb250ZXh0OiBDb250ZXh0O1xuXG4gIHdpZGdldDogQWJzdHJhY3RXaWRnZXQ7XG4gIGNvbnRleHQ6IENvbnRleHQ7XG4gIHByaXZhdGUgX3dpZGdldFJlZjogQ29tcG9uZW50UmVmPEFic3RyYWN0V2lkZ2V0PjtcbiAgcHJpdmF0ZSBfaWZTdWJzOiBTdWJzY3JpcHRpb247XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBfY29udGFpbmVyOiBWaWV3Q29udGFpbmVyUmVmLFxuICAgIHByaXZhdGUgX3JlZ2lzdHJ5OiBXaWRnZXRSZWdpc3RyeSxcbiAgICBwcml2YXRlIF9jZnI6IENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcixcbiAgICBAT3B0aW9uYWwoKSBASW5qZWN0KFJPT1RfQ09OVEVYVCkgcHJpdmF0ZSBfcm9vdENvbnRleHQ6IENvbnRleHQsXG4gICAgcHJpdmF0ZSBfZXhwcjogRXhwcmVzc2lvbnNcbiAgKSB7XG4gIH1cblxuICBuZ09uQ2hhbmdlcygpIHtcblxuICAgIHRoaXMuX3ByZUNyZWF0ZSgpO1xuXG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLl9kZXN0cm95KCk7XG4gICAgdGhpcy5fdW5zdXNjcmliZSgpO1xuICB9XG5cbiAgcHJpdmF0ZSBfcHJlQ3JlYXRlKCkge1xuICAgIHRoaXMud2RnV2lkZ2V0ID0gdGhpcy53ZGdXaWRnZXQgfHwgeyB0eXBlOiAnbm9uZScgfTtcbiAgICB0aGlzLnBhcmVudENvbnRleHQgPSB0aGlzLnBhcmVudENvbnRleHQgfHwgdGhpcy5fcm9vdENvbnRleHQ7XG4gICAgdGhpcy5jb250ZXh0ID0gQ29udGV4dC5jcmVhdGUodGhpcy5wYXJlbnRDb250ZXh0LCBwYXJzZURlZk9iamVjdCh0aGlzLndkZ1dpZGdldC5jb250ZXh0LCB0aGlzLnBhcmVudENvbnRleHQsIGZhbHNlLCB0aGlzLl9leHByKSk7XG5cbiAgICB0aGlzLl9kZXN0cm95KCk7XG4gICAgdGhpcy5fdW5zdXNjcmliZSgpO1xuXG4gICAgaWYgKHRoaXMud2RnV2lkZ2V0LmlmKSB7XG4gICAgICB0aGlzLl9pZlN1YnMgPSB0aGlzLl9leHByLmV2YWwodGhpcy53ZGdXaWRnZXQuaWYsIHRoaXMuY29udGV4dCwgdHJ1ZSkuc3Vic2NyaWJlKGNvbmQgPT4ge1xuICAgICAgICBpZiAoY29uZCAmJiAhdGhpcy5fd2lkZ2V0UmVmKSB0aGlzLl9jcmVhdGUoKTtcbiAgICAgICAgZWxzZSB0aGlzLl9kZXN0cm95KCk7XG4gICAgICB9KTtcbiAgICB9IGVsc2UgdGhpcy5fY3JlYXRlKCk7XG5cblxuICB9XG5cbiAgcHJpdmF0ZSBfY3JlYXRlKCkge1xuXG4gICAgY29uc3Qgd2lkZ2V0Q2xhc3MgPSB0aGlzLl9yZWdpc3RyeS5nZXQodGhpcy53ZGdXaWRnZXQudHlwZSk7XG4gICAgY29uc3QgZmFjdG9yeSA9IHRoaXMuX2Nmci5yZXNvbHZlQ29tcG9uZW50RmFjdG9yeSh3aWRnZXRDbGFzcyk7XG4gICAgdGhpcy5fd2lkZ2V0UmVmID0gdGhpcy5fY29udGFpbmVyLmNyZWF0ZUNvbXBvbmVudChmYWN0b3J5KTtcbiAgICB0aGlzLndpZGdldCA9IHRoaXMuX3dpZGdldFJlZi5pbnN0YW5jZTtcblxuICAgIHRoaXMud2lkZ2V0LnNldHVwKHRoaXMsIHRoaXMud2RnV2lkZ2V0LCB0aGlzLmNvbnRleHQpO1xuXG4gIH1cblxuICBwcml2YXRlIF9kZXN0cm95KCkge1xuICAgIGlmICh0aGlzLl93aWRnZXRSZWYpIHtcbiAgICAgIHRoaXMuX3dpZGdldFJlZi5kZXN0cm95KCk7XG4gICAgICB0aGlzLl93aWRnZXRSZWYgPSBudWxsO1xuICAgIH1cblxuICB9XG5cbiAgcHJpdmF0ZSBfdW5zdXNjcmliZSgpIHtcblxuICAgIGlmICh0aGlzLl9pZlN1YnMpIHtcbiAgICAgIHRoaXMuX2lmU3Vicy51bnN1YnNjcmliZSgpO1xuICAgICAgdGhpcy5faWZTdWJzID0gbnVsbDtcbiAgICB9XG4gIH1cbn1cbiIsIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDE4IEFkcmlhbiBQYW5lbGxhIDxpYW5jaGk3NEBvdXRsb29rLmNvbT5cbiAqXG4gKiBUaGlzIHNvZnR3YXJlIGlzIHJlbGVhc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS5cbiAqIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvTUlUXG4gKi9cblxuaW1wb3J0IHsgZm9ybWF0TnVtYmVyLCBmb3JtYXREYXRlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IFBpcGUsIFBpcGVUcmFuc2Zvcm0gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuLyoqIEFuZ3VsYXIgUGlwZSB0byBmb3JtYXQgdGV4dCAqL1xuQFBpcGUoe1xuICBuYW1lOiAnZm9ybWF0JyxcbiAgcHVyZTogdHJ1ZVxufSlcbmV4cG9ydCBjbGFzcyBGb3JtYXRQaXBlIGltcGxlbWVudHMgUGlwZVRyYW5zZm9ybSB7XG4gIHRyYW5zZm9ybSh2YWx1ZTogYW55LCBmb3JtYXQ6IGFueSkge1xuICAgIHJldHVybiBmb3JtYXQgPyBmb3JtYXRWYWx1ZSh2YWx1ZSwgZm9ybWF0KSA6IHZhbHVlO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBmb3JtYXRWYWx1ZSh2YWx1ZTogYW55LCBmb3JtYXQ6IHN0cmluZykge1xuICBpZiAodHlwZW9mIGZvcm1hdCAhPT0gJ3N0cmluZycgfHwgdmFsdWUgPT0gbnVsbCkgcmV0dXJuIHZhbHVlO1xuICBjb25zdCByZSA9IC9eXFxzKihcXHcrKVxccyooOihbXCInXSkoW15cIiddKilcXDMpPyQvO1xuXG4gIGNvbnN0IG1hdGNoOiBSZWdFeHBFeGVjQXJyYXkgPSByZS5leGVjKGZvcm1hdCk7XG5cbiAgaWYgKCFtYXRjaFswXSkgcmV0dXJuIHZhbHVlO1xuXG4gIHN3aXRjaCAobWF0Y2hbMV0udG9VcHBlckNhc2UoKSkge1xuICAgIGNhc2UgJ05VTUJFUic6XG4gICAgICBsZXQgbnVtO1xuICAgICAgbnVtID0gcGFyc2VGbG9hdCh2YWx1ZSk7XG4gICAgICByZXR1cm4gaXNOYU4obnVtKSA/IHZhbHVlIDogZm9ybWF0TnVtYmVyKG51bSwgJ2VuLVVTJywgbWF0Y2hbNF0pO1xuICAgIGNhc2UgJ0RBVEUnOlxuICAgICAgcmV0dXJuIGZvcm1hdERhdGUodmFsdWUsIG1hdGNoWzRdLCAnZW4tVVMnKTtcbiAgfVxuXG4gIHJldHVybiB2YWx1ZTtcbn1cbiIsIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDE4IEFkcmlhbiBQYW5lbGxhIDxpYW5jaGk3NEBvdXRsb29rLmNvbT5cbiAqXG4gKiBUaGlzIHNvZnR3YXJlIGlzIHJlbGVhc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS5cbiAqIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvTUlUXG4gKi9cblxuaW1wb3J0IHsgQ29tcG9uZW50LCBWaWV3RW5jYXBzdWxhdGlvbiwgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQWN0aXZhdGVkUm91dGUgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgSVdpZGdldERlZiB9IGZyb20gJy4vd2lkZ2V0LmludGVyZmFjZSc7XG5pbXBvcnQgeyBDb250ZXh0IH0gZnJvbSAnLi9jb250ZXh0JztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnd2RnLXdpZGdldCcsXG4gIHRlbXBsYXRlOiAnPG5nLWNvbnRhaW5lciBbd2RnV2lkZ2V0XT1cIndpZGdldERlZlwiIFtwYXJlbnRDb250ZXh0XT1cInBhcmVudENvbnRleHRcIj48L25nLWNvbnRhaW5lcj4nLFxuXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXG59KVxuZXhwb3J0IGNsYXNzIFJvdXRlZFdpZGdldENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgd2lkZ2V0RGVmOiBJV2lkZ2V0RGVmO1xuICBwYXJlbnRDb250ZXh0OiBDb250ZXh0O1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX3JvdXRlOiBBY3RpdmF0ZWRSb3V0ZSkgeyB9XG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMud2lkZ2V0RGVmID0gdGhpcy5fcm91dGUuc25hcHNob3QuZGF0YS53aWRnZXREZWYgfHwgeyB0eXBlOiAnZW1wdHknIH07XG4gICAgdGhpcy5wYXJlbnRDb250ZXh0ID0gdGhpcy5fcm91dGUuc25hcHNob3QuZGF0YS5wYXJlbnRDb250ZXh0O1xuICB9XG5cbn1cbiIsIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDE4IEFkcmlhbiBQYW5lbGxhIDxpYW5jaGk3NEBvdXRsb29rLmNvbT5cbiAqXG4gKiBUaGlzIHNvZnR3YXJlIGlzIHJlbGVhc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS5cbiAqIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvTUlUXG4gKi9cblxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE5nTW9kdWxlLCBNb2R1bGVXaXRoUHJvdmlkZXJzLCBBTkFMWVpFX0ZPUl9FTlRSWV9DT01QT05FTlRTIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IERlZmF1bHRXaWRnZXRDb21wb25lbnQgfSBmcm9tICcuL2RlZmF1bHR3aWRnZXQuY29tcG9uZW50JztcbmltcG9ydCB7IEFGX0NPTkZJR19UT0tFTiwgSUF1dG9Gb3JtQ29uZmlnIH0gZnJvbSAnLi93aWRnZXRyZWdpc3RyeS5zZXJ2aWNlJztcbmltcG9ydCB7IFdpZGdldERpcmVjdGl2ZSB9IGZyb20gJy4vd2lkZ2V0LmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBGb3JtYXRQaXBlIH0gZnJvbSAnLi9mb3JtYXQnO1xuaW1wb3J0IHsgUm91dGVkV2lkZ2V0Q29tcG9uZW50IH0gZnJvbSAnLi9yb3V0ZWR3aWRnZXQuY29tcG9uZW50JztcblxuQE5nTW9kdWxlKHtcblxuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlXSxcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgV2lkZ2V0RGlyZWN0aXZlLFxuICAgIFJvdXRlZFdpZGdldENvbXBvbmVudCxcbiAgICBEZWZhdWx0V2lkZ2V0Q29tcG9uZW50LFxuICAgIEZvcm1hdFBpcGVcbiAgXSxcbiAgZW50cnlDb21wb25lbnRzOiBbRGVmYXVsdFdpZGdldENvbXBvbmVudF0sXG4gIGV4cG9ydHM6IFtcbiAgICBXaWRnZXREaXJlY3RpdmUsXG4gICAgUm91dGVkV2lkZ2V0Q29tcG9uZW50LFxuICAgIEZvcm1hdFBpcGVcbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBXaWRnZXRzQ29yZU1vZHVsZSB7XG5cbiAgc3RhdGljIGZvclJvb3QoY29uZmlnOiBJQXV0b0Zvcm1Db25maWcgPSB7fSk6IE1vZHVsZVdpdGhQcm92aWRlcnMge1xuICAgIHJldHVybiB7XG4gICAgICBuZ01vZHVsZTogV2lkZ2V0c0NvcmVNb2R1bGUsXG4gICAgICBwcm92aWRlcnM6IFtcbiAgICAgICAgeyBwcm92aWRlOiBBRl9DT05GSUdfVE9LRU4sIHVzZVZhbHVlOiBjb25maWcsIG11bHRpOiB0cnVlIH0sXG4gICAgICAgIHsgcHJvdmlkZTogQU5BTFlaRV9GT1JfRU5UUllfQ09NUE9ORU5UUywgdXNlVmFsdWU6IGNvbmZpZywgbXVsdGk6IHRydWUgfVxuICAgICAgXVxuICAgIH07XG4gIH1cbn1cblxuXG4iLCIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxOCBBZHJpYW4gUGFuZWxsYSA8aWFuY2hpNzRAb3V0bG9vay5jb20+XG4gKlxuICogVGhpcyBzb2Z0d2FyZSBpcyByZWxlYXNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuXG4gKiBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL01JVFxuICovXG5cbmltcG9ydCB7IEZvcm1Db250cm9sLCBGb3JtR3JvdXAsIEZvcm1BcnJheSwgQWJzdHJhY3RDb250cm9sIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0b3JSZWZ9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgR0VUX09CU0VSVkFCTEUsIGlzUmVhY3RpdmUsIElOb2RlIH0gZnJvbSAnZXNwcmVzc2lvbic7XG5pbXBvcnQgeyB0YWtlLCBtYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBBYnN0cmFjdFdpZGdldCB9IGZyb20gJy4vYWJzdHJhY3R3aWRnZXQnO1xuaW1wb3J0IHsgQ29udGV4dCB9IGZyb20gJy4vY29udGV4dCc7XG5pbXBvcnQgeyBFeHByZXNzaW9ucyB9IGZyb20gJy4vZXhwcmVzc2lvbnMnO1xuaW1wb3J0IHsgSVdpZGdldERlZiB9IGZyb20gJy4vd2lkZ2V0LmludGVyZmFjZSc7XG5cblxuZXhwb3J0IGNvbnN0IEZPUk1fQ09OVFJPTCA9IFN5bWJvbCgnRm9ybUNvbnRyb2wnKTtcbmV4cG9ydCBjbGFzcyBBYnN0cmFjdEZvcm1GaWVsZFdpZGdldCBleHRlbmRzIEFic3RyYWN0V2lkZ2V0IHtcblxuXG4gIGZvcm1Db250cm9sOiBGb3JtQ29udHJvbDtcblxuICB2YWxpZGF0ZTogSU5vZGU7XG4gIHZhbGlkYXRlQ29udGV4dDogQ29udGV4dDtcbiAgY29uc3RydWN0b3IoY2RyOiBDaGFuZ2VEZXRlY3RvclJlZiwgZXhwcjogRXhwcmVzc2lvbnMpIHtcbiAgICBzdXBlcihjZHIsIGV4cHIpO1xuICB9XG4gIGR5bk9uU2V0dXAoZGVmOiBJV2lkZ2V0RGVmKTogSVdpZGdldERlZiB7XG5cbiAgICAvLyBnZXQgYm91bmQgbW9kZWxcbiAgICBpZiAoIWRlZi5iaW5kKVxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdGb3JtIGZpZWxkIHdpZGdldHMgbXVzdCBoYXZlIGEgXCJiaW5kXCIgcHJvcGVydHkgZGVmaW5lZCcpO1xuXG4gICAgY29uc3QgbHZhbHVlID0gdGhpcy5fZXhwci5sdmFsdWUoZGVmLmJpbmQsIHRoaXMuY29udGV4dCk7XG5cbiAgICBpZiAoIWx2YWx1ZSlcbiAgICAgIHRocm93IG5ldyBFcnJvcignRm9ybSBmaWVsZCBcImJpbmRcIiBwcm9wZXJ0eSBtdXN0IGJlIGFuIGlkZW50aWZpZXIgb3IgbWVtYmVyIGV4cHJlc3Npb24nKTtcblxuICAgIGlmICghaXNSZWFjdGl2ZShsdmFsdWUubykpXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0JvdW5kIEtleSBtdXN0IGJlIG9mIFJlYWN0aXZlIFR5cGUnKTtcblxuXG4gICAgLy8gc2V0dXAgdmFsaWRhdGlvblxuXG5cbiAgICBpZiAoZGVmLnZhbGlkYXRlICYmICh0aGlzLnZhbGlkYXRlID0gdGhpcy5fZXhwci5wYXJzZShkZWYudmFsaWRhdGUpKSkgey8vIHRzbGludDpkaXNhYmxlLWxpbmU6d2hpdGVzcGFjZVxuICAgICAgdGhpcy52YWxpZGF0ZUNvbnRleHQgPSBDb250ZXh0LmNyZWF0ZSh0aGlzLmNvbnRleHQpO1xuXG4gICAgICB0aGlzLmZvcm1Db250cm9sID0gbmV3IEZvcm1Db250cm9sKG51bGwsIG51bGwsIChjdHJsOiBBYnN0cmFjdENvbnRyb2wpID0+IHtcbiAgICAgICAgdGhpcy52YWxpZGF0ZUNvbnRleHRbJyR2YWx1ZSddID0gY3RybC52YWx1ZTtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2V4cHIuZXZhbHVhdGUodGhpcy52YWxpZGF0ZSwgdGhpcy52YWxpZGF0ZUNvbnRleHQsIHRydWUpLnBpcGUoXG4gICAgICAgICAgdGFrZSgxKSxcbiAgICAgICAgICBtYXAocmVzID0+IHtcbiAgICAgICAgICAgIHJldHVybiByZXMgPyBudWxsIDogeyB2YWxpZGF0ZTogJ3ZhbGlkYXRpb24gZXJyb3InIH07XG4gICAgICAgICAgfSlcbiAgICAgICAgKTtcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB0aGlzLmZvcm1Db250cm9sID0gbmV3IEZvcm1Db250cm9sKCk7XG5cbiAgICBjb25zdCBwYXJlbnRGb3JtOiBGb3JtR3JvdXAgfCBGb3JtQXJyYXkgPSB0aGlzLmNvbnRleHRbRk9STV9DT05UUk9MXTtcbiAgICBpZiAocGFyZW50Rm9ybSkge1xuICAgICAgaWYgKHBhcmVudEZvcm0gaW5zdGFuY2VvZiBGb3JtR3JvdXApIHBhcmVudEZvcm0uYWRkQ29udHJvbChsdmFsdWUubSwgdGhpcy5mb3JtQ29udHJvbCk7XG4gICAgICBlbHNlIGlmIChwYXJlbnRGb3JtIGluc3RhbmNlb2YgRm9ybUFycmF5KSBwYXJlbnRGb3JtLnB1c2godGhpcy5mb3JtQ29udHJvbCk7XG4gICAgfVxuXG4gICAgLy8gbGlzdGVuIHRvIGJvdW5kIGNvbnRleHQgdmFsdWUgYW5kIHVwZGF0ZSBvbiBjaGFuZ2VzXG4gICAgdGhpcy5hZGRTdWJzY3JpcHRpb24gPSBsdmFsdWUub1tHRVRfT0JTRVJWQUJMRV0obHZhbHVlLm0pLnN1YnNjcmliZSh2YWwgPT5cbiAgICAgIHZhbCAhPT0gdGhpcy5mb3JtQ29udHJvbC52YWx1ZSAmJiB0aGlzLmZvcm1Db250cm9sLnNldFZhbHVlKHZhbCkpO1xuXG4gICAgLy8gbGlzdGVuIHRvIGNvbnRyb2wgY2hhbmdlcyB0byB1cGRhdGUgYm91bmQgY29udGV4dCB2YWx1ZVxuICAgIHRoaXMuYWRkU3Vic2NyaXB0aW9uID0gdGhpcy5mb3JtQ29udHJvbC52YWx1ZUNoYW5nZXMuc3Vic2NyaWJlKHZhbCA9PiB7XG4gICAgICBpZiAodmFsICE9PSBsdmFsdWUub1tsdmFsdWUubV0pXG4gICAgICAgIGx2YWx1ZS5vW2x2YWx1ZS5tXSA9IHZhbDtcbiAgICB9KTtcblxuXG4gICAgcmV0dXJuIGRlZjtcbiAgfVxufVxuIiwiLyohXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTcgQWRyaWFuIFBhbmVsbGEgPGlhbmNoaTc0QG91dGxvb2suY29tPiwgY29udHJpYnV0b3JzLlxuICogTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlLlxuICovXG5cbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgUmVhY3RpdmVGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcblxuaW1wb3J0IHsgTWF0QnV0dG9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvYnV0dG9uJztcbmltcG9ydCB7IE1hdERpYWxvZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2RpYWxvZyc7XG5pbXBvcnQgeyBNYXRJY29uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvaWNvbic7XG5pbXBvcnQgeyBNYXRJbnB1dE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2lucHV0JztcbmltcG9ydCB7IE1hdExpc3RNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9saXN0JztcbmltcG9ydCB7IE1hdFNpZGVuYXZNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9zaWRlbmF2JztcbmltcG9ydCB7IE1hdENhcmRNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9jYXJkJztcbmltcG9ydCB7IE1hdFRvb2xiYXJNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC90b29sYmFyJztcbmltcG9ydCB7IE1hdFByb2dyZXNzQmFyTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvcHJvZ3Jlc3MtYmFyJztcbmltcG9ydCB7IE1hdEV4cGFuc2lvbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2V4cGFuc2lvbic7XG5pbXBvcnQgeyBNYXRTZWxlY3RNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9zZWxlY3QnO1xuaW1wb3J0IHsgTWF0VGFic01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL3RhYnMnO1xuaW1wb3J0IHsgTWF0U25hY2tCYXJNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9zbmFjay1iYXInO1xuaW1wb3J0IHsgTWF0U2xpZGVUb2dnbGVNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9zbGlkZS10b2dnbGUnO1xuaW1wb3J0IHsgTWF0Q2hpcHNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9jaGlwcyc7XG5pbXBvcnQgeyBNYXRBdXRvY29tcGxldGVNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9hdXRvY29tcGxldGUnO1xuaW1wb3J0IHsgTWF0Q2hlY2tib3hNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9jaGVja2JveCc7XG5pbXBvcnQgeyBNYXRTbGlkZXJNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9zbGlkZXInO1xuaW1wb3J0IHsgTWF0VGFibGVNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC90YWJsZSc7XG5pbXBvcnQgeyBNYXRQYWdpbmF0b3JNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9wYWdpbmF0b3InO1xuaW1wb3J0IHsgTWF0U29ydE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL3NvcnQnO1xuaW1wb3J0IHsgTWF0TWVudU1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL21lbnUnO1xuXG4vKipcbiAqIEhlbHBlciBtb2R1bGUgdG8gY2VudHJhbGx5IGltcG9ydCBhbGwgbWF0ZXJpYWwgY29tcG9uZW50c1xuICovXG5ATmdNb2R1bGUoe1xuICBleHBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIFJlYWN0aXZlRm9ybXNNb2R1bGUsXG5cbiAgICBNYXRBdXRvY29tcGxldGVNb2R1bGUsXG4gICAgTWF0U2lkZW5hdk1vZHVsZSxcbiAgICBNYXRCdXR0b25Nb2R1bGUsXG4gICAgTWF0SWNvbk1vZHVsZSxcbiAgICBNYXRMaXN0TW9kdWxlLFxuICAgIE1hdElucHV0TW9kdWxlLFxuICAgIE1hdERpYWxvZ01vZHVsZSxcbiAgICBNYXRUb29sYmFyTW9kdWxlLFxuICAgIE1hdFByb2dyZXNzQmFyTW9kdWxlLFxuICAgIE1hdEV4cGFuc2lvbk1vZHVsZSxcbiAgICBNYXRTZWxlY3RNb2R1bGUsXG4gICAgTWF0VGFic01vZHVsZSxcbiAgICBNYXRTbmFja0Jhck1vZHVsZSxcbiAgICBNYXRTbGlkZVRvZ2dsZU1vZHVsZSxcbiAgICBNYXRDaGlwc01vZHVsZSxcbiAgICBNYXRDYXJkTW9kdWxlLFxuICAgIE1hdENoZWNrYm94TW9kdWxlLFxuICAgIE1hdFNsaWRlck1vZHVsZSxcbiAgICBNYXRUYWJsZU1vZHVsZSxcbiAgICBNYXRQYWdpbmF0b3JNb2R1bGUsXG4gICAgTWF0U29ydE1vZHVsZSxcbiAgICBNYXRNZW51TW9kdWxlLFxuICBdXG59KVxuZXhwb3J0IGNsYXNzIE1hdGVyaWFsTW9kdWxlIHsgfVxuIiwiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTggQWRyaWFuIFBhbmVsbGEgPGlhbmNoaTc0QG91dGxvb2suY29tPlxuICpcbiAqIFRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLlxuICogaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9NSVRcbiAqL1xuXG5cbmltcG9ydCB7IENvbXBvbmVudCwgVmlld0VuY2Fwc3VsYXRpb24sIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDaGFuZ2VEZXRlY3RvclJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRXhwcmVzc2lvbnMsIEFic3RyYWN0Rm9ybUZpZWxkV2lkZ2V0IH0gZnJvbSAnLi4vLi4vLi4vY29yZS9pbmRleCc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3dkZy1pbnB1dCcsXG4gIHRlbXBsYXRlOiBgPG1hdC1mb3JtLWZpZWxkIHN0eWxlLndpZHRoPVwiMTAwJVwiPlxuXG4gICAgPG1hdC1sYWJlbCAqbmdJZj1cInRpdGxlXCI+XG4gICAgICAgIHt7IHRpdGxlIH19XG4gICAgPC9tYXQtbGFiZWw+XG5cbiAgICA8aW5wdXQgbWF0SW5wdXRcbiAgICAgICAgICAgbmFtZT1cImFhYVwiXG4gICAgICAgICAgIFt0eXBlXT1cInR5cGUgfHwgJ3RleHQnXCJcbiAgICAgICAgICAgW2Zvcm1Db250cm9sXT1cImZvcm1Db250cm9sXCJcbiAgICAgICAgICAgW3BsYWNlaG9sZGVyXT1cInBsYWNlaG9sZGVyXCJcbiAgICAgICAgICAgW3JlcXVpcmVkXT1cInJlcXVpcmVkXCI+XG5cbiAgICA8bWF0LWVycm9yIFtpZF09XCJudWxsXCI+XG5cbiAgICA8L21hdC1lcnJvcj5cblxuICAgIDxtYXQtaGludCAqbmdJZj1cImRlc2NyaXB0aW9uXCJcbiAgICAgICAgICAgICAgW2lkXT1cIm51bGxcIj5cbiAgICAgICAge3sgZGVzY3JpcHRpb24gfX1cbiAgICA8L21hdC1oaW50PlxuXG48L21hdC1mb3JtLWZpZWxkPlxuYCxcbiAgc3R5bGVzOiBbYGBdLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBJbnB1dFdpZGdldENvbXBvbmVudCBleHRlbmRzIEFic3RyYWN0Rm9ybUZpZWxkV2lkZ2V0IHtcblxuICB0aXRsZTogc3RyaW5nO1xuICBkZXNjcmlwdGlvbjogc3RyaW5nO1xuICBwbGFjZWhvbGRlcjogc3RyaW5nO1xuICByZXF1aXJlZDogYm9vbGVhbjtcblxuICBjb25zdHJ1Y3RvcihjZHI6IENoYW5nZURldGVjdG9yUmVmLCBleHByOiBFeHByZXNzaW9ucykge1xuICAgIHN1cGVyKGNkciwgZXhwcik7XG4gIH1cblxufVxuIiwiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTggQWRyaWFuIFBhbmVsbGEgPGlhbmNoaTc0QG91dGxvb2suY29tPlxuICpcbiAqIFRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLlxuICogaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9NSVRcbiAqL1xuXG5cbmltcG9ydCB7IENvbXBvbmVudCwgVmlld0VuY2Fwc3VsYXRpb24sIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDaGFuZ2VEZXRlY3RvclJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRXhwcmVzc2lvbnMsIEFic3RyYWN0Rm9ybUZpZWxkV2lkZ2V0IH0gZnJvbSAnLi4vLi4vLi4vY29yZS9pbmRleCc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3dkZy1jaGVja2JveCcsXG4gIHRlbXBsYXRlOiBgPG1hdC1jaGVja2JveCBsYWJlbFBvc2l0aW9uPVwiYmVmb3JlXCIgW2Zvcm1Db250cm9sXT1cImZvcm1Db250cm9sXCI+XG4gIHt7dGl0bGV9fVxuPC9tYXQtY2hlY2tib3g+XG5gLFxuICBzdHlsZXM6IFtgYF0sXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXG59KVxuZXhwb3J0IGNsYXNzIENoZWNrYm94V2lkZ2V0Q29tcG9uZW50IGV4dGVuZHMgQWJzdHJhY3RGb3JtRmllbGRXaWRnZXQge1xuICB0aXRsZTogc3RyaW5nO1xuICBjb25zdHJ1Y3RvcihjZHI6IENoYW5nZURldGVjdG9yUmVmLCBleHByOiBFeHByZXNzaW9ucykge1xuICAgIHN1cGVyKGNkciwgZXhwcik7XG4gIH1cblxufVxuIiwiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTggQWRyaWFuIFBhbmVsbGEgPGlhbmNoaTc0QG91dGxvb2suY29tPlxuICpcbiAqIFRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLlxuICogaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9NSVRcbiAqL1xuXG5cbmltcG9ydCB7IENvbXBvbmVudCwgVmlld0VuY2Fwc3VsYXRpb24sIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDaGFuZ2VEZXRlY3RvclJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRXhwcmVzc2lvbnMsIEFic3RyYWN0Rm9ybUZpZWxkV2lkZ2V0IH0gZnJvbSAnLi4vLi4vLi4vY29yZS9pbmRleCc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3dkZy10b2dnbGUnLFxuICB0ZW1wbGF0ZTogYDxtYXQtc2xpZGUtdG9nZ2xlIGxhYmVsUG9zaXRpb249XCJiZWZvcmVcIj5cbiAge3sgdGl0bGV9fVxuPC9tYXQtc2xpZGUtdG9nZ2xlPlxuYCxcbiAgc3R5bGVzOiBbYGBdLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBUb2dnbGVXaWRnZXRDb21wb25lbnQgZXh0ZW5kcyBBYnN0cmFjdEZvcm1GaWVsZFdpZGdldCB7XG5cbiAgdGl0bGU6IHN0cmluZztcblxuICBjb25zdHJ1Y3RvcihjZHI6IENoYW5nZURldGVjdG9yUmVmLCBleHByOiBFeHByZXNzaW9ucykge1xuICAgIHN1cGVyKGNkciwgZXhwcik7XG4gIH1cblxuXG59XG4iLCIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxOCBBZHJpYW4gUGFuZWxsYSA8aWFuY2hpNzRAb3V0bG9vay5jb20+XG4gKlxuICogVGhpcyBzb2Z0d2FyZSBpcyByZWxlYXNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuXG4gKiBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL01JVFxuICovXG5cblxuaW1wb3J0IHsgQ29tcG9uZW50LCBWaWV3RW5jYXBzdWxhdGlvbiwgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENoYW5nZURldGVjdG9yUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBFeHByZXNzaW9ucywgQWJzdHJhY3RGb3JtRmllbGRXaWRnZXQgfSBmcm9tICcuLi8uLi8uLi9jb3JlL2luZGV4JztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnd2RnLXNsaWRlcicsXG4gIHRlbXBsYXRlOiBgPHNwYW4+e3t0aXRsZX19PC9zcGFuPlxuPG1hdC1zbGlkZXIgW2Zvcm1Db250cm9sXT1cImZvcm1Db250cm9sXCI+PC9tYXQtc2xpZGVyPlxuYCxcbiAgc3R5bGVzOiBbYGBdLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBTbGlkZXJXaWRnZXRDb21wb25lbnQgZXh0ZW5kcyBBYnN0cmFjdEZvcm1GaWVsZFdpZGdldCB7XG5cbiAgdGl0bGU6IHN0cmluZztcblxuICBjb25zdHJ1Y3RvcihjZHI6IENoYW5nZURldGVjdG9yUmVmLCBleHByOiBFeHByZXNzaW9ucykge1xuICAgIHN1cGVyKGNkciwgZXhwcik7XG4gIH1cblxufVxuIiwiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTggQWRyaWFuIFBhbmVsbGEgPGlhbmNoaTc0QG91dGxvb2suY29tPlxuICpcbiAqIFRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLlxuICogaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9NSVRcbiAqL1xuXG5cbmltcG9ydCB7IENvbXBvbmVudCwgVmlld0VuY2Fwc3VsYXRpb24sIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDaGFuZ2VEZXRlY3RvclJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyB0YWtlIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgaXNSZWFjdGl2ZSB9IGZyb20gJ2VzcHJlc3Npb24nO1xuaW1wb3J0IHsgQWJzdHJhY3RXaWRnZXQsIEV4cHJlc3Npb25zLCBJV2lkZ2V0RGVmLCB9IGZyb20gJy4uLy4uLy4uL2NvcmUvaW5kZXgnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICd3ZGctYnV0dG9uJyxcbiAgdGVtcGxhdGU6IGA8YnV0dG9uIG1hdC1idXR0b24gKGNsaWNrKT1cImNsaWNrRXZlbnQoJGV2ZW50KVwiPlxuICB7e3RpdGxlfX1cbjwvYnV0dG9uPlxuYCxcbiAgc3R5bGVzOiBbYGBdLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBCdXR0b25XaWRnZXRDb21wb25lbnQgZXh0ZW5kcyBBYnN0cmFjdFdpZGdldCB7XG5cbiAgdGl0bGU6IHN0cmluZztcbiAgY2xpY2s6IHN0cmluZztcblxuICBwcml2YXRlIF9sdmFsdWU6IHsgbywgbSB9O1xuICBwcml2YXRlIF9jbGlja1N1YnM6IFN1YnNjcmlwdGlvbjtcbiAgY29uc3RydWN0b3IoY2RyOiBDaGFuZ2VEZXRlY3RvclJlZiwgZXhwcjogRXhwcmVzc2lvbnMpIHtcbiAgICBzdXBlcihjZHIsIGV4cHIpO1xuICB9XG5cbiAgZHluT25TZXR1cChkZWY6IElXaWRnZXREZWYpIHtcblxuICAgIGlmIChkZWYuYmluZCkge1xuXG4gICAgICBjb25zdCBsdmFsdWUgPSB0aGlzLl9leHByLmx2YWx1ZShkZWYuYmluZCwgdGhpcy5jb250ZXh0KTtcblxuICAgICAgaWYgKCFsdmFsdWUpXG4gICAgICAgIHRocm93IG5ldyBFcnJvcignRm9ybSBmaWVsZCBcImJpbmRcIiBwcm9wZXJ0eSBtdXN0IGJlIGFuIGlkZW50aWZpZXIgb3IgbWVtYmVyIGV4cHJlc3Npb24nKTtcblxuICAgICAgaWYgKCFpc1JlYWN0aXZlKGx2YWx1ZS5vKSlcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdCb3VuZCBLZXkgbXVzdCBiZSBvZiBSZWFjdGl2ZSBUeXBlJyk7XG5cbiAgICAgIHRoaXMuX2x2YWx1ZSA9IGx2YWx1ZTtcbiAgICB9XG5cbiAgICByZXR1cm4gZGVmO1xuICB9XG5cbiAgY2xpY2tFdmVudChfZXZlbnQpIHtcblxuICAgIGlmICh0aGlzLl9jbGlja1N1YnMpIHtcbiAgICAgIHRoaXMuX2NsaWNrU3Vicy51bnN1YnNjcmliZSgpO1xuICAgICAgdGhpcy5fY2xpY2tTdWJzID0gbnVsbDtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5jbGljaykge1xuICAgICAgdGhpcy5fY2xpY2tTdWJzID0gdGhpcy5fZXhwci5ldmFsKHRoaXMuY2xpY2ssIHRoaXMuY29udGV4dCwgdHJ1ZSkucGlwZShcbiAgICAgICAgdGFrZSgxKSkuc3Vic2NyaWJlKHJlcyA9PlxuICAgICAgICAgIHRoaXMuX2x2YWx1ZS5vW3RoaXMuX2x2YWx1ZS5tXSA9IHJlcyk7XG4gICAgfVxuICB9XG59XG4iLCIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxOCBBZHJpYW4gUGFuZWxsYSA8aWFuY2hpNzRAb3V0bG9vay5jb20+XG4gKlxuICogVGhpcyBzb2Z0d2FyZSBpcyByZWxlYXNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuXG4gKiBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL01JVFxuICovXG5cbmltcG9ydCB7IENvbXBvbmVudCwgVmlld0VuY2Fwc3VsYXRpb24sIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDaGFuZ2VEZXRlY3RvclJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRm9ybUdyb3VwLCBGb3JtQXJyYXkgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBSeE9iamVjdCB9IGZyb20gJ2VzcHJlc3Npb24nO1xuaW1wb3J0IHsgQWJzdHJhY3RXaWRnZXQsIElXaWRnZXREZWYsIENvbnRleHQsIEV4cHJlc3Npb25zLCBGT1JNX0NPTlRST0wgfSBmcm9tICcuLi8uLi8uLi9jb3JlL2luZGV4JztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnd2RnLWZvcm0nLFxuICB0ZW1wbGF0ZTogYDxuZy1jb250YWluZXIgKm5nRm9yPVwibGV0IGVsZW1lbnQgb2YgY29udGVudFwiIFt3ZGdXaWRnZXRdPVwiZWxlbWVudFwiIFtwYXJlbnRDb250ZXh0XT1cImNvbnRleHRcIj5cblxuPC9uZy1jb250YWluZXI+XG5gLFxuICBzdHlsZXM6IFtgYF0sXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXG59KVxuZXhwb3J0IGNsYXNzIEZvcm1XaWRnZXRDb21wb25lbnQgZXh0ZW5kcyBBYnN0cmFjdFdpZGdldCB7XG5cbiAgZm9ybUdyb3VwOiBGb3JtR3JvdXA7XG4gIGNvbnN0cnVjdG9yKGNkcjogQ2hhbmdlRGV0ZWN0b3JSZWYsIGV4cHI6IEV4cHJlc3Npb25zKSB7XG4gICAgc3VwZXIoY2RyLCBleHByKTtcbiAgfVxuXG4gIGR5bk9uU2V0dXAoZGVmOiBJV2lkZ2V0RGVmKSB7XG5cbiAgICB0aGlzLmZvcm1Hcm91cCA9IG5ldyBGb3JtR3JvdXAoe30pO1xuXG4gICAgLy8gcmVnaXN0ZXIgd2l0aCBwYXJlbnQgZm9ybSwgaWYgYW55XG4gICAgY29uc3QgcGFyZW50Rm9ybTogRm9ybUdyb3VwIHwgRm9ybUFycmF5ID0gdGhpcy5jb250ZXh0W0ZPUk1fQ09OVFJPTF07XG4gICAgaWYgKHBhcmVudEZvcm0pIHtcbiAgICAgIGlmIChwYXJlbnRGb3JtIGluc3RhbmNlb2YgRm9ybUdyb3VwKSBwYXJlbnRGb3JtLmFkZENvbnRyb2woJ2NvbnRyb2wnLCB0aGlzLmZvcm1Hcm91cCk7XG4gICAgICBlbHNlIGlmIChwYXJlbnRGb3JtIGluc3RhbmNlb2YgRm9ybUFycmF5KSBwYXJlbnRGb3JtLnB1c2godGhpcy5mb3JtR3JvdXApO1xuICAgIH1cblxuICAgIC8vIHNhdmUgdGhpcyBGb3JtR3JvdXAgYXMgcGFyZW50IGZvcm0gZm9yIHRoZSBjaGlsZHJlblxuICAgIENvbnRleHQuZGVmaW5lSGlkZGVuKHRoaXMuY29udGV4dCwgeyBbRk9STV9DT05UUk9MXTogdGhpcy5mb3JtR3JvdXAgfSk7XG5cbiAgICAvLyBjcmVhdGUgYSBTdG9yZSBmb3IgdGhlIHZhcmlhYmxlc1xuXG4gICAgdGhpcy5jb250ZXh0WyckbW9kZWwnXSA9IFJ4T2JqZWN0KHt9KTtcbiAgICByZXR1cm4gZGVmO1xuICB9XG5cbn1cbiIsIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDE4IEFkcmlhbiBQYW5lbGxhIDxpYW5jaGk3NEBvdXRsb29rLmNvbT5cbiAqXG4gKiBUaGlzIHNvZnR3YXJlIGlzIHJlbGVhc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS5cbiAqIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvTUlUXG4gKi9cblxuaW1wb3J0IHsgQ29tcG9uZW50LCBWaWV3RW5jYXBzdWxhdGlvbiwgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENoYW5nZURldGVjdG9yUmVmLCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IG1hcCwgc3RhcnRXaXRoIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgRXhwcmVzc2lvbnMsIEFic3RyYWN0Rm9ybUZpZWxkV2lkZ2V0IH0gZnJvbSAnLi4vLi4vLi4vY29yZS9pbmRleCc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3dkZy1hdXRvY29tcGxldGUnLFxuICB0ZW1wbGF0ZTogYDxtYXQtZm9ybS1maWVsZCBzdHlsZS53aWR0aD1cIjEwMCVcIj5cblxuICA8bWF0LWxhYmVsICpuZ0lmPVwidGl0bGVcIj5cbiAgICB7eyB0aXRsZSB9fVxuICA8L21hdC1sYWJlbD5cblxuICA8aW5wdXQgbWF0SW5wdXQgbmFtZT1cImFhYVwiIFt0eXBlXT1cInR5cGUgfHwgJ3RleHQnXCIgW2Zvcm1Db250cm9sXT1cImZvcm1Db250cm9sXCIgW3BsYWNlaG9sZGVyXT1cInBsYWNlaG9sZGVyXCJcbiAgICBbbWF0QXV0b2NvbXBsZXRlXT1cImF1dG9cIj5cblxuICA8bWF0LWVycm9yIFtpZF09XCJudWxsXCI+XG5cbiAgPC9tYXQtZXJyb3I+XG5cbiAgPG1hdC1oaW50ICpuZ0lmPVwiZGVzY3JpcHRpb25cIiBbaWRdPVwibnVsbFwiPlxuICAgIHt7IGRlc2NyaXB0aW9uIH19XG4gIDwvbWF0LWhpbnQ+XG5cbiAgPG1hdC1hdXRvY29tcGxldGUgI2F1dG89XCJtYXRBdXRvY29tcGxldGVcIj5cbiAgICA8bWF0LW9wdGlvbiAqbmdGb3I9XCJsZXQgb3B0aW9uIG9mIGZpbHRlcmVkT3B0aW9ucyB8IGFzeW5jOyBpbmRleCBhcyBvcHRJbmRleFwiIFt2YWx1ZV09XCJvcHRpb25cIj5cbiAgICAgIHt7b3B0aW9ufX1cbiAgICA8L21hdC1vcHRpb24+XG4gIDwvbWF0LWF1dG9jb21wbGV0ZT5cblxuPC9tYXQtZm9ybS1maWVsZD5cbmAsXG4gIHN0eWxlczogW2BgXSxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcbn0pXG5leHBvcnQgY2xhc3MgQXV0b2NvbXBsZXRlV2lkZ2V0Q29tcG9uZW50IGV4dGVuZHMgQWJzdHJhY3RGb3JtRmllbGRXaWRnZXQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gIHRpdGxlOiBzdHJpbmc7XG4gIGRlc2NyaXB0aW9uOiBzdHJpbmc7XG4gIHBsYWNlaG9sZGVyOiBzdHJpbmc7XG5cbiAgZW51bTogc3RyaW5nW10gPSBbXTtcbiAgZW51bUxhYmVsOiBzdHJpbmdbXTtcbiAgZmlsdGVyZWRPcHRpb25zOiBPYnNlcnZhYmxlPHN0cmluZ1tdPjtcbiAgY29uc3RydWN0b3IoY2RyOiBDaGFuZ2VEZXRlY3RvclJlZiwgZXhwcjogRXhwcmVzc2lvbnMpIHtcbiAgICBzdXBlcihjZHIsIGV4cHIpO1xuICB9XG5cblxuXG4gIGR5bk9uQmVmb3JlQmluZCgpIHtcbiAgICB0aGlzLm1hcCgnZW51bScsIHZhbCA9PiB7XG4gICAgICByZXR1cm4gQXJyYXkuaXNBcnJheSh2YWwpID8gdmFsIDogW107XG4gICAgfSk7XG4gIH1cblxuICBkeW5PbkFmdGVyQmluZCgpIHtcbiAgICB0aGlzLm1hcCgnZW51bScsIHZhbCA9PiAodGhpcy5fZmlsdGVyKHRoaXMuZm9ybUNvbnRyb2wudmFsdWUpLCB2YWwpKTtcbiAgfVxuICBuZ09uSW5pdCgpIHtcbiAgICBzdXBlci5uZ09uSW5pdCgpO1xuXG4gICAgdGhpcy5maWx0ZXJlZE9wdGlvbnMgPSB0aGlzLmZvcm1Db250cm9sLnZhbHVlQ2hhbmdlc1xuICAgICAgLnBpcGUoXG4gICAgICAgIHN0YXJ0V2l0aCgnJyksXG4gICAgICAgIG1hcCh2YWx1ZSA9PiB0aGlzLl9maWx0ZXIodmFsdWUpKVxuICAgICAgKTtcbiAgfVxuXG4gIHByaXZhdGUgX2ZpbHRlcih2YWx1ZTogc3RyaW5nKTogc3RyaW5nW10ge1xuXG4gICAgY29uc3QgZmlsdGVyVmFsdWUgPSB2YWx1ZSAmJiB2YWx1ZS50b0xvd2VyQ2FzZSgpO1xuXG4gICAgcmV0dXJuIHRoaXMuZW51bS5maWx0ZXIob3B0aW9uID0+IG9wdGlvbi50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKGZpbHRlclZhbHVlKSk7XG4gIH1cblxufVxuIiwiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTggQWRyaWFuIFBhbmVsbGEgPGlhbmNoaTc0QG91dGxvb2suY29tPlxuICpcbiAqIFRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLlxuICogaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9NSVRcbiAqL1xuXG5cbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IE1hdGVyaWFsTW9kdWxlIH0gZnJvbSAnLi4vbWF0ZXJpYWwubW9kdWxlJztcbmltcG9ydCB7IFdpZGdldHNDb3JlTW9kdWxlIH0gZnJvbSAnLi4vLi4vY29yZS9pbmRleCc7XG5cbmltcG9ydCB7IElucHV0V2lkZ2V0Q29tcG9uZW50IH0gZnJvbSAnLi9pbnB1dC9pbnB1dC5jb21wb25lbnQnO1xuaW1wb3J0IHsgQ2hlY2tib3hXaWRnZXRDb21wb25lbnQgfSBmcm9tICcuL2NoZWNrYm94L2NoZWNrYm94LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBUb2dnbGVXaWRnZXRDb21wb25lbnQgfSBmcm9tICcuL3RvZ2dsZS90b2dnbGUuY29tcG9uZW50JztcbmltcG9ydCB7IFNsaWRlcldpZGdldENvbXBvbmVudCB9IGZyb20gJy4vc2xpZGVyL3NsaWRlci5jb21wb25lbnQnO1xuaW1wb3J0IHsgQnV0dG9uV2lkZ2V0Q29tcG9uZW50IH0gZnJvbSAnLi9idXR0b24vYnV0dG9uLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBGb3JtV2lkZ2V0Q29tcG9uZW50IH0gZnJvbSAnLi9mb3JtL2Zvcm0uY29tcG9uZW50JztcbmltcG9ydCB7IEF1dG9jb21wbGV0ZVdpZGdldENvbXBvbmVudCB9IGZyb20gJy4vYXV0b2NvbXBsZXRlL2F1dG9jb21wbGV0ZS5jb21wb25lbnQnO1xuXG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBNYXRlcmlhbE1vZHVsZSxcblxuICAgIFdpZGdldHNDb3JlTW9kdWxlLmZvclJvb3Qoe1xuICAgICAgd2lkZ2V0czogW1xuICAgICAgICB7IHR5cGU6ICdpbnB1dCcsIGNvbXBvbmVudDogSW5wdXRXaWRnZXRDb21wb25lbnQgfSxcbiAgICAgICAgeyB0eXBlOiAnY2hlY2tib3gnLCBjb21wb25lbnQ6IENoZWNrYm94V2lkZ2V0Q29tcG9uZW50IH0sXG4gICAgICAgIHsgdHlwZTogJ3RvZ2dsZScsIGNvbXBvbmVudDogVG9nZ2xlV2lkZ2V0Q29tcG9uZW50IH0sXG4gICAgICAgIHsgdHlwZTogJ3NsaWRlcicsIGNvbXBvbmVudDogU2xpZGVyV2lkZ2V0Q29tcG9uZW50IH0sXG4gICAgICAgIHsgdHlwZTogJ2J1dHRvbicsIGNvbXBvbmVudDogQnV0dG9uV2lkZ2V0Q29tcG9uZW50IH0sXG4gICAgICAgIHsgdHlwZTogJ2Zvcm0nLCBjb21wb25lbnQ6IEZvcm1XaWRnZXRDb21wb25lbnQgfSxcbiAgICAgICAgeyB0eXBlOiAnYXV0b2NvbXBsZXRlJywgY29tcG9uZW50OiBBdXRvY29tcGxldGVXaWRnZXRDb21wb25lbnQgfSxcblxuICAgICAgXVxuICAgIH0pXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW1xuICAgIElucHV0V2lkZ2V0Q29tcG9uZW50LFxuICAgIENoZWNrYm94V2lkZ2V0Q29tcG9uZW50LFxuICAgIFRvZ2dsZVdpZGdldENvbXBvbmVudCxcbiAgICBTbGlkZXJXaWRnZXRDb21wb25lbnQsXG4gICAgQnV0dG9uV2lkZ2V0Q29tcG9uZW50LFxuICAgIEZvcm1XaWRnZXRDb21wb25lbnQsXG4gICAgQXV0b2NvbXBsZXRlV2lkZ2V0Q29tcG9uZW50XG4gIF0sXG4gIGV4cG9ydHM6IFtdXG59KVxuZXhwb3J0IGNsYXNzIEZvcm1GaWVsZFdpZGdldHNNb2R1bGUgeyB9XG4iLCIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxOCBBZHJpYW4gUGFuZWxsYSA8aWFuY2hpNzRAb3V0bG9vay5jb20+XG4gKlxuICogVGhpcyBzb2Z0d2FyZSBpcyByZWxlYXNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuXG4gKiBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL01JVFxuICovXG5cblxuaW1wb3J0IHsgQ29tcG9uZW50LCBWaWV3RW5jYXBzdWxhdGlvbiwgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENoYW5nZURldGVjdG9yUmVmfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEFic3RyYWN0V2lkZ2V0LCBJV2lkZ2V0RGVmLCBFeHByZXNzaW9ucyB9IGZyb20gJy4uLy4uLy4uL2NvcmUvaW5kZXgnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICd3ZGctY2FyZCcsXG4gIHRlbXBsYXRlOiBgPG1hdC1jYXJkPlxuICA8bWF0LWNhcmQtdGl0bGUgKm5nSWY9XCJ0aXRsZVwiPnt7dGl0bGV9fTwvbWF0LWNhcmQtdGl0bGU+XG4gIDxtYXQtY2FyZC1zdWJ0aXRsZSAqbmdJZj1cImRlc2NyaXB0aW9uXCI+e3tkZXNjcmlwdGlvbn19PC9tYXQtY2FyZC1zdWJ0aXRsZT5cbiAgPG1hdC1jYXJkLWNvbnRlbnQ+XG4gICAgPG5nLWNvbnRhaW5lciAqbmdGb3I9XCJsZXQgZWxlbWVudCBvZiBjb250ZW50XCIgW3dkZ1dpZGdldF09XCJlbGVtZW50XCIgW3BhcmVudENvbnRleHRdPVwiY29udGV4dFwiPjwvbmctY29udGFpbmVyPlxuICA8L21hdC1jYXJkLWNvbnRlbnQ+XG4gIDxtYXQtY2FyZC1hY3Rpb25zIGFsaWduPVwiZW5kXCIgKm5nSWY9XCJhY3Rpb25zXCI+XG4gICAgPG5nLWNvbnRhaW5lciAqbmdGb3I9XCJsZXQgZWxlbWVudCBvZiBhY3Rpb25zXCIgW3dkZ1dpZGdldF09XCJlbGVtZW50XCIgW3BhcmVudENvbnRleHRdPVwiY29udGV4dFwiPjwvbmctY29udGFpbmVyPlxuICA8L21hdC1jYXJkLWFjdGlvbnM+XG48L21hdC1jYXJkPlxuYCxcbiAgc3R5bGVzOiBbYGBdLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBDYXJkV2lkZ2V0Q29tcG9uZW50IGV4dGVuZHMgQWJzdHJhY3RXaWRnZXQge1xuXG4gIHRpdGxlOiBzdHJpbmc7XG4gIGRlc2NyaXB0aW9uOiBzdHJpbmc7XG4gIGFjdGlvbnM6IElXaWRnZXREZWZbXTtcblxuICBjb25zdHJ1Y3RvcihjZHI6IENoYW5nZURldGVjdG9yUmVmLCBleHByOiBFeHByZXNzaW9ucykge1xuICAgIHN1cGVyKGNkciwgZXhwcik7XG4gIH1cblxufVxuIiwiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTggQWRyaWFuIFBhbmVsbGEgPGlhbmNoaTc0QG91dGxvb2suY29tPlxuICpcbiAqIFRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLlxuICogaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9NSVRcbiAqL1xuXG5cbmltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBWaWV3RW5jYXBzdWxhdGlvbiwgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENoYW5nZURldGVjdG9yUmVmLCBWaWV3Q2hpbGR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgaXNPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBNYXRUYWJsZURhdGFTb3VyY2UgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC90YWJsZSc7XG5pbXBvcnQgeyBNYXRQYWdpbmF0b3IgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9wYWdpbmF0b3InO1xuaW1wb3J0IHsgTWF0U29ydCB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL3NvcnQnO1xuaW1wb3J0IHsgQWJzdHJhY3RXaWRnZXQsIENvbnRleHQsIEV4cHJlc3Npb25zLCBwYXJzZURlZk9iamVjdCB9IGZyb20gJy4uLy4uLy4uL2NvcmUvaW5kZXgnO1xuaW1wb3J0IHsgY29tYmluZU1peGVkIH0gZnJvbSAnZXNwcmVzc2lvbic7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3dkZy10YWJsZScsXG4gIHRlbXBsYXRlOiBgPGRpdj5cbiAgPHNlY3Rpb24gY2xhc3M9XCJ0YWJsZS10aXRsZVwiPlxuICAgIDxoNj57e3RpdGxlfX08L2g2PlxuXG4gICAgPGRpdiBjbGFzcz1cInNwYWNlclwiPjwvZGl2PlxuXG4gICAgPG1hdC1mb3JtLWZpZWxkICpuZ0lmPVwiZmlsdGVyQnlcIj5cbiAgICAgIDxpbnB1dCBtYXRJbnB1dCAoa2V5dXApPVwiYXBwbHlGaWx0ZXIoJGV2ZW50LnRhcmdldC52YWx1ZSlcIiBwbGFjZWhvbGRlcj1cIkZpbHRlclwiPlxuICAgIDwvbWF0LWZvcm0tZmllbGQ+XG4gIDwvc2VjdGlvbj5cblxuICA8c2VjdGlvbiBjbGFzcz1cIm1hdC1lbGV2YXRpb24tejFcIj5cbiAgICA8dGFibGUgbWF0LXRhYmxlIFtkYXRhU291cmNlXT1cInRhYmxlRGF0YVNvdXJjZVwiIG1hdFNvcnQgW21hdFNvcnREaXNhYmxlZF09XCIhZGlzYWJsZVNvcnRcIj5cblxuICAgICAgPCEtLSBEeW5hbWljIENvbHVtbiBkZWZpbml0aW9ucy0tPlxuICAgICAgPG5nLWNvbnRhaW5lciBbbWF0Q29sdW1uRGVmXT1cImNvbEtleVwiICpuZ0Zvcj1cImxldCBjb2xLZXkgb2YgY29sS2V5czsgaW5kZXggYXMgY29sSW5kZXhcIj5cbiAgICAgICAgPHRoIG1hdC1oZWFkZXItY2VsbCAqbWF0SGVhZGVyQ2VsbERlZiBtYXQtc29ydC1oZWFkZXIgW2Rpc2FibGVkXT1cImRpc2FibGVTb3J0Py5pbmRleE9mKGNvbEtleSkgPj0gMFwiPiB7e2NvbEhlYWRlcnNbY29sSW5kZXhdIHx8IGNvbEtleX19IDwvdGg+XG4gICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJjb2xGb3JtYXQgJiYgY29sRm9ybWF0W2NvbEluZGV4XTsgZWxzZSBub0Zvcm1hdENlbGxEZWZcIj5cbiAgICAgICAgICA8dGQgbWF0LWNlbGwgKm1hdENlbGxEZWY9XCJsZXQgcm93RGF0YVwiPnt7cm93RGF0YVtjb2xLZXldIHwgZm9ybWF0OmNvbEZvcm1hdFtjb2xJbmRleF19fTwvdGQ+XG4gICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICA8bmctdGVtcGxhdGUgI25vRm9ybWF0Q2VsbERlZj5cbiAgICAgICAgICA8dGQgbWF0LWNlbGwgKm1hdENlbGxEZWY9XCJsZXQgcm93RGF0YVwiPnt7cm93RGF0YVtjb2xLZXldfX08L3RkPlxuICAgICAgICA8L25nLXRlbXBsYXRlPlxuICAgICAgPC9uZy1jb250YWluZXI+XG5cbiAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJhY3Rpb25zPy5sZW5ndGhcIiBbbWF0Q29sdW1uRGVmXT1cIidfX2FjdGlvbnNfXydcIj5cbiAgICAgICAgPHRoIG1hdC1oZWFkZXItY2VsbCAqbWF0SGVhZGVyQ2VsbERlZiA+IHt7YWN0aW9uc0hlYWRlciB8fCAnQWN0aW9ucyd9fSA8L3RoPlxuICAgICAgICA8dGQgbWF0LWNlbGwgKm1hdENlbGxEZWY9XCJsZXQgcm93RGF0YVwiPlxuICAgICAgICAgIDxidXR0b24gbWF0LWljb24tYnV0dG9uIFttYXRNZW51VHJpZ2dlckZvcl09XCJtZW51XCI+XG4gICAgICAgICAgICA8bWF0LWljb24gc3ZnSWNvbj1cImRvdHMtdmVydGljYWxcIj48L21hdC1pY29uPlxuICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgIDxtYXQtbWVudSAjbWVudT1cIm1hdE1lbnVcIj5cblxuICAgICAgICAgICAgPGJ1dHRvbiBtYXQtbWVudS1pdGVtICpuZ0Zvcj1cImxldCBhY3Rpb24gb2YgYWN0aW9uczsgaW5kZXggYXMgYWN0aW9uSW5kZXhcIiAoY2xpY2spPVwiYWN0aW9uQ2xpY2socm93RGF0YSwgYWN0aW9uSW5kZXgpXCI+XG4gICAgICAgICAgICAgIDxtYXQtaWNvbiBbc3ZnSWNvbl09XCJhY3Rpb25zW2FjdGlvbkluZGV4XS5pY29uXCI+PC9tYXQtaWNvbj5cbiAgICAgICAgICAgICAgPHNwYW4+e3thY3Rpb25zW2FjdGlvbkluZGV4XS5sYWJlbH19PC9zcGFuPlxuICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgPC9tYXQtbWVudT5cbiAgICAgICAgPC90ZD5cbiAgICAgIDwvbmctY29udGFpbmVyPlxuXG5cbiAgICAgIDwhLS0gUm93IGRlZmluaXRpb25zLS0+XG4gICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiY29sSGVhZGVyc1wiPlxuICAgICAgICA8dHIgbWF0LWhlYWRlci1yb3cgKm1hdEhlYWRlclJvd0RlZj1cInNob3dDb2xzXCIgY2xhc3M9XCJoZWFkZXItcm93XCI+PC90cj5cbiAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgPHRyIG1hdC1yb3cgKm1hdFJvd0RlZj1cImxldCBlbGVtZW50OyBjb2x1bW5zOiBzaG93Q29scztcIiBjbGFzcz1cImRhdGEtcm93XCI+PC90cj5cbiAgICA8L3RhYmxlPlxuXG4gICAgPG1hdC1wYWdpbmF0b3IgW2NsYXNzLmhpZGRlblBhZ2luYXRvcl09XCIhcGFnZVNpemVzXCIgW3BhZ2VTaXplT3B0aW9uc109XCJwYWdlU2l6ZXNcIiBbaGlkZVBhZ2VTaXplXT1cInBhZ2VTaXplcz8ubGVuZ3RoPD0xXCI+PC9tYXQtcGFnaW5hdG9yPlxuICA8L3NlY3Rpb24+XG48L2Rpdj5cbmAsXG4gIHN0eWxlczogW2B3ZGctdGFibGUgdGFibGV7d2lkdGg6MTAwJX13ZGctdGFibGUgdHIuZGF0YS1yb3c6aG92ZXJ7YmFja2dyb3VuZDojZjVmNWY1fXdkZy10YWJsZSB0ci5kYXRhLXJvdzphY3RpdmV7YmFja2dyb3VuZDojZWZlZmVmfXdkZy10YWJsZSAuZGF0YS1yb3cgdGR7Ym9yZGVyLWJvdHRvbS13aWR0aDowfXdkZy10YWJsZSBtYXQtcGFnaW5hdG9yLmhpZGRlblBhZ2luYXRvcntkaXNwbGF5Om5vbmV9d2RnLXRhYmxlIC50YWJsZS10aXRsZXtkaXNwbGF5OmZsZXg7ZmxleC1mbG93OnJvd313ZGctdGFibGUgLnRhYmxlLXRpdGxlPip7ZmxleDowIDAgYXV0b313ZGctdGFibGUgLnRhYmxlLXRpdGxlIC5zcGFjZXJ7ZmxleDoxIDEgYXV0b31gXSxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcbn0pXG5leHBvcnQgY2xhc3MgVGFibGVXaWRnZXRDb21wb25lbnQgZXh0ZW5kcyBBYnN0cmFjdFdpZGdldCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgdGl0bGU6IHN0cmluZztcbiAgZGF0YVNvdXJjZTogT2JzZXJ2YWJsZTxhbnlbXT4gfCBhbnlbXTtcbiAgdGFibGVEYXRhU291cmNlOiBNYXRUYWJsZURhdGFTb3VyY2U8eyBbcHJvcDogc3RyaW5nXTogYW55IH0+O1xuXG4gIGNvbEtleXM6IHN0cmluZ1tdO1xuICBjb2xIZWFkZXJzOiBzdHJpbmdbXTtcbiAgY29sc1Zpc2libGU6IHN0cmluZ1tdO1xuICBwYWdlU2l6ZXM6IG51bWJlcltdO1xuICBmaWx0ZXJCeTogc3RyaW5nW107XG4gIGRpc2FibGVTb3J0OiBzdHJpbmdbXSA9IFtdO1xuXG4gIGNvbFRyYW5zZm9ybTogc3RyaW5nW107XG4gIGNvbEZvcm1hdDogc3RyaW5nW107XG5cbiAgYWN0aW9uczogeyBpY29uOiBzdHJpbmcsIGxhYmVsOiBzdHJpbmcsIGFjdGlvbjogc3RyaW5nIH1bXSA9IFtdO1xuICBhY3Rpb25zSGVhZGVyOiBzdHJpbmc7XG4gIHNob3dDb2xzOiBzdHJpbmdbXTtcblxuICBAVmlld0NoaWxkKE1hdFBhZ2luYXRvcikgcGFnaW5hdG9yOiBNYXRQYWdpbmF0b3I7XG4gIEBWaWV3Q2hpbGQoTWF0U29ydCkgc29ydDogTWF0U29ydDtcblxuICBjb25zdHJ1Y3RvcihjZHI6IENoYW5nZURldGVjdG9yUmVmLCBleHByOiBFeHByZXNzaW9ucykge1xuICAgIHN1cGVyKGNkciwgZXhwcik7XG4gICAgdGhpcy50YWJsZURhdGFTb3VyY2UgPSBuZXcgTWF0VGFibGVEYXRhU291cmNlKCk7XG4gIH1cblxuICBkeW5PbkJlZm9yZUJpbmQoKSB7XG5cbiAgICBjb25zdCBvcHQgPSB0aGlzLndpZGdldERlZi5vcHRpb25zO1xuXG5cbiAgICAvLyBpZiB0aGUgb25seSBzb3VyY2UgaXMgYSBzdGF0aWMgYXJyYXksIGxldHMgY2hlY2sgaWYgaXQgaGFzICdwcm9wZXJ0eT0nIGNvbHVtbnMgdG8gZXZhbHVhdGVcbiAgICAvLyBhbmQgYWRkIHRoZSBhdXRvIGJpbmRpbmdcbiAgICBpZiAob3B0ICYmICFvcHRbJ2RhdGFTb3VyY2U9J10gJiZcbiAgICAgIEFycmF5LmlzQXJyYXkob3B0LmRhdGFTb3VyY2UpKSB7XG5cbiAgICAgIGNvbnN0IGRhdGFTb3VyY2UgPSA8T2JzZXJ2YWJsZTxhbnlbXT4+Y29tYmluZU1peGVkKG9wdC5kYXRhU291cmNlLm1hcChyb3cgPT5cbiAgICAgICAgY29tYmluZU1peGVkKHBhcnNlRGVmT2JqZWN0KHJvdywgdGhpcy5jb250ZXh0LCBmYWxzZSwgdGhpcy5fZXhwcikpLCBmYWxzZSksIGZhbHNlKTtcbiAgICAgIGlmIChpc09ic2VydmFibGUoZGF0YVNvdXJjZSkpIHRoaXMuYmluZGluZ3MuZGF0YVNvdXJjZSA9IGRhdGFTb3VyY2U7XG4gICAgICBlbHNlIHRoaXMuZGF0YVNvdXJjZSA9IGRhdGFTb3VyY2U7XG4gICAgfVxuXG5cbiAgICB0aGlzLm1hcCgnZGlzYWJsZVNvcnQnLCBzb3J0ID0+IHtcbiAgICAgIGlmIChzb3J0ID09PSB0cnVlKSByZXR1cm4gbnVsbDtcbiAgICAgIGlmICghQXJyYXkuaXNBcnJheShzb3J0KSkgcmV0dXJuIFtdO1xuICAgICAgcmV0dXJuIHNvcnQ7XG5cbiAgICB9KTtcblxuICAgIHRoaXMubWFwKCdkYXRhU291cmNlJywgKHRhYmxlOiBhbnlbXSkgPT5cbiAgICAgIHRoaXMudGFibGVEYXRhU291cmNlLmRhdGEgPSB0YWJsZS5tYXAocm93ID0+IHtcbiAgICAgICAgcm93ID0gcGFyc2VEZWZPYmplY3Qocm93LCBDb250ZXh0LmNyZWF0ZSh0aGlzLmNvbnRleHQsIHsgJGRhdGE6IHJvdyB9KSwgZmFsc2UsIHRoaXMuX2V4cHIpO1xuXG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KHRoaXMuY29sVHJhbnNmb3JtKSkge1xuXG4gICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmNvbFRyYW5zZm9ybS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKHRoaXMuY29sVHJhbnNmb3JtW2ldKSB7XG4gICAgICAgICAgICAgIGNvbnN0IGNvbnRleHQ6IGFueSA9IENvbnRleHQuY3JlYXRlKHRoaXMuY29udGV4dCk7XG4gICAgICAgICAgICAgIGNvbnRleHQuJGRhdGEgPSByb3dbdGhpcy5jb2xLZXlzW2ldXTtcbiAgICAgICAgICAgICAgcm93W3RoaXMuY29sS2V5c1tpXV0gPSB0aGlzLl9leHByLmV2YWwodGhpcy5jb2xUcmFuc2Zvcm1baV0sIGNvbnRleHQsIGZhbHNlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiByb3c7XG4gICAgICB9KVxuICAgICk7XG5cbiAgICB0aGlzLm1hcCgncGFnZVNpemVzJywgKHZhbHVlKSA9PiB7XG4gICAgICBpZiAoIUFycmF5LmlzQXJyYXkodmFsdWUpIHx8ICF2YWx1ZS5sZW5ndGgpIHtcbiAgICAgICAgdGhpcy50YWJsZURhdGFTb3VyY2UucGFnaW5hdG9yID0gbnVsbDtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9XG4gICAgICB0aGlzLnRhYmxlRGF0YVNvdXJjZS5wYWdpbmF0b3IgPSB0aGlzLnBhZ2luYXRvcjtcbiAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9KTtcblxuICAgIHRoaXMubWFwKCdjb2xLZXlzJywga2V5cyA9PiB7XG4gICAgICBpZiAodGhpcy5hY3Rpb25zICYmIHRoaXMuYWN0aW9ucy5sZW5ndGgpIHRoaXMuc2hvd0NvbHMgPSBrZXlzLmNvbmNhdCgnX19hY3Rpb25zX18nKTtcbiAgICAgIGVsc2UgdGhpcy5zaG93Q29scyA9IGtleXM7XG4gICAgICByZXR1cm4ga2V5cztcbiAgICB9KTtcbiAgICB0aGlzLm1hcCgnYWN0aW9ucycsIGFjdGlvbnMgPT4ge1xuICAgICAgaWYgKCFBcnJheS5pc0FycmF5KGFjdGlvbnMpKSBhY3Rpb25zID0gW107XG5cbiAgICAgIHRoaXMuc2hvd0NvbHMgPSBhY3Rpb25zLmxlbmd0aCA/IHRoaXMuY29sS2V5cy5jb25jYXQoJ19fYWN0aW9uc19fJykgOiB0aGlzLmNvbEtleXM7XG5cbiAgICAgIHJldHVybiBhY3Rpb25zO1xuICAgIH0pO1xuICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgc3VwZXIubmdPbkluaXQoKTtcblxuICAgIHRoaXMudGFibGVEYXRhU291cmNlLnNvcnQgPSB0aGlzLnNvcnQ7XG4gIH1cbiAgYXBwbHlGaWx0ZXIoZmlsdGVyVmFsdWU6IHN0cmluZykge1xuICAgIHRoaXMudGFibGVEYXRhU291cmNlLmZpbHRlciA9IGZpbHRlclZhbHVlO1xuXG4gICAgaWYgKHRoaXMudGFibGVEYXRhU291cmNlLnBhZ2luYXRvcikge1xuICAgICAgdGhpcy50YWJsZURhdGFTb3VyY2UucGFnaW5hdG9yLmZpcnN0UGFnZSgpO1xuICAgIH1cbiAgfVxuXG4gIGFjdGlvbkNsaWNrKHJvd0RhdGE6IGFueSwgYWN0aW9uSW5kZXg6IG51bWJlcikge1xuXG4gICAgY29uc3QgY29udGV4dCA9IENvbnRleHQuY3JlYXRlKHRoaXMuY29udGV4dCwgeyAkZGF0YTogcm93RGF0YSB9KTtcblxuICAgIHRoaXMuYWRkU3Vic2NyaXB0aW9uID0gdGhpcy5fZXhwci5ldmFsKHRoaXMuYWN0aW9uc1thY3Rpb25JbmRleF0uYWN0aW9uLCBjb250ZXh0LCB0cnVlKS5zdWJzY3JpYmUoXG4gICAgICAoKSA9PiB7XG4gICAgICAgIC8vIFRPRE8gbG9naWMgdG8gcmVsb2FkIHRhYmxlXG4gICAgICB9XG4gICAgKTtcbiAgfVxuXG5cbn1cbiIsIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDE4IEFkcmlhbiBQYW5lbGxhIDxpYW5jaGk3NEBvdXRsb29rLmNvbT5cbiAqXG4gKiBUaGlzIHNvZnR3YXJlIGlzIHJlbGVhc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS5cbiAqIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvTUlUXG4gKi9cblxuaW1wb3J0IHsgQ29tcG9uZW50LCBWaWV3RW5jYXBzdWxhdGlvbiwgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENoYW5nZURldGVjdG9yUmVmfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEFic3RyYWN0V2lkZ2V0LCBFeHByZXNzaW9ucyB9IGZyb20gJy4uLy4uLy4uL2NvcmUvaW5kZXgnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICd3ZGctY29udGFpbmVyJyxcbiAgdGVtcGxhdGU6IGA8bmctY29udGFpbmVyICpuZ0Zvcj1cImxldCBlbGVtZW50IG9mIGNvbnRlbnRcIiBbd2RnV2lkZ2V0XT1cImVsZW1lbnRcIiBbcGFyZW50Q29udGV4dF09XCJjb250ZXh0XCI+XG5cbjwvbmctY29udGFpbmVyPlxuYCxcbiAgc3R5bGVzOiBbYHdkZy1jb250YWluZXIud2RnLWZsZXh7ZGlzcGxheTpmbGV4O2ZsZXgtd3JhcDp3cmFwfXdkZy1jb250YWluZXIud2RnLWZsZXg+KntmbGV4OjEgMSBhdXRvfWBdLFxuXG4gIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTp1c2UtaG9zdC1wcm9wZXJ0eS1kZWNvcmF0b3JcbiAgaG9zdDoge1xuICAgICdbY2xhc3Mud2RnLWZsZXhdJzogJ3RydWUnLFxuICAgICdbc3R5bGUuZmxleC1kaXJlY3Rpb25dJzogJ2RpcmVjdGlvbidcbiAgfSxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcbn0pXG5leHBvcnQgY2xhc3MgQ29udGFpbmVyV2lkZ2V0Q29tcG9uZW50IGV4dGVuZHMgQWJzdHJhY3RXaWRnZXQge1xuXG4gIGRpcmVjdGlvbjogc3RyaW5nO1xuXG4gIGNvbnN0cnVjdG9yKGNkcjogQ2hhbmdlRGV0ZWN0b3JSZWYsIGV4cHI6IEV4cHJlc3Npb25zKSB7XG4gICAgc3VwZXIoY2RyLCBleHByKTtcbiAgfVxuXG4gIGR5bk9uQmVmb3JlQmluZCgpIHtcblxuICAgIHRoaXMubWFwKCdkaXJlY3Rpb24nLCBkaXIgPT4gZGlyIHx8ICdyb3cnKTtcbiAgfVxuXG59XG4iLCIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxOCBBZHJpYW4gUGFuZWxsYSA8aWFuY2hpNzRAb3V0bG9vay5jb20+XG4gKlxuICogVGhpcyBzb2Z0d2FyZSBpcyByZWxlYXNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuXG4gKiBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL01JVFxuICovXG5cbmltcG9ydCB7IENvbXBvbmVudCwgVmlld0VuY2Fwc3VsYXRpb24sIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDaGFuZ2VEZXRlY3RvclJlZn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBBYnN0cmFjdFdpZGdldCwgRXhwcmVzc2lvbnMgfSBmcm9tICcuLi8uLi8uLi9jb3JlL2luZGV4JztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnd2RnLWdyaWQtY29udGFpbmVyJyxcbiAgdGVtcGxhdGU6IGA8bmctY29udGFpbmVyICpuZ0Zvcj1cImxldCBlbGVtZW50IG9mIGNvbnRlbnRcIiBbd2RnV2lkZ2V0XT1cImVsZW1lbnRcIiBbcGFyZW50Q29udGV4dF09XCJjb250ZXh0XCI+XG5cbjwvbmctY29udGFpbmVyPlxuYCxcbiAgc3R5bGVzOiBbYHdkZy1ncmlkLWNvbnRhaW5lci53ZGctZ3JpZHtkaXNwbGF5OmdyaWQ7Z3JpZC10ZW1wbGF0ZS1jb2x1bW5zOnJlcGVhdChhdXRvLWZpdCxtaW5tYXgoMzAwcHgsMWZyKSk7Z3JpZC1hdXRvLWZsb3c6cm93IGRlbnNlfWBdLFxuXG4gIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTp1c2UtaG9zdC1wcm9wZXJ0eS1kZWNvcmF0b3JcbiAgaG9zdDoge1xuICAgICdbY2xhc3Mud2RnLWdyaWRdJzogJ3RydWUnLFxuICAgICdbc3R5bGUuZmxleC1kaXJlY3Rpb25dJzogJ2RpcmVjdGlvbidcbiAgfSxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcbn0pXG5leHBvcnQgY2xhc3MgR3JpZENvbnRhaW5lcldpZGdldENvbXBvbmVudCBleHRlbmRzIEFic3RyYWN0V2lkZ2V0IHtcblxuICBkaXJlY3Rpb246IHN0cmluZztcblxuICBjb25zdHJ1Y3RvcihjZHI6IENoYW5nZURldGVjdG9yUmVmLCBleHByOiBFeHByZXNzaW9ucykge1xuICAgIHN1cGVyKGNkciwgZXhwcik7XG4gIH1cblxuICBkeW5PbkJlZm9yZUJpbmQoKSB7XG5cbiAgICB0aGlzLm1hcCgnZGlyZWN0aW9uJywgZGlyID0+IGRpciB8fCAncm93Jyk7XG4gIH1cblxufVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIFZpZXdFbmNhcHN1bGF0aW9uLCBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ2hhbmdlRGV0ZWN0b3JSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEFic3RyYWN0V2lkZ2V0LCBFeHByZXNzaW9ucyB9IGZyb20gJy4uLy4uLy4uL2NvcmUvaW5kZXgnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICd3ZGctdGFicycsXG4gIHRlbXBsYXRlOiBgPG1hdC10YWItZ3JvdXA+XG5cbiAgPG1hdC10YWIgKm5nRm9yPVwibGV0IHRhYiBvZiBjb250ZW50OyBpbmRleCBhcyB0YWJJbmRleFwiIFtsYWJlbF09XCJ0YWJMYWJlbHNbdGFiSW5kZXhdIHx8ICgnVGFiJyt0YWJJbmRleClcIj5cblxuICAgIDxuZy10ZW1wbGF0ZSBtYXRUYWJDb250ZW50PlxuICAgICAgPG5nLWNvbnRhaW5lciBbd2RnV2lkZ2V0XT1cInRhYlwiIFtwYXJlbnRDb250ZXh0XT1cImNvbnRleHRcIj48L25nLWNvbnRhaW5lcj5cbiAgICA8L25nLXRlbXBsYXRlPlxuXG4gIDwvbWF0LXRhYj5cblxuXG48L21hdC10YWItZ3JvdXA+XG5gLFxuICBzdHlsZXM6IFtgYF0sXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXG59KVxuZXhwb3J0IGNsYXNzIFRhYnNXaWRnZXRDb21wb25lbnQgZXh0ZW5kcyBBYnN0cmFjdFdpZGdldCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgdGFiTGFiZWxzOiBzdHJpbmdbXTtcbiAgY29uc3RydWN0b3IoY2RyOiBDaGFuZ2VEZXRlY3RvclJlZiwgZXhwcjogRXhwcmVzc2lvbnMpIHtcbiAgICBzdXBlcihjZHIsIGV4cHIpO1xuICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gIH1cblxufVxuIiwiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTggQWRyaWFuIFBhbmVsbGEgPGlhbmNoaTc0QG91dGxvb2suY29tPlxuICpcbiAqIFRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLlxuICogaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9NSVRcbiAqL1xuXG5pbXBvcnQgeyBDb21wb25lbnQsIFZpZXdFbmNhcHN1bGF0aW9uLCBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ2hhbmdlRGV0ZWN0b3JSZWZ9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQWJzdHJhY3RXaWRnZXQsIEV4cHJlc3Npb25zIH0gZnJvbSAnLi4vLi4vLi4vY29yZS9pbmRleCc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnd2RnLWNvZGUnLFxuICAgIHRlbXBsYXRlOiBgPGNvZGU+XG57e3RleHR9fVxuPC9jb2RlPmAsXG4gICAgc3R5bGVzOiBbYHdkZy1jb2RlIGNvZGV7d2hpdGUtc3BhY2U6cHJlfWBdLFxuXG4gICAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBDb2RlV2lkZ2V0Q29tcG9uZW50IGV4dGVuZHMgQWJzdHJhY3RXaWRnZXQge1xuXG4gICAgdGV4dDogc3RyaW5nO1xuXG4gICAgY29uc3RydWN0b3IoY2RyOiBDaGFuZ2VEZXRlY3RvclJlZiwgZXhwcjogRXhwcmVzc2lvbnMpIHtcbiAgICAgICAgc3VwZXIoY2RyLCBleHByKTtcbiAgICB9XG5cbn1cbiIsIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDE4IEFkcmlhbiBQYW5lbGxhIDxpYW5jaGk3NEBvdXRsb29rLmNvbT5cbiAqXG4gKiBUaGlzIHNvZnR3YXJlIGlzIHJlbGVhc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS5cbiAqIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvTUlUXG4gKi9cblxuXG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBNYXRlcmlhbE1vZHVsZSB9IGZyb20gJy4uL21hdGVyaWFsLm1vZHVsZSc7XG5pbXBvcnQgeyBXaWRnZXRzQ29yZU1vZHVsZSB9IGZyb20gJy4uLy4uL2NvcmUvaW5kZXgnO1xuXG5pbXBvcnQgeyBDYXJkV2lkZ2V0Q29tcG9uZW50IH0gZnJvbSAnLi9jYXJkL2NhcmQuY29tcG9uZW50JztcbmltcG9ydCB7IFRhYmxlV2lkZ2V0Q29tcG9uZW50IH0gZnJvbSAnLi90YWJsZS90YWJsZS5jb21wb25lbnQnO1xuaW1wb3J0IHsgQ29udGFpbmVyV2lkZ2V0Q29tcG9uZW50IH0gZnJvbSAnLi9jb250YWluZXIvY29udGFpbmVyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBHcmlkQ29udGFpbmVyV2lkZ2V0Q29tcG9uZW50IH0gZnJvbSAnLi9ncmlkLWNvbnRhaW5lci9ncmlkY29udGFpbmVyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBUYWJzV2lkZ2V0Q29tcG9uZW50IH0gZnJvbSAnLi90YWJzL3RhYnMuY29tcG9uZW50JztcbmltcG9ydCB7IENvZGVXaWRnZXRDb21wb25lbnQgfSBmcm9tICcuL2NvZGUvY29kZS5jb21wb25lbnQnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgTWF0ZXJpYWxNb2R1bGUsXG5cbiAgICBXaWRnZXRzQ29yZU1vZHVsZS5mb3JSb290KHtcbiAgICAgIHdpZGdldHM6IFtcbiAgICAgICAgeyB0eXBlOiAnY2FyZCcsIGNvbXBvbmVudDogQ2FyZFdpZGdldENvbXBvbmVudCB9LFxuICAgICAgICB7IHR5cGU6ICd0YWJsZScsIGNvbXBvbmVudDogVGFibGVXaWRnZXRDb21wb25lbnQgfSxcbiAgICAgICAgeyB0eXBlOiAnY29udGFpbmVyJywgY29tcG9uZW50OiBDb250YWluZXJXaWRnZXRDb21wb25lbnR9LFxuICAgICAgICB7IHR5cGU6ICdncmlkLWNvbnRhaW5lcicsIGNvbXBvbmVudDogR3JpZENvbnRhaW5lcldpZGdldENvbXBvbmVudH0sXG4gICAgICAgIHsgdHlwZTogJ3RhYnMnLCBjb21wb25lbnQ6IFRhYnNXaWRnZXRDb21wb25lbnR9LFxuICAgICAgICB7IHR5cGU6ICdjb2RlJywgY29tcG9uZW50OiBDb2RlV2lkZ2V0Q29tcG9uZW50fSxcbiAgICAgIF1cbiAgICB9KVxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBDYXJkV2lkZ2V0Q29tcG9uZW50LFxuICAgIFRhYmxlV2lkZ2V0Q29tcG9uZW50LFxuICAgIENvbnRhaW5lcldpZGdldENvbXBvbmVudCxcbiAgICBHcmlkQ29udGFpbmVyV2lkZ2V0Q29tcG9uZW50LFxuICAgIFRhYnNXaWRnZXRDb21wb25lbnQsXG4gICAgQ29kZVdpZGdldENvbXBvbmVudCxcbiAgXSxcbiAgZXhwb3J0czogW11cbn0pXG5leHBvcnQgY2xhc3MgQ29tbW9uV2lkZ2V0c01vZHVsZSB7IH1cbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFpQkE7Ozs7Ozs7Ozs7O0lBOEJFLE9BQU8sTUFBTSxDQUFDLE1BQWdCLEVBQUUsV0FBeUIsRUFDdkQsYUFBMkIsRUFDM0IsV0FBeUIsRUFDekIsUUFBa0I7UUFFbEIsdUJBQU0sT0FBTyxHQUFZLE1BQU0sR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxHQUFHLElBQUksT0FBTyxFQUFFLENBQUM7UUFFeEUsSUFBSSxRQUFRO1lBQUUsT0FBTyxDQUFDLGNBQWMsQ0FBQyxPQUFP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