import React from "react";

export default class UserListItem extends React.Component {
  render() {
    return <div>{this.props.user_data.name}</div>;
  }
}
