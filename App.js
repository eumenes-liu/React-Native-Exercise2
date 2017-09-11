import React from 'react';
import { StyleSheet, Text, View, ListView } from 'react-native';
import * as firebase from 'firebase';
import LoginForm from './components/LoginForm';

const firebaseConfig = {
  apiKey: "AIzaSyAgjNGL3q44uDYQfnRlEB551JpYQXTPGL8",
  authDomain: "tutorial-ca71e.firebaseapp.com",
  databaseURL: "https://tutorial-ca71e.firebaseio.com",
  projectId: "tutorial-ca71e",
  storageBucket: "tutorial-ca71e.appspot.com",
  messagingSenderId: "1032204070800"
};
const firebaseApp = firebase.initializeApp(firebaseConfig);
console.ignoredYellowBox = [
  "Setting a timer"
];

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container} behavior="padding">
        <LoginForm style={styles.login}/>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f2f2f2',
    // alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    padding: 50
  },
  login: {
    flex: 1
  }
});
