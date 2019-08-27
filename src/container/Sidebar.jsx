import React from 'react'
import PropTypes from 'prop-types'

import logo from '../asset/img/logo.png'
import { Link } from 'react-router-dom'

import { CardImg, ListGroup, ListGroupItem } from 'reactstrap'

export default class Sidebar extends React.Component {
  render () {
    return (
      <div className='shadow-sm pt-2 sticky-top'>
        <CardImg top width='100%' src={logo} alt='Card logo' />

        <ListGroup>
          <ListGroupItem tag='button' action>
            <Link to='/'>
              <p className='text-body mb-0 align-middle'>
                <i className='material-icons mr-2'>home</i>ホーム
              </p>
            </Link>
          </ListGroupItem>
          <ListGroupItem tag='button' action>
            <Link to='/card'>
              <p className='text-body mb-0 align-middle'>
                <i className='material-icons mr-2'>class</i>カード
              </p>
            </Link>
          </ListGroupItem>
          <ListGroupItem tag='button' action>
            <Link to='/topic'>
              <p className='text-body mb-0 align-middle'>
                <i className='material-icons mr-2'>question_answer</i>トピック
              </p>
            </Link>
          </ListGroupItem>
          {this.props.user_data.uid && (
            <ListGroupItem tag='button' action>
              <Link to={'/user/' + this.props.user_data.uid}>
                <p className='text-body mb-0 align-middle'>
                  <i className='material-icons mr-2'>account_circle</i>
                  マイページ
                </p>
              </Link>
            </ListGroupItem>
          )}
        </ListGroup>
      </div>
    )
  }
}

Sidebar.propTypes = {
  user_data: PropTypes.object
}
