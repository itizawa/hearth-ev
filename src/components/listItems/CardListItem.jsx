import React from "react";
import { Row, Col } from "reactstrap";
import { Link } from "react-router-dom";

export default class CardListItem extends React.Component {
  render() {
    const chat_style = {
      fontSize: "24px"
    };

    const { card_data } = this.props;
    return (
      <Row className="mx-0 py-2 px-2 border-top">
        <Col xs="10" className="px-0">
          <h6 className="mb-0">
            <Link to={"/card/" + card_data.card_id}>
              <strong className="text-body">{card_data.card_name}</strong>
              <span>
                <i className="material-icons ml-1" style={chat_style}>
                  chat
                </i>
                {card_data.comments}
              </span>
              <span className="text-muted">
                <i className="material-icons ml-1" style={chat_style}>
                  schedule
                </i>
                {card_data.update_at}
              </span>
            </Link>
          </h6>
        </Col>
      </Row>
    );
  }
}
