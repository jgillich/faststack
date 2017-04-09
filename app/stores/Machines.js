import {observable, computed, reaction, action} from 'mobx';
import jwtDecode from 'jwt-decode'

export default class Machines {

  constructor(token) {
    this.token = token
    this.update()
  }

	@observable machines = []

  @action
  async update() {
    return this.fetch('/machines', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.token}`,
      }
    }).then(({data}) => {
      this.machines = data
    })
  }

  @action
  async create(name, image) {
    const machine = {
      name: name,
      image: image,
      driver: 'lxd',
    }

    return this.fetch('/machines', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.token}`,
      },
        body: JSON.stringify(machine)
    }).then(res => {
      this.machines.push(machine)
    })
  }

  async fetch(url, options) {
    return new Promise((resolve, reject) => {
      fetch(`${process.env.MACHINESTACK_URL}${url}`, options)
      .then(res => {
        if(!res.ok) {
          return res.json().then(reject)
        }
        res.json().then(resolve)
      }).catch(() => reject(new Error('Network error')))
    })
  }

}
