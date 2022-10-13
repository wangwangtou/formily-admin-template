import React, { useEffect, useRef, useState } from 'react'

import { Button, Modal, Upload, message } from 'antd'
import { ElIcon } from '@/components/ElIcon'

import './style.less'

interface FileInfo {
  url: string,
  hasSuccess: boolean
}

interface EditorImageProps {
  color: string,
  className: string,
  onSuccessCBK: (files: FileInfo[]) => void
}

export const EditorImage: React.FunctionComponent<EditorImageProps> = ({
  color,
  onSuccessCBK
}) => {
  const [dialogVisible, setDialogVisible] = useState(false)
  const [fileList, setFileList] = useState([])
  const handleSubmit = () => {
    for(let i=0;i<fileList.length;i++) {
      const done = fileList[i].status == 'done'
      if (!done) {
        message.warning('Please wait for all images to be uploaded successfully. If there is a network problem, please refresh the page and upload again!')
        return
      }
    }
    console.log(fileList)
    onSuccessCBK && onSuccessCBK(fileList.map(file => ({
      url: file.response.files.file,
      hasSuccess: true,
    })))
    setDialogVisible(false)
    setFileList([])
  }
  const beforeUpload = (file): Promise<boolean> => {
    const _URL = window.URL || window.webkitURL
    const fileName = file.uid
    // this.listObj[fileName] = {}
    return new Promise((resolve, reject) => {
      const img = new Image()
      img.src = _URL.createObjectURL(file)
      img.onload = function() {
        // _self.listObj[fileName] = { hasSuccess: false, uid: file.uid, width: this.width, height: this.height }
      }
      resolve(true)
    })
  }
  return (
    <div className="upload-container">
      <Button 
        style={{background:color,borderColor:color}}
        icon={<ElIcon name="el-icon-upload" />}
        size="small"
        type="primary" onClick={() => setDialogVisible(true)}>
        upload
      </Button>
      <Modal visible={dialogVisible}
        footer={null}>
        <Upload
          multiple={true}
          fileList={fileList}
          showUploadList={true}
          onChange={({fileList})=> {setFileList(fileList)}}
          beforeUpload={beforeUpload}
          className="editor-slide-upload"
          action="https://httpbin.org/post"
          listType="picture-card"
        >
          <Button size="middle" type="primary">
            Click upload
          </Button>
        </Upload>
        <Button onClick={() => setDialogVisible(false)}>
          Cancel
        </Button>
        <Button type="primary" onClick={() => handleSubmit()}>
          Confirm
        </Button>
      </Modal>
    </div>
  )
}