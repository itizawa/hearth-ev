import React from "react";
import { Row, Col } from "reactstrap";
import Sidebar from "../Sidebar";
import CenterContainer from "./CenterContainer";
import { getUser } from "../../function/user";

export default class MainApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      focus_user: {
        id: this.props.match.params.user_id || ""
      },

      screen_status: {
        userPage: false
      }
    };
  }

  componentDidMount() {
    if (this.state.focus_user.id) {
      this.userPageProcess();
    }
  }

  /**
   * ユーザーページの場合の処理
   */

  userPageProcess = () => {
    this.setState({ screen_status: { userPage: true } });
    getUser(this.state.focus_user.id);
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
