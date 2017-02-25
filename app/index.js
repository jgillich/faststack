import 'whatwg-fetch'
import './styles/style.sass'

import createStore from './store'
import {render} from './components/App'

render(createStore())
