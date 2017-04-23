import React, {Component} from 'react'
import {Route, Redirect, Switch, NavLink} from 'react-router-dom'
import {observer} from 'mobx-react'
import {Helmet} from 'react-helmet'
import PropTypes from 'prop-types'
import Create from './Create'
import Machine from './Machine'
import Machines from '../../stores/Machines'

@observer
export default class Dashboard extends Component {

  static contextTypes = {
    user: PropTypes.object,
  }

  static childContextTypes = {
    machines: PropTypes.object,
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
              {this.machines.map((machine) =>
                <NavLink key={machine.name} className="panel-block"
                  to={`${match.url}/machine/${machine.name}`}>
                  <span className="panel-icon">
                    <i className="fl-debian"></i>
                  </span>
                  {machine.name}
                </NavLink>
              )}
            </nav>
          </div>
          <div className="column">
            <Switch>
              <Route exact path={`${match.url}/create`} component={Create}/>
              <Route path={`${match.url}/machine/:name`}
                render={(props) => <Machine key={props.match.params.name} {...props}/>}/>
              <Redirect from={`${match.url}/`} to={`${match.url}/create`}/>
            </Switch>
          </div>
        </div>
      </section>
    )
  }
}
