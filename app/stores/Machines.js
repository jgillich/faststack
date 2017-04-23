import {action} from 'mobx'
import Collection from './Collection'
import Terminal from './Terminal'


export default class Machines extends Collection {

  constructor(token) {
    super(process.env.MACHINESTACK_URL, token)
    this.update()
  }

  sessions = {}

  @action update() {
    return this.fetch('GET', '/machines')
      .then(({data}) => {
        this.items = data.map((i) => i.attributes)
      })
  }

  @action create(name, image) {
    const machine = {
      name: name,
      image: image,
      driver: 'lxd',
    }

    return this.fetch('POST', '/machines', JSON.stringify(machine))
      .then((_) => {
        this.items.push(machine)
      })
  }

  @action delete(name) {
    return this.fetch('DELETE', `/machines/${name}`)
      .then((_) => {
        this.items.remove(this.name(name))
      })
  }

  @action exec(name) {
    // TODO detect when session dies for good
    if (this.sessions[name]) {
      return Promise.resolve(this.sessions[name])
    }

    return this.fetch('GET', `/machines/${name}/exec`)
      .then(({data}) => {
        this.sessions[name] = new Terminal(data.attributes.id)
        return this.sessions[name]
      })
  }

}
