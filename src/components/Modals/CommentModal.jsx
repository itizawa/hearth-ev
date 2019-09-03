import React from 'react'
import PropTypes from 'prop-types'
import {
  Button,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  InputGroup,
  UncontrolledDropdown,
  Col,
  Row
} from 'reactstrap'
import { TwitterShareButton, TwitterIcon } from 'react-share'

// functionのインポート
import { createNewComment } from '../../function/comment'

export default class CommentModal extends React.Component {

  MIN_WORD_COUNT = 1
  MAX_WORD_COUNT = 150

  constructor(props) {
    super(props)
    this.state = {
      userData: this.props.user_data,
      topicData: {
        topic_name: '',
        topic_id: ''
      },
      cardData: {
        card_name: '',
        card_id: ''
      },
      commentText: '',
      buttonDisable: false

    }

    this.onTextChange = this.onTextChange.bind(this)
    this.switchTopic = this.switchTopic.bind(this)
    this.toggleModal = this.toggleModal.bind(this)
    this.onPostComment = this.onPostComment.bind(this)
  }

  /**
   * Topicをセットする
   */
  componentDidUpdate(prevProps) {
    if (this.props.focusTopic !== prevProps.focusTopic) {
      this.setState({ topicData: this.props.focusTopic })
    }

    if (this.props.focusCard !== prevProps.focusCard) {
      this.setState({ cardData: this.props.focusCard })
    }
  }

  /**
   * コメント取得ためのイベントハンドラ
   */
  onTextChange(e) {
    this.setState({ commentText: e.target.value })
  }

  /**
   * Topicの切り替えのためのイベントハンドラ
   * topicDataをオブジェクトで保存
   */
  switchTopic(e) {
    const topicData = { topic_name: e.target.textContent.trim(), topic_id: e.target.id.trim() }
    this.setState({ topicData: topicData })
  }

  /**
   * Modal開閉のためのイベントハンドラ
   */
  toggleModal() {
    this.props.modal_toggle()
    const topicData = { topic_name: '', topic_id: '' }
    this.setState({ topicData: topicData })
  }

  /**
   * コメント投稿のイベントハンドラ
   */
  async onPostComment() {
    const { userData, topicData, cardData, commentText } = this.state

    this.setState({ buttonDisable: true })
    this.toggleModal()

    await createNewComment(userData, topicData, cardData, commentText)
    await this.props.fetchComment()

    this.setState({ commentText: '' })
    this.setState({ buttonDisable: false })
  }

  render() {
    return (
      <Modal
        isOpen={this.props.modal}
        toggle={this.toggleModal}
        className={this.props.className}
      >
        <ModalHeader toggle={this.toggleModal}>
          コメントする
          <span hidden={!this.props.card_name} className='text-primary ml-3'>
            #{this.props.card_name}
          </span>
        </ModalHeader>

        <ModalBody>
          <Row>
            <Col xs='2' className='pr-0'>
              <img
                className='ml-2 my-auto rounded-pill'
                src={this.props.user_data.photoURL}
                alt={this.props.user_data.photoURL}
                width='80%'
                height='auto'
              />
            </Col>
            <Col xs='10' className='pl-0'>
              <Input
                onChange={this.onTextChange}
                type='textarea'
                name='text'
                id='exampleText'
              />
            </Col>
          </Row>
        </ModalBody>
        <ModalFooter className='p-2'>
          <InputGroup>
            <UncontrolledDropdown>
              <DropdownToggle caret />
              <DropdownMenu>
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
              value={this.state.topicData.topic_name}
              placeholder='話題登録'
            />
          </InputGroup>
          <div hidden={!this.props.card_name}>
            <TwitterShareButton
              title={this.state.comment_text + '#' + this.props.card_name}
              url={'https://hearth-ev.com/card/' + this.props.card_id}
            >
              <TwitterIcon size={32} round />
            </TwitterShareButton>
          </div>
          <Button
            color='primary'
            onClick={this.onPostComment}
            disabled={
              this.state.commentText.length < this.MIN_WORD_COUNT ||
              this.state.commentText.length > this.MAX_WORD_COUNT ||
              this.state.buttonDisable
            }
          >
            Submit
          </Button>
        </ModalFooter>
      </Modal>
    )
  }
}

CommentModal.propTypes = {
  modal: PropTypes.bool.isRequired,
  modal_toggle: PropTypes.func.isRequired,
  fetchComment: PropTypes.func.isRequired,
  user_data: PropTypes.object.isRequired,
  card_id: PropTypes.string,
  card_name: PropTypes.string
}
