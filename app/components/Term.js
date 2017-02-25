import React, {Component} from 'react'
import ReconnectingWebSocket from 'ReconnectingWebSocket'
import Terminal from 'xterm'
import themes from '../themes'

export default class Term extends Component {

  shouldComponentUpdate() {
    return false
  }

  componentDidMount() {
    requestAnimationFrame(() => {
      let elem = document.createElement('div')
      this.base.appendChild(elem)
      var term = new Terminal()
      term.open(elem)
      term.write('Hello')
    })
  }

  render() {
    return <div ref={(base) => { this.base = base; }}></div>
  }
}
