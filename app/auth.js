
import Auth0Lock from 'auth0-lock'
import {browserHistory} from 'react-router'

export class AuthService {
  constructor(clientId, domain) {
    this.lock = new Auth0Lock(clientId, domain, {
      auth: {
        redirectUrl: process.env.URL + '/dashboard',
        responseType: 'token',
      },
    })
    this.lock.on('authenticated', this._doAuthentication.bind(this))
  }

  _doAuthentication(authResult) {
    this.setToken(authResult.idToken)
    browserHistory.replace('/dashboard')
  }

  login() {
    this.lock.show()
  }

  signUp() {
    this.lock.show({initialScreen: 'signUp'})
  }


  loggedIn() {
    return !!this.getToken()
  }

  setToken(idToken) {
    localStorage.setItem('id_token', idToken)
  }

  getToken() {
    return localStorage.getItem('id_token')
  }

  logout() {
    localStorage.removeItem('id_token')
  }
}

export default new AuthService(process.env.AUTH0_CLIENTID, process.env.AUTH0_DOMAIN)
