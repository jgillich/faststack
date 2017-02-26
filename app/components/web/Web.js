import React, {Component} from 'react'
import {IndexRoute, Route, Link} from 'react-router'
import Home from './Home'
import Pricing from './Pricing'
import Terms from './Terms'

export default class Web extends Component {
  render({children}) {
    return (
      <div>
        {children}

        <footer class="footer">
          <div class="container">
            <div class="content has-text-centered">
              <p>
                <Link to="/terms">Terms of Service</Link>
              </p>
              <p>
                <a class="icon" href="https://github.com/termbox">
                  <i class="fa fa-github"></i>
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
