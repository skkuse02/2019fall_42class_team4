let express = require('express');
let router = express.Router();
let crypto = require('crypto');
let session = require('express-session');

//firebase initialize
let firebase = require('firebase');
let firebaseConfig = require('../firebaseConfig.json');

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
let firestore = firebase.firestore();

/*
작성자: 김진태
회원가입 수정
user collection에 유저 추가
*/
router.post('/', function(req, res, next) {
  let hashPW = crypto.createHash('sha512').update(req.body["password"]).digest('base64');
  let loginInfo = {};
  loginInfo['id'] = req.body["id"];
  loginInfo['password'] = hashPW;
  loginInfo['name'] = req.body["name"];
  loginInfo['customized_keyword'] = req.body["customized_keyword"];
  loginInfo['purchased_items'] = req.body["purchased_items"];
  loginInfo['posted_review'] = req.body["posted_review"];
  loginInfo['recommended_review'] = req.body["recommended_review"];

  firestore.collection('/user').where('id', '==', req.body["id"]).get()
  .then((snapshot) => {
    if(snapshot.empty){
      firestore.collection('/user').add(loginInfo);
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
