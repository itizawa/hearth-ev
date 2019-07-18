import React from "react";
import { Row, Col } from "reactstrap";
import Sidebar from "./Sidebar";

export default class MainContainer extends React.Component {
  render() {
    const container_style = {
      maxWidth: "1100px",
      backgroundColor: "red"
    };
    return (
      <div style={container_style}>
        <Row className="mt-5">
          <Col className="ml-5 mt-3" md="3">
            <Sidebar user_data={this.props.user_data} />
          </Col>
        </Row>
      </div>
    );
  }
}
