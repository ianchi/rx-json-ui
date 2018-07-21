import {
  Directive, Input,
  ViewContainerRef,
  ComponentFactoryResolver, ComponentRef,
  OnChanges, OnDestroy, Optional, Inject, InjectionToken,
} from '@angular/core';
import { WidgetRegistry } from './widgetregistry.service';
import { Subscription } from 'rxjs';
import { AbstractWidget, parseDefObject } from './abstractwidget';
import { IWidgetDef } from './widget.interface';
import { Context } from './context';
import { Expressions } from './expressions';

/** Injection token used to provide the default root context for widgets */
export const ROOT_CONTEXT = new InjectionToken<Context>('Widgets Root Context');

@Directive({
  selector: '[wdgWidget]'
})
export class WidgetDirective implements OnChanges, OnDestroy {

  @Input() wdgWidget: IWidgetDef;
  @Input() parentContext: Context;

  widget: AbstractWidget;
  context: Context;
  private _widgetRef: ComponentRef<AbstractWidget>;
  private _ifSubs: Subscription;

  constructor(
    private _container: ViewContainerRef,
    private _registry: WidgetRegistry,
    private _cfr: ComponentFactoryResolver,
    @Optional() @Inject(ROOT_CONTEXT) private _rootContext: Context,
    private _expr: Expressions
  ) {
  }

  ngOnChanges() {

    this._preCreate();

  }

  ngOnDestroy() {
    this._destroy();
    this._unsuscribe();
  }

  private _preCreate() {
    this.wdgWidget = this.wdgWidget || { type: 'none' };
    this.parentContext = this.parentContext || this._rootContext;
    this.context = Context.create(this.parentContext, parseDefObject(this.wdgWidget.context, this.parentContext, false, this._expr));

    this._destroy();
    this._unsuscribe();

    if (this.wdgWidget.if) {
      this._ifSubs = this._expr.eval(this.wdgWidget.if, this.context, true).subscribe(cond => {
        if (cond && !this._widgetRef) this._create();
        else this._destroy();
      });
    } else this._create();


  }

  private _create() {

    const widgetClass = this._registry.get(this.wdgWidget.type);
    const factory = this._cfr.resolveComponentFactory(widgetClass);
    this._widgetRef = this._container.createComponent(factory);
    this.widget = this._widgetRef.instance;

    this.widget.setup(this, this.wdgWidget, this.context);

  }

  private _destroy() {
    if (this._widgetRef) {
      this._widgetRef.destroy();
      this._widgetRef = null;
    }

  }

  private _unsuscribe() {

    if (this._ifSubs) {
      this._ifSubs.unsubscribe();
      this._ifSubs = null;
    }
  }
}
