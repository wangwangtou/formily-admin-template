import React from 'react'

import { Row, Col } from 'antd'
import { SvgIcon, CountTo } from '@/components'

import './style.less'

interface PanelGroupProps {
  dataSource: any[],
  onHandleSetLineChartData?: (item: any) => void
}

export const PanelGroup: React.FunctionComponent<PanelGroupProps> = ({ dataSource, onHandleSetLineChartData }) => {
  return (
    <Row gutter={40} className="panel-group">
      {dataSource.map((item, index) => (
        <Col xs={12} sm={12} lg={6} className="card-panel-col">
          <div className="card-panel" onClick={() => onHandleSetLineChartData && onHandleSetLineChartData(item) }>
            <div className={['card-panel-icon-wrapper', 'icon-' + item.icon].join(' ')}>
              <SvgIcon iconClass={item.icon} className="card-panel-icon" />
            </div>
            <div className="card-panel-description">
              <div className="card-panel-text">
                { item.title }
              </div>
              <div className="card-panel-num">
                <CountTo startVal={0} endVal={item.value} duration={2600 + index * 200}  />
              </div>
            </div>
          </div>
        </Col>
      ))}      
    </Row>
  )
}