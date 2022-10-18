export const RouterLinkSchema = {
  type: 'object',
  properties: {
    to: {
      title: '跳转地址',
      'x-component': 'Input',
      'x-decorator': 'FormItem',
    }
  }
}