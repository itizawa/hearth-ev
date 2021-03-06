import React from 'react'
import PropTypes from 'prop-types'

import bgImage from '../../asset/img/bg.jpg'

import { Row, Col, Card } from 'reactstrap'

export default class CardView extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      card_id: this.props.focusCard.id || ''
    }
  }

  render() {
    const { focusCard } = this.props

    const img_frame = {
      padding: '5%',
      backgroundImage: `url(${bgImage})`
    }
    return (
      <>
        <div style={img_frame}>
          {/* TODO カード検索ページ後に追加 */}
          <Row>
            <Col xs='12' className='text-center'>
              <Card className='p-1 mb-2 border'>
                <p className='mb-0'>コメント</p>
                <strong className='text-primary'>
                  <i className='material-icons'>mode_comment</i>
                  {focusCard.comments}
                </strong>
              </Card>
            </Col>
          </Row>
          <img
            src={focusCard.card_img}
            alt={focusCard.card_id}
            width='100%'
            height='auto'
          />
        </div>
      </>
    )
  }
}

CardView.propTypes = {
  focusCard: PropTypes.object
}
