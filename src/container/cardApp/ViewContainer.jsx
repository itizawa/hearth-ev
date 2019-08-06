import React from "react";
import PropTypes from "prop-types";

import CardView from "./CardView";

export default class ViewContainer extends React.Component {
  render() {
    const header_style = {
      backgroundColor: "#00075d"
    };
    return (
      <React.Fragment>
        <div className="bg-white border 2px shadow-sm">
        <h3 style={header_style} className="text-white py-2 pl-3 mb-0">
            {this.props.focus_card.card_name}
          </h3>
          <CardView focus_card={this.props.focus_card}/>
        </div>
      </React.Fragment>
    );
  }
}

ViewContainer.propTypes={
  user_data:PropTypes.object,
  focus_user:PropTypes.object
}