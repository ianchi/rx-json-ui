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
/**
 * @record
 */
export function IContextDef() { }
function IContextDef_tsickle_Closure_declarations() {
    /* TODO: handle strange member:
    [identifier: string]: any;
    */
}
/**
 * Helper class to hold context for expression evaluation.
 * It only gives a 'type' to a plain object.
 * It has static methods to manage inheritance and adding properties and builtins
 */
var Context = /** @class */ (function () {
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
export { Context };
function Context_tsickle_Closure_declarations() {
    /**
     * Helper definition of built-in objects
     * @type {?}
     */
    Context.builtinsDef;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGV4dC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL3JlYWN0aXZlLWpzb24tZm9ybS1uZy8iLCJzb3VyY2VzIjpbImxpYi9jb3JlL2NvbnRleHQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBc0NFOzs7Ozs7OztPQVFHOzs7Ozs7Ozs7OztJQUNJLGNBQU07Ozs7Ozs7Ozs7SUFBYixVQUFjLE1BQWdCLEVBQUUsV0FBeUIsRUFDdkQsYUFBMkIsRUFDM0IsV0FBeUIsRUFDekIsUUFBa0I7UUFFbEIscUJBQU0sT0FBTyxHQUFZLE1BQU0sQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxPQUFPLEVBQUUsQ0FBQztRQUV4RSxFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUM7WUFBQyxPQUFPLENBQUMsY0FBYyxDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDbkUsRUFBRSxDQUFDLENBQUMsV0FBVyxDQUFDO1lBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsV0FBVyxDQUFDLENBQUM7UUFDckQsRUFBRSxDQUFDLENBQUMsYUFBYSxDQUFDO1lBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQyxPQUFPLEVBQUUsYUFBYSxDQUFDLENBQUM7UUFDbEUsRUFBRSxDQUFDLENBQUMsV0FBVyxDQUFDO1lBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxPQUFPLEVBQUUsV0FBVyxDQUFDLENBQUM7UUFFNUQsTUFBTSxDQUFDLE9BQU8sQ0FBQztLQUNoQjtJQUVELDRDQUE0Qzs7Ozs7OztJQUNyQyxzQkFBYzs7Ozs7O0lBQXJCLFVBQXNCLE9BQWdCLEVBQUUsS0FBa0I7O1FBR3hELEdBQUcsQ0FBQyxDQUFDLHFCQUFNLElBQUksSUFBSSxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQ3pCLE1BQU0sQ0FBQyxjQUFjLENBQUMsT0FBTyxFQUFFLElBQUksRUFBRTtnQkFDbkMsVUFBVSxFQUFFLElBQUk7Z0JBQ2hCLFFBQVEsRUFBRSxLQUFLO2dCQUNmLEtBQUssRUFBRSxLQUFLLENBQUMsSUFBSSxDQUFDO2FBQ25CLENBQUMsQ0FBQztTQUNKO1FBRUQsTUFBTSxDQUFDLE9BQU8sQ0FBQztLQUNoQjtJQUVELDJEQUEyRDs7Ozs7OztJQUNwRCxvQkFBWTs7Ozs7O0lBQW5CLFVBQW9CLE9BQWdCLEVBQUUsV0FBd0I7O1FBRzVELEdBQUcsQ0FBQyxDQUFDLHFCQUFNLElBQUksSUFBSSxXQUFXLENBQUMsQ0FBQyxDQUFDO1lBQy9CLE1BQU0sQ0FBQyxjQUFjLENBQUMsT0FBTyxFQUFFLElBQUksRUFBRTtnQkFDbkMsVUFBVSxFQUFFLEtBQUs7Z0JBQ2pCLFFBQVEsRUFBRSxJQUFJO2dCQUNkLEtBQUssRUFBRSxXQUFXLENBQUMsSUFBSSxDQUFDO2FBQ3pCLENBQUMsQ0FBQztTQUNKO1FBRUQsTUFBTSxDQUFDLE9BQU8sQ0FBQztLQUNoQjtJQUVELGdFQUFnRTs7Ozs7OztJQUN6RCxrQkFBVTs7Ozs7O0lBQWpCLFVBQWtCLE9BQWdCLEVBQUUsS0FBa0I7O1FBR3BELEdBQUcsQ0FBQyxDQUFDLHFCQUFNLElBQUksSUFBSSxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQ3pCLEVBQUUsQ0FBQyxDQUFDLElBQUksSUFBSSxPQUFPLENBQUM7Z0JBQUMsUUFBUSxDQUFDO1lBQzlCLE1BQU0sQ0FBQyxjQUFjLENBQUMsT0FBTyxFQUFFLElBQUksRUFBRTtnQkFDbkMsVUFBVSxFQUFFLElBQUk7Z0JBQ2hCLFFBQVEsRUFBRSxJQUFJO2dCQUNkLEtBQUssRUFBRSxLQUFLLENBQUMsSUFBSSxDQUFDO2FBQ25CLENBQUMsQ0FBQztTQUNKO0tBQ0Y7Ozs7MEJBcEZpQzs7UUFHaEMsVUFBVSxFQUFFLFVBQVU7UUFDdEIsUUFBUSxFQUFFLFFBQVE7UUFDbEIsS0FBSyxFQUFFLEtBQUs7UUFDWixRQUFRLEVBQUUsUUFBUTs7UUFHbEIsTUFBTSxFQUFFLE1BQU07UUFDZCxJQUFJLEVBQUUsSUFBSTtRQUNWLElBQUksRUFBRSxJQUFJO1FBQ1YsS0FBSyxFQUFFLEtBQUs7UUFDWixJQUFJLEVBQUUsSUFBSTtRQUNWLE1BQU0sRUFBRSxNQUFNO0tBRWY7a0JBcENIOztTQWlCYSxPQUFPIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTggQWRyaWFuIFBhbmVsbGEgPGlhbmNoaTc0QG91dGxvb2suY29tPlxuICpcbiAqIFRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLlxuICogaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9NSVRcbiAqL1xuXG5leHBvcnQgaW50ZXJmYWNlIElDb250ZXh0RGVmIHtcbiAgW2lkZW50aWZpZXI6IHN0cmluZ106IGFueTtcbn1cblxuXG4vKipcbiAqIEhlbHBlciBjbGFzcyB0byBob2xkIGNvbnRleHQgZm9yIGV4cHJlc3Npb24gZXZhbHVhdGlvbi5cbiAqIEl0IG9ubHkgZ2l2ZXMgYSAndHlwZScgdG8gYSBwbGFpbiBvYmplY3QuXG4gKiBJdCBoYXMgc3RhdGljIG1ldGhvZHMgdG8gbWFuYWdlIGluaGVyaXRhbmNlIGFuZCBhZGRpbmcgcHJvcGVydGllcyBhbmQgYnVpbHRpbnNcbiAqL1xuZXhwb3J0IGNsYXNzIENvbnRleHQge1xuXG4gIC8qKiBIZWxwZXIgZGVmaW5pdGlvbiBvZiBidWlsdC1pbiBvYmplY3RzICovXG4gIHN0YXRpYyBidWlsdGluc0RlZjogSUNvbnRleHREZWYgPSB7XG5cbiAgICAvLyBCdWlsdGluIGZ1bmN0aW9uczpcbiAgICBwYXJzZUZsb2F0OiBwYXJzZUZsb2F0LFxuICAgIHBhcnNlSW50OiBwYXJzZUludCxcbiAgICBpc05hTjogaXNOYU4sXG4gICAgaXNGaW5pdGU6IGlzRmluaXRlLFxuXG4gICAgLy8gRnVuZGFtZW50YWwgb2JqZWN0czpcbiAgICBOdW1iZXI6IE51bWJlcixcbiAgICBNYXRoOiBNYXRoLFxuICAgIERhdGU6IERhdGUsXG4gICAgQXJyYXk6IEFycmF5LFxuICAgIEpTT046IEpTT04sXG4gICAgT2JqZWN0OiBPYmplY3QsXG5cbiAgfTtcblxuICAvKipcbiAgICogQ3JlYXRlcyBhIENvbnRleHQgb2JqZWN0LCBpbmhlcml0aW5nIGZyb20gYW4gb3B0aW9uYWwgYHBhcmVudGAgYW5kIGFkZGluZyBjdXN0b20gcHJvcGVydGllc1xuICAgKiBhbmQgb3B0aW9uYWxseSBidWlsdGluIG9iamVjdHNcbiAgICogQHBhcmFtIHBhcmVudFxuICAgKiBAcGFyYW0gcHVibGljUHJvcHNcbiAgICogQHBhcmFtIHJlYWRvbmx5UHJvcHNcbiAgICogQHBhcmFtIGhpZGRlblByb3BzXG4gICAqIEBwYXJhbSBidWlsdGlucyBCb29sZWFuLiBJZiB0cnVlIGFkZHMgYnVpbHRpbm9iamVjdHMgYXMgcHVibGljIHByb3BlcnRpZXMsXG4gICAqL1xuICBzdGF0aWMgY3JlYXRlKHBhcmVudD86IENvbnRleHQsIHB1YmxpY1Byb3BzPzogSUNvbnRleHREZWYsXG4gICAgcmVhZG9ubHlQcm9wcz86IElDb250ZXh0RGVmLFxuICAgIGhpZGRlblByb3BzPzogSUNvbnRleHREZWYsXG4gICAgYnVpbHRpbnM/OiBib29sZWFuKTogQ29udGV4dCB7XG5cbiAgICBjb25zdCBjb250ZXh0OiBDb250ZXh0ID0gcGFyZW50ID8gT2JqZWN0LmNyZWF0ZShwYXJlbnQpIDogbmV3IENvbnRleHQoKTtcblxuICAgIGlmIChidWlsdGlucykgQ29udGV4dC5kZWZpbmVSZWFkb25seShjb250ZXh0LCBDb250ZXh0LmJ1aWx0aW5zRGVmKTtcbiAgICBpZiAocHVibGljUHJvcHMpIE9iamVjdC5hc3NpZ24oY29udGV4dCwgcHVibGljUHJvcHMpO1xuICAgIGlmIChyZWFkb25seVByb3BzKSBDb250ZXh0LmRlZmluZVJlYWRvbmx5KGNvbnRleHQsIHJlYWRvbmx5UHJvcHMpO1xuICAgIGlmIChoaWRkZW5Qcm9wcykgQ29udGV4dC5kZWZpbmVIaWRkZW4oY29udGV4dCwgaGlkZGVuUHJvcHMpO1xuXG4gICAgcmV0dXJuIGNvbnRleHQ7XG4gIH1cblxuICAvKiogQWRkcyByZWFkb25seSBwcm9wZXJ0aWVzIHRvIGEgQ29udGV4dCAqL1xuICBzdGF0aWMgZGVmaW5lUmVhZG9ubHkoY29udGV4dDogQ29udGV4dCwgUHJvcHM6IElDb250ZXh0RGVmKSB7XG5cbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6Zm9yaW5cbiAgICBmb3IgKGNvbnN0IHByb3AgaW4gUHJvcHMpIHtcbiAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjb250ZXh0LCBwcm9wLCB7XG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgIHdyaXRhYmxlOiBmYWxzZSxcbiAgICAgICAgdmFsdWU6IFByb3BzW3Byb3BdXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4gY29udGV4dDtcbiAgfVxuXG4gIC8qKiBBZGRzIGhpZGRlbiAobm9uIGVudW1lcmFibGUpIHByb3BlcnRpZXMgdG8gYSBDb250ZXh0ICovXG4gIHN0YXRpYyBkZWZpbmVIaWRkZW4oY29udGV4dDogQ29udGV4dCwgaGlkZGVuUHJvcHM6IElDb250ZXh0RGVmKSB7XG5cbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6Zm9yaW5cbiAgICBmb3IgKGNvbnN0IHByb3AgaW4gaGlkZGVuUHJvcHMpIHtcbiAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjb250ZXh0LCBwcm9wLCB7XG4gICAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgICAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICAgICAgdmFsdWU6IGhpZGRlblByb3BzW3Byb3BdXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4gY29udGV4dDtcbiAgfVxuXG4gIC8qKiBhZGRzIHB1YmxpYyBwcm9wZXJ0aWVzIG9ubHkgaWYgdGhleSBkb24ndCBleGlzdCBpbiBwYXJlbnQgKi9cbiAgc3RhdGljIGRlZmluZVdlYWsoY29udGV4dDogQ29udGV4dCwgcHJvcHM6IElDb250ZXh0RGVmKSB7XG5cbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6Zm9yaW5cbiAgICBmb3IgKGNvbnN0IHByb3AgaW4gcHJvcHMpIHtcbiAgICAgIGlmIChwcm9wIGluIGNvbnRleHQpIGNvbnRpbnVlO1xuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGNvbnRleHQsIHByb3AsIHtcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgd3JpdGFibGU6IHRydWUsXG4gICAgICAgIHZhbHVlOiBwcm9wc1twcm9wXVxuICAgICAgfSk7XG4gICAgfVxuICB9XG59XG4iXX0=