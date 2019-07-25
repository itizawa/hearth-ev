import React from "react";

import CardView from "./CardView";

export default class Sidebar extends React.Component {
  render() {

    return (
      <React.Fragment>
        <div className="border 2px">
          <CardView />

        </div>
      </React.Fragment>
    );
  }
}
