import React from "react";
import { Row, Col } from "reactstrap";
import Sidebar from "./Sidebar";
import { BrowserRouter, Route } from "react-router-dom";
import MainApp from "./mainApp/MainApp";

export default class MainContainer extends React.Component {
  render() {
    const container_style = {
      maxWidth: "1440px",
      margin: "0 auto"
    };
    return (
      <div style={container_style}>
        <Row className="mt-2 mx-0">
          <Col md="2" className="pl-0">
            <Sidebar user_data={this.props.user_data} />
          </Col>
          <Col md="10">
            <BrowserRouter>
              <Route
                exact
                path="/"
                render={(props) => <MainApp {...this.props} />}
              />
            </BrowserRouter>
          </Col>
        </Row>
      </div>
    );
  }
}
