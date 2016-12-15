import Preact, {Component} from 'preact'
import {Router, Link} from 'preact-router'
import {LaunchContainer} from './Launch'
import Page from './Page'
import Term from './Term'
import Pricing from './Pricing'
import Help from './Help'

export default class App extends Component {

  render({children}) {
    return <div style={{height: '100%'}}>
      <nav class="nav has-shadow">
        <div class="container">
          <div class="nav-left">
            <Link class="nav-item is-brand" target="_blank" href="/">
              <img src="/app/assets/logo.png" alt="termbox logo"/>
            </Link>
          </div>

          <span class="nav-toggle">
            <span></span>
            <span></span>
            <span></span>
          </span>

          <div class="nav-right nav-menu">
            <Link class="nav-item" target="_blank" href="/">
              Home
            </Link>
            <Link class="nav-item" target="_blank" href="/help/boxes">
              Help
            </Link>
            <span class="nav-item">
              <a class="button" target="_blank" href="https://github.com/termbox/termbox">
                <span class="icon">
                  <i class="fa fa-github"></i>
                </span>
                <span>GitHub</span>
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
        <Help path='/help/:name'/>
      </Router>
    </div>
  }

}
