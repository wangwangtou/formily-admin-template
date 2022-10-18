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
          '{{ PAGE.useTablePaginationData() }}'
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
                width: '180px',
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
            'importance': {
              'type': 'void',
              'x-component': 'ArrayTable.Column',
              'x-component-props': {
                title: 'Importance',
                width: '100px'
              },
              properties: {
                importance: {
                  'x-read-pretty': true,
                  type: 'number',
                  'x-component': 'RankCount'
                }
              }
            },
            // 'pageviews': {
            //   'type': 'void',
            //   'x-component': 'ArrayTable.Column',
            //   'x-component-props': {
            //     title: 'Readings',
            //     width: '95',
            //     align: 'center'
            //   },
            //   properties: {
            //     pageviews: {
            //       'x-read-pretty': true,
            //       type: 'string',
            //       'x-component': 'Input'
            //     }
            //   }
            // },
            'status': {
              'type': 'void',
              'x-component': 'ArrayTable.Column',
              'x-component-props': {
                title: 'Status',
                width: '110',
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
            'title': {
              'type': 'void',
              'x-component': 'ArrayTable.Column',
              'x-component-props': {
                title: 'Title',
                minWidth: '300px'
              },
              properties: {
                title: {
                  'x-read-pretty': true,
                  type: 'string',
                  'x-decorator': 'RouterLink',
                  'x-decorator-props': {
                    class: 'link-type',
                    to: '{{ "/example/edit/"+ $self.query(".id").value() }}'
                  },
                  'x-component': 'Input'
                }
              }
            },
            'actions': {
              'type': 'void',
              'x-component': 'ArrayTable.Column',
              'x-component-props': {
                title: 'Actions',
                width: '120',
                align: 'center'
              },
              properties: {
                edit: {
                  type: 'void',
                  'x-content': 'Edit',
                  'x-decorator': 'RouterLink',
                  'x-decorator-props': {
                    to: '{{ "/example/edit/"+ $self.query(".id").value() }}'
                  },
                  'x-component': 'Button',
                  'x-component-props': {
                    type: 'primary',
                    icon: 'el-icon-edit'
                  }
                }
              }
            }
          }
        }
      },
      pagination: {
        // type: 'object',
        default: { current: 1, size: 10 },
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
export default page
