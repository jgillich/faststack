import {h, Component} from 'preact'
import {connect} from 'preact-redux'
import {createBox} from '../actions/box'
import {Recaptcha} from './Recaptcha'

export class Launch extends Component {

  constructor(props) {
    super(props)

    this.state = {
        image: CONFIG.images[0]
    }
  }

  launchClick() {
    this.props.dispatch(createBox({
      image: this.state.image.image,
      version: this.state.image.versions[0],
      captcha: this.state.captcha
    }))

    this.setState({
      loading: true
    })
  }

  render({box}, {image}) {
    return <div >

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

          <nav class="level">
            <div class="level-item">
              <p class="control has-addons">
                {CONFIG.images.map((i) =>
                  <a onClick={e => this.setState({image: i})}
                     class={'button is-medium' + (image.name == i.name ? ' is-primary' : '')}
                     key={i.name}>
                    <span class="icon">
                      <i class={'icon-' + i.name}></i>
                    </span>
                    <span>{i.displayName}</span>
                  </a>
                )}
              </p>
            </div>
            <div class="level-item">
              <Recaptcha
                sitekey={CONFIG.rcsitekey}
                onChange={c => this.setState({captcha: c})}
              />
            </div>

            <div class="level-item">
              <a class={'button is-medium is-primary' + (box.loading ? ' is-loading' : '')}
                 onClick={this.launchClick.bind(this)}>
                <span class="icon">
                  <i class="fa fa-rocket"></i>
                </span>
                <span>Launch</span>
              </a>
            </div>
          </nav>

          {box.error ?
            <div class="notification is-danger">
              {box.error.message}
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
                      6 hours.
                    </p>
                  </div>
                </div>
              </article>
            </div>

          </div>
          <p class="has-text-centered">For more information, visit our <a href='/doc/faq'>FAQ</a>.</p>

        </div>
      </section>

    </div>
  }

}


export const LaunchContainer = connect(
  state => ({box: state.box}),
  dispatch => ({dispatch})
)(Launch);
