import React from 'react'
import {Store} from 'redux'
import {Router as ReactRouter, Route, IndexRoute, hashHistory} from 'react-router'
import App from './App'
import Home from './Home'
import Faq from './Faq'

const Router = () =>
  <ReactRouter history={hashHistory}>
    <Route path='/' component={App}>
      <IndexRoute component={Home}/>
      <Route path='/faq' component={Faq}/>
    </Route>
  </ReactRouter>

export default Router