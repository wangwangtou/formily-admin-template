
const getColPartSchema = () => {
  return {
    // flex: {
    //   title: 'flex 布局属性',
    //   // description: 'flex 布局属性	string | number	-	',
    //   'x-component': 'NumberPicker',
    //   'x-decorator': 'FormItem'
    // },
    offset: {
      title: '左间隔格数',
      // default: 0,
      // description: '栅格左侧的间隔格数，间隔内不可以有栅格	number	0	',
      'x-component': 'NumberPicker',
      'x-decorator': 'FormItem'
    },
    order: {
      title: '栅格顺序',
      // default: 0,
      // description: '栅格顺序	number	0	',
      'x-component': 'NumberPicker',
      'x-decorator': 'FormItem'
    },
    pull: {
      title: '左移格数',
      // default: 0,
      // description: '栅格向左移动格数	number	0	',
      'x-component': 'NumberPicker',
      'x-decorator': 'FormItem'
    },
    push: {
      title: '右移格数',
      // default: 0,
      // description: '栅格向右移动格数	number	0	',
      'x-component': 'NumberPicker',
      'x-decorator': 'FormItem'
    },
    span: {
      title: '占位格数',
      // default: 0,
      // description: '栅格占位格数，为 0 时相当于 display: none	number	-	',
      'x-component': 'NumberPicker',
      'x-decorator': 'FormItem'
    },
  }
}

export const ColSchema = {
  type: 'object',
  properties: {
    ...getColPartSchema(),
    xs: {
      title: 'XS栅格',
      'x-component': 'LayoutColSetter',
      // 'x-decorator': 'FormItem'
      // description: '屏幕 < 576px 响应式栅格，可为栅格数或一个包含其他属性的对象	number | object	-	',
    },
    sm: {
      title: 'SM栅格',
      'x-component': 'LayoutColSetter',
      // 'x-decorator': 'FormItem'
      // description: '屏幕 ≥ 576px 响应式栅格，可为栅格数或一个包含其他属性的对象	number | object	-	'
    },
    md: {
      title: 'MD栅格',
      'x-component': 'LayoutColSetter',
      // 'x-decorator': 'FormItem'
      // description: '屏幕 ≥ 768px 响应式栅格，可为栅格数或一个包含其他属性的对象	number | object	-	'
    },
    lg: {
      title: 'LG栅格',
      'x-component': 'LayoutColSetter',
      // 'x-decorator': 'FormItem'
      // description: '屏幕 ≥ 992px 响应式栅格，可为栅格数或一个包含其他属性的对象	number | object	-	'
    },
    xl: {
      title: 'XL栅格',
      'x-component': 'LayoutColSetter',
      // 'x-decorator': 'FormItem'
      // description: '屏幕 ≥ 1200px 响应式栅格，可为栅格数或一个包含其他属性的对象	number | object	-	'
    },
    xxl: {
      title: 'XXL栅格',
      'x-component': 'LayoutColSetter',
      // 'x-decorator': 'FormItem'
      // description: '屏幕 ≥ 1600px 响应式栅格，可为栅格数或一个包含其他属性的对象	number | object	-'
    },
  }
}