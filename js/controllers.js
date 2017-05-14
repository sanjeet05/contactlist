angular.module('controllers', [])

// Home Controller
.controller("homeCtrl", function($scope, $rootScope, $stateParams, $state, $localStorage, UserContactsService) {
  $scope.homeCtrlInit=function () {
    UserContactsService.find()
      .then(function(response) {
        // $scope.contactList = response;
        console.log(response);
        $scope.familyList = [];
        $scope.friendsList = [];
        $scope.othersList = [];
        $scope.contactList = response;
        for(var i=0, size=$scope.contactList.length; i<size; i++){
          if($scope.contactList[i].groupType == 'family'){
            $scope.familyList.push($scope.contactList[i]);
          }
          else if($scope.contactList[i].groupType == 'friends'){
            $scope.friendsList.push($scope.contactList[i]);
          }
          else if($scope.contactList[i].groupType == 'others'){
            $scope.othersList.push($scope.contactList[i]);
          }
        }

        $rootScope.totalCount = $scope.contactList.length;
        $rootScope.familyCount = $scope.familyList.length;
        $rootScope.friendsCount = $scope.friendsList.length;
        $rootScope.othersCount = $scope.othersList.length;

      },
      function(error) {
        console.log("HomeCtrl.UserContactsService.find():  Error in retrieving contactList!");
      });

  };

  $scope.deleteContact=function(id) {
    UserContactsService.deleteContact(id)
      .then(function(response) {
        console.log(response.message);
        $scope.homeCtrlInit();
      },
      function(error) {
        console.log("HomeCtrl.UserContactsService.deleteContact():  Error in delete contact!");
      });
  };

  $scope.editContact=function(id) {
    $state.go('editContacts', {id: id});
  };

})

// Add Contacts Controller
.controller("addContactsCtrl", function($scope, $state, $localStorage, UserContactsService) {
  $scope.addContactsCtrlInit=function () {
    $scope.groupList=[
      {'key':'family','value':'Family'},
      {'key':'friends','value':'Friends'},
      {'key':'others','value':'Others'}
    ];
  };

  $scope.save=function() {
    UserContactsService.addContact($scope.contact)
      .then(function(response) {
        console.log(response.message);
        $state.go('home');
      },
      function(error) {
        console.log("addContactsCtrl.UserContactsService.addContact():  Error in save contact!");
      });
  };

})

// Edit Contacts Controller
.controller("editContactsCtrl", function($scope, $rootScope, $stateParams, $state, $localStorage, UserContactsService) {
  $scope.editContactsCtrlInit=function () {
    console.log($stateParams.id);

    $scope.groupList=[
      {'key':'family','value':'Family'},
      {'key':'friends','value':'Friends'},
      {'key':'others','value':'Others'}
    ];

    var id = $stateParams.id;
    UserContactsService.findOne(id)
      .then(function(response) {
        console.log(response);
        $scope.contact = response;
        for(var i=0; i< $scope.groupList.length; i++){          
          if($scope.groupList[i].key == $scope.contact.groupType){
            $scope.contact.groupType = $scope.groupList[i].key;
          }
        }

      },
      function(error) {
        console.log("editContactsCtrl.UserContactsService.findOne():  Error in retrieving contactList!");
      });

  };

  $scope.updateContact=function() {
    console.log($scope.contact);
    UserContactsService.updateContact($scope.contact)
      .then(function(response) {
        console.log(response.message);
        $state.go('home');
      },
      function(error) {
        console.log("editContactsCtrl.UserContactsService.updateContact():  Error in update contact!");
      });
  };

});
