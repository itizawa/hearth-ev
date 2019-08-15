import React from "react";
import { Row, Col } from "reactstrap";
import CenterContainer from "./CenterContainer";

import firebase from "firebase/app";

export default class TopicApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      focus_topic: {
        id: this.props.match.params.topic_id,
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
      .doc(this.state.focus_topic.id)
      .get()
      .then((doc) => {
        if (!doc.exists) {
          console.log("No such document!");
        } else {
          this.setState({
            focus_topic: doc.data()
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
              focus_topic={this.state.focus_topic}
              match={this.props.match.params.topic_id}
            />
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}