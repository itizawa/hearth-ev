import React from "react";
import { Col, Row } from "reactstrap";
import { Link } from "react-router-dom";

import firebase from "firebase/app";

export default class UserComment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.id,
      comment: {}
    };

    this.fetchUserComment();
  }

  /**
   * コメントデータを取得する
   */

  fetchUserComment = () => {
    firebase
      .firestore()
      .collection("Comments")
      .doc(this.state.id)
      .get()
      .then((doc) => {
        if (!doc.exists) {
          console.log("No such document!");
        } else {
          this.setState({
            comment: doc.data()
          });
        }
      })
      .catch((err) => {
        console.log("Error getting document", err);
      });
  };

  render() {
    return (
      <Row className="mx-0 py-2 px-2 border-top">
        <Col xs="1" className="px-0">
          <Link to={"/user/" + this.state.comment.creator_id}>
            <img
              className="rounded-pill border"
              src={this.state.comment.creator_img}
              alt={this.state.comment.creator_img}
              width="80%"
              height="auto"
            />
          </Link>
        </Col>
        <Col xs="11" className="px-0">
          <h5 className="mb-0">
            <Link to={"/user/" + this.state.comment.creator_id}>
              <strong className="text-body">
                {this.state.comment.creator}
              </strong>
            </Link>
            <small className="text-muted ml-1">
              {this.state.comment.create_at}
            </small>
          </h5>
          {this.state.comment.card_id && (
            <Link to={"/card/" + this.state.comment.card_id}>
              <span className="" href="#" id="TooltipExample">
                #{this.state.comment.card_name}
              </span>
            </Link>
          )}

          <p className="mb-0">{this.state.comment.text}</p>
        </Col>
      </Row>
    );
  }
}
