import firebase from 'firebase';

var config = {
    apiKey: "AIzaSyAtcKnv7kv9x5b_BDHjbGhoXGiiH8CZk9I",
    authDomain: "potblock000.firebaseapp.com",
    databaseURL: "https://potblock000.firebaseio.com",
    projectId: "potblock000",
    storageBucket: "potblock000.appspot.com",
    messagingSenderId: "568143369201"
};

firebase.initializeApp(config);

export default firebase;