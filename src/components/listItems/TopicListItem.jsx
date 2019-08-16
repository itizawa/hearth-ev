import React from "react";
import { Row, Col } from "reactstrap";
import { Link } from "react-router-dom";

export default class TopicListItem extends React.Component {
  render() {
    const chat_style = {
      fontSize: "24px"
    };

    const { topic_data } = this.props;
    return (
      <Row className="mx-0 py-2 px-2 border-top">
        <Col xs="10" className="px-0">
          <h6 className="mb-0">
            <Link to={"/topic/" + topic_data.topic_id}>
              <strong className="text-body">{topic_data.topic_name}</strong>
              <span href="#" id={topic_data.topic_id}>
                <i className="material-icons ml-1" style={chat_style}>
                  chat
                </i>
                {topic_data.comments}
              </span>
              <span href="#" className="text-muted">
                <i className="material-icons ml-1" style={chat_style}>
                  schedule
                </i>
                {topic_data.update_at}
              </span>
            </Link>
          </h6>
        </Col>
      </Row>
    );
  }
}
