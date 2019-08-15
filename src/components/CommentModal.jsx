import React from "react";
import PropTypes from "prop-types";
import {
  Button,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  InputGroup,
  UncontrolledDropdown,
  Col,
  Row
} from "reactstrap";
import { TwitterShareButton, TwitterIcon } from "react-share";

import firebase from "firebase/app";

// functionのインポート
import getNow from "../function/getNow";

export default class CommentModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tweet_permission: true,
      comment_text: "",
      topic_name: this.props.topic_name || "",
      topic_id: this.props.topic_id || ""
    };
    this.onTextChange = this.onTextChange.bind(this);
    this.switchTopic = this.switchTopic.bind(this);
    this.modal_toggle = this.modal_toggle.bind(this);
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
   * Topicの切り替えのためのイベントハンドラ
   */
  switchTopic(e) {
    this.setState({ topic_name: e.target.textContent.trim() });
    this.setState({ topic_id: e.target.id.trim() });
  }

  /**
   * Modal開閉のためのイベントハンドラ
   */
  modal_toggle() {
    this.props.modal_toggle();
    this.setState({ topic_name: "" });
    this.setState({ topic_id: "" });
  }

  /**
   * コメント投稿のイベントハンドラ
   */
  async onPostComment() {
    const db = firebase.firestore();
    await db
      .collection("Comments")
      .add({
        creator: this.props.user_data.displayName,
        creator_id: this.props.user_data.uid,
        creator_img: this.props.user_data.photoURL,
        text: this.state.comment_text,
        like: [],
        create_at: getNow(),
        topic_name: this.state.topic_name,
        topic_id: this.state.topic_id,
        card_id: this.props.card_id || "",
        card_name: this.props.card_name || "",
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      })
      .then(async (ref) => {
        console.log("Added document with ID: ", ref.id);
        // IDを保存する
        await db
          .collection("Comments")
          .doc(ref.id)
          .set({ comment_id: ref.id }, { merge: true });
        await db
          .collection("Users")
          .doc(this.props.user_data.uid)
          .update({
            comments: firebase.firestore.FieldValue.arrayUnion(ref.id)
          });
        // カードについてのコメントはカード以下にcomment_idを保存
        if (this.props.card_id) {
          db.collection("Cards")
            .doc(this.props.card_id)
            .update({
              comments: firebase.firestore.FieldValue.arrayUnion(ref.id)
            });
        }
      });
    await this.props.modal_toggle();
    await this.props.fetchComment();
  }

  render() {
    return (
      <Modal
        isOpen={this.props.modal}
        toggle={this.modal_toggle}
        className={this.props.className}
      >
        <ModalHeader toggle={this.modal_toggle}>
          コメントする
          <span hidden={!this.props.card_name} className="text-primary ml-3">
            #{this.props.card_name}
          </span>
        </ModalHeader>

        <ModalBody>
          <Row>
            <Col xs="2" className="pr-0">
              <img
                className="ml-2 my-auto rounded-pill"
                src={this.props.user_data.photoURL}
                alt={this.props.user_data.photoURL}
                width="80%"
                height="auto"
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
        <ModalFooter className="p-2">
          <InputGroup>
            <UncontrolledDropdown>
              <DropdownToggle caret />
              <DropdownMenu>
                <DropdownItem
                  id="yxjFQW0FsqNHcRLjJTHx"
                  onClick={this.switchTopic}
                >
                  事前評価
                </DropdownItem>
                <DropdownItem onClick={this.switchTopic}>事後評価</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
            <Input
              readOnly
              value={this.state.topic_name}
              placeholder="話題登録"
            />
          </InputGroup>
          <div hidden={!this.props.card_name}>
            <TwitterShareButton
              title={this.state.comment_text + "#" + this.props.card_name}
              url="https://hearth-ev.com/"
            >
              <TwitterIcon size={32} round={true} />
            </TwitterShareButton>
          </div>
          <Button
            color="primary"
            onClick={this.onPostComment}
            disabled={
              this.state.comment_text.length < 1 ||
              this.state.comment_text.length > 150
            }
          >
            Submit
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

CommentModal.propTypes = {
  modal: PropTypes.bool.isRequired,
  modal_toggle: PropTypes.func.isRequired,
  fetchComment: PropTypes.func.isRequired,
  user_data: PropTypes.object.isRequired,
  card_id: PropTypes.string,
  card_name: PropTypes.string
};
