import React, {Component} from 'react'
import {Link} from 'react-router-dom'

export default class Footer extends Component {
  render() {
    return (
      <footer className="footer">
        <div className="container">
          <div className="content has-text-centered">
            <p>
              <a href="https://status.faststack.co">Status</a>&nbsp;&nbsp;&nbsp;
              <Link to="/terms">Terms</Link>
            </p>
            <p>
              <a className="icon" href="https://github.com/faststackco/faststack">
                <i className="fa fa-github"></i>
              </a>
            </p>
          </div>
        </div>
      </footer>
    )
  }
}
