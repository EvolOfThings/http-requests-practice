import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import axios from 'axios';

// global
axios.interceptors.request.use(request => {
    console.log(request);
    //edit the request config and ALWAYS return
    return request;
}, error => {
    console.log(error);  //error handling for sending request for no net connectivity
    return Promise.reject(error);
});

axios.interceptors.response.use(response => {
    console.log(response);
    //edit the request config and ALWAYS return
    return response;
}, error => {
    console.log(error);
    return Promise.reject(error);
});

const rootEl = document.getElementById('root')

ReactDOM.render(
  <App />,
  rootEl
)

if (module.hot) {
  module.hot.accept('./App', () => {
    const NextApp = require('./App').default
    ReactDOM.render(
      <NextApp />,
      rootEl
    )
  })
}

registerServiceWorker();
