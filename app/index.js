import 'whatwg-fetch'
import './styles/style.sass'

import {render} from './components/App'

Stripe.setPublishableKey(process.env.STRIPE_PUBKEY)

render()
