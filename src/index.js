import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import * as firebase from 'firebase'
import registerServiceWorker from './registerServiceWorker';
const store = configureStore();
var config = {
  apiKey: "AIzaSyB4gVY_Cpw5khJjvWhK5MF7pwh6x7V9jaw",
    authDomain: "auction-app-7b58a.firebaseapp.com",
    databaseURL: "https://auction-app-7b58a.firebaseio.com",
    projectId: "auction-app-7b58a",
    storageBucket: "auction-app-7b58a.appspot.com",
    messagingSenderId: "431936014331"
};
  firebase.initializeApp(config);
ReactDOM.render(<MuiThemeProvider >
                  <Provider store={store}>
                      <App />
                  </Provider>
              </MuiThemeProvider>, document.getElementById('root'));
registerServiceWorker();
