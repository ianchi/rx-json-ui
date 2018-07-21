/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Directive, Input, ViewContainerRef, ComponentFactoryResolver, Optional, Inject, InjectionToken, } from '@angular/core';
import { WidgetRegistry } from './widgetregistry.service';
import { parseDefObject } from './abstractwidget';
import { Context } from './context';
import { Expressions } from './expressions';
/**
 * Injection token used to provide the default root context for widgets
 */
export const /** @type {?} */ ROOT_CONTEXT = new InjectionToken('Widgets Root Context');
export class WidgetDirective {
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
function WidgetDirective_tsickle_Closure_declarations() {
    /** @type {?} */
    WidgetDirective.prototype.wdgWidget;
    /** @type {?} */
    WidgetDirective.prototype.parentContext;
    /** @type {?} */
    WidgetDirective.prototype.widget;
    /** @type {?} */
    WidgetDirective.prototype.context;
    /** @type {?} */
    WidgetDirective.prototype._widgetRef;
    /** @type {?} */
    WidgetDirective.prototype._ifSubs;
    /** @type {?} */
    WidgetDirective.prototype._container;
    /** @type {?} */
    WidgetDirective.prototype._registry;
    /** @type {?} */
    WidgetDirective.prototype._cfr;
    /** @type {?} */
    WidgetDirective.prototype._rootContext;
    /** @type {?} */
    WidgetDirective.prototype._expr;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2lkZ2V0LmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL3JlYWN0aXZlLWpzb24tZm9ybS1uZy8iLCJzb3VyY2VzIjpbImxpYi9jb3JlL3dpZGdldC5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQUUsS0FBSyxFQUNoQixnQkFBZ0IsRUFDaEIsd0JBQXdCLEVBQ0YsUUFBUSxFQUFFLE1BQU0sRUFBRSxjQUFjLEdBQ3ZELE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUUxRCxPQUFPLEVBQWtCLGNBQWMsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBRWxFLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxXQUFXLENBQUM7QUFDcEMsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7OztBQUc1QyxNQUFNLENBQUMsdUJBQU0sWUFBWSxHQUFHLElBQUksY0FBYyxDQUFVLHNCQUFzQixDQUFDLENBQUM7QUFLaEYsTUFBTTs7Ozs7Ozs7SUFVSixZQUNVLFlBQ0EsV0FDQSxNQUNrQyxZQUFxQixFQUN2RDtRQUpBLGVBQVUsR0FBVixVQUFVO1FBQ1YsY0FBUyxHQUFULFNBQVM7UUFDVCxTQUFJLEdBQUosSUFBSTtRQUM4QixpQkFBWSxHQUFaLFlBQVksQ0FBUztRQUN2RCxVQUFLLEdBQUwsS0FBSztLQUVkOzs7O0lBRUQsV0FBVztRQUVULElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztLQUVuQjs7OztJQUVELFdBQVc7UUFDVCxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDaEIsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO0tBQ3BCOzs7O0lBRU8sVUFBVTtRQUNoQixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxTQUFTLElBQUksRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLENBQUM7UUFDcEQsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsYUFBYSxJQUFJLElBQUksQ0FBQyxZQUFZLENBQUM7UUFDN0QsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUUsY0FBYyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxhQUFhLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1FBRWpJLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUNoQixJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7UUFFbkIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ3RCLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEVBQUU7Z0JBQ3JGLEVBQUUsQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUM7b0JBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO2dCQUM3QyxJQUFJO29CQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQzthQUN0QixDQUFDLENBQUM7U0FDSjtRQUFDLElBQUk7WUFBQyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7Ozs7O0lBS2hCLE9BQU87UUFFYix1QkFBTSxXQUFXLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM1RCx1QkFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUMvRCxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsZUFBZSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzNELElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUM7UUFFdkMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDOzs7OztJQUloRCxRQUFRO1FBQ2QsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7WUFDcEIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUMxQixJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQztTQUN4Qjs7Ozs7SUFJSyxXQUFXO1FBRWpCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBQ2pCLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFLENBQUM7WUFDM0IsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7U0FDckI7Ozs7WUEzRUosU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxhQUFhO2FBQ3hCOzs7O1lBaEJDLGdCQUFnQjtZQUlULGNBQWM7WUFIckIsd0JBQXdCO1lBT2pCLE9BQU8sdUJBdUJYLFFBQVEsWUFBSSxNQUFNLFNBQUMsWUFBWTtZQXRCM0IsV0FBVzs7O3dCQVVqQixLQUFLOzRCQUNMLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBEaXJlY3RpdmUsIElucHV0LFxuICBWaWV3Q29udGFpbmVyUmVmLFxuICBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsIENvbXBvbmVudFJlZixcbiAgT25DaGFuZ2VzLCBPbkRlc3Ryb3ksIE9wdGlvbmFsLCBJbmplY3QsIEluamVjdGlvblRva2VuLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFdpZGdldFJlZ2lzdHJ5IH0gZnJvbSAnLi93aWRnZXRyZWdpc3RyeS5zZXJ2aWNlJztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgQWJzdHJhY3RXaWRnZXQsIHBhcnNlRGVmT2JqZWN0IH0gZnJvbSAnLi9hYnN0cmFjdHdpZGdldCc7XG5pbXBvcnQgeyBJV2lkZ2V0RGVmIH0gZnJvbSAnLi93aWRnZXQuaW50ZXJmYWNlJztcbmltcG9ydCB7IENvbnRleHQgfSBmcm9tICcuL2NvbnRleHQnO1xuaW1wb3J0IHsgRXhwcmVzc2lvbnMgfSBmcm9tICcuL2V4cHJlc3Npb25zJztcblxuLyoqIEluamVjdGlvbiB0b2tlbiB1c2VkIHRvIHByb3ZpZGUgdGhlIGRlZmF1bHQgcm9vdCBjb250ZXh0IGZvciB3aWRnZXRzICovXG5leHBvcnQgY29uc3QgUk9PVF9DT05URVhUID0gbmV3IEluamVjdGlvblRva2VuPENvbnRleHQ+KCdXaWRnZXRzIFJvb3QgQ29udGV4dCcpO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbd2RnV2lkZ2V0XSdcbn0pXG5leHBvcnQgY2xhc3MgV2lkZ2V0RGlyZWN0aXZlIGltcGxlbWVudHMgT25DaGFuZ2VzLCBPbkRlc3Ryb3kge1xuXG4gIEBJbnB1dCgpIHdkZ1dpZGdldDogSVdpZGdldERlZjtcbiAgQElucHV0KCkgcGFyZW50Q29udGV4dDogQ29udGV4dDtcblxuICB3aWRnZXQ6IEFic3RyYWN0V2lkZ2V0O1xuICBjb250ZXh0OiBDb250ZXh0O1xuICBwcml2YXRlIF93aWRnZXRSZWY6IENvbXBvbmVudFJlZjxBYnN0cmFjdFdpZGdldD47XG4gIHByaXZhdGUgX2lmU3ViczogU3Vic2NyaXB0aW9uO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgX2NvbnRhaW5lcjogVmlld0NvbnRhaW5lclJlZixcbiAgICBwcml2YXRlIF9yZWdpc3RyeTogV2lkZ2V0UmVnaXN0cnksXG4gICAgcHJpdmF0ZSBfY2ZyOiBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsXG4gICAgQE9wdGlvbmFsKCkgQEluamVjdChST09UX0NPTlRFWFQpIHByaXZhdGUgX3Jvb3RDb250ZXh0OiBDb250ZXh0LFxuICAgIHByaXZhdGUgX2V4cHI6IEV4cHJlc3Npb25zXG4gICkge1xuICB9XG5cbiAgbmdPbkNoYW5nZXMoKSB7XG5cbiAgICB0aGlzLl9wcmVDcmVhdGUoKTtcblxuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5fZGVzdHJveSgpO1xuICAgIHRoaXMuX3Vuc3VzY3JpYmUoKTtcbiAgfVxuXG4gIHByaXZhdGUgX3ByZUNyZWF0ZSgpIHtcbiAgICB0aGlzLndkZ1dpZGdldCA9IHRoaXMud2RnV2lkZ2V0IHx8IHsgdHlwZTogJ25vbmUnIH07XG4gICAgdGhpcy5wYXJlbnRDb250ZXh0ID0gdGhpcy5wYXJlbnRDb250ZXh0IHx8IHRoaXMuX3Jvb3RDb250ZXh0O1xuICAgIHRoaXMuY29udGV4dCA9IENvbnRleHQuY3JlYXRlKHRoaXMucGFyZW50Q29udGV4dCwgcGFyc2VEZWZPYmplY3QodGhpcy53ZGdXaWRnZXQuY29udGV4dCwgdGhpcy5wYXJlbnRDb250ZXh0LCBmYWxzZSwgdGhpcy5fZXhwcikpO1xuXG4gICAgdGhpcy5fZGVzdHJveSgpO1xuICAgIHRoaXMuX3Vuc3VzY3JpYmUoKTtcblxuICAgIGlmICh0aGlzLndkZ1dpZGdldC5pZikge1xuICAgICAgdGhpcy5faWZTdWJzID0gdGhpcy5fZXhwci5ldmFsKHRoaXMud2RnV2lkZ2V0LmlmLCB0aGlzLmNvbnRleHQsIHRydWUpLnN1YnNjcmliZShjb25kID0+IHtcbiAgICAgICAgaWYgKGNvbmQgJiYgIXRoaXMuX3dpZGdldFJlZikgdGhpcy5fY3JlYXRlKCk7XG4gICAgICAgIGVsc2UgdGhpcy5fZGVzdHJveSgpO1xuICAgICAgfSk7XG4gICAgfSBlbHNlIHRoaXMuX2NyZWF0ZSgpO1xuXG5cbiAgfVxuXG4gIHByaXZhdGUgX2NyZWF0ZSgpIHtcblxuICAgIGNvbnN0IHdpZGdldENsYXNzID0gdGhpcy5fcmVnaXN0cnkuZ2V0KHRoaXMud2RnV2lkZ2V0LnR5cGUpO1xuICAgIGNvbnN0IGZhY3RvcnkgPSB0aGlzLl9jZnIucmVzb2x2ZUNvbXBvbmVudEZhY3Rvcnkod2lkZ2V0Q2xhc3MpO1xuICAgIHRoaXMuX3dpZGdldFJlZiA9IHRoaXMuX2NvbnRhaW5lci5jcmVhdGVDb21wb25lbnQoZmFjdG9yeSk7XG4gICAgdGhpcy53aWRnZXQgPSB0aGlzLl93aWRnZXRSZWYuaW5zdGFuY2U7XG5cbiAgICB0aGlzLndpZGdldC5zZXR1cCh0aGlzLCB0aGlzLndkZ1dpZGdldCwgdGhpcy5jb250ZXh0KTtcblxuICB9XG5cbiAgcHJpdmF0ZSBfZGVzdHJveSgpIHtcbiAgICBpZiAodGhpcy5fd2lkZ2V0UmVmKSB7XG4gICAgICB0aGlzLl93aWRnZXRSZWYuZGVzdHJveSgpO1xuICAgICAgdGhpcy5fd2lkZ2V0UmVmID0gbnVsbDtcbiAgICB9XG5cbiAgfVxuXG4gIHByaXZhdGUgX3Vuc3VzY3JpYmUoKSB7XG5cbiAgICBpZiAodGhpcy5faWZTdWJzKSB7XG4gICAgICB0aGlzLl9pZlN1YnMudW5zdWJzY3JpYmUoKTtcbiAgICAgIHRoaXMuX2lmU3VicyA9IG51bGw7XG4gICAgfVxuICB9XG59XG4iXX0=