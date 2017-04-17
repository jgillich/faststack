import React, {Component} from 'react'
import {Link, Redirect} from 'react-router-dom'
import {observer} from 'mobx-react'
import {Helmet} from 'react-helmet'
import {Button} from '../common/Bulma'

@observer
export default class Login extends Component {

  static contextTypes = {
    user: React.PropTypes.object,
  }

  state = {
    loggedIn: false,
    error: null,
    loading: false,
  }

  submit(e) {
    e.preventDefault()
    this.setState({loading: true, error: null})

    this.context.user.login().then(() => {
      this.setState({loggedIn: true})
    }).catch(error => {
      this.setState({error: error.message, loading: false})
    })
  }

  render() {
    let {user} = this.context
    const {loggedIn, loading} = this.state
    const {from} = this.props.location.state || {from: {pathname: '/dashboard'}}

    if (loggedIn) {
      return (
        <Redirect to={from}/>
      )
    }

    return (
      <div className="container section">
        <Helmet>
          <title>Login - FastStack</title>
        </Helmet>

        <div className="columns is-centered">
          <div className="column is-4">
            <h1 className="title has-text-centered">Login</h1>

            <form onSubmit={(e) => this.submit(e)}>

              <div className="field">
                <label className="label">Username</label>
                <p className="control">
                  <input className="input" type="text" value={user.name}
                    onChange={ev => user.name = ev.target.value}/>
                </p>
              </div>

              <div className="field">
                <label className="label">Password</label>
                <p className="control">
                  <input className="input" type="password" value={user.password}
                    onChange={ev => user.password = ev.target.value}/>
                </p>
              </div>

              <div className="field is-grouped">
                <p className="control">
                  <Button className={{"is-loading": loading}}>Login</Button>
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


