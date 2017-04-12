import React, {Component} from 'react'

export default class Term extends Component {

  static contextTypes = {
    machines: React.PropTypes.object,
  }

  shouldComponentUpdate() {
    return false
  }

  componentDidMount() {
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

    this.context.machines.exec(this.props.machine.name)
      .then(terminal => {
        terminal.mount(elem)
      })
      .catch(console.log)
  }

  render() {
    const {match, machine} = this.props

    return (
      <div ref={(base) => {this.base = base}}>
      </div>
    )
  }
}
