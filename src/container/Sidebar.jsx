import React from "react";
import logo from "../asset/img/logo.png";

import { CardImg, ListGroup, ListGroupItem } from "reactstrap";

export default class Sidebar extends React.Component {
  render() {
    return (
      <React.Fragment>
        <CardImg top width="100%" src={logo} alt="Card logo" />

        <ListGroup>
          <ListGroupItem tag="button" action>
            <i className="material-icons">home</i>
          </ListGroupItem>
          <ListGroupItem tag="button" action>
            Dapibus ac facilisis in
          </ListGroupItem>
          <ListGroupItem tag="button" action>
            Morbi leo risus
          </ListGroupItem>
          <ListGroupItem tag="button" action>
            Porta ac consectetur ac
          </ListGroupItem>
        </ListGroup>
      </React.Fragment>
    );
  }
}
