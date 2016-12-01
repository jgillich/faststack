import React, {Component} from 'react'
import {Link} from 'react-router';
import Recaptcha from 'react-google-recaptcha'
import images from "../config/images.json!"

export default class App extends Component {

  constructor(props) {
    super(props)

    this.state = {
        activeImage: images[0]
    }
  }

  setActive(image) {
    this.setState({
      activeImage: image
    })
  }

  createContainer() {

  }

  render() {
    return <div >

      <section className="hero is-primary">
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
              <div className="tabs is-toggle">
                <ul>
                  {images.map((image) =>
                    <li className={this.state.activeImage.name == image.name ? 'is-active' : ''} key={image.name}>
                      <a onClick={e => this.setActive(image)}>
                        <span className="icon is-large"><i className={'icon-' + image.name}></i></span>
                        <span>{image.displayName}</span>
                      </a>
                    </li>
                  )}
                </ul>
              </div>
            </div>
            <div className="level-item">
              <Recaptcha
                ref="recaptcha"
                sitekey="6LfgsAwUAAAAAJVKLSxG4Qk7K-ggw4wEvrxCbMGd"
                onChange={e => null}
              />
            </div>

            <div className="level-item">
              <Link className="button is-large is-primary">
                <span className="icon">
                  <i className="fa fa-rocket"></i>
                </span>
                <span>Launch</span>
              </Link>
            </div>
          </nav>
        </div>
      </section>


      <section className="section">
        <div className="container">

          <div className="columns">

            <div className="column">
              <div className="box">
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
            </div>

            <div className="column">
              <div className="box">
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
            </div>

            <div className="column">
              <div className="box">
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

          </div>
          <p className="has-text-centered">For more information, visit our <Link to='/faq'>FAQ</Link>.</p>

        </div>
      </section>
    </div>
  }

}
