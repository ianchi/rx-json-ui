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
export class Context {
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
function Context_tsickle_Closure_declarations() {
    /**
     * Helper definition of built-in objects
     * @type {?}
     */
    Context.builtinsDef;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGV4dC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL3JlYWN0aXZlLWpzb24tZm9ybS1uZy8iLCJzb3VyY2VzIjpbImxpYi9jb3JlL2NvbnRleHQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBaUJBLE1BQU07Ozs7Ozs7Ozs7O0lBOEJKLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBZ0IsRUFBRSxXQUF5QixFQUN2RCxhQUEyQixFQUMzQixXQUF5QixFQUN6QixRQUFrQjtRQUVsQix1QkFBTSxPQUFPLEdBQVksTUFBTSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLE9BQU8sRUFBRSxDQUFDO1FBRXhFLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQztZQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUNuRSxFQUFFLENBQUMsQ0FBQyxXQUFXLENBQUM7WUFBQyxNQUFNLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxXQUFXLENBQUMsQ0FBQztRQUNyRCxFQUFFLENBQUMsQ0FBQyxhQUFhLENBQUM7WUFBQyxPQUFPLENBQUMsY0FBYyxDQUFDLE9BQU8sRUFBRSxhQUFhLENBQUMsQ0FBQztRQUNsRSxFQUFFLENBQUMsQ0FBQyxXQUFXLENBQUM7WUFBQyxPQUFPLENBQUMsWUFBWSxDQUFDLE9BQU8sRUFBRSxXQUFXLENBQUMsQ0FBQztRQUU1RCxNQUFNLENBQUMsT0FBTyxDQUFDO0tBQ2hCOzs7Ozs7O0lBR0QsTUFBTSxDQUFDLGNBQWMsQ0FBQyxPQUFnQixFQUFFLEtBQWtCOztRQUd4RCxHQUFHLENBQUMsQ0FBQyx1QkFBTSxJQUFJLElBQUksS0FBSyxDQUFDLENBQUMsQ0FBQztZQUN6QixNQUFNLENBQUMsY0FBYyxDQUFDLE9BQU8sRUFBRSxJQUFJLEVBQUU7Z0JBQ25DLFVBQVUsRUFBRSxJQUFJO2dCQUNoQixRQUFRLEVBQUUsS0FBSztnQkFDZixLQUFLLEVBQUUsS0FBSyxDQUFDLElBQUksQ0FBQzthQUNuQixDQUFDLENBQUM7U0FDSjtRQUVELE1BQU0sQ0FBQyxPQUFPLENBQUM7S0FDaEI7Ozs7Ozs7SUFHRCxNQUFNLENBQUMsWUFBWSxDQUFDLE9BQWdCLEVBQUUsV0FBd0I7O1FBRzVELEdBQUcsQ0FBQyxDQUFDLHVCQUFNLElBQUksSUFBSSxXQUFXLENBQUMsQ0FBQyxDQUFDO1lBQy9CLE1BQU0sQ0FBQyxjQUFjLENBQUMsT0FBTyxFQUFFLElBQUksRUFBRTtnQkFDbkMsVUFBVSxFQUFFLEtBQUs7Z0JBQ2pCLFFBQVEsRUFBRSxJQUFJO2dCQUNkLEtBQUssRUFBRSxXQUFXLENBQUMsSUFBSSxDQUFDO2FBQ3pCLENBQUMsQ0FBQztTQUNKO1FBRUQsTUFBTSxDQUFDLE9BQU8sQ0FBQztLQUNoQjs7Ozs7OztJQUdELE1BQU0sQ0FBQyxVQUFVLENBQUMsT0FBZ0IsRUFBRSxLQUFrQjs7UUFHcEQsR0FBRyxDQUFDLENBQUMsdUJBQU0sSUFBSSxJQUFJLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDekIsRUFBRSxDQUFDLENBQUMsSUFBSSxJQUFJLE9BQU8sQ0FBQztnQkFBQyxRQUFRLENBQUM7WUFDOUIsTUFBTSxDQUFDLGNBQWMsQ0FBQyxPQUFPLEVBQUUsSUFBSSxFQUFFO2dCQUNuQyxVQUFVLEVBQUUsSUFBSTtnQkFDaEIsUUFBUSxFQUFFLElBQUk7Z0JBQ2QsS0FBSyxFQUFFLEtBQUssQ0FBQyxJQUFJLENBQUM7YUFDbkIsQ0FBQyxDQUFDO1NBQ0o7S0FDRjs7Ozs7c0JBcEZpQzs7SUFHaEMsVUFBVSxFQUFFLFVBQVU7SUFDdEIsUUFBUSxFQUFFLFFBQVE7SUFDbEIsS0FBSyxFQUFFLEtBQUs7SUFDWixRQUFRLEVBQUUsUUFBUTs7SUFHbEIsTUFBTSxFQUFFLE1BQU07SUFDZCxJQUFJLEVBQUUsSUFBSTtJQUNWLElBQUksRUFBRSxJQUFJO0lBQ1YsS0FBSyxFQUFFLEtBQUs7SUFDWixJQUFJLEVBQUUsSUFBSTtJQUNWLE1BQU0sRUFBRSxNQUFNO0NBRWYiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxOCBBZHJpYW4gUGFuZWxsYSA8aWFuY2hpNzRAb3V0bG9vay5jb20+XG4gKlxuICogVGhpcyBzb2Z0d2FyZSBpcyByZWxlYXNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuXG4gKiBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL01JVFxuICovXG5cbmV4cG9ydCBpbnRlcmZhY2UgSUNvbnRleHREZWYge1xuICBbaWRlbnRpZmllcjogc3RyaW5nXTogYW55O1xufVxuXG5cbi8qKlxuICogSGVscGVyIGNsYXNzIHRvIGhvbGQgY29udGV4dCBmb3IgZXhwcmVzc2lvbiBldmFsdWF0aW9uLlxuICogSXQgb25seSBnaXZlcyBhICd0eXBlJyB0byBhIHBsYWluIG9iamVjdC5cbiAqIEl0IGhhcyBzdGF0aWMgbWV0aG9kcyB0byBtYW5hZ2UgaW5oZXJpdGFuY2UgYW5kIGFkZGluZyBwcm9wZXJ0aWVzIGFuZCBidWlsdGluc1xuICovXG5leHBvcnQgY2xhc3MgQ29udGV4dCB7XG5cbiAgLyoqIEhlbHBlciBkZWZpbml0aW9uIG9mIGJ1aWx0LWluIG9iamVjdHMgKi9cbiAgc3RhdGljIGJ1aWx0aW5zRGVmOiBJQ29udGV4dERlZiA9IHtcblxuICAgIC8vIEJ1aWx0aW4gZnVuY3Rpb25zOlxuICAgIHBhcnNlRmxvYXQ6IHBhcnNlRmxvYXQsXG4gICAgcGFyc2VJbnQ6IHBhcnNlSW50LFxuICAgIGlzTmFOOiBpc05hTixcbiAgICBpc0Zpbml0ZTogaXNGaW5pdGUsXG5cbiAgICAvLyBGdW5kYW1lbnRhbCBvYmplY3RzOlxuICAgIE51bWJlcjogTnVtYmVyLFxuICAgIE1hdGg6IE1hdGgsXG4gICAgRGF0ZTogRGF0ZSxcbiAgICBBcnJheTogQXJyYXksXG4gICAgSlNPTjogSlNPTixcbiAgICBPYmplY3Q6IE9iamVjdCxcblxuICB9O1xuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgQ29udGV4dCBvYmplY3QsIGluaGVyaXRpbmcgZnJvbSBhbiBvcHRpb25hbCBgcGFyZW50YCBhbmQgYWRkaW5nIGN1c3RvbSBwcm9wZXJ0aWVzXG4gICAqIGFuZCBvcHRpb25hbGx5IGJ1aWx0aW4gb2JqZWN0c1xuICAgKiBAcGFyYW0gcGFyZW50XG4gICAqIEBwYXJhbSBwdWJsaWNQcm9wc1xuICAgKiBAcGFyYW0gcmVhZG9ubHlQcm9wc1xuICAgKiBAcGFyYW0gaGlkZGVuUHJvcHNcbiAgICogQHBhcmFtIGJ1aWx0aW5zIEJvb2xlYW4uIElmIHRydWUgYWRkcyBidWlsdGlub2JqZWN0cyBhcyBwdWJsaWMgcHJvcGVydGllcyxcbiAgICovXG4gIHN0YXRpYyBjcmVhdGUocGFyZW50PzogQ29udGV4dCwgcHVibGljUHJvcHM/OiBJQ29udGV4dERlZixcbiAgICByZWFkb25seVByb3BzPzogSUNvbnRleHREZWYsXG4gICAgaGlkZGVuUHJvcHM/OiBJQ29udGV4dERlZixcbiAgICBidWlsdGlucz86IGJvb2xlYW4pOiBDb250ZXh0IHtcblxuICAgIGNvbnN0IGNvbnRleHQ6IENvbnRleHQgPSBwYXJlbnQgPyBPYmplY3QuY3JlYXRlKHBhcmVudCkgOiBuZXcgQ29udGV4dCgpO1xuXG4gICAgaWYgKGJ1aWx0aW5zKSBDb250ZXh0LmRlZmluZVJlYWRvbmx5KGNvbnRleHQsIENvbnRleHQuYnVpbHRpbnNEZWYpO1xuICAgIGlmIChwdWJsaWNQcm9wcykgT2JqZWN0LmFzc2lnbihjb250ZXh0LCBwdWJsaWNQcm9wcyk7XG4gICAgaWYgKHJlYWRvbmx5UHJvcHMpIENvbnRleHQuZGVmaW5lUmVhZG9ubHkoY29udGV4dCwgcmVhZG9ubHlQcm9wcyk7XG4gICAgaWYgKGhpZGRlblByb3BzKSBDb250ZXh0LmRlZmluZUhpZGRlbihjb250ZXh0LCBoaWRkZW5Qcm9wcyk7XG5cbiAgICByZXR1cm4gY29udGV4dDtcbiAgfVxuXG4gIC8qKiBBZGRzIHJlYWRvbmx5IHByb3BlcnRpZXMgdG8gYSBDb250ZXh0ICovXG4gIHN0YXRpYyBkZWZpbmVSZWFkb25seShjb250ZXh0OiBDb250ZXh0LCBQcm9wczogSUNvbnRleHREZWYpIHtcblxuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpmb3JpblxuICAgIGZvciAoY29uc3QgcHJvcCBpbiBQcm9wcykge1xuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGNvbnRleHQsIHByb3AsIHtcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgd3JpdGFibGU6IGZhbHNlLFxuICAgICAgICB2YWx1ZTogUHJvcHNbcHJvcF1cbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHJldHVybiBjb250ZXh0O1xuICB9XG5cbiAgLyoqIEFkZHMgaGlkZGVuIChub24gZW51bWVyYWJsZSkgcHJvcGVydGllcyB0byBhIENvbnRleHQgKi9cbiAgc3RhdGljIGRlZmluZUhpZGRlbihjb250ZXh0OiBDb250ZXh0LCBoaWRkZW5Qcm9wczogSUNvbnRleHREZWYpIHtcblxuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpmb3JpblxuICAgIGZvciAoY29uc3QgcHJvcCBpbiBoaWRkZW5Qcm9wcykge1xuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGNvbnRleHQsIHByb3AsIHtcbiAgICAgICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgICAgIHdyaXRhYmxlOiB0cnVlLFxuICAgICAgICB2YWx1ZTogaGlkZGVuUHJvcHNbcHJvcF1cbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHJldHVybiBjb250ZXh0O1xuICB9XG5cbiAgLyoqIGFkZHMgcHVibGljIHByb3BlcnRpZXMgb25seSBpZiB0aGV5IGRvbid0IGV4aXN0IGluIHBhcmVudCAqL1xuICBzdGF0aWMgZGVmaW5lV2Vhayhjb250ZXh0OiBDb250ZXh0LCBwcm9wczogSUNvbnRleHREZWYpIHtcblxuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpmb3JpblxuICAgIGZvciAoY29uc3QgcHJvcCBpbiBwcm9wcykge1xuICAgICAgaWYgKHByb3AgaW4gY29udGV4dCkgY29udGludWU7XG4gICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoY29udGV4dCwgcHJvcCwge1xuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICAgICAgdmFsdWU6IHByb3BzW3Byb3BdXG4gICAgICB9KTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==