import 'whatwg-fetch'

import React from 'react'
import {render} from 'react-dom'
import {Provider} from 'react-redux'
import App from './components/App'
import Router from './components/Router'
import createStore from './store'

const store = createStore()

const container = document.createElement('div')
container.style.height = '100%'

render(
  <Provider store={store}>
    <Router/>
  </Provider>,
  container
)

document.body.appendChild(container)
