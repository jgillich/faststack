import {observable, computed, action} from 'mobx'
import jwtDecode from 'jwt-decode'
import Collection from './Collection'

export default class User {

  constructor() {
    this.url = process.env.BILLSTACK_URL
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
    return this.fetch('GET', '/userinfo')
      .then(({data}) => {
        this.name = data.attributes.name
        this.email = data.attributes.email
      })
  }

  @action login() {
    let body = JSON.stringify({
      data: {
        attributes: {
          name: this.name,
          password: this.password,
          claims: ['email'],
        },
      },
    })

    return this.fetch('POST', '/login', body)
      .then(({data}) => {
        this.token = data.attributes.token
        let claims = jwtDecode(this.token)
        this.name = claims.name
        this.email = claims.email
        sessionStorage.setItem('token', this.token)
      })
  }

  @action signup() {
    let body = JSON.stringify({
      data: {
        type: 'users',
        attributes: {
          name: this.name,
          password: this.password,
          email: this.email,
          stripe_token: this.stripeToken,
        },
      },
    })

    return this.fetch('POST', '/signup', body)
  }

  @action subscribe() {
    let body = JSON.stringify({
      data: {
        type: 'users',
        attributes: {
          plan: this.plan,
        },
      },
    })
    return this.fetch('POST', '/subscribe', body)
  }

  fetch = Collection.prototype.fetch

}
