import React, {Component} from 'react'
import {Router, Route, IndexRoute, Link, browserHistory} from 'react-router'
import {Provider} from 'react-redux'
import ReactDOM from 'react-dom'
import Dashboard from './Dashboard'

export default class App extends Component {

  render() {
    return <div>
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
              <img src="http://bulma.io/images/jgthms.png"/>
            </figure>
            Account
          </a>

        </div>
      </nav>

      {this.props.children}
    </div>
  }
}

export function render(store) {
  const container = document.createElement('div')
  document.body.appendChild(container)

  ReactDOM.render(
    <Provider store={store}>
      <Router history={browserHistory}>
        <Route path="/" component={App}>
          <IndexRoute component={Dashboard} />
        </Route>
      </Router>
    </Provider>,
    container
  )
}