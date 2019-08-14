import React from "react";
import PropTypes from "prop-types";
import { Row, Col } from "reactstrap";
import Sidebar from "./Sidebar";
import { BrowserRouter, Route } from "react-router-dom";

// Componentのimport
import MainApp from "./mainApp/MainApp";
import UserApp from "./userApp/UserApp";
import CardApp from "./cardApp/CardApp";
import CardListApp from "./cardList/CardListApp";
import TestApp from "./TestApp";

export default class MainContainer extends React.Component {
  render() {
    const container_style = {
      maxWidth: "1440px",
      margin: "0 auto"
    };
    return (
      <BrowserRouter>
        <div style={container_style}>
          <Row className="mx-0">
            {window.innerWidth >= 768 && (
              <Col xl="2" className="px-2">
                <Sidebar user_data={this.props.user_data} />
              </Col>
            )}
            <Col xl="10">
              <Route
                exact
                path="/"
                render={(props) => <MainApp {...this.props} />}
              />
              <Route
                path="/user/:user_id"
                render={(props) => (
                  <UserApp {...this.props} match={props.match} />
                )}
              />
              <Route
                exact
                path="/card/:card_id"
                render={(props) => (
                  <CardApp {...this.props} match={props.match} />
                )}
              />
              <Route
                exact
                path="/card"
                render={(props) => <CardListApp {...this.props} />}
              />
              <Route
                exact
                path="/test"
                render={(props) => <TestApp {...this.props} />}
              />
            </Col>
          </Row>
        </div>
      </BrowserRouter>
    );
  }
}

MainContainer.propTypes = {
  user_data: PropTypes.object
};
