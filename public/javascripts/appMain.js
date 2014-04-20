console.log("appMain");
angular.module('myApp', ['angularFileUpload'])
.controller('MainController', function($scope, $upload, $http) {
  $scope.processPercent = 0;
  $scope.uploadPercent = 0;
  console.log("controller");
  $scope.onFileSelect = function($files) {
    //$files: an array of files selected, each file has name, size, and type.
    console.log("File select!");
    var file = $files[0];
    console.log(file);
    var reader = new FileReader();
    reader.readAsText(file);
    reader.onProgress = function(evt){
      // console.log('percent: ' + parseInt(100.0 * evt.loaded / evt.total));
      $scope.processPercent = parseInt(100.0 * evt.loaded / evt.total);
    };
    reader.onload = function(evt){
      $scope.processPercent = 100;
      var data = {};
      data[file.name] = CSVToArray(evt.target.result);
      console.log('Data: ', data);
      $scope.data = data;
    };
    reader.onError = function(err){console.log("ERR: ",err);};
    $scope.upload = $upload.upload({
      url: '/upload-csv', //upload.php script, node.js route, or servlet url
      method: 'PUT',
      data: $scope.data,
      file: file,
    }).progress(function(evt) {
      $scope.uploadPercent = parseInt(100.0 * evt.loaded / evt.total);
    }).success(function(data, status, headers, config) {
      console.log(data);
    }).error(err){
      console.log("ERR: ", err);
    });
    //.then(success, error, progress); 
    //.xhr(function(xhr){xhr.upload.addEventListener(...)})// access and attach any event listener to XMLHttpRequest.
    /* alternative way of uploading, send the file binary with the file's content-type.
       Could be used to upload files to CouchDB, imgur, etc... html5 FileReader is needed. 
       It could also be used to monitor the progress of a normal http post/put request with large data*/
    // $scope.upload = $upload.http({...})  see 88#issuecomment-31366487 for sample code.
  };
});

// orig author: Ben Nadel (http://www.bennadel.com/)
function CSVToArray( strData, strDelimiter ){
  strDelimiter = (strDelimiter || ",");
  var objPattern = new RegExp(
    (
          // Delimiters.
          "(\\" + strDelimiter + "|\\r?\\n|\\r|^)" +
          // Quoted fields.
          "(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|" +
          // Standard fields.
          "([^\"\\" + strDelimiter + "\\r\\n]*))"
    ),
    "gi"
    );
  var arrData = [[]];
  var arrMatches = null;
  while (arrMatches = objPattern.exec( strData )){
    var strMatchedDelimiter = arrMatches[ 1 ];
    if (strMatchedDelimiter.length &&
      strMatchedDelimiter != strDelimiter){
      arrData.push([]);
    }
    if (arrMatches[ 2 ]){
      var strMatchedValue = arrMatches[ 2 ].replace(
        new RegExp( "\"\"", "g" ),
        "\""
        );
    } else {
      var strMatchedValue = arrMatches[ 3 ];
    }
    arrData[ arrData.length - 1 ].push( strMatchedValue );
  }
  return( arrData );
}
