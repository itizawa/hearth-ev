import React from "react";
import { Row, Col } from "reactstrap";
import Sidebar from "./Sidebar";
import { BrowserRouter, Route } from "react-router-dom";
import MainApp from "./mainApp/MainApp";
import UserApp from "./userApp/UserApp";

export default class MainContainer extends React.Component {
  render() {
    const container_style = {
      maxWidth: "1440px",
      margin: "0 auto"
    };
    return (
      <BrowserRouter>
        <div style={container_style}>
          <Row className="mt-2 mx-0">
            <Col md="2" className="pl-0">
              <Sidebar user_data={this.props.user_data} />
            </Col>
            <Col md="10">
              <Route
                exact
                path="/"
                render={(props) => <MainApp {...this.props} />}
              />
              <Route
                exact
                path="/user/:user_id"
                render={(props) => (
                  <UserApp {...this.props} match={props.match} />
                )}
              />
            </Col>
          </Row>
        </div>
      </BrowserRouter>
    );
  }
}
