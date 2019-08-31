import React from 'react'
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Col,
  Row
} from 'reactstrap'


export default class CreateTopicModal extends React.Component {

  MIN_WORD_COUNT = 1
  MAX_WORD_COUNT = 50

  constructor(props) {
    super(props)
    this.state = {
      topicText: '',
    }
    this.onTextChange = this.onTextChange.bind(this)
    this.toggleModal = this.toggleModal.bind(this)
    this.onPostTopic = this.onPostTopic.bind(this)
  }

  /**
   * コメント取得ためのイベントハンドラ
   */
  onTextChange(e) {
    this.setState({
      topicText: e.target.value
    })
  }

  /**
   * Modal開閉のためのイベントハンドラ
   */
  toggleModal() {
    this.setState({ topicText: '' })
    this.props.toggleModal()
  }

  /**
   * トピック作成のイベントハンドラ
   */
  async onPostTopic() {
    console.log('ここにトピック作成のイベント')
    await this.toggleModal()
  }

  render() {
    return (
      <Modal
        isOpen={this.props.show}
        toggle={this.toggleModal}
        className={this.props.className}
      >
        <ModalHeader toggle={this.modal_toggle}>
          トピックを作る
        </ModalHeader>

        <ModalBody>
          <Row>
            <Col xs='12'>
              <Input
                onChange={this.onTextChange}
                type='textinput'
                name='text'
                id='exampleText'
              />
            </Col>
          </Row>
        </ModalBody>
        <ModalFooter className='p-2'>
          <Button
            color='primary'
            onClick={this.onPostTopic}
            disabled={
              this.state.topicText.length < this.MIN_WORD_COUNT ||
              this.state.topicText.length > this.MAX_WORD_COUNT
            }
          >
            Submit
          </Button>
        </ModalFooter>
      </Modal>
    )
  }
}
