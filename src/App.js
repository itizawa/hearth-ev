import React from "react";
import { Spinner } from "reactstrap"

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
      user_data: {},
      isDataFetch: true
    };

    this.setUpUser();
  }

  /**
   * アプリ表示時にユーザーをセットする
   */

  setUpUser() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log(user)
        this.user_data.displayName = user.displayName;
        this.user_data.photoURL = user.providerData[0].photoURL;
        this.user_data.uid = user.uid;

        this.setState({ user_data: this.user_data });
      }
    });
  }

  render() {
    const spinner_style = {
      height: '200px',
      width: '200px',
      marginLeft: '40%',
    }
    return (
      <React.Fragment>
        <Header user_data={this.state.user_data} />
        {this.state.isDataFetch && (
          <div className='mt-2'>
            <Spinner style={spinner_style} color='primary' type='grow' />
          </div>
        )}
        <MainContainer user_data={this.state.user_data} />
      </React.Fragment>
    );
  }
}
