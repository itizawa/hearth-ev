import React from "react";
import { Row, Col } from "reactstrap";

import CenterContainer from "./CenterContainer";

export default class UserApp extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Row>
          <Col md="7" className="px-0">
            <CenterContainer />
          </Col>
          <Col md="5" className="px-0" />
        </Row>
      </React.Fragment>
    );
  }
}
