let express = require('express');
let router = express.Router();

let firebase = require('firebase');
let firebaseConfig = require('../firebaseConfig.json');

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
let firestore = firebase.firestore();

/* GET users listing. */
router.get('/:id', function (req, res, next) {
  firestore.collection('/users').where('id', '==', Number(req.params.id)).get()
    .then((snapshot) => {
      if (snapshot.empty) {
        console.log('No matching documents');
        res.status(404).send('No Matching Reviews');
        return;
      }
      snapshot.forEach((doc) => {
        console.log(doc.id, '=>', doc.data());
        reviews.push(doc.data());
      });
      res.status(200).send(reviews);
    })
    .catch((err) => {
      console.log('Error getting documents', err);
      res.status(400).send(err);
    });
});

router.post('/', function (req, res, next) {
  firestore.collection('/users').where('id', '==', Number(req.params.id)).get()
  .then((snapshot) => {
    if(snapshot.empty){
      firestore.collection('/users').add(req.body);
      console.log('User Post');
      res.status(201).send('User Post');
      return;
    } else {
      console.log('User Already Exist');
      res.status(400).send('User Already Exist');
    }
  })
  .catch((err) => {
    console.log('Error Getting Reviews', err);
    res.status(400).send(err);
  });
});

router.put('/:id', function (req, res, next) {
  firestore.collection('/users').where('id', '==', Number(req.params.id)).get()
    .then((snapshot) => {
      if (snapshot.empty) {
        firestore.collection('/users').add(req.body);
        console.log('No Matching Users & Review Users');
        res.status(201).send('No Matching Users & Review Users');
        return;
      }
      snapshot.forEach((doc) => {
        firestore.collection('/users').doc(doc.id).set(req.body);
        console.log(doc.id, '=>', doc.data());
      });
      res.status(200).send('Review Put');
    })
    .catch((err) => {
      console.log('Error getting documents', err);
      res.status(400).send(err);
    });
});

router.delete('/:id', function (req, res, next) {
  firestore.collection('/users').where('id', '==', Number(req.params.id)).get()
    .then((snapshot) => {
      if (snapshot.empty) {
        console.log('No matching documents');
        res.status(404).send('No Matching Users');
        return;
      }
      snapshot.forEach((doc) => {
        firestore.collection('/users').doc(doc.id).delete();
        console.log(doc.id, '=>', doc.data());
      });
      res.status(200).send('Review Delete');
    })
    .catch((err) => {
      console.log('Error getting documents', err);
      res.status(400).send(err);
    });
});

module.exports = router;
