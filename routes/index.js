var express = require('express');
var router = express.Router();
var employees = require('./employees');
var salaryHistory = require('./salaryHistory');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Mergely' });
});

module.exports = router;
