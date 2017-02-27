import React, {Component} from 'react'
import {Router, Route, Link, browserHistory} from 'react-router'
import ReactDOM from 'react-dom'
import auth from '../auth'
import {DashboardRoute} from './dashboard/Dashboard'
import {WebRoute} from './web/Web'
import NotFound from './NotFound'

const requireAuth = (nextState, replace) => {
  if (!auth.loggedIn()) {
    replace({pathname: '/login'})
  }
}

export default class App extends Component {
  render() {
    let {children} = this.props

    return (
      <div className="grow">
        <nav className="nav">
          <div className="nav-left">
            <Link className="nav-item is-brand" to="/">
              <img src="/app/assets/logo.png" alt="termbox logo"/>
            </Link>
          </div>

          <span className="nav-toggle">
            <span></span>
            <span></span>
            <span></span>
          </span>

          <div className="nav-right nav-menu">

            <Link className="nav-item is-tab" to="/help" activeClassName="is-active">
              Help
            </Link>

            <Link className="nav-item is-tab" to="/pricing" activeClassName="is-active">
              Pricing
            </Link>

            <span className="nav-item">
              <a className="button" onClick={auth.login.bind(auth)}>
                <span>Login</span>
              </a>

              <a className="button is-primary" onClick={auth.signUp.bind(auth)}>
                <span>Sign Up</span>
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
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        {DashboardRoute}
        {WebRoute}
        <Route path="*" component={NotFound}/>
      </Route>
    </Router>,
    container
  )
}
