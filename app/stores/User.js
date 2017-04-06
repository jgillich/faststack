import {observable, computed, reaction, action} from 'mobx';
import jwtDecode from 'jwt-decode'

export default class User {

	@observable name

  @observable password

  @observable email

  @observable token

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

      fetch('https;//TODO/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'text/json',
        },
        body: JSON.stringify({name: this.name, password: this.password})
      }).then(res => {
        if(res.status != 200) {
          return reject(res.body)
        }

        this.token = res.body
      }) // TODO catch
    })
  }

}
