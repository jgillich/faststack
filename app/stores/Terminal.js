import Xterm from 'xterm'
import RobustWebSocket from 'robust-websocket'

Xterm.loadAddon('attach')

export default class Terminal {
  constructor(id) {
    let io = this.ws(`/exec/${id}/io`)
    let control = this.ws(`/exec/${id}/control`)

    let xterm = new Xterm()
    xterm.attach(io)

    this.elem = document.createElement('div')
    xterm.open(this.elem)
  }

  mount(elem) {
    elem.appendChild(this.elem)
  }

  ws(url) {
    return new RobustWebSocket(`${process.env.MACHINESTACK_URL.replace('http', 'ws')}${url}`)
  }
}
