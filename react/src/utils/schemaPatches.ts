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
/**
 * React 的content会当作一部分children放到控件中，将vue的slot name格式直接放到props里即可
 */
const xContentPatch: SchemaPatch = (schema: ISchema) => {
  if (typeof schema["x-content"] == 'object' && !Array.isArray(schema["x-content"])) {
    schema["x-component-props"] = {
      ...schema["x-content"],
      ...schema["x-component-props"],
    }
    delete schema["x-content"]
  }
  return schema
}

Schema.registerPatches(
  propsClassNamePatch,
  xContentPatch)