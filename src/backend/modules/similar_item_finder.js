let firebase = require('firebase');

let firebaseConfig = require('../firebaseConfig.json');
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
let firestore = firebase.firestore();

async function simmilar() {
	let itemDB = await firestore.collection('/items').orderBy('price').get();
	let itemList = itemDB._snapshot.docChanges;
	
	for (var i = 0; i<itemList.length; i++) {
		var idxs = [];
		idxs.push(itemList[i-2].doc.proto.fields.id.integerValue);
		idxs.push(itemList[i-1].doc.proto.fields.id.integerValue);
		idxs.push(itemList[i+1].doc.proto.fields.id.integerValue);
		idxs.push(itemList[i+2].doc.proto.fields.id.integerValue);
		firestore.collection('/reviews').doc(itemList.doc.proto.fields.id.integerValue)
				.update({simmilar_items: idxs});
	}
	
}