import React from "react";
import PropTypes from "prop-types";
import { Spinner } from "reactstrap"

import Comment from "../../components/Comment";

import { fetchTargetCommentData } from '../../function/comment'

export default class CenterContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show_comment_modal: false,
      comments: [],
      isDataFetch: true
    };

    this.fetchUserComment(this.props.focus_user.id);
  }

  /**
   * コメントデータを取得する
   */
  fetchUserComment = async (id = this.props.focus_user.uid) => {
    const UserCommentData = await fetchTargetCommentData("creator_id", id)
    this.setState({ comments: UserCommentData })
    // データを取得した後spinnerを消す
    this.setState({ isDataFetch: false })
  };

  render() {
    const header_style = {
      backgroundColor: "#00075d"
    };

    const spinnerStyle = {
      height: '150px',
      width: '150px',
      marginLeft: '40%'
    }

    const comment = this.state.comments.map((comment) => {
      return (
        <Comment
          key={comment.comment_id}
          comment={comment}
          user_data={this.props.user_data}
          fetchComment={this.fetchUserComment}
        />
      );
    });

    return (
      <React.Fragment>
        <div className="bg-white border 2px shadow-sm">
          <h3 style={header_style} className="text-white py-2 pl-3 mb-0">
            User Page : {this.props.focus_user.name}
          </h3>
          {this.state.isDataFetch && <Spinner style={spinnerStyle} color='primary' />}
          {comment}
        </div>
      </React.Fragment>
    );
  }
}

CenterContainer.propTypes = {
  user_data: PropTypes.object,
  focus_user: PropTypes.object
};
