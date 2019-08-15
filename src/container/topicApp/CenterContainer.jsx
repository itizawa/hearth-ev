import React from "react";
import PropTypes from "prop-types";
import { Input, Col, Row } from "reactstrap";

import CommentModal from "../../components/CommentModal";
import Comment from "../../components/Comment";

import firebase from "firebase/app";

export default class CenterContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show_comment_modal: false,
      comments: []
    };

    this.fetchTopicComment(this.props.focus_topic.id);

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
  fetchTopicComment = (target = this.props.focus_topic.topic_id) => {
    var comments = [];
    const db = firebase.firestore();
    db.collection("Comments")
      .where("topic_id", "==", target)
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

    const { focus_topic, user_data } = this.props;

    const comment = this.state.comments.map((comment) => {
      return (
        <Comment
          key={comment.comment_id}
          comment={comment}
          user_data={user_data}
          fetchComment={this.fetchTopicComment}
        />
      );
    });

    return (
      <React.Fragment>
        <div className="bg-white border 2px shadow-sm">
          <h3 style={header_style} className="text-white py-2 pl-3 mb-0">
            Topic Page : {focus_topic.topic_name}
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
          topic_name={focus_topic.topic_name}
          topic_id={focus_topic.topic_id}
          card_name={focus_topic.card_name}
          pushCommentId={this.props.pushCommentId}
          fetchComment={this.fetchTopicComment}
        />
      </React.Fragment>
    );
  }
}

CenterContainer.propTypes = {
  user_data: PropTypes.object,
  focus_topic: PropTypes.object
};
