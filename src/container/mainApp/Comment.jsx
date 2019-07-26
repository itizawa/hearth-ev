import React from "react";
import { Col, Row } from "reactstrap";
import { Link } from "react-router-dom";

export default class MainComment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: this.props.comments
    };
  }
  render() {
    return (
      <Row className="mx-0 py-2 px-2 border-top">
        <Col xs="1" className="px-0">
          <Link to={"/user/" + this.props.comment.creator_id}>
            <img
              className="rounded-pill border"
              src={this.props.comment.creator_img}
              alt={this.props.comment.creator_img}
              width="80%"
              height="auto"
            />
          </Link>
        </Col>
        <Col xs="11" className="px-0">
          <h5>
            <Link to={"/user/" + this.props.comment.creator_id}>
              <strong className="text-body">{this.props.comment.creator}</strong>
            </Link>
            <small className="text-muted ml-1">
              {this.props.comment.create_at}
            </small>
          </h5>
          <p className="mb-0">{this.props.comment.text}</p>
        </Col>
      </Row>
    );
  }
}
