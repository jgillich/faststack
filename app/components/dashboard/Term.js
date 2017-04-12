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
