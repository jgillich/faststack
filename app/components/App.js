import React, {Component} from 'react'
import {BrowserRouter as Router, Route, Link, NavLink, Switch} from 'react-router-dom'
import ReactDOM from 'react-dom'
import auth from '../auth'
import Dashboard from './dashboard/Dashboard'
import Web from './web/Web'

/* const requireAuth = (nextState, replace) => {
  if (!auth.loggedIn()) {
    replace({pathname: '/login'})
  }
}*/

export default class App extends Component {
  render() {
    return (
      <Router>
        <div>
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

              <NavLink className="nav-item is-tab" to="/help">
                Help
              </NavLink>

              <NavLink className="nav-item is-tab" to="/pricing">
                Pricing
              </NavLink>

              <span className="nav-item">
                <a className="button" onClick={() => auth.login()}>
                  <span>Login</span>
                </a>

                <a className="button is-primary" onClick={() => auth.signUp()}>
                  <span>Sign Up</span>
                </a>
              </span>

            </div>
          </nav>
          <Switch>
            <Route path="/dashboard" component={Dashboard}/>
            <Route path="/" component={Web}/>
          </Switch>
        </div>
      </Router>
    )
  }
}

export function render(store) {
  const container = document.createElement('div')
  document.body.appendChild(container)

  ReactDOM.render(
    <App/>,
    container
  )
}
