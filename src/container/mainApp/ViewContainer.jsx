import React from "react";

import firebase from "firebase/app";

import TopicListItem from "../../components/TopicListItem";
import HotUserBox from "../../components/hotLists/HotUserBox";

export default class ViewContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
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
      .limit(3)
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

  render() {
    const header_style = {
      backgroundColor: "#00075d"
    };

    const trending_style = {
      fontSize: "33px"
    };

    return (
      <React.Fragment>
        <HotUserBox />

        <div className="bg-white border 2px shadow-sm mt-2">
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
      </React.Fragment>
    );
  }
}

ViewContainer.propTypes = {};
