import Xterm from 'xterm'
import RobustWebSocket from 'robust-websocket'
import debounce from 'lodash.debounce'

Xterm.loadAddon('attach')
Xterm.loadAddon('fit')

export default class Terminal {
  constructor(id) {
    let io = this.ws(`/session/${id}/io`)
    let control = this.ws(`/session/${id}/control`)

    this.xterm = new Xterm()
    this.xterm.attach(io)

    this.elem = document.createElement('div')
    this.elem.style.flex = '1'
    this.xterm.open(this.elem)

    control.addEventListener('open', () => {
      window.addEventListener('resize', debounce(() => this.xterm.fit(), 100))

      this.xterm.on('resize', (size) => {
        control.send(JSON.stringify({
          command: 'window-resize',
          args: {width: size.cols.toString(), height: size.rows.toString()},
        }))
      })
    })
  }

  mount(elem) {
    elem.appendChild(this.elem)
    setTimeout(() => this.xterm.fit(), 0)
  }

  focus() {
    this.xterm.focus()
  }

  ws(url) {
    let u = `${process.env.MACHINESTACK_URL.replace('http', 'ws')}${url}`
    return new RobustWebSocket(u)
  }
}
