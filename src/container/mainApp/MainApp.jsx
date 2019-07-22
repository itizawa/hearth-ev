import React from "react";
import { Row, Col } from "reactstrap";
import Sidebar from "../Sidebar";
import CenterContainer from "./CenterContainer";

export default class MainApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user_id: this.props.match.params.user_id || ""
    };
  }

  componentDidMount() {
    if (this.state.user_id) {
      this.userPageProcess()
    }
  }

  /**
   * ユーザーページの場合の処理
   */

  userPageProcess = () => {
    console.log("aaa")
  };

  render() {
    return (
      <React.Fragment>
        <Row>
          <Col md="7" className="px-0">
            <CenterContainer user_data={this.props.user_data} />
          </Col>
          <Col md="5" className="px-0">
            <Sidebar user_data={this.props.user_data} />
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}
