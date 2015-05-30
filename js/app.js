var app = angular.module('tokenKidApp', ['ngRoute']);

// create the controller and inject Angular's $scope
app.controller('mainController', function($scope) {

    $scope.showUsername = false;
    $scope.kids = [];
    setTimeout(function() { var a = document.getElementById("username"); if(a) a.focus(); }, 100);
    var savedUsername = localStorage.getItem("username");
    if(savedUsername) {
        $scope.usernameText = savedUsername;
        setUsername(savedUsername);
    }
    
    // create a message to display in our view
    //$scope.username = 'Everyone come and see how good I look!';
    
    $scope.loginClicked = function() {
        setUsername(this.usernameText);        
    };
    
    function setUsername(username) {
        $scope.fireBase = myDataRef = new Firebase('https://glaring-torch-8337.firebaseio.com/' + username);
        
        myDataRef.on("value", function(snapshot) {
            console.log("Firebase update!");
            $scope.kids = snapshot.val();
            $scope.$apply();
          console.log(snapshot.val());
        }, function (errorObject) {
          console.log("The read failed: " + errorObject.code);
        });
        
        localStorage.setItem("username", username);
        
        $scope.id = username;
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
        document.getElementById("kidNameField").focus();
        return false;
    };
    
    $scope.addKidSubmitted = function() {
        this.showKidForm = false;
        var kid = { name: this.newKidName, points: 0 };
        $scope.kids.push(kid);
        this.newKidName = '';
        this.fireBase.push(kid);
    }
    
    $scope.addClicked = function(kid) {
        kid.points += 1;
        this.updateDatabase();
    };
    
    $scope.removeClicked = function(kid) {
        kid.points -= 1;  
        this.updateDatabase();
    };
    
    $scope.deleteClicked = function(kid) {
        $scope.kids = $scope.kids.splice($scope.kids.indexOf(kid), 1);
        this.updateDatabase();
    };
    
    $scope.updateDatabase = function() {
           this.fireBase.set(this.kids);
    }
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

