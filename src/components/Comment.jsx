import React from "react";
import PropTypes from "prop-types";
import { Col, Row } from "reactstrap";
import { Link } from "react-router-dom";

export default function Comment(props) {
  return (
    <Row className="mx-0 py-2 px-2 border-top">
      <Col xs="1" className="px-0">
        <Link to={"/user/" + props.comment.creator_id}>
          <img
            className="rounded-pill border"
            src={props.comment.creator_img}
            alt={props.comment.creator_img}
            width="80%"
            height="auto"
          />
        </Link>
      </Col>
      <Col xs="11" className="px-0">
        <h5>
          <Link to={"/user/" + props.comment.creator_id}>
            <strong className="text-body">{props.comment.creator}</strong>
          </Link>
          <small className="text-muted ml-1">{props.comment.create_at}</small>
        </h5>
        <p className="mb-0">{props.comment.text}</p>
      </Col>
    </Row>
  );
}

Comment.propsType = {
  comment: PropTypes.object.isRequired
};
