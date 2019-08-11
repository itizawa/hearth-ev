import React from "react";
import PropTypes from "prop-types";
import logo from "../../asset/img/logo.png";

import { CardImg, CardBody, Row, Col, Card, Input } from "reactstrap";

export default class ViewContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // bioを登録していない場合初期プロフィールを表示する
      bio_text: this.props.focus_user.bio || "これはテストコメントです",
      show_profile_editer: false
    };

    this.onTextChange = this.onTextChange.bind(this);
  }

  /**
   * プロフィール取得ためのイベントハンドラ
   */
  onTextChange(e) {
    this.setState({
      bio_text: e.target.value
    });
  }

  /**
   * エディターを表示するためのイベントハンドラー
   */
  showEditer = () => {
    this.setState((prevState) => ({
      show_profile_editer: !prevState.show_profile_editer
    }));
  };

  render() {
    const row_style = {
      height: "50px"
    };
    const photo_style = {
      transform: "translate(0px, -80%)"
    };

    const { focus_user, user_data } = this.props;

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
              <Col xs="6" className="text-center">
                <Card className="p-1">
                  <p className="mb-0">獲得いいね</p>
                  <strong className="text-primary">
                    <i className="material-icons">grade</i>
                    {focus_user.acquired}
                  </strong>
                </Card>
              </Col>
              <Col xs="6" className="text-center">
                <Card className="p-1">
                  <p className="mb-0">コメント</p>
                  <strong className="text-primary">
                    <i className="material-icons">mode_comment</i>
                    {focus_user.comments.length}
                  </strong>
                </Card>
              </Col>
            </Row>
            <Row className="py-4 mx-0">
              <Col xs="11" className="p-0">
                {!this.state.show_profile_editer ? (
                  <p className="m-0">{this.state.bio_text}</p>
                ) : (
                  <Input
                    className="m-0"
                    value={this.state.bio_text}
                    type="textarea"
                    onChange={this.onTextChange}
                  />
                )}
              </Col>
              <Col xs="1" className="p-0">
                <span
                  hidden={focus_user.uid !== user_data.uid}
                  className="text-muted float-right"
                  onClick={() => {
                    this.showEditer();
                  }}
                >
                  <i className="material-icons btn p-0 mr-2">edit</i>
                </span>
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
