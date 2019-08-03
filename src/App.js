import React from "react";

//共通 css
import "./App.css";

// Containerのインポート
import Header from "./container/Header";
import MainContainer from "./container/MainContainer";

import firebase from "firebase/app";

export default class App extends React.Component {
  user_data = { displayName: "", photoURL: "", uid: "" };

  constructor() {
    super();
    this.state = {
      user_data: {}
    };

    this.setUpUser();
  }

  /**
   * アプリ表示時にユーザーをセットする
   */

  setUpUser() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.user_data.displayName = user.displayName;
        this.user_data.photoURL = user.photoURL;
        this.user_data.uid = user.uid;

        this.setState({ user_data: this.user_data });
      }
    });
  }

  render() {
    const bgStyle = {
      backgroundColor: "#e6ecf0",
      position: "fixed",
      height: "100%",
      width: "100%"
    };
    return (
      <div style={bgStyle}>
        <Header user_data={this.state.user_data} />
        <MainContainer user_data={this.state.user_data} />
      </div>
    );
  }
}
