import React, {Component} from 'react'
import Terminal from 'xterm'
import {Helmet} from 'react-helmet'
import screenfull from 'screenfull'

export default class Machine extends Component {

  static contextTypes = {
    machines: React.PropTypes.object,
  }

  toggleFullscreen() {
    if(!screenfull.isFullscreen) {
      this.cardEl.style.height = '100%'
      this.cardEl.style.width = '100%'
    } else {
      this.cardEl.style.height = '80vh'
      this.cardEl.style.width = 'auto'
    }
    screenfull.toggle(this.cardEl)
    this.terminal.focus()
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
        terminal.focus()
        this.terminal = terminal
      })
      .catch(console.log)

    return (
      <div>
        <Helmet>
          <title>{`${machine.name} - FastStack`}</title>
        </Helmet>
        <div className="card"  ref={(el) => {this.cardEl = el}} style={{display: "flex", flexDirection: "column", height: '80vh'}}>
          <header className="card-header">
            <p className="card-header-title">
              {machine.name} ({machine.image})
            </p>
            <a className="card-header-icon">
              <span className="icon"><i className="fa fa-trash"></i></span>
            </a>
            { !screenfull.enabled ? null :
            <a className="card-header-icon" onClick={() => this.toggleFullscreen()}>
              <span className="icon"><i className="fa fa-arrows-alt"></i></span>
            </a> }
          </header>
          <div className="card-content" style={{display: "flex", flex: "1", backgroundColor: "#000"}} ref={(el) => {this.termEl = el}}/>
        </div>

      </div>
    )
  }
}
