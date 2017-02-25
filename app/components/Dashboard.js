import Preact from 'preact'
import BoxItem from './BoxItem'
import HTerm from './HTerm'

const Dashboard = ({name}) =>
  <section class="section">
    <div class="columns">
      <div class="column is-narrow">
        <div class="block">
          <a class="button is-primary">New</a>
        </div>
        <div class="block">
          <BoxItem/>
          <BoxItem/>
          <BoxItem/>
        </div>
      </div>
      <div class="column">
        <article class="message">
          <div class="message-header">
            <p>Debian 8</p>
            <button class="delete"></button>
          </div>
          <div class="message-body" style={{height: '500px'}}>
            <HTerm/>
          </div>
        </article>
      </div>
    </div>
  </section>

export default Dashboard
