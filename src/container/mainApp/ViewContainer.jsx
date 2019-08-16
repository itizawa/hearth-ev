import React from "react";

import firebase from "firebase/app";
import UserListItem from "../../components/UserListItem";
import TopicListItem from "../../components/TopicListItem";

export default class ViewContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      topics: []
    };

    this.fetchUserData();
    this.fetchTopicData();
  }

  /**
   * ユーザーデータを取得するイベントハンドラ
   */
  fetchUserData = () => {
    var users = [];
    const db = firebase.firestore();
    db.collection("Users")
      .orderBy("acquired", "desc")
      .limit(3)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          users.push(doc.data());
        });
        this.setState({ users: users });
      })
      .catch((err) => {
        console.log("Error getting documents", err);
      });
    return Promise.all([db]);
  };

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
        <div className="bg-white border 2px shadow-sm">
          <h3 style={header_style} className="text-white py-2 pl-3 mb-0">
            <i className="material-icons mr-2" style={trending_style}>
              trending_up
            </i>
            TopUser
          </h3>
          {this.state.users.map((user, index) => {
            return <UserListItem key={index} user_data={user} />;
          })}
        </div>

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
