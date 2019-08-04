import React from "react";
import PropTypes from "prop-types";
import logo from "../../asset/img/logo.png";

import { CardImg, CardBody, Row, Col, Card } from "reactstrap";

export default class ViewContainer extends React.Component {
  render() {
    const row_style = {
      height: "50px"
    };
    const photo_style = {
      transform: "translate(0px, -80%)"
    };

    const { focus_user } = this.props;

    return (
      <React.Fragment>
        <div className="bg-white border 2px shadow-sm">
          <CardImg top width="100%" src={logo} alt="Card logo" />
          <CardBody>
            <Row className="py-2 mx-0" style={row_style}>
              <Col xs="8">
                <h5>{focus_user.name}</h5>
              </Col>
              <Col xs="4" className="px-1">
                <img
                  className="rounded-pill border"
                  src={focus_user.photoURL}
                  alt={focus_user.photoURL}
                  width="100%"
                  height="auto"
                  style={photo_style}
                />
              </Col>
            </Row>
            <Row>
              <Col xs="6" className="btn text-center">
                <Card className="p-1">
                  <p className="mb-0">獲得いいね</p>
                  <strong className="text-primary">
                    <i className="material-icons">grade</i>
                    {focus_user.acquired_fav}
                  </strong>
                </Card>
              </Col>
              <Col xs="6" className="btn text-center">
                <Card className="p-1">
                  <p className="mb-0">コメント</p>
                  <strong className="text-primary">
                    <i className="material-icons">mode_comment</i>
                    {focus_user.comments.length}
                  </strong>
                </Card>
              </Col>
            </Row>
          </CardBody>
        </div>
      </React.Fragment>
    );
  }
}

ViewContainer.propTypes = {
  user_data: PropTypes.object,
  focus_user: PropTypes.object
};
