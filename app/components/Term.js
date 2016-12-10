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

      <section className="section" style={{height: '85%'}}>

        <div className="container" style={{height: '100%'}}>
          {box ?
          <HTerm podId={podId} ref={(r) => this.hterm = r}
            onOpen={() => this.setState({state: 'connected'})}
            onClose={() => this.setState({state: 'disconnected'})}
            getThemeChangeHandler={(h) => this.setTheme = h}
            />
          : null}
        </div>
      </section>

      <footer className="footer">
        <div className="container">
          <div className="content has-text-centered">
            <nav className="level">
              <div className="level-item has-text-centered">
                <p className="heading">Status</p>
                {error ?
                  <p className="title has-text-danger">{error.message}</p>
                : state != 'connected' ?
                  <p className="title has-text-danger">Connecting</p> :
                  <p className="title">Connected</p>
                }

              </div>
              {/* TODO
              <div class="level-item has-text-centered">
                <p class="heading">Distribution</p>
                <p class="title">Ubuntu 16.04</p>
              </div>
              */}
              <div className="level-item has-text-centered">
                <p className="heading">Time remaining</p>
                <p className="title">
                  {humanizeDuration(timeRemaining * 1000, {largest: 2})}
                </p>
              </div>
              {CONFIG.addr && box ?
                <div className="level-item has-text-centered">
                  <p className="heading">Public port</p>
                  <p className="title">
                    {CONFIG.addr}:{box.port}
                  </p>
                </div>
              : null}

              <div className="level-item has-text-centered">
                <p className="heading">Theme</p>
                <p className="title">
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
