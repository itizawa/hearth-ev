import React from "react";
import { Row, Col } from "reactstrap";

// Containerのインポート
import Header from "./container/Header";
import Sidebar from "./container/Sidebar";

import firebase from "firebase/app";

export default class App extends React.Component {

  constructor() {
    super();
    this.state = {
      user_photoURL: "",
      user_uid: "",
      user_displayName: ""
    };
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user_photoURL: user.photoURL });
        this.setState({ user_uid: user.uid });
        this.setState({ user_displayName: user.displayName });
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
        <Header />
        <Row className="mt-5">
          <Col className="ml-5 mt-3" md="3">
            <Sidebar />
          </Col>
        </Row>
      </div>
    );
  }
}
