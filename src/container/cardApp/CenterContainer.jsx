import React from "react";
import PropTypes from "prop-types";
import { Input, Col, Row } from "reactstrap";
import CommentModal from "../../components/CommentModal";
import CardComment from "./CardComment";

export default class CenterContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show_comment_modal: false,
      comments: []
    };

    this.modal_toggle = this.modal_toggle.bind(this);
  }

  /**
   * モーダル開閉のためのイベントハンドラ
   */

  modal_toggle() {
    this.setState((prevState) => ({
      show_comment_modal: !prevState.show_comment_modal
    }));
  }

  render() {
    const header_style = {
      backgroundColor: "#00075d"
    };

    return (
      <React.Fragment>
        <div className="border 2px">
          <h3 style={header_style} className="text-white py-2 pl-3 mb-0">
            {this.props.focus_card.name}
          </h3>
          <Row className="py-2 mx-0">
            <Col xs="1" className="px-1">
              <img
                className="rounded-pill"
                src={this.props.user_data.photoURL}
                alt={this.props.user_data.photoURL}
                width="80%"
                height="auto"
              />
            </Col>
            <Col xs="11 pl-0">
              <Input onClick={this.modal_toggle} placeholder="コメントする" />
            </Col>
          </Row>
          {this.props.focus_card.comments && //commentsが空の時でも動くように
            this.props.focus_card.comments.reverse().map((id, index) => {
              return <CardComment key={index} id={id} user_data={this.props.user_data}/>;
            })}
        </div>

        <CommentModal
          modal={this.state.show_comment_modal}
          modal_toggle={this.modal_toggle}
          user_data={this.props.user_data}
          card_id={this.props.focus_card.img}
          card_name={this.props.focus_card.name}
          pushCommentId={this.props.pushCommentId}
        />
      </React.Fragment>
    );
  }
}

CenterContainer.propTypes={
  user_data:PropTypes.object,
  focus_user:PropTypes.object,
}