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
          <Link className="nav-item" to="/">
            Home
          </Link>
          <Link className="nav-item" to="/faq">
            FAQ
          </Link>
        </div>
      </nav>
      {this.props.children}
      <footer className="footer">
      </footer>
    </div>
  }

}
