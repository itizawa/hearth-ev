import React from "react";
import { CardImg } from "reactstrap";

import 探検同盟 from "../../asset/img/探検同盟.png";

export default class CenterContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show_comment_modal: false,
      comments: []
    };
  }

  render() {
    const header_style = {
      backgroundColor: "#00075d"
    };

    return (
      <React.Fragment>
        <div className="border 2px">
          <h3 style={header_style} className="text-white py-2 pl-3 mb-0">
            カードリスト
          </h3>
          <CardImg top width="100%" src={探検同盟} alt="Card logo" />
          {/* {this.props.focus_card.comments && //commentsが空の時でも動くように
            this.props.focus_card.comments.reverse().map((id, index) => {
              return <CardComment key={index} id={id} />;
            })} */}
        </div>
      </React.Fragment>
    );
  }
}
