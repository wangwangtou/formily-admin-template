import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { FormilyPage } from '@/components'
import { onFormReact } from '@formily/core'

// import page from 'formily/views/example/edit'
import { Store } from 'formily/views'

import { fetchArticle } from '@/api/article'
import { scope, components } from './example'

export const ExampleEdit: React.FunctionComponent = () => {
  const params = useParams()
  const navigate = useNavigate()
  useEffect(() => {
    if (params.id) {
      
    } else {
      navigate('/example/create')
    }
  }, [params.id])
  return (
    <div className="createPost-container">
      <FormilyPage
        schema={Store.ExampleEdit} components={components} scope={scope}
        effects={() => {
          onFormReact(async form => {
            const id = params.id
            const response = await fetchArticle(id)
            const article = response.data
            article.title += `   Article Id:${article.id}`
            article.content_short += `   Article Id:${article.id}`
            // this.setTagsViewTitle()
            // this.setPageTitle()

            article.displayTime = new Date(article.display_time)
            article.comment_disabled = article.comment_disabled ? 'closed' : 'opened'
            form.setInitialValues(article)
          })
        }}
        schemaKey="ExampleEdit" />
    </div>
  )
}