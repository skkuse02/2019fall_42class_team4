//firebase
let firebase = require('firebase');
let firebaseConfig = require('./firebaseConfig.json');

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
let firestore = firebase.firestore();

// // 예제 코드
// let usersRef = db.collection('users').doc('theFirst');

// let setFirst = usersRef.set({
//   first: 'Ada',
//   last: 'Lovelace',
//   born: 1815
// });

// let aTuringRef = db.collection('users').doc('aturing');

// let setAlan = aTuringRef.set({
//   'first': 'Alan',
//   'middle': 'Mathison',
//   'last': 'Turing',
//   'born': 1912
// });

// db.collection('users').get()
//   .then((snapshot) => {
//     snapshot.forEach((doc) => {
//       console.log(doc.id, '=>', doc.data());
//     });
//   })
//   .catch((err) => {
//     console.log('Error getting documents', err);
//   });
