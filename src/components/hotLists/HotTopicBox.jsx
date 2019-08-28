import React from "react";
import firebase from "firebase/app";

import TopicListItem from "../listItems/TopicListItem";

// functionのインポート
import { fetchAllTopicData } from '../../function/topic'

export default class HotTopicBox extends React.Component {
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
  async fetchTopicData () {
    // var topics = [];
    // const db = firebase.firestore();
    // db.collection("Topics")
    //   .orderBy("timestamp", "desc")
    //   .limit(3)
    //   .get()
    //   .then((snapshot) => {
    //     snapshot.forEach((doc) => {
    //       topics.push(doc.data());
    //     });
    //     this.setState({ topics: topics });
    //   })
    //   .catch((err) => {
    //     console.log("Error getting documents", err);
    //   });
    // return Promise.all([db]);
    await fetchAllTopicData()
  };

  render() {
    const header_style = {
      backgroundColor: "#00075d"
    };

    const trending_style = {
      fontSize: "33px"
    };

    return (
      <div className="bg-white border 2px shadow-sm mb-2">
        <h3 style={header_style} className="text-white py-2 pl-3 mb-0">
          <i className="material-icons mr-2" style={trending_style}>
            trending_up
          </i>
          HotTopic
        </h3>
        {this.state.topics.map((topic, index) => {
          return <TopicListItem key={index} topic_data={topic} />;
        })}
      </div>
    );
  }
}
