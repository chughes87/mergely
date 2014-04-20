var db = require('../models');

exports.employee = function(req, res){
  db.Employee.findAll({
    include: [ db.SalaryPeriod ]
  }).success(function(employee) {
    res.render('index', {
      title: 'Express',
      employee: employee
    });
  });
};
