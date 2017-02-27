import React, {Component} from 'react'
import theaterJS from 'theaterjs'
import auth from '../../auth'

export default class Home extends Component {

  componentDidMount() {
    this.theater = theaterJS()

    this.theater
      .addActor('title', 1, '.title-word')
      .addScene('title:development', 3000)
      .addScene('title:testing', 3000)
      .addScene('title:cross-compiling', 3000)
      .addScene('title:learning', 3000)
      .addScene('title:teaching', 3000)
      .addScene('title:running rm --no-preserve-root /', 3000)
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
                Instant Linux boxes for <span className='title-word'></span>
              </h1>
              <h2 className="subtitle">
                Launch custom Linux boxes in just 5 seconds. Try it for free
              </h2>
              <a className="button is-primary is-inverted is-large"
                onClick={auth.signUp.bind(auth)}>Sign Up</a>
            </div>
          </div>
        </section>

        <div className="container section has-text-centered">
          <h4 className="title">We have your favourite distribution</h4>
          <div className="columns" style={{justifyContent: 'center'}}>
          {[].map((image) =>
            <div className="column is-1">
              <div className="icon is-large"><i className={'fl-' + image.name}/></div>
            </div>
          )}
          </div>
          <h4 className="subtitle">Launch any image from Docker Hub</h4>
        </div>

        <div className="container section has-text-centered">
          <h4 className="title">We support your workflow</h4>
          <div className="columns" style={{justifyContent: 'center'}}>
            <div className="column is-1">
              <div className="icon is-large"><i className='fa fa-desktop'/></div>
            </div>
            <div className="column is-1">
              <div className="icon is-large"><i className='fa fa-terminal'/></div>
            </div>
          </div>
          <h4 className="subtitle">Web interface and terminal client, we have both</h4>
        </div>

      </div>

    )
  }
}
