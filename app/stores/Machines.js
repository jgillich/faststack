import {observable, action} from 'mobx'
import Terminal from './Terminal'

export default class Machines {

  constructor(token) {
    this.token = token
    this.update()
  }

  sessions = {}

	@observable machines = []

  @action
  async update() {
    return this.fetch('/machines', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.token}`,
      },
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
        body: JSON.stringify(machine),
    }).then((res) => {
      this.machines.push(machine)
    })
  }

  @action
  async delete(name) {
    return this.fetch(`/machines/${name}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.token}`,
      },
    }).then((res) => {
      this.machines.remove(this.find(name))
    })
  }

  @action
  async exec(name) {
    // TODO detect when session dies for good
    if(this.sessions[name]) {
      return Promise.resolve(this.sessions[name])
    }

    return this.fetch(`/machines/${name}/exec`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.token}`,
      },
    }).then((res) => {
      this.sessions[name] = new Terminal(res.data.id)
      return this.sessions[name]
    })
  }

  find(name) {
    return this.machines.find((m) => m.name == name)
  }


  async fetch(url, options) {
    return new Promise((resolve, reject) => {
      fetch(`${process.env.MACHINESTACK_URL}${url}`, options)
      .then((res) => {
        if(!res.ok) {
          return res.json().then(reject)
        }
        res.json().then(resolve)
      }).catch(() => reject(new Error('Network error')))
    })
  }

}
