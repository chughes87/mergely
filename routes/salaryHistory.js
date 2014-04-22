var db = require('../models');
var app = require('../app');
var loader = require('../utils/csvLoader');

app.get('/employee/:id', function(req, res){
  var id = req.params.id;
  db.SalaryPeriod.findAll({where:{EmployeeId:id}})
    .success(function(salaryHistory) {
    res.render('salaryHistory', {
      title: 'Salary history for employee #'+id,
      history: salaryHistory
    });
  });
});

app.put('/salaries', function(req, res){
  var addSalariesToDB = function(row){
    try{
      db.SalaryPeriod.create({
        EmployeeId : row[0],
        salary     : row[1],
        startDate  : row[2],
        endDate    : row[3]
      });
    } catch(e){
      console.log("Sequelize failed to insert \"",row,"\". ERR msg: ",e);
    }
  };
  loader(req, res, addSalariesToDB)
  .then(function(){
    console.log('redirecting!');
    res.contentType('application/json');
    var data = 'employees';
    res.header('Content-Length', data.length);
    res.end(data);
  }).error(function(msg){
    res.writeHead(500, {'content-type':'text/plain'});
    res.end('ERR: failed to load '+file.name+' to the database');
  });
});
