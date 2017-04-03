import React, {Component} from 'react'
import {Link} from 'react-router-dom'

export default class Login extends Component {
  render() {
    return (
      <div className="container section">
        <div className="columns is-centered">
          <div className="column is-3">
            <h1 className="title has-text-centered">Login</h1>
            <div className="field">
              <label className="label">Username</label>
              <p className="control">
                <input className="input" type="text"/>
              </p>
            </div>

            <div className="field">
              <label className="label">Password</label>
              <p className="control">
                <input className="input" type="password"/>
              </p>
            </div>

            <div className="field is-grouped">
              <p className="control">
                <button className="button is-primary">Login</button>
              </p>
              <p className="control">
                <Link className="button is-link" to="/signup">Sign up</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}


