import React from 'react'
import { Row, Col } from 'reactstrap'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

export default class UserListItem extends React.Component {
  render() {
    const { user_data } = this.props
    return (
      <Row className='mx-0 p-2 border-top'>
        <Col xs='1' className='px-0 mr-2'>
          <Link to={'/user/' + user_data.uid + '/timestamp'}>
            <img
              className='rounded-pill border'
              src={user_data.photoURL}
              alt={user_data.photoURL}
              width='100%'
              height='auto'
            />
          </Link>
        </Col>
        <Col xs='10' className='px-0'>
          <h6 className='mb-0'>
            <p className='my-2'>
              <Link to={'/user/' + user_data.uid + '/timestamp'}>
                <strong className='text-body mr-2'>{user_data.name}</strong>
              </Link>
              <span className='text-info mr-2' href='#' id={user_data.uid}>
                <i className='material-icons align-middle'>grade</i>
                {user_data.acquired}
              </span>
              <span className='text-info'>
                <i className='material-icons align-middle'>mode_comment</i>
                {user_data.comments}
              </span>
            </p>
          </h6>
        </Col>
      </Row>
    )
  }
}

UserListItem.propTypes = {
  user_data: PropTypes.object
}
