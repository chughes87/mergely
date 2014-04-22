angular.module('myApp', ['angularFileUpload'])
.controller('MainController', function($scope, $upload, $http) {
  $scope.processPercent = 0;
  $scope.uploadPercent = 0;
  $scope.message = "Please select your employees_small.csv file";
  $scope.onFileSelect = function($files) {
    var file = $files[0]; // I assume only one file is given...
    var url;
    if(file.name === 'salaries_small.csv'){
      url = '/salaries';
    }else if(file.name === 'employees_small.csv'){
      url = '/employees';
      $scope.message = "uploading..."
    }else{
      $scope.message = "ERROR: Unexpected file given. Please supply a employees_small.csv or a salaries_small.csv";
      return;
    }
    //TODO: disable button
    $upload.upload({
      url: url,
      method: 'PUT',
      file: file,
    }).progress(function(evt) {
      $scope.uploadPercent = parseInt(100.0 * evt.loaded / evt.total);
    }).success(function(data, status, headers, config) {
      if(file.name === 'employees_small.csv'){
        $scope.message = "Now please select your salaries_small.csv file";
      }else if(file.name === 'salaries_small.csv'){
        $scope.message = "Please wait, redirecting...";
        window.location += data;
      }
      // console.log(data);
    }).error(function(err){
      console.log("ERR: ", err);
    });
  };
});
