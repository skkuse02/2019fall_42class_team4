
// firebase
const firebase = require('firebase');
const firebaseConfig = require('./firebaseConfig.json');

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
const firestore = firebase.firestore();
// module putting items into the database
// start of module

// let docPointer;
// let nameStringArr = [
//   "AfterShokz Air Open-Ear Wireless Bone Conduction Headphones with Brilliant Reflective Strips, Slate Grey, AS650SG-BR"
//   , "Apple EarPods with Lightning Connector - White"
//   , "Beben Bluetooth 5.0 True Wireless Earbuds with Charging Case for iPhone Android, 5H Continuous 30H Cyclic Playtime Waterproof TWS Stereo Headphones with mic, in-Ear Earphones Headset for Sport"
//   , "Betron B25 Noise Isolating in Ear Canal Headphones Earphones with Pure Sound and Powerful Bass for iPhone, iPad, iPod, Samsung Smartphones and Tablets (Black Without Remote)"
//   , "Betron DC950 Headphones Earphones, Noise Isolating, Tangle Free Cable, Bass Driven Sound (Black)"
//   , "Bluetooth Earbuds, Bluetoooth 5.0 Headphones Wireless Earbuds 30H Cycle Playtime in-Ear Wireless Headphones Hi-Fi Stereo Sweatproof Earphones Sport Headsets Buit-in Mic for Work/Running/Travel/Gym"
//   , "Bluetooth Headphones, LETSCOM Wireless Earbuds IPX7 Waterproof Noise Cancelling Headsets, Richer Bass & HiFi Stereo Sports Earphones 8 Hours Playtime Running Headphones with Travel Case"
//   , "Bose QuietComfort 35 II Wireless Bluetooth Headphones, Noise-Cancelling, with Alexa voice control, enabled with Bose AR – Black"
//   , "COWIN E7 Active Noise Cancelling Headphones Bluetooth Headphones with Microphone Deep Bass Wireless Headphones Over Ear, Comfortable Protein Earpads, 30 Hours Playtime for Travel/Work, Black"
//   , "Earbuds, Vogek Tangle-Free Flat Cord Ergonomic in-Ear Headphones with Dynamic Crystal Clear Sound, Earphones with S/M/L Eartips Compatible with Samsung, Android Phone and More (Black-Red)"
//   , "Mpow 059 Bluetooth Headphones Over Ear, Hi-Fi Stereo Wireless Headset, Foldable, Soft Memory-Protein Earmuffs, w/Built-in Mic Wired Mode PC/Cell Phones/TV"
//   , "Otium Bluetooth Headphones, Best Wireless Earbuds IPX7 Waterproof Sports Earphones w/Mic HD Stereo Sweatproof in-Ear Earbuds Gym Running Workout 8 Hour Battery Noise Cancelling Headsets"
//   , "PANASONIC ErgoFit Earbud Headphones with Microphone and Call Controller Compatible with iPhone, Android and Blackberry - RP-TCM125-K - In-Ear (Black)"
//   , "Panasonic Headphones RP-HT161-K Full-Sized Over-the-Ear Lightweight Long-Corded (Black) (Renewed)"
//   , "Samsung Galaxy Buds , Bluetooth True Wireless Earbuds (Wireless charging Case included), Black - US Version with Warranty"
//   , "Sony MDRXB50AP Extra Bass Earbud Headset (Black)"
//   , "Sony MDRXB510AS/B Extra Bass Wired Headphones, Best Sports Headphones W/Mic IPX5 Stereo Sweatproof Earbuds Durable Comfortable Gym Running Workout"
//   , "Symphonized Wraith 2.0 Bluetooth Genuine Wood Wireless Headphones with 3.5mm Cable Included for Wired Use (Walnut)"
//   , "Vogek On Ear Headphones with Mic, Lightweight Portable Fold-Flat Stereo Bass Headphones with 1.5M Tangle Free Cord and Microphone-Black"
//   , "Betron YSM1000 Headphones, Earbuds, High Definition, in-Ear, Noise Isolating, Heavy Deep Bass for Apple iPhone, iPod, iPad, Samsung Cell Phones and Smartphones (Gold with Microphone)"
// ]
// let item_img_url_arr = [
//   "https://firebasestorage.googleapis.com/v0/b/reviewrevolution-a12dc.appspot.com/o/item_img%2F0.PNG?alt=media&token=78d70a18-9d8c-49b6-ab28-cbd5bd5a77fd"
//   , "https://firebasestorage.googleapis.com/v0/b/reviewrevolution-a12dc.appspot.com/o/item_img%2F1.PNG?alt=media&token=e259f76d-c68b-49a1-85e3-8c34f8252390"
//   , "https://firebasestorage.googleapis.com/v0/b/reviewrevolution-a12dc.appspot.com/o/item_img%2F2.PNG?alt=media&token=ecbca46e-4e5e-48bc-b90d-c14dc010f5d2"
//   , "https://firebasestorage.googleapis.com/v0/b/reviewrevolution-a12dc.appspot.com/o/item_img%2F3.PNG?alt=media&token=56f63b71-01bc-445b-bf47-1b0f9322eeb5"
//   , "https://firebasestorage.googleapis.com/v0/b/reviewrevolution-a12dc.appspot.com/o/item_img%2F4.PNG?alt=media&token=bc98c560-3162-433d-beb8-564e5a21628e"
//   , "https://firebasestorage.googleapis.com/v0/b/reviewrevolution-a12dc.appspot.com/o/item_img%2F5.PNG?alt=media&token=749cb5f0-d9b4-465a-827c-8b7e756ac498"
//   , "https://firebasestorage.googleapis.com/v0/b/reviewrevolution-a12dc.appspot.com/o/item_img%2F6.PNG?alt=media&token=7e50c5b6-680b-4c97-b395-01a73c698d33"
//   , "https://firebasestorage.googleapis.com/v0/b/reviewrevolution-a12dc.appspot.com/o/item_img%2F7.PNG?alt=media&token=9cb49b06-59f4-4405-8a65-b4437b5babe5"
//   , "https://firebasestorage.googleapis.com/v0/b/reviewrevolution-a12dc.appspot.com/o/item_img%2F8.PNG?alt=media&token=02c798ae-e07e-4455-88b4-0b428dd0acc4"
//   , "https://firebasestorage.googleapis.com/v0/b/reviewrevolution-a12dc.appspot.com/o/item_img%2F9.PNG?alt=media&token=861f985a-8771-4c76-9154-43c542ba4f44"
//   , "https://firebasestorage.googleapis.com/v0/b/reviewrevolution-a12dc.appspot.com/o/item_img%2F10.PNG?alt=media&token=ea84d759-7779-4cda-a75e-be28e251d2b1"
//   , "https://firebasestorage.googleapis.com/v0/b/reviewrevolution-a12dc.appspot.com/o/item_img%2F11.PNG?alt=media&token=4ff7c58b-fe07-4fd8-a37d-2b81d118a52a"
//   , "https://firebasestorage.googleapis.com/v0/b/reviewrevolution-a12dc.appspot.com/o/item_img%2F12.PNG?alt=media&token=ce4769a4-c142-4931-8871-48c06c8af495"
//   , "https://firebasestorage.googleapis.com/v0/b/reviewrevolution-a12dc.appspot.com/o/item_img%2F13.PNG?alt=media&token=93367a41-024e-4b5d-a44b-1e9e6c49e273"
//   , "https://firebasestorage.googleapis.com/v0/b/reviewrevolution-a12dc.appspot.com/o/item_img%2F14.PNG?alt=media&token=0c6955a6-eb40-43f9-81dc-53f14edf2eac"
//   , "https://firebasestorage.googleapis.com/v0/b/reviewrevolution-a12dc.appspot.com/o/item_img%2F15.PNG?alt=media&token=906abee0-2f2f-4992-9f55-a33ad7c1607e"
//   , "https://firebasestorage.googleapis.com/v0/b/reviewrevolution-a12dc.appspot.com/o/item_img%2F16.PNG?alt=media&token=a9ee4bf5-3069-4ee5-aea1-9dfdbba83ec8"
//   , "https://firebasestorage.googleapis.com/v0/b/reviewrevolution-a12dc.appspot.com/o/item_img%2F17.PNG?alt=media&token=38cc779c-86aa-4350-8cb2-82bebae6c606"
//   , "https://firebasestorage.googleapis.com/v0/b/reviewrevolution-a12dc.appspot.com/o/item_img%2F18.PNG?alt=media&token=5d3e9ec5-849c-49aa-b32f-6b8743bf7a97"
//   , "https://firebasestorage.googleapis.com/v0/b/reviewrevolution-a12dc.appspot.com/o/item_img%2F19.PNG?alt=media&token=13fb00d3-32d2-4c3a-9e9e-44e4357446f6"
// ]
// let desc_img_url_arr = [
//   "https://firebasestorage.googleapis.com/v0/b/reviewrevolution-a12dc.appspot.com/o/description_img%2F0.png?alt=media&token=7186a626-1f0e-40da-beac-10e70dbc0c83"
//   , "https://firebasestorage.googleapis.com/v0/b/reviewrevolution-a12dc.appspot.com/o/description_img%2F1.PNG?alt=media&token=d985cbad-5b03-4db5-96a6-a9f1aede48cb"
//   , "https://firebasestorage.googleapis.com/v0/b/reviewrevolution-a12dc.appspot.com/o/description_img%2F2.png?alt=media&token=e0aecd0b-dd92-42a5-8608-698fb54fd23c"
//   , "https://firebasestorage.googleapis.com/v0/b/reviewrevolution-a12dc.appspot.com/o/description_img%2F3.png?alt=media&token=0bc19bf1-0d19-40b1-a686-3070641f244d"
//   , "https://firebasestorage.googleapis.com/v0/b/reviewrevolution-a12dc.appspot.com/o/description_img%2F4.png?alt=media&token=8c5e4703-1448-4522-b85a-78cf05cd81c8"
//   , "https://firebasestorage.googleapis.com/v0/b/reviewrevolution-a12dc.appspot.com/o/description_img%2F5.png?alt=media&token=f894ffa7-3047-4d9a-87e0-166ec2cf4081"
//   , "https://firebasestorage.googleapis.com/v0/b/reviewrevolution-a12dc.appspot.com/o/description_img%2F6.png?alt=media&token=439de6ac-8e34-4cdb-aa0e-8b498974ce31"
//   , "https://firebasestorage.googleapis.com/v0/b/reviewrevolution-a12dc.appspot.com/o/description_img%2F7.png?alt=media&token=00d3a75a-1d8d-45ca-b830-f162e289e24b"
//   , "https://firebasestorage.googleapis.com/v0/b/reviewrevolution-a12dc.appspot.com/o/description_img%2F8.png?alt=media&token=cd8c0994-69bf-4a45-8123-ecfa69738a27"
//   , "https://firebasestorage.googleapis.com/v0/b/reviewrevolution-a12dc.appspot.com/o/description_img%2F9.png?alt=media&token=95faae99-55f0-4167-bf56-e85691e6430a"
//   , "https://firebasestorage.googleapis.com/v0/b/reviewrevolution-a12dc.appspot.com/o/description_img%2F10.png?alt=media&token=e35fe951-0eac-4a4f-b350-b0bf0323be6c"
//   , "https://firebasestorage.googleapis.com/v0/b/reviewrevolution-a12dc.appspot.com/o/description_img%2F11.png?alt=media&token=b77fdba8-84f0-42ce-bbf3-3fa169ad6c1f"
//   , "https://firebasestorage.googleapis.com/v0/b/reviewrevolution-a12dc.appspot.com/o/description_img%2F12.png?alt=media&token=fe988638-de56-4ce0-9c6c-fde7e51f0d6e"
//   , "https://firebasestorage.googleapis.com/v0/b/reviewrevolution-a12dc.appspot.com/o/description_img%2F13.PNG?alt=media&token=569a2adb-8bb0-41a7-9f20-d25d5bf88b0f"
//   , "https://firebasestorage.googleapis.com/v0/b/reviewrevolution-a12dc.appspot.com/o/description_img%2F14.png?alt=media&token=fc475501-2bd1-4f97-9aa7-162cca4fe427"
//   , "https://firebasestorage.googleapis.com/v0/b/reviewrevolution-a12dc.appspot.com/o/description_img%2F15.png?alt=media&token=1fbb91fb-4c29-41a3-9219-2e2d1a80028b"
//   , "https://firebasestorage.googleapis.com/v0/b/reviewrevolution-a12dc.appspot.com/o/description_img%2F16.png?alt=media&token=4f897a2b-18ed-4f65-b01e-12e9d5e33fd7"
//   , "https://firebasestorage.googleapis.com/v0/b/reviewrevolution-a12dc.appspot.com/o/description_img%2F17.png?alt=media&token=b2d3bb18-4b81-4cf6-a65f-b8f9b719c281"
//   , "https://firebasestorage.googleapis.com/v0/b/reviewrevolution-a12dc.appspot.com/o/description_img%2F18.png?alt=media&token=71292617-1cb0-495c-a8f4-86b09424fbe7"
//   , "https://firebasestorage.googleapis.com/v0/b/reviewrevolution-a12dc.appspot.com/o/description_img%2F19.png?alt=media&token=02649aee-1833-423d-abaf-92e5a036a8f9"
// ]
// let priceArr = [
//   99.95
//   , 20.66
//   , 45.99
//   , 12.99
//   , 10.93
//   , 49.99
//   , 19.95
//   , 279.00
//   , 59.99
//   , 7.99
//   , 36.99
//   , 18.99
//   , 11.79
//   , 14.06
//   , 91.99
//   , 29.99
//   , 29.99
//   , 74.99
//   , 15.99
//   , 20.99
// ]

