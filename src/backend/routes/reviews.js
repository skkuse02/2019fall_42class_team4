let express = require('express');
let router = express.Router();

let firebase = require('firebase');
let firebaseConfig = require('../firebaseConfig.json');

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
let firestore = firebase.firestore();

/*
작성자: 김진태
items.js의 router.get 변경사항 설명

front-end에서는 리뷰들이 큰 배열에 담겨있다고 가정
ex)
[
  {
    ...
  },
  {
    ...
  },
  {
    ...
  }
]
그래서 reviews라는 배열을 만든 후, firebase에서 불러온 데이터를 push
그 후, res.sned(reviews)
*/
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
