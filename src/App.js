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
    return (
      <React.Fragment>
        <Header user_data={this.state.user_data} />
        <MainContainer user_data={this.state.user_data} />
      </React.Fragment>
    );
  }
}
