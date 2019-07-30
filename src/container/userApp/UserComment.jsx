import React from "react";
import PropTypes from "prop-types";
import Comment from "../../components/Comment";

import firebase from "firebase/app";

export default class UserComment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.id,
      comment: {}
    };

    this.fetchUserComment();
  }

  /**
   * コメントデータを取得する
   */

  fetchUserComment = () => {
    firebase
      .firestore()
      .collection("Comments")
      .doc(this.state.id)
      .get()
      .then((doc) => {
        if (!doc.exists) {
          console.log("No such document!");
        } else {
          this.setState({
            comment: doc.data()
          });
        }
      })
      .catch((err) => {
        console.log("Error getting document", err);
      });
  };

  render() {
    return (
      <Comment comment={this.state.comment} user_data={this.props.user_data} />
    );
  }
}

UserComment.propTypes = {
  id: PropTypes.string
};
