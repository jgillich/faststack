import {observable, computed, reaction, action} from 'mobx';
import jwtDecode from 'jwt-decode'

export default class User {

  constructor() {
    // if token is set, call update to fetch user info
    if(this.loggedIn) {
      this.update()
      // TODO catch errors
    }
  }

	@observable name = ""

  @observable password = ""

  @observable email = ""

  @observable plan = "standard"

  @observable token = sessionStorage.getItem("token")

  @observable stripeToken = ""

	@computed
  get loggedIn() {
		if(!this.token) {
      return false
    }

    let claims = jwtDecode(this.token)

    if(claims.exp < (Date.now() / 1000)) {
      return false
    }

    return true
	}

  @action
  async update() {
    return new Promise((resolve, reject) => {

      this.fetch('/userinfo', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': this.token, // TODO `Bearer ${this.token}`,
        }
      }).then(res => {
        if(!res.ok) {
          return res.json().then(reject)
        }
        return res.json()
      }).then((user) => {
        this.name = user.name
        this.email = user.email
        resolve()
      })
      .catch(() => reject(new Error('Network error')))
    })
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
        return res.text()
      }).then((token) => {
        let claims = jwtDecode(token)
        this.name = claims.name
        this.email = claims.email
        this.token = token
        sessionStorage.setItem("token", token)
        resolve()
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
