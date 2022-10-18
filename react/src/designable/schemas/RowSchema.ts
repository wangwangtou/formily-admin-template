
export const RowSchema = {
  type: 'object',
  properties: {
    align: {
      title: '垂直对齐方式',
      'x-component': 'Select',
      'x-decorator': 'FormItem',
      enum: 	['top', 'middle', 'bottom']
    },
    // 'gutter[0]': {
    //   title: '水平间隔',
    //   'x-component': 'NumberPicker',
    //   'x-decorator': 'FormItem',
    // },
    'gutter': {
      title: '水平间距',
      'x-component': 'LayoutGutterSetter',
      // 'x-decorator': 'FormItem',
    },
    justify: {
      title: '水平排列方式',
      'x-component': 'Select',
      'x-decorator': 'FormItem',
      enum: [ 'start', 'end', 'center', 'space-around', 'space-between', 'space-evenly' ],
    },
    wrap: {
      title: '是否自动换行',
      'x-component': 'Select',
      'x-decorator': 'FormItem',
      enum: [
        { label: 'False', value: false },
        { label: 'True', value: true }
      ]
    }
  }
}