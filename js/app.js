 var app = angular.module('tokenKidApp', ['ngRoute']);

// create the controller and inject Angular's $scope
app.controller('mainController', function($scope) {

    $scope.kids = [];
    
    // create a message to display in our view
    //$scope.username = 'Everyone come and see how good I look!';
    
    $scope.loginClicked = function() {
        var myDataRef = new Firebase('https://glaring-torch-8337.firebaseio.com/' + this.usernameText);
        
        myDataRef.on("value", function(snapshot) {
          console.log(snapshot.val());
        }, function (errorObject) {
          console.log("The read failed: " + errorObject.code);
        });

        myDataRef.push({username: this.usernameText, something: 'else'});
        
        var existing = myDataRef.child('families').child(this.usernameText);
        
        console.log(existing);
        
        var id = myDataRef.child('families').child(this.usernameText).name();
        $scope.id = id;
        window.location.href = "/#/list";
    };
    
    var findUsersMatchingEmail = function(emailAddress, callback ) {
        fb.child('families').startAt(emailAddress).endAt(emailAddress).once('value', function(snap) {
            // the keys are the user ids, the values are objects containing each user record that matched (presumably 1?)
            callback( snap.val() || {} );
        });
    }
    
    $scope.addKidClicked = function() {
        this.showKidForm = true;
        return false;
    };
    
    $scope.addKidSubmitted = function() {
        this.showKidForm = false;
        $scope.kids.push({ name: this.newKidName, points: 0 });
        this.newKidName = '';
    }
    
    $scope.addClicked = function(kid) {
        kid.points += 1;  
    };
    
    $scope.removeClicked = function(kid) {
        kid.points -= 1;  
    };
    
    $scope.deleteClicked = function(kid) {
        $scope.kids = $scope.kids.splice($scope.kids.indexOf(kid), 1);
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

