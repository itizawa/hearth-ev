import React from "react";
import { Row, Col } from "reactstrap";

// Containerのインポート
import Header from "./container/Header";
import Sidebar from "./container/Sidebar";

export default class App extends React.Component {
  render() {
    const bg_Style = {
      backgroundColor: "#f6f6f6",
      position: "fixed",
      width: "100%",
      height: "100%"
    };

    return (
      <div style={bg_Style}>
        <Header />
        <Row className="mt-5">
          <Col className="ml-5 mt-3" md="3">
            <Sidebar />
          </Col>
        </Row>
      </div>
    );
  }
}
