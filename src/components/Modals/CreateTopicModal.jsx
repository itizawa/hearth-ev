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

  constructor (props) {
    super(props)
    this.state = {
      tweet_permission: true,
      topic_text: '',
    }
    this.onTextChange = this.onTextChange.bind(this)
    this.modal_toggle = this.modal_toggle.bind(this)
    this.onPostTopic = this.onPostTopic.bind(this)
  }

  /**
   * コメント取得ためのイベントハンドラ
   */
  onTextChange (e) {
    this.setState({
      topic_text: e.target.value
    })
  }

  /**
   * Modal開閉のためのイベントハンドラ
   */
  modal_toggle () {
    console.log('モーダル開閉')
    // this.props.modal_toggle()
  }

  /**
   * トピック作成のイベントハンドラ
   */
  async onPostTopic () {
    console.log('ここにトピック作成のイベント')
    // await this.props.modal_toggle()
  }

  render () {
    return (
      <Modal
        isOpen={this.props.show}
        toggle={this.modal_toggle}
        className={this.props.className}
      >
        <ModalHeader toggle={this.modal_toggle}>
          トピックを作る
        </ModalHeader>

        <ModalBody>
          <Row>
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
          <Button
            color='primary'
            onClick={this.onPostTopic}
            disabled={
              this.state.topic_text.length < this.MIN_WORD_COUNT ||
              this.state.topic_text.length > this.MAX_WORD_COUNT
            }
          >
            Submit
          </Button>
        </ModalFooter>
      </Modal>
    )
  }
}
