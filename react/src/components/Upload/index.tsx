import React, { useState } from 'react'

import { Upload as AUpload } from 'antd'

import './style.less'

interface UploadProps {
  value: string,
  onChange: (value: string) => void
}

export const Upload: React.FunctionComponent<UploadProps> = ({
  onChange,
  value = ''
}) => {
  const rmImage = () => {
    onChange && onChange('')
  }
  const handleChange = ({ file }) => {
    if (file.status == 'done') {
      onChange && onChange(file.response.files.file)
    }
  }
  return (
    <div className="upload-container">
      <AUpload
        multiple={false}
        showUploadList={false}
        onChange={handleChange}
        className="image-uploader"
        action="https://httpbin.org/post"
      >
        <i className="el-icon-upload" />
        <div className="el-upload__text">
          将文件拖到此处，或<em>点击上传</em>
        </div>
      </AUpload>
      <div className="image-preview image-app-preview">
        { value.length>1 ?
        <div className="image-preview-wrapper">
          <img src={value} />
          <div className="image-preview-action">
            <i className="el-icon-delete" onClick={rmImage} />
          </div>
        </div> : null }
      </div>
      <div className="image-preview">
        { value.length>1 ? <div className="image-preview-wrapper">
          <img src={value} />
          <div className="image-preview-action">
            <i className="el-icon-delete" onClick={rmImage} />
          </div>
        </div> : null }
      </div>
    </div>
  )
}