// let tags = [// tags from the NLP module, processNLP.js, name2tags(name) function
//   "sound quality"
//   ,"product quality"
//   ,"microphone"
//   ,"bass"
//   ,"mid"
//   ,"treble"
//   ,"design"
//   ,"usability"
//   ,"battery"
//   ,"price"
//   ,"customer service"
//   ,"bluetooth"
//   ,"noise canceling"
//   ,"bone conduction"];
// let total_keywords_map_template = {}
// for(let tag of tags) {
//   total_keywords_map_template[tag]=0;
// }

// let i=0;
// let promisesOfItemPosting = []
// for (let i = 0; i < 20; i++) {// 20 items
//   docPointer = firestore.collection("items").doc("" + i);
//   let nameArr = nameStringArr[i].toLowerCase().replace(/-|,|\(|\)/g," ").split(" ").filter(c=>c!=="")
//   promisesOfItemPosting.push(docPointer.set({
//     id: i
//     review_id_maker: 0
//     , item_img_url: item_img_url_arr[i]
//     , desc_img_url: desc_img_url_arr[i]
//     , last_modified_time: new Date()
//     , name: nameArr
//     , price: priceArr[i]
//     , similar_items: []
//     , total_review_num: 0
//     , total_star_sum: 0
//     , total_keywords_map: total_keywords_map_template
//   }))
// }
// Promise.all(promisesOfItemPosting)
// .then(res=>console.log("items are successfully initialized to DB"))

