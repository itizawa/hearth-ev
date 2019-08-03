import React from "react";
import { Button } from "reactstrap";

export default class TestApp extends React.Component {
  
  /**
   * コメント投稿のイベントハンドラ
   */

  onPostComment() {
    console.log("hello");
  }

  render() {
    return (
      <Button color="primary" onClick={this.onPostComment}>
        Add
      </Button>
    );
  }
}
