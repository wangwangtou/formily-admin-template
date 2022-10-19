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
      title1: {
        type: 'void',
        'x-component': 'AdminTitle',
        'x-component-props': {
          style: { margin: '0 0 5px 20px' }
        },
        'x-content': 'Fixed header, sorted by header order,'
      },
      columnsOptions1: {
        type: 'array',
        default: ['apple', 'banana'],
        'x-component': 'Checkbox.Group',
        'x-decorator': 'Container',
        'x-decorator-props': {
          class: 'app-container filter-container'
        },
        enum: [
          'apple',
          'banana',
          'orange'
        ]
      },
      table1: {
        type: 'array',
        'x-component': 'ArrayTable',
        'x-component-props': {
          border: true,
          fit: true,
          'highlight-current-row': true,
          style: { width: '100%' }
        },
        'x-decorator': 'Container',
        'x-decorator-props': {
          class: 'app-container'
        },
        'x-reactions': [
          '{{ PAGE.useTableData() }}'
        ],
        'x-pattern': 'readPretty',
        items: {
          'type': 'object',
          'properties': {
            'name': {
              'type': 'void',
              'x-component': 'ArrayTable.Column',
              'x-component-props': {
                title: 'fruitName',
                width: '180'
              },
              properties: {
                name: {
                  type: 'string',
                  'x-component': 'Input'
                }
              },
              'x-designable-id': 'ul0cvt4y6jz0',
              'x-index': 0
            },
            'apple': {
              'type': 'void',
              'x-component': 'ArrayTable.Column',
              'x-component-props': {
                'title': 'apple'
              },
              'x-reactions': [
                '{{ PAGE.useColumnVisible("columnsOptions1") }}'
              ],
              properties: {
                apple: {
                  type: 'string',
                  'x-component': 'Input'
                }
              },
              'x-designable-id': 'ul0cvt4y6jz',
              'x-index': 1
            },
            'banana': {
              'type': 'void',
              'x-component': 'ArrayTable.Column',
              'x-component-props': {
                'title': 'banana'
              },
              'x-reactions': [
                '{{ PAGE.useColumnVisible("columnsOptions1") }}'
              ],
              properties: {
                banana: {
                  type: 'string',
                  'x-component': 'Input'
                }
              },
              'x-designable-id': 'b0rmf0x61xk',
              'x-index': 2
            },
            'orange': {
              'type': 'void',
              'x-component': 'ArrayTable.Column',
              'x-component-props': {
                'title': 'orange'
              },
              'x-reactions': [
                '{{ PAGE.useColumnVisible("columnsOptions1") }}'
              ],
              properties: {
                orange: {
                  type: 'string',
                  'x-component': 'Input'
                }
              },
              'x-designable-id': 'nlz65g36nz1',
              'x-index': 3
            }
          }
        }
      },
      title2: {
        type: 'void',
        'x-component': 'AdminTitle',
        'x-component-props': {
          style: { margin: '30px 0 5px 20px' }
        },
        'x-content': 'Not fixed header, sorted by click order [not support]'
      },
      columnsOptions2: {
        type: 'array',
        default: ['apple', 'banana'],
        'x-component': 'Checkbox.Group',
        'x-decorator': 'Container',
        'x-decorator-props': {
          class: 'app-container filter-container'
        },
        enum: [
          'apple',
          'banana',
          'orange'
        ]
      },
      table2: {
        type: 'array',
        'x-component': 'ArrayTable',
        'x-component-props': {
          border: true,
          fit: true,
          'highlight-current-row': true,
          style: { width: '100%' }
        },
        'x-decorator': 'Container',
        'x-decorator-props': {
          class: 'app-container'
        },
        'x-reactions': [
          '{{ PAGE.useTableData() }}'
        ],
        'x-pattern': 'readPretty',
        items: {
          'type': 'object',
          'properties': {
            'name': {
              'type': 'void',
              'x-component': 'ArrayTable.Column',
              'x-component-props': {
                title: 'fruitName',
                width: '180'
              },
              properties: {
                name: {
                  type: 'string',
                  'x-component': 'Input'
                }
              },
              'x-designable-id': 'ul0cvt4y6jz10',
              'x-index': 0
            },
            'apple': {
              'type': 'void',
              'x-component': 'ArrayTable.Column',
              'x-component-props': {
                'title': 'apple'
              },
              'x-reactions': [
                '{{ PAGE.useColumnVisibleSort("columnsOptions2") }}'
              ],
              properties: {
                apple: {
                  type: 'string',
                  'x-component': 'Input'
                }
              },
              'x-designable-id': 'ul0cvt4y6jz1',
              'x-index': 1
            },
            'banana': {
              'type': 'void',
              'x-component': 'ArrayTable.Column',
              'x-component-props': {
                'title': 'banana'
              },
              'x-reactions': [
                '{{ PAGE.useColumnVisibleSort("columnsOptions2") }}'
              ],
              properties: {
                banana: {
                  type: 'string',
                  'x-component': 'Input'
                }
              },
              'x-designable-id': 'b0rmf0x61xk1',
              'x-index': 2
            },
            'orange': {
              'type': 'void',
              'x-component': 'ArrayTable.Column',
              'x-component-props': {
                'title': 'orange'
              },
              'x-reactions': [
                '{{ PAGE.useColumnVisibleSort("columnsOptions2") }}'
              ],
              properties: {
                orange: {
                  type: 'string',
                  'x-component': 'Input'
                }
              },
              'x-designable-id': 'nlz65g36nz11',
              'x-index': 3
            }
          }
        }
      }
    }
  }
}
export default page
