function loadReview() {
  // The text to analyze
  var fileName = "review.txt"
  const fs = require('fs');
  const text = fs.readFileSync('review.txt', 'utf8');

  return text;
}

function storeEntity(entities) {
  const fastcsv = require('fast-csv');
  const fs = require('fs');
  const ws = fs.createWriteStream("entities.csv");
  fastcsv
    .write(entities, { headers: true})
    .pipe(ws);
}

function loadEntity() {
  const csv = require('csv-load-sync');
  const array = csv("entities.csv");

  var entities = [];
  var entry = {};

  for (var i = 0; i < array.length; i++) {
    entry = {name: array[i].name, sentiment : array[i].sentiment};
    entities.push(entry);
  }

  return entities;
}

async function callNLPwithStore(text) {
  // Imports the Google Cloud client library
  const language = require('@google-cloud/language');

  // Instantiates a client
  const client = new language.LanguageServiceClient();
  
  const document = {
    content: text,
    type: 'PLAIN_TEXT',
  };

  // Detects the sentiment of the text
  const [result] = await client.analyzeEntitySentiment({document: document});
  const entities = result.entities;

  console.log(`Text: ${text}`);
  //get the scores
  for (var i = 0; i < entities.length; i++) {
    console.log(`Entity Name : ${entities[i].name}`);
    console.log(`Entity\'s score : ${entities[i].sentiment.score}`);
    entities[i].sentiment = entities[i].sentiment.score;
  }

  storeEntity(entities);

  return entities;
}

async function callNLP(text) {
  // Imports the Google Cloud client library
  const language = require('@google-cloud/language');

  // Instantiates a client
  const client = new language.LanguageServiceClient();
  
  const document = {
    content: text,
    type: 'PLAIN_TEXT',
  };

  // Detects the sentiment of the text
  const [result] = await client.analyzeEntitySentiment({document: document});
  const entities = result.entities;

  return parser(entities);
}

function name2tag(name) {
  name = name.toLowerCase();

  var tags = ["sound quality",
              "product quality",
              "microphone",
              "bass",
              "mid",
              "treble",
              "design",
              "usability",
              "battery",
              "price",
              "customer service",
              "bluetooth",
              "noise canceling",
              "bone conduction"];

  var cond = /pack|build\ quality|wire|device|rubber|silicon|button|cable/;
  if(cond.test(name)) return "product quality";

  cond = /call|connect|speak|voice|mic/;
  if(cond.test(name)) return "microphone";

  cond = /bass|base\ tone/;
  if(cond.test(name)) return "bass";

  cond = /mid/;
  if(cond.test(name)) return "mid";

  cond = /treble/;
  if(cond.test(name)) return "treble";

  cond = /design|color/;
  if(cond.test(name)) return "design";

  cond = /comfort|control|use|ache/;
  if(cond.test(name)) return "usability";

  cond = /cheap|cost|expens|money|price|purchase/;
  if(cond.test(name)) return "price";

  cond = /battery|power|charg/;
  if(cond.test(name)) return "battery";

  cond = /customer|sale|seller/;
  if(cond.test(name)) return "customer service";

  cond = /bluetooth|blue\ tooth|pairing/;
  if(cond.test(name)) return "bluetooth";

  cond = /noise\ canc|canceling|noise-canc/;
  if(cond.test(name)) return "noise canceling";

  cond = /bone\ conduct/;
  if(cond.test(name)) return "bone conduction";

  cond = /audio|quality|music|sound|noise|buzz|listen|performance|volume/;
  if(cond.test(name)) return "sound quality";

  return "";
}

function loadNParser(entities){
  var abstracted = {};//abstracted is a dictionary that contains abstracted entity
  var counter = {}
 
  //get the scores
  for (var i = 0; i < entities.length; i++) {
    if(entities[i].sentiment == 0) continue;
    var name = name2tag(entities[i].name);
    
    if (name != "") {
      console.log(`Entity Name : ${entities[i].name}`);
      console.log(`Entity\'s score : ${entities[i].sentiment}`);

      if(name in abstracted) {
        abstracted[name] += parseFloat(entities[i].sentiment);//.score;
        counter[name] += 1.0;
      }
      else {
        abstracted[name] = parseFloat(entities[i].sentiment);//.score;
        counter[name] = 1.0;
      }
    }
  }

  //get the mean score
  //store the keyword and score of keyword
  for (var i in abstracted) {
    abstracted[i] = abstracted[i] / counter[i];
  }

  var items = Object.keys(abstracted).map(function(key) {
    return {
      name : key,
      score : abstracted[key]
    };
  });

  console.log(items);

  //
  items.sort(function(a, b) {
    return Math.abs(b.score) - Math.abs(a.score);
  });

  console.log(items.slice(0, 7));
  //var jsonOutput = JSON.stringify(items);

  //return jsonOutput;
}

function parser(entities) {
  var abstracted = {};//abstracted is a dictionary that contains abstracted entity
  var counter = {}
  
  //get the scores
  for (var i = 0; i < entities.length; i++) {
    if(entities[i].sentiment.score == 0) continue;
    var name = name2tag(entities[i].name);
    
    if (name != "") {
      if(name in abstracted) {
        abstracted[name] += parseFloat(entities[i].sentiment.score);
        counter[name] += 1.0;
      }
      else {
        abstracted[name] = parseFloat(entities[i].sentiment.score);
        counter[name] = 1.0;
      }
    }
  }

  //get the mean score
  //store the keyword and score of keyword
  for (var i in abstracted) {
    abstracted[i] = abstracted[i] / counter[i];
  }

  //sort by mean score value
  var items = Object.keys(abstracted).map(function(key) {
    return {
      name : key,
      score : abstracted[key]
    };
  });

  items.sort(function(a, b) {
    return Math.abs(b.score) - Math.abs(a.score);
  });

  //make outputfile
  var jsonOutput = JSON.stringify(items.slice(0, 7));


  return jsonOutput;
}

//for load and store entites
//callNLPwithStore(loadReview());
//loadNParser(loadEntity());

//for non-store entities
//callNLP(loadReview());

//        keword 추출