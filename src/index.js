import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { rootReducer } from './redux/rootReducer.js';


let store = createStore(rootReducer);

store.subscribe(() => console.log(store.getState()));



ReactDOM.render(
  <React.StrictMode>
    <Provider store = {store}>
       <App />
    </Provider>   
  </React.StrictMode>,
  document.getElementById('root')
);