// end of module 

// NLP TEST module
// start of module

const NLP = require('./processNLP')

NLP(`After losing my iPhone7 EarPods, I bought these replacements---crossing my fingers that these would be legit Apple products (my order was \"Sold by Amazon\" new as a Prime Exclusive). I miraculously found my original EarPods so when these arrived I compared them directly to see whether they matched up. The ones Amazon sent me are just like the ones I got with my phone, and the packaging is just like all my other classic Apple stuff: everything sealed, meticulously held in place, documentation, etc. Photos below show all the box details and the packaged EarPods. The only thing that seemed slightly different was the thickness of the main cord---these are a tiny bit thinner it feels like (but I got my IPhone7 some time ago so these might be the \"current\" version). As for sound, I can't tell any difference between my original EarPods and these replacements.  My one star off is because the shape of the actual earpiece is not my favorite. That's just preference---or ear size, maybe? UPDATE: looks like Amazon isn't always offering these as Prime-Exclusive, or at all. I would never go for these if listed by others, new or used. Head to the Apple Store otherwise!`)
.then(result=>console.log(result))// output: [{"name":"product quality","score":0.6000000238418579},{"name":"sound quality","score":-0.10000000149011612}]

NLP(`This headphone set has poor sound quality: it lacks midrange, and attempts to compensate by boosting treble and bass, but in a bad way. Mids are still scooped & music sounds poor & cheap.
The hissing white noise is intolerable, unless you like white noise then these are perfect for your youtube noise videos.

I tested these with (remastered) Led Zeppelin, Physical Graffiti, and Hillsong United, Zion. I would've also tested with Maxim Vengerov or a Rachmaninov concerto but didn't bother after listening to two albums.

I'm not an expert but I am a musician with sound engineer experience.`)
.then(result=>console.log(result))// output: [{"name":"sound quality","score":-0.42500000074505806},{"name":"bass","score":0.4000000059604645},{"name":"treble","score":-0.10000000149011612}]  

