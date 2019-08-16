import React from "react";
import UserListItem from "../UserListItem";

import firebase from "firebase/app";

export default class HotUserBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: []
    };
    this.fetchCardData();
  }

  /**
   * カードデータを取得するイベントハンドラ
   */
  fetchCardData = () => {
    var cards = [];
    const db = firebase.firestore();
    db.collection("Cards")
      .orderBy("comments", "desc")
      .limit(3)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          cards.push(doc.data());
        });
        this.setState({ cards: cards });
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
      <div className="bg-white border 2px shadow-sm mb-1">
        <h3 style={header_style} className="text-white py-2 pl-3 mb-0">
          <i className="material-icons mr-2" style={trending_style}>
            trending_up
          </i>
          TopCard
        </h3>
        {/* {this.state.users.map((user, index) => {
          return <UserListItem key={index} user_data={user} />;
        })} */}
      </div>
    );
  }
}
