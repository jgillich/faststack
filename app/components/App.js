import React, {Component} from 'react'
import {Link} from "react-router";

export default class App extends Component {

  constructor() {
    super()
    this.state = {
    }
  }

  render() {
    return <div>
      <nav className="nav">
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

            <span className="nav-item">
              <a className="button is-primary" href="#">
                <span className="icon">
                  <i className="fa fa-rocket"></i>
                </span>
                <span>Launch</span>
              </a>
            </span>

          </div>
        </div>
      </nav>

      {this.props.children}

      <footer className="footer">
        <div className="container">
          <div className="content has-text-centered">
            <p>
              <a className="icon" href="https://github.com/termbox/termbox">
                <i className="fa fa-github"></i>
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  }

}
