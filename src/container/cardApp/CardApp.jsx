import React from "react"
import { Row, Col } from "reactstrap"
import ViewContainer from "./ViewContainer"
import CenterContainer from "./CenterContainer"

import firebase from "firebase/app"

export default class CardApp extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      focusCard: {
        id: this.props.match.params.card_id,
        name: "CardPage",
        comments: []
      }
    }

    this.fetchCardData(this.state.focusCard.id)
  }

  /**
   * カードデータを取得する
   */

  fetchCardData = (id) => {
    firebase
      .firestore()
      .collection("Cards")
      .doc(id)
      .get()
      .then((doc) => {
        if (!doc.exists) {
          console.log("No such document!")
        } else {
          this.setState({
            focusCard: doc.data()
          })
        }
      })
      .catch((err) => {
        console.log("Error getting document", err)
      })
  }

  render() {
    return (
      <React.Fragment>
        <Row>
          <Col md="7" className="px-0 mb-2">
            <CenterContainer
              user_data={this.props.user_data}
              focusCard={this.state.focusCard}
            />
          </Col>
          <Col md="5" className="px-1">
            <ViewContainer
              user_data={this.props.user_data}
              focusCard={this.state.focusCard}
            />
          </Col>
        </Row>
      </React.Fragment>
    )
  }
}
