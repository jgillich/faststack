import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {observer} from 'mobx-react';

@observer
export default class Login extends Component {

  static contextTypes = {
    user: React.PropTypes.object
  }

  render() {
    let {user} = this.context

    return (
      <div className="container section">
        <div className="columns is-centered">
          <div className="column is-3">
            <h1 className="title has-text-centered">Login</h1>
            <div className="field">
              <label className="label">Username</label>
              <p className="control">
                <input className="input" type="text" onChange={ev => user.name = ev.target.value}/>
              </p>
            </div>

            <div className="field">
              <label className="label">Password</label>
              <p className="control">
                <input className="input" type="password" onChange={ev => user.password = ev.target.value}/>
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


