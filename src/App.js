import React from "react";
import { Row, Col } from "reactstrap";

// Containerのインポート
import Header from "./container/Header";
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
    const bg_Style = {
      backgroundColor: "#f6f6f6",
      position: "fixed",
      width: "100%",
      height: "100%"
    };

    return (
      <div style={bg_Style}>
        <Header user_data={this.state.user_data} />
        <Row className="mt-5">
          <Col className="ml-5 mt-3" md="3">
            <Sidebar />
          </Col>
        </Row>
      </div>
    );
  }
}
