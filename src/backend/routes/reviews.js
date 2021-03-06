let express = require('express');
let router = express.Router();

let firebase = require('firebase');
let firebaseConfig = require('../firebaseConfig.json');

let NLP = require('./processNLP');

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
let firestore = firebase.firestore();

let documentLimit = 10;// number of reviews in one page 

// object_template
class oneReview {
  constructor(id, author, title, date, content, item_rating, review_rating) {
    this.id = id;
    this.author = author;
    this.title = title;
    this.last_modified_time = date;
    this.content = content;
    this.item_rating = item_rating;
    this.review_rating = review_rating;
  }
}

router.get('/:item_id/:offsetValue', function (req, res, next) {
  debugger
  let criteria = req.query.criteria;
  let reqForDB;
  let offsetValue = req.params.offsetValue;
  let item_id = req.params.item_id
  if (offsetValue === "-1") {// request firstPage
    if (criteria === "rating") {
      reqForDB = firestore.collection("items").doc(item_id)
        .collection("reviews").orderBy("review_rating", "desc").limit(documentLimit)
    }
    else if (criteria === "recent") {
      reqForDB = firestore.collection("items").doc(item_id)
        .collection("reviews").orderBy("last_modified_time", "desc").limit(documentLimit)
    }
    else if (criteria === "keyword") {
      let keyword = req.query.keyword;
      reqForDB = firestore.collection("items").doc(item_id)
        .collection("reviews").where('keywords', 'array-contains', keyword).orderBy("review_rating", "desc").limit(documentLimit)
    }
    else {
      console.log('Error Getting Reviews', err);
      res.status(400).send(err);
    }
  }
  else {
    if (criteria === "rating") {
      reqForDB = firestore.collection("items").doc(item_id)
        .collection("reviews").orderBy("review_rating", "desc")
        .startAfter(Number(offsetValue)).limit(documentLimit)
    }
    else if (criteria === "recent") {
      reqForDB = firestore.collection("items").doc(item_id)
        .collection("reviews").orderBy("last_modified_time", "desc")
        .startAfter(new Date(offsetValue)).limit(documentLimit)
    }
    else if (criteria === "keyword") {
      let keyword = req.query.keyword;
      reqForDB = firestore.collection("items").doc(item_id)
        .collection("reviews").where('keywords', 'array-contains', keyword).orderBy("review_rating", "desc")
        .startAfter(Number(offsetValue)).limit(documentLimit)
    }
    else {
      console.log('Error Getting Reviews', err);
      res.status(400).send(err);
    }
  }
  let reviews = []
  reqForDB.get()
    .then((snapshot) => {
      if (snapshot.empty) {
        console.log('No Matching Reviews');
        res.status(404).send('No Matching Reviews');
        return;
      }
      snapshot.forEach((doc) => {
        //console.log(doc.id, '=>', doc.data());
        reviews.push(doc.data())
      });
      reviews.forEach(review => {
        review.last_modified_time = review.last_modified_time.toDate()
        review.timeString = review.last_modified_time.toLocaleDateString()
      })
      res.status(200).send(reviews);
    })
    .catch((err) => {
      console.log('Error Getting Reviews', err);
      res.status(400).send(err);
    });
});

// get top rated review
router.get('/:item_id', function (req, res, next) {
  let reviews = [];
  let numberOfReview = 3;
  let item_id = req.params.item_id;
  firestore.collection("items").doc(item_id)
    .collection('reviews').orderBy("review_rating", "desc").limit(numberOfReview).get()
    .then((snapshot) => {
      if (snapshot.empty) {
        console.log('No Matching Reviews');
        res.status(404).send('No Matching Reviews');
        return;
      }
      snapshot.forEach((doc) => {
        // console.log(doc.id, '=>', doc.data());
        reviews.push(doc.data())
      });
      reviews.forEach(review => {
        review.last_modified_time = review.last_modified_time.toDate()
        review.timeString = review.last_modified_time.toLocaleDateString()
      })
      res.status(200).send(reviews)
    })
    .catch((err) => {
      console.log('Error Getting Reviews', err);
      res.status(400).send(err);
    });
});

router.get('/:item_id/:review_id/1', function (req, res, next) {
  debugger
  firestore.collection('items').doc(req.params.item_id).collection('reviews').doc(req.params.review_id).get()
    .then((doc) => {
      let review = doc.data()
      if (!!review) {
        review.timeString = review.last_modified_time.toDate().toLocaleDateString()
        res.status(200).send(review)
        }
      }
    )
    .catch((err) => {
      console.log('Error Getting Review', err);
      res.status(400).send(err);
    });
})

