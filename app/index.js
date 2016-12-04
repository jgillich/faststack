import 'font-awesome'
import 'font-mfizz/font/font-mfizz.css!'
import './styles/style.sass!'
import 'bulma/css/bulma.css!'
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
