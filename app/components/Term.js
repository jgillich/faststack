import Preact, {Component} from 'preact'
import HTerm from './HTerm'
import themes from '../themes'
import humanizeDuration from 'humanize-duration'

export default class Term extends Component {

  constructor(props) {
    super(props)

    fetch(`/boxes/${props.podId}`).then((res) =>{
      if(res.status != 200) {
        res.text().then((reason) => {
          this.setState({error: new Error(reason)})
        })
        return Promise.reject()
      }
      return res.json()
    }).then((box) => {
      this.setState({
        box: box,
        timeRemaining: box.timeRemaining,
      })

      this.timeUpdateId = setInterval(() => {
        this.setState({timeRemaining: this.state.timeRemaining - 60})
      }, 60 * 1000)
    })
  }

  componentWillUnmount() {
    clearInterval(this.timeUpdateId)
  }

  render({podId}, {error, state, box, timeRemaining}) {
    return <div style={{height: '90%'}}>

      <section class="section" style={{height: '85%'}}>
        <div class="columns" style={{height: '100%'}}>

          <div class="column is-offset-1 is-10" style={{height: '100%'}}>
            <div class="container" style={{height: '100%'}}>
              {box ?
              <HTerm podId={podId} ref={(r) => this.hterm = r}
                onOpen={() => this.setState({state: 'connected'})}
                onClose={() => this.setState({state: 'disconnected'})}
                getThemeChangeHandler={(h) => this.setTheme = h}
                />
              : null}
            </div>
          </div>

          <div class="column is-1">
            <a href="https://www.vultr.com/?ref=7052736-3B"><img src="https://www.vultr.com/media/banner_4.png" width="160" height="600"/></a>
          </div>

        </div>
      </section>

      <footer class="footer">
        <div class="container">
          <div class="content has-text-centered">
            <nav class="level">
              <div class="level-item has-text-centered">
                <p class="heading">Status</p>
                {error ?
                  <p class="title has-text-danger">{error.message}</p>
                : state != 'connected' ?
                  <p class="title has-text-danger">Connecting</p> :
                  <p class="title">Connected</p>
                }
              </div>
              <div class="level-item has-text-centered">
                <p class="heading">Time remaining</p>
                <p class="title">
                  {humanizeDuration(timeRemaining * 1000, {
                    units: ['h', 'm'], round: true, largest: 2})}
                </p>
              </div>
              {CONFIG.addr && box && box.port ?
                <div class="level-item has-text-centered">
                  <p class="heading">Public port</p>
                  <p class="title">
                    {CONFIG.addr}:{box.port}
                  </p>
                </div>
              : null}

              <div class="level-item has-text-centered">
                <p class="heading">Theme</p>
                <p class="title">
                  {themes.map((t) =>
                    <span>
                      <a style={{'display': 'inline-block',
                        'border-radius': '50%',
                        'width': '30px', 'height': '30px',
                        'background-color': t.values['background-color'],
                        'border': '1px solid black'}}
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
