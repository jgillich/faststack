import Preact, {Component} from 'preact'
import {Router, Link} from 'preact-router'
import {LaunchContainer} from './Launch'
import Page from './Page'
import Term from './Term'
import Pricing from './Pricing'
import Help from './Help'
import Dashboard from './Dashboard'

export default class App extends Component {

  render({children}) {
    return <div style={{height: '100%'}}>
      <nav class="nav has-shadow">
        <div class="nav-left">
          <Link class="nav-item is-brand" href="/">
            <img src="/app/assets/logo.png" alt="termbox logo"/>
          </Link>
        </div>

        <span class="nav-toggle">
          <span></span>
          <span></span>
          <span></span>
        </span>

        <div class="nav-right nav-menu">
          <a class="nav-item is-tab is-active">
            Boxes
          </a>
          <a class="nav-item is-tab">
            Help
          </a>
          <a class="nav-item is-tab">
            <figure class="image is-16x16" style="margin-right: 8px;">
              <img src="http://bulma.io/images/jgthms.png"/>
            </figure>
            Account
          </a>

        </div>
      </nav>

      <Router>
        <LaunchContainer path='/'/>
        <Term path='/term/:podId'/>
        <Pricing path='/pricing'/>
        <Dashboard path='/dashboard'/>
        <Page path='/page/:name'/>
        <Help path='/help/:name'/>
      </Router>
    </div>
  }

}
