import React from "react";
import {
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from "reactstrap";

import Term from "../components/article/Term";

import firebase from "../firebase/firestore";
import * as firestore from "../firebase/firestore";

export default class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      user_data: {}
    };

    this.toggle = this.toggle.bind(this);
    this.onLoginHandler = this.onLoginHandler.bind(this);
  }

  /**
   * モーダル開閉のためのイベントハンドラ
   */

  toggle() {
    this.setState((prevState) => ({
      modal: !prevState.modal
    }));
  }

  /**
   * ログインイベントハンドラ
   */

  onLoginHandler() {
    console.log("login");
    firebase.auth().signInWithRedirect(firestore.providerTwitter);
  }

  render() {
    const navbar_style = {
      backgroundColor: "#00075d"
    };

    const text_style = {
      color: "white"
    };

    return (
      <div>
        <Navbar className="fixed-top" style={navbar_style} expand="md">
          <NavbarBrand href="/" style={text_style}>
            Hearth EV
          </NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Nav className="ml-auto" navbar>
            <NavItem>
              <img
                className="mr-2 rounded-pill border border-secondary"
                src={this.props.user_data.photoURL}
                alt=""
                width="38px"
                height="38px"
              />
              <Button
                onClick={this.toggle}
                className="bg-primary border border-white rounded-pill py-1 px-5"
                style={text_style}
              >
                Login
              </Button>
            </NavItem>
          </Nav>
          <Modal
            isOpen={this.state.modal}
            toggle={this.toggle}
            className={this.props.className}
          >
            <ModalHeader toggle={this.toggle}>Twitterログイン</ModalHeader>
            <ModalBody>
              <Term />
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={this.onLoginHandler}>
                ログインする
              </Button>{" "}
              <Button color="secondary" onClick={this.toggle}>
                Cancel
              </Button>
            </ModalFooter>
          </Modal>
        </Navbar>
      </div>
    );
  }
}
