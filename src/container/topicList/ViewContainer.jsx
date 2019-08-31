import React from 'react'

import HotUserBox from '../../components/hotBoxes/HotUserBox'
import HotCardBox from '../../components/hotBoxes/HotCardBox'

export default class ViewContainer extends React.Component {
  render() {
    return (
      <>
        <HotUserBox />
        <HotCardBox />
      </>
    )
  }
}

ViewContainer.propTypes = {}
