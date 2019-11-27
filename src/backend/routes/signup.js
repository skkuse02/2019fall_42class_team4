var express = require('express');
var router = express.Router();
var crypto = require('crypto');
var session = require('express-session');

//firebase initialize
var firebase = require('firebase');
var firebaseConfig = require('../firebaseConfig.json');

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
var firestore = firebase.firestore();

router.post('/', function(req, res, next) {
  var hashPW = crypto.createHash('sha512').update(req.body["PW"]).digest('base64');
  var loginInfo = {};
  loginInfo['ID'] = req.body["ID"];
  loginInfo['PW'] = hashPW;

  firestore.collection('/login').where('ID', '==', req.body["ID"]).get()
  .then((snapshot) => {
    if(snapshot.empty){
      firestore.collection('/login').add(loginInfo);
      console.log('Sign Up');
      res.status(201).send('Sign Up');
      return;
    } else {
      console.log('ID Already Exist');
      res.status(400).send('ID Already Exist');
    }
  })
  .catch((err) => {
    console.log('Error Getting ID', err);
    res.status(400).send(loginInfo);
  });
});

module.exports = router;
