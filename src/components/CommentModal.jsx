import React from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Col,
  Row
} from "reactstrap";

export default class CommentModal extends React.Component {
  render() {
    return (
      <Modal
        isOpen={this.props.modal}
        toggle={this.props.modal_toggle}
        className={this.props.className}
      >
        <ModalHeader toggle={this.props.modal_toggle}>コメントする</ModalHeader>

        <ModalBody>
          <Row>
            <Col xs="2" className="pr-0">
              <img
                className="ml-2 my-auto rounded-pill"
                src={this.props.user_data.photoURL}
                alt={this.props.user_data.photoURL}
                width="auto"
                height="80%"
              />
            </Col>
            <Col xs="10" className="pl-0">
              <Input type="textarea" name="text" id="exampleText" />
            </Col>
          </Row>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={this.props.modal_toggle}>
            Submit
          </Button>{" "}
        </ModalFooter>
      </Modal>
    );
  }
}