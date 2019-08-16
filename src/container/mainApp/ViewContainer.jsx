import React from "react";

import HotUserBox from "../../components/hotLists/HotUserBox";
import HotTopicBox from "../../components/hotLists/HotTopicBox";

export default class ViewContainer extends React.Component {
  render() {
    return (
      <React.Fragment>
        <HotUserBox />
        <HotTopicBox />
      </React.Fragment>
    );
  }
}

ViewContainer.propTypes = {};
