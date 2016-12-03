import React from 'react'
import {Store} from 'redux'
import {Router as ReactRouter, Route, IndexRoute, hashHistory} from 'react-router'
import App from './App'
import {LaunchContainer} from './Launch'
import Faq from './Faq'
import Term from './Term'

const Router = () =>
  <ReactRouter history={hashHistory}>
    <Route path='/' component={App}>
      <IndexRoute component={LaunchContainer}/>
      <Route path='/faq' component={Faq}/>
      <Route path='/term/:podId' component={Term}/>
    </Route>
  </ReactRouter>

export default Router