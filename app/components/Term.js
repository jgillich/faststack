import {h, Component} from 'preact'
import HTerm from './HTerm'

export default class Term extends Component {

  constructor(props) {
    super(props)
  }

  render({podId}, {state}) {
    return <div style={{height: '90%'}}>

      <section class="section" style={{height: '85%'}}>
        <div class="container" style={{height: '100%'}}>

          <HTerm podId={podId} ref={(r) => this.hterm = r}
            onOpen={() => this.setState({state: 'connected'})}
            onClose={() => this.setState({state: 'disconnected'})}/>


          {state == 'disconnected' ?
          <nav class="level">
            <div class="level-left">
              <div class="level-item has-text-danger">The connection to the server was lost. Trying to reconnect... </div>
              </div>
          </nav>
          : null}
        </div>
      </section>

      <footer class="footer">
        <div class="container">
          <div class="content has-text-centered">
            <p>
              <strong>Want more?</strong>{' '}
              <a href="http://www.vultr.com/?ref=7052736-3B">Sign up for Vultr</a>{' '}
              and get $20 credit for high speed virtual servers.
            </p>
          </div>
        </div>
      </footer>
    </div>
  }
}
