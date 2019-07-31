import React from "react";
import PropTypes from "prop-types";

import firebase from "firebase/app";

export default class CardView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      card_image: "",
      card_id: this.props.focus_card.id || ""
    };

    this.fetchCardImage();
  }

  /**
   * カード画像の取得
   */

  fetchCardImage() {
    var storageRef = firebase.storage().ref();
    var spaceRef = storageRef.child(`card/${this.state.card_id}.png`); //imgとidは兼用

    spaceRef.getDownloadURL().then((url) => {
      this.setState({ card_image: url });
    });
  }

  render() {
    const img_frame = {
      height: "700px",
      padding: "5% 10%"
    };
    return (
      <React.Fragment>
        <div style={img_frame}>
          <img
            src={this.state.card_image}
            alt={this.state.card_image}
            width="100%"
            height="auto"
          />
        </div>
      </React.Fragment>
    );
  }
}

CardView.propTypes = {
  focus_card: PropTypes.object
};
