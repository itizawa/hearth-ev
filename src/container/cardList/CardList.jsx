import React from "react";

export default class CardList extends React.Component {
  render() {
    return (
      <React.Fragment>
        <div>{this.props.hero}</div>
      </React.Fragment>
    );
  }
}
