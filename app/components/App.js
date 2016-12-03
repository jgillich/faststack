import React, {Component} from 'react'
import {Link} from "react-router";

export default class App extends Component {

  render() {
    return <div style={{height: '100%'}}>
      <nav className="nav has-shadow">
        <div className="container">
          <div className="nav-left">
            <a className="nav-item is-brand" href="#">
              <img src="logo.png" alt="termbox logo"/>
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
        </div>
      </nav>

      {this.props.children}

    </div>
  }

}
