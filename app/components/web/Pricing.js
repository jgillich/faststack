import React, {Component} from 'react'
import auth from '../../auth'


export default class Pricing extends Component {
  render() {
    return (
      <div className="container section">

        <h1 className="title has-text-centered">Pricing</h1>

        <div className="columns">

          <div className="column">
            <div className="card">
              <header className="card-header">
                <p className="card-header-title">
                  Free
                </p>
              </header>
              <div className="card-content">
                <div className="content ">
                  One box
                </div>
                <div className="content">
                  Suspend after 1 hour of inactivity
                </div>
                <div className="content">
                  Community support
                </div>
              </div>
              <footer className="card-footer">
                <span className="card-footer-item">Free</span>
              </footer>
            </div>
          </div>

          <div className="column">
            <div className="card ">
              <header className="card-header">
                <p className="card-header-title">
                  Basic
                </p>
              </header>
              <div className="card-content">
                <div className="content">
                  <strong>Two</strong> boxes
                </div>
                <div className="content">
                  Suspend after 6 hours of inactivity
                </div>
                <div className="content">
                  Custom images
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
                  Pro
                </p>
              </header>
              <div className="card-content">
                <div className="content">
                  <strong>Five</strong> boxes
                </div>
                <div className="content">
                  <strong>One</strong> permanent box
                </div>
                <div className="content">
                  Email support
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
                  Pro Plus
                </p>
              </header>
              <div className="card-content">
                <div className="content">
                  <strong>Ten</strong> boxes
                </div>
                <div className="content">
                  <strong>Two</strong> permanent boxes
                </div>
                <div className="content">
                  Coming soon: Dedicated IPs
                </div>
              </div>
              <footer className="card-footer">
                <span className="card-footer-item">$20 per month</span>
              </footer>
            </div>
          </div>

        </div>

        <div className="section has-text-centered">
          <a className="button is-primary is-large" onClick={auth.signUp.bind(auth)}>Sign Up</a>
        </div>

        <div className="section">

          <h2 className="title has-text-centered">Frequently Asked Questions</h2>


          <div className="columns is-multiline">
            <div className="column is-half content">
              <h4 className="subtitle">How many resources does each box get?</h4>
              <p>
                CPU and RAM are dynamic, meaning you can assign as much or as little as you need.
                A single box grants you 1 CPU and 256MB RAM, therefore on the Pro plan you can
                assign up to 5 CPUs and 1280MB of RAM.
              </p>
            </div>

            <div className="column is-half content">
              <h4 className="subtitle">How can I access my boxes?</h4>
              <p>
                We offer a web interface and a terminal client that supports all major popular
                operating systems: Windows, macOS and Linux.
              </p>
              <p>
                We do not offer SSH, but creating a custom image that includes a SSH server is
                trivial. For an example, consult our <a href="#">documentation</a>.
              </p>
            </div>

            <div className="column is-half content">
              <h4 className="subtitle">When are boxes suspended?</h4>
              <p>
                A box is suspended some time after you have last accessed it
                via our web interface or terminal client. This means that programs will continue to
                run even if you are not connected, but they will be stopped gracefully after
                a fixed time period (1 hour for the free plan, 6 hours for all paid plans). All data
                remains intact after suspension and reconnecting to the box will restart the timer.
              </p>

              <p>
                The Plus plan also allows you to make a box permanent, which means it
                will never be suspended.
              </p>

            </div>

          </div>
        </div>
      </div>
    )
  }
}


