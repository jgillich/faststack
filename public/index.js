import React from 'react'
import {render} from "react-dom";
import {browserHistory} from "react-router";
import {syncHistoryWithStore} from "react-router-redux";
import {Provider} from "react-redux";
import App from './components/App'
import {Router} from './components/Router'
import styles from './styles/index'
import createStore from "./store";


const store = createStore();

const history = syncHistoryWithStore(browserHistory, store);

const container = document.createElement("div");

render(
  <Provider store={store}>
    <Router history={history} store={store}/>
  </Provider>,
  container
);

document.body.appendChild(container);
