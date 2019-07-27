import React from "react";
import { Col } from "reactstrap";
import { Link } from "react-router-dom";

import firebase from "firebase/app";

export default class CardList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: []
    };

    this.fetchHeroComment();
  }

  /**
   * データを取得するイベントハンドラ
   */

  fetchHeroComment = function() {
    var cards = [];
    const db = firebase.firestore();
    db.collection("Cards")
      .where("hero", "==", this.props.hero)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          cards.push(doc.data());
        });
        this.setState({ cards: cards });
      })
      .catch(function(error) {
        console.log("Error getting documents: ", error);
      });

    return Promise.all([db]);
  };

  render() {
    return (
      <React.Fragment>
        {this.state.cards.map((card, index) => {
          return <CardView key={index} card_id={card.img} />; // imgとidは兼用
        })}
      </React.Fragment>
    );
  }
}

class CardView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      card_image: "",
      card_id: this.props.card_id || ""
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
    return (
      <React.Fragment>
        <Col sm="6" className="text-center mt-2">
          <Link to={"/card/" + this.props.card_id}>
            <img
              src={this.state.card_image}
              alt={this.state.card_image}
              width="80%"
              height="auto"
            />
          </Link>
        </Col>
      </React.Fragment>
    );
  }
}
