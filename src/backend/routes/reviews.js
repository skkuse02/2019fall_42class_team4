let express = require('express');
let router = express.Router();

let firebase = require('firebase');
let firebaseConfig = require('../firebaseConfig.json');

let nlpProcessor = require('./processNLP');

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
        //TODO : check we can modify request's body
        //keyword object is json object which contains name, score field
        req.body.keyword = nlpProcessor.callNLP(req.body.content);
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
        if(req.params.content)  firestore.collection('/reviews').doc(doc.id).update({content: req.params.content});
        if(req.params.item_score) firestore.collection('/reviews').doc(doc.id).update({content: req.params.item_score});
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
