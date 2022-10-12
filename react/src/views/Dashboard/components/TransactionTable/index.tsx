import React, { useEffect, useState } from 'react'

import { transactionList } from '@/api/remote-search'
import { Table, Tag } from 'antd'
import { toThousandFilter } from '@/utils/filter'

export const TransactionTable: React.FunctionComponent = () => {
  const orderNoFilter = (str) => {
    return str.substring(0, 30)
  }
  const statusFilter = (status) => {
    const statusMap = {
      success: 'success',
      pending: 'error'
    }
    return statusMap[status]
  }
  const [data, setData] = useState([])
  const queryData = async () => {
    const response = await transactionList(null)
    setData(response.data.items.slice(0, 8))
  }
  useEffect(() => {
    queryData()
  }, [])
  return (
    <Table style={{width: '100%' }} dataSource={data}>
      <Table.Column title="Order_No" width={200} render={(value, record: any) => orderNoFilter(record.order_no) }/>
      <Table.Column title="Price" width={195} align='center' render={(value, record: any) => '¥' + toThousandFilter(record.price) }/>
      <Table.Column title="Status" width={100} render={(value, record: any) => (
        <Tag color={statusFilter(record.status)}>{record.status}</Tag>
      ) }/>
    </Table>
  )
}