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

router.post('/', function(req, res, next) {
  let hashPW = crypto.createHash('sha512').update(req.body["PW"]).digest('base64');
  let loginInfo = {};
  loginInfo['ID'] = req.body["ID"];
  loginInfo['PW'] = hashPW;

  firestore.collection('/login').where('ID', '==', req.body["ID"]).get()
  .then((snapshot) => {
    if(snapshot.empty){
      console.log('ID Not Exist');
      res.status(404).send('ID Not Exist');
      return;
    }
    snapshot.forEach((doc) => {
      if(doc.data()["PW"] == loginInfo["PW"]){
        console.log('PW Equal');
        session = req.session;
        session.username = loginInfo["ID"];
        res.status(200).send('PW Equal');
        return res.json(session);
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
