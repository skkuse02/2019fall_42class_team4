let express = require('express');
let router = express.Router();

let firebase = require('firebase');
let firebaseConfig = require('../firebaseConfig.json');

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
let firestore = firebase.firestore();

// get all reviews
router.get('/', function(req, res, next){
  let reviews = []
  firestore.collection('/reviews').get()
    .then((snapshot) => {
      if(snapshot.empty){
        console.log('No Matching Reviews');
        res.status(404).send('No Matching Reviews');
        return;
      }
      snapshot.forEach((doc) => {
        console.log(doc.id, '=>', doc.data());
        reviews.push(doc.data())
      });
      res.status(200).send(reviews);
    })
    .catch((err) => {
      console.log('Error Getting Reviews', err);
      res.status(400).send(err);
  });
});

// get Individual review
router.get('/:id', function(req, res, next){
  let reviews = []
  firestore.collection('/reviews').where('id', '==', Number(req.params.id)).get()
    .then((snapshot) => {
      if(snapshot.empty){
        console.log('No Matching Reviews');
        res.status(404).send('No Matching Reviews');
        return;
      }
      snapshot.forEach((doc) => {
        console.log(doc.id, '=>', doc.data());
        reviews.push(doc.data())
      });
      res.status(200).send(reviews)
    })
    .catch((err) => {
      console.log('Error Getting Reviews', err);
      res.status(400).send(err);
  });
});

router.post('/', function(req, res, next){
  firestore.collection('/reviews').where('id', '==', Number(req.params.id)).get()
    .then((snapshot) => {
      if(snapshot.empty){
        firestore.collection('/reviews').add(req.body);
        console.log('Review Post');
        res.status(201).send('Review Post');
        return;
      } else {
        console.log('Review Already Exist');
        res.status(400).send('Review Already Exist')
      }
    })
    .catch((err) => {
      console.log('Error Getting Reviews', err);
      res.status(400).send(err);
  });
});

router.put('/:id', function(req, res, next){
  firestore.collection('/reviews').where('id', '==', Number(req.params.id)).get()
    .then((snapshot) => {
      if(snapshot.empty){
        firestore.collection('/reviews').add(req.body);
        console.log('No Matching Reviews & Review Post');
        res.status(201).send('No Matching Reviews & Review Post');
        return;
      }
      snapshot.forEach((doc) => {
        if(req.params.content)  doc.content = req.params.content;
        if(req.params.item_score) doc.item_score = req.params.item_score;
        //following part is body for 리뷰평가.
        if(req.params.critique_score) {
          doc.critique_number = doc.critique_number + 1;
          doc.critique_score = req.params.item_score;
        }
        //firestore.collection('/reviews').doc(doc.id).update({content: req.params.content});
        firestore.collection('/reviews').doc(doc.id).set(doc);
        console.log(doc.id, '=>', doc.data());
      });
      res.status(200).send('Review Put');
    })
    .catch((err) => {
      console.log('Error Getting Reviews', err);
      res.status(400).send(err);
  });
});

router.delete('/:id', function(req, res, next){
  firestore.collection('/reviews').where('id', '==', Number(req.params.id)).get()
    .then((snapshot) => {
      if(snapshot.empty){
        console.log('No Matching Reviews');
        res.status(404).send('No Matching Reviews')
        return;
      }
      snapshot.forEach((doc) => {
        firestore.collection('/reviews').doc(doc.id).delete();
        console.log(doc.id, '=>', doc.data());
      });
      res.status(200).send('Review Delete')
    })
    .catch((err) => {
      console.log('Error Getting Reviews', err);
      res.status(400).send(err);
  });
});

module.exports = router;
