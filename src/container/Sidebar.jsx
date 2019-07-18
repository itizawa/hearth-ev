import React from "react";

// componentsのインポート
import UserCard from "../components/UserCard"

export default class Sidebar extends React.Component {
  render() {
    return (
      <React.Fragment>
        <UserCard user_data={this.props.user_data}/>
      </React.Fragment>
    );
  }
}
