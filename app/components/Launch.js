import React, {Component} from 'react'
import {Link} from 'react-router'
import {connect} from 'react-redux'
import Recaptcha from 'react-google-recaptcha'
import images from "../images.json!"
import {createBox} from '../actions/box'

export class Launch extends Component {

  constructor(props) {
    super(props)

    this.state = {
        image: images[0]
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

  render() {
    let {box} = this.props

    return <div >

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

          <nav className="level">
            <div className="level-item">
              <p className="control has-addons">
                {images.map((image) =>
                  <a onClick={e => this.setState({image: image})}
                     className={'button is-medium' + (this.state.image.name == image.name ? ' is-primary' : '')}
                     key={image.name}>
                    <span className="icon">
                      <i className={'icon-' + image.name}></i>
                    </span>
                    <span>{image.displayName}</span>
                  </a>
                )}
              </p>
            </div>
            <div className="level-item">
              <Recaptcha
                ref="recaptcha"
                sitekey="6Lf-uw0UAAAAACcJpyWXVZMgNlG-fkS7Nscshkmq"
                onChange={c => this.setState({captcha: c})}
              />
            </div>

            <div className="level-item">
              <a className={'button is-medium is-primary' + (box.loading ? ' is-loading' : '')}
                 onClick={this.launchClick.bind(this)}>
                <span className="icon">
                  <i className="fa fa-rocket"></i>
                </span>
                <span>Launch</span>
              </a>
            </div>
          </nav>

          {box.error ?
            <div className="notification is-danger">
              {box.error.message}
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
                      6 hours.
                    </p>
                  </div>
                </div>
              </article>
            </div>

          </div>
          <p className="has-text-centered">For more information, visit our <Link to='/faq'>FAQ</Link>.</p>

        </div>
      </section>

    </div>
  }

}


export const LaunchContainer = connect(
  state => ({box: state.box}),
  dispatch => ({dispatch})
)(Launch);