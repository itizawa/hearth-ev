import React from "react";
import PropTypes from "prop-types";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";

export default class DeleteModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tweet_permission: true
    };
    this.onPostComment = this.onPostComment.bind(this);
  }

  /**
   * Toggle Switch のためのイベントハンドラ
   */

  switch_toggle() {
    this.setState((prevState) => ({
      tweet_permission: !prevState.tweet_permission
    }));
  }

  /**
   * コメント投稿のイベントハンドラ
   */

  onPostComment() {
    console.log("delete!");
    this.props.modal_toggle();
  }

  render() {
    return (
      <Modal
        isOpen={this.props.modal}
        toggle={this.props.modal_toggle}
        className={this.props.className}
      >
        <ModalHeader toggle={this.props.modal_toggle}>削除する？</ModalHeader>

        <ModalBody>{this.props.comment.text}</ModalBody>
        <ModalFooter className="p-2">
          <Button color="warning" onClick={this.onPostComment}>
            Submit
          </Button>{" "}
        </ModalFooter>
      </Modal>
    );
  }
}

DeleteModal.propTypes = {
  comment:PropTypes.object,
};
