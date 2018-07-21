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
import { FormControl, FormGroup, FormArray } from '@angular/forms';
import { GET_OBSERVABLE, isReactive } from 'espression';
import { take, map } from 'rxjs/operators';
import { AbstractWidget } from './abstractwidget';
import { Context } from './context';
export const /** @type {?} */ FORM_CONTROL = Symbol('FormControl');
export class AbstractFormFieldWidget extends AbstractWidget {
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
function AbstractFormFieldWidget_tsickle_Closure_declarations() {
    /** @type {?} */
    AbstractFormFieldWidget.prototype.formControl;
    /** @type {?} */
    AbstractFormFieldWidget.prototype.validate;
    /** @type {?} */
    AbstractFormFieldWidget.prototype.validateContext;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybWZpZWxkd2lkZ2V0LmpzIiwic291cmNlUm9vdCI6Im5nOi8vcmVhY3RpdmUtanNvbi1mb3JtLW5nLyIsInNvdXJjZXMiOlsibGliL2NvcmUvZm9ybWZpZWxkd2lkZ2V0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFPQSxPQUFPLEVBQUUsV0FBVyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQW1CLE1BQU0sZ0JBQWdCLENBQUM7QUFFcEYsT0FBTyxFQUFFLGNBQWMsRUFBRSxVQUFVLEVBQVMsTUFBTSxZQUFZLENBQUM7QUFDL0QsT0FBTyxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUMzQyxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFDbEQsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLFdBQVcsQ0FBQztBQUtwQyxNQUFNLENBQUMsdUJBQU0sWUFBWSxHQUFHLE1BQU0sQ0FBQyxhQUFhLENBQUMsQ0FBQztBQUNsRCxNQUFNLDhCQUErQixTQUFRLGNBQWM7Ozs7O0lBT3pELFlBQVksR0FBc0IsRUFBRSxJQUFpQjtRQUNuRCxLQUFLLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDO0tBQ2xCOzs7OztJQUNELFVBQVUsQ0FBQyxHQUFlOztRQUd4QixFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUM7WUFDWixNQUFNLElBQUksS0FBSyxDQUFDLHdEQUF3RCxDQUFDLENBQUM7UUFFNUUsdUJBQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBRXpELEVBQUUsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDO1lBQ1YsTUFBTSxJQUFJLEtBQUssQ0FBQyx1RUFBdUUsQ0FBQyxDQUFDO1FBRTNGLEVBQUUsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN4QixNQUFNLElBQUksS0FBSyxDQUFDLG9DQUFvQyxDQUFDLENBQUM7O1FBTXhELEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxRQUFRLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzs7WUFDckUsSUFBSSxDQUFDLGVBQWUsR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUVwRCxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksV0FBVyxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQyxJQUFxQixFQUFFLEVBQUU7Z0JBQ3ZFLElBQUksQ0FBQyxlQUFlLENBQUMsUUFBUSxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztnQkFDNUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLGVBQWUsRUFBRSxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQ3hFLElBQUksQ0FBQyxDQUFDLENBQUMsRUFDUCxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUU7b0JBQ1IsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLFFBQVEsRUFBRSxrQkFBa0IsRUFBRSxDQUFDO2lCQUN0RCxDQUFDLENBQ0gsQ0FBQzthQUNILENBQUMsQ0FBQztTQUNKO1FBQUMsSUFBSTtZQUFDLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxXQUFXLEVBQUUsQ0FBQztRQUU1Qyx1QkFBTSxVQUFVLEdBQTBCLElBQUksQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDckUsRUFBRSxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztZQUNmLEVBQUUsQ0FBQyxDQUFDLFVBQVUsWUFBWSxTQUFTLENBQUM7Z0JBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUN2RixJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsVUFBVSxZQUFZLFNBQVMsQ0FBQztnQkFBQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztTQUM3RTs7UUFHRCxJQUFJLENBQUMsZUFBZSxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsY0FBYyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUN4RSxHQUFHLEtBQUssSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQzs7UUFHcEUsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLEVBQUU7WUFDbkUsRUFBRSxDQUFDLENBQUMsR0FBRyxLQUFLLE1BQU0sQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUM3QixNQUFNLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUM7U0FDNUIsQ0FBQyxDQUFDO1FBR0gsTUFBTSxDQUFDLEdBQUcsQ0FBQztLQUNaO0NBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxOCBBZHJpYW4gUGFuZWxsYSA8aWFuY2hpNzRAb3V0bG9vay5jb20+XG4gKlxuICogVGhpcyBzb2Z0d2FyZSBpcyByZWxlYXNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuXG4gKiBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL01JVFxuICovXG5cbmltcG9ydCB7IEZvcm1Db250cm9sLCBGb3JtR3JvdXAsIEZvcm1BcnJheSwgQWJzdHJhY3RDb250cm9sIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0b3JSZWZ9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgR0VUX09CU0VSVkFCTEUsIGlzUmVhY3RpdmUsIElOb2RlIH0gZnJvbSAnZXNwcmVzc2lvbic7XG5pbXBvcnQgeyB0YWtlLCBtYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBBYnN0cmFjdFdpZGdldCB9IGZyb20gJy4vYWJzdHJhY3R3aWRnZXQnO1xuaW1wb3J0IHsgQ29udGV4dCB9IGZyb20gJy4vY29udGV4dCc7XG5pbXBvcnQgeyBFeHByZXNzaW9ucyB9IGZyb20gJy4vZXhwcmVzc2lvbnMnO1xuaW1wb3J0IHsgSVdpZGdldERlZiB9IGZyb20gJy4vd2lkZ2V0LmludGVyZmFjZSc7XG5cblxuZXhwb3J0IGNvbnN0IEZPUk1fQ09OVFJPTCA9IFN5bWJvbCgnRm9ybUNvbnRyb2wnKTtcbmV4cG9ydCBjbGFzcyBBYnN0cmFjdEZvcm1GaWVsZFdpZGdldCBleHRlbmRzIEFic3RyYWN0V2lkZ2V0IHtcblxuXG4gIGZvcm1Db250cm9sOiBGb3JtQ29udHJvbDtcblxuICB2YWxpZGF0ZTogSU5vZGU7XG4gIHZhbGlkYXRlQ29udGV4dDogQ29udGV4dDtcbiAgY29uc3RydWN0b3IoY2RyOiBDaGFuZ2VEZXRlY3RvclJlZiwgZXhwcjogRXhwcmVzc2lvbnMpIHtcbiAgICBzdXBlcihjZHIsIGV4cHIpO1xuICB9XG4gIGR5bk9uU2V0dXAoZGVmOiBJV2lkZ2V0RGVmKTogSVdpZGdldERlZiB7XG5cbiAgICAvLyBnZXQgYm91bmQgbW9kZWxcbiAgICBpZiAoIWRlZi5iaW5kKVxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdGb3JtIGZpZWxkIHdpZGdldHMgbXVzdCBoYXZlIGEgXCJiaW5kXCIgcHJvcGVydHkgZGVmaW5lZCcpO1xuXG4gICAgY29uc3QgbHZhbHVlID0gdGhpcy5fZXhwci5sdmFsdWUoZGVmLmJpbmQsIHRoaXMuY29udGV4dCk7XG5cbiAgICBpZiAoIWx2YWx1ZSlcbiAgICAgIHRocm93IG5ldyBFcnJvcignRm9ybSBmaWVsZCBcImJpbmRcIiBwcm9wZXJ0eSBtdXN0IGJlIGFuIGlkZW50aWZpZXIgb3IgbWVtYmVyIGV4cHJlc3Npb24nKTtcblxuICAgIGlmICghaXNSZWFjdGl2ZShsdmFsdWUubykpXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0JvdW5kIEtleSBtdXN0IGJlIG9mIFJlYWN0aXZlIFR5cGUnKTtcblxuXG4gICAgLy8gc2V0dXAgdmFsaWRhdGlvblxuXG5cbiAgICBpZiAoZGVmLnZhbGlkYXRlICYmICh0aGlzLnZhbGlkYXRlID0gdGhpcy5fZXhwci5wYXJzZShkZWYudmFsaWRhdGUpKSkgey8vIHRzbGludDpkaXNhYmxlLWxpbmU6d2hpdGVzcGFjZVxuICAgICAgdGhpcy52YWxpZGF0ZUNvbnRleHQgPSBDb250ZXh0LmNyZWF0ZSh0aGlzLmNvbnRleHQpO1xuXG4gICAgICB0aGlzLmZvcm1Db250cm9sID0gbmV3IEZvcm1Db250cm9sKG51bGwsIG51bGwsIChjdHJsOiBBYnN0cmFjdENvbnRyb2wpID0+IHtcbiAgICAgICAgdGhpcy52YWxpZGF0ZUNvbnRleHRbJyR2YWx1ZSddID0gY3RybC52YWx1ZTtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2V4cHIuZXZhbHVhdGUodGhpcy52YWxpZGF0ZSwgdGhpcy52YWxpZGF0ZUNvbnRleHQsIHRydWUpLnBpcGUoXG4gICAgICAgICAgdGFrZSgxKSxcbiAgICAgICAgICBtYXAocmVzID0+IHtcbiAgICAgICAgICAgIHJldHVybiByZXMgPyBudWxsIDogeyB2YWxpZGF0ZTogJ3ZhbGlkYXRpb24gZXJyb3InIH07XG4gICAgICAgICAgfSlcbiAgICAgICAgKTtcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB0aGlzLmZvcm1Db250cm9sID0gbmV3IEZvcm1Db250cm9sKCk7XG5cbiAgICBjb25zdCBwYXJlbnRGb3JtOiBGb3JtR3JvdXAgfCBGb3JtQXJyYXkgPSB0aGlzLmNvbnRleHRbRk9STV9DT05UUk9MXTtcbiAgICBpZiAocGFyZW50Rm9ybSkge1xuICAgICAgaWYgKHBhcmVudEZvcm0gaW5zdGFuY2VvZiBGb3JtR3JvdXApIHBhcmVudEZvcm0uYWRkQ29udHJvbChsdmFsdWUubSwgdGhpcy5mb3JtQ29udHJvbCk7XG4gICAgICBlbHNlIGlmIChwYXJlbnRGb3JtIGluc3RhbmNlb2YgRm9ybUFycmF5KSBwYXJlbnRGb3JtLnB1c2godGhpcy5mb3JtQ29udHJvbCk7XG4gICAgfVxuXG4gICAgLy8gbGlzdGVuIHRvIGJvdW5kIGNvbnRleHQgdmFsdWUgYW5kIHVwZGF0ZSBvbiBjaGFuZ2VzXG4gICAgdGhpcy5hZGRTdWJzY3JpcHRpb24gPSBsdmFsdWUub1tHRVRfT0JTRVJWQUJMRV0obHZhbHVlLm0pLnN1YnNjcmliZSh2YWwgPT5cbiAgICAgIHZhbCAhPT0gdGhpcy5mb3JtQ29udHJvbC52YWx1ZSAmJiB0aGlzLmZvcm1Db250cm9sLnNldFZhbHVlKHZhbCkpO1xuXG4gICAgLy8gbGlzdGVuIHRvIGNvbnRyb2wgY2hhbmdlcyB0byB1cGRhdGUgYm91bmQgY29udGV4dCB2YWx1ZVxuICAgIHRoaXMuYWRkU3Vic2NyaXB0aW9uID0gdGhpcy5mb3JtQ29udHJvbC52YWx1ZUNoYW5nZXMuc3Vic2NyaWJlKHZhbCA9PiB7XG4gICAgICBpZiAodmFsICE9PSBsdmFsdWUub1tsdmFsdWUubV0pXG4gICAgICAgIGx2YWx1ZS5vW2x2YWx1ZS5tXSA9IHZhbDtcbiAgICB9KTtcblxuXG4gICAgcmV0dXJuIGRlZjtcbiAgfVxufVxuIl19