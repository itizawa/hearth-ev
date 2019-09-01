import React from "react";
import PropTypes from "prop-types";
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
          return <CardView key={index} card_img={card.card_img} card_id={card.card_id}/>; // imgとidは兼用
        })}
      </React.Fragment>
    );
  }
}

class CardView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      card_img: this.props.card_img || ""
    };
  }

  render() {
    return (
      <React.Fragment>
        <Col xs="6" md="3" className="text-center mt-2">
          <Link to={"/card/" + this.props.card_id}>
            <img
              src={this.state.card_img}
              alt={this.state.card_img}
              width="100%"
              height="auto"
            />
          </Link>
        </Col>
      </React.Fragment>
    );
  }
}

CardList.propTypes = {
  hero: PropTypes.string
};
