import React from "react";
import { Row, Col, Tooltip } from "reactstrap";
import { Link } from "react-router-dom";

export default class UserListItem extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      tooltipOpen: false
    };
  }
  /**
   * ツールチップのイベントハンドラ
   */
  toggle() {
    this.setState({
      tooltipOpen: !this.state.tooltipOpen
    });
  }

  render() {
    const { user_data } = this.props;
    return (
      <Row className="mx-0 py-2 px-2 border-top">
        <Col xs="2" className="px-0">
          <Link to={"/user/" + user_data.uid + "/timestamp"}>
            <img
              className="rounded-pill border"
              src={user_data.photoURL}
              alt={user_data.photoURL}
              width="80%"
              height="auto"
            />
          </Link>
        </Col>
        <Col xs="10" className="px-0">
          <h5 className="mb-0">
            <Link to={"/user/" + user_data.uid + "/timestamp"}>
              <strong className="text-body">{user_data.name}</strong>
            </Link>
            <p className="my-1">
              <span className="text-primary mr-2" href="#" id={user_data.uid}>
                <i className="material-icons align-middle">grade</i>
                {user_data.acquired}
              </span>
              <span className="text-primary">
                <i className="material-icons align-middle">mode_comment</i>
                {user_data.comments}
              </span>
              <Tooltip
                placement="bottom"
                isOpen={this.state.tooltipOpen}
                autohide={false}
                target={user_data.uid}
                toggle={this.toggle}
              >
                いいね獲得数
              </Tooltip>
            </p>
          </h5>
        </Col>
      </Row>
    );
  }
}
