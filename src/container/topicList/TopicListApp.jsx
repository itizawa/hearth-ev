import React from 'react'
import { Row, Col } from 'reactstrap'

import CenterContainer from './CenterContainer'

export default class TopicListApp extends React.Component {
  render () {
    return (
      <>
        <Row>
          <Col md='7' className='px-0'>
            <CenterContainer />
          </Col>
          <Col md='5' className='px-0' />
        </Row>
      </>
    )
  }