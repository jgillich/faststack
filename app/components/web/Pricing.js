import React, {Component} from 'react'
import auth from '../../auth'


export default class Pricing extends Component {
  render() {
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
          <a className="button is-primary is-large" onClick={auth.signUp.bind(auth)}>Get Started</a>
        </div>

        <div className="section">

          <h2 className="title has-text-centered">Frequently Asked Questions</h2>


          <div className="columns is-multiline">
            <div className="column is-half content">
              <h4 className="subtitle">How much performance do I get?</h4>
              <p>
                The amount of CPU, disk and network a machine can use depends on system utilization
                and performance modifier. A machine on the Pro plan is guaranteed to get double the
                resources of a machine on the Basic plan, four times as much on the Pro Plus plan.
                <br/>
                In the case of low system utilization, a machine can use as much as it needs, we
                only make use of throttling to ensure everyone gets a fair share of the
                resources.
                <br/>
                At the moment, RAM is set to 1GB per machine, but this is subject to change.

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


