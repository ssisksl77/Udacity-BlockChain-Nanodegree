const level = require('level');
const chainDB = './chaindata';
const db = level(chainDB);

// Add data to levelDB with key/value pair
function addLevelDBData(key,value){
  return new Promise(function addLevelDBDataPromise(resolve, reject) {
    db.put(key, value, function (err) {
      if (err) reject(err);
      resolve(value);
    });
  });
}

// Get data from levelDB with key
function getLevelDBData(key){
  return new Promise(function getLevelDBDataPromise(resolve, reject) {
    db.get(key, function (err, value) {
      if (err) reject(err);
      //console.log('Value = ' + value);
      resolve(value);
    })
  });
}
// Get current block height
function getBlockHeight() {
  return new Promise(function getBlockHeightPromise(resolve, reject) {
    let height = 0;
    db.createReadStream().on('data', function (data) {
      height++;
    }).on('error', function(err) {
      reject(err);
    }).on('close', function() {
      resolve(height);
    })});
}
// Add data to levelDB with value
function addDataToLevelDB(value) {
  return new Promise(function addDataToLevelPromise(resolve, reject) {
    let i = 0;
    db.createReadStream().on('data', function (data) {
      i++;
    }).on('error', function (err) {
      reject(err);
    }).on('close', function () {
      console.log('Block #' + i);
      addLevelDBData(i, value);
      resolve(value);
    });
  });
}

function getLevelDBDataByHash(hash) {
  let block = undefined;
  return new Promise(function getBlockByHash(resolve, reject) {
    db.createReadStream()
      .on('data', (data) => {
        let value = JSON.parse(data.value);
        if(value.hash === hash) { 
          block = value; 
        }
      })
      .on('error', (err) => { reject(err); })
      .on('close', () => { resolve(block); });
  }); 
}

module.exports.addLevelDBData = addLevelDBData;
module.exports.getLevelDBData = getLevelDBData;
module.exports.getBlockHeight = getBlockHeight;
module.exports.addDataToLevelDB = addDataToLevelDB;
module.exports.getLevelDBDataByHash = getLevelDBDataByHash;
