import React from "react";

import firebase from "firebase/app";

export default class CardView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      card_image: ""
    };

    this.fetchCardImage();
  }

  /**
   * カード画像の取得
   */

  fetchCardImage() {
    var storageRef = firebase.storage().ref();
    var spaceRef = storageRef.child(`card/${this.props.focus_card.id}.png`);

    spaceRef.getDownloadURL().then((url) => {
      this.setState({ card_image: url });
    });
  }

  render() {
    return (
      <React.Fragment>
        <img
          src={this.state.card_image}
          alt={this.state.card_image}
          width="80%"
          height="auto"
        />
      </React.Fragment>
    );
  }
}
