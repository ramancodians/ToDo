var app = angular.module('app',['firebase']);


app.config

app.controller('MainCtrl', ["$scope", "TodoData",  function($scope, TodoData){
    
    $scope.remove = function(id){
        for(i=0; i < $scope.tasks.length; i++){
            
            if($scope.tasks[i].$id == id){
                console.log("Match Found!");
                $scope.tasks.$remove(i).then(function(){
                    console.log("Item Done!");
                });
            }
        }
    };
    
    
    $scope.loading = true;
    $scope.user = 'admin';
    
    $scope.tasks = TodoData;
    console.log($scope.tasks);
    
    //checking if Firebase content Loaded
    $scope.tasks.$loaded()
      .then(function() {
        console.log("Data Loaded!!");
        $scope.loading = false;
      })
      .catch(function(err) {
        console.error(err);
      });
    
    $scope.do = function(){
       // $scope.tasks.push($scope.newTask);
        // $scope.newTask = '';
        $scope.tasks.$add({
        from: $scope.user,
        content: {
            task: $scope.newTask,
            done : false
        }
      });
         $scope.newTask = '';
    };
    
    
    // Done Function
    $scope.done = function(id){  
        for(i=0; i < $scope.tasks.length; i++){
            if($scope.tasks[i].$id == id){
                console.log("Match Found!");
                console.log("--> " + $scope.tasks[i].content.done);
                $scope.tasks[i].content.done = true;
                $scope.tasks.$save(i);
            }
        }
    }
}]);

/*
DIRECTIVES
***********/

app.directive('ngEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if(event.which === 13) {
                scope.$apply(function (){
                    scope.$eval(attrs.ngEnter);
                });

                event.preventDefault();
            }
        });
    };
});

/*
FACTORY
********/
app.factory("TodoData", ["$firebaseArray",
  function($firebaseArray) {   
    //var randomRoomId = Math.round(Math.random() * 100000000);
    var ref = new Firebase("https://todo-app-codians.firebaseio.com/");

    // this uses AngularFire to create the synchronized array
    return $firebaseArray(ref);
  }
]);