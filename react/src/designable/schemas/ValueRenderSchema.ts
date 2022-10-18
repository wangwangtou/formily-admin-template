
export const StringValueRenderSchema = {
  type: 'object',
  properties: {
    value: {
      title: '值',
      'x-component': 'Input'
    }
  }
}

export const NumberValueRenderSchema = {
  type: 'object',
  properties: {
    value: {
      title: '值',
      'x-component': 'NumberPicker'
    }
  }
}

export const getEnumValueRenderSchema = enums => {
  return {
    type: 'object',
    properties: {
      value: {
        title: '值',
        'x-component': 'Select',
        enum: enums
      }
    }
  }
}