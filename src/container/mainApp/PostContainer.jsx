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

export default class PostContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState((prevState) => ({
      modal: !prevState.modal
    }));
  }

  render() {
    const header_style = {
      backgroundColor: "#00075d"
    };

    return (
      <>
        <div className="border 2px">
          <h3 style={header_style} className="text-white py-2 pl-3 mb-0">
            ホーム
          </h3>
          <Row className="py-2 mx-0">
            <Col xs="2" className="pr-0">
              <img
                className="rounded-pill"
                src={this.props.user_data.photoURL}
                alt={this.props.user_data.photoURL}
                width="auto"
                height="80%"
              />
            </Col>
            <Col xs="10 pl-0">
              <Input
                onClick={this.toggle}
                placeholder="今、何してる"
              />
            </Col>
          </Row>
        </div>
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
          className={this.props.className}
        >
          <ModalHeader toggle={this.toggle}>コメントする</ModalHeader>

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
            <Button color="primary" onClick={this.toggle}>
              Submit
            </Button>{" "}
          </ModalFooter>
        </Modal>
      </>
    );
  }
}
