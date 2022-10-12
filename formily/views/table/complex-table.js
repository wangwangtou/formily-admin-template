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
      filterForm: {
        type: 'void',
        'x-component': 'FormLayout',
        'x-component-props': {
          inline: true,
          class: 'filter-container'
        },
        properties: {
          filter: {
            type: 'object',
            properties: {
              title: {
                type: 'string',
                'x-component': 'Input',
                'x-component-props': {
                  class: 'filter-item',
                  style: { width: '200px' },
                  placeholder: 'Title'
                }
              },
              importance: {
                type: 'string',
                'x-component': 'Select',
                'x-component-props': {
                  class: 'filter-item',
                  style: { width: '90px' },
                  clearable: true,
                  placeholder: 'Imp'
                },
                enum: [1, 2, 3]
              },
              type: {
                type: 'string',
                'x-component': 'Select',
                'x-component-props': {
                  class: 'filter-item',
                  style: { width: '130px' },
                  clearable: true,
                  placeholder: 'Type'
                },
                enum: [
                  { value: 'CN', label: 'China(CN)' },
                  { value: 'US', label: 'USA(US)' },
                  { value: 'JP', label: 'Japan(JP)' },
                  { value: 'EU', label: 'Eurozone(EU)' }
                ]
              },
              sort: {
                type: 'string',
                default: '+id',
                'x-component': 'Select',
                'x-component-props': {
                  class: 'filter-item',
                  style: { width: '140px' }
                },
                enum: [
                  { label: 'ID Ascending', value: '+id' },
                  { label: 'ID Descending', value: '-id' }
                ]
              },
              search: {
                type: 'void',
                'x-content': 'Search',
                'x-component': 'Button',
                'x-component-props': {
                  class: 'filter-item',
                  type: 'primary',
                  icon: 'el-icon-search',
                  onClick: '{{ PAGE.onSearch($form, PAGE.fetchList) }}'
                }
              },
              add: {
                type: 'void',
                'x-content': 'Add',
                'x-component': 'Button',
                'x-component-props': {
                  class: 'filter-item',
                  style: { marginLeft: '10px' },
                  type: 'primary',
                  icon: 'el-icon-edit',
                  onClick: '{{ PAGE.onOpenAddFormDialog($self) }}'
                }
              },
              export: {
                type: 'void',
                'x-content': 'Export',
                'x-component': 'Button',
                'x-component-props': {
                  class: 'filter-item',
                  style: { marginLeft: '10px' },
                  type: 'primary',
                  icon: 'el-icon-download'
                }
              },
              showReviewer: {
                type: 'boolean',
                default: false,
                'x-content': 'reviewer',
                'x-component': 'Checkbox',
                'x-component-props': {
                  class: 'filter-item',
                  style: { marginLeft: '14px' }
                }
              }
            }
          }
        }
      },
      table: {
        type: 'array',
        'x-component': 'ArrayTable',
        'x-component-props': {
          rowKey: 'id',
          border: true,
          fit: true,
          'highlight-current-row': true,
          style: { width: '100%' },
          paginationLayout: 'total, sizes, prev, pager, next, jumper',
          paginationPageSizes: [10, 20, 30, 50],
          paginationBackground: false,
          paginationCurrentPage: 1,
          paginationPageSize: 10
        },
        'x-reactions': [
          '{{ PAGE.useTablePaginationData($form, PAGE.fetchList) }}'
        ],
        items: {
          'type': 'object',
          'properties': {
            'id': {
              'type': 'void',
              'x-component': 'ArrayTable.Column',
              'x-component-props': {
                title: 'ID',
                width: '65',
                align: 'center'
              },
              properties: {
                id: {
                  'x-read-pretty': true,
                  type: 'string',
                  'x-component': 'Input'
                }
              }
            },
            'timestamp': {
              'type': 'void',
              'x-component': 'ArrayTable.Column',
              'x-component-props': {
                title: 'Date',
                width: '150px',
                align: 'center'
              },
              properties: {
                timestamp: {
                  'x-read-pretty': true,
                  type: 'number',
                  'x-component': 'FormatPreview',
                  'x-component-props': {
                    type: 'timestamp',
                    format: '{y}-{m}-{d} {h}:{i}'
                  }
                }
              }
            },
            'title': {
              'type': 'void',
              'x-component': 'ArrayTable.Column',
              'x-component-props': {
                title: 'Title',
                minWidth: '150px'
              },
              properties: {
                title: {
                  'x-read-pretty': true,
                  type: 'string',
                  // 'x-decorator': 'Link',
                  // 'x-decorator-props': {
                  //   class: 'link-type',
                  //   onClick: '{{ PAGE.onOpenEditFormDialog($self) }}'
                  // },
                  // 'x-component': 'Input'
                  'x-component': 'LinkCell',
                  'x-component-props': {
                    class: 'link-type',
                    onClick: '{{ PAGE.onOpenEditFormDialog($self) }}'
                  },
                  'x-content': '{{ $self.value }}'
                },
                type: {
                  'x-read-pretty': true,
                  type: 'string',
                  'x-decorator': 'Tag',
                  'x-decorator-props': {
                  },
                  'x-component': 'FormatPreview',
                  'x-component-props': {
                    type: 'map',
                    format: {
                      'CN': 'China',
                      'US': 'USA',
                      'JP': 'Japan',
                      'EU': 'Eurozone'
                    }
                  }
                }
              }
            },
            'author': {
              'type': 'void',
              'x-component': 'ArrayTable.Column',
              'x-component-props': {
                title: 'Author',
                width: '110px',
                align: 'center'
              },
              properties: {
                author: {
                  'x-read-pretty': true,
                  type: 'string',
                  'x-component': 'Input'
                }
              }
            },
            'reviewer': {
              'type': 'void',
              'x-component': 'ArrayTable.Column',
              'x-component-props': {
                title: 'Reviewer',
                width: '110px',
                align: 'center'
              },
              'x-reactions': [
                '{{ function(field) { field.visible = field.query("filter.showReviewer").value() } }}'
              ],
              properties: {
                reviewer: {
                  'x-read-pretty': true,
                  type: 'string',
                  'x-component': 'Input',
                  'x-component-props': {
                    style: { color: 'red' }
                  }
                }
              }
            },
            'importance': {
              'type': 'void',
              'x-component': 'ArrayTable.Column',
              'x-component-props': {
                title: 'Imp',
                width: '80px'
              },
              properties: {
                importance: {
                  'x-read-pretty': true,
                  type: 'number',
                  'x-component': 'RankCount'
                }
              }
            },
            'pageviews': {
              'type': 'void',
              'x-component': 'ArrayTable.Column',
              'x-component-props': {
                title: 'Readings',
                width: '95px',
                align: 'center'
              },
              properties: {
                pageviews: {
                  'x-read-pretty': true,
                  type: 'string',
                  'x-component': 'Input'
                }
              }
            },
            'status': {
              'type': 'void',
              'x-component': 'ArrayTable.Column',
              'x-component-props': {
                title: 'Status',
                width: '100px',
                align: 'center'
              },
              properties: {
                status: {
                  'x-read-pretty': true,
                  type: 'string',
                  'x-component': 'StatusTag'
                }
              }
            },
            'actions': {
              'type': 'void',
              'x-component': 'ArrayTable.Column',
              'x-component-props': {
                title: 'Actions',
                width: '230px',
                align: 'center',
                'className': 'small-padding fixed-width'
              },
              properties: {
                edit: {
                  type: 'void',
                  'x-content': 'Edit',
                  'x-component': 'Button',
                  'x-component-props': {
                    type: 'primary',
                    size: 'mini',
                    onClick: '{{ PAGE.onOpenEditFormDialog($self) }}'
                  }
                },
                publish: {
                  type: 'void',
                  'x-content': 'Publish',
                  'x-component': 'Button',
                  'x-component-props': {
                    type: 'success',
                    size: 'mini',
                    style: { 'margin-left': '10px' },
                    onClick: '{{ PAGE.onPublishClick($self) }}'
                  },
                  'x-reactions': [
                    '{{ function (field) { field.visible = field.query(".status").value() != "published" } }}'
                  ]
                },
                draft: {
                  type: 'void',
                  'x-content': 'Draft',
                  'x-component': 'Button',
                  'x-component-props': {
                    // type: 'success',
                    size: 'mini',
                    style: { 'margin-left': '10px' },
                    onClick: '{{ PAGE.onDraftClick($self) }}'
                  },
                  'x-reactions': [
                    '{{ function (field) { field.visible = field.query(".status").value() != "draft" } }}'
                  ]
                },
                delete: {
                  type: 'void',
                  'x-content': 'Delete',
                  'x-component': 'Button',
                  'x-component-props': {
                    type: 'danger',
                    size: 'mini',
                    style: { 'margin-left': '10px' },
                    onClick: '{{ PAGE.onDeleteClick($self) }}'
                  },
                  'x-reactions': [
                    '{{ function (field) { field.visible = field.query(".status").value() != "deleted" } }}'
                  ]
                }
              }
            }
          }
        }
      },
      pagination: {
        type: 'object',
        default: { current: 1, size: 20 },
        'x-decorator': 'Container',
        'x-decorator-props': {
          class: 'pagination-container'
        },
        'x-component': 'Pagination',
        'x-component-props': {
          layout: 'total, sizes, prev, pager, next, jumper',
          pageSizes: [10, 20, 30, 50],
          background: true,
          // currentPage: 1,
          // pageSize: 10,
          total: 0
        }
      }
    }
  }
}
/**
 * @type {import('../../index').DesignablePage}
 */
