var db = require('../models');
var app = require('../app');
var loader = require('../utils/csvLoader');
var util = require('util');

app.get('/employees', function(req, res){
  db.Employee.findAll()
    .success(function(employees) {
    res.render('employees', {
      title: 'Employees',
      employees: employees
    });
  });
});

app.put('/employees', function(req, res){
  var addEmployeesToDB = function(row){
    db.Employee.create({
      id        : row[0],
      birthdate : row[1],
      firstName : row[2],
      lastName  : row[3],
      sex       : row[4],
      startDate : row[5]
    });
  };
  loader(req, res, addEmployeesToDB)
  .then(function(fields){
    res.writeHead(200, {'content-type':'text/plain'});
    res.end('received fields:'+util.inspect(fields));
  }).error(function(msg){
    res.writeHead(500, {'content-type':'text/plain'});
    res.end('ERR: failed to load '+file.name+' to the database');
  });
});
