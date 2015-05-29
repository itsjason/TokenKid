 var app = angular.module('tokenKidApp', ['ngRoute']);

// create the controller and inject Angular's $scope
app.controller('mainController', function($scope) {

    // create a message to display in our view
    //$scope.username = 'Everyone come and see how good I look!';
    
    $scope.loginClicked = function() {
        var myDataRef = new Firebase('https://glaring-torch-8337.firebaseio.com/');
        //myDataRef.push({username: this.usernameText, something: 'else'});
        
        var id = myDataRef.child('families').push({username: this.usernameText, something: 'else'}).name();
        $scope.id = id;
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

