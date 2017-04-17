import {Component} from 'react'
import {withRouter} from 'react-router'

class ScrollToTop extends Component {
  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      window.scrollTo(0, 0)
    }
  }

  render() {
    return null
  }
}

export default withRouter(ScrollToTop)
