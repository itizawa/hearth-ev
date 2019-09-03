import React from 'react'
import PropTypes from 'prop-types'

import CardView from './CardView'

export default class ViewContainer extends React.Component {
  render () {
    const { focusCard } = this.props
    const header_style = {
      backgroundColor: '#00075d'
    }
    return (
      <>
        <div className='bg-white border 2px shadow-sm'>
          <h3 style={header_style} className='text-white py-2 pl-3 mb-0'>
            {focusCard.card_name}
          </h3>
          <CardView focusCard={focusCard} />
        </div>
      </>
    )
  }
}

ViewContainer.propTypes = {
  user_data: PropTypes.object,
  focus_card: PropTypes.object
}
