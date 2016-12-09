import Preact, {Component} from 'preact'
import {Router, Link} from 'preact-router'
import {LaunchContainer} from './Launch'
import Page from './Page'
import Term from './Term'
import Pricing from './Pricing'

export default class App extends Component {

  render({children}) {
    return <div style={{height: '100%'}}>
      <nav className="nav has-shadow">
        <div className="container">
          <div className="nav-left">
            <Link class="nav-item is-brand" href="/">
              <img src="/app/assets/logo.png" alt="termbox logo"/>
            </Link>
          </div>

          <span className="nav-toggle">
            <span></span>
            <span></span>
            <span></span>
          </span>

          <div className="nav-right nav-menu">
            <Link class="nav-item" href="/">
              Home
            </Link>
            <Link class="nav-item" href="/faq">
              FAQ
            </Link>
            <span className="nav-item">
              <a className="button" href="https://docs.google.com/forms/d/e/1FAIpQLSek1xv5kwutvxkt35TGyM7qEOoPWY9o2hAoNSWq1b6Bu9kykw/viewform">
                <span className="icon">
                  <i className="fa fa-comment"></i>
                </span>
                <span>Feedback</span>
              </a>
            </span>

          </div>
        </div>
      </nav>

      <Router>
        <LaunchContainer path='/'/>
        <Term path='/term/:podId'/>
        <Pricing path='/pricing'/>
        <Page path='/:name'/>
      </Router>
    </div>
  }

}
