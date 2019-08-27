import React from 'react'

export default class CenterContainer extends React.Component {

  render () {
    const header_style = {
      backgroundColor: '#00075d'
    }

    return (
      <>
        <div className='bg-white border 2px shadow-sm'>
          <h3 style={header_style} className='text-white py-2 pl-3 mb-0'>
            Card List
          </h3>
        </div>
      </>
    )
  }
}
