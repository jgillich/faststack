import React, {Component} from 'react'
import {Route, Link} from 'react-router-dom'
import Home from './Home'
import Pricing from './Pricing'
import Terms from './Terms'
import Login from './Login'
import Signup from './Signup'

export default class Web extends Component {
  render() {
    return (
      <div>
        <Route exact path="/" component={Home}/>
        <Route path="/pricing" component={Pricing}/>
        <Route path="/terms" component={Terms}/>
        <Route path="/login" component={Login}/>
        <Route path="/signup" component={Signup}/>

        <footer className="footer">
          <div className="container">
            <div className="content has-text-centered">
              <p>
                <a href="https://status.faststack.co">Status</a>&nbsp;&nbsp;&nbsp;
                <Link to="/terms">Terms</Link>
              </p>
              <p>
                <a className="icon" href="https://github.com/faststackco/faststack">
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
