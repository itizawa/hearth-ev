import React from "react";
import { Row, Col } from "reactstrap";

// Containerのインポート
import Header from "./container/Header";
import MainContainer from "./container/MainContainer";
import Sidebar from "./container/Sidebar";

import firebase from "firebase/app";

export default class App extends React.Component {
  user_data = { displayName: "", photoURL: "", uid: "" };

  constructor() {
    super();
    this.state = {
      user_data: {}
    };
  }

  componentDidMount() {
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
        <MainContainer />
        <Row className="mt-5">
          <Col className="ml-5 mt-3" md="3">
            <Sidebar user_data={this.state.user_data} />
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}
