import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import {observer} from 'mobx-react'
import validator from 'validator'
import Input from '../common/Input'

@observer
export default class Signup extends Component {

  state = {
    number: null,
    cvc: null,
    exp_month: null,
    exp_year: null,
  }

  static contextTypes = {
    user: React.PropTypes.object
  }

  doSignup() {
  }

  render() {
    let {user} = this.context

    return (
      <div className="container section">
        <div className="columns is-centered">
          <div className="column is-4">
            <h1 className="title has-text-centered">Sign Up</h1>

            <div className="field">
              <label className="label">Username</label>
              <Input onValid={v => user.name = v}
                validate={v => validator.isAlphanumeric(v) && validator.isLength(v, {min:4, max: 20})}
                message="Must be alphanumeric and between 4 and 20 characters"/>
            </div>

            <div className="field">
              <label className="label">Email</label>
              <Input onValid={v => user.email = v}
                validate={v => validator.isEmail(v)}
                message="Must be valid email address"/>
            </div>

            <div className="field">
              <label className="label">Password</label>
              <Input onValid={v => user.password = v} type="password"
                validate={v => validator.isLength(v, {min: 8, max: 40})}
                message="Must be between 8 and 40 characters"/>
            </div>

            <div className="field">
              <label className="label">Plan</label>
              <div className="control">
                <label className="radio">
                  <input type="radio" name="plan" value="basic" checked={user.plan == "basic"} onChange={ev => user.plan = ev.target.value}/>
                  Basic
                </label>
                <p className="help">For users with simple needs. Only $5 per month. </p>
              </div>
            </div>

            <div className="field">
              <div className="control">
                <label className="radio">
                  <input type="radio" name="plan" value="standard" checked={user.plan == "standard"} onChange={ev => user.plan = ev.target.value}/>
                  Standard &nbsp;<span className="help is-primary">Free for 7 days</span>
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
              <Input onValid={v => this.setState({cc:{number:v}})}
                validate={v => validator.isCreditCard(v)}
                message="Must be valid credit card number"/>
            </div>

            <div className="field is-grouped">
              <Input expanded="true" onValid={v => this.setState({cc: {number: v}})}
                validate={v => false} placeholder="MM/YY"
                message="Must be expiry date in the form MM/YY"/>
              <Input expanded="true" onValid={v => this.setState({cvc: v})}
                validate={v => false} placeholder="CVC"
                message="Must be 3 character card security code"/>
            </div>

            <div className="field is-grouped">
              <p className="control">
                <button className="button is-primary" onClick={() => this.doSignup()}>Sign up</button>
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


