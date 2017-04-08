import React, {Component} from 'react'
import {Link, Redirect} from 'react-router-dom'
import {observer} from 'mobx-react'

@observer
export default class Login extends Component {

  static contextTypes = {
    user: React.PropTypes.object,
  }

  state = {
    redirectToReferrer: false,
    error: null,
    loading: false,
  }

  doLogin() {
    this.setState({loading: true})
    this.context.user.login().then(() => {
      this.setState({redirectToReferrer: true})
    }).catch(error => {
      this.setState({error: error.message, loading: false})
    })
  }

  render() {
    let {user} = this.context
    const { redirectToReferrer } = this.state
    const { from } = this.props.location.state || { from: { pathname: '/dashboard' } }

    if (redirectToReferrer) {
      return (
        <Redirect to={from}/>
      )
    }

    return (

      <div className="container section">
        <div className="columns is-centered">
          <div className="column is-4">
            <h1 className="title has-text-centered">Login</h1>

            <form onSubmit={e => { e.preventDefault(); this.doLogin() }}>

              <div className="field">
                <label className="label">Username</label>
                <p className="control">
                  <input className="input" type="text" value={user.name} onChange={ev => user.name = ev.target.value}/>
                </p>
              </div>

              <div className="field">
                <label className="label">Password</label>
                <p className="control">
                  <input className="input" type="password" value={user.password} onChange={ev => user.password = ev.target.value}/>
                </p>
              </div>

              <div className="field is-grouped">
                <p className="control">
                  <button className={"button is-primary " + (this.state.loading ? "is-loading" : "")}>Login</button>
                </p>
                <p className="control">
                  <Link className="button is-link" to="/signup">Sign up</Link>
                </p>
              </div>

            </form>

            <br/>

            { !this.state.error ? null :
              <div className="notification is-danger">
                {this.state.error}
              </div> }

          </div>
        </div>
      </div>
    )
  }
}


