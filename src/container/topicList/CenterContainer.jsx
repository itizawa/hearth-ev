import React from 'react'
import {Button} from 'reactstrap'

import TopicListItem from '../../components/listItems/TopicListItem';

import firebase from "firebase/app";

export default class CenterContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      topics: []
    };
    this.fetchTopicData();

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
    const header_style = {
      backgroundColor: '#00075d'
    }

    return (
      <>
        <div className='bg-white border 2px shadow-sm'>
          <h3 style={header_style} className='text-white py-2 pl-3 mb-0'>
            <span className="mr-3">Topic List</span>
            <Button color="secondary">
              <i class="material-icons mr-1">
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
