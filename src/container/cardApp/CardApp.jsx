import React from "react";
import { Row, Col } from "reactstrap";
import ViewContainer from "./ViewContainer";
import CenterContainer from "./CenterContainer";

export default class CardApp extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Row>
          <Col md="7" className="px-0">
            <CenterContainer user_data={this.props.user_data} />
          </Col>
          <Col md="5" className="px-0">
            <ViewContainer user_data={this.props.user_data} />
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}
