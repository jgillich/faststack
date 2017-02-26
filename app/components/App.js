import React, {Component} from 'react'
import {Router, Route, IndexRoute, Link, browserHistory} from 'react-router'
import {Provider} from 'react-redux'
import ReactDOM from 'react-dom'
import {DashboardRoute} from './dashboard/Dashboard'
import {WebRoute} from './web/Web'

export default class App extends Component {

  render({children}) {
    return (
      <div class="grow">
        <nav class="nav">
          <div class="nav-left">
            <Link class="nav-item is-brand" to="/">
              <img src="/app/assets/logo.png" alt="termbox logo"/>
            </Link>
          </div>

          <span class="nav-toggle">
            <span></span>
            <span></span>
            <span></span>
          </span>

          <div class="nav-right nav-menu">

            <Link class="nav-item is-tab" to="/help" activeClassName="is-active">
              Help
            </Link>

            <Link class="nav-item is-tab" to="/pricing" activeClassName="is-active">
              Pricing
            </Link>

            <span class="nav-item">
              <a class="button" >
                <span class="icon">
                  <i class="fa fa-twitter"></i>
                </span>
                <span>Login</span>
              </a>
            </span>

          </div>
        </nav>

        {children}
      </div>
    )
  }
}

export function render(store) {
  const container = document.createElement('div')
  container.className = 'grow'
  container.id = 'main'
  document.body.appendChild(container)

  ReactDOM.render(
    <Provider store={store}>
      <Router history={browserHistory}>
        <Route path="/" component={App}>
          {DashboardRoute}
          {WebRoute}
        </Route>
      </Router>
    </Provider>,
    container
  )
}
