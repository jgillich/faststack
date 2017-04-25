import {observable} from 'mobx'

const networkError = {
  errors: [
    {
      title: 'Network Error',
      detail: 'Please check your internet connection.',
    },
  ],
}

export default class Collection {

  constructor(url, token) {
    this.url = url
    this.token = token
  }

	@observable items = []

  find(f) {
    return this.items.find(f)
  }

  map(f) {
    return this.items.map(f)
  }

  name(name) {
    return this.find((m) => m.name == name)
  }

  fetch(method, url, body) {
    return new Promise((resolve, reject) => {
      let headers = {
        'Content-Type': 'application/vnd.api+json',
        'Accept': 'application/vnd.api+json',
      }

      if(this.token) {
        headers['Authorization'] = `Bearer ${this.token}`
      }

      fetch(`${this.url}${url}`, {method, headers, body: body})
        .then((res) => {
          if(!res.ok) {
            return res.json().then(reject)
          }
          res.json().then(resolve)
        }).catch(() => reject(networkError))
    })
  }

}
