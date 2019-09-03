import React from 'react'
import { Row, Col } from 'reactstrap'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

export default class CardListItem extends React.Component {
  render() {
    const chat_style = {
      fontSize: '18px'
    }

    const { card_data } = this.props
    return (
      <Row className='mx-0 p-2 border-top'>
        <Col xs='10' className='px-0'>
          <h6 className='mb-0'>
            <Link to={'/card/' + card_data.card_id}>
              <strong className='text-body'>{card_data.card_name}</strong>
              <span className='text-info'>
                <i className='material-icons ml-1' style={chat_style}>
                  mode_comment
                </i>
                {card_data.comments}
              </span>
              <span className='text-muted'>
                <i className='material-icons ml-1' style={chat_style}>
                  schedule
                </i>
                {card_data.update_at}
              </span>
            </Link>
          </h6>
        </Col>
      </Row>
    )
  }
}

CardListItem.propTypes = {
  card_data: PropTypes.object
}
