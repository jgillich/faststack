import {h, Component} from 'preact'

let script = document.createElement('script')
script.src = 'https://www.google.com/recaptcha/api.js?onload=grecaptchaCallback&render=explicit'
script.async = true
script.defer = true
document.body.appendChild(script)

let grecaptcha = null

window.grecaptchaCallback = () => {
  grecaptcha = window.grecaptcha
}

function onLoad(callback, attempts = 0) {
  if(grecaptcha) return callback();
  if(attempts == 50) {
    throw new Error('Recaptcha not loaded after 5 seconds, giving up')
  }
  setTimeout(() => onLoad(callback, attempts), 100)
}

export class Recaptcha extends Component {

  constructor(props) {
    super(props)

    this.state = {
      loaded: false
    }

    onLoad(() => {
      this.setState({loaded: true})
    })
  }

  componentDidMount() {
    this.componentDidUpdate()
  }

  componentDidUpdate() {
    if(this.state.loaded && this.state.widgetId === undefined) {
      let {sitekey, theme, type, size} = this.props;
      let id = grecaptcha.render(this.element, {
        sitekey, theme, type, size,
        callback: this.props.onChange,
        "expired-callback": () => this.props.onChange(null),
      })
      this.setState({
        widgetId: id,
      });
    }
  }

  render() {
    return <div ref={e => this.element = e}></div>
  }
}
