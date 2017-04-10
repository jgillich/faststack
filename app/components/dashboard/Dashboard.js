import React, {Component} from 'react'
import {Route, Redirect, NavLink} from 'react-router-dom'
import {observer} from 'mobx-react'
import {Helmet} from 'react-helmet'
import Create from './Create'
import Term from './Term'
import Machines from '../../stores/Machines'

@observer
export default class Dashboard extends Component {

  static contextTypes = {
    user: React.PropTypes.object,
  }

  static childContextTypes = {
    machines: React.PropTypes.object,
  }

  getChildContext() {
    return {machines: this.machines}
  }

  componentWillMount() {
    this.machines = new Machines(this.context.user.token)
  }

  render() {
    let {match} = this.props

    return (
      <section className="section">
        <Helmet>
          <title>Dashboard - FastStack</title>
        </Helmet>

        <div className="columns">
          <div className="column is-2">
            <div className="block">
              <NavLink className="button is-primary is-fullwidth" to={`${match.url}/create`}>
                Create
              </NavLink>
            </div>
            <nav className="panel">
              {this.machines.machines.map(machine =>
                <NavLink key={machine.name} className="panel-block"
                  to={`${match.url}/term/${machine.name}`}>
                  <span className="panel-icon">
                    <i className="fl-debian"></i>
                  </span>
                  {machine.name}
                </NavLink>
              )}
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
