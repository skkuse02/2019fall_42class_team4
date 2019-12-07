let express = require('express');
let router = express.Router();

let firebase = require('firebase');
let firebaseConfig = require('../firebaseConfig.json');

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
let firestore = firebase.firestore();

// utility function : postprocess items 
let postprocessItems = (items) => {
  //postprocess for items : find representative keywords and average item score 
  let absScores = []
  let thresholdScore;
  let numOfKeywords = 6;
  for(let item of items) {
    absScores = []
    item.item_rating = item.total_star_sum / item.total_review_num; // derive item's rating 
    for(let k in item.total_keywords_map) {// derive item's representative keywords
      absScores.push(Math.abs(item.total_keywords_map[k]))
    }
    thresholdScore = absScores.sort((a,b)=>(b-a))[numOfKeywords-1]
    item.keywordsMap = {}
    for(let k in item.total_keywords_map) {
      itemScore = item.total_keywords_map[k]
      if(Math.abs(itemScore)>=thresholdScore) {
        item.keywordsMap[k] = itemScore
      }
    }
  }
}

// get all items
router.get('/', function(req, res, next){
  let items = []
  if(req.query.search === undefined) {// get all items
    firestore.collection('/items').get()
    .then((snapshot) => {
      if(snapshot.empty){
        console.log('No Matching Items');
        res.status(404).send('No Matching Items');
        return;
      }
      snapshot.forEach((doc) => {
        // console.log(doc.id, '=>', doc.data()); // monitoring data flow
        items.push(doc.data())
      });
      postprocessItems(items)
      res.status(200).send(items);
    })
    .catch((err) => {
      console.log('Error Getting Items', err);
      res.status(400).send(err);
  });
  }
  else {// search the items by querystring
    firestore.collection('/items').where("name", "array-contains-any", req.query.search.toLowerCase().split(" ")).get()
    .then((snapshot) => {
      if(snapshot.empty){
        console.log('No Matching Items');
        res.status(404).send('No Matching Items');
        return;
      }
      snapshot.forEach((doc) => {
        // console.log(doc.id, '=>', doc.data()); // monitoring data flow
        items.push(doc.data())
      });
      postprocessItems(items)
      res.status(200).send(items);
    })
    .catch((err) => {
      console.log('Error Getting Items', err);
      res.status(400).send(err);
  });
  }
});

// get Individual item
router.get('/:id', function(req, res, next){
  let items = []
  firestore.collection('/items').where('id', '==', Number(req.params.id)).get()
    .then((snapshot) => {
      if(snapshot.empty){
        console.log('No Matching Items');
        res.status(404).send('No Matching Items');
        return;
      }
      snapshot.forEach((doc) => {
        // console.log(doc.id, '=>', doc.data()); // monitoring data flow
        items.push(doc.data())
      });
      postprocessItems(items)
      res.status(200).send(items);
    })
    .catch((err) => {
      console.log('Error Getting Items', err);
      res.status(400).send(err);
  });
});

router.post('/', function(req, res, next){
  firestore.collection('/items').where('id', '==', Number(req.body.id)).get()
    .then((snapshot) => {
      if(snapshot.empty){
        firestore.collection('/items').doc(String(req.body.id)).set(req.body);
        console.log('Item Post');
        res.status(201).send('Item Post');
        return;
      } else {
        console.log('Item Already Exist');
        res.status(400).send('Item Already Exist');
      }
    })
    .catch((err) => {
      console.log('Error Getting Items', err);
      res.status(400).send(err);
  });
});

router.put('/:id', function(req, res, next){
  firestore.collection('/items').where('id', '==', Number(req.params.id)).get()
    .then((snapshot) => {
      if(snapshot.empty){
        firestore.collection('/items').doc(String(req.body.id)).set(req.body);
        console.log('No matching Items & Review Post');
        res.status(201).send('No matching Items & Review Post');
        return;
      }
      snapshot.forEach((doc) => {
        firestore.collection('/items').doc(doc.id).update(req.body);
        console.log(doc.id, '=>', doc.data());
      });
      res.status(200).send('Item Put');
    })
    .catch((err) => {
      console.log('Error Getting Items', err);
      res.status(400).send(err);
  });
});

router.delete('/:id', function(req, res, next){
  firestore.collection('/items').where('id', '==', Number(req.params.id)).get()
    .then((snapshot) => {
      if(snapshot.empty){
        console.log('No Matching Item');
        res.status(404).send('No Matching Item')
        return;
      }
      snapshot.forEach((doc) => {
        firestore.collection('/items').doc(doc.id).delete();
        console.log(doc.id, '=>', doc.data());
      });
      res.status(200).send('Item Delete')
    })
    .catch((err) => {
      console.log('Error Getting Items', err);
      res.status(400).send(err);
  });
});


module.exports = router;
