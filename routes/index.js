var express = require('express');
var formidable = require('formidable');
var router = express.Router();
var util = require('util');
/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

// router.post('/', function(req, res, next){
//   //render view of merged CSV
//   var data = "";
//   req.on('data', function(chunk) {
//     data += chunk;
//   });
//   req.on('end', function() {
//     data = data.split('=')[1];
//     archive.isUrlArchived(data,function(exists){
//       if(exists){
//         res.writeHead(302, {Location:data});
//         res.end();
//       }
//     });
//     archive.isUrlInList(data,function(exists){
//       if(!exists){
//         res.writeHead(302, {Location:'loading.html'});
//         res.end();
//         archive.addUrlToList(data);
//       }
//     });
//   });
// });

router.put('/upload-csv', function(req, res, next){
  var form = new formidable.IncomingForm(),
    fields = [];
  form.on('error', function(err){
      res.writeHead(200, {'content-type':'text/plain'});
      res.end('error:\n\n'+util.inspect(err));
    })
    .on('field', function(field, value){
      // console.log("****************** field *********************");
      // console.log(field, value);
      fields.push([field, value]);
      console.log("test");
    })
    .on('end', function(){
      console.log('-> post done');
      res.writeHead('200', {'content-type':'text/plain'});
      res.end('received fields:\n\n'+util.inspect(fields));
    });
  // console.log("********************** Request *****************\n");
  form.parse(req);
});

module.exports = router;
