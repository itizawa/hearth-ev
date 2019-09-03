import React from 'react'

import TopicListItem from '../listItems/TopicListItem'

// functionのインポート
import { fetchHotTopicData } from '../../function/topic'

export default class HotTopicBox extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      topics: []
    }
    this.fetchTopicData()
  }

  /**
   * トピックデータを取得するイベントハンドラ
   */
  async fetchTopicData() {
    const HotTopicData = await fetchHotTopicData()
    this.setState({ topics: HotTopicData })
  }

  render() {
    const headerStyle = {
      backgroundColor: '#00075d'
    }

    const trendingStyle = {
      fontSize: '33px'
    }

    return (
      <div className='bg-white border 2px shadow-sm mb-2'>
        <h3 style={headerStyle} className='text-white py-2 pl-3 mb-0'>
          <i className='material-icons mr-2' style={trendingStyle}>
            trending_up
          </i>
          HotTopic
        </h3>
        {this.state.topics.map((topic) => {
          return <TopicListItem key={topic.topic_id} topic_data={topic} />
        })}
      </div>
    )
  }
}
