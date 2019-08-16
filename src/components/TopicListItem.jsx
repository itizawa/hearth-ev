import React from "react";
import { Row, Col, Tooltip } from "reactstrap";
import { Link } from "react-router-dom";

export default class TopicListItem extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      tooltipOpen: false
    };
  }
  /**
   * ツールチップのイベントハンドラ
   */
  toggle() {
    this.setState({
      tooltipOpen: !this.state.tooltipOpen
    });
  }

  render() {
    const chat_style = {
      fontSize: "24px"
    };

    const { topic_data } = this.props;
    return (
      <Row className="mx-0 py-2 px-2 border-top">
        <Col xs="10" className="px-0">
          <h5 className="mb-0">
            <Link to={"/topic/" + topic_data.topic_id}>
              <strong className="text-body">{topic_data.topic_name}</strong>
              <span href="#" id={topic_data.topic_id}>
                <i className="material-icons ml-1" style={chat_style}>
                  chat
                </i>
                {topic_data.comments}
              </span>
              <small href="#" className="text-muted">
                <i className="material-icons ml-1" style={chat_style}>
                  schedule
                </i>
                {topic_data.update_at}
              </small>
            </Link>
            <p className="my-1">
              <Tooltip
                placement="bottom"
                isOpen={this.state.tooltipOpen}
                autohide={false}
                target={topic_data.topic_id}
                toggle={this.toggle}
              >
                コメント総数
              </Tooltip>
            </p>
          </h5>
        </Col>
      </Row>
    );
  }
}
