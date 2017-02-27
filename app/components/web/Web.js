import React, {Component} from 'react'
import {IndexRoute, Route, Link} from 'react-router'
import Home from './Home'
import Pricing from './Pricing'
import Terms from './Terms'

export default class Web extends Component {
  render() {
    let {children} = this.props

    return (
      <div>
        {children}

        <footer className="footer">
          <div className="container">
            <div className="content has-text-centered">
              <p>
                <Link to="/terms">Terms of Service</Link>
              </p>
              <p>
                <a className="icon" href="https://github.com/termbox">
                  <i className="fa fa-github"></i>
                </a>
              </p>
            </div>
          </div>
        </footer>

      </div>
    )
  }
}

export const WebRoute = (
  <Route component={Web}>
    <IndexRoute component={Home}/>
    <Route path='/pricing' component={Pricing}/>
    <Route path='/terms' component={Terms}/>
  </Route>
)
