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
firebase collection 불러오는 것을 login에서 user로 변경
user에 실질적인 데이터가 들어갈 것이라고 생각해서 변경
user에 id, password key값을 사용

추후 users 등의 collection이 생기게 되면 아래 코드 중 33번째 줄을 변경해야 함
*/

router.post('/', (req, res) => {
  let hashPW = crypto.createHash('sha512').update(req.body["PW"]).digest('base64');
  let loginInfo = {};
  loginInfo['ID'] = req.body["ID"];
  loginInfo['PW'] = hashPW;

  firestore.collection('/user').where('id', '==', req.body["ID"]).get()
  .then((snapshot) => {
    if(snapshot.empty){
      console.log('ID Not Exist');
      res.status(404).send('ID Not Exist');
      return;
    }
    snapshot.forEach((doc) => {
      if(doc.data()["password"] == loginInfo["PW"]){
        console.log('PW Equal');
        session = req.session;
        // session.username = loginInfo["ID"];
        session.userInfo = doc.data(); // user object 전송
        console.log('LOGIN Success', session.userInfo)
        res.status(200).json(session);
      } else {
        console.log('PW Not Equal');
        res.status(400).send('PW Not Equal');
      }
    });
  })
  .catch((err) => {
    console.log('Error Getting ID', err);
    res.status(400).send(err);
  });
});

router.get('/info', (req, res) => {
   return res.json(req.session);
});

module.exports = router;
