import React, {Component} from 'react'
import Markdown from 'react-markdown'
import {hterm, lib} from 'hterm-umdjs'

hterm.defaultStorage = new lib.Storage.Memory()

export default class Term extends Component {

  componentDidMount() {
    // wait for DOM render
    requestAnimationFrame(() => {
      let term = new hterm.Terminal();
      term.decorate(this.termElem);

      term.prefs_.set('audible-bell-sound', '')
      term.prefs_.set('ctrl-c-copy', true)
      term.prefs_.set('use-default-window-copy', true)
      term.prefs_.set('background-color', 'white')
      term.prefs_.set('foreground-color', '#333')
      term.prefs_.set('cursor-color', '#00d1b2')
      term.prefs_.set('scroll-wheel-move-multiplier', 15)

      let ws = new WebSocket(`ws${location.protocol === 'https:' ? 's' : ''}://${location.host}/boxes/${this.props.params.podId}/exec`)

      ws.onmessage = (ev) => {
        term.io.print(ev.data)
      }

      ws.onclose = () => {
        term.io.print('connection closed')
      }

      function HTerm(argv) {
        this.io = argv.io.push()
      }

      HTerm.prototype.run = function() {
        this.io.onVTKeystroke = this.io.sendString = (str) => {
          ws.send(JSON.stringify({data: str}))
        }
        this.io.onTerminalResize = (width, height) => {
          ws.send(JSON.stringify({width, height}))
        }
      }

      term.runCommandClass(HTerm)
    })
  }

  render() {
    return <div style={{height: '90%'}}>
      <section className="section" style={{height: '85%'}}>
        <div className="container" style={{height: '100%'}}>
          <div ref={(div) => { this.termElem = div; }} style={{position: 'relative', width: '100%', height: '100%'}}/>
        </div>
      </section>

      <footer className="footer">
        <div className="container">
          <div className="content has-text-centered">
            <p>
              <strong>Want more?</strong>{' '}
              <a href="http://www.vultr.com/?ref=7052736-3B">Sign up for Vultr</a>{' '}
              and get $20 credit for high speed virtual servers.
            </p>
          </div>
        </div>
      </footer>
    </div>
  }
}
