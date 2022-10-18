import { ISchema } from '@formily/json-schema'
import {
  ReactionsSetter,
  DataSourceSetter,
  ValidatorSetter,
} from '@designable/formily-setters'
import { DecoratorSelector, Schemas } from './decorator'
import { AllSchemas } from '@designable/formily-antd/esm/schemas'

const CLSSchema = {
  title: '类选择器',
  'x-component': 'Input',
  'x-decorator': 'FormItem'
}

export const createComponentSchema = (
  component: ISchema
) => {
  const decorators = {
    FormItem: AllSchemas.FormItem,
    ...Schemas,
  }
  return {
    'component-group': component && {
      type: 'void',
      'x-component': 'CollapseItem',
      'x-reactions': {
        fulfill: {
          state: {
            visible: '{{!!$form.values["x-component"]}}',
          },
        },
      },
      properties: {
        'x-component-props': component,
      },
    },
    'decorator-group': {
      type: 'void',
      'x-component': 'CollapseItem',
      'x-component-props': { defaultExpand: false },
      'x-reactions': {
        fulfill: {
          state: {
            visible: '{{ '+JSON.stringify(Object.keys(decorators))+'.includes($form.values["x-decorator"]) }}',
          }
        },
      },
      properties: {
        ...Object.keys(decorators).reduce((pre, cur) => {
          pre['decorator-group$' + cur] = {
            type: 'void',
            'x-component': 'Form',
            'x-reactions': {
              fulfill: {
                state: {
                  visible: '{{ $form.values["x-decorator"] == "' + cur + '" }}',
                }
              },
            },
            properties: {
              'x-decorator-props': decorators[cur],
            },
          }
          return pre
        }, {}),
      }
    },
    // 'decorator-group': decorators && {
    //   type: 'void',
    //   'x-component': 'CollapseItem',
    //   'x-component-props': { defaultExpand: false },
    //   'x-reactions': {
    //     fulfill: {
    //       state: {
    //         visible: '{{ !!Global.decorators[$form.values["x-decorator"]] }}',
    //       }
    //     },
    //   }
    // },
    'component-style-group': {
      type: 'void',
      'x-component': 'CollapseItem',
      'x-component-props': { defaultExpand: false },
      'x-reactions': {
        fulfill: {
          state: {
            visible: '{{!!$form.values["x-component"]}}',
          },
        },
      },
      properties: {
        'x-component-props.class': CLSSchema,
        'x-component-props.style': AllSchemas.CSSStyle,
      },
    },
    'decorator-style-group': {
      type: 'void',
      'x-component': 'CollapseItem',
      'x-component-props': { defaultExpand: false },
      'x-reactions': {
        fulfill: {
          state: {
            visible: '{{ '+JSON.stringify(Object.keys(decorators))+'.includes($form.values["x-decorator"]) }}',
          }
        },
      },
      properties: {
        'x-component-props.class': CLSSchema,
        'x-decorator-props.style': AllSchemas.CSSStyle,
      },
    },
  }
}

export const createFieldSchema = (
  component?: ISchema,
): ISchema => {
  return {
    type: 'object',
    properties: {
      'field-group': {
        type: 'void',
        'x-component': 'CollapseItem',
        properties: {
          name: {
            type: 'string',
            'x-decorator': 'FormItem',
            'x-component': 'Input',
          },
          title: {
            type: 'string',
            'x-decorator': 'FormItem',
            'x-component': 'Input',
          },
          description: {
            type: 'string',
            'x-decorator': 'FormItem',
            'x-component': 'Input.TextArea',
          },
          'x-display': {
            type: 'string',
            enum: ['visible', 'hidden', 'none', ''],
            'x-decorator': 'FormItem',
            'x-component': 'Select',
            'x-component-props': {
              defaultValue: 'visible',
            },
          },
          'x-pattern': {
            type: 'string',
            enum: ['editable', 'disabled', 'readOnly', 'readPretty', ''],
            'x-decorator': 'FormItem',
            'x-component': 'Select',
            'x-component-props': {
              defaultValue: 'editable',
            },
          },
          default: {
            'x-decorator': 'FormItem',
            'x-component': 'ValueInput',
          },
          enum: {
            'x-decorator': 'FormItem',
            'x-component': DataSourceSetter,
          },
          'x-reactions': {
            'x-decorator': 'FormItem',
            'x-component': ReactionsSetter,
          },
          'x-validator': {
            type: 'array',
            'x-component': ValidatorSetter,
          },
          required: {
            type: 'boolean',
            'x-decorator': 'FormItem',
            'x-component': 'Switch',
          },
          'x-decorator': {
            type: 'string',
            'x-decorator': 'FormItem',
            'x-component': DecoratorSelector,
          },
        },
      },
      ...createComponentSchema(component),
    },
  }
}

export const createVoidFieldSchema = (
  component?: ISchema,
) => {
  return {
    type: 'object',
    properties: {
      'field-group': {
        type: 'void',
        'x-component': 'CollapseItem',
        properties: {
          name: {
            type: 'string',
            'x-decorator': 'FormItem',
            'x-component': 'Input',
          },
          title: {
            type: 'string',
            'x-decorator': 'FormItem',
            'x-component': 'Input',
            'x-reactions': {
              fulfill: {
                state: {
                  hidden: '{{$form.values["x-decorator"] !== "FormItem"}}',
                },
              },
            },
          },
          description: {
            type: 'string',
            'x-decorator': 'FormItem',
            'x-component': 'Input.TextArea',
            'x-reactions': {
              fulfill: {
                state: {
                  hidden: '{{$form.values["x-decorator"] !== "FormItem"}}',
                },
              },
            },
          },
          'x-display': {
            type: 'string',
            enum: ['visible', 'hidden', 'none', ''],
            'x-decorator': 'FormItem',
            'x-component': 'Select',
            'x-component-props': {
              defaultValue: 'visible',
            },
          },
          'x-pattern': {
            type: 'string',
            enum: ['editable', 'disabled', 'readOnly', 'readPretty', ''],
            'x-decorator': 'FormItem',
            'x-component': 'Select',
            'x-component-props': {
              defaultValue: 'editable',
            },
          },
          'x-reactions': {
            'x-decorator': 'FormItem',
            'x-component': ReactionsSetter,
          },
          'x-decorator': {
            type: 'string',
            'x-decorator': 'FormItem',
            'x-component': DecoratorSelector,
          },
        },
      },
      ...createComponentSchema(component),
    },
  }
}
