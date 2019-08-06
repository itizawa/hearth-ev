import React from "react";
import { Row, Col } from "reactstrap";
import { Link } from "react-router-dom";

export default class UserListItem extends React.Component {
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
      </Row>
    );
  }
}
