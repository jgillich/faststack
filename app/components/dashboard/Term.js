import React, {Component} from 'react'
import Terminal from 'xterm'

export default class Term extends Component {

  shouldComponentUpdate() {
    return false
  }

  componentDidMount() {
    requestAnimationFrame(() => {
      let elem = document.createElement('div')
      elem.className = 'grow'
      this.base.appendChild(elem)
      let term = new Terminal()
      term.open(elem)
      term.write('Hello')
    })
  }

  render() {
    return (
      <div className="grow" ref={(base) => {
this.base = base
}}>
      </div>
    )
  }
}
