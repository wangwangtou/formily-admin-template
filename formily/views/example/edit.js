/**
 * @type {import('../../index').DesignablePage}
 */
const page = {
  'form': {
    'labelCol': 6,
    'wrapperCol': 12
  },
  schema: {
    type: 'object',
    properties: {
      // 联动字段如果在sticky内部，会导致无法更新sticky属性
      status: {
        type: 'string',
        'x-component': 'Input',
        'x-display': false
      },
      sticky: {
        type: 'void',
        'x-component': 'Sticky',
        'x-component-props': {
          zIndex: 10,
          className: '{{ "sub-navbar " + $self.query("status").value() }}'
        },
        properties: {
          comment_disabled: {
            type: 'string',
            'x-decorator': 'Dropdown',
            'x-decorator-props': {
              wrapItem: true,
              dropdownClass: ['no-padding'],
              title: '{{ "Comment: " + $self.value }}'
            },
            'x-component': 'Radio.Group',
            'x-component-props': {
            },
            enum: [
              { label: 'Close comment', value: 'closed' },
              { label: 'Open comment', value: 'opened' }
            ]
          },
          platforms: {
            type: 'array',
            'x-decorator': 'Dropdown',
            'x-decorator-props': {
              dropdownClass: ['no-padding'],
              title: '{{ "Platforms(" + $self.value.length + ")" }}',
              'hide-on-click': false
            },
            'x-component': 'Checkbox.Group',
            'x-component-props': {
              style: { padding: '5px 15px' }
            },
            enum: [
              'a-platform',
              'b-platform',
              'c-platform'
            ]
          },
          source_uri_dropdown: {
            type: 'void',
            'x-component': 'Dropdown',
            'x-component-props': {
              title: 'Link',
              dropdownClass: ['no-padding', 'no-border'],
              dropdownStyle: { width: '400px' }
            },
            properties: {
              source_uri: {
                type: 'string',
                'x-decorator': 'FormItem',
                'x-decorator-props': {
                  style: { marginBottom: 0 }
                },
                'x-validator': [
                  { message: '外链url填写不正确', pattern: /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/ }
                ],
                'x-component': 'Input',
                'x-content': {
                  prepend: 'URL'
                },
                'x-component-props': {
                  placeholder: 'Please enter the content'
                }
              }
            }
          },
          publish: {
            type: 'void',
            'x-component': 'Button',
            'x-content': 'Publish',
            'x-component-props': {
              type: 'success',
              style: { marginLeft: '10px' },
              onClick: '{{ PAGE.onSubmitForm($self) }}'
            }
          },
          draft: {
            type: 'void',
            'x-component': 'Button',
            'x-content': 'Draft',
            'x-component-props': {
              type: 'warning',
              onClick: '{{ PAGE.onDraftForm($self) }}'
            }
          }
        }
      },
      main: {
        type: 'void',
        'x-component': 'Container',
        'x-component-props': {
          class: 'createPost-main-container'
        },
        properties: {
          warning: {
            type: 'void',
            'x-component': 'Warning'
          },
          title: {
            type: 'string',
            title: 'Title',
            'x-decorator': 'FormItem',
            'x-component': 'Input',
            'x-validator': [
              { required: true }
            ],
            'x-component-props': {},
            'x-decorator-props': {
              class: 'postInfo-container-item',
              'layout': 'vertical',
              'labelAlign': 'left'
            }
          },
          formLayout: {
            'type': 'void',
            'x-component': 'FormLayout',
            'x-component-props': {
              'labelWidth': 'inherit'
            },
            properties: {
              'formGrid': {
                'type': 'void',
                'x-component': 'FormGrid',
                'x-validator': [],
                'x-component-props': {
                  'maxColumns': 3
                },
                properties: {
                  author: {
                    type: 'string',
                    title: 'Author',
                    'x-component': 'Select',
                    'x-decorator': 'FormItem',
                    'x-validator': [],
                    'x-component-props': {
                      placeholder: 'Search user',
                      filterable: true,
                      'default-first-option': true,
                      remote: true,
                      'remote-method': '{{ PAGE.searchUserRemoteMethod($self) }}'
                    },
                    'x-decorator-props': {
                      class: 'postInfo-container-item'
                    }
                  },
                  displayTime: {
                    type: 'string',
                    title: 'Publish Time',
                    'x-component': 'DatePicker',
                    'x-decorator': 'FormItem',
                    'x-validator': [],
                    'x-component-props': {
                      type: 'datetime',
                      format: 'yyyy-MM-dd HH:mm:ss',
                      placeholder: 'Select date and time'
                    },
                    'x-decorator-props': {
                      class: 'postInfo-container-item'
                    }
                  },
                  importance: {
                    type: 'number',
                    title: 'Importance',
                    'x-component': 'Rate',
                    'x-decorator': 'FormItem',
                    'x-validator': [],
                    'x-component-props': {
                      max: 3,
                      colors: ['#99A9BF', '#F7BA2A', '#FF9900'],
                      'low-threshold': 1,
                      'high-threshold': 3,
                      style: { display: 'inline-block' }
                    },
                    'x-decorator-props': {
                      class: 'postInfo-container-item'
                    }
                  },
                  content_short: {
                    type: 'string',
                    title: 'Summary',
                    'x-component': 'Input.TextArea',
                    'x-decorator': 'FormItem',
                    'x-validator': [],
                    'x-component-props': {
                      rows: 1,
                      class: 'article-textarea',
                      autosize: true,
                      placeholder: 'Please enter the content'
                    },
                    'x-reactions': [
                      '{{ $self.setDecoratorProps({ addonAfter: $self.value && $self.value.length > 0 ? $self.value.length + "words" : "" }) }}'
                    ],
                    'x-decorator-props': {
                      // addonAfter: '{{ $self.value && $self.value.length > 0 ? $self.value.length + "words" : "" }}'
                      class: 'word-counter-addon',
                      style: { 'grid-column': 'span 3 / auto' },
                      gridSpan: 3
                    }
                  },
                  content: {
                    type: 'string',
                    title: '',
                    'x-component': 'Tinymce',
                    'x-decorator': 'FormItem',
                    'x-validator': [
                      { required: true }
                    ],
                    'x-component-props': {
                      height: 400
                    },
                    'x-decorator-props': {
                      style: { 'grid-column': 'span 3 / auto' },
                      gridSpan: 3
                    }
                  },
                  image_uri: {
                    type: 'string',
                    title: '',
                    'x-component': 'Upload',
                    'x-decorator': 'FormItem',
                    'x-validator': [
                      { required: true }
                    ],
                    'x-component-props': {
                    },
                    'x-decorator-props': {
                      style: { 'grid-column': 'span 3 / auto' },
                      gridSpan: 3
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}

export default page
