import { transformComponent } from '@formily/element/lib/__builtins__/shared'

import Tinymce from '@/components/Tinymce'
import Sticky from '@/components/Sticky'
import Upload from '@/components/Upload/SingleImage3'
import Warning from './components/Warning'

// import { fetchArticle } from '@/api/article'
import { searchUser } from '@/api/remote-search'
import { Message, Notification } from 'element-ui'

import './example.scss'

export const components = {
  Sticky,
  Tinymce: transformComponent(Tinymce, { change: 'input' }),
  Warning,
  Container: 'div',
  Upload: transformComponent(Upload, { change: 'input' })
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
          Notification({
            title: '成功',
            message: '发布文章成功',
            type: 'success',
            duration: 2000
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
          Message({
            message: '请填写必要的标题和内容',
            type: 'warning'
          })
          return
        }
        Message({
          message: '保存成功',
          type: 'success',
          showClose: true,
          duration: 1000
        })
        field.query('status').take().value = 'draft'
      }
    }
  }
}
