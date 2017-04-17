import React, {Component} from 'react'
import theaterJS from 'theaterjs'
import {Link} from 'react-router-dom'

export default class Home extends Component {

  componentDidMount() {
    this.theater = theaterJS()

    this.theater
      .addActor('title', 1, '.title-word')
      .addScene('title:makers', 3000)
      .addScene('title:developers', 3000)
      .addScene('title:students', 3000)
      .addScene('title:teachers', 3000)
      .addScene('title:everyone', 6000)
      .addScene(this.theater.replay)
  }

  componentWillUnmount() {
    this.theater.stop()
  }

  render() {
    return (
      <div>
        <section className="hero is-primary is-medium">
          <div className="hero-body">
            <div className="container has-text-centered">
              <h1 className="title">
                Cloud workspaces for <span className="title-word"></span>
              </h1>
              <h2 className="subtitle">
                Launch preconfigured Linux machines in just 5 seconds. Try it for free
              </h2>
              <Link className="button is-primary is-inverted is-large"to="/signup">Sign Up</Link>
            </div>
          </div>
        </section>

         <section className="section">
          <div className="columns is-centered is-multiline">
            <div className="column is-12 has-text-centered">
              <h3 className="title is-3">
                  Your personal cloud workspace
              </h3>
            </div>
          </div>
          <div className="columns is-centered">
            <div className="column is-4">
              <img src="http://placehold.it/600x300"/>
            </div>
            <div className="column is-2">
              Pick one of our <a href="#">preconfigured images</a>
              <div className="has-text-centered"><i className="fa fa-chevron-down"></i></div>
              Get to work right in your browser, or download our <a href="#">command line client</a>
              <div className="has-text-centered"><i className="fa fa-chevron-down"></i></div>
              When you're done, your machine will <a href="#">suspend automatically</a>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="columns is-centered has-text-centered">
            <div className="column is-2">
              <div className="icon"><i className="fa fa-clock-o"/></div>
              <h5 className="title is-5">
                5 second deploys
              </h5>
            </div>

            <div className="column is-2">
              <div className="icon"><i className="fa fa-tachometer"/></div>
              <h5 className="title is-5">
                High speed SSD-powered infrastructure
              </h5>
            </div>

            <div className="column is-2">
              <div className="icon"><i className="fa fa-globe"/></div>
              <h5 className="title is-5">
                EU and NA locations
              </h5>
            </div>

            <div className="column is-2">
              <div className="icon"><i className="fa fa-desktop"/></div>
              <h5 className="title is-5">
                Web and terminal clients
              </h5>
            </div>
          </div>

          <div className="columns is-centered has-text-centered">
            <div className="column is-2">
              <div className="icon"><i className="fa fa-cog"/></div>
              <h5 className="title is-5">
                Root administrator access
              </h5>
            </div>

            <div className="column is-2">
              <div className="icon"><i className="fa fa-cubes"/></div>
              <h5 className="title is-5">
                Preconfigured images
              </h5>
            </div>

            <div className="column is-2">
              <div className="icon"><i className="fa fa-globe"/></div>
              <h5 className="title is-5">
                More
              </h5>
            </div>

            <div className="column is-2">
              <div className="icon"><i className="fa fa-globe"/></div>
              <h5 className="title is-5">
                More
              </h5>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="columns is-centered is-multiline">
            <div className="column is-12 has-text-centered">
              <h3 className="title is-3">
                How does FastStack compare to other cloud providers?
              </h3>
            </div>
          </div>
          <div className="columns is-centered">
            <div className="column is-2">
              <ul>
                <li><span className="icon is-small">
                  <i className="fa fa-check"/></span> Incredible value
                </li>
                <li><span className="icon is-small">
                  <i className="fa fa-check"/></span> Ultra-fast deploys
                </li>
                <li><span className="icon is-small">
                  <i className="fa fa-check"/></span> Flat rate pricing
                </li>
              </ul>
            </div>
            <div className="column is-2">
              <ul>
                <li><span className="icon is-small">
                  <i className="fa fa-times"/></span> Dedicated IPv4
                </li>
                <li><span className="icon is-small">
                  <i className="fa fa-times"/></span> Always running
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section className="section has-text-centered">
          <Link className="button is-large is-primary" to="/signup">
            Get Started
          </Link>
        </section>

      </div>

    )
  }
}
