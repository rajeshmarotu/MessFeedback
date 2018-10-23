const firebase = require("firebase");
require("firebase/firestore");
var config = {
    apiKey: "AIzaSyAJ_lw37Lpypavf3hW90OJ68zY6YVFbahI",
    authDomain: "messreview.firebaseapp.com",
    databaseURL: "https://messreview.firebaseio.com",
    projectId: "messreview",
    storageBucket: "messreview.appspot.com",
    messagingSenderId: "742008892939"
  };
  if (!firebase.apps.length) {
    firebase.initializeApp(config);
  }

  var db = firebase.firestore();
  db.settings({
    timestampsInSnapshots: true
  });
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      export default db;
