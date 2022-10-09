import { useErrorLogState } from '@/hooks'
import { Badge, Button, Modal, Table, Tag } from 'antd'
import React, { useState } from 'react'
import { ElIcon } from '../ElIcon'
import { SvgIcon } from '../SvgIcon'

import './style.less'

interface ErrorLogProps {
  className: string
}

export const ErrorLog: React.FunctionComponent<ErrorLogProps> = ({ className, children }) => {
  const { errorLogState, errorLogActions: { clearErrorLog } } = useErrorLogState()
  const [ dialogShow, setDialogShow ] = useState(false)
  return (
    errorLogState.logs.length
    ? <div className={className}>
        <Badge dot style={{}}>
          <SvgIcon iconClass="bug"  onClick={() => setDialogShow(true)}/>
        </Badge>
        <Modal visible={dialogShow} width="80%" title={
          <div slot="title">
          <span style={{paddingRight: '10px'}}>Error Log</span>
          <Button size="small" type="primary" icon={<ElIcon name='delete'/>}
            onClick={() => {
              clearErrorLog()
              setDialogShow(false)
            }}>Clear All</Button>
        </div>
        } onCancel={() => setDialogShow(false)} onOk={() => setDialogShow(false)}>
          <Table dataSource={errorLogState.logs} bordered>
            <Table.Column title="Message" render={(value, row: any) => (
              <>
                <div>
                  <span className="message-title">Msg:</span>
                  <Tag color="error">
                    { row.err ? row.err.message : row.err }
                  </Tag>
                </div>
                <br />
                <div>
                  <span className="message-title" style={{paddingRight: '10px'}}>Info: </span>
                    <Tag color="warning">
                      { row.tag } error in { row.info }
                    </Tag>
                </div>
                <br />
                <div>
                  <span className="message-title" style={{paddingRight: '16px'}}>Url: </span>
                  <Tag color="success">
                    { row.url }
                  </Tag>
                </div>
              </>
            )} />
            <Table.Column title="Stack" render={(value, row: any) => {
              return row.err ? row.err.stack : row.err
            }} />
          </Table>
        </Modal>
      </div>
    : <></>
  )
}