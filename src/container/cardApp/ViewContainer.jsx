import React from "react";
import logo from "../../asset/img/logo.png";

import {
  CardImg,
  CardBody,
  Row,
  Col
} from "reactstrap";

export default class Sidebar extends React.Component {
  render() {
    const row_style={
      height:"50px"
    }
    return (
      <React.Fragment>
        <div className="border 2px">
          <CardImg top width="100%" src={logo} alt="Card logo" />
          <CardBody>
            <Row className="py-2 mx-0" style={row_style}>
              <Col xs="8">
              </Col>
              <Col xs="4" className="px-1">

              </Col>
            </Row>
          </CardBody>
        </div>
      </React.Fragment>
    );
  }
}
