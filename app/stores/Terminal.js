import Xterm from 'xterm'
import RobustWebSocket from 'robust-websocket'
import debounce from 'lodash.debounce'

Xterm.loadAddon('attach')
Xterm.loadAddon('fit')

export default class Terminal {
  constructor(id) {
    let io = this.ws(`/exec/${id}/io`)
    let control = this.ws(`/exec/${id}/control`)

    this.xterm = new Xterm()
    this.xterm.attach(io)

    this.elem = document.createElement('div')
    this.elem.style.height = '80vh'
    this.xterm.open(this.elem)

    control.addEventListener('open', () => {
      window.addEventListener('resize', debounce(() => this.xterm.fit(), 100))

      this.xterm.on('resize', (size) => {
        control.send(JSON.stringify({
          command: 'window-resize',
          args: {width: size.cols.toString(), height: size.rows.toString()}
        }))
      })
    })

  }

  mount(elem) {
    elem.appendChild(this.elem)
    setTimeout(() => this.xterm.fit(), 0)
  }

  ws(url) {
    return new RobustWebSocket(`${process.env.MACHINESTACK_URL.replace('http', 'ws')}${url}`)
  }
}
