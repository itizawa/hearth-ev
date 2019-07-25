import React from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Col,
  Row
} from "reactstrap";

import firebase from "firebase/app";

// functionのインポート
import getNow from "../function/getNow";

export default class CommentModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comment_text: "",
      topic: this.props.topic || ""
    };
    this.onTextChange = this.onTextChange.bind(this);
    this.onPostComment = this.onPostComment.bind(this);
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
   * コメント投稿のイベントハンドラ
   */

  onPostComment() {
    const db = firebase.firestore();
    var addComment = db
      .collection("Comments")
      .add({
        creator: this.props.user_data.displayName,
        creator_id: this.props.user_data.uid,
        creator_img: this.props.user_data.photoURL,
        text: this.state.comment_text,
        like: {},
        create_at: getNow(),
        topic: this.state.topic
      })
      .then((ref) => {
        console.log("Added document with ID: ", ref.id);
        this.setState({ comment_text: "" });
      });
    this.props.modal_toggle();
    return Promise.all([addComment]);
  }

  render() {
    return (
      <Modal
        isOpen={this.props.modal}
        toggle={this.props.modal_toggle}
        className={this.props.className}
      >
        <ModalHeader toggle={this.props.modal_toggle}>コメントする</ModalHeader>

        <ModalBody>
          <Row>
            <Col xs="2" className="pr-0">
              <img
                className="ml-2 my-auto rounded-pill"
                src={this.props.user_data.photoURL}
                alt={this.props.user_data.photoURL}
                width="auto"
                height="80%"
              />
            </Col>
            <Col xs="10" className="pl-0">
              <Input
                onChange={this.onTextChange}
                type="textarea"
                name="text"
                id="exampleText"
              />
            </Col>
          </Row>
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            onClick={this.onPostComment}
            disabled={
              this.state.comment_text.length < 1 ||
              this.state.comment_text.length > 150
            }
          >
            Submit
          </Button>{" "}
        </ModalFooter>
      </Modal>
    );
  }
}
