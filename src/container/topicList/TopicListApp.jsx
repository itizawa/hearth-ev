import React from 'react'
import { Row, Col } from 'reactstrap'

import CenterContainer from './CenterContainer'
import ViewContainer from '../topicApp/ViewContainer'

export default class TopicListApp extends React.Component {
  render () {
    return (
      <>
        <Row>
          <Col md='7' className='px-0'>
            <CenterContainer />
          </Col>
          <Col md='5' className='px-0'>
            <ViewContainer />
          </Col>
        </Row>
      </>
    )
  }
}
