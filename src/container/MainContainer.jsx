import React from "react";
import { Row, Col } from "reactstrap";
import Sidebar from "./Sidebar";

export default class MainContainer extends React.Component {
  render() {
    const container_style = {
      maxWidth: "1440px",
      margin: "0 auto"
    };
    return (
      <div style={container_style}>
        <Row className="mt-2 mx-0">
          <Col md="2" className="px-0">
            <Sidebar user_data={this.props.user_data} />
          </Col>
          <Col md="6" className="px-0">
            <Sidebar user_data={this.props.user_data} />
          </Col>
          <Col md="4" className="pr-0">
            <Sidebar user_data={this.props.user_data} />
          </Col>
        </Row>
      </div>
    );
  }
}
