import React, {Component} from 'react'
import Markdown from 'react-markdown'
import {hterm, lib} from 'hterm-umdjs';

hterm.defaultStorage = new lib.Storage.Memory();

export default class Term extends Component {

  componentDidMount() {
    requestAnimationFrame(() => {
      let term = new hterm.Terminal();
      term.decorate(this.termElem);
      term.io.println('Print a string and add CRLF');
    })

  }

  render() {
    return <section className="section" style={{height: '80%'}}>
      <div className="container" style={{height: '100%'}}>
        <div ref={(div) => { this.termElem = div; }} style={{position: 'relative', width: '100%', height: '100%'}}/>
      </div>
    </section>
  }
}
