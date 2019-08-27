import React from 'react'

import HotUserBox from '../../components/hotLists/HotUserBox'
import HotCardBox from '../../components/hotLists/HotCardBox'

export default class ViewContainer extends React.Component {
  render () {
    return (
      <>
        <HotUserBox />
        <HotCardBox />
      </>
    )
  }
}

ViewContainer.propTypes = {}
