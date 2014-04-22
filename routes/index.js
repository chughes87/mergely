var app = require('../app');
var fs = require('fs');
var path = require('path');

var files = fs.readdirSync(__dirname);
files.filter(function(file) {  
  return (file.indexOf('.') !== 0) && (file !== 'index.js');
})
.forEach(function(file) {
  require(path.join(__dirname, file));
});

/* GET home page. */
app.get('/', function(req, res) {
  res.render('index', { title: 'Mergely' });
});

// module.exports = router;
