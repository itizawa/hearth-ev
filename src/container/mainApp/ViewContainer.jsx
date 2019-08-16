import React from "react";

import HotUserBox from "../../components/hotLists/HotUserBox";
import HotTopicBox from "../../components/hotLists/HotTopicBox";
import HotCardBox from "../../components/hotLists/HotCardBox";

export default class ViewContainer extends React.Component {
  render() {
    return (
      <React.Fragment>
        <HotUserBox />
        <HotTopicBox />
        <HotCardBox />
      </React.Fragment>
    );
  }
}

ViewContainer.propTypes = {};
