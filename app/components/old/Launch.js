import Preact, {Component} from 'preact'
import {connect} from 'preact-redux'
import {createBox} from '../actions/box'
import {Recaptcha} from './Recaptcha'
import images from '../../images/images.json'

export class Launch extends Component {

  constructor(props) {
    super(props)

    this.state = {
        selectedImage: images[0],
    }
  }

  launchClick() {
    this.props.dispatch(createBox({
      image: this.state.selectedImage.image,
      version: this.state.selectedImage.versions[0],
      captcha: this.state.captcha,
    }))
  }

  render({state}, {selectedImage}) {
    return <div>

      <section class="hero is-bold is-primary">
        <div class="hero-body">
          <div class="container has-text-centered">
            <h1 class="title">
              Launch a Linux box with two clicks.
            </h1>
          </div>
        </div>
      </section>

      <section class="section">
        <div class="container">

          <div class="columns is-multiline">
            {images.map((image) =>
              <div class="column is-centered is-2">
                <a onClick={(e) => this.setState({selectedImage: image})}>
                  <div class={'card' +
                    (image.name == selectedImage.name ? ' is-primary' : '')}>
                    <div class="card-image has-text-centered">
                      <span class="icon is-huge" style={{'padding': '10px 0'}}>
                        <i class={'fl-' + image.name}/>
                      </span>
                    </div>

                    <div class="card-content has-text-centered">
                      <p class="title is-4">{image.displayName}</p>
                    </div>

                    <footer class="card-footer">
                      <p class="card-footer-item">{image.versions[0]}</p>
                    </footer>
                  </div>
                </a>
              </div>
            )}
          </div>

           <div class="columns is-centered">
            <div class="column has-text-centered">
              <Recaptcha
                sitekey={window.CONFIG ? CONFIG.rcsitekey : ""}
                onChange={(c) => this.setState({captcha: c})}
              />
            </div>
          </div>
          <div class="columns is-centered">
            <div class="column has-text-centered">
              <a class={'button is-large is-primary' +
                  (state.loading ? ' is-loading' : '')}
                onClick={this.launchClick.bind(this)}>
                <span class="icon">
                  <i class="fa fa-rocket"></i>
                </span>
                <span>Launch</span>
              </a>
            </div>
          </div>
            {state.error ?
              <div class="notification is-danger">
                {state.error.message}
              </div>
            : null}
        </div>
      </section>

      <section class="section">
        <div class="container">

          <div class="columns">

            <div class="column">
              <article class="media">
                <div class="media-left">
                  <figure class="icon is-large">
                    <i class="fa fa-user-times" aria-hidden="true"></i>
                  </figure>
                </div>
                <div class="media-content">
                  <div class="content">
                    <p>
                      <strong>Free</strong><br/>
                      Termbox is completely free, no sign up required.
                    </p>
                  </div>
                </div>
              </article>
            </div>

            <div class="column">
              <article class="media">
                <div class="media-left">
                  <figure class="icon is-large">
                    <i class="fa fa-shield" aria-hidden="true"></i>
                  </figure>
                </div>
                <div class="media-content">
                  <div class="content">
                    <p>
                      <strong>Secure</strong><br/>
                      Boxes are securely isolated in their own virtual
                      machine.
                    </p>
                  </div>
                </div>
              </article>
            </div>

            <div class="column">
              <article class="media">
                <div class="media-left">
                  <figure class="icon is-large">
                    <i class="fa fa fa-heartbeat" aria-hidden="true"></i>
                  </figure>
                </div>
                <div class="media-content">
                  <div class="content">
                    <p>
                      <strong>Ephemeral</strong><br/>
                      Boxes and all their data are automatically deleted after
                      3 hours.
                    </p>
                  </div>
                </div>
              </article>
            </div>

          </div>

        </div>
      </section>

      <footer class="footer">
        <div class="container">
          <div class="content has-text-centered">
            <a href='/tos'>Terms of Service</a>
          </div>
        </div>
      </footer>

    </div>
  }

}


export const LaunchContainer = connect(
  (state) => ({state: state.box}),
  (dispatch) => ({dispatch})
)(Launch)
