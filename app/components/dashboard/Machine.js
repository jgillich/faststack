import React, {Component} from 'react'
import Terminal from 'xterm'
import {Helmet} from 'react-helmet'
import screenfull from 'screenfull'

export default class Machine extends Component {

  static contextTypes = {
    machines: React.PropTypes.object,
  }

  render() {
    const {match} = this.props
    const machine  = this.context.machines.find(match.params.name)

    if(!machine) {
      return (
        <div className="notification is-danger">
          Machine {match.params.name} was not found
        </div>
      )
    }

    this.context.machines.exec(machine.name)
      .then(terminal => {
        terminal.mount(this.termEl)
        window.termEl = this.termEl
      })
      .catch(console.log)

    return (
      <div>
        <Helmet>
          <title>{`${machine.name} - FastStack`}</title>
        </Helmet>
        <div className="card"  ref={(el) => {this.cardEl = el}}>
          <header className="card-header">
            <p className="card-header-title">
              {machine.name} ({machine.image})
            </p>
            <a className="card-header-icon">
              <span className="icon"><i className="fa fa-trash"></i></span>
            </a>
            { !screenfull.enabled ? null :
            <a className="card-header-icon" onClick={() => screenfull.request(this.cardEl)}>
              <span className="icon"><i className="fa fa-arrows-alt"></i></span>
            </a> }
          </header>
          <div className="card-content" style={{padding: "0"}}>
            <div ref={(el) => {this.termEl = el}}></div>
          </div>
        </div>

      </div>
    )
  }
}
