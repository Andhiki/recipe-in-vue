import type { Component, InputHTMLAttributes } from 'vue'
import type { z, ZodAny } from 'zod'
import type { INPUT_COMPONENTS } from './constant'

export interface FieldProps {
  fieldName: string
  label?: string
  required?: boolean
  config?: ConfigItem
  disabled?: boolean
}

export interface Shape {
  type: string
  default?: any
  required?: boolean
  options?: string[]
  schema?: ZodAny
}

export interface InputComponents {
  date: Component
  select: Component
  radio: Component
  checkbox: Component
  switch: Component
  textarea: Component
  number: Component
  string: Component
  file: Component
  array: Component
  object: Component
}

export interface ConfigItem {
  /** Value for the `FormLabel` */
  label?: string
  /** Value for the `FormDescription` */
  description?: string
  /** Pick which component to be rendered. */
  component?: keyof typeof INPUT_COMPONENTS | Component
  /** Hide `FormLabel`. */
  hideLabel?: boolean
  inputProps?: InputHTMLAttributes
}

// Define a type to unwrap an array
type UnwrapArray<T> = T extends (infer U)[] ? U : never

export type Config<SchemaType extends object> = {
  // If SchemaType.key is an object, create a nested Config, otherwise ConfigItem
  [Key in keyof SchemaType]?:
  SchemaType[Key] extends any[]
    ? UnwrapArray<Config<SchemaType[Key]>>
    : SchemaType[Key] extends object
      ? Config<SchemaType[Key]>
      : ConfigItem;
}

export const DependencyType = {
  DISABLES: 0,
  REQUIRES: 1,
  HIDES: 2,
  SETS_OPTIONS: 3,
} as const

export type DependencyTypeValue = typeof DependencyType[keyof typeof DependencyType]

interface BaseDependency<SchemaType extends z.infer<z.ZodObject<any, any>>> {
  sourceField: keyof SchemaType | string
  type: DependencyTypeValue
  targetField: keyof SchemaType | string
  when: (sourceFieldValue: any, targetFieldValue: any) => boolean
}

export type ValueDependency<SchemaType extends z.infer<z.ZodObject<any, any>>> =
  BaseDependency<SchemaType> & {
    type:
      | typeof DependencyType.DISABLES
      | typeof DependencyType.REQUIRES
      | typeof DependencyType.HIDES
  }

export type EnumValues = readonly [string, ...string[]]

export type OptionsDependency<
  SchemaType extends z.infer<z.ZodObject<any, any>>,
> = BaseDependency<SchemaType> & {
  type: typeof DependencyType.SETS_OPTIONS

  // Partial array of values from sourceField that will trigger the dependency
  options: EnumValues
}

export type Dependency<SchemaType extends z.infer<z.ZodObject<any, any>>> =
  | ValueDependency<SchemaType>
  | OptionsDependency<SchemaType>
