var mongoose = require('mongoose');
var config = require('./config');

mongoose.connect(config.dbPath);
var db = mongoose.connection;

db.on('error', function(){
  console.log('An error ocurred');
});

db.once('open', function dbOpen(){
  console.log('Success!');
});

exports.mongoose = mongoose;
