/*!
 * Copyright (c) 2020 Adrian Panella <ianchi74@outlook.com>
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Directive } from '@angular/core';

import { SchemaOptions, SchemaPrimitiveValidations } from '../../schema';
import { ConstrainEvents, ConstrainSlots, FieldEventDef } from '../base/public.interface';
import { AbstractFormFieldWidget } from '../forms/index';

import { TitleDescOption } from './interfaces';

export interface SelectWidgetOptions
  extends SchemaOptions<SchemaPrimitiveValidations<any>>,
    TitleDescOption {
  /** Label to show for `undefined` value */
  emptyLabel?: string;
}

export interface MultiSelectWidgetOptions extends SelectWidgetOptions {
  /** Allows to select multiple options */
  multiple?: boolean;
}

@Directive()
// tslint:disable-next-line: directive-class-suffix
export class SelectWidgetMixin<
  O extends SelectWidgetOptions = SelectWidgetOptions,
  S extends ConstrainSlots<S> | undefined = undefined,
  E extends ConstrainEvents<E> = FieldEventDef
> extends AbstractFormFieldWidget<O, S, E> {
  values: any[] = [];
  descriptions: string[] = [];
  dynOnAfterBind(): void {
    super.dynOnAfterBind();

    this.map('emptyLabel', () => this.updateEntries());

    // if `enum` is defined ignore `enumEntries`
    if (this.hasOption('enum')) {
      this.map('enum', () => this.updateEntries());
      this.map('enumDescription', () => this.updateEntries());
    } else if (this.hasOption('enumEntries')) {
      this.map('enumEntries', () => this.updateEntries());
      this.map('enumProperties', () => this.updateEntries());
    } else if (this.hasOption('hints')) {
      this.map('hints', () => this.updateEntries());
    }
  }

  dynOnInit(): void {
    super.dynOnInit();
    this.updateEntries();
  }
  updateEntries(): void {
    // wait for all properties to be settled
    if (!this.isInitialized) return;

    if (Array.isArray(this.options.enum)) {
      this.values = this.options.enum;

      // if we don't have external descriptions use value as description
      this.descriptions = this.options.enumDescription || this.values;
    } else if (Array.isArray(this.options.enumEntries)) {
      const entries = this.options.enumEntries;
      let properties = ['value', 'description'];

      if (this.options.enumProperties?.length) {
        properties[0] = this.options.enumProperties[0];
        // if we don't have external descriptions use value as description
        properties[1] = this.options.enumProperties[1] ?? properties[0];
      } else if (entries.length && Array.isArray(entries[0])) properties = ['0', '1'];
      this.values = entries.map((entry) => (entry as any)[properties[0]]);

      this.descriptions = entries.map(
        (entry) => (entry as any)[properties[1]] ?? (entry as any)[properties[0]]
      );
      // tslint:disable-next-line: prefer-conditional-expression
    } else if (Array.isArray(this.options.hints)) {
      this.values = this.descriptions = this.options.hints;
    } else this.values = [];

    if (!this.options.required && !this.values.includes(undefined)) {
      this.values = [undefined, ...this.values];
      this.descriptions = [this.options.emptyLabel ?? '', ...(this.descriptions || [])];
    }

    if (this.values.length && this.lvalue) this.fldSetFormValue(this.lvalue.o[this.lvalue.m]);
  }

  /**
   * Returns the display `label` for the given option, when the option is an object
   */
  getLabel(option: any): string {
    const idx = this.values.indexOf(option);
    return idx < 0 ? option : this.descriptions[idx];
  }

  /** Helper function for templates */
  displayFn(): (data: any) => string {
    return (data: any) => this.getLabel(data);
  }
}
