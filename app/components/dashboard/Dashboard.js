import React, {Component} from 'react'
import {Route, Redirect, NavLink} from 'react-router-dom'
import Create from './Create'
import Term from './Term'

export default class Dashboard extends Component {
  render() {
    let {match} = this.props

    return (
      <section className="section">
        <div className="columns">
          <div className="column is-2">
            <div className="block">
              <NavLink className="button is-primary is-fullwidth" to={`${match.url}/create`}>
                Create
              </NavLink>
            </div>
            <nav className="panel">
              <NavLink className="panel-block" to={`${match.url}/term/foo`}>
                <span className="panel-icon">
                  <i className="fl-debian"></i>
                </span>
                FooBar
              </NavLink>
              <NavLink className="panel-block" to={`${match.url}/term/foo`}>
                <span className="panel-icon">
                  <i className="fl-debian"></i>
                </span>
                FooBar
              </NavLink>
              <NavLink className="panel-block" to={`${match.url}/term/foo`}>
                <span className="panel-icon">
                  <i className="fl-debian"></i>
                </span>
                FooBar
              </NavLink>
            </nav>
          </div>
          <div className="column">
            <Redirect from={`${match.url}/`} to={`${match.url}/create`}/>
            <Route exact path={`${match.url}/create`} component={Create}/>
            <Route path={`${match.url}/term/:id`} component={Term}/>
          </div>
        </div>
      </section>
    )
  }
}
