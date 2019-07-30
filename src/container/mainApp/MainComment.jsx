import React from "react";
import PropTypes from "prop-types";
import { Col, Row, Tooltip } from "reactstrap";
import { Link } from "react-router-dom";
import DeleteModal from "../../components/DeleteModal";

import firebase from "firebase/app";

export default class MainComment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show_delete_modal: false,
      comments: this.props.comments,
      tooltipOpen: false,
      card_image: ""
    };
    if (this.props.comment.card_id) {
      this.fetchCardImage();
    }

    this.tooltip_toggle = this.tooltip_toggle.bind(this);
    this.delete_modal_toggle = this.delete_modal_toggle.bind(this);
  }

  /**
   * モーダル開閉のためのイベントハンドラ
   */

  delete_modal_toggle() {
    this.setState((prevState) => ({
      show_delete_modal: !prevState.show_delete_modal
    }));
  }

  /**
   * カード画像の取得
   */

  fetchCardImage() {
    var storageRef = firebase.storage().ref();
    var spaceRef = storageRef.child(`card/${this.props.comment.card_id}.png`); //imgとidは兼用

    spaceRef.getDownloadURL().then((url) => {
      this.setState({ card_image: url });
    });
  }

  /**
   * ツールチップ開閉のためのイベントハンドラ
   */

  tooltip_toggle() {
    this.setState({
      tooltipOpen: !this.state.tooltipOpen
    });
  }

  render() {
    const tooltip = {
      maxWidth: "400px"
    };

    return (
      <React.Fragment>
        <Row className="mx-0 py-2 px-2 border-top">
          <Col xs="1" className="px-0">
            <Link to={"/user/" + this.props.comment.creator_id}>
              <img
                className="rounded-pill border"
                src={this.props.comment.creator_img}
                alt={this.props.comment.creator_img}
                width="80%"
                height="auto"
              />
            </Link>
          </Col>
          <Col xs="11" className="px-0">
            <h5 className="mb-0">
              <Link to={"/user/" + this.props.comment.creator_id}>
                <strong className="text-body">
                  {this.props.comment.creator}
                </strong>
              </Link>
              <small className="text-muted ml-1">
                {this.props.comment.create_at}
              </small>
              <span hidden={this.props.comment.creator_id !== this.props.user_data.uid} className="text-muted float-right" onClick={this.delete_modal_toggle}>
                <i className="material-icons btn p-0">clear</i>
              </span>
            </h5>
            {this.props.comment.card_id && (
              <Link to={"/card/" + this.props.comment.card_id}>
                <span className="" href="#" id="TooltipExample">
                  #{this.props.comment.card_name}
                </span>
                <Tooltip
                  style={tooltip}
                  placement="right"
                  isOpen={this.state.tooltipOpen}
                  target="TooltipExample"
                  toggle={this.tooltip_toggle}
                >
                  <img
                    src={this.state.card_image}
                    alt={this.state.card_image}
                    width="100%"
                    height="auto"
                  />
                </Tooltip>
              </Link>
            )}

            <p className="mb-0">{this.props.comment.text}</p>
          </Col>
        </Row>
        <DeleteModal
          modal={this.state.show_delete_modal}
          modal_toggle={this.delete_modal_toggle}
          comment={this.props.comment}
          user_data={this.props.user_data}
          fetchComment={this.props.fetchHomeComment}
        />
      </React.Fragment>
    );
  }
}

MainComment.propTypes = {
  comment: PropTypes.object,
  user_data: PropTypes.object,
  fetchHomeComment: PropTypes.func
};
