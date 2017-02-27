import React, {Component} from 'react'
import {IndexRoute, Route, Link} from 'react-router'
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
              <Link className="button is-primary is-fullwidth" activeClassName="is-active" to="/new">
                New
              </Link>
            </div>
            <nav className="panel">
              <Link className="panel-block" to="/term/foo" activeClassName="is-active">
                <span className="panel-icon">
                  <i className="fl-debian"></i>
                </span>
                FooBar
              </Link>
              <Link className="panel-block" to="/term/foo" activeClassName="is-active">
                <span className="panel-icon">
                  <i className="fl-debian"></i>
                </span>
                FooBar
              </Link>
              <Link className="panel-block" to="/term/foo" activeClassName="is-active">
                <span className="panel-icon">
                  <i className="fl-debian"></i>
                </span>
                FooBar
              </Link>
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
