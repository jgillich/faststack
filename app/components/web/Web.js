import React, {Component} from 'react'
import {Route, Link} from 'react-router-dom'
import Home from './Home'
import Pricing from './Pricing'
import Terms from './Terms'

export default class Web extends Component {
  render() {
    let {match} = this.props

    return (
      <div>
        <Route exact path={match.url} component={Home}/>
        <Route path={`${match.url}pricing`} component={Pricing}/>
        <Route path={`${match.url}terms`} component={Terms}/>

        <footer className="footer">
          <div className="container">
            <div className="content has-text-centered">
              <p>
                <Link to={`${match.url}terms`}>Terms of Service</Link>
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
