 var app = angular.module('tokenKidApp', ['ngRoute']);

// create the controller and inject Angular's $scope
app.controller('mainController', function($scope) {

    // create a message to display in our view
    $scope.message = 'Everyone come and see how good I look!';
    
    $scope.loginClicked = function() {
        window.location.href = "/#/list";
    };
});

app.config(function($routeProvider){
      $routeProvider
          .when('/',{
                templateUrl: 'login.html'
          })
          .when('/list',{
                templateUrl: 'list.html'
          });
});

