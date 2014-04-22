var fs        = require('fs');
var path      = require('path');
var Sequelize = require('sequelize');
var lodash    = require('lodash');
var Promise   = require('bluebird');
var db        = {};
var sequelize = new Sequelize('salaryData', 'root', null, {
  logging: function(){}//force no logging
});

var readdirPromise = Promise.promisify(fs.readdir, fs);

readdirPromise(__dirname)
.then(function(files){
  console.log(files);
  files.filter(function(file) {
    return (file.indexOf('.') !== 0) && (file !== 'index.js');
  }).forEach(function(file) {
    var model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });
}).error(function(err){
  console.log("ERR: failed to load models.");
});

// var files = fs.readdirSync(__dirname)
// console.log(files);
// files.filter(function(file) {
//     return (file.indexOf('.') !== 0) && (file !== 'index.js')
//   })
//   .forEach(function(file) {
//     var model = sequelize.import(path.join(__dirname, file))
//     db[model.name] = model
//   });

// Object.keys(db).forEach(function(modelName) {
//   if ('associate' in db[modelName]) {
//     db[modelName].associate(db)
//   }
// });

module.exports = lodash.extend({
  sequelize: sequelize,
  Sequelize: Sequelize
}, db);
