import { Tinymce, Sticky, Upload } from '@/components'
import { Warning } from './components'

// import { fetchArticle } from '@/api/article'
import { searchUser } from '@/api/remote-search'
import { message, notification } from 'antd'

import './example.less'

export const components = {
  Sticky,
  Tinymce,
  Warning,
  Container: 'div',
  Upload
}

export const scope = {
  PAGE: {
    /**
     * @return {(field: import('@formily/core').GeneralField, form: import('@formily/core').Form) => void} field
     */
    useStickyClassName() {
      return field => {
        field.query('sticky').take(sticky => {
          sticky.setComponentProps({
            className: 'sub-navbar ' + field.value
          })
        })
      }
    },
    /**
     * @param {import('@formily/core').Field} field
     */
    searchUserRemoteMethod(field) {
      return async query => {
        const response = await searchUser(query)
        if (response.data.items) {
          field.setDataSource(response.data.items.map(item => item.name))
        }
      }
    },
    /**
     * @param {import('@formily/core').Field} field
     */
    onSubmitForm(field) {
      return async function onSubmitForm() {
        try {
          await field.form.validate('main.*')
          notification.success({
            message: '发布文章成功',
            type: 'success',
            duration: 2000 / 1000
          })
          field.query('status').take().value = 'published'
        } catch (e) {
          console.log('error submit!!')
          return false
        }
      }
    },
    /**
     * @param {import('@formily/core').Field} field
     */
    onDraftForm(field) {
      return async function onDraftForm() {
        const article = field.form.values
        if (!article.content || !article.title) {
          message.warning('请填写必要的标题和内容')
          return
        }
        message.success('保存成功', 1000 / 1000)
        field.query('status').take().value = 'draft'
      }
    }
  }
}
