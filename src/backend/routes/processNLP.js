function name2tag(name) {
  name = name.toLowerCase();

  let tags = ["sound quality",
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

  let cond = /pack|build\ quality|wire|device|rubber|silicon|button|cable/;
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
  /*
  return new Promise((resolve, reject) => {
    resolve(result.entities);
  });
  */
}

function parser(entities) {
  let abstracted = {};//abstracted is a dictionary that contains abstracted entity
  let counter = {}
  
  //get the scores
  for (let i = 0; i < entities.length; i++) {
    if(entities[i].sentiment.score == 0) continue;
    let name = name2tag(entities[i].name);
    
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
  for (let i in abstracted) {
    abstracted[i] = abstracted[i] / counter[i];
  }

  //sort by mean score value
  let items = Object.keys(abstracted).map(function(key) {
    return {
      name : key,
      score : abstracted[key]
    };
  });

  items.sort(function(a, b) {
    return Math.abs(b.score) - Math.abs(a.score);
  });

  //make outputfile
  let jsonOutput = JSON.stringify(items.slice(0, 7));


  return jsonOutput;
}

module.exports = callNLP;