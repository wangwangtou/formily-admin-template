import React from 'react'

import './style.less'

import url_404 from '@/assets/404_images/404.png'
import url_404_cloud from '@/assets/404_images/404_cloud.png'

export const V404: React.FunctionComponent = () => {
  const message = 'The webmaster said that you can not enter this page...'
  return (
    <div className="wscn-http404-container">
      <div className="wscn-http404">
        <div className="pic-404">
          <img className="pic-404__parent" src={url_404} alt="404"/>
          <img className="pic-404__child left" src={url_404_cloud} alt="404"/>
          <img className="pic-404__child mid" src={url_404_cloud} alt="404"/>
          <img className="pic-404__child right" src={url_404_cloud} alt="404"/>
        </div>
        <div className="bullshit">
          <div className="bullshit__oops">OOPS!</div>
          <div className="bullshit__info">All rights reserved
            <a style={{color:'#20a0ff'}} href="https://wallstreetcn.com" target="_blank">wallstreetcn</a>
          </div>
          <div className="bullshit__headline">{ message }</div>
          <div className="bullshit__info">Please check that the URL you entered is correct, or click the button below to return to the homepage.</div>
          <a href="" className="bullshit__return-home">Back to home</a>
        </div>
      </div>
    </div>
  )
}