import React from "react";
import { Row, Col } from "reactstrap";

// Containerのインポート
import Header from "./container/Header";

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
        <Col md="10" className="bg">.col-3</Col>
      </Row>
    </div>
  );
}

export default App;
