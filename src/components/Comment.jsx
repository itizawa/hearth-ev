import React from "react";
import PropTypes from "prop-types";
import { Col, Row } from "reactstrap";
import { Link } from "react-router-dom";

import DeleteModal from "./DeleteModal";
import ReEditModal from "./ReEditModal";

import firebase from "firebase/app";

export default class Comment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show_delete_modal: false,
      comments: this.props.comments,
      isLiked: this.fetchIsLiked(),
      like_count: this.props.comment.like.length,
      show_operation_button: false
    };

    this.reEdit_modal_toggle = this.reEdit_modal_toggle.bind(this);
    this.delete_modal_toggle = this.delete_modal_toggle.bind(this);
    this.fetchIsLiked = this.fetchIsLiked.bind(this);
    this.pushFavorite = this.pushFavorite.bind(this);
    this.cancelFavorite = this.cancelFavorite.bind(this);
  }

  /**
   * 再編集モーダル開閉のためのイベントハンドラ
   */
  reEdit_modal_toggle() {
    this.setState((prevState) => ({
      reEdit_delete_modal: !prevState.reEdit_delete_modal
    }));
  }

  /**
   * 削除モーダル開閉のためのイベントハンドラ
   */
  delete_modal_toggle() {
    this.setState((prevState) => ({
      show_delete_modal: !prevState.show_delete_modal
    }));
  }

  /**
   * Likeボタンを押しているかどうかの確認
   */
  fetchIsLiked() {
    return this.props.comment.like.includes(this.props.user_data.uid);
  }

  /**
   * いいねボタンを押したときのイベントハンドラ
   */
  async pushFavorite() {
    this.setState({ isLiked: true });
    this.setState({ like_count: this.state.like_count + 1 });
    await firebase
      .firestore()
      .collection("Comments")
      .doc(this.props.comment.comment_id)
      .update({
        like: firebase.firestore.FieldValue.arrayUnion(this.props.user_data.uid)
      });
    await firebase
      .firestore()
      .collection("Users")
      .doc(this.props.comment.creator_id)
      .update("acquired", firebase.firestore.FieldValue.increment(1));
  }

  /**
   * マウスオーバーした時のイベントハンドラ
   */
  onMouseOver() {
    this.setState({ show_operation_button: true });
  }

  onMouseLeave() {
    this.setState({ show_operation_button: false });
  }

  /**
   * いいねボタンを取り消したときのイベントハンドラ
   */
  async cancelFavorite() {
    this.setState({ isLiked: false });
    this.setState({ like_count: this.state.like_count - 1 });
    await firebase
      .firestore()
      .collection("Comments")
      .doc(this.props.comment.comment_id)
      .update({
        like: firebase.firestore.FieldValue.arrayRemove(
          this.props.user_data.uid
        )
      });
    await firebase
      .firestore()
      .collection("Users")
      .doc(this.props.comment.creator_id)
      .update("acquired", firebase.firestore.FieldValue.increment(-1));
  }

  render() {
    const { comment, user_data } = this.props;

    return (
      <React.Fragment>
        <Row
          className="mx-0 py-2 px-2 border-top"
          onMouseOver={() => {
            this.onMouseOver();
          }}
          onMouseLeave={() => {
            this.onMouseLeave();
          }}
        >
          <Col xs="1" className="px-0">
            <Link to={"/user/" + comment.creator_id + "/timestamp"}>
              <img
                className="rounded-pill border"
                src={comment.creator_img}
                alt={"data"}
                width="80%"
                height="auto"
              />
            </Link>
          </Col>
          <Col xs="11" className="px-0">
            <h5 className="mb-0">
              <Link to={"/user/" + comment.creator_id + "/timestamp"}>
                <strong className="text-body">{comment.creator}</strong>
              </Link>
              <small className="text-muted ml-1">{comment.create_at}</small>
              <span
                hidden={comment.creator_id !== user_data.uid}
                className="text-muted float-right"
                onClick={this.delete_modal_toggle}
              >
                <i
                  hidden={!this.state.show_operation_button}
                  className="material-icons btn p-0"
                >
                  clear
                </i>
              </span>
              <span
                hidden={comment.creator_id !== user_data.uid}
                className="text-muted float-right"
                onClick={this.reEdit_modal_toggle}
              >
                <i
                  hidden={!this.state.show_operation_button}
                  className="material-icons btn p-0 mr-2"
                >
                  edit
                </i>
              </span>
            </h5>
            {comment.card_id && (
              <Link to={"/card/" + comment.card_id}>
                <span>
                  <i className="material-icons">label</i>
                  {comment.card_name}
                </span>
              </Link>
            )}

            <p className="mb-0">{comment.text}</p>
          </Col>
          {this.state.isLiked ? (
            <Col xs="12" className="p-0">
              <div
                className="btn text-muted float-right"
                onClick={this.cancelFavorite}
              >
                <span>{this.state.like_count}</span>
                <i className="material-icons p-0">star</i>
              </div>
            </Col>
          ) : (
            <Col xs="12" className="p-0">
              <div
                className="btn text-muted float-right"
                onClick={this.pushFavorite}
              >
                <span>{this.state.like_count}</span>
                <i className="material-icons p-0">star_border</i>
              </div>
            </Col>
          )}
        </Row>
        <DeleteModal
          modal={this.state.show_delete_modal}
          modal_toggle={this.delete_modal_toggle}
          comment={comment}
          user_data={user_data}
          fetchComment={this.props.fetchComment}
        />
        <ReEditModal
          modal={this.state.reEdit_delete_modal}
          modal_toggle={this.reEdit_modal_toggle}
          comment={comment}
          user_data={user_data}
          fetchComment={this.props.fetchComment}
        />
      </React.Fragment>
    );
  }
}

Comment.propTypes = {
  comment: PropTypes.object,
  user_data: PropTypes.object,
  fetchComment: PropTypes.func
};
