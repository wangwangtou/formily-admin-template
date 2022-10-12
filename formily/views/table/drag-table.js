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
      sortable: {
        type: 'void',
        'x-component': 'Sortable',
        'x-component-props': {
          arrayField: 'table',
          containerSelector: '.el-table__body-wrapper > table > tbody'
        },
        properties: {
          table: {
            type: 'array',
            'x-component': 'ArrayTable',
            'x-component-props': {
              rowKey: 'id',
              border: true,
              fit: true,
              'highlight-current-row': true,
              style: { width: '100%' }
            },
            'x-reactions': [
              '{{ PAGE.useTableData() }}'
            ],
            items: {
              'type': 'object',
              'properties': {
                'id': {
                  'type': 'void',
                  'x-component': 'ArrayTable.Column',
                  'x-component-props': {
                    title: 'ID',
                    width: '65px',
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
                      'x-component': 'Input'
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
                    width: '110px',
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
                'drag': {
                  'type': 'void',
                  'x-component': 'ArrayTable.Column',
                  'x-component-props': {
                    title: 'Drag',
                    width: '80px',
                    align: 'center'
                  },
                  properties: {
                    drag: {
                      type: 'void',
                      'x-component': 'ArrayTable.SortHandle'
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
