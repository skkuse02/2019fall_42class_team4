let express = require('express');
let router = express.Router();

// use firebase
let firebase = require('firebase');
let firebaseConfig = require('../firebaseConfig.json');

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
let firestore = firebase.firestore();

// get all items (it will be replaced by router.get('/?query',) {...} )
router.get('/', function (req, res, next) {
  let items = []
  firestore.collection('/items').get()
    .then((snapshot) => {
      if (snapshot.empty) {
        console.log('No matching documents');
        return;
      }
      snapshot.forEach((doc) => {
        console.log(doc.id, '=>', doc.data());
        items.push(doc.data())
      });
      res.send(items);
    })
    .catch((err) => {
      console.log('Error getting documents', err);
    });
});

// get specific item by id
router.get('/:id', function (req, res, next) {
  let items = []
  firestore.collection('/items').where('id', '==', Number(req.params.id)).get()
    .then((snapshot) => {
      if (snapshot.empty) {
        console.log('No matching documents');
        return;
      }
      snapshot.forEach((doc) => {
        console.log(doc.id, '=>', doc.data());
        items.push(doc.data())
      });
      res.send(items);
    })
    .catch((err) => {
      console.log('Error getting documents', err);
    });
});

router.post('/', function (req, res, next) {
  firestore.collection('/items').add(req.body);
  res.send('Data Post Item');
});

router.put('/:id', function (req, res, next) {
  firestore.collection('/items').where('id', '==', Number(req.params.id)).get()
    .then((snapshot) => {
      if (snapshot.empty) {
        console.log('No matching documents');
        return;
      }
      snapshot.forEach((doc) => {
        firestore.collection('/items').doc(doc.id).set(req.body);
        console.log(doc.id, '=>', doc.data());
      });
    })
    .catch((err) => {
      console.log('Error getting documents', err);
    });
  res.send('Data Put Item');
});

router.delete('/:id', function (req, res, next) {
  firestore.collection('/items').where('id', '==', Number(req.params.id)).get()
    .then((snapshot) => {
      if (snapshot.empty) {
        console.log('No matching documents');
        return;
      }
      snapshot.forEach((doc) => {
        firestore.collection('/items').doc(doc.id).delete();
        console.log(doc.id, '=>', doc.data());
      });
    })
    .catch((err) => {
      console.log('Error getting documents', err);
    });
  res.send('Data Delete Item');
});

module.exports = router;
