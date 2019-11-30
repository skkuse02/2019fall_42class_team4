// // firebase
// const firebase = require('firebase');
// const firebaseConfig = require('./firebaseConfig.json');

// if (!firebase.apps.length) {
//     firebase.initializeApp(firebaseConfig);
// }
// const firestore = firebase.firestore();

// csv-parser
const csv = require('csv-parser')
const fs = require('fs')
const reviews = [];
let recommends = 300;// because the rows' sequence were sorted by review_rate in decreasing order
fs.createReadStream('./review_csv/19.csv')
  .pipe(csv())
  .on('data', (row) => {
    //process each row 
      reviews.push(new oneReview(row.author, row.title, row.date, row.content, row.rating, recommends--))
    })
  .on('end', () => {
    console.log(reviews.slice(0,5));
  });

// object_template
class oneReview {
    constructor(author, title, date, content, item_rating, review_rating) {
        this.author = author;
        this.title = title;
        this.date = date;
        this.content = content;
        this.item_rating = item_rating;
        this.review_rating = review_rating;
    }
}