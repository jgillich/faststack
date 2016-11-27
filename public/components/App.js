import React, {Component} from 'react'
import {Link} from "react-router";

export default class App extends Component {

  constructor() {
    super()

    this.state = {

    }
  }

  createContainer() {

  }

  render() {
    return <div>
      <nav className="nav">
        <div className="nav-left">
          <a className="nav-item is-brand" href="#">
            InstantLinux
          </a>
        </div>

        <span className="nav-toggle">
          <span></span>
          <span></span>
          <span></span>
        </span>

        <div className="nav-right nav-menu">
          <a className="nav-item" href="/">
            Home
          </a>
          <a className="nav-item" href="/faq">
            FAQ
          </a>

        </div>
      </nav>
      {this.props.children}
      <footer className="footer">
      </footer>
    </div>
  }

}
