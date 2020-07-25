/*!
 * Copyright (c) 2018 Adrian Panella <ianchi74@outlook.com>
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { AbstractEventsDef, AbstractOptionsDef, IconOption, SubtitleOption } from '../core/index';

export type Schema = SchemaNumber | SchemaString | SchemaBoolean | SchemaArray | SchemaObject;

/**
 * Metadata schema keywords, valid for all types
 */
interface SchemaHeader {
  /** Short descriptive name of the field */
  title?: string;

  /** Explanation of the purpose of the field */
  description?: string;

  /** Allows to leave a comment for developers in the schema file. */
  $comment?: string;
  ui?: SchemaUI;
}

/**
 * Base validation keywords, valid for all types
 */
export interface SchemaBaseValidations {
  type?: string;

  'depends='?: string;
  required?: boolean;

  readonly?: boolean;
}
export interface SchemaPrimitiveValidations<T> extends SchemaBaseValidations {
  type: 'string' | 'number' | 'integer' | 'boolean';
  enum?: T[];
  const?: T;
  enumDescription?: string[];
  default?: T;
}

/**
 * Schema Keywords specific for validating number and integer types
 */
export interface SchemaNumber extends SchemaHeader, SchemaPrimitiveValidations<number> {
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
export interface SchemaString extends SchemaHeader, SchemaPrimitiveValidations<string> {
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
export interface SchemaBoolean extends SchemaHeader, SchemaPrimitiveValidations<boolean> {
  type: 'boolean';
}

/**
 * Schema Keywords specific for validating arrays
 */
export interface SchemaArray extends SchemaHeader, SchemaBaseValidations {
  type: 'array';

  default?: any[];

  /** Summary of the data */
  value?: string;

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
  items?: Schema | Schema[];
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
   * * `object`: data is valid if all additional items
   * (i.e. items with indices greater or equal than `items` keyword value length)
   * are valid according to the schema in `additionalItems` keyword.
   */
  additionalItems?: Schema;
}

/**
 * Schema Keywords specific for validating additional properties of an object.
 * Useful for splitting object definition in multiple files or to group related
 * properties in subsets.
 */
export interface SchemaPartialObject extends SchemaHeader {
  type: 'object';

  $id?: string;

  'depends='?: string;

  /** Summary of the data */
  value?: string;
  properties?: { [name: string]: Schema };

  /**
   * Allows to extend the current schema with external file(s). Valid only for `object` type.
   * It must be an array of `PartialObject` schemas or of `SchemaIncludes` (an object
   * with just an `$include` property with the path (or glob) to the external schema(s)
   * of `PartialObject` to load.
   * It should not redefine properties defined in the base schema.
   */
  allOf?: Array<SchemaPartialObject | SchemaInclude>;
}

/**
 * Schema Keywords specific for validating objects
 */
export interface SchemaObject extends SchemaPartialObject, SchemaBaseValidations {
  type: 'object';

  default?: {};
  /** This value is the maximum (inclusive) allowed number of properties in the object for the data to be valid. */
  maxProperties?: number;
  /** This value is the minimum (inclusive) allowed number of properties in the object for the data to be valid. */
  minProperties?: number;

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
  patternProperties?: { [pattern: string]: Schema };

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
  propertyNames?: Schema;
}

/** Pointer to external schema(s) of `PartialObject` to load. */
export interface SchemaInclude {
  /** Path to an external schema file or glob of files. Fragments URI are not supported. */
  $include: string;

  /**
   * Used internally to expand the $included files
   * @ignore
   */
  resolved?: Schema | Schema[];
}

export interface SchemaError {
  code: number;
  [keyword: string]: any;
}

export type ValidatorFn = (value: any) => SchemaError | null;

/** Converts Schema type to OptionsWidgetDef type. Used for generating widget's schemas from type information */
export type SchemaOptions<T> = Omit<
  T & IconOption & SubtitleOption,
  'ui' | 'depends=' | '$comment'
>;

export interface WidgetMap {
  default: string;
  number: string;
  range: string;
  integer: string;
  string: string;
  select: string;
  autocomplete: string;
  boolean: string;
  array: string;
  list: string;
  object: string;
  unheaderedObject: string;
  objectLevel: string[];
}

/** Schema extension to provide custom options to build UI widgets from the schema definition */
export interface SchemaUI {
  /** Widget to use to render the current schema */
  widget?: string;

  /**
   * Role of the field, used to change the mapping from schema to widget, instead of
   * fixing the widget as with `widget`.
   * It has lower priority.
   */
  role?: string;

  /**
   * Fixes the object nesting level of the current schema.
   * Used to select an objectLevel mapping to widget.
   */
  level?: number;

  /**
   * Map of `type` to widgets to use to build UI.
   * Can be a partial to override only some defaults.
   */
  widgets?: Partial<WidgetMap>;
  /** Event handlers to add to the widget */
  events?: AbstractEventsDef;

  /**
   * Additional options to add to the widget's definition.
   * Overrides computed ones
   */
  options?: AbstractOptionsDef;

  /**
   * Schema is only data validation description.
   * Should be omitted when building UI
   */
  hidden?: boolean;
}
