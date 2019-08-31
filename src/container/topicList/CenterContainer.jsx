import React from 'react'
import {Button} from 'reactstrap'

import TopicListItem from '../../components/listItems/TopicListItem';

import firebase from "firebase/app";

export default class CenterContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      topics: [],
      showCreateTopicModal: false
    };
    this.fetchTopicData();

    this.toggleModal = this.toggleModal.bind(this)
  }

  /**
   * モーダル開閉のためのイベントハンドラ
   */
  toggleModal(){
    this.setState({ showCreateTopicModal: !this.state.showCreateTopicModal})
  }
  
  /**
   * トピックデータを取得するイベントハンドラ
   */
  fetchTopicData = () => {
    var topics = [];
    const db = firebase.firestore();
    db.collection("Topics")
      .orderBy("comments", "desc")
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          topics.push(doc.data());
        });
        this.setState({ topics: topics });
      })
      .catch((err) => {
        console.log("Error getting documents", err);
      });
    return Promise.all([db]);
  };

  render () {
    const headerStyle = {
      backgroundColor: '#00075d'
    }

    return (
      <>
        {this.state.showCreateTopicModal && (
          <p>ここにモーダル</p>
        )}
        <div className='bg-white border 2px shadow-sm'>
          <h3 style={headerStyle} className='text-white py-2 pl-3 mb-0'>
            <span className="mr-3">Topic List</span>
            <Button color="secondary" onClick={this.toggleModal}>
              <i className="material-icons mr-1">
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
