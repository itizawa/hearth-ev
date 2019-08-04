import React from "react";
import PropTypes from "prop-types";

import CardView from "./CardView";

export default class ViewContainer extends React.Component {
  render() {

    return (
      <React.Fragment>
        <div className="bg-white border 2px shadow-sm">
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