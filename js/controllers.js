angular.module('controllers', [])

// Home Controller
.controller("homeCtrl", function($scope, $rootScope, $state, $localStorage) {
  $scope.homeCtrlInit=function () {
    var dummyContactList=[{
      name:"Sanjeet",
      company:"ml",
      email:"sanjeet@gmail.com",
      mobile:"9445165233",
      address:"hyd",
      group:"family"
      },
      {
        name:"Santu",
        company:"ml",
        email:"santu@gmail.com",
        mobile:"9445165233",
        address:"hyd",
        group:"friends"
      }];

      if($localStorage.contactListData == undefined){
        $scope.contactList=dummyContactList;
        $scope.totalCount=0;
        $scope.familyCount=0;
        $scope.friendsCount=0;
        $scope.othersCount=0;
      }
      else{
        $scope.contactList=$localStorage.contactListData;
        var allData=$scope.contactList;
        $scope.totalCount=$scope.contactList.length;
        $scope.familyCount=0;
        $scope.friendsCount=0;
        $scope.othersCount=0;

        for(var i=0, size=$scope.contactList.length; i<size; i++){
          if(allData[i].group == 'family'){
            $scope.familyCount++;
          }
          else if(allData[i].group == 'friends'){
            $scope.friendsCount++;
          }
          else if(allData[i].group == 'others'){
            $scope.othersCount++;
          }
        }
        console.log($scope.totalCount, $scope.familyCount,$scope.friendsCount,$scope.othersCount);
      }


  };
  // $scope.contactFilter=function(filterValue) {
  //   if(filterValue == 'family'){
  //     $scope.filterList='family';
  //   }
  //   else if(filterValue == 'friends'){
  //     $scope.filterList='friends';
  //   }
  //   console.log($scope.filterList);
  // };
  $scope.deleteContact=function(index) {
    $scope.contactList.splice(index,1);
    //update the localStorage
    $localStorage.contactListData=$scope.contactList;
  };

  $scope.editContact=function(index) {
    $rootScope.updatedIndex=index;
    $state.go('editContacts');
  };

})

// Add Contacts Controller
.controller("addContactsCtrl", function($scope, $state, $localStorage) {
  $scope.addContactsCtrlInit=function () {
    // $scope.groupList=['Family','Friends','Others'];
    $scope.groupList=[
      {'key':'family','value':'Family'},
      {'key':'friends','value':'Friends'},
      {'key':'others','value':'Others'}
    ];

    if($localStorage.contactListData == undefined){
      $scope.contactItems=[];
    }
    else{
      $scope.contactItems=$localStorage.contactListData;
    }
  };

  $scope.save=function() {
    // console.log($scope.contact);
    $scope.contactItems.push($scope.contact);
    console.log($scope.contactItems);

    //update the localStorage
    $localStorage.contactListData=$scope.contactItems;
  };

})

// Edit Contacts Controller
.controller("editContactsCtrl", function($scope, $rootScope, $state, $localStorage) {
  $scope.editContactsCtrlInit=function () {
    console.log($rootScope.updatedIndex);
    var s=$localStorage.contactListData[$rootScope.updatedIndex];
    $scope.contact=s;
    // console.log($scope.contact);
    $scope.groupList=[
      {'key':'family','value':'Family'},
      {'key':'friends','value':'Friends'},
      {'key':'others','value':'Others'}
    ];
    // $scope.contactItems=[];
    // console.log($scope.groupList);
    // if($localStorage.contactListData == undefined){
    //   $scope.contactItems=[];
    // }
    // else{
    //   $scope.contactItems=$localStorage.contactListData;
    // }
  };

  $scope.updateContact=function() {
    console.log($scope.contact);
    // $scope.contactItems.push($scope.contact);
    // console.log($scope.contactItems);

    //update the localStorage
    // $localStorage.contactListData=$scope.contactItems;
  };

});
