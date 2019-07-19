import React from "react";
import { Input } from "reactstrap";

export default class PostContainer extends React.Component {
  render() {
    const header_style = {
      backgroundColor: "#00075d"
    };

    return (
      <div className="border 2px">
        <h3 style={header_style} className="text-white py-2 pl-3 mb-0">
          ホーム
        </h3>
        <div className="d-flex py-1">
          <img
            className="ml-2 my-auto rounded-pill"
            src={this.props.user_data.photoURL}
            alt={this.props.user_data.photoURL}
            width="35px"
            height="35px"
          />
          <Input className="col-10 ml-2" placeholder="今、何してる" />
        </div>
      </div>
    );
  }
}
