import React, {Component} from 'react'
import {BrowserRouter, Route, Link, NavLink, Switch} from 'react-router-dom'
import ReactDOM from 'react-dom'
import {observer} from 'mobx-react'
import md5 from 'md5'
import {Helmet} from 'react-helmet'
import PropTypes from 'prop-types'
import ScrollToTop from './common/ScrollToTop'
import Dashboard from './dashboard/Dashboard'
import Web from './web/Web'
import Help from './help/Help'
import User from '../stores/User'

const user = new User()

@observer
export default class App extends Component {

  static childContextTypes = {
    user: PropTypes.object,
  }

  getChildContext() {
    return {user}
  }

  render() {
    return (
      <BrowserRouter>
        <div>
          <ScrollToTop/>
          <Helmet>
              <title>FastStack</title>
          </Helmet>

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

              {!user.loggedIn ?
              <NavLink className="nav-item is-tab" to="/pricing">
                Pricing
              </NavLink> : null}

              <span className="nav-item">
                {!user.loggedIn ?
                <Link className="button is-primary" to="/login">
                  <span>Login</span>
                </Link> : null}

                {!user.loggedIn ?<Link className="button is-primary is-inverted" to="/signup">
                  <span>Sign Up</span>
                </Link> : null}

                {user.loggedIn ?
                <Link to="/dashboard">
                  <span className="icon"><img src={`https://www.gravatar.com/avatar/${md5(user.email)}?d=retro`}/></span>
                  &nbsp;
                  <span>{user.name}</span>
                </Link> : null}

              </span>

            </div>
          </nav>
          <Switch>
            <Route path="/dashboard" component={Dashboard}/>
            <Route path="/help" component={Help}/>
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