router.post('/:item_id/:user_id', function (req, res, next) {
  debugger
  firestore.collection('items').doc(req.params.item_id).get()
    .then((snapshot) => {
      if (!snapshot.empty) {
        let item = snapshot.data()
        let { title, content, item_rating } = req.body
        let item_id = req.params.item_id
        let review_id_maker = item.review_id_maker
        let review_id = review_id_maker
        let user_id = req.params.user_id
        let newReview = new oneReview(review_id, req.params.user_id, title, new Date(Date.now()), content, item_rating, 0)
        NLP(content)
          .then((keywords_map) => {// Process the content in NLP module
            newReview.keywords_map = JSON.parse(keywords_map)
            newReview.keywords = newReview.keywords_map.map(keywordObj => keywordObj.name)
            let total_keywords_map = item.total_keywords_map
            let total_review_num = item.total_review_num
            let total_star_sum = item.total_star_sum
            let reviewPostPromise = []
            reviewPostPromise.push(firestore.collection("items").doc("" + item_id)
              .collection("reviews").doc("" + review_id).set(Object.assign({}, newReview)))
            review_id_maker++// update item's metadata
            total_review_num++
            newReview.keywords_map.forEach(eachKey => { total_keywords_map[eachKey.name] += eachKey.score })
            total_star_sum += item_rating
            reviewPostPromise.push(firestore.collection("items").doc("" + item_id).update({
              review_id_maker: review_id_maker,
              total_review_num: total_review_num,
              total_keywords_map: total_keywords_map,
              total_star_sum: total_star_sum
            }))
            reviewPostPromise.push(firestore.collection("user").where("id", "==", user_id).get())// add review to the user
            Promise.all(reviewPostPromise)
              .then(resultArr => {
                let doc = resultArr[2].docs[0]
                let user = doc.data()
                let posted_reviews = user.posted_reviews
                posted_reviews.push(item_id + " " + review_id)
                firestore.collection("user").doc(doc.id).update({
                  posted_reviews: posted_reviews
                }).then(res.status(200).send("review posting success"))
              })
          })
          .catch(err => { throw err })
      } else {
        console.log('Item is not Exist');
        res.status(404).send('Item is not Exist')
      }
    })
    .catch((err) => {
      console.log('Error Getting Reviews', err);
      res.status(400).send(err);
    });
});

router.put('/:item_id/:review_id', function (req, res, next) {
  debugger
  firestore.collection('items').doc(req.params.item_id).get()
    .then((snapshot) => {
      if (!snapshot.empty) {
        let item = snapshot.data()
        let total_keywords_map = item.total_keywords_map
        let total_star_sum = item.total_star_sum
        let { title, content, item_rating } = req.body
        let item_id = req.params.item_id
        let review_id = req.params.review_id
        firestore.collection('items').doc(item_id).collection('reviews').doc(review_id).get()
          .then((snapshot_R) => {
            if (!snapshot_R.empty) {
              let review = snapshot_R.data()
              let keywords_map = review.keywords_map
              keywords_map.forEach(eachKey => { total_keywords_map[eachKey.name] -= eachKey.score })
              total_star_sum -= review.item_rating
              NLP(content).then((new_keywords_map) => {// Process the content in NLP module
                let newReview = {}
                newReview.keywords_map = JSON.parse(new_keywords_map)
                newReview.keywords = newReview.keywords_map.map(keywordObj => keywordObj.name)
                let reviewPutPromise = []
                reviewPutPromise.push(firestore.collection("items").doc("" + item_id)
                  .collection("reviews").doc("" + review_id).update(Object.assign(newReview, {
                    title: title,
                    content: content,
                    item_rating: item_rating,
                    last_modified_time: new Date(Date.now())
                  })))
                newReview.keywords_map.forEach(eachKey => { total_keywords_map[eachKey.name] += eachKey.score })
                total_star_sum += item_rating
                reviewPutPromise.push(firestore.collection("items").doc("" + item_id).update({
                  total_keywords_map: total_keywords_map,
                  total_star_sum: total_star_sum
                }))
                Promise.all(reviewPutPromise)
                  .then(() => { res.status(200).send("review modification success") })
                  .catch(err => { throw err })
              })
            }
            else {
              res.status(400).send("review doesn't exist")
            }
          })
      }
    })
    .catch(err => {
      console.error(err.message)
      res.status(500).send(err.message)
    })
})

router.put('/:item_id/:review_id/:user_id', function (req, res, next) {
  firestore.collection('/user').where('id', '==', req.params.user_id).get()
    .then((snapshot) => {
      if (!snapshot.empty) {
        snapshot.forEach((doc) => {
          let user = doc.data()
          let item_id = req.params.item_id
          let review_id = req.params.review_id
          let recommended_reviews = user.recommended_reviews

          if (!recommended_reviews.includes(item_id + " " + review_id)) {
            recommended_reviews.push(item_id + " " + review_id)
            firestore.collection('/user').doc(doc.id).update({
              recommended_reviews: recommended_reviews
            }).then(() => {
              firestore.collection('items').doc(req.params.item_id)
                .collection('reviews').doc(req.params.review_id).update({
                  review_rating: firebase.firestore.FieldValue.increment(1)
                }).then(() => res.status(200).send("review recommendation success"))
            })
          } else {
            res.status(202).send("already recommendation review")
          }
        })
      }
    }).catch(err => {
      console.error(err.message)
      res.status(500).send(err.message)
    })
})

