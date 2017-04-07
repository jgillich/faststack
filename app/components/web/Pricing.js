import React, {Component} from 'react'
import {Link} from 'react-router-dom'

export default class Pricing extends Component {
  render() {
    let {match} = this.props

    return (
      <div className="container section">

        <h1 className="title has-text-centered">Pricing</h1>

        <div className="columns">

          <div className="column">
            <div className="card ">
              <header className="card-header">
                <p className="card-header-title">
                  Basic
                </p>
              </header>
              <div className="card-content">
                <div className="content">
                  Up to <strong>2</strong> machines
                </div>
                <div className="content">
                  <strong>1</strong> vCPU
                </div>
                <div className="content">
                  <strong>1</strong> GB RAM
                </div>
              </div>
              <footer className="card-footer">
                <span className="card-footer-item">$5 per month</span>
              </footer>
            </div>
          </div>

          <div className="column">
            <div className="card">
              <header className="card-header">
                <p className="card-header-title">
                  Standard
                </p>
              </header>
              <div className="card-content">
                <div className="content">
                  Up to <strong>4</strong> machines
                </div>
                <div className="content">
                  <strong>2</strong> vCPUs
                </div>
                <div className="content">
                  <strong>2</strong> GB RAM
                </div>
              </div>
              <footer className="card-footer">
                <span className="card-footer-item">$10 per month</span>
              </footer>
            </div>
          </div>

          <div className="column">
            <div className="card">
              <header className="card-header">
                <p className="card-header-title">
                  Pro
                </p>
              </header>
              <div className="card-content">
                <div className="content">
                  Up to <strong>6</strong> machines
                </div>
                <div className="content">
                 <strong>4</strong> vCPUs
                </div>
                <div className="content">
                  <strong>4</strong> GB RAM
                </div>

              </div>
              <footer className="card-footer">
                <span className="card-footer-item">$20 per month</span>
              </footer>
            </div>
          </div>

        </div>

        <div className="section has-text-centered">
          <Link className="button is-primary is-large" to="/signup">Get Started</Link>
        </div>

        <div className="section">

          <h2 className="title has-text-centered">Frequently Asked Questions</h2>


          <div className="columns is-multiline">
            <div className="column is-half content">
              <h4 className="subtitle">How does auto suspend work?</h4>
              <p>
                You can use your machines as long as you want, we only suspend them when you are not using
                them. At the moment, this happens 12 hours after you last connected. When you
                reconnect to a suspended machine, all running processes will be restored.

              </p>
            </div>

            <div className="column is-half content">
              <h4 className="subtitle">How can I access my boxes?</h4>
              <p>
                We offer a web interface and a terminal client that supports all major popular
                operating systems: Windows, macOS and Linux. We do not support SSH at this time.
              </p>
            </div>

            <div className="column is-half content">
              <h4 className="subtitle">What payment methods do you accept?</h4>
              <p>
                We accept Visa, MasterCard, American Express, and Discover.
              </p>
            </div>

          </div>
        </div>
      </div>
    )
  }
}
