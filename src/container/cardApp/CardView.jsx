import React from 'react'
import PropTypes from 'prop-types'

import bgImage from '../../asset/img/bg.jpg'

export default class CardView extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      card_id: this.props.focus_card.id || ''
    }
  }

  render () {
    const img_frame = {
      padding: '5%',
      backgroundImage: `url(${bgImage})`
    }
    return (
      <React.Fragment>
        <div style={img_frame}>
          <img
            src={this.props.focus_card.card_img}
            alt={this.props.focus_card.card_id}
            width='100%'
            height='auto'
          />
        </div>
      </React.Fragment>
    )
  }
}

CardView.propTypes = {
  focus_card: PropTypes.object
}
