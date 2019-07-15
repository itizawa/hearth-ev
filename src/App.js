import React from "react";
import { Row, Col } from "reactstrap";

// Containerのインポート
import Header from "./container/Header";
import Sidebar from "./container/Sidebar";

function App() {

  const bg_Style = {
    backgroundColor: "#f6f6f6",
    position:"fixed",
    width:"100%",
    height: "100%",
  };

  return (
    <div style={bg_Style}>
      <Header />
      <Row>
        <Col md="3"><Sidebar /></Col>
      </Row>
    </div>
  );
}

export default App;
