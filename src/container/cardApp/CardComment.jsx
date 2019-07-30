import React from "react";
import PropTypes from "prop-types";
import Comment from "../../components/Comment"

import firebase from "firebase/app";

export default class CardComment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.id,
      comment: {}
    };

    this.fetchCardComment();
  }

  /**
   * コメントデータを取得する
   */

  fetchCardComment = () => {
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
      <Comment comment={this.state.comment}/>
    );
  }
}

CardComment.propsType = {
  id: PropTypes.string
};
