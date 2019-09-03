import React from "react"
import PropTypes from "prop-types"
import { Input, Col, Row, Spinner } from "reactstrap"

import CommentModal from "../../components/Modals/CommentModal"
import Comment from "../../components/Comment"

import { fetchTargetCommentData } from '../../function/comment'

export default class CenterContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      show_comment_modal: false,
      comments: [],
      isDataFetch: true
    };

    this.fetchTopicComment(this.props.focusTopic.id);

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
  fetchTopicComment = async (id = this.props.focusTopic.topic_id) => {
    const TopicCommentData = await fetchTargetCommentData("topic_id", id)
    this.setState({ comments: TopicCommentData })
    // データを取得した後spinnerを消す
    this.setState({ isDataFetch: false });
  }

  render() {
    const header_style = {
      backgroundColor: "#00075d"
    }

    const spinnerStyle = {
      height: '150px',
      width: '150px',
      marginLeft: '40%'
    }

    const { focusTopic, user_data } = this.props;

    const comment = this.state.comments.map((comment) => {
      return (
        <Comment
          key={comment.comment_id}
          comment={comment}
          user_data={user_data}
          fetchComment={this.fetchTopicComment}
        />
      )
    })

    return (
      <React.Fragment>
        <div className="bg-white border 2px shadow-sm">
          <h3 style={header_style} className="text-white py-2 pl-3 mb-0">
            Topic Page : {focusTopic.topic_name}
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
          {this.state.isDataFetch && <Spinner style={spinnerStyle} color='primary' />}
          {comment}
        </div>

        <CommentModal
          modal={this.state.show_comment_modal}
          modal_toggle={this.modal_toggle}
          user_data={user_data}
          focusTopic={focusTopic}
          pushCommentId={this.props.pushCommentId}
          fetchComment={this.fetchTopicComment}
        />
      </React.Fragment>
    );
  }
}

CenterContainer.propTypes = {
  user_data: PropTypes.object,
  focusTopic: PropTypes.object
};
