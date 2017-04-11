import React, {Component} from 'react'
import Terminal from 'xterm'
import {Helmet} from 'react-helmet'
import Term from './Term'

export default class Machine extends Component {

  static contextTypes = {
    machines: React.PropTypes.object,
  }

  render() {
    const {match} = this.props
    const machine = this.context.machines.machines.find(m => m.name == match.params.id)

    if(!machine) {
      return (
        <div className="notification is-danger">
          Machine {match.params.id} was not found
        </div>
      )
    }

    return (
      <div>
        <Helmet>
          <title>{`${match.params.id} - FastStack`}</title>
        </Helmet>
        <Term key={machine.name} machine={machine}/>
      </div>
    )
  }
}