// end of module



// module for putting reviews into the database

// start of module

// // csv-parser
// const csv = require('csv-parser');
// const fs = require('fs');
// const NLP = require('./processNLP')

// const reviews = [];

// let recommends = 300;// because the rows' sequence were sorted by review_rate in decreasing order
// let i = 0;
// let item_id = 16;// THE ID OF ITEM CONTAINING REVIEW YOU WANT TO POST 
// let docPointer;
// let numToPost = 40;
// let tags = [// tags from the NLP module, processNLP.js, name2tags(name) function
//   "sound quality"
//   , "product quality"
//   , "microphone"
//   , "bass"
//   , "mid"
//   , "treble"
//   , "design"
//   , "usability"
//   , "battery"
//   , "price"
//   , "customer service"
//   , "bluetooth"
//   , "noise canceling"
//   , "bone conduction"];
// let total_keywords_map_template = {}
// for (let tag of tags) {
//   total_keywords_map_template[tag] = 0;
// }

// fs.createReadStream('./review_csv/' + item_id + '.csv') // reading csv files 
//   .pipe(csv())
//   .on('data', (row) => {
//     //process each row 
//     if (i < numToPost) {
//       reviews.push(new oneReview(i, row.author, row.title, new Date(row.date), row.content, Number(row.rating[0]), recommends--));
//       i++;
//     }
//   })
//   .on('end', () => {
//     let promisesForNLP = [];
//     for (let i = 0; i < numToPost; i++) {
//       promisesForNLP.push(
//         NLP(reviews[i].content)
//           .then((keywords_map) => { 
//             reviews[i].keywords_map = JSON.parse(keywords_map)
//             reviews[i].keywords = reviews[i].keywords_map.map(keywordObj=>keywordObj.name)
//           })
//       )
//     }
//     Promise.all(promisesForNLP)
//       .then(
//         () => {
//           let promisesForReviewPosting = []
//           let total_star_sum = 0;
//           let total_review_num = 0;
//           for (let i = 0; i < numToPost; i++) {// update global values of item affected by each new review
//             for (let key_score of reviews[i].keywords_map) {
//               total_keywords_map_template[key_score.name] += key_score.score
//             }
//             total_review_num++;
//             total_star_sum += reviews[i].item_rating;
//             docPointer = firestore.collection("items").doc(""+item_id).collection("reviews").doc("" + i);
//             promisesForReviewPosting.push(docPointer.set(
//               Object.assign({}, reviews[i])
//             ))
//           }
//           docPointer = firestore.collection("items").doc(""+item_id)// finally update item's rating.
//           promisesForReviewPosting.push(docPointer.update({
//             total_star_sum: total_star_sum
//             , total_review_num: total_review_num
//             , total_keywords_map: total_keywords_map_template
//           }))
//           Promise.all(promisesForReviewPosting)
//             .then(() => console.log(`reviews of item #${item_id} are successfully initialized to DB`))
//             .catch(err=>console.error(err.message))
//         }
//       )
//   });

