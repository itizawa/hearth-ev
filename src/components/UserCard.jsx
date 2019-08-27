import React from 'react'
import logo from '../asset/img/logo.png'
import { Card, CardImg, CardBody, CardTitle } from 'reactstrap'

export default class Sidebar extends React.Component {
  render () {
    const photo_style = {
      float: 'right',
      transform: 'translate(10px, -60%)'
    }

    return (
      <Card>
        <CardImg top width='100%' src={logo} alt='Card logo' />

        <CardBody>
          <img width='40%' style={photo_style} className='rounded-pill border border-secondary' src={this.props.user_data.photoURL} alt='Card logo' />
          <CardTitle><h2>{this.props.user_data.displayName}</h2></CardTitle>
        </CardBody>
      </Card>
    )
  }
}
