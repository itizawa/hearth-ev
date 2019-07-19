import React from "react";
import { Row, Col } from "reactstrap";
import Sidebar from "../Sidebar";
import PostContainer from "./PostContainer";

export default class MainApp extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Row>
          <Col md="7" className="px-0">
            <PostContainer user_data={this.props.user_data} />
          </Col>
          <Col md="5" className="px-0">
            <Sidebar user_data={this.props.user_data} />
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}
