import React from 'react'
import PropTypes from 'prop-types'

export default class CardView extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      card_id: this.props.focus_card.id || ''
    }
  }

  render () {
    const img_frame = {
      height: '700px',
      padding: '5% 10%'
    }
    return (
      <>
        <div style={img_frame}>
          <img
            src={this.props.focus_card.card_img}
            alt={this.props.focus_card.card_img}
            width='100%'
            height='auto'
          />
        </div>
      </>
    )
  }
}

CardView.propTypes = {
  focus_card: PropTypes.object
}
