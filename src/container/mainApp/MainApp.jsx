import React from "react";


export default class MainApp extends React.Component {
  render(){
    return(
      <div>{this.props.user_data.displayName}</div>
    )
  }
}