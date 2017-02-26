import React, {Component} from 'react'

export default class Pricing extends Component {
  render() {
    return (
      <div class="container section">

        <h1 class="title has-text-centered">Pricing</h1>

        <div class="columns">

          <div class="column">
            <div class="card">
              <header class="card-header">
                <p class="card-header-title">
                  Free
                </p>
              </header>
              <div class="card-content">
                <div class="content ">
                  One box
                </div>
                <div class="content">
                  Suspend after 1 hour of inactivity
                </div>
                <div class="content">
                  Community support
                </div>
              </div>
              <footer class="card-footer">
                <span class="card-footer-item">Free</span>
              </footer>
            </div>
          </div>

          <div class="column">
            <div class="card ">
              <header class="card-header">
                <p class="card-header-title">
                  Basic
                </p>
              </header>
              <div class="card-content">
                <div class="content">
                  <strong>Two</strong> boxes
                </div>
                <div class="content">
                  Suspend after 6 hours of inactivity
                </div>
                <div class="content">
                  Custom images
                </div>
              </div>
              <footer class="card-footer">
                <span class="card-footer-item">$5 per month</span>
              </footer>
            </div>
          </div>

          <div class="column">
            <div class="card">
              <header class="card-header">
                <p class="card-header-title">
                  Pro
                </p>
              </header>
              <div class="card-content">
                <div class="content">
                  <strong>Five</strong> boxes
                </div>
                <div class="content">
                  <strong>One</strong> permanent box
                </div>
                <div class="content">
                  Email support
                </div>
              </div>
              <footer class="card-footer">
                <span class="card-footer-item">$10 per month</span>
              </footer>
            </div>
          </div>

          <div class="column">
            <div class="card">
              <header class="card-header">
                <p class="card-header-title">
                  Pro Plus
                </p>
              </header>
              <div class="card-content">
                <div class="content">
                  <strong>Ten</strong> boxes
                </div>
                <div class="content">
                  <strong>Two</strong> permanent boxes
                </div>
                <div class="content">
                  Coming soon: Dedicated IPs
                </div>
              </div>
              <footer class="card-footer">
                <span class="card-footer-item">$20 per month</span>
              </footer>
            </div>
          </div>

        </div>

        <div class="section has-text-centered">
          <a class="button is-primary is-large">Sign Up</a>
        </div>

        <div class="section">

          <h2 class="title has-text-centered">Frequently Asked Questions</h2>


          <div class="columns is-multiline">
            <div class="column is-half content">
              <h4 class="subtitle">How many resources does each box get?</h4>
              <p>
                CPU and RAM are dynamic, meaning you can assign as much or as little as you need.
                A single box grants you 1 CPU and 256MB RAM, therefore on the Pro plan you can
                assign up to 5 CPUs and 1280MB of RAM.
              </p>
            </div>

            <div class="column is-half content">
              <h4 class="subtitle">How can I access my boxes?</h4>
              <p>
                We offer a web interface and a terminal client that supports all major popular
                operating systems: Windows, macOS and Linux.
              </p>
              <p>
                We do not offer SSH, but creating a custom image that includes a SSH server is
                trivial. For an example, consult our <a href="#">documentation</a>.
              </p>
            </div>

            <div class="column is-half content">
              <h4 class="subtitle">When are boxes suspended?</h4>
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


