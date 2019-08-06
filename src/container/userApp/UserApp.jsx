import React from "react";
import { Row, Col } from "reactstrap";
import ViewContainer from "./ViewContainer";
import CenterContainer from "./CenterContainer";

import firebase from "firebase/app";

export default class UserApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      focus_user: {
        id: this.props.match.params.user_id,
        name: "UserPage",
        comments: []
      }
    };

    this.fetchUserData();
  }

  /**
   * ユーザーデータを取得する
   */

  fetchUserData = () => {
    const db = firebase.firestore();
    db.collection("Users")
      .doc(this.state.focus_user.id)
      .get()
      .then((doc) => {
        if (!doc.exists) {
          console.log("No such document!");
        } else {
          this.setState({
            focus_user: doc.data()
          });
        }
      })
      .catch((err) => {
        console.log("Error getting document", err);
      });
  };

  render() {
    return (
      <React.Fragment>
        <Row>
          <Col md="7" className="px-0">
            <CenterContainer
              {...this.props}
              focus_user={this.state.focus_user}
              match={this.props.match.params.user_id}
            />
          </Col>
          <Col md="5" className="px-1">
            <ViewContainer
              user_data={this.props.user_data}
              focus_user={this.state.focus_user}
            />
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}
