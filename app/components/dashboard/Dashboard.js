import React, {Component} from 'react'
import {IndexRoute, Route, Link} from 'react-router'
import Create from './Create'
import Term from './Term'

export class Dashboard extends Component {
  render({children}) {
    return (
      <section class="section">
        <div class="columns">
          <div class="column is-2">
            <div class="block">
              <Link class="button is-primary is-outlined is-fullwidth" activeClassName="is-active" to="/new">
                New
              </Link>
            </div>
            <nav class="panel">
              <Link class="panel-block" to="/term/foo" activeClassName="is-active">
                <span class="panel-icon">
                  <i class="fl-debian"></i>
                </span>
                FooBar
              </Link>
              <Link class="panel-block" to="/term/foo" activeClassName="is-active">
                <span class="panel-icon">
                  <i class="fl-debian"></i>
                </span>
                FooBar
              </Link>
              <Link class="panel-block" to="/term/foo" activeClassName="is-active">
                <span class="panel-icon">
                  <i class="fl-debian"></i>
                </span>
                FooBar
              </Link>
            </nav>
          </div>
          <div class="column">
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