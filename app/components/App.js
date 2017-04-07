import React, {Component} from 'react'
import {BrowserRouter, Route, Link, NavLink, Switch} from 'react-router-dom'
import ReactDOM from 'react-dom'
import Dashboard from './dashboard/Dashboard'
import Web from './web/Web'
import User from '../stores/User'

const user = new User()

export default class App extends Component {

  static childContextTypes = {
    user: React.PropTypes.object,
  }

  getChildContext() {
    return {user}
  }

  render() {
    return (
      <BrowserRouter>
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
                <Link className="button" to="/login">
                  <span>Login</span>
                </Link>

                <Link className="button is-primary" to="/signup">
                  <span>Sign Up</span>
                </Link>
              </span>

            </div>
          </nav>
          <Switch>
            <Route path="/dashboard" component={Dashboard}/>
            <Route path="/" component={Web}/>
          </Switch>
        </div>
      </BrowserRouter>
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
