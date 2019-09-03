import React from "react";
import PropTypes from "prop-types";
import { Input, Col, Row } from "reactstrap";

import CommentModal from "../../components/Modals/CommentModal";
import Comment from "../../components/Comment";

import firebase from "firebase/app";

export default class CenterContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show_comment_modal: false,
      comments: []
    };

    this.fetchCardComment(this.props.focusCard.id);

    this.modal_toggle = this.modal_toggle.bind(this);
  }

  /**
   * モーダル開閉のためのイベントハンドラ
   */

  modal_toggle() {
    this.setState((prevState) => ({
      show_comment_modal: !prevState.show_comment_modal
    }));
  }

  /**
   * コメントデータを取得する
   */
  fetchCardComment = (target = this.props.focusCard.card_id) => {
    var comments = [];
    const db = firebase.firestore();
    db.collection("Comments")
      .where("card_id", "==", target)
      .orderBy("timestamp", "desc")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          comments.push(doc.data());
        });
        this.setState({ comments: comments });
      })
      .catch(function(error) {
        console.log("Error getting documents: ", error);
      });
    return Promise.all([db]);
  };

  render() {
    const header_style = {
      backgroundColor: "#00075d"
    };

    const { focusCard, user_data } = this.props;

    const comment = this.state.comments.map((comment) => {
      return (
        <Comment
          key={comment.comment_id}
          comment={comment}
          user_data={user_data}
          fetchComment={this.fetchCardComment}
        />
      );
    });

    return (
      <React.Fragment>
        <div className="bg-white border 2px shadow-sm">
          <h3 style={header_style} className="text-white py-2 pl-3 mb-0">
            Card Page : {focusCard.card_name}
          </h3>
          <Row className="py-2 mx-0">
            <Col xs="1" className="px-1">
              <img
                className="rounded-pill"
                src={user_data.photoURL}
                alt={user_data.photoURL}
                width="80%"
                height="auto"
              />
            </Col>
            <Col xs="11 pl-0">
              <Input onClick={this.modal_toggle} placeholder="コメントする" />
            </Col>
          </Row>
          {comment}
        </div>

        <CommentModal
          modal={this.state.show_comment_modal}
          modal_toggle={this.modal_toggle}
          user_data={user_data}
          focusCard={focusCard}
          pushCommentId={this.props.pushCommentId}
          fetchComment={this.fetchCardComment}
        />
      </React.Fragment>
    );
  }
}

CenterContainer.propTypes = {
  user_data: PropTypes.object,
  focus_card: PropTypes.object
};
