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
    return new Promise((resolve, reject) => {
      this.fetch('/machines', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.token}`,
        }
      }).then(res => {
        if(!res.ok) {
          return res.json().then(reject)
        }
        return res.json()
      }).then((machines) => {
        this.machines = machines
        resolve()
      })
      .catch(() => reject(new Error('Network error')))
    })
  }

  @action
  async create(name, image) {
    const machine = {
      name: name,
      image: image,
      driver: 'lxd',
    }

    return new Promise((resolve, reject) => {

      this.fetch('/machines', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.token}`,
        },
         body: JSON.stringify(machine)
      }).then(res => {
        if(!res.ok) {
          return res.json().then(reject)
        }
        this.machines.push(machine)
        resolve()
      }).catch((e) => reject(new Error('Network error')))
    })
  }

  async fetch(url, options) {
    return fetch(`${process.env.MACHINESTACK_URL}${url}`, options)
  }

}
