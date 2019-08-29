import React from 'react'
import PropTypes from 'prop-types'
import {
  Button,
  DropdownItem,
  DropdownToggle,
  DropdownMenu,
  Input,
  InputGroup,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Row,
  UncontrolledDropdown,
  Col
} from 'reactstrap'

import firebase from 'firebase/app'

export default class ReEditModal extends React.Component {

  MIN_WORD_COUNT = 1;
  MAX_WORD_COUNT = 150

  constructor (props) {
    super(props)
    this.state = {
      comment_text: this.props.comment.text
    }

    this.reEditComment = this.reEditComment.bind(this)
    this.onTextChange = this.onTextChange.bind(this)
  }

  /**
   * コメント取得ためのイベントハンドラ
   */
  onTextChange (e) {
    this.setState({
      comment_text: e.target.value
    })
  }

  /**
   * コメント再編集のイベントハンドラ
   */
  async reEditComment () {
    if (this.props.comment.creator_id === this.props.user_data.uid) {
      await firebase
        .firestore()
        .collection('Comments')
        .doc(this.props.comment.comment_id)
        .update({
          text: this.state.comment_text
        })
      this.props.modal_toggle()
      this.props.fetchComment()
    }
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
          コメントを編集する
          <span hidden={!comment.card_name} className='text-primary ml-3'>
            #{comment.card_name}
          </span>
        </ModalHeader>
        <ModalBody>
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
            </Col>
            <Input
              className='mt-2'
              value={this.state.comment_text}
              type='textarea'
              onChange={this.onTextChange}
            />
          </Row>
          <InputGroup>
            <UncontrolledDropdown>
              <DropdownToggle caret />
              <DropdownMenu>
                <DropdownItem
                  id='yxjFQW0FsqNHcRLjJTHx'
                  onClick={this.switchTopic}
                >
                  事前評価
                </DropdownItem>
                <DropdownItem
                  id='SZqeygxWgtrFoRMWuWUP'
                  onClick={this.switchTopic}
                >
                  事後評価
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
            <Input
              readOnly
              value={this.state.topic_name}
              placeholder='話題登録'
            />
          </InputGroup>
        </ModalBody>
        <ModalFooter className='p-2'>
          <Button
            color='primary'
            onClick={this.reEditComment}
            disabled={
              this.state.comment_text.length < this.MIN_WORD_COUNT ||
              this.state.comment_text.length > this.MAX_WORD_COUNT
            }
          >
            更新
          </Button>
          <Button color='secondary' onClick={this.props.modal_toggle}>
            キャンセル
          </Button>
        </ModalFooter>
      </Modal>
    )
  }
}

ReEditModal.propTypes = {
  comment: PropTypes.object.isRequired,
  user_data: PropTypes.object.isRequired,
  fetchComment: PropTypes.func.isRequired
}