// 현재는 사용하지 않음
// router.delete('/:item_id/:review_id', function (req, res, next) {
//   firestore.collection('items').doc(req.params.item_id).get()
//     .then((snapshot) => {
//       if (!snapshot.empty) {
//         snapshot.forEach((doc) => {
//           let item = doc.data()
//           let item_id = req.params.item_id
//           let review_id = req.params.review_id
//           firestore.collection('items').doc(item_id).collection('reviews').doc(review_id).get()
//             .then((snapshot_R) => {
//               let review_doc = snapshot_R[0]
//               if (review_doc !== undefined) {
//                 let total_keywords_map = item.total_keywords_map
//                 let total_star_sum = item.total_star_sum
//                 let review = review_doc.data()
//                 let keywords_map = review.keywords_map
//                 keywords_map.forEach(eachKey => { total_keywords_map[eachKey.name] -= eachKey.score })
//                 total_star_sum -= review.item_rating
//                 firestore.collection("items").doc("" + item_id)
//                   .collection("reviews").doc("" + review_id).delete()
//                   .then(() => {
//                     firestore.collection("items").doc("" + item_id).update({
//                       total_keywords_map: total_keywords_map,
//                       total_star_sum: total_star_sum,
//                       total_review_num: firebase.firestore.FieldValue.increment(-1)
//                     })
//                       .then(() => res.status(204).send("review deletion success"))
//                   })
//               }
//             })
//         })
//       }
//     })
//     .catch(err => {
//       console.error(err.message)
//       res.status(500).send(err.message)
//     })
// });

router.delete('/:item_id/:review_id/:user_id', function (req, res, next) {
  debugger
  if (req.query.mode === 'recommendation') {
    let item_id = req.params.item_id
    let review_id = req.params.review_id
    let user_id = req.params.user_id
    firestore.collection('/user').where('id', '==', req.params.user_id).get()
      .then((snapshot) => {
        if (!snapshot.empty) {
          snapshot.forEach((doc) => {
            let user = doc.data()
            let recommended_reviews = user.recommended_reviews
            if (recommended_reviews.includes(item_id + " " + review_id)) {
              recommended_reviews.splice(recommended_reviews.indexOf(item_id + " " + review_id), 1)
              console.log(recommended_reviews)
              let disableRecommendationPromise = []
              disableRecommendationPromise.push(
                firestore.collection('items').doc(item_id).collection('reviews').doc(review_id).update({
                  review_rating: firebase.firestore.FieldValue.increment(-1)
                }))
              disableRecommendationPromise.push(
                firestore.collection('user').doc(doc.id).update({
                  recommended_reviews: recommended_reviews
                })
              )
              Promise.all(disableRecommendationPromise)
                .then(() => res.status(204).send("disable recommendation success"))
            } else {
              res.status(202).send("already cancel recommendation")
            }
          })
        }
      })
      .catch(err => {
        console.error(err.message)
        res.status(500).send(err.message)
      })
  }
  else if (req.query.mode === 'review') {
    firestore.collection('items').doc(req.params.item_id).get()
      .then((snapshot) => {
        let item = snapshot.data()
        if (!!item) {// item exists
          let item_id = req.params.item_id
          let review_id = req.params.review_id
          let user_id = req.params.user_id
          firestore.collection('items').doc(item_id).collection('reviews').doc(review_id).get()
          .then((snapshot_R) => {
            let review = snapshot_R.data()
              if (!!review) {// review exists
                let total_keywords_map = item.total_keywords_map
                let total_star_sum = item.total_star_sum
                let keywords_map = review.keywords_map
                keywords_map.forEach(eachKey => { total_keywords_map[eachKey.name] -= eachKey.score })
                total_star_sum -= review.item_rating
                let reviewDeletePromise = []
                reviewDeletePromise.push(firestore.collection("items").doc("" + item_id)
                  .collection("reviews").doc("" + review_id).delete())
                reviewDeletePromise.push(firestore.collection("items").doc("" + item_id).update({
                  total_keywords_map: total_keywords_map,
                  total_star_sum: total_star_sum,
                  total_review_num: firebase.firestore.FieldValue.increment(-1),
                  review_id_maker: firebase.firestore.FieldValue.increment(-1)
                }))
                Promise.all(reviewDeletePromise)
                  .then(() => {
                    firestore.collection('user').where("id", "==", user_id).get()
                      .then((snapshot_U) => {
                        let doc = snapshot_U.docs[0]
                        let user = doc.data()
                        if (!!user) {// user exists
                          posted_reviews = user.posted_reviews
                          posted_reviews = posted_reviews.filter(eachVal => eachVal !== item_id + " " + review_id)
                          firestore.collection('user').doc(doc.id).update({
                            posted_reviews: posted_reviews
                          })
                          .then(() => res.status(204).send("review deletion success"))
                        }
                      })
                  })
                  .catch(err => { throw err })
              }
            })
        }
      })
      .catch(err => {
        console.error(err.message)
        res.status(500).send(err.message)
      })
  }
  else {
    console.log("mode is not valid")
    res.status(400).send("mode is not valid")
  }
});

module.exports = router;
