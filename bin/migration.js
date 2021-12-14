var sqlite = require('sqlite');
var sqlite3 = require('sqlite3');
var chunk = require('lodash/chunk');
const each = require('async/each');
const algoliasearch = require('algoliasearch');
var util = require('util');
const config = {
  appId: '95DC9UW77Y',
  apiKey: '423668b7ecd0de285ee59e9f53246449', // admin API key
  indexName: 'wine-search',
};

const client = algoliasearch(config.appId, config.apiKey);
const index = client.initIndex(config.indexName);

function end(err) {
  if (err) throw err;
  console.log('✨ Done with uploading, get ready to search 🔍');
}

// Promise.resolve()
//   .then(() => db.open('../development.sqlite3', { Promise }))
//   .catch(err => console.error(err.stack))
//   .then(() => db.all('SELECT * from roles'))
//   .then(roles => chunk(roles, 1000))
//   .then(chunks => each(chunks, index.addObjects.bind(index), end));

var migrate = async function () {
  const db = new sqlite3.Database('../development.sqlite3');
  db.all('SELECT * from wines', function (err, rows) {
    if (err) console.log('Error', err);
    console.log(rows.length)
    index.saveObjects(rows, {'autoGenerateObjectIDIfNotExist': true}).then(()=>{
      console.log('DOne')
    }).catch(error=>console.log('Error', error))
    db.close();
  });
  // var db = await sqlite.open({
  //   filename: '/tmp/database.db',
  //   driver: sqlite3.Database
  // });
  // db.all('SELECT * from wines')
  // .then(roles => chunk(roles, 1000))
  // .then(chunks => each(chunks, index.addObjects.bind(index), end));;
}
migrate()