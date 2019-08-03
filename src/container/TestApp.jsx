import React from "react";
import { Button, Input } from "reactstrap";

import firebase from "firebase/app";

export default class TestApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      image: ""
    };
    this.onCardChange = this.onCardChange.bind(this);
    this.onImageChange = this.onImageChange.bind(this);
    this.onPostComment = this.onPostComment.bind(this);
  }
  /**
   * カード取得ためのイベントハンドラ
   */

  onCardChange(e) {
    this.setState({
      name: e.target.value
    });
  }

  /**
   * image取得ためのイベントハンドラ
   */

  onImageChange(e) {
    this.setState({
      image: e.target.value
    });
  }

  /**
   * コメント投稿のイベントハンドラ
   */

  onPostComment() {
    const db = firebase.firestore();
    var addComment = db
      .collection("Cards")
      .add({
        card_img: this.state.image,
        card_name: this.state.name,
        hero: "druid",
        expansion: "探検同盟"
      })
      .then((ref) => {
        console.log("Added document with ID: ", ref.id);
        // IDを保存する
        db.collection("Cards")
          .doc(ref.id)
          .set({ card_id: ref.id }, { merge: true });
      });

    return Promise.all([addComment]);
  }

  render() {
    return (
      <React.Fragment>
        <Input
          onChange={this.onCardChange}
          type="textarea"
          name="text"
          id="exampleText"
          placeholder="カードの名前"
        />
        <Input
          onChange={this.onImageChange}
          type="textarea"
          name="text"
          id="exampleText"
          placeholder="カードの画像"
        />
        <Button color="primary" onClick={this.onPostComment}>
          AddCard
        </Button>
      </React.Fragment>
    );
  }
}
