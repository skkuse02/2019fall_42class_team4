var express = require('express');
var router = express.Router();

var firebase = require('firebase');
var firebaseConfig = require('../firebaseConfig.json');

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
var firestore = firebase.firestore();

/* GET users listing. */
router.get('/:id', function(req, res, next){
  firestore.collection('/users').where('id', '==', Number(req.params.id)).get()
    .then((snapshot) => {
      if(snapshot.empty){
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

router.post('/', function(req, res, next){
  firestore.collection('/users').add(req.body);
  res.send('Data Post Item');
});

router.put('/:id', function(req, res, next){
  firestore.collection('/users').where('id', '==', Number(req.params.id)).get()
    .then((snapshot) => {
      if(snapshot.empty){
        console.log('No matching documents');
        return;
      }
      snapshot.forEach((doc) => {
        firestore.collection('/users').doc(doc.id).set(req.body);
        console.log(doc.id, '=>', doc.data());
      });
    })
    .catch((err) => {
      console.log('Error getting documents', err);
  });
  res.send('Data Put Item');
});

router.delete('/:id', function(req, res, next){
  firestore.collection('/users').where('id', '==', Number(req.params.id)).get()
    .then((snapshot) => {
      if(snapshot.empty){
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
