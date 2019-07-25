import React from "react";

import CardView from "./CardView";

export default class ViewContainer extends React.Component {
  render() {

    return (
      <React.Fragment>
        <div className="border 2px">
          <CardView focus_card={this.props.focus_card}/>
        </div>
      </React.Fragment>
    );
  }
}
