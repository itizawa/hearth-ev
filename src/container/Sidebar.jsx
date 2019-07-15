import React from "react";
import logo from "../asset/img/logo.png";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle
} from "reactstrap";

export default class Sidebar extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Card>
          <CardImg top width="100%" src={logo} alt="Card logo" />

          <CardBody>
            <CardTitle>ゲストネーム</CardTitle>
            <CardSubtitle>Card subtitle</CardSubtitle>
            <CardText>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </CardText>
          </CardBody>
        </Card>

        <Card>
          <CardImg top width="100%" src={logo} alt="Card logo" />

          <CardBody>
            <CardTitle>ゲストネーム</CardTitle>
            <CardSubtitle>Card subtitle</CardSubtitle>
            <CardText>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </CardText>
          </CardBody>
        </Card>
      </React.Fragment>
    );
  }
}
