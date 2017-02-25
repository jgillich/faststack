import React from 'react'
import BoxItem from './BoxItem'
import Term from './Term'

const Dashboard = ({name}) =>
  <section class="section">
    <div class="columns">
      <div class="column is-2">
        <div class="block">
          <button class="button is-primary is-outlined is-fullwidth">
            New
          </button>
        </div>
        <nav class="panel">
          <BoxItem/>
          <BoxItem/>
          <BoxItem/>
          </nav>
      </div>
      <div class="column">
        <article class="message">
          <div class="message-header">
            <p>Debian 8</p>
            <button class="delete"></button>
          </div>
          <div class="message-body" style={{height: '500px'}}>
            <Term/>
          </div>
        </article>
      </div>
    </div>
  </section>

export default Dashboard