const add = {
  'form': {
    'labelCol': 6,
    'wrapperCol': 12
  },
  'schema': {
    'type': 'object',
    'properties': {
      'type': {
        type: 'string',
        title: 'Type',
        'x-component': 'Select',
        'x-component-props': {
          class: 'filter-item',
          placeholder: 'Please select'
        },
        'x-decorator': 'FormItem',
        enum: [
          { value: 'CN', label: 'China(CN)' },
          { value: 'US', label: 'USA(US)' },
          { value: 'JP', label: 'Japan(JP)' },
          { value: 'EU', label: 'Eurozone(EU)' }
        ],
        'x-validator': [
          { required: true, message: 'type is required' }
        ]
      },
      'timestamp': {
        type: 'date',
        title: 'Date',
        'x-component': 'DatePicker',
        'x-component-props': {
          class: 'filter-item',
          type: 'datetime',
          placeholder: 'Please pick a date'
        },
        'x-decorator': 'FormItem',
        'x-validator': [
          { required: true, message: 'timestamp is required' }
        ]
      },
      'title': {
        type: 'string',
        title: 'Title',
        'x-component': 'Input',
        'x-component-props': {
        },
        'x-decorator': 'FormItem',
        'x-validator': [
          { required: true, message: 'title is required' }
        ]
      },
      'status': {
        type: 'string',
        title: 'Status',
        'x-component': 'Select',
        'x-component-props': {
          class: 'filter-item',
          placeholder: 'Please select'
        },
        'x-decorator': 'FormItem',
        enum: ['published', 'draft', 'deleted']
      },
      'importance': {
        type: 'number',
        title: 'Imp',
        'x-component': 'Rate',
        'x-component-props': {
          colors: ['#99A9BF', '#F7BA2A', '#FF9900'],
          max: 3,
          style: { marginTop: '8px' }
        },
        'x-decorator': 'FormItem'
      },
      'remark': {
        type: 'string',
        title: 'Remark',
        'x-component': 'Input.TextArea',
        'x-component-props': {
          autosize: { minRows: 2, maxRows: 4 },
          placeholder: 'Please input'
        },
        'x-decorator': 'FormItem'
      }
    }
  }
}
/**
 * @type {import('../../index').DesignablePage}
 */
