import React, {Component} from 'react'
import Terminal from 'xterm'
import {Helmet} from 'react-helmet'

export default class Term extends Component {

  shouldComponentUpdate() {
    return false
  }

  componentDidMount() {
    requestAnimationFrame(() => {
      let elem = document.createElement('div')
      this.base.appendChild(elem)

      // This is a hack.
      // Unfortunately, CSS does not allow us to select parents and we really don't want to set
      // height manually for every parent, so we just iterate through all parents.
      let parent = elem
      while(parent != null) {
        parent.style.height = '100%'
        parent = parent.parentElement
      }

      let term = new Terminal()
      term.open(elem)
      term.write('Hello')
    })
  }

  render() {
    return (
      <div ref={(base) => {this.base = base}}>
        <Helmet>
          <title>TODO_MACHINE_NAME - FastStack</title>
        </Helmet>

      </div>
    )
  }
}
