import React, {Component} from 'react'
import {IndexRoute, Route} from 'react-router'
import NavLink from '../common/NavLink'
import Create from './Create'
import Term from './Term'

export class Dashboard extends Component {
  render() {
    let {children} = this.props

    return (
      <section className="section">
        <div className="columns">
          <div className="column is-2">
            <div className="block">
              <NavLink className="button is-primary is-fullwidth" to="/new">
                New
              </NavLink>
            </div>
            <nav className="panel">
              <NavLink className="panel-block" to="/term/foo">
                <span className="panel-icon">
                  <i className="fl-debian"></i>
                </span>
                FooBar
              </NavLink>
              <NavLink className="panel-block" to="/term/foo">
                <span className="panel-icon">
                  <i className="fl-debian"></i>
                </span>
                FooBar
              </NavLink>
              <NavLink className="panel-block" to="/term/foo">
                <span className="panel-icon">
                  <i className="fl-debian"></i>
                </span>
                FooBar
              </NavLink>
            </nav>
          </div>
          <div className="column">
            {children}
          </div>
        </div>
      </section>
    )
  }
}

export default Dashboard

export const DashboardRoute = (
  <Route path='dashboard' component={Dashboard}>
    <IndexRoute component={Create}/>
    <Route path='/new' component={Create}/>
    <Route path="/term/:id" component={Term}/>
  </Route>
)