const edit = {
  'form': {
    'labelCol': 6,
    'wrapperCol': 12
  },
  'schema': {
    'type': 'object',
    'properties': {
      'type': {
        type: 'string',
        title: 'Type',
        'x-component': 'Select',
        'x-component-props': {
          class: 'filter-item',
          placeholder: 'Please select'
        },
        'x-decorator': 'FormItem',
        enum: [
          { value: 'CN', label: 'China(CN)' },
          { value: 'US', label: 'USA(US)' },
          { value: 'JP', label: 'Japan(JP)' },
          { value: 'EU', label: 'Eurozone(EU)' }
        ],
        'x-validator': [
          { required: true, message: 'type is required' }
        ]
      },
      'timestamp': {
        type: 'date',
        title: 'Date',
        'x-component': 'DatePicker',
        'x-component-props': {
          class: 'filter-item',
          type: 'datetime',
          placeholder: 'Please pick a date'
        },
        'x-decorator': 'FormItem',
        'x-validator': [
          { required: true, message: 'timestamp is required' }
        ]
      },
      'title': {
        type: 'string',
        title: 'Title',
        'x-component': 'Input',
        'x-component-props': {
        },
        'x-decorator': 'FormItem',
        'x-validator': [
          { required: true, message: 'title is required' }
        ]
      },
      'status': {
        type: 'string',
        title: 'Status',
        'x-component': 'Select',
        'x-component-props': {
          class: 'filter-item',
          placeholder: 'Please select'
        },
        'x-decorator': 'FormItem',
        enum: ['published', 'draft', 'deleted']
      },
      'importance': {
        type: 'number',
        title: 'Imp',
        'x-component': 'Rate',
        'x-component-props': {
          colors: ['#99A9BF', '#F7BA2A', '#FF9900'],
          max: 3,
          style: { marginTop: '8px' }
        },
        'x-decorator': 'FormItem'
      },
      'remark': {
        type: 'string',
        title: 'Remark',
        'x-component': 'Input.TextArea',
        'x-component-props': {
          autosize: { minRows: 2, maxRows: 4 },
          placeholder: 'Please input'
        },
        'x-decorator': 'FormItem'
      }
    }
  }
}
export default page
export {
  add,
  edit
}
