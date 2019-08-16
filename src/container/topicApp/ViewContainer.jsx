import React from "react";

import HotUserBox from "../../components/hotLists/HotUserBox";

export default class ViewContainer extends React.Component {
  render() {
    return (
      <React.Fragment>
        <HotUserBox />
      </React.Fragment>
    );
  }
}

ViewContainer.propTypes = {};
