let express = require('express');
let router = express.Router();
let crypto = require('crypto');

let firebase = require('firebase');
let firebaseConfig = require('../firebaseConfig.json');

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
let firestore = firebase.firestore();

router.get('/:user_id', function (req, res, next) {
  debugger
  let mode = req.query.mode
  let user_id = req.params.user_id
  firestore.collection('/user').where("id","==",user_id).get()
      .then((snapshot) => {
        if (snapshot.empty) {
          throw 'No matching user documents'
        }
        snapshot.forEach((doc) => {
          let user = doc.data()
          if(mode === "purchased") {
            let purchasedPromise = []
            let purchased_items = user.purchased_items
            purchased_items.forEach((item_id)=>{
              purchasedPromise.push(firestore.collection('/items').doc(item_id).get())
            })
            Promise.allSettled(purchasedPromise)
            .then(resArr=>{
              let result = []
              resArr.forEach(resObj => {
                if(resObj.status === "fulfilled") {
                  result.push(resObj)
                }
              })
              console.log(result)
              res.status(200).send(result)})
          }
          else if(mode === "recommend") {
            let recommendPromise = []
            let recommended_reviews = user.recommended_reviews
            recommended_reviews.forEach((item_review_id)=>{
              [item_id, review_id] = item_review_id.split(" ")
              recommendPromise.push(firestore.collection('/items').doc(item_id)
              .collection('/reviews').doc(review_id).get())
            })
            Promise.allSettled(recommendPromise)
            .then(resArr=>{
              let result = []
              resArr.forEach(resObj => {
                if(resObj.status === "fulfilled") {
                  result.push(resObj)
                }
              })
              console.log(result)
              res.status(200).send(result)})
          }
          else {
            res.status(200).send(doc.data())
          }
        });
      })
      .catch((err) => {
        res.status(404).send(err.message)
      });
});

router.post('/', function (req, res, next) {
  firestore.collection('/user').add(req.body);
  res.send('Data Post Item');
});

router.put('/:user_id', function (req, res, next) {
  debugger
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
  debugger
  firestore.collection('/user').where('id', '==', req.params.user_id).get()
    .then((snapshot) => {
      if (snapshot.empty) {
        throw 'No matching user documents'
      }
      snapshot.forEach((doc) => {
        console.log(doc.data())
        let item_id = Number(req.params.item_id)  // DB에 숫자형식으로 들어가 있어서 Number로 변환
        if (doc.data().purchased_items.includes(item_id)) {
          res.status(202).send("Item is already in purchased Item") // frontend에서 구분하기 쉽게 status 변경
        } else {
          // doc에 덮어씌우면 DB에서 업데이트가 제대로 되지 않아서 임시로 변수를 만든 후 update
          let tmp_purchased_list = doc.data().purchased_items
          tmp_purchased_list.push(item_id)
          firestore.collection('/user').doc(doc.id).update({
            purchased_items: tmp_purchased_list
          })
          res.status(200).send("Item purchase Complete");
        }
      });
    })
    .catch((err) => {
      console.log(err.message)
      res.status(404).send(err.message)
    });
});

router.delete('/:user_id', function (req, res, next) {
  // firestore.collection('/user').doc(req.params.user_id).get()
  firestore.collection('/user').where('id', '==', req.params.user_id).get()
    .then((snapshot) => {
      if (snapshot.empty) {
        throw 'No matching documents'
      }
      snapshot.forEach((doc) => {
        firestore.collection('/user').doc(doc.id).delete()
        .then(()=>res.send('Data Delete Item'))
      });
    })
    .catch((err) => {
      res.status(404).send(err.message)
    });
});

router.delete('/:user_id/:item_id', function (req, res, next) { // CANCEL ITEM BUY
  // firestore.collection('/user').doc(req.params.user_id).get()
  firestore.collection('/user').where('id', '==', req.params.user_id).get()
    .then((snapshot) => {
      if (snapshot.empty) {
        throw 'No matching user documents'
      }
      let item_id = Number(req.params.item_id)
      snapshot.forEach((doc) => {
        let tmp_purchased_list = doc.data().purchased_items.filter(itemId => itemId!==item_id)
        // firestore.collection('/user').doc(doc.id).update({
        firestore.collection('/user').doc(doc.id).update({
          purchased_items: tmp_purchased_list
        })
        .then(()=>res.status(200).send('Data Delete Item'))
      });
    })
    .catch((err) => {
      console.log(err.message)
      res.status(404).send(err.message)
    });
});

module.exports = router;
