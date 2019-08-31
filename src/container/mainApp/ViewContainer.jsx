import React from 'react'

import HotUserBox from '../../components/hotBoxes/HotUserBox'
import HotTopicBox from '../../components/hotBoxes/HotTopicBox'
import HotCardBox from '../../components/hotBoxes/HotCardBox'

export default class ViewContainer extends React.Component {
  render () {
    return (
      <>
        <HotUserBox />
        <HotTopicBox />
        <HotCardBox />
      </>
    )
  }
}

ViewContainer.propTypes = {}
