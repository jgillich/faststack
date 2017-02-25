import React, {Component} from 'react'
import {Router, Route, IndexRoute, Link, browserHistory} from 'react-router'
import {Provider} from 'react-redux'
import ReactDOM from 'react-dom'
import {DashboardRoute} from './dashboard/Dashboard'

export default class App extends Component {

  render({children}) {
    return (
      <div class="grow">
        <nav class="nav has-shadow">
          <div class="nav-left">
            <Link class="nav-item is-brand" href="/">
              <img src="/app/assets/logo.png" alt="termbox logo"/>
            </Link>
          </div>

          <span class="nav-toggle">
            <span></span>
            <span></span>
            <span></span>
          </span>

          <div class="nav-right nav-menu">
            <a class="nav-item is-tab is-active">
              Boxes
            </a>
            <a class="nav-item is-tab">
              <figure class="image is-16x16">
                <img src=""/>
              </figure>
              Account
            </a>

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
        </Route>
      </Router>
    </Provider>,
    container
  )
}
