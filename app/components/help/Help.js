import React, {Component} from 'react'
import {Switch, Redirect} from 'react-router-dom'
import Footer from '../common/Footer'
import general from './general'

export default class Web extends Component {
  render() {
    let {match} = this.props

    return (
      <div>
      <section className="hero is-primary has-text-centered">
        <div className="hero-body">
          <h1 className="title">
            Help
          </h1>
        </div>
      </section>
        <section className="section container">
          <div className="columns">
            <aside className="menu column is-3">
              <general.Menu/>
            </aside>

            <div className="column">
              <Switch>
                {general.Routes}
                <Redirect from="/help" to={`${match.url}/general/overview`}/>
            </Switch>

            </div>
          </div>
        </section>

        <section className="hero is-primary has-text-centered">
          <div className="hero-body">
            <div className="container">
              <h1 className="title">
                Still have questions?
              </h1>
              <h2 className="subtitle">
                <a href="mailto:support@faststack.co">support@faststack.co</a>
              </h2>
            </div>
          </div>
        </section>

        <Footer/>

      </div>
    )
  }
}
