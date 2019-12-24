/*!
 * Copyright (c) 2018 Adrian Panella <ianchi74@outlook.com>
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { AbstractWidgetDef } from '../core/index';

export type ISchema = SchemaNumber | SchemaString | SchemaBoolean | SchemaArray | SchemaObject;
export interface IMap<T> {
  [property: string]: T;
}

/**
 * Generic schema definition, with keywords valid for all types
 */
export interface SchemaBase<T> {
  type?: string | string[];

  title?: string;
  description?: string;
  enum?: T[];
  const?: T;
  enumDescription?: string[];
  default?: T;

  'depends='?: string;
  required?: boolean;
  ui?: SchemaUI;
}

/**
 * Schema Keywords specific for validating number and integer types
 */
export interface SchemaNumber extends SchemaBase<number> {
  type: 'number' | 'integer';

  /**
   * The data to be valid should be a multiple of the keyword value
   * (i.e. the result of division of the data on the value should be integer)
   */
  multipleOf?: number;
  /** This value is the minimum (inclusive) allowed value for the data to be valid. */
  minimum?: number;
  /** This value is the maximum (inclusive) allowed value for the data to be valid. */
  maximum?: number;
  /** This value is the minimum (exclusive) allowed value for the data to be valid. */
  exclusiveMinimum?: number;
  /** This value is the maximum (exclusive) allowed value for the data to be valid. */
  exclusiveMaximum?: number;
}

/**
 * Schema Keywords specific for validating strings
 */
export interface SchemaString extends SchemaBase<string> {
  type: 'string';
  /**
   * The data to be valid should have at least this minimum number of characters (inclusive).
   * @remark Unicode pairs are NOT counted as a single character.
   */

  minLength?: number;
  /**
   * The data to be valid should have at most this maximum number of characters (inclusive).
   * @remark Unicode pairs are NOT counted as a single character.
   */

  maxLength?: number;
  /** The data to be valid should match the regular expression pattern defined by the keyword value. */
  pattern?: string;
  /**
   * The data to be valid should match the predefined format with this name.
   */
  format?: string;
}

/**
 * Schema Keywords specific for validating a boolean
 */
export interface SchemaBoolean extends SchemaBase<boolean> {
  type: 'boolean';
}

/**
 * Schema Keywords specific for validating arrays
 */
export interface SchemaArray extends SchemaBase<any[]> {
  type: 'array';

  /** This value is the maximum (inclusive) allowed number of items in the array for the data to be valid. */
  maxItems?: number;
  /** This value is the minimum (inclusive) allowed number of items in the array for the data to be valid. */
  minItems?: number;
  /** If the keyword value is true, the data array to be valid should have unique items. */
  uniqueItems?: boolean;
  /**
   * The items of the data array must conform to this schema.
   * If the keyword value is an object, then for the data array to be valid
   * each item of the array should be valid according to the schema in this value.
   * In this case the “additionalItems” keyword is ignored.
   *
   * If the keyword value is an array, then items with indices less than the number of items
   * in the keyword should be valid according to the schemas with the same indices.
   * Whether additional items are valid will depend on “additionalItems” keyword.
   */
  items?: ISchema | ISchema[];
  /**
   * If `items` keyword is not present or it is an object, `additionalItems` keyword is ignored regardless of its value.
   *
   * If `items` keyword is an array and data array has not more items than the length of `items`
   * keyword value, `additionalItems` keyword is also ignored.
   *
   * If the length of data array is bigger than the length of `items` keyword value
   * then the result of the validation depends on the value of `additionalItems` keyword:
   *
   * * `false`: data is invalid
   * * `true`: data is valid
   * * `object`: data is valid if all additional items
   * (i.e. items with indices greater or equal than `items` keyword value length)
   * are valid according to the schema in `additionalItems` keyword.
   */
  additionalItems?: ISchema | boolean;
}

export interface SchemaObject extends SchemaBase<IMap<object>> {
  type: 'object';
  /** This value is the maximum (inclusive) allowed number of properties in the object for the data to be valid. */
  maxProperties?: number;
  /** This value is the minimum (inclusive) allowed number of properties in the object for the data to be valid. */
  minProperties?: number;

  properties?: IMap<ISchema>;

  /**
   * The value of this keyword should be a map where keys should be regular expressions
   * and the values should be JSON Schemas.
   * For data object to be valid the values in data object properties that match regular expression(s)
   * should be valid according to the corresponding schema(s).
   *
   * When the value in data object property matches multiple regular expressions it should be valid
   * according to all the schemas for all matched regular expressions.
   *
   * Please note: patternProperties keyword does not require that properties matching patterns
   * are present in the object (see examples).
   */
  patternProperties?: IMap<ISchema>;

  /**
   * If the value is true the keyword is ignored.
   *
   * If the value is false the data object to be valid should not have “additional properties”
   * (i.e. properties other than those used in “properties” keyword and
   * those that match patterns in “patternProperties” keyword).
   *
   * If the value is a schema for the data object to be valid the values in all “additional properties”
   * should be valid according to this schema.
   */
  additionalProperties?: boolean;
  /** For data object to be valid each property name in this object should be valid according to this schema */
  propertyNames?: ISchema;
}

export interface SchemaError {
  code: number;
  [keyword: string]: any;
}

export type ValidatorFn = (value: any) => SchemaError | null;

export interface SchemaUI extends Partial<AbstractWidgetDef> {
  order?: string[];

  fieldset?: number;
  fieldsets?: {
    widget?: string;
    default?: number;
    sets: FieldSet[];
  };
}

export interface FieldSet {
  title?: string;
  fields: string[];
}
