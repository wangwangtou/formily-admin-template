import { message } from 'antd'
import React, { useEffect, useState } from 'react'
import { EditorImage } from './components/EditorImage'

import defaultToolbar from './toolbar'
import defaultPlugins from './plugins'
import dynamicLoadScript from './dynamicLoadScript'

import './style.less'

const tinymceCDN = 'https://cdn.jsdelivr.net/npm/tinymce-all-in-one@4.9.3/tinymce.min.js'

interface TinymceProps {
  id: string,
  value: string,
  toolbar: any[],
  menubar: string,
  height: number | string,
  width: number | string,
  onChange: (value: string) => void
}

const languageTypeList = {
  'en': 'en',
  'zh': 'zh_CN',
  'es': 'es_MX',
  'ja': 'ja'
}

export const Tinymce: React.FunctionComponent<TinymceProps> = (props) => {
  const [_id] = useState('vue-tinymce-' + +new Date() + ((Math.random() * 1000).toFixed(0) + ''))
  const id = typeof props.id == 'undefined' ? _id : props.id
  const value = typeof props.value == 'undefined' ? null : props.value
  const toolbar = typeof props.toolbar == 'undefined' ? [] : props.toolbar
  const menubar = typeof props.menubar == 'undefined' ? 'file edit insert view format table' : props.menubar
  const height = typeof props.height == 'undefined' ? '360px' : props.height
  const width = typeof props.width == 'undefined' ? 'auto' : props.width
  const [ state, setState ] = useState({
    hasInit: false,
    hasChange: false,
    fullscreen: false
  })
  const setValue = (value) => {
    if (!state.hasChange && state.hasInit) {
      if (window.tinymce && window.tinymce.get(id)) {
        window.tinymce.get(id).setContent(value || '')
      }
    }
  }
  const imageSuccessCBK = (files) => {
    window.tinymce && window.tinymce.get(id) && window.tinymce.get(id).insertContent(files.map(f => `<img class="wscnph" src="${f.url}" >`).join(''))
  }
  setValue(value)
  useEffect(() => {
    const initTinymce = () => {
      window.tinymce.init({
        selector: `#${id}`,
        language: languageTypeList['en'],
        height: height,
        body_class: 'panel-body ',
        object_resizing: false,
        toolbar: toolbar.length > 0 ? toolbar : defaultToolbar,
        menubar: menubar,
        plugins: defaultPlugins,
        end_container_on_empty_block: true,
        powerpaste_word_import: 'clean',
        code_dialog_height: 450,
        code_dialog_width: 1000,
        advlist_bullet_styles: 'square',
        advlist_number_styles: 'default',
        imagetools_cors_hosts: ['www.tinymce.com', 'codepen.io'],
        default_link_target: '_blank',
        link_title: false,
        nonbreaking_force_tab: true, // inserting nonbreaking space &nbsp; need Nonbreaking Space Plugin
        init_instance_callback: editor => {
          if (value) {
            editor.setContent(value)
          }
          setState({
            ...state,
            hasInit: true
          })
          editor.on('NodeChange Change KeyUp SetContent', () => {
            setState({
              ...state,
              hasChange: true
            })
            props.onChange && props.onChange(editor.getContent())
          })
        },
        setup(editor) {
          editor.on('FullscreenStateChanged', (e) => {
            setState({
              ...state,
              fullscreen: e.state
            })
          })
        },
        // it will try to keep these URLs intact
        // https://www.tiny.cloud/docs-3x/reference/configuration/Configuration3x@convert_urls/
        // https://stackoverflow.com/questions/5196205/disable-tinymce-absolute-to-relative-url-conversions
        convert_urls: false
      })
    }
    if (window.tinymce) {
      initTinymce()
    } else {
      dynamicLoadScript(tinymceCDN, (err) => {
        if (err) {
          message.error(err.message)
          return
        }
        initTinymce()
      })
    }
    return () => {
      const tinymce = window.tinymce && window.tinymce.get(id)
      if (state.fullscreen) {
        tinymce.execCommand('mceFullScreen')
      }
      if (tinymce) {
        tinymce.destroy()
      }
    }
  }, []) 
  return (
    <div className={'tinymce-container ' + (state.fullscreen ? 'fullscreen' : '')} 
      style={{width:width}}>
      <textarea id={id} className="tinymce-textarea" />
      <div className="editor-custom-btn-container">
        <EditorImage color="#1890ff" className="editor-upload-btn" onSuccessCBK={imageSuccessCBK} />
      </div>
    </div>
  )
}