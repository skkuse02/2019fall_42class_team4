let express = require('express');
let router = express.Router();

let firebase = require('firebase');
let firebaseConfig = require('../firebaseConfig.json');

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
let firestore = firebase.firestore();

// get all reviews
router.get('/', function (req, res, next) {
  let reviews = []
  firestore.collection('/reviews').get()
    .then((snapshot) => {
      if (snapshot.empty) {
        console.log('No matching documents');
        return;
      }
      snapshot.forEach((doc) => {
        console.log(doc.id, '=>', doc.data());
        reviews.push(doc.data())
      });
      res.send(reviews);
    })
    .catch((err) => {
      console.log('Error getting documents', err);
    });
});

// get Individual review
router.get('/:id', function (req, res, next) {
  let reviews = []
  firestore.collection('/reviews').where('id', '==', Number(req.params.id)).get()
    .then((snapshot) => {
      if (snapshot.empty) {
        console.log('No matching documents');
        return;
      }
      snapshot.forEach((doc) => {
        console.log(doc.id, '=>', doc.data());
        reviews.push(doc.data())
      });
      res.send(reviews)
    })
    .catch((err) => {
      console.log('Error getting documents', err);
    });
});

router.post('/', function (req, res, next) {
  firestore.collection('/reviews').add(req.body);
  res.send('Data Post Item');
});

router.put('/:id', function (req, res, next) {
  firestore.collection('/reviews').where('id', '==', Number(req.params.id)).get()
    .then((snapshot) => {
      if (snapshot.empty) {
        console.log('No matching documents');
        return;
      }
      snapshot.forEach((doc) => {
        firestore.collection('/reviews').doc(doc.id).set(req.body);
        console.log(doc.id, '=>', doc.data());
      });
    })
    .catch((err) => {
      console.log('Error getting documents', err);
    });
  res.send('Data Put Item');
});

router.delete('/:id', function (req, res, next) {
  firestore.collection('/reviews').where('id', '==', Number(req.params.id)).get()
    .then((snapshot) => {
      if (snapshot.empty) {
        console.log('No matching documents');
        return;
      }
      snapshot.forEach((doc) => {
        firestore.collection('/reviews').doc(doc.id).delete();
        console.log(doc.id, '=>', doc.data());
      });
    })
    .catch((err) => {
      console.log('Error getting documents', err);
    });
  res.send('Data Delete Item');
});

module.exports = router;
