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
  firestore.collection('/users').doc(req.params.user_id).get()
    .then((snapshot) => {
      if (snapshot.empty) {
        throw 'No matching user documents'
      }
      snapshot.forEach((doc) => {
        res.status(200).send(doc.data())
      });
    })
    .catch((err) => {
      res.status(404).send(err.message)
    });
});

router.post('/', function (req, res, next) {
  firestore.collection('/users').add(req.body);
  res.send('Data Post Item');
});

router.put('/:user_id', function (req, res, next) {
  firestore.collection('/user').where('id', '==', req.params.user_id).get()
    .then((snapshot) => {
      if (snapshot.empty) {
        throw 'No matching user documents'
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
      res.status(404).send(err.message)
    });
});

router.put('/:user_id/:item_id', function (req, res, next) { // BUY the ITEM
  firestore.collection('/user').where('id', '==', req.params.user_id).get()
    .then((snapshot) => {
      if (snapshot.empty) {
        throw 'No matching user documents'
      }
      snapshot.forEach((doc) => {
        let hashPW = crypto.createHash('sha512').update(req.body.password).digest('base64');
        let item_id = req.params.item_id
        if(doc.data()["password"] == hashPW){
          if(doc.puchased_item.includes(item_id)) { res.status(200).send("Item is already in purchased Item") }
          else {
            doc.puchased_item.push(item_id)
            firestore.collection('/user').doc(doc.id).update({
              puchased_item: doc.puchased_item
            })
            res.status(200).send("Item purchase Complete");
          } 
        } else {
          console.log('PW Not Equal');
          res.status(400).send('PW Not Equal');
        }
      });
    })
    .catch((err) => {
      res.status(404).send(err.message)
    });
});

router.delete('/:user_id', function (req, res, next) {
  firestore.collection('/users').doc(req.params.user_id).get()
    .then((snapshot) => {
      if (snapshot.empty) {
        throw 'No matching documents'
      }
      snapshot.forEach((doc) => {
        firestore.collection('/users').doc(doc.id).delete()
        .then(()=>res.send('Data Delete Item'))
      });
    })
    .catch((err) => {
      res.status(404).send(err.message)
    });
});

router.delete('/:user_id/:item_id', function (req, res, next) {
  firestore.collection('/users').doc(req.params.user_id).get()
    .then((snapshot) => {
      if (snapshot.empty) {
        throw 'No matching user documents'
      }
      let item_id = req.params.item_id
      snapshot.forEach((doc) => {
        firestore.collection('/users').doc(doc.id).update({
          puchased_item: doc.puchased_item.filter(itemId => itemId!==item_id)
        })
        .then(()=>res.send('Data Delete Item'))
      });
    })
    .catch((err) => {
      res.status(404).send(err.message)
    });
});

module.exports = router;
