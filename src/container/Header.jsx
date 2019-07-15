import React from 'react';
import {
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Button
 } from 'reactstrap';

export default class Header extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {

    const navbar_style={
     backgroundColor: "#00075d",
    }

    const text_style={
     color: "white",
    }



    return (
      <div>
        <Navbar style={navbar_style} expand="md">
          <NavbarBrand className="ml-5" href="/" style={text_style}>Hearth EV</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
            <Nav className="ml-auto" navbar>
              <NavItem>
                <Button className="bg-primary border border-white rounded-pill py-1 px-5" style={text_style}>Login</Button>
              </NavItem>
            </Nav>
        </Navbar>
      </div>
    );
  }
}