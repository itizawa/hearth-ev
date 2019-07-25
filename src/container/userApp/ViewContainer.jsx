import React from "react";
import logo from "../../asset/img/logo.png";

import { CardImg, CardBody, Row, Col } from "reactstrap";

export default class Sidebar extends React.Component {
  render() {
    const row_style = {
      height: "50px"
    };
    const photo_style = {
      transform: "translate(0px, -80%)"
    };
    return (
      <React.Fragment>
        <div className="border 2px">
          <CardImg top width="100%" src={logo} alt="Card logo" />
          <CardBody>
            <Row className="py-2 mx-0" style={row_style}>
              <Col xs="8">
                <h5>{this.props.focus_user.name}</h5>
              </Col>
              <Col xs="4" className="px-1">
                <img
                  className="rounded-pill border"
                  src={this.props.focus_user.photoURL}
                  alt={this.props.focus_user.photoURL}
                  width="100%"
                  height="auto"
                  style={photo_style}
                />
              </Col>
            </Row>
          </CardBody>
        </div>
      </React.Fragment>
    );
  }
}
