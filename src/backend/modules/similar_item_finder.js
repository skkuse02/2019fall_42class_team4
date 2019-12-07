let firebase = require('firebase');

let firebaseConfig = require('../firebaseConfig.json');
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
let firestore = firebase.firestore();

function similarItemFinder() {
    // only using price for the similarity factor. 
    // there can be clustering, cosine-similarity, user-history, data mining technique... for determining the similar items 
    // numOfSimilarItem : 2
    console.log('similarItemFinder executed')
    firestore.collection('items').orderBy('price').get()
        .then(snapshot => {
            let itemLists = []
            snapshot.forEach(doc => itemLists.push(doc))
            let promisesForSimilarItem = []
            let prevId, nowId, nextId
            lengthOfItems = itemLists.length
            // first item's similarItems
            promisesForSimilarItem.push(firestore.collection('items').doc('' + itemLists[0].id).update({ similar_items: [itemLists[1].id, itemLists[2].id] }))
            prevId = itemLists[0].id
            nowId = itemLists[0].id
            nextId = itemLists[1].id
            for (let i = 1; i < lengthOfItems - 1; i++) {
                nowId = nextId
                nextId = itemLists[i + 1].id
                promisesForSimilarItem.push(firestore.collection('items').doc('' + nowId).update({ similar_items: [prevId, nextId] }))
                prevId = nowId
            }
            nowId = nextId
            // last item's similarItems
            promisesForSimilarItem.push(firestore.collection('items').doc('' + nowId).update({ similar_items: [itemLists[lengthOfItems - 3].id, itemLists[lengthOfItems - 2].id] }))
            Promise.all(promisesForSimilarItem)
                .then(res => { console.log("SIMILAR ITEM FINDING FINISHED") })
                .catch(err => console.error(err.message))
        })
}
module.exports = similarItemFinder