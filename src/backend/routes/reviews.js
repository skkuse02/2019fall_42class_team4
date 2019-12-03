let express = require('express');
let router = express.Router();

let firebase = require('firebase');
let firebaseConfig = require('../firebaseConfig.json');

let nlpProcessor = require('./processNLP');

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
let firestore = firebase.firestore();

let documentLimit = 10;// number of reviews in one page

router.get('/:item_id/:lastReviewId', function(req, res, next){
  let criteria = req.query.criteria;
  let reqForDB;
  let lastReviewId = Number(req.params.lastReviewId);
  let item_id = Number(req.params.item_id)
  if(lastReviewId ===-1) {// request firstPage
    if(criteria === "rating") {
      reqForDB = firestore.collection("items").doc(""+item_id)
      .collection("reviews").orderBy("review_rating", "desc").limit(documentLimit)
    }
    else if(criteria === "recent") {
      reqForDB = firestore.collection("items").doc(""+item_id)
      .collection("reviews").orderBy("last_modified_time", "desc").limit(documentLimit)
    }
    else if(criteria === "keyword") {
      let keyword = req.query.keyword;
      reqForDB = firestore.collection("items").doc(""+item_id)
      .collection("reviews").where('keywords', 'array-contains', keyword).orderBy("review_rating", "desc").limit(documentLimit)
    }
    else {
      console.log('Error Getting Reviews', err);
      res.status(400).send(err);
    }
  }
  else {
    if(criteria === "rating") {
      reqForDB = firestore.collection("items").doc(""+item_id)
      .collection("reviews").startAfter(lastReviewId)
      .orderBy("review_rating", "desc").limit(documentLimit)
    }
    else if(criteria === "recent") {
      reqForDB = firestore.collection("items").doc(""+item_id)
      .collection("reviews").startAfter(lastReviewId)
      .orderBy("last_modified_time", "desc").limit(documentLimit)
    }
    else if(criteria === "keyword") {
      let keyword = req.query.keyword;
      reqForDB = firestore.collection("items").doc(""+item_id)
      .collection("reviews").where('keywords', 'array-contains', keyword).startAfter(lastReviewId)
      .orderBy("review_rating", "desc").limit(documentLimit)
    }
    else {
      console.log('Error Getting Reviews', err);
      res.status(400).send(err);
    }
  }
  let reviews = []
  reqForDB.get()
    .then((snapshot) => {
      if(snapshot.empty){
        console.log('No Matching Reviews');
        res.status(404).send('No Matching Reviews');
        return;
      }
      snapshot.forEach((doc) => {
        //console.log(doc.id, '=>', doc.data());
        reviews.push(doc.data())
      });
      res.status(200).send(reviews);
    })
    .catch((err) => {
      console.log('Error Getting Reviews', err);
      res.status(400).send(err);
  });
});

// get top rated review
router.get('/:item_id', function(req, res, next){
  let reviews = [];
  let numberOfReview = 3;
  let item_id = Number(req.params.item_id);
  firestore.collection("items").doc(""+item_id)
  .collection('reviews').orderBy("review_rating", "desc").limit(numberOfReview).get()
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

router.post('/:item_id', function(req, res, next){
  firestore.collection('/items').doc(req.params.item_id)
    .collection('/reviews').orderBy('id', 'desc').limit(1).get()
    .then((snapshot) => {
      if(snapshot.empty){
        req.body.keyword = nlpProcessor.callNLP(req.body.content);
        firestore.collection('/items').doc(req.params.item_id)
          .collection('/reviews').doc('0').set(req.body);
        console.log('Review Post');
        res.status(201).send('Review Post');
        return;
      }
      snapshot.forEach((doc) => {
        console.log(Number(doc.id)+1)
        firestore.collection('/items').doc(req.params.item_id)
          .collection('/reviews').doc(String(Number(doc.id)+1)).set(req.body);
        console.log('Review Post');
        res.status(201).send('Review Post');
      });
    })
    .catch((err) => {
      console.log('Error Getting Reviews', err);
      res.status(400).send(err);
  });
});

router.put('/:item_id/:review_id', function(req, res, next){
  firestore.collection('/items').doc(req.params.item_id)
    .collection('/reviews').doc(req.params.review_id).get()
    .then((doc) => {
      if(!doc.exists){
        firestore.collection('/items').doc(req.params.item_id)
          .collection('/reviews').doc(req.params.review_id).set(req.body);
        console.log('No Matching Reviews & Review Post');
        res.status(201).send('No Matching Reviews & Review Post');
        return;
      } else {
        firestore.collection('/items').doc(req.params.item_id)
          .collection('/reviews').doc(req.params.review_id).set(req.body);
        console.log('Review Put');
        res.status(200).send('Review Put');
      };

    })
    .catch((err) => {
      console.log('Error Getting Reviews', err);
      res.status(400).send(err);
  });
});

router.delete('/:item_id/:review_id', function(req, res, next){
  firestore.collection('/items').doc(req.params.item_id)
    .collection('/reviews').doc(req.params.review_id).get()
    .then((doc) => {
      if(!doc.exists){
        console.log('No Matching Reviews');
        res.status(404).send('No Matching Reviews')
        return;
      } else {
        firestore.collection('/items').doc(req.params.item_id)
          .collection('/reviews').doc(req.params.review_id).delete();
        console.log(doc.id, '=>', doc.data());
        res.status(200).send('Review Delete');
      }
    })
    .catch((err) => {
      console.log('Error Getting Reviews', err);
      res.status(400).send(err);
  });
});


module.exports = router;
