import React from 'react'
import PropTypes from 'prop-types'
import { Row, Col } from 'reactstrap'
import CenterContainer from './CenterContainer'
import ViewContainer from './ViewContainer'

export default class MainApp extends React.Component {
  render () {
    return (
      <>
        <Row>
          <Col md='7' className='px-0 mb-2'>
            <CenterContainer user_data={this.props.user_data} />
          </Col>
          <Col md='5' className='px-1'>
            <ViewContainer />
          </Col>
        </Row>
      </>
    )
  }
}

MainApp.propTypes = {
  user_data: PropTypes.object
}
