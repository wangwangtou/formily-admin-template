/**
 * @type {import('../../index').DesignablePage}
 */
const page = {
  'form': {
    'labelCol': 6,
    'wrapperCol': 12
  },
  'schema': {
    'type': 'object',
    'properties': {
      'username': {
        'type': 'string',
        'title': 'user name',
        'default': 'admin',
        'required': true,
        'x-decorator': 'FormItem',
        'x-component': 'Input',
        'x-validator': [
          {
            validator: '{{ VALIDATOR.userName() }}',
            message: 'Please enter the correct user name'
          }
        ],
        'x-component-props': {
          'prefixIcon': 'el-icon-s-custom'
        },
        'x-decorator-props': {},
        'x-designable-id': 'jhq46xcypqo',
        'x-index': 0
      },
      'capsLockTip': {
        type: 'void',
        'x-component': 'Tooltip',
        'x-decorator': 'FormItem',
        'x-component-props': {
          content: 'Caps lock is On',
          placement: 'right',
          manual: true
        },
        properties: {
          'password': {
            'type': 'string',
            'title': 'password',
            'default': '111111',
            'required': true,
            'maxLength': 6,
            'x-component': 'Password',
            'x-validator': [
              {
                maxLength: 6,
                message: 'The password can not be less than 6 digits'
              }
            ],
            'x-component-props': {
              // 'prefix-icon': 'formily-icon-password'
              'prefixIcon': 'el-icon-lock'
            },
            'x-reactions': [
              '{{ FORM.useTipCapsLock($self) }}'
            ],
            'x-decorator-props': {},
            'x-designable-id': 'zrddcpko5dk1',
            'x-index': 1
          }
        },
        'x-designable-id': 'zrddcpko5dk2',
        'x-index': 1
      },
      'login': {
        'type': 'void',
        'x-component': 'Button',
        'x-content': 'Login',
        'x-component-props': {
          style: {
            width: '100%',
            marginBottom: '30px'
          },
          type: 'primary',
          onClick: '{{ ADMIN.useLogin($self) }}'
        },
        'x-decorator-props': {},
        'x-designable-id': 'zrddcpko5dk3',
        'x-index': 2
      }
    },
    'x-designable-id': '6t65zequ0jp'
  }
}
export default page
