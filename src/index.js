import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import App from './App';
import {BrowserRouter as Router } from 'react-router-dom';
import store from './store/store';
import './index.css';
import Background from './components/Background/Background';

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
      <Background />
    </Router>
  </Provider>,
  document.getElementById('root')
);