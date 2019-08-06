import React from "react";
import PropTypes from "prop-types";
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
      topic: this.props.topic || ""
    };
    this.switch_toggle = this.switch_toggle.bind(this);
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
    const db = firebase.firestore();
    var addComment = db
      .collection("Comments")
      .add({
        creator: this.props.user_data.displayName,
        creator_id: this.props.user_data.uid,
        creator_img: this.props.user_data.photoURL,
        text: this.state.comment_text,
        like: [],
        create_at: getNow(),
        topic: this.state.topic,
        card_id: this.props.card_id || "",
        card_name: this.props.card_name || "",
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      })
      .then((ref) => {
        console.log("Added document with ID: ", ref.id);
        // IDを保存する
        db.collection("Comments")
          .doc(ref.id)
          .set({comment_id:ref.id},{merge:true})
        db.collection("Users")
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
    this.props.modal_toggle();
    this.props.fetchComment();
    return Promise.all([addComment]);
  }

  render() {
    return (
      <Modal
        isOpen={this.props.modal}
        toggle={this.props.modal_toggle}
        className={this.props.className}
      >
        <ModalHeader toggle={this.props.modal_toggle}>
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
        <ModalFooter className="p-2">
          <div hidden={!this.props.card_name}>
            <TwitterShareButton
              title={this.state.comment_text + "#" + this.props.card_name}
              url="https://hearth-ev.com/"
            >
              <TwitterIcon size={32} round={true} />
            </TwitterShareButton>
          </div>
          {/* TODO react-shareの設定後 */}
          {/* <CustomInput
            onClick={this.switch_toggle}
            checked={this.state.tweet_permission}
            className="mr-3"
            type="switch"
            id="exampleCustomSwitch"
            name="customSwitch"
            label="Tweetする"
          /> */}
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

CommentModal.propTypes = {
  modal: PropTypes.bool.isRequired,
  modal_toggle: PropTypes.func.isRequired,
  fetchComment: PropTypes.func.isRequired,
  user_data: PropTypes.object.isRequired,
  card_id: PropTypes.string,
  card_name: PropTypes.string
};
