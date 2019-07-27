import React from "react";

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
      .where("hero", "==", "druid")
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
          return <div key={index}>{card.name}</div>;
        })}
      </React.Fragment>
    );
  }
}
