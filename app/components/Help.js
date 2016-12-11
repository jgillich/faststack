import Preact from 'preact'
import Pages from '../pages/index'


const Help = ({name}) =>
  <div>
    <nav class="nav has-shadow">
      <div class="container">
        <div class="nav-left">
          <a class={'nav-item is-tab ' + (name == 'boxes' ? 'is-active' : '')} href="/help/boxes">
            Boxes
          </a>
          <a class={'nav-item is-tab ' + (name == 'terminal' ? 'is-active' : '')} href="/help/terminal">
            Terminal
          </a>
        </div>
      </div>
    </nav>
    <section class="section">
    <div class="container content"
      dangerouslySetInnerHTML={{__html: Pages[name] ? Pages[name] : Pages['notfound']}}/>
    </section>
  </div>

export default Help
