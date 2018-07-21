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
import * as tslib_1 from "tslib";
import { FormControl, FormGroup, FormArray } from '@angular/forms';
import { GET_OBSERVABLE, isReactive } from 'espression';
import { take, map } from 'rxjs/operators';
import { AbstractWidget } from './abstractwidget';
import { Context } from './context';
export var /** @type {?} */ FORM_CONTROL = Symbol('FormControl');
var AbstractFormFieldWidget = /** @class */ (function (_super) {
    tslib_1.__extends(AbstractFormFieldWidget, _super);
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
        if (!isReactive(lvalue.o))
            throw new Error('Bound Key must be of Reactive Type');
        // setup validation
        if (def.validate && (this.validate = this._expr.parse(def.validate))) {
            // tslint:disable-line:whitespace
            this.validateContext = Context.create(this.context);
            this.formControl = new FormControl(null, null, function (ctrl) {
                _this.validateContext['$value'] = ctrl.value;
                return _this._expr.evaluate(_this.validate, _this.validateContext, true).pipe(take(1), map(function (res) {
                    return res ? null : { validate: 'validation error' };
                }));
            });
        }
        else
            this.formControl = new FormControl();
        var /** @type {?} */ parentForm = this.context[FORM_CONTROL];
        if (parentForm) {
            if (parentForm instanceof FormGroup)
                parentForm.addControl(lvalue.m, this.formControl);
            else if (parentForm instanceof FormArray)
                parentForm.push(this.formControl);
        }
        // listen to bound context value and update on changes
        this.addSubscription = lvalue.o[GET_OBSERVABLE](lvalue.m).subscribe(function (val) {
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
export { AbstractFormFieldWidget };
function AbstractFormFieldWidget_tsickle_Closure_declarations() {
    /** @type {?} */
    AbstractFormFieldWidget.prototype.formControl;
    /** @type {?} */
    AbstractFormFieldWidget.prototype.validate;
    /** @type {?} */
    AbstractFormFieldWidget.prototype.validateContext;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybWZpZWxkd2lkZ2V0LmpzIiwic291cmNlUm9vdCI6Im5nOi8vcmVhY3RpdmUtanNvbi1mb3JtLW5nLyIsInNvdXJjZXMiOlsibGliL2NvcmUvZm9ybWZpZWxkd2lkZ2V0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBT0EsT0FBTyxFQUFFLFdBQVcsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFtQixNQUFNLGdCQUFnQixDQUFDO0FBRXBGLE9BQU8sRUFBRSxjQUFjLEVBQUUsVUFBVSxFQUFTLE1BQU0sWUFBWSxDQUFDO0FBQy9ELE9BQU8sRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDM0MsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBQ2xELE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxXQUFXLENBQUM7QUFLcEMsTUFBTSxDQUFDLHFCQUFNLFlBQVksR0FBRyxNQUFNLENBQUMsYUFBYSxDQUFDLENBQUM7QUFDbEQsSUFBQTtJQUE2QyxtREFBYztJQU96RCxpQ0FBWSxHQUFzQixFQUFFLElBQWlCO2VBQ25ELGtCQUFNLEdBQUcsRUFBRSxJQUFJLENBQUM7S0FDakI7Ozs7O0lBQ0QsNENBQVU7Ozs7SUFBVixVQUFXLEdBQWU7UUFBMUIsaUJBa0RDOztRQS9DQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUM7WUFDWixNQUFNLElBQUksS0FBSyxDQUFDLHdEQUF3RCxDQUFDLENBQUM7UUFFNUUscUJBQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBRXpELEVBQUUsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDO1lBQ1YsTUFBTSxJQUFJLEtBQUssQ0FBQyx1RUFBdUUsQ0FBQyxDQUFDO1FBRTNGLEVBQUUsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN4QixNQUFNLElBQUksS0FBSyxDQUFDLG9DQUFvQyxDQUFDLENBQUM7O1FBTXhELEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxRQUFRLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzs7WUFDckUsSUFBSSxDQUFDLGVBQWUsR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUVwRCxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksV0FBVyxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsVUFBQyxJQUFxQjtnQkFDbkUsS0FBSSxDQUFDLGVBQWUsQ0FBQyxRQUFRLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO2dCQUM1QyxNQUFNLENBQUMsS0FBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsS0FBSSxDQUFDLFFBQVEsRUFBRSxLQUFJLENBQUMsZUFBZSxFQUFFLElBQUksQ0FBQyxDQUFDLElBQUksQ0FDeEUsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUNQLEdBQUcsQ0FBQyxVQUFBLEdBQUc7b0JBQ0wsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLFFBQVEsRUFBRSxrQkFBa0IsRUFBRSxDQUFDO2lCQUN0RCxDQUFDLENBQ0gsQ0FBQzthQUNILENBQUMsQ0FBQztTQUNKO1FBQUMsSUFBSTtZQUFDLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxXQUFXLEVBQUUsQ0FBQztRQUU1QyxxQkFBTSxVQUFVLEdBQTBCLElBQUksQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDckUsRUFBRSxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztZQUNmLEVBQUUsQ0FBQyxDQUFDLFVBQVUsWUFBWSxTQUFTLENBQUM7Z0JBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUN2RixJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsVUFBVSxZQUFZLFNBQVMsQ0FBQztnQkFBQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztTQUM3RTs7UUFHRCxJQUFJLENBQUMsZUFBZSxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsY0FBYyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxVQUFBLEdBQUc7WUFDckUsT0FBQSxHQUFHLEtBQUssS0FBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLElBQUksS0FBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDO1FBQWhFLENBQWdFLENBQUMsQ0FBQzs7UUFHcEUsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsVUFBQSxHQUFHO1lBQ2hFLEVBQUUsQ0FBQyxDQUFDLEdBQUcsS0FBSyxNQUFNLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDN0IsTUFBTSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDO1NBQzVCLENBQUMsQ0FBQztRQUdILE1BQU0sQ0FBQyxHQUFHLENBQUM7S0FDWjtrQ0E5RUg7RUFrQjZDLGNBQWMsRUE2RDFELENBQUE7QUE3REQsbUNBNkRDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTggQWRyaWFuIFBhbmVsbGEgPGlhbmNoaTc0QG91dGxvb2suY29tPlxuICpcbiAqIFRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLlxuICogaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9NSVRcbiAqL1xuXG5pbXBvcnQgeyBGb3JtQ29udHJvbCwgRm9ybUdyb3VwLCBGb3JtQXJyYXksIEFic3RyYWN0Q29udHJvbCB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IENoYW5nZURldGVjdG9yUmVmfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEdFVF9PQlNFUlZBQkxFLCBpc1JlYWN0aXZlLCBJTm9kZSB9IGZyb20gJ2VzcHJlc3Npb24nO1xuaW1wb3J0IHsgdGFrZSwgbWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgQWJzdHJhY3RXaWRnZXQgfSBmcm9tICcuL2Fic3RyYWN0d2lkZ2V0JztcbmltcG9ydCB7IENvbnRleHQgfSBmcm9tICcuL2NvbnRleHQnO1xuaW1wb3J0IHsgRXhwcmVzc2lvbnMgfSBmcm9tICcuL2V4cHJlc3Npb25zJztcbmltcG9ydCB7IElXaWRnZXREZWYgfSBmcm9tICcuL3dpZGdldC5pbnRlcmZhY2UnO1xuXG5cbmV4cG9ydCBjb25zdCBGT1JNX0NPTlRST0wgPSBTeW1ib2woJ0Zvcm1Db250cm9sJyk7XG5leHBvcnQgY2xhc3MgQWJzdHJhY3RGb3JtRmllbGRXaWRnZXQgZXh0ZW5kcyBBYnN0cmFjdFdpZGdldCB7XG5cblxuICBmb3JtQ29udHJvbDogRm9ybUNvbnRyb2w7XG5cbiAgdmFsaWRhdGU6IElOb2RlO1xuICB2YWxpZGF0ZUNvbnRleHQ6IENvbnRleHQ7XG4gIGNvbnN0cnVjdG9yKGNkcjogQ2hhbmdlRGV0ZWN0b3JSZWYsIGV4cHI6IEV4cHJlc3Npb25zKSB7XG4gICAgc3VwZXIoY2RyLCBleHByKTtcbiAgfVxuICBkeW5PblNldHVwKGRlZjogSVdpZGdldERlZik6IElXaWRnZXREZWYge1xuXG4gICAgLy8gZ2V0IGJvdW5kIG1vZGVsXG4gICAgaWYgKCFkZWYuYmluZClcbiAgICAgIHRocm93IG5ldyBFcnJvcignRm9ybSBmaWVsZCB3aWRnZXRzIG11c3QgaGF2ZSBhIFwiYmluZFwiIHByb3BlcnR5IGRlZmluZWQnKTtcblxuICAgIGNvbnN0IGx2YWx1ZSA9IHRoaXMuX2V4cHIubHZhbHVlKGRlZi5iaW5kLCB0aGlzLmNvbnRleHQpO1xuXG4gICAgaWYgKCFsdmFsdWUpXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0Zvcm0gZmllbGQgXCJiaW5kXCIgcHJvcGVydHkgbXVzdCBiZSBhbiBpZGVudGlmaWVyIG9yIG1lbWJlciBleHByZXNzaW9uJyk7XG5cbiAgICBpZiAoIWlzUmVhY3RpdmUobHZhbHVlLm8pKVxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdCb3VuZCBLZXkgbXVzdCBiZSBvZiBSZWFjdGl2ZSBUeXBlJyk7XG5cblxuICAgIC8vIHNldHVwIHZhbGlkYXRpb25cblxuXG4gICAgaWYgKGRlZi52YWxpZGF0ZSAmJiAodGhpcy52YWxpZGF0ZSA9IHRoaXMuX2V4cHIucGFyc2UoZGVmLnZhbGlkYXRlKSkpIHsvLyB0c2xpbnQ6ZGlzYWJsZS1saW5lOndoaXRlc3BhY2VcbiAgICAgIHRoaXMudmFsaWRhdGVDb250ZXh0ID0gQ29udGV4dC5jcmVhdGUodGhpcy5jb250ZXh0KTtcblxuICAgICAgdGhpcy5mb3JtQ29udHJvbCA9IG5ldyBGb3JtQ29udHJvbChudWxsLCBudWxsLCAoY3RybDogQWJzdHJhY3RDb250cm9sKSA9PiB7XG4gICAgICAgIHRoaXMudmFsaWRhdGVDb250ZXh0WyckdmFsdWUnXSA9IGN0cmwudmFsdWU7XG4gICAgICAgIHJldHVybiB0aGlzLl9leHByLmV2YWx1YXRlKHRoaXMudmFsaWRhdGUsIHRoaXMudmFsaWRhdGVDb250ZXh0LCB0cnVlKS5waXBlKFxuICAgICAgICAgIHRha2UoMSksXG4gICAgICAgICAgbWFwKHJlcyA9PiB7XG4gICAgICAgICAgICByZXR1cm4gcmVzID8gbnVsbCA6IHsgdmFsaWRhdGU6ICd2YWxpZGF0aW9uIGVycm9yJyB9O1xuICAgICAgICAgIH0pXG4gICAgICAgICk7XG4gICAgICB9KTtcbiAgICB9IGVsc2UgdGhpcy5mb3JtQ29udHJvbCA9IG5ldyBGb3JtQ29udHJvbCgpO1xuXG4gICAgY29uc3QgcGFyZW50Rm9ybTogRm9ybUdyb3VwIHwgRm9ybUFycmF5ID0gdGhpcy5jb250ZXh0W0ZPUk1fQ09OVFJPTF07XG4gICAgaWYgKHBhcmVudEZvcm0pIHtcbiAgICAgIGlmIChwYXJlbnRGb3JtIGluc3RhbmNlb2YgRm9ybUdyb3VwKSBwYXJlbnRGb3JtLmFkZENvbnRyb2wobHZhbHVlLm0sIHRoaXMuZm9ybUNvbnRyb2wpO1xuICAgICAgZWxzZSBpZiAocGFyZW50Rm9ybSBpbnN0YW5jZW9mIEZvcm1BcnJheSkgcGFyZW50Rm9ybS5wdXNoKHRoaXMuZm9ybUNvbnRyb2wpO1xuICAgIH1cblxuICAgIC8vIGxpc3RlbiB0byBib3VuZCBjb250ZXh0IHZhbHVlIGFuZCB1cGRhdGUgb24gY2hhbmdlc1xuICAgIHRoaXMuYWRkU3Vic2NyaXB0aW9uID0gbHZhbHVlLm9bR0VUX09CU0VSVkFCTEVdKGx2YWx1ZS5tKS5zdWJzY3JpYmUodmFsID0+XG4gICAgICB2YWwgIT09IHRoaXMuZm9ybUNvbnRyb2wudmFsdWUgJiYgdGhpcy5mb3JtQ29udHJvbC5zZXRWYWx1ZSh2YWwpKTtcblxuICAgIC8vIGxpc3RlbiB0byBjb250cm9sIGNoYW5nZXMgdG8gdXBkYXRlIGJvdW5kIGNvbnRleHQgdmFsdWVcbiAgICB0aGlzLmFkZFN1YnNjcmlwdGlvbiA9IHRoaXMuZm9ybUNvbnRyb2wudmFsdWVDaGFuZ2VzLnN1YnNjcmliZSh2YWwgPT4ge1xuICAgICAgaWYgKHZhbCAhPT0gbHZhbHVlLm9bbHZhbHVlLm1dKVxuICAgICAgICBsdmFsdWUub1tsdmFsdWUubV0gPSB2YWw7XG4gICAgfSk7XG5cblxuICAgIHJldHVybiBkZWY7XG4gIH1cbn1cbiJdfQ==