import React, {Component} from 'react'
import classNames from 'classnames'


function make(s) {
 return class Class extends Component {
    render() {
      let props = {...this.props, className: classNames(s.className, this.props.className)}

      return React.createElement(s.el, props, props.children)
    }
  }
}

export const Button = make({className: 'button is-primary', el: 'button'})
