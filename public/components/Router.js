import React from 'react'
import {Store} from 'redux'
import {Router as ReactRouter, Route, IndexRoute} from 'react-router'
import App from './App'
import Home from './Home'

export const Router = ({history, store}) => {
  return <ReactRouter history={history}>
    <Route path='/' component={App}>
      <IndexRoute component={Home}/>
    </Route>
  </ReactRouter>
}
