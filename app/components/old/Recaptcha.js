import Preact, {Component} from 'preact'

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
  if(grecaptcha) return setTimeout(callback, 0)
  if(attempts == 50) {
    throw new Error('Recaptcha not loaded after 5 seconds, giving up')
  }
  setTimeout(() => onLoad(callback, attempts++), 100)
}

export class Recaptcha extends Component {
  shouldComponentUpdate() {
    return false
  }

  renderCaptcha() {
    let {sitekey, theme, type, size} = this.props
    let elem = document.createElement('div')
    elem.style.display = 'inline-block'
    grecaptcha.render(elem, {
      sitekey, theme, type, size,
      'callback': this.props.onChange,
      'expired-callback': () => this.props.onChange(null),
    })
    this.base.appendChild(elem)
  }

  render() {
    onLoad(() => {
      this.renderCaptcha()
    })
    return <div></div>
  }
}
