import React from "react";
import logo from "../asset/img/logo.png";
import { Link } from "react-router-dom";

import { CardImg, ListGroup, ListGroupItem } from "reactstrap";

export default class Sidebar extends React.Component {
  render() {
    return (
      <React.Fragment>
        <CardImg top width="100%" src={logo} alt="Card logo" />

        <ListGroup>
          <ListGroupItem tag="button" action>
            <Link to={"/"}>
              <p className="mb-0 align-middle">
                <i className="material-icons mr-2">home</i>ホーム
              </p>
            </Link>
          </ListGroupItem>
        </ListGroup>
      </React.Fragment>
    );
  }
}
