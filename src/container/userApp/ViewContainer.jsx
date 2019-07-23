import React from "react";
import logo from "../../asset/img/logo.png";

import {
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button
} from "reactstrap";

export default class Sidebar extends React.Component {
  render() {
    return (
      <React.Fragment>
        <div className="border 2px">
          <CardImg top width="100%" src={logo} alt="Card logo" />
          <CardBody>
            <CardTitle>Card title</CardTitle>
            <CardSubtitle>Card subtitle</CardSubtitle>
            <CardText>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </CardText>
            <Button>Button</Button>
          </CardBody>
        </div>
      </React.Fragment>
    );
  }
}
