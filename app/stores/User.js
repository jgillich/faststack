import {observable, computed, action} from 'mobx'
import jwtDecode from 'jwt-decode'

export default class User {

  constructor() {
    if(this.loggedIn) {
      let claims = jwtDecode(this.token)
      this.name = claims.name
      this.email = claims.email
      // invoke update in case something changed
      this.update()
    }
  }

	@observable name = ''

  @observable password = ''

  @observable email = ''

  @observable plan = 'standard'

  @observable token = sessionStorage.getItem('token')

  @observable stripeToken = ''

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

  @action update() {
    return this.fetch('/userinfo', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.token}`,
      },
    }).then(({data}) => {
      this.name = data.name
      this.email = data.email
    })
  }

  @action login() {
    return this.fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: this.name,
        password: this.password,
        claims: ['email'],
      }),
    }).then(({data}) => {
      let claims = jwtDecode(data.token)
      this.name = claims.name
      this.email = claims.email
      this.token = data.token
      sessionStorage.setItem('token', data.token)
    })
  }

  @action signup() {
    return this.fetch('/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: this.name,
        password: this.password,
        email: this.email,
        stripe_token: this.stripeToken,
      }),
    })
  }

  @action subscribe() {
    return this.fetch('/subscribe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.token}`,
      },
      body: JSON.stringify({
        plan: this.plan,
      }),
    })
  }

  fetch(url, options) {
    return new Promise((resolve, reject) => {
      fetch(`${process.env.BILLSTACK_URL}${url}`, options)
      .then((res) => {
        if(!res.ok) {
          return res.json().then(reject)
        }
        res.json().then(resolve)
      }).catch(() => reject(new Error('Network error')))
    })
  }

}
