import React from "react";
import logo from "../asset/img/logo.png";
import { Card, CardImg, CardBody, CardTitle } from "reactstrap";

export default class Sidebar extends React.Component {
  render() {
    return (
      <Card>
        <CardImg top width="100%" src={logo} alt="Card logo" />

        <CardBody>
          <CardTitle>{this.props.user_data.displayName}</CardTitle>
        </CardBody>
      </Card>
    );
  }
}
