import {h, Component} from 'preact'
import HTerm from './HTerm'
import themes from '../themes'
import humanizeDuration from 'humanize-duration'

export default class Term extends Component {

  constructor(props) {
    super(props)

    fetch(`/boxes/${props.podId}`).then((res) =>{
      return res.json()
    }).then((box) => {
      this.setState({
        timeRemaining: box.timeRemaining
      })

      this.timeUpdateId = setInterval(() => {
        this.setState({timeRemaining: this.state.timeRemaining - 60})
      }, 60 * 1000)
    })
  }

  componentWillUnmount() {
    clearInterval(this.timeUpdateId)
  }

  render({podId}, {state, timeRemaining}) {
    return <div style={{height: '90%'}}>

      <section class="section" style={{height: '85%'}}>
        <div class="container" style={{height: '100%'}}>

          <HTerm podId={podId} ref={(r) => this.hterm = r}
            onOpen={() => this.setState({state: 'connected'})}
            onClose={() => this.setState({state: 'disconnected'})}
            getThemeChangeHandler={(h) => this.setTheme = h}
            />
        </div>
      </section>

      <footer class="footer">
        <div class="container">
          <div class="content has-text-centered">
            <nav class="level">
              <div class="level-item has-text-centered">
                <p class="heading">Status</p>
                {state == 'disconnected' ?<p class="title has-text-danger">Reconnecting</p>
                : <p class="title">Connected</p>}
              </div>
              {/* TODO
              <div class="level-item has-text-centered">
                <p class="heading">Distribution</p>
                <p class="title">Ubuntu 16.04</p>
              </div>
              */}
              <div class="level-item has-text-centered">
                <p class="heading">Time remaining</p>
                <p class="title">{humanizeDuration(timeRemaining * 1000, { largest: 2 })}</p>
              </div>
              <div class="level-item has-text-centered">
                <p class="heading">Theme</p>
                <p class="title">
                  {themes.map((t) =>
                    <span>
                      <a style={{display: 'inline-block', 'border-radius': '50%',
                        width: '30px', height: '30px', 'background-color': t.values['background-color'], border: '1px solid black'}}
                        onClick={() => this.setTheme(t)}/>
                        {' '}
                    </span>
                  )}
                </p>
              </div>
            </nav>
          </div>
        </div>
      </footer>
    </div>
  }
}
