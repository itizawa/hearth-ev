import React from "react";
import { Row, Col } from "reactstrap";
import CenterContainer from "./CenterContainer";
import ViewContainer from "./ViewContainer";

import firebase from "firebase/app";

export default class TopicApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      focusTopic: {
        id: this.props.match.params.id,
        name: "",
        comments: []
      }
    };

    this.fetchTopicData();
  }

  /**
   * トピックデータを取得する
   */
  fetchTopicData = async () => {
    await firebase
      .firestore()
      .collection("Topics")
      .doc(this.state.focusTopic.id)
      .get()
      .then((doc) => {
        if (!doc.exists) {
          console.log("No such document!");
        } else {
          this.setState({
            focusTopic: doc.data()
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
          <Col md="7" className="px-0 mb-2">
            <CenterContainer
              {...this.props}
              focusTopic={this.state.focusTopic}
              match={this.props.match.params.id}
            />
          </Col>
          <Col md="5" className="px-1">
            <ViewContainer />
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}
