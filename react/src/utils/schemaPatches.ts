import { Schema, SchemaPatch, ISchema  } from "@formily/react";

/**
 * React 默认设置class ，会覆盖控件自有的样式，需要设置为 className
 */
const propsClassNamePatch: SchemaPatch = (schema: ISchema) => {
  if (schema["x-component-props"] && schema["x-component-props"].class && !schema["x-component-props"].className) {
    const { class: className, ...props } = schema["x-component-props"]
    schema["x-component-props"] = {
      className,
      ...props,
    }
  }
  if (schema["x-decorator-props"] && schema["x-decorator-props"].class && !schema["x-decorator-props"].className) {
    const { class: className, ...props } = schema["x-decorator-props"]
    schema["x-decorator-props"] = {
      className,
      ...props,
    }
  }
  return schema
}

Schema.registerPatches(propsClassNamePatch)