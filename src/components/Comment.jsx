import React from "react";
import PropTypes from "prop-types";
import { Col, Row } from "reactstrap";
import { Link } from "react-router-dom";

import DeleteModal from "./DeleteModal";

export default class Comment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show_delete_modal: false,
      comments: this.props.comments
    };

    this.delete_modal_toggle = this.delete_modal_toggle.bind(this);
  }

  /**
   * モーダル開閉のためのイベントハンドラ
   */

  delete_modal_toggle() {
    this.setState((prevState) => ({
      show_delete_modal: !prevState.show_delete_modal
    }));
  }

  render() {
    const { comment, user_data } = this.props;

    return (
      <React.Fragment>
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
              <span
                hidden={comment.creator_id !== user_data.uid}
                className="text-muted float-right"
                onClick={this.delete_modal_toggle}
              >
                <i className="material-icons btn p-0">clear</i>
              </span>
            </h5>
            <p className="mb-0">{comment.text}</p>
          </Col>
        </Row>
        <DeleteModal
          modal={this.state.show_delete_modal}
          modal_toggle={this.delete_modal_toggle}
          comment={comment}
          user_data={user_data}
        />
      </React.Fragment>
    );
  }
}

Comment.propsType = {
  comment: PropTypes.object.isRequired,
  user_data: PropTypes.object
};
