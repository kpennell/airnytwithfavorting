import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './containers/App'
import firebase from 'firebase';

import * as serviceWorker from './serviceWorker';

 const config = {
    apiKey: "AIzaSyAfIPGuz9TTbfVBccKFDfp6CqXB0YGNh_M",
    authDomain: "airnyt-2018.firebaseapp.com",
    databaseURL: "https://airnyt-2018.firebaseio.com",
    projectId: "airnyt-2018",
    storageBucket: "airnyt-2018.appspot.com",
    messagingSenderId: "1019693246322"
}

const uiConfig = {
  // Popup signin flow rather than redirect flow.
  signInFlow: 'popup',
  // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
  signInSuccessUrl: '/',
  // We will display Google and Facebook as auth providers.
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
       firebase.auth.EmailAuthProvider.PROVIDER_ID,
  ]
};

  const firebaseApp = firebase.initializeApp(config)
  // const database = firebaseApp.database()
  // export const googleprovider = new firebase.auth.GoogleAuthProvider();
  export const auth = firebase.auth();

// Routes	

ReactDOM.render(<App uiConfig={uiConfig} />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
