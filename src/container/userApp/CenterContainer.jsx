import React from "react";
import PropTypes from "prop-types";
import CommentModal from "../../components/CommentModal";

import Comment from "../../components/Comment";

import orderByDate from "../../function/processData";

import firebase from "firebase/app";

export default class CenterContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show_comment_modal: false,
      comments: []
    };

    this.fetchUserComment();

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

  fetchUserComment = () => {
    var comments = [];
    const db = firebase.firestore();
    db.collection("Comments")
      .where("creator_id", "==", this.props.focus_user.id)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          comments.push(doc.data());
        });
        comments.sort(orderByDate);
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

    return (
      <React.Fragment>
        <div className="border 2px">
          <h3 style={header_style} className="text-white py-2 pl-3 mb-0">
            {this.props.focus_user.name}
          </h3>
          {this.state.comments.map((comment, index) => {
            return (
              <Comment
                key={index}
                comment={comment}
                user_data={this.props.user_data}
              />
            );
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

CenterContainer.propTypes = {
  user_data: PropTypes.object,
  focus_user: PropTypes.object
};
