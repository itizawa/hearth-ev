import React from 'react'
import PropTypes from 'prop-types'
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Row,
  Col,
  Card
} from 'reactstrap'

import firebase from 'firebase/app'

export default class DeleteModal extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      tweet_permission: true
    }
    this.onDeleteComment = this.onDeleteComment.bind(this)
  }

  /**
   * Toggle Switch のためのイベントハンドラ
   */

  switch_toggle () {
    this.setState((prevState) => ({
      tweet_permission: !prevState.tweet_permission
    }))
  }

  /**
   * コメント削除のイベントハンドラ
   */

  async onDeleteComment () {
    if (this.props.comment.creator_id === this.props.user_data.uid) {
      await firebase
        .firestore()
        .collection('Comments')
        .doc(this.props.comment.comment_id)
        .delete()
        .then(() => {
          console.log('Document successfully deleted!')
          this.props.modal_toggle()
        })
        .catch(function (error) {
          console.error('Error removing document: ', error)
        })
      await firebase
        .firestore()
        .collection('Users')
        .doc(this.props.user_data.uid)
        .update('comments', firebase.firestore.FieldValue.increment(-1))

      // カードについてのコメントはカード以下にcommentのカウントを-1
      if (this.props.comment.card_id) {
        await firebase
          .firestore()
          .collection('Cards')
          .doc(this.props.comment.card_id)
          .update('comments', firebase.firestore.FieldValue.increment(-1))
      }
      // トピックについてのコメントはカード以下にcommentのカウントを-1
      if (this.props.comment.topic_id) {
        await firebase
          .firestore()
          .collection('Topics')
          .doc(this.props.comment.topic_id)
          .update('comments', firebase.firestore.FieldValue.increment(-1))
      }
    } else {
      this.props.modal_toggle()
    }
    this.props.fetchComment()
  }

  render () {
    const { comment } = this.props

    return (
      <Modal
        isOpen={this.props.modal}
        toggle={this.props.modal_toggle}
        className={this.props.className}
      >
        <ModalHeader toggle={this.props.modal_toggle}>
          このコメントを削除しますか？
        </ModalHeader>
        <ModalBody>
          <Card>
            <Row className='mx-0 py-2 px-2'>
              <Col xs='1' className='px-0'>
                <img
                  className='rounded-pill border'
                  src={comment.creator_img}
                  alt={comment.creator_img}
                  width='80%'
                  height='auto'
                />
              </Col>
              <Col xs='11' className='px-0'>
                <h5 className='mb-0'>
                  <strong className='text-body'>{comment.creator}</strong>
                  <small className='text-muted ml-1'>{comment.create_at}</small>
                </h5>
                <p className='mb-0'>{comment.text}</p>
              </Col>
            </Row>
          </Card>
        </ModalBody>
        <ModalFooter className='p-2'>
          <Button color='danger' onClick={this.onDeleteComment}>
            削除
          </Button>{' '}
          <Button color='secondary' onClick={this.props.modal_toggle}>
            キャンセル
          </Button>
        </ModalFooter>
      </Modal>
    )
  }
}

DeleteModal.propTypes = {
  comment: PropTypes.object,
  user_data: PropTypes.object,
  fetchComment: PropTypes.func.isRequired
}
