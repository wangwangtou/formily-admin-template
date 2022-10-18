
export const FormatPreviewSchema = {
  type: 'object',
  properties: {
    // value: {
    // },
    type: {
      title: '类型',
      'x-component': 'Select',
      'x-decorator': 'FormItem',
      enum: ['timestamp', 'map']
    },
    format_timestamp: {
      type: 'void',
      'x-visible': '{{ $self.query(".type").value() == "timestamp" }}',
      properties: {
        format: {
          title: '格式',
          'x-decorator': 'FormItem',
          'x-component': 'Select',
          'enum': [
            'yyyy-MM-dd HH:mm:ss',
            'yyyy-MM-dd HH:mm',
            'yyyy-MM-dd',
          ]
        }
      }
    },
    // format_map: {
    //   type: 'void',
    //   properties: {
    //     format: {
    //       type: 'object',
    //       'x-component': 'Input',
    //     }
    //   }
    // },
    default: {
      title: '默认值',
      'x-component': 'Input',
      'x-decorator': 'FormItem',
    },
  }
}