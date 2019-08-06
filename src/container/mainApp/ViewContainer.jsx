import React from "react";

import firebase from "firebase/app";

export default class ViewContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: []
    };
    this.fetchUserData();
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

  render() {
    const header_style = {
      backgroundColor: "#00075d"
    };
    return (
      <React.Fragment>
        <div className="bg-white border 2px shadow-sm">
          <h3 style={header_style} className="text-white py-2 pl-3 mb-0">
            TopUser
          </h3>
        </div>
      </React.Fragment>
    );
  }
}

ViewContainer.propTypes = {};
