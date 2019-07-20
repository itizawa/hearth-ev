import React from "react";
import { Input, Col, Row } from "reactstrap";
import CommentModal from "../../components/CommentModal";

export default class PostContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show_comment_modal: false
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
      <>
        <div className="border 2px">
          <h3 style={header_style} className="text-white py-2 pl-3 mb-0">
            ホーム
          </h3>
          <Row className="py-2 mx-0">
            <Col xs="2" className="pr-0">
              <img
                className="rounded-pill"
                src={this.props.user_data.photoURL}
                alt={this.props.user_data.photoURL}
                width="auto"
                height="80%"
              />
            </Col>
            <Col xs="10 pl-0">
              <Input onClick={this.modal_toggle} placeholder="今、何してる" />
            </Col>
          </Row>
        </div>
        <CommentModal
          modal={this.state.show_comment_modal}
          modal_toggle={this.modal_toggle}
          user_data={this.props.user_data}
        />
      </>
    );
  }
}
