import {h, Component} from 'preact'
import {Router, Link} from "preact-router"
import {LaunchContainer} from './Launch'
import Doc from './Doc'
import Term from './Term'

export default class App extends Component {

  render({children}) {
    return <div style={{height: '100%'}}>
      <nav class="nav has-shadow">
        <div class="container">
          <div class="nav-left">
            <Link class="nav-item is-brand" href="/">
              <img src="/assets/logo.png" alt="termbox logo"/>
            </Link>
          </div>

          <span class="nav-toggle">
            <span></span>
            <span></span>
            <span></span>
          </span>

          <div class="nav-right nav-menu">
            <Link class="nav-item" href="/">
              Home
            </Link>
            <Link class="nav-item" href="/doc/faq">
              FAQ
            </Link>
            <span class="nav-item">
              <a class="button" href="https://docs.google.com/forms/d/e/1FAIpQLSek1xv5kwutvxkt35TGyM7qEOoPWY9o2hAoNSWq1b6Bu9kykw/viewform">
                <span class="icon">
                  <i class="fa fa-comment"></i>
                </span>
                <span>Feedback</span>
              </a>
            </span>

          </div>
        </div>
      </nav>

      <Router>
        <LaunchContainer path='/'/>
        <Doc path='/doc/:name'/>
        <Term path='/term/:podId'/>
      </Router>
    </div>
  }

}
