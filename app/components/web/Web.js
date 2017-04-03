import React, {Component} from 'react'
import {Route, Link} from 'react-router-dom'
import Home from './Home'
import Pricing from './Pricing'
import Terms from './Terms'
import Login from './Login'

export default class Web extends Component {
  render() {
    let {match} = this.props

    return (
      <div>
        <Route exact path={match.url} component={Home}/>
        <Route path={`${match.url}pricing`} component={Pricing}/>
        <Route path={`${match.url}terms`} component={Terms}/>
        <Route path={`${match.url}login`} component={Login}/>

        <footer className="footer">
          <div className="container">
            <div className="content has-text-centered">
              <p>
                <a href="https://status.faststack.co">Status</a>&nbsp;&nbsp;&nbsp;
                <Link to={`${match.url}terms`}>Terms</Link>
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
