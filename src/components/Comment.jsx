import React from 'react'
import PropTypes from 'prop-types'
import { Col, Row } from 'reactstrap'
import { Link } from 'react-router-dom'

import DeleteModal from './DeleteModal'
import ReEditModal from './ReEditModal'

// functionのインポート
import { addToLikeList, removeFromLikeList } from '../function/comment'

export default class Comment extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      show_delete_modal: false,
      comments: this.props.comments,
      isLiked: this.fetchIsLiked(),
      like_count: this.props.comment.like.length || 0,
      show_operation_button: false
    }

    this.reEdit_modal_toggle = this.reEdit_modal_toggle.bind(this)
    this.delete_modal_toggle = this.delete_modal_toggle.bind(this)
    this.fetchIsLiked = this.fetchIsLiked.bind(this)
    this.pushFavorite = this.pushFavorite.bind(this)
    this.cancelFavorite = this.cancelFavorite.bind(this)
  }

  /**
   * 再編集モーダル開閉のためのイベントハンドラ
   */
  reEdit_modal_toggle () {
    this.setState((prevState) => ({
      reEdit_delete_modal: !prevState.reEdit_delete_modal
    }))
  }

  /**
   * 削除モーダル開閉のためのイベントハンドラ
   */
  delete_modal_toggle () {
    this.setState((prevState) => ({
      show_delete_modal: !prevState.show_delete_modal
    }))
  }

  /**
   * Likeボタンを押しているかどうかの確認
   */
  fetchIsLiked () {
    return this.props.comment.like.includes(this.props.user_data.uid)
  }

  /**
   * いいねボタンを押したときのイベントハンドラ
   */
  pushFavorite() => {
    this.setState({ isLiked: true })
    this.setState({ like_count: this.state.like_count + 1 })
    await addToLikeList(
      this.props.comment.comment_id,
      this.props.user_data.uid,
      this.props.comment.creator_id
    )
  }

  /**
   * マウスオーバーした時のイベントハンドラ
   */
  onMouseOver () {
    this.setState({ show_operation_button: true })
  }

  onMouseLeave () {
    this.setState({ show_operation_button: false })
  }

  /**
   * いいねボタンを取り消したときのイベントハンドラ
   */
  async cancelFavorite () {
    this.setState({ isLiked: false })
    this.setState({ like_count: this.state.like_count - 1 })
    await removeFromLikeList(
      this.props.comment.comment_id,
      this.props.user_data.uid,
      this.props.comment.creator_id
    )
  }

  render () {
    const { comment, user_data } = this.props

    return (
      <>
        <Row
          className='mx-0 py-2 px-2 border-top'
          onMouseOver={() => {
            this.onMouseOver()
          }}
          onMouseLeave={() => {
            this.onMouseLeave()
          }}
        >
          <Col xs='1' className='px-0'>
            <Link to={'/user/' + comment.creator_id + '/timestamp'}>
              <img
                className='rounded-pill border'
                src={comment.creator_img}
                alt='data'
                width='80%'
                height='auto'
              />
            </Link>
          </Col>
          <Col xs='11' className='px-0'>
            <h5 className='mb-0'>
              <Link to={'/user/' + comment.creator_id + '/timestamp'}>
                <strong className='text-body'>{comment.creator}</strong>
              </Link>
              <small className='text-muted ml-1'>{comment.create_at}</small>
              <span
                hidden={comment.creator_id !== user_data.uid}
                className='text-muted float-right'
                onClick={this.delete_modal_toggle}
              >
                <i
                  hidden={!this.state.show_operation_button}
                  className='material-icons btn p-0'
                >
                  clear
                </i>
              </span>
              <span
                hidden={comment.creator_id !== user_data.uid}
                className='text-muted float-right'
                onClick={this.reEdit_modal_toggle}
              >
                <i
                  hidden={!this.state.show_operation_button}
                  className='material-icons btn p-0 mr-2'
                >
                  edit
                </i>
              </span>
            </h5>
            {comment.card_id && (
              <Link to={'/card/' + comment.card_id} className='text-info mr-2'>
                <span>
                  <i className='material-icons'>label</i>
                  {comment.card_name}
                </span>
              </Link>
            )}
            {comment.topic_name && (
              <Link to={'/topic/' + comment.topic_id} className='text-info'>
                <span>
                  <i className='material-icons'>question_answer</i>
                  {comment.topic_name}
                </span>
              </Link>
            )}

            <p className='mt-1 text-justify mb-0 pr-3'>{comment.text}</p>
          </Col>
          {this.state.isLiked ? (
            <Col xs='12' className='p-0'>
              <div
                className='btn text-muted float-right'
                onClick={this.cancelFavorite}
              >
                <span>{this.state.like_count}</span>
                <i className='material-icons p-0'>star</i>
              </div>
            </Col>
          ) : (
            <Col xs='12' className='p-0'>
              <div
                className='btn text-muted float-right'
                onClick={this.pushFavorite}
              >
                <span>{this.state.like_count}</span>
                <i className='material-icons p-0'>star_border</i>
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
      </>
    )
  }
}

Comment.propTypes = {
  comment: PropTypes.object,
  user_data: PropTypes.object,
  fetchComment: PropTypes.func
}
