import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import swDev from './swDev';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

const swUrl = `${process.env.PUBLIC_URL}/sw.js`;
navigator.serviceWorker.register(swUrl).then((result) => {
  console.log('result', result)
})