var csv = require('csv');
var Promise = require('bluebird');
var formidable = require('formidable');
var util = require('util');

var parser = function(file, addToDB){
  return new Promise(function(fulfill, reject){
    csv()
    .from.path(file.path, { delimiter: ',', escape: '\r\n' })
    .on('record', function(row,index){
      addToDB(row);
    })
    .on('end', function(count){
      fulfill();
    })
    .on('error', function(error){
      reject(error.message);
    });
  });
};

module.exports = function(req, res, addToDB){
  return new Promise(function(fulfill, reject){
    var form = new formidable.IncomingForm();
    var fields = [];
    form.on('error', function(err){
      console.log('form error');
      res.writeHead(200, {'content-type':'text/plain'});
      res.end('ERR: '+util.inspect(err));
    })
    .on('field', function(field, value){
      fields.push([field, value]);
    })
    .on('end', function(){
      console.log('-> post done');
    });
    form.parse(req, function(err, fields, files){
      var file = files.file;
      if(file.name === 'employees_small.csv' ||
         file.name === 'salaries_small.csv'){
        parser(file, addToDB)
        .then(function(){
          fulfill(fields)
        }).error(reject);
      }else{
        res.writeHead(400, {'content-type':'text/plain'});
        res.end('ERR: wrong file uploaded: '+file.name);
      };
    });
  });
};
