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

      var ws = new WebSocket(`wss://${location.host}/boxes/${this.props.params.podId}/exec`);

      term.onTerminalReady = function() {
        let  io = term.io.push();

        ws.onmessage = (ev) => {
          term.io.print(ev.data)
        }

        io.onVTKeystroke = function(str) {
          ws.send(str)
        };

        io.sendString = function(str) {
          ws.send(str)
        };

        io.onTerminalResize = function(columns, rows) {
          // React to size changes here.
          // Secure Shell pokes at NaCl, which eventually results in
          // some ioctls on the host.
        };
      };
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
