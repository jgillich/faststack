import React from 'react'
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import App from './components/App'
import {Router} from './components/Router'
import styles from './styles/index'
import createStore from './store';


const store = createStore();

const container = document.createElement('div');

render(
  <Provider store={store}>
    <Router/>
  </Provider>,
  container
);

document.body.appendChild(container);
