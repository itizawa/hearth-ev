import React from "react";
import { Input, Col, Row } from "reactstrap";
import CommentModal from "../../components/CommentModal";
import Comment from "../../components/Comment";

import firebase from "firebase/app";

export default class PostContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show_comment_modal: false,
      comments: []
    };
    this.onReadHandler();

    this.modal_toggle = this.modal_toggle.bind(this);
  }

  /**
   * モーダル開閉のためのイベントハンドラ
   */

  modal_toggle() {
    this.setState((prevState) => ({
      show_comment_modal: !prevState.show_comment_modal
    }));
    this.onReadHandler();
  }

  /**
   * データを取得するイベントハンドラ
   */

  onReadHandler = function() {
    var comments = [];
    const db = firebase.firestore();
    db.collection("Comments")
      .orderBy("create_at", "desc")
      .limit(50)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          comments.push(doc.data());
        });
        this.setState({ comments: comments });
      })
      .catch((err) => {
        console.log("Error getting documents", err);
      });
    return Promise.all([db]);
  };

  render() {
    const header_style = {
      backgroundColor: "#00075d"
    };

    return (
      <React.Fragment>
        <div className="border 2px">
          <h3 style={header_style} className="text-white py-2 pl-3 mb-0">
            ホーム
          </h3>
          <Row className="py-2 mx-0">
            <Col xs="1" className="px-1">
              <img
                className="rounded-pill"
                src={this.props.user_data.photoURL}
                alt={this.props.user_data.photoURL}
                width="80%"
                height="auto"
              />
            </Col>
            <Col xs="11 pl-0">
              <Input onClick={this.modal_toggle} placeholder="コメントする" />
            </Col>
          </Row>
          {this.state.comments.map((comment, index) => {
            return <Comment key={index} comment={comment} />;
          })}
        </div>

        <CommentModal
          modal={this.state.show_comment_modal}
          modal_toggle={this.modal_toggle}
          user_data={this.props.user_data}
        />
      </React.Fragment>
    );
  }
}
