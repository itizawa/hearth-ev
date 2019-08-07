import React from "react";
import PropTypes from "prop-types";
import {
  Button,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Row,
  Col
} from "reactstrap";

import firebase from "firebase/app";

export default class ReEditModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comment_text: this.props.comment.text
    };
    this.reEditComment = this.reEditComment.bind(this);
    this.onTextChange = this.onTextChange.bind(this);
  }

  /**
   * コメント取得ためのイベントハンドラ
   */

  onTextChange(e) {
    this.setState({
      comment_text: e.target.value
    });
  }

  /**
   * コメント再編集のイベントハンドラ
   */

  reEditComment() {
    // TODO 再編集のイベントの作成
    this.props.modal_toggle();
  }

  render() {
    const { comment } = this.props;

    return (
      <Modal
        isOpen={this.props.modal}
        toggle={this.props.modal_toggle}
        className={this.props.className}
      >
        <ModalHeader toggle={this.props.modal_toggle}>
          コメントを編集する
        </ModalHeader>
        <ModalBody>
          <Row className="mx-0 py-2 px-2">
            <Col xs="1" className="px-0">
              <img
                className="rounded-pill border"
                src={comment.creator_img}
                alt={comment.creator_img}
                width="80%"
                height="auto"
              />
            </Col>
            <Col xs="11" className="px-0">
              <h5 className="mb-0">
                <strong className="text-body">{comment.creator}</strong>
                <small className="text-muted ml-1">{comment.create_at}</small>
              </h5>
            </Col>
            <Input
              className="mt-2"
              value={this.state.comment_text}
              type="textarea"
              onChange={this.onTextChange}
            />
          </Row>
        </ModalBody>
        <ModalFooter className="p-2">
          <Button
            color="info"
            onClick={this.reEditComment}
            disabled={
              this.state.comment_text.length < 1 ||
              this.state.comment_text.length > 150
            }
          >
            更新
          </Button>
          <Button color="secondary" onClick={this.props.modal_toggle}>
            キャンセル
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

ReEditModal.propTypes = {
  comment: PropTypes.object,
  user_data: PropTypes.object,
  fetchComment: PropTypes.func.isRequired
};
