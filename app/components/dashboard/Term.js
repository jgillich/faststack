import React, {Component} from 'react'
import Terminal from 'xterm'

export default class Term extends Component {

  static contextTypes = {
    machines: React.PropTypes.object,
  }

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
      /*let parent = elem
      while(parent != null) {
        parent.style.height = '100%'
        parent = parent.parentElement
      }*/

      let term = new Terminal()
      term.open(elem)

      this.context.machines.exec(this.props.machine.name)
        .then(ws => {
          ws.io.addEventListener('message', (m) => term.write(m.data))
          term.on('data', ws.io.send)
        })
        .catch(err => alert(err.message))
    })
  }

  connect() {

  }


  render() {
    const {match, machine} = this.props

    return (
      <div ref={(base) => {this.base = base}}>
      </div>
    )
  }
}
