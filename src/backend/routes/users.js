let express = require('express');
let router = express.Router();
let crypto = require('crypto');

let firebase = require('firebase');
let firebaseConfig = require('../firebaseConfig.json');

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
let firestore = firebase.firestore();

/* GET user matching the id */
router.get('/:user_id', function (req, res, next) {
  firestore.collection('/users').where('id', '==', Number(req.params.user_id)).get()
    .then((snapshot) => {
      if (snapshot.empty) {
        console.log('No matching documents');
        return;
      }
      snapshot.forEach((doc) => {
        console.log(doc.id, '=>', doc.data());
      });
    })
    .catch((err) => {
      console.log('Error getting documents', err);
    });
  res.send('Data Get Item');
});

router.post('/', function (req, res, next) {
  firestore.collection('/users').add(req.body);
  res.send('Data Post Item');
});

router.put('/:user_id', function (req, res, next) {
  firestore.collection('/user').where('id', '==', req.params.user_id).get()
    .then((snapshot) => {
      if (snapshot.empty) {
        console.log('No matching documents');
        return;
      }
      snapshot.forEach((doc) => {
        let hashPW = crypto.createHash('sha512').update(req.body.password).digest('base64');
        if(doc.data()["password"] == hashPW){
          if(req.body.type === "keyword_change") {
            console.log("keyword change")
            firestore.collection('/user').doc(doc.id).update({
              customized_keyword: req.body.keywords
            })
          } else {
            console.log("password change")
            const change = crypto.createHash('sha512').update(req.body.changePassword).digest('base64')
            firestore.collection('/user').doc(doc.id).update({
              password: change
            })
          }
          res.status(200).send("Modify Success");
        } else {
          console.log('PW Not Equal');
          res.status(400).send('PW Not Equal');
        }
      });
    })
    .catch((err) => {
      console.log('Error getting documents', err);
    });
});

router.put('/:user_id/:item_id', function (req, res, next) {
  // firestore.collection('/user').where('id', '==', req.params.id).get()
  //   .then((snapshot) => {
  //     if (snapshot.empty) {
  //       console.log('No matching documents');
  //       return;
  //     }
  //     snapshot.forEach((doc) => {
  //       let hashPW = crypto.createHash('sha512').update(req.body.password).digest('base64');
  //       if(doc.data()["password"] == hashPW){
  //         if(req.body.type === "keyword_change") {
  //           console.log("keyword change")
  //           firestore.collection('/user').doc(doc.id).update({
  //             customized_keyword: req.body.keywords
  //           })
  //         } else {
  //           console.log("password change")
  //           const change = crypto.createHash('sha512').update(req.body.changePassword).digest('base64')
  //           firestore.collection('/user').doc(doc.id).update({
  //             password: change
  //           })
  //         }
  //         res.status(200).send("Modify Success");
  //       } else {
  //         console.log('PW Not Equal');
  //         res.status(400).send('PW Not Equal');
  //       }
  //     });
  //   })
  //   .catch((err) => {
  //     console.log('Error getting documents', err);
  //   });
});

router.delete('/:id', function (req, res, next) {
  firestore.collection('/users').where('id', '==', Number(req.params.id)).get()
    .then((snapshot) => {
      if (snapshot.empty) {
        console.log('No matching documents');
        return;
      }
      snapshot.forEach((doc) => {
        firestore.collection('/users').doc(doc.id).delete();
        console.log(doc.id, '=>', doc.data());
      });
    })
    .catch((err) => {
      console.log('Error getting documents', err);
    });
  res.send('Data Delete Item');
});

module.exports = router;
