import 'font-awesome'
import 'fizzed/font-mfizz/font-mfizz.css!'
import 'bulma/css/bulma.css!'
import './styles/style.sass!'
import 'whatwg-fetch'

import {h, render} from 'preact'
import {Provider} from 'preact-redux';
import App from './components/App'
import createStore from './store'

const store = createStore()

const container = document.createElement('div')
container.style.height = '100%'

render(
  <Provider store={store}>
    <App/>
  </Provider>,
  container
)

document.body.appendChild(container)
