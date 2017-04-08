import React, {Component} from 'react'

export default class Input extends Component {

  constructor(props) {
    super(props)
    this.state = {
      value: props.value || "",
      valid: true,
     }
  }

  onBlur(ev) {
    if(this.props.validate(this.state.value)) {
      this.setState({valid: true})
      this.props.onValid(this.state.value)
    } else {
      this.setState({valid: false})
    }
  }

  render() {
    let {type, message, expanded, placeholder} = this.props

    return (
      <div className={'control ' + (expanded ? 'is-expanded' : '')}>
        <input className={'input ' + (this.state.valid ? '' : 'is-danger')}
          value={this.state.value} type={type || "text"}
          placeholder={placeholder}
          onChange={ev => this.setState({value: ev.target.value})}
          onBlur={ev => this.onBlur(ev)}/>
          {!message ? null : this.state.valid ? null :
            <p className="help is-danger">{message}</p>
          }
      </div>

    )
  }

}
