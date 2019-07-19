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
            <p className="mb-0 align-middle">
              <i className="material-icons mr-2">home</i>ホーム
            </p>
          </ListGroupItem>
        </ListGroup>
      </React.Fragment>
    );
  }
}
