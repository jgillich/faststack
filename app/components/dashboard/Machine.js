import React, {Component} from 'react'
import {Redirect} from 'react-router-dom'
import {Helmet} from 'react-helmet'
import PropTypes from 'prop-types'
import screenfull from 'screenfull'

export default class Machine extends Component {

  static contextTypes = {
    machines: PropTypes.object,
  }

  state = {
    deleted: false,
  }

  toggleFullscreen() {
    if(!screenfull.isFullscreen) {
      this.cardEl.style.height = '100%'
      this.cardEl.style.width = '100%'
    } else {
      this.cardEl.style.height = '85vh'
      this.cardEl.style.width = 'auto'
    }
    screenfull.toggle(this.cardEl)
    this.terminal.focus()
  }

  delete() {
    this.context.machines.delete(this.props.match.params.name)
      .then(() => {
        this.setState({deleted: true})
      })
      .catch((error) => this.setState({error: error.message}))
  }

  render() {
    const {error, deleted} = this.state
    const {match} = this.props
    const machine = this.context.machines.name(match.params.name)

    if(deleted) {
      return (
        <Redirect to="/dashboard"/>
      )
    }

    if(error) {
      return (
        <div className="notification is-danger">
          {error}
        </div>
      )
    }

    if(!machine) {
      return (
        <div className="notification is-danger">
          Machine {match.params.name} was not found
        </div>
      )
    }

    this.context.machines.exec(machine.name)
      .then((terminal) => {
        terminal.mount(this.termEl)
        terminal.focus()
        this.terminal = terminal
      })
      .catch((error) => this.setState({error: error.message}))

    return (
      <div>
        <Helmet>
          <title>{`${machine.name} - FastStack`}</title>
        </Helmet>
        <div className="card" ref={(el) => {
this.cardEl = el
}} style={{display: 'flex', flexDirection: 'column', height: '85vh'}}>
          <header className="card-header">
            <p className="card-header-title">
              {machine.name} ({machine.image})
            </p>
            <a className="card-header-icon">
              <span className="icon">
                <i className="fa fa-trash" onClick={() => this.delete()}></i>
              </span>
            </a>
            { !screenfull.enabled ? null :
            <a className="card-header-icon" onClick={() => this.toggleFullscreen()}>
              <span className="icon"><i className="fa fa-arrows-alt"></i></span>
            </a> }
          </header>
          <div className="card-content"
            style={{display: 'flex', flex: '1', backgroundColor: '#000'}}
            ref={(el) => this.termEl = el}/>
        </div>

      </div>
    )
  }
}
