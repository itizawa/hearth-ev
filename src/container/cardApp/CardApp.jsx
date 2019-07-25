import React from "react";
import { Row, Col } from "reactstrap";
import ViewContainer from "./ViewContainer";
import CenterContainer from "./CenterContainer";

import firebase from "firebase/app";

export default class CardApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      focus_card: {
        name: this.props.match.params.card_name
      }
    };
    this.fetchCardData();
  }

  /**
   * カードデータを取得する
   */

  fetchCardData = () => {
    firebase
      .firestore()
      .collection("Cards")
      .doc(this.state.focus_card.name)
      .get()
      .then((doc) => {
        if (!doc.exists) {
          console.log("No such document!");
        } else {
          this.setState({
            focus_card: doc.data()
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
              user_data={this.props.user_data}
              focus_card={this.state.focus_card}
            />
          </Col>
          <Col md="5" className="px-0">
            <ViewContainer
              user_data={this.props.user_data}
              focus_card={this.state.focus_card}
            />
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}
