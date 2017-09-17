// Code goes here

angular.module('app', [])

angular.module('app').controller('mainCtrl', function($scope) {
  $scope.user1 = {
    name: 'Luke Skywalker',
    adress: {
      street: 'Rafet Canitez Cad.',
      city: 'Ankara',
      planet: 'Earth'
    },
    friends: [
      'Han',
      'Leia',
      'Chewbacca'
    ]
  };

  $scope.user2 = {
    name: 'Han Solo',
    adress: {
      street: 'Baglar Cad.',
      city: 'Ankara',
      planet: 'Earth'
    },
    friends: [
      'Luke',
      'Leia',
      'Chewbacca'
    ]
  };
});

angular.module('app').directive('userInfoCard', function() {

  return {
    templateUrl: 'UserInfoCard.html',
    restrict: 'E',
    replace: true,
    transclude: true,
    scope: {
      user: "="
    },
    controller: function($scope) {

      $scope.collapsed = true;
      $scope.collapse = collapse;
      $scope.knightMe = knightMe;
      $scope.removeFriend = removeFriend;
      
      this.user = $scope.user;
      this.knightMe = $scope.knightMe;
      this.collapse = $scope.collapse;

      function knightMe(user) {
        user.rank = "Knight:\t" + user.name;
      }

      function collapse() {
        $scope.collapsed = !$scope.collapsed
      }

      function removeFriend(friend) {
        var idx = $scope.user.friends.indexOf(friend);
        if (idx > -1) {
          $scope.user.friends.splice(idx, 1);
        }
      }
    }
  }

});

angular.module('app').directive('knightMe', function() {

  return {
    templateUrl: 'KnightMe.html',
    restrict: 'E',
    require: '^userInfoCard',
    link: function(scope, element, attrs, parentCtrl) {
      scope.knightMe = parentCtrl.knightMe;
      scope.user = parentCtrl.user;
    }
    
  }
});

angular.module('app').directive('knightMeExtended', function() {

  return {
    templateUrl: 'KnightMeExtended.html',
    restrict: 'E',
    require: '^userInfoCard',
    link: function(scope, element, attrs, parentCtrl) {
      scope.knightMe = parentCtrl.knightMe;
      scope.user = parentCtrl.user;
      scope.collapse = parentCtrl.collapse;
    },
    controller: function($scope){
      $scope.logUserName = logUserName;
      
      function logUserName(user){
        console.log(user.name);
        // $scope.collapse();
      }
    }
    
  }
});

angular.module('app').directive('removeFriend', function() {

  return {
    restrict: 'E',
    templateUrl: 'RemoveFriend.html',
    scope: {
      notifyParent: '&method'
    },
    controller: function($scope) {

      $scope.removing = false;
      $scope.startRemoving = startRemoving;
      $scope.cancelRemove = cancelRemove;
      $scope.confirmRemove = confirmRemove;

      function startRemoving() {
        $scope.removing = true;
      }

      function cancelRemove() {
        $scope.removing = false;
      }

      function confirmRemove() {
        $scope.notifyParent();
      }

    }
  }

});


angular.module('app').directive('address', function() {

  return {
    templateUrl: 'Address.html',
    restrict: 'E',
    scope: true,
    controller: function($scope) {

      $scope.collapsed = true;
      $scope.collapseAddress = collapseAddress;
      $scope.expandAddress = expandAddress;

      function collapseAddress() {
        $scope.collapsed = true;
      }

      function expandAddress() {
        $scope.collapsed = false;
      }
    }
  }
});