import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';

import * as serviceWorker from './serviceWorker';

import App from './App';

import { EMPTY_STORE_LITERAL, storeModel } from '@/store';

import './bootstrap/bootstrap.scss';

const store = storeModel.create(EMPTY_STORE_LITERAL);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
