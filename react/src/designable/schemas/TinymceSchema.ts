
export const TinymceSchema = {
  type: 'object',
  properties: {
    value: {
      title: '值',
      'x-component': 'Input'
    },
    height: {
      type: 'number',
      title: '高度',
      default: 400,
      min: 100,
      'x-component': 'NumberPicker'
    }
  }
}