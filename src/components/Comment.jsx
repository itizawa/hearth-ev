import React from "react";
import { Col, Row } from "reactstrap";

export default class Comment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: this.props.comments
    };
  }
  componentDidMount() {}
  render() {
    return (
      <Row className="mx-0 py-2 px-2 border-top">
        <Col xs="1" className="px-0">
          <img
            className="rounded-pill border"
            src={this.props.comment.creator_img}
            alt={this.props.comment.creator_img}
            width="80%"
            height="auto"
          />
        </Col>
        <Col xs="11" className="px-0">
          <strong>{this.props.comment.creator}</strong>
          <p className="mb-0">
            {this.props.comment.text}
          </p>
        </Col>
        {/* <div>{this.props.comments[0].text}</div> */}

        {/* {this.props.comments.map((text, index) => {
          return <li key={index}> {text.text} </li>;
        })} */}
      </Row>
    );
  }
}
