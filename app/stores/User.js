import {observable, computed, reaction, action} from 'mobx';
import jwtDecode from 'jwt-decode'

export default class User {

	@observable name = ""

  @observable password = ""

  @observable email = ""

  @observable plan = "standard"

  @observable token = ""

  @observable stripeToken = ""

	@computed
  get loggedIn() {
		if(!this.token) {
      return false
    }

    let claims = jwtDecode(this.token)

    if(claims.exp < Date.now()) {
      return false
    }

    return true
	}

  @action
  async login() {
    return new Promise((resolve, reject) => {

      this.fetch('/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: this.name,
          password: this.password,
          claims: ['email'],
        })
      }).then(res => {
        if(!res.ok) {
          return res.json().then(reject)
        }
        resolve()
      }).then((token) => {
        let claims = jwtDecode(token)
        this.email = claims.email
        this.token = token
      })
      .catch(() => reject(new Error('Network error')))
    })
  }

  @action
  async signup() {
    return new Promise((resolve, reject) => {

    this.fetch('/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: this.name,
          password: this.password,
          email: this.email,
          stripe_token: this.stripeToken,
        })
      }).then(res => {
        if(!res.ok) {
          return res.json().then(reject)
        }
        resolve()
      }).catch(() => reject(new Error('Network error')))
    })
  }

  async fetch(url, options) {
    return fetch(`${process.env.BILLSTACK_URL}${url}`, options)
  }

}
