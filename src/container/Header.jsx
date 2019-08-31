import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import {
  Collapse,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Navbar,
  NavLink,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  UncontrolledDropdown
} from 'reactstrap'

import Term from '../components/article/Term'

import firebase from '../firebase/firestore'
import * as firestore from '../firebase/firestore'

export default class Header extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      collapsed: true,
      modal: false,
      user_data: {}
    }

    this.toggle = this.toggle.bind(this)
    this.toggleNavbar = this.toggleNavbar.bind(this)
    this.onLoginHandler = this.onLoginHandler.bind(this)
    this.CreateUser = this.CreateUser.bind(this)
  }

  /**
   * navbar開閉のためのイベントハンドラ
   */
  toggleNavbar () {
    this.setState({
      collapsed: !this.state.collapsed
    })
  }

  /**
   * モーダル開閉のためのイベントハンドラ
   */
  toggle () {
    this.setState((prevState) => ({
      modal: !prevState.modal
    }))
  }

  /**
   * ログインイベントハンドラ
   */
  onLoginHandler () {
    console.log('login')
    firebase
      .auth()
      .signInWithRedirect(firestore.providerTwitter)
      .then(this.CreateUser())
  }

  /**
   * ログアウトイベントハンドラ
   */
  onLogoutHandler () {
    firebase
      .auth()
      .signOut()
      .then(function () {
        window.location.reload()
      })
  }

  /**
   * 初ログイン時のアカウント作成
   */
  CreateUser () {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        const name = user.displayName
        const photoURL = user.providerData[0].photoURL
        const uid = user.uid
        const db = firebase.firestore()
        var addComment = db
          .collection('Users')
          .doc(uid)
          .set(
            {
              name: name,
              photoURL: photoURL,
              uid: uid
            },
            { merge: true }
          )
          .then(() => {
            this.setState({ comment_text: '' })
          })
        return Promise.all([addComment])
      }
    })
  }

  render () {
    const navbar_style = {
      backgroundColor: '#00075d',
      border: '0px'
    }

    const text_style = {
      color: 'white'
    }

    const dehaze_style = {
      fontSize: '40px'
    }

    return (
      <>
        <Navbar style={navbar_style} expand='md'>
          <NavbarToggler onClick={this.toggleNavbar} className='mr-2 p-0'>
            <i className='material-icons text-white' style={dehaze_style}>
              dehaze
            </i>
          </NavbarToggler>
          <NavbarBrand href='/' style={text_style}>
            Hearth EV
          </NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Nav className='ml-auto' navbar>
            <NavItem>
              {!this.props.user_data.uid ? (
                <Button
                  onClick={this.toggle}
                  className='bg-primary border border-white rounded-pill py-1 px-5'
                  style={text_style}
                >
                  Login
                </Button>
              ) : (
                <UncontrolledDropdown direction='left'>
                  <DropdownToggle style={navbar_style}>
                    <img
                      className='mr-2 rounded-pill border border-secondary'
                      src={this.props.user_data.photoURL}
                      alt=''
                      width='38px'
                      height='38px'
                    />
                  </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem>
                      <Link to={'/user/' + this.props.user_data.uid} className='text-body'>
                        {this.props.user_data.displayName}
                      </Link>
                    </DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem
                      onClick={() => {
                        this.onLogoutHandler()
                      }}
                    >
                      <i className='material-icons'>exit_to_app</i> Logiout
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              )}
            </NavItem>
          </Nav>
          <Modal
            isOpen={this.state.modal}
            toggle={this.toggle}
          >
            <ModalHeader toggle={this.toggle}>Twitterログイン</ModalHeader>
            <ModalBody>
              <Term />
            </ModalBody>
            <ModalFooter>
              <Button color='primary' onClick={this.onLoginHandler}>
                ログインする
              </Button>{' '}
              <Button color='secondary' onClick={this.toggle}>
                Cancel
              </Button>
            </ModalFooter>
          </Modal>
          {window.innerWidth < 768 && (
            <Collapse isOpen={!this.state.collapsed} navbar>
              <Nav navbar>
                <NavItem>
                  <NavLink href='/' style={text_style}>
                    ホーム
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href='/card' style={text_style}>
                    カード
                  </NavLink>
                </NavItem>
              </Nav>
            </Collapse>
          )}
        </Navbar>
      </>
    )
  }
}

Header.propTypes = {
  user_data: PropTypes.object
}
