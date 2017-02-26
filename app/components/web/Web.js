import React, {Component} from 'react'
import {IndexRoute, Route, Link} from 'react-router'
import Home from './Home'
import Pricing from './Pricing'

export default class Web extends Component {
  render({children}) {
    return (
      <div>{children}</div>
    )
  }
}

export const WebRoute = (
  <Route component={Web}>
    <IndexRoute component={Home}/>
    <Route path='/pricing' component={Pricing}/>
  </Route>
)