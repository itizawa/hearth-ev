import React from 'react'
import { Button } from 'reactstrap'

import TopicListItem from '../../components/listItems/TopicListItem'

import firebase from 'firebase/app'
import CreateTopicModal from '../../components/Modals/CreateTopicModal'

export default class CenterContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      topics: [],
      showCreateTopicModal: false
    }
    this.fetchTopicData()

    this.toggleModal = this.toggleModal.bind(this)
    this.fetchTopicData = this.fetchTopicData.bind(this)
  }

  /**
   * モーダル開閉のためのイベントハンドラ
   */
  toggleModal() {
    this.setState({ showCreateTopicModal: !this.state.showCreateTopicModal })
  }

  /**
   * トピックデータを取得するイベントハンドラ
   */
  async fetchTopicData() {
    var topics = []
    await firebase.firestore().collection('Topics')
      .orderBy('comments', 'desc')
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          topics.push(doc.data())
        })
        this.setState({ topics: topics })
      })
      .catch((err) => {
        console.log('Error getting documents', err)
      })
  }

  render() {
    const headerStyle = {
      backgroundColor: '#00075d'
    }

    return (
      <>
        <CreateTopicModal show={this.state.showCreateTopicModal} toggleModal={this.toggleModal} fetchTopicData={this.fetchTopicData} />
        <div className='bg-white border 2px shadow-sm'>
          <h3 style={headerStyle} className='text-white py-2 pl-3 mb-0'>
            <span className='mr-3'>Topic List</span>
            <Button color='secondary' onClick={this.toggleModal}>
              <i className='material-icons mr-1'>
                library_add
              </i>新しいトピックを追加する
            </Button>
          </h3>
          {this.state.topics.map((topic, index) => {
            return <TopicListItem key={index} topic_data={topic} />
          })}
        </div>
      </>
    )
  }
}
