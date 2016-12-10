import Preact, {Component} from 'preact'
import {connect} from 'preact-redux'
import {createBox} from '../actions/box'
import {Recaptcha} from './Recaptcha'

export class Launch extends Component {

  constructor(props) {
    super(props)

    this.state = {
        image: CONFIG.images[0],
    }
  }

  launchClick() {
    this.props.dispatch(createBox({
      image: this.state.image.image,
      version: this.state.image.versions[0],
      captcha: this.state.captcha,
    }))
  }

  render({state}, {image}) {
    return <div>

      <section className="hero is-bold is-primary">
        <div className="hero-body">
          <div className="container has-text-centered">
            <h1 className="title">
              Launch a Linux box with two clicks.
            </h1>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">

          <div className="columns is-centered is-multiline">
            {CONFIG.images.map((i, index) =>
              index < 6 ?
              <div className="column is-centered is-2">
                <a onClick={(e) => this.setState({image: i})}>
                  <div className={'card' +
                    (image.name == i.name ? ' is-primary' : '')}>
                    <div className="card-image has-text-centered">
                      <span className="icon is-huge"
                        style={{'padding': '10px 0'}}>
                        <i className={'icon-' + i.name}/>
                      </span>
                    </div>

                    <div className="card-content has-text-centered">
                      <p className="title is-4">{i.displayName}</p>
                    </div>

                    <footer className="card-footer">
                      <p className="card-footer-item">{i.versions[0]}</p>
                    </footer>
                  </div>
                </a>
              </div>
              : null
            )}
          </div>

           <div className="columns is-centered">
            <div className="column has-text-centered">
              <Recaptcha
                sitekey={CONFIG.rcsitekey}
                onChange={(c) => this.setState({captcha: c})}
              />
            </div>
          </div>
          <div className="columns is-centered">
            <div className="column has-text-centered">
              <a className={'button is-large is-primary' +
                  (state.loading ? ' is-loading' : '')}
                onClick={this.launchClick.bind(this)}>
                <span className="icon">
                  <i className="fa fa-rocket"></i>
                </span>
                <span>Launch</span>
              </a>
            </div>
          </div>
            {state.error ?
              <div className="notification is-danger">
                {state.error.message}
              </div>
            : null}
        </div>
      </section>

      <section className="section">
        <div className="container">

          <div className="columns">

            <div className="column">
              <article className="media">
                <div className="media-left">
                  <figure className="icon is-large">
                    <i className="fa fa-user-times" aria-hidden="true"></i>
                  </figure>
                </div>
                <div className="media-content">
                  <div className="content">
                    <p>
                      <strong>Free</strong><br/>
                      Termbox is completely free, no sign up required.
                    </p>
                  </div>
                </div>
              </article>
            </div>

            <div className="column">
              <article className="media">
                <div className="media-left">
                  <figure className="icon is-large">
                    <i className="fa fa-shield" aria-hidden="true"></i>
                  </figure>
                </div>
                <div className="media-content">
                  <div className="content">
                    <p>
                      <strong>Secure</strong><br/>
                      Boxes are securely isolated in their own virtual
                      machine.
                    </p>
                  </div>
                </div>
              </article>
            </div>

            <div className="column">
              <article className="media">
                <div className="media-left">
                  <figure className="icon is-large">
                    <i className="fa fa fa-heartbeat" aria-hidden="true"></i>
                  </figure>
                </div>
                <div className="media-content">
                  <div className="content">
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

          <p className="has-text-centered">
            For more information, visit our <a href='/faq'>FAQ</a>.
          </p>

        </div>
      </section>

      <footer className="footer">
        <div className="container">
          <div className="content has-text-centered">
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
