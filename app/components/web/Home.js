import React, {Component} from 'react'
import theaterJS from 'theaterjs'
import images from '../../../images/images.json'

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

        <section class="hero is-primary is-medium">

          <div class="hero-body">
            <div class="container has-text-centered">
              <h1 class="title">
                Instant Linux boxes for <span class='title-word'></span>
              </h1>
              <h2 class="subtitle">
                Launch custom Linux boxes in just 5 seconds. Try it for free
              </h2>
              <a class="button is-primary is-inverted is-large">Sign Up</a>
            </div>
          </div>
        </section>

        <div class="container section has-text-centered">
          <h4 class="title">We have your favourite distribution</h4>
          <div class="columns" style={{justifyContent: 'center'}}>
          {images.map((image) =>
            <div class="column is-1"><div class="icon is-large"><i class={'fl-' + image.name}/></div></div>
          )}
          </div>
          <h4 class="subtitle">Launch any image from Docker Hub</h4>
        </div>

        <div class="container section has-text-centered">
          <h4 class="title">We support your workflow</h4>
          <div class="columns" style={{justifyContent: 'center'}}>
            <div class="column is-1"><div class="icon is-large"><i class='fa fa-desktop'/></div></div>
            <div class="column is-1"><div class="icon is-large"><i class='fa fa-terminal'/></div></div>
          </div>
          <h4 class="subtitle">Web interface and terminal client, we have both</h4>
        </div>

      </div>

    )
  }
}
