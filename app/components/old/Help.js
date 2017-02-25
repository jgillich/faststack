import React from 'react'
import Pages from '../pages/index'

const isActive = (yes) => yes ? ' is-active' : ''

const Help = ({name}) =>
  <div>
    <nav class="nav has-shadow">
      <div class="container">
        <div class="nav-left">
          <a class={'nav-item is-tab' + isActive(name == 'boxes')} href="/help/boxes">
            Boxes
          </a>
          <a class={'nav-item is-tab' + isActive(name == 'terminal')} href="/help/terminal">
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
