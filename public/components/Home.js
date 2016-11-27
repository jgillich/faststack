import React, {Component} from 'react'
import {Link} from 'react-router';
import Recaptcha from 'react-google-recaptcha'

export default class App extends Component {

  constructor() {
    super()

    this.state = {

    }
  }

  createContainer() {

  }

  render() {
    return <div >

      <section className="hero">
        <div className="hero-body">
          <div className="container has-text-centered">
            <h1 className="title">
              Get instant access to a Linux machine!
            </h1>
          </div>
        </div>
      </section>


      <section className="section">
        <div className="container">

          <nav className="level">
            <div className="level-item">
             <p className="control has-addons">
                <a className="button is-large" href="#">
                  <span className="icon"><span className="fl-ubuntu"></span></span>
                  &nbsp;Ubuntu
                </a>
                <a className="button is-large" href="#">
                  <span className="icon"><span className="fl-debian"></span></span>
                  &nbsp;Debian
                </a>
                <a className="button is-large" href="#">
                  <span className="icon"><span className="fl-fedora"></span></span>
                  &nbsp;Fedora
                </a>
                <a className="button is-large" href="#">
                  <span className="icon"><span className="fl-centos"></span></span>
                  &nbsp;CentOS
                </a>
              </p>
            </div>

            <div className="level-item">
              <Recaptcha
                ref="recaptcha"
                sitekey="6LfgsAwUAAAAAJVKLSxG4Qk7K-ggw4wEvrxCbMGd"
              />
            </div>

            <div className="level-item">
               <a className="button is-large is-primary" href="#">
                Launch
              </a>
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
                        InstantLinux is completely free, no sign up required.
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
                        Containers are securely isolated in their own virtual
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
                        A container and all its data is automatically deleted after 6 hours.
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
