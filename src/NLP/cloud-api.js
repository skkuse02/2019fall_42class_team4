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

function loadNParser(entities){
  var name = "";

  var abstracted = {};//abstracted is a dictionary that contains abstracted entity
  var counter = {}
  var tags = ["bass", "treble", "white noise", "Mids"]; // need to make all charicters lower case

  //get the scores
  for (var i = 0; i < entities.length; i++) {
    name = entities[i].name;
    
    if (tags.includes(name)) {
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
    return Math.abs(b[1]) - Math.abs(a[1]);
  });

  console.log(items.slice(0, 7));
  //var jsonOutput = JSON.stringify(items);

  //return jsonOutput;
}

function parser(entities){
  var name = "";

  var abstracted = {};//abstracted is a dictionary that contains abstracted entity
  var counter = {}
  var tags = ["bass", "treble", "white noise", "Mids"]; // need to make all charicters lower case

  //get the scores
  for (var i = 0; i < entities.length; i++) {
    name = entities[i].name;
    
    if (tags.includes(name)) {
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
    return [key, abstracted[key]];
  });

  items.sort(function(a, b) {
    return Math.abs(b[1]) - Math.abs(a[1]);
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
