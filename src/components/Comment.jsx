import React from "react";
import PropTypes from "prop-types";
import { Col, Row } from "reactstrap";
import { Link } from "react-router-dom";

export default class Comment extends React.Component {
  render() {
    const { comment } = this.props;

    return (
      <Row className="mx-0 py-2 px-2 border-top">
        <Col xs="1" className="px-0">
          <Link to={"/user/" + comment.creator_id}>
            <img
              className="rounded-pill border"
              src={comment.creator_img}
              alt={comment.creator_img}
              width="80%"
              height="auto"
            />
          </Link>
        </Col>
        <Col xs="11" className="px-0">
          <h5>
            <Link to={"/user/" + comment.creator_id}>
              <strong className="text-body">{comment.creator}</strong>
            </Link>
            <small className="text-muted ml-1">{comment.create_at}</small>
          </h5>
          <p className="mb-0">{comment.text}</p>
        </Col>
      </Row>
    );
  }
}

Comment.propsType = {
  comment: PropTypes.object.isRequired,
  user_data: PropTypes.object
};
