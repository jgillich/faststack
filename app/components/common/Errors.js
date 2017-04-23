import React, {Component} from 'react'

export default class Errors extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        {this.props.errors.map((error, i) =>
          <article className="message is-danger" key={i}>
            {!error.title ? null :
            <div className="message-header">
              <p><strong>{error.title}</strong></p>
              <button className="delete"></button>
            </div>}
            <div className="message-body">
              {error.detail || error.message}
            </div>
          </article>
        )}
      </div>

    )
  }

}
