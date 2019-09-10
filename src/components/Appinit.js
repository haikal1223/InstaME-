import React, { Component } from 'react';
import firebase from '@firebase/app'
import Main from '../components/Main'
import '@firebase/auth'
import { connect } from 'react-redux'
import { alreadyLogin, notLoginYet } from '../actions'

class Appinit extends Component {
    componentDidMount() {
         // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyCvxGiCj2sf7cL-O90MngA4TPYoeySfgfs",
    authDomain: "instame-53a54.firebaseapp.com",
    databaseURL: "https://instame-53a54.firebaseio.com",
    projectId: "instame-53a54",
    storageBucket: "instame-53a54.appspot.com",
    messagingSenderId: "996998488434",
    appId: "1:996998488434:web:1e6e2f052e7fdc0a"
  };
  // Initialize Firebase
  if(!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);

  }

  firebase.auth().onAuthStateChanged((user) => { // bukan dapetin res, dapetnya usernya aja
    if(user) {
      
      this.props.alreadyLogin({user})
    }else{
      this.props.notLoginYet()
    }
  })
}

  render() {
    return (
      <Main />
    )
  }
}

export default connect(null,{alreadyLogin, notLoginYet})(Appinit)