import React from "react";
import { Col, Row } from "reactstrap";

export default class Comment extends React.Component {
  render() {
    return (
      <Row className="mx-0 py-2 px-2 border-top">
        <Col xs="1" className="px-0">
          <img
            className="rounded-pill border"
            src={this.props.user_data.photoURL}
            alt={this.props.user_data.photoURL}
            width="80%"
            height="auto"
          />
        </Col>
        <Col xs="11" className="px-0">
          <strong>{this.props.user_data.displayName}</strong>
          <p className="mb-0">これはテストコメントです！これはテストコメントです！これはテストコメントです！これはテストコメントです！これはテストコメントです！これはテストコメントです！これはテストコメントです！</p>
        </Col>
      </Row>
    );
  }
}
