import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { observer } from 'mobx-react';

@observer
export default class Signup extends Component {

  static contextTypes = {
    user: React.PropTypes.object
  }

  render() {
    let { user } = this.context

    return (
      <div className="container section">
        <div className="columns is-centered">
          <div className="column is-4">
            <h1 className="title has-text-centered">Sign Up</h1>
            <div className="field">
              <label className="label">Username</label>
              <p className="control">
                <input className="input" type="text" value={user.name} onChange={ev => user.name = ev.target.value} />
              </p>
            </div>

            <div className="field">
              <label className="label">Email</label>
              <p className="control">
                <input className="input" type="email" value={user.email} onChange={ev => user.email = ev.target.value} />
              </p>
            </div>

            <div className="field">
              <label className="label">Password</label>
              <p className="control">
                <input className="input" type="password" value={user.password} onChange={ev => user.password = ev.target.value} />
              </p>
            </div>

            <div className="field">
              <label className="label">Plan</label>
              <div className="control">
                <label className="radio">
                  <input type="radio" name="plan" value="basic" checked={user.plan == "basic"} onChange={ev => user.plan = ev.target.value}/>
                  Basic
                </label>
                <p className="help">For users with simple requirements. Only $5 per month. </p>
              </div>
            </div>

            <div className="field">
              <div className="control">
                <label className="radio">
                  <input type="radio" name="plan" value="standard" checked={user.plan == "standard"} onChange={ev => user.plan = ev.target.value}/>
                  Standard &nbsp;<span className="help is-success">Free for 7 days</span>
                </label>
                <p className="help">For ambitious users. Only $10 per month.</p>
              </div>
            </div>

            <div className="field">
              <div className="control">
                <label className="radio">
                  <input type="radio" name="plan" value="pro" checked={user.plan == "pro"} onChange={ev => user.plan = ev.target.value}/>
                  Pro
                </label>
                <p className="help">For users with exceptional requirements. Only $20 per month.</p>
              </div>
            </div>

            <div className="field">
              <label className="label">Credit Card</label>
              <p className="control">
                <input className="input" type="text" placeholder="Card number"/>
              </p>
            </div>

            <div className="field is-grouped">
              <p className="control is-expanded">
                <input className="input" type="text" placeholder="MM/YY"/>
              </p>
              <p className="control is-expanded">
                <input className="input" type="text" placeholder="CVC"/>
              </p>
            </div>


            <div className="field is-grouped">
              <p className="control">
                <button className="button is-primary">Sign up</button>
              </p>
              <p className="control">
                <Link className="button is-link" to="/login">Login</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}


