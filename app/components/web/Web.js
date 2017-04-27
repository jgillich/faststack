import React, {Component} from 'react'
import {Route, Link} from 'react-router-dom'
import Footer from '../common/Footer'
import Home from './Home'
import Pricing from './Pricing'
import Terms from './Terms'
import Login from './Login'
import Signup from './Signup'

export default class Web extends Component {
  render() {
    return (
      <div>
        <Route exact path="/" component={Home}/>
        <Route path="/pricing" component={Pricing}/>
        <Route path="/terms" component={Terms}/>
        <Route path="/login" component={Login}/>
        <Route path="/signup" component={Signup}/>
        <Footer/>
      </div>
    )
  }
}