// // object_template
// class oneReview {
//   constructor(id, author, title, date, content, item_rating, review_rating) {
//     this.id = id;
//     this.author = author;
//     this.title = title;
//     this.last_modified_time = date;
//     this.content = content;
//     this.item_rating = item_rating;
//     this.review_rating = review_rating;
//   }
// }

// end of module




// module for finding similar items

// start of module

// // only using price for the similarity factor. 
// // there can be clustering, cosine-similarity, user-history, data mining technique... for determining the similar items 
// // numOfSimilarItem : 2
// firestore.collection('items').orderBy('price').get()
// .then(snapshot => {
//   let itemLists = []
//   snapshot.forEach(doc => itemLists.push(doc))
//   let promisesForSimilarItem = []
//   let prevId, nowId, nextId
//   lengthOfItems = itemLists.length
//   // first item's similarItems
//   promisesForSimilarItem.push(firestore.collection('items').doc(''+itemLists[0].id).update({similar_items:[itemLists[1].id,itemLists[2].id]}))
//   prevId = itemLists[0].id
//   nowId = itemLists[1].id
//   nextId = itemLists[2].id
//   for(let i=1 ; i<lengthOfItems-1 ; i++) {
//     nowId = nextId
//     nextId = itemLists[i+1].id
//     promisesForSimilarItem.push(firestore.collection('items').doc(''+nowId).update({similar_items:[prevId,nextId]}))
//     prevId = nowId
//   }
//   nowId = nextId
//   // last item's similarItems
//   promisesForSimilarItem.push(firestore.collection('items').doc(''+nowId).update({similar_items:[itemLists[lengthOfItems-3].id,itemLists[lengthOfItems-2].id]}))
//   Promise.all(promisesForSimilarItem)
//   .then(res=>{console.log("SIMILAR ITEM FINDING FINISHED")})
//   .catch(err=>console.error(err.message))
// })
    
// end of